import { isLocalHostname, modelDataUrl } from './data-source.js';
import { VENDOR_NAMES } from './shared/brands.js';
import { t, numberLocale, getLang } from './i18n.js';

const blockedNewsHosts = new Set(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com']);
const domesticPlanCategories = [];
const modelScenarios = [
  { id: 'low-cost', label: t('scenario.lowCost') },
  { id: 'long-context', label: t('scenario.longContext') },
  { id: 'multimodal', label: t('scenario.multimodal') },
  { id: 'enterprise-api', label: t('scenario.enterpriseApi') },
  { id: 'personal-use', label: t('scenario.personalUse') }
];
export { domesticPlanCategories, modelScenarios };

export async function loadModelDataset() {
  const isLocal = isLocalHostname();
  const source = isLocal ? 'backend' : 'static';
  const payload = await fetchJson(modelDataUrl());
  const englishFallback = isLocal && getLang() === 'en' ? await fetchJson('/data.json') : null;
  const dataset = normalizeModelDataset(applyEnglishFallback(payload, englishFallback), source);

  return {
    ...dataset,
    dataUnavailable: !payload
  };
}

export async function loadPlanDataset() {
  const dataset = await loadModelDataset();
  const plans = dataset.models.flatMap(model => normalizePlansFromModel(model, dataset.providerInfo));
  const modelCatalog = dataset.modelCatalog || [];
  const nameById = new Map(modelCatalog.map(model => [model.id, model.name]));
  for (const plan of plans) {
    plan.supportedModelNames = (plan.modelIds || [])
      .map(id => nameById.get(id))
      .filter(Boolean);
  }
  return { ...dataset, plans, providerInfo: dataset.providerInfo || {}, modelCatalog };
}

function normalizeModelDataset(payload, source) {
  if (payload && Array.isArray(payload.models)) {
    const models = payload.models.map(model => normalizeBackendModel(model, source));
    if (models.length) {
      return {
        source,
        lastUpdated: payload.last_updated || latestDate(models.map(model => model.updatedAt)),
        models,
        rawModels: payload.models,
        providerInfo: payload.provider_info || {},
        modelCatalog: normalizeModelCatalog(payload.model_catalog)
      };
    }
  }

  return {
    source,
    lastUpdated: payload?.last_updated || 'unknown',
    models: [],
    rawModels: [],
    providerInfo: payload?.provider_info || {},
    modelCatalog: []
  };
}

function normalizeModelCatalog(catalog) {
  if (!Array.isArray(catalog)) return [];
  return catalog
    .map(item => ({
      id: stringValue(item.id),
      name: stringValue(pickLang(item.name, item.name_en), item.id || ''),
      provider: stringValue(item.provider, ''),
      providerIconUrl: stringValue(item.provider_icon_url, ''),
      logoUrl: stringValue(item.logo_url, ''),
      sortOrder: numberOrNull(item.sort_order),
      marketRegion: stringValue(item.market_region, '')
    }))
    .filter(item => item.id);
}

export async function loadUpdateDataset() {
  const source = 'aihot';
  const payload = await fetchJson('/aihot-api/items?mode=selected&take=100');
  const backendItems = Array.isArray(payload?.items) ? payload.items : [];
  const updates = backendItems
    .map(normalizeBackendUpdate)
    .filter(isRelevantUpdate)
    .filter(isDisplayableUpdate);

  if (updates.length) {
    updates.forEach((item, i) => { item.heatScore = computeHeatScore(item, i); });
    return { source, updates };
  }

  return { source, updates: [] };
}

async function fetchJson(url) {
  try {
    // 使用默认 HTTP 缓存：data.json 在 nginx 层已配置 5 分钟短缓存，
    // 同时让 <link rel="preload" as="fetch"> 的预取结果能被复用，避免重复下载
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function applyEnglishFallback(payload, fallbackPayload) {
  if (!payload || !Array.isArray(payload.models) || !fallbackPayload || !Array.isArray(fallbackPayload.models)) {
    return payload;
  }

  const fallbackModels = new Map(
    fallbackPayload.models
      .map(model => [recordKey(model), model])
      .filter(([key]) => key)
  );
  const models = payload.models.map(model => {
    const fallback = fallbackModels.get(recordKey(model));
    return fallback ? mergeEnglishObject(model, fallback) : model;
  });

  return {
    ...payload,
    models,
    provider_info: mergeProviderInfo(payload.provider_info, fallbackPayload.provider_info)
  };
}

function mergeProviderInfo(providerInfo = {}, fallbackInfo = {}) {
  const keys = new Set([
    ...Object.keys(fallbackInfo || {}),
    ...Object.keys(providerInfo || {})
  ]);
  const merged = {};
  for (const key of keys) {
    merged[key] = mergeEnglishObject(providerInfo?.[key] || {}, fallbackInfo?.[key] || {});
  }
  return merged;
}

function mergeEnglishObject(base, fallback) {
  if (!base || typeof base !== 'object' || Array.isArray(base) || !fallback || typeof fallback !== 'object' || Array.isArray(fallback)) {
    return base;
  }

  const merged = { ...base };
  for (const [key, fallbackValue] of Object.entries(fallback)) {
    const baseValue = base[key];
    if (key === 'package_plans' && Array.isArray(baseValue) && Array.isArray(fallbackValue)) {
      merged[key] = mergeEnglishItems(baseValue, fallbackValue);
    } else if (baseValue && typeof baseValue === 'object' && !Array.isArray(baseValue)
      && fallbackValue && typeof fallbackValue === 'object' && !Array.isArray(fallbackValue)) {
      merged[key] = mergeEnglishObject(baseValue, fallbackValue);
    } else if (typeof baseValue === 'string' || typeof fallbackValue === 'string') {
      merged[key] = localizedEnglishString(baseValue, fallbackValue);
    } else if (baseValue == null) {
      merged[key] = fallbackValue;
    }
  }
  return merged;
}

function mergeEnglishItems(items, fallbackItems) {
  const fallbackByKey = new Map(
    fallbackItems
      .map(item => [recordKey(item), item])
      .filter(([key]) => key)
  );
  return items.map(item => {
    const fallback = fallbackByKey.get(recordKey(item));
    return fallback ? mergeEnglishObject(item, fallback) : item;
  });
}

function localizedEnglishString(baseValue, fallbackValue) {
  const fallbackText = String(fallbackValue ?? '').trim();
  if (!fallbackText) return baseValue;
  const baseText = String(baseValue ?? '').trim();
  if (!baseText) return fallbackValue;
  return containsCjk(baseText) && !containsCjk(fallbackText) ? fallbackValue : baseValue;
}

function containsCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ''));
}

function recordKey(record) {
  return String(record?.id || record?.model_id || record?.plan_id || record?.planId || '').trim();
}

function normalizeBackendModel(model, source) {
  const capabilities = Array.isArray(model.capabilities) ? model.capabilities : [];
  const inputPriceValue = numberOrNull(model.input_price);
  const contextLengthValue = numberOrNull(model.context_length);
  const notes = compactText(pickLang(model.plan_summary, model.plan_summary_en), pickLang(model.access_notes, model.access_notes_en), pickLang(model.notes, model.notes_en));
  const scenarios = inferScenarios(model, inputPriceValue, contextLengthValue, capabilities);

  return {
    id: stringValue(model.id),
    vendor: stringValue(model.provider, '待更新'),
    providerIconUrl: stringValue(model.provider_icon_url, model.icon_url || ''),
    logoUrl: stringValue(model.logo_url, ''),
    modelName: stringValue(pickLang(model.name, model.name_en), '待更新'),
    inputPrice: formatPrice(model.input_price, model.currency),
    outputPrice: formatPrice(model.output_price, model.currency),
    contextLength: formatContext(model.context_length),
    multimodal: capabilities.includes('vision') ? '支持' : '待确认',
    apiSupport: '支持',
    rmbRecharge: stringValue(pickLang(model.rmb_recharge_support, model.rmb_recharge_support_en), '请以官网为准'),
    invoice: stringValue(pickLang(model.invoice_support, model.invoice_support_en), '请以官网为准'),
    rmbRechargeRaw: model.rmb_recharge_support ?? null,
    invoiceRaw: model.invoice_support ?? null,
    accessLevel: stringValue(model.access_level, ''),
    marketRegion: stringValue(model.market_region, ''),
    marketRegionLabel: stringValue(model.market_region_label, ''),
    scenarios,
    suitableFor: stringValue(pickLang(model.suitable_for, model.suitable_for_en), notes || '请以官网为准'),
    updatedAt: stringValue(model.last_updated, model.release_date || '待更新'),
    sourceUrl: stringValue(model.docs_url, model.plan_url || ''),
    packagePlans: Array.isArray(model.package_plans) ? model.package_plans : [],
    source,
    raw: model
  };
}

function normalizePlansFromModel(model, providerInfo = {}) {
  const rawPlans = model.packagePlans || [];
  return rawPlans
    .filter(plan => plan.status !== 'discontinued')
    .map(plan => {
        const monthlyPriceValue = numberOrNull(plan.monthly_price);
        const quarterlyPriceValue = numberOrNull(plan.quarterly_price);
        const annualPriceValue = numberOrNull(plan.annual_price);
        const monthlyCurrency = inferMonthlyCurrency(plan, model);
        const provider = stringValue(plan.provider, model.vendor);
        const brandInfo = providerInfo[provider] || {};
        const brandDomesticPayment = providerDomesticPayment(provider, providerInfo);
        const brandIntlNetwork = providerIntlNetwork(provider, providerInfo);
        return {
        id: stringValue(plan.id, `${model.id}-plan`),
        planId: stringValue(plan.planId, plan.plan_id || ''),
        brand: stringValue(plan.brand, plan.brand_slug || ''),
        name: stringValue(pickLang(plan.name, plan.name_en), '待更新套餐'),
        provider,
        providerIconUrl: stringValue(plan.provider_icon_url, plan.icon_url, model.providerIconUrl),
        modelName: model.modelName,
        modelId: stringValue(plan.model_id, model.id),
        modelIds: Array.isArray(plan.model_ids)
          ? plan.model_ids.map(id => String(id || '').trim()).filter(Boolean)
          : [],
        status: stringValue(plan.status, 'unknown'),
        statusLabel: (() => {
          if (plan.status) {
            const translated = t(`status.${plan.status}`);
            if (!translated.startsWith('status.')) return translated;
          }
          return stringValue(plan.status_label, t('status.pending'));
        })(),
        url: stringValue(pickLang(plan.url_cn, plan.url_en), plan.url_en, plan.url_cn),
        monthlyPrice: formatMonthlyPrice(plan.monthly_price, monthlyCurrency),
        monthlyPriceValue,
        monthlyCurrency,
        monthlyCurrencyLabel: monthlyCurrency === 'USD' ? t('currency.usd') : t('currency.cny'),
        quarterlyPrice: quarterlyPriceValue != null
          ? formatPeriodPrice(plan.quarterly_price, monthlyCurrency, t('common.perQuarter'))
          : '',
        quarterlyPriceValue,
        quarterlyMonthlyPrice: quarterlyPriceValue != null
          ? formatMonthlyPrice(quarterlyPriceValue / 3, monthlyCurrency)
          : '',
        quarterlyMonthlyPriceValue: quarterlyPriceValue != null ? quarterlyPriceValue / 3 : null,
        annualPrice: annualPriceValue != null
          ? formatPeriodPrice(plan.annual_price, monthlyCurrency, t('common.perYear'))
          : '',
        annualPriceValue,
        annualMonthlyPrice: annualPriceValue != null
          ? formatMonthlyPrice(annualPriceValue / 12, monthlyCurrency)
          : '',
        annualMonthlyPriceValue: annualPriceValue != null ? annualPriceValue / 12 : null,
        includedCalls: stringValue(pickLang(plan.included_calls, plan.included_calls_en), ''),
        notes: stringValue(pickLang(plan.notes, plan.notes_en), ''),
        planType: stringValue(plan.plan_type, inferPlanCategory(plan, model)),
        category: inferPlanCategory(plan, model),
        rmbRecharge: model.rmbRecharge,
        invoice: model.invoice,
        rmbRechargeRaw: model.rmbRechargeRaw,
        invoiceRaw: model.invoiceRaw,
        accessLevel: model.accessLevel,
        marketRegion: model.marketRegion,
        marketRegionLabel: model.marketRegionLabel,
        firstMonthPrice: plan.first_month_price != null ? plan.first_month_price : null,
        fiveHoursRequests: stringValue(pickLang(plan.five_hours_requests, plan.five_hours_requests_en), ''),
        weeklyRequests: stringValue(pickLang(plan.weekly_requests, plan.weekly_requests_en), ''),
        monthlyRequests: stringValue(pickLang(plan.monthly_requests, plan.monthly_requests_en), ''),
        measuredFiveHoursTokens: stringValue(plan.measured_five_hours_tokens, ''),
        measuredWeeklyTokens: stringValue(plan.measured_weekly_tokens, ''),
        measuredMonthlyTokens: stringValue(plan.measured_monthly_tokens, ''),
        tokenLimit: stringValue(plan.token_limit, ''),
        supportedModels: stringValue(
          pickLang(plan.supported_models, plan.supported_models_en),
          pickLang(brandInfo.supported_models, brandInfo.supported_models_en) || ''
        ),
        benefits: stringValue(pickLang(plan.benefits, plan.benefits_en), ''),
        rating: stringValue(plan.rating, ''),
        tags: stringValue(pickLang(plan.tags, plan.tags_en), ''),
        sourceUrl: stringValue(plan.source_url, ''),
        lastVerifiedAt: stringValue(plan.last_verified_at, ''),
        refundPolicy: stringValue(pickLang(plan.refund_policy, plan.refund_policy_en), ''),
        billingCycle: stringValue(plan.billing_cycle, ''),
        creditsLimit: stringValue(pickLang(plan.credits_limit, plan.credits_limit_en), ''),
        concurrencyLimit: stringValue(plan.concurrency_limit, ''),
        resetRule: stringValue(pickLang(plan.reset_rule, plan.reset_rule_en), ''),
        limitType: stringValue(plan.limit_type, inferLimitType(plan)),
        dataStatus: stringValue(plan.data_status, inferDataStatus(plan)),
        confidenceScore: plan.confidence_score != null ? plan.confidence_score : null,
        sourceType: stringValue(plan.source_type, ''),
        toolCompatibility: safeParseJson(plan.tool_compatibility_json, {}),
        modelMultiplier: safeParseJson(plan.model_multiplier_json, {}),
        derivedMetrics: safeParseJson(plan.derived_metrics_json, {}),
        measuredMetrics: safeParseJson(plan.measured_metrics_json, {}),
        risk: safeParseJson(plan.risk_json, {}),
        recommendation: safeParseJson(plan.recommendation_json, {}),
        changeSummary: safeParseJson(plan.change_summary_json, {}),
        linkType: stringValue(plan.link_type, 'official'),
        domesticPayment: brandDomesticPayment ?? boolValue(plan.domestic_payment),
        intlNetwork: brandIntlNetwork ?? boolValue(plan.intl_network),
        hasFirstMonthDiscount: plan.has_first_month_discount === true || plan.has_first_month_discount === 1,
        recommendationText: stringValue(pickLang(plan.recommendation_text, plan.recommendation_text_en), ''),
        riskText: stringValue(pickLang(plan.risk_text, plan.risk_text_en), ''),
        sortOrder: numberOrNull(plan.sort_order),

        raw: plan
      };
    });
}

function providerDomesticPayment(provider, providerInfo = {}) {
  const providerName = stringValue(provider);
  if (!providerName) return null;
  const metadata = providerInfo[providerName];
  if (!metadata || metadata.domestic_payment == null) return null;
  return boolValue(metadata.domestic_payment);
}

function providerIntlNetwork(provider, providerInfo = {}) {
  const providerName = stringValue(provider);
  if (!providerName) return null;
  const metadata = providerInfo[providerName];
  if (!metadata || metadata.intl_network == null) return null;
  return boolValue(metadata.intl_network);
}

const domesticKeywords = [
  'DeepSeek', '阿里云', '通义千问', '通义', '火山方舟', '火山引擎', '豆包',
  '智谱', 'GLM', 'Kimi', '月之暗面', 'MiniMax', '百度千帆', '百度',
  '腾讯混元', '腾讯', '硅基流动', '阶跃星辰',
  '国内', '人民币', '充值', '发票', '实名', '备案', '工信部',
  '百炼', '千帆', '清言', '元宝'
];

function inferRegion(item) {
  const text = [
    item.title, item.title_zh, item.summary, item.summary_zh,
    item.source, item.description
  ].filter(Boolean).join(' ');
  const lower = text.toLowerCase();
  for (const kw of domesticKeywords) {
    if (lower.includes(kw.toLowerCase())) return 'domestic';
  }
  return 'international';
}

function computeHeatScore(item, index) {
  let score = 100 - index;
  const text = `${item.title || ''} ${item.summary || ''}`.toLowerCase();
  if (/发布|上线|launch|release/.test(text)) score += 20;
  if (/价格|降价|price/.test(text)) score += 15;
  if (/开源|open.?source/.test(text)) score += 10;
  const published = item.publishedAt || item.published_at || item.createdAt || '';
  if (published) {
    const diff = Date.now() - new Date(published).getTime();
    if (diff < 86400000) score += 30;
    else if (diff < 259200000) score += 15;
  }
  return score;
}

function formatRelativeTime(published) {
  if (!published || published === '待更新') return '';
  const date = new Date(published);
  if (isNaN(date.getTime())) return published;
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return t('news.time.justNow');
  if (minutes < 60) return t('news.time.minutesAgo', { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t('news.time.hoursAgo', { n: hours });
  const days = Math.floor(hours / 24);
  if (days < 7) return t('news.time.daysAgo', { n: days });
  if (days < 30) return t('news.time.weeksAgo', { n: Math.floor(days / 7) });
  return date.toLocaleDateString(numberLocale(), { month: 'short', day: 'numeric' });
}

function normalizeBackendUpdate(item) {
  const title = stringValue(item.title, item.title_zh || t('news.untitled'));
  const summary = stringValue(item.summary, item.summary_zh || item.description || '');
  const text = `${title} ${summary}`;
  const published = stringValue(item.publishedAt, item.published_at || item.createdAt || '待更新');
  const region = inferRegion(item);
  return {
    id: stringValue(item.id, title),
    title,
    summary: summary || t('news.summary.empty'),
    source: sourceName(item.source),
    type: inferUpdateType(item.category, text),
    publishedAt: published,
    vendors: extractVendors(text),
    detailUrl: stringValue(item.url, item.sourceUrl || item.link || ''),
    region,
    regionLabel: region === 'domestic' ? t('news.region.domestic') : t('news.region.international'),
    heatScore: 0,
    relativeTime: formatRelativeTime(published),
    sourceMode: 'backend',
    raw: item
  };
}

function isRelevantUpdate(item) {
  const text = `${item.title} ${item.summary} ${item.type}`.toLowerCase();
  if (item.type === '模型发布' || item.type === 'API 上线' || item.type === '开源模型发布') return true;
  return /价格|套餐|api|上下文|context|计费|充值|发票|开源|模型/.test(text);
}

function isDisplayableUpdate(item) {
  return !isBlockedNewsUrl(item.detailUrl);
}

function isBlockedNewsUrl(url) {
  if (!url) return false;
  try {
    return blockedNewsHosts.has(new URL(url).hostname.toLowerCase());
  } catch {
    return false;
  }
}

function inferScenarios(model, inputPrice, contextLength, capabilities) {
  const text = compactText(model.name, model.provider, model.notes, model.plan_summary, model.access_notes).toLowerCase();
  const scenarios = new Set(['enterprise-api']);
  if (inputPrice != null && inputPrice <= 2) scenarios.add('low-cost');
  if (contextLength != null && contextLength >= 200000) scenarios.add('long-context');
  if (capabilities.includes('vision')) scenarios.add('multimodal');
  if (/个人|会员|订阅|聊天|kimi|豆包/.test(text)) scenarios.add('personal-use');
  return Array.from(scenarios);
}

function safeParseJson(value, fallback) {
  if (!value || typeof value !== 'string') return value || fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

function inferLimitType(plan) {
  if (plan.five_hours_requests) return 'five_hours';
  if (plan.weekly_requests) return 'weekly';
  if (plan.monthly_requests) return 'monthly';
  if (plan.token_limit) return 'token';
  if (plan.credits_limit) return 'credits';
  return 'undisclosed';
}

function inferDataStatus(plan) {
  if (plan.last_verified_at) return 'verified';
  if (plan.measured_monthly_tokens || plan.measured_weekly_tokens) return 'measured';
  return 'pending';
}

function inferPlanCategory(plan, model) {
  const text = compactText(plan.name, plan.provider, plan.notes, model.vendor, model.modelName).toLowerCase();
  if (/聚合|路由|硅基|siliconflow/.test(text)) return 'aggregated_router';
  if (/会员|订阅|chat|清言|kimi|豆包/.test(text)) return 'personal_subscription';
  if (/maas|百炼|千帆|腾讯云|火山方舟|企业/.test(text)) return 'enterprise_maas';
  if (/开源|部署|私有化/.test(text)) return 'open_source_deploy';
  if (/coding|qoder|claude code|cursor|trae/.test(text)) return 'coding_plan';
  return 'coding_plan';
}

function inferMonthlyCurrency(plan, model) {
  const explicitCurrency = stringValue(plan.monthly_currency).toUpperCase();
  if (explicitCurrency === 'USD') return 'USD';

  // 国际站品牌（market_region 为 international）默认美元结算，
  // 即使 DB 中 monthly_currency 为空或遗留默认值 CNY 也应纠正。
  const region = stringValue(model.market_region).toLowerCase();
  const isInternationalRegion = region === 'international' || region === 'domestic_international';

  if (explicitCurrency === 'CNY' && isInternationalRegion) return 'USD';

  const provider = stringValue(plan.provider, model.vendor);
  const providerKey = provider.toLowerCase();
  if (providerKey === 'qoder' || providerKey === 'qoder cn' || providerKey === 'byteplus'
    || providerKey === 'z.ai' || providerKey === 'grok' || providerKey === 'claude'
    || providerKey === 'chartgpt' || providerKey === 'google antigravity'
    || providerKey === 'opencode' || providerKey === 'anthropic' || providerKey === 'openai') return 'USD';

  if (isInternationalRegion) return 'USD';

  const text = compactText(plan.name, provider, plan.url_cn, plan.url_en, plan.included_calls, plan.notes).toLowerCase();
  if (/\$|usd|美元|trae\.ai/.test(text)) return 'USD';
  return 'CNY';
}

function inferUpdateType(category, text) {
  if (/价格|计费|降价|涨价|费用/.test(text)) return '价格调整';
  if (/上下文|context/.test(text)) return '上下文长度升级';
  if (/套餐|会员|订阅|资源包/.test(text)) return '国内平台套餐变化';
  if (/开源|open.?source|open weight/.test(text.toLowerCase())) return '开源模型发布';
  if (/api|接口|上线|开放/.test(text.toLowerCase())) return 'API 上线';
  if (category === 'ai-products') return 'API 上线';
  return '模型发布';
}

function extractVendors(text) {
  const lower = String(text || '').toLowerCase();
  const found = VENDOR_NAMES.filter(name => lower.includes(name.toLowerCase()));
  return found.length ? Array.from(new Set(found)) : [];
}

function sourceName(source) {
  if (!source) return '后台维护';
  if (typeof source === 'string') return source;
  return stringValue(source.name, source.title || source.id || '后台维护');
}

function stringValue(...values) {
  const value = values.find(item => item != null && String(item).trim());
  return value == null ? '' : String(value).trim();
}

function boolValue(value) {
  if (value === true || value === 1) return true;
  const text = String(value ?? '').trim().toLowerCase();
  return text === 'true' || text === '1' || text === 'yes';
}

// 检测文本是否主要为英文（拉丁字符占比超过 60% 且不含中文字符）。
function isMostlyLatin(text) {
  if (!text) return false;
  const value = String(text).trim();
  if (!value) return false;
  if (/[\u4e00-\u9fff]/.test(value)) return false;
  const latinCount = (value.match(/[a-zA-Z]/g) || []).length;
  return latinCount / value.length > 0.6;
}

// 当前为英文且英文值非空时取英文；中文模式下若基础值为英文且英文字段有不同内容则取英文字段，否则回退基础值。
function pickLang(base, en) {
  if (getLang() === 'en' && en != null && String(en).trim()) return en;
  if (getLang() === 'zh' && isMostlyLatin(base) && en != null && String(en).trim() && String(en).trim() !== String(base).trim()) return en;
  return base;
}

function numberOrNull(value) {
  if (value == null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function formatPrice(value, currency) {
  const number = numberOrNull(value);
  if (number == null) return stringValue(value, t('common.pending'));
  // 币种随后台 currency 字段显示，不做汇率转化（默认 CNY）
  const symbol = currency === 'USD' ? '$' : '¥';
  return `${symbol}${number.toLocaleString(numberLocale(), { maximumFractionDigits: 4 })}/${t('common.perMillionTokens')}`;
}

function formatMonthlyPrice(value, currency = 'CNY') {
  return formatPeriodPrice(value, currency, t('common.perMonth'));
}

function formatPeriodPrice(value, currency = 'CNY', period = t('common.perMonth')) {
  const number = numberOrNull(value);
  if (number == null) return t('common.official');
  const symbol = currency === 'USD' ? '$' : '\u00a5';
  return `${symbol}${number.toLocaleString(numberLocale(), { maximumFractionDigits: 2 })}/${period}`;
}

function formatContext(value) {
  const number = numberOrNull(value);
  if (number == null) return stringValue(value, t('common.official'));
  if (number >= 1000000) return `${(number / 1000000).toLocaleString(numberLocale(), { maximumFractionDigits: 1 })}M tokens`;
  if (number >= 1000) return `${(number / 1000).toLocaleString(numberLocale(), { maximumFractionDigits: 0 })}K tokens`;
  return `${number.toLocaleString(numberLocale())} tokens`;
}

function compactText(...values) {
  return values.filter(value => value != null && String(value).trim()).join(' ');
}

function latestDate(values) {
  return values.find(value => value && value !== '待更新') || '待更新';
}
