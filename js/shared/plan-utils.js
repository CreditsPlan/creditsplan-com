import { numberLocale, getLang, hasCjk, toEnglishDisplay } from '../i18n.js';

const UNKNOWN_VALUES = new Set(['待更新', '待确认', '请以官网为准']);

const PLAN_TYPE_SLUGS = {
  agent_plan: 'agent',
  api_package: 'api',
  coding_plan: 'coding',
  credits_plan: 'credits',
  token_plan: 'token'
};

const PLAN_TYPE_ALIASES = {
  coding: ['coding', 'code']
};

export function seoBrandSlugForProvider(provider, providerInfo = {}, providerNameMap = {}) {
  return String(providerMetadata(provider, providerInfo, providerNameMap).seo_slug || '').trim();
}

export function planDetailSlug(plan, brandSlug) {
  const id = String(plan?.id || '').trim().toLowerCase();
  const brand = String(brandSlug || '').trim().toLowerCase();
  if (!id || !brand) return '';
  if (id === brand || id.startsWith(`${brand}-`)) return id;

  const modelId = String(plan.modelId || plan.model_id || '').trim().toLowerCase();
  if (!modelId || !id.startsWith(`${modelId}-`)) return id;

  let suffix = id.slice(modelId.length + 1);
  const type = PLAN_TYPE_SLUGS[plan.planType || plan.plan_type] || '';
  for (const alias of PLAN_TYPE_ALIASES[type] || [type]) {
    if (alias && suffix.startsWith(`${alias}-`)) {
      suffix = suffix.slice(alias.length + 1);
      break;
    }
  }
  return [brand, type, suffix].filter(Boolean).join('-');
}

export function safeIconUrl(value) {
  const url = String(value || '').trim();
  if (!url || /[\s]/.test(url)) return '';
  const lower = url.toLowerCase();
  const inlineSvg = /^data:image\/svg\+xml;base64,[a-z0-9+/]+=*$/i.test(url);
  if (url.startsWith('/') || lower.startsWith('https://') || lower.startsWith('http://') || inlineSvg) return url;
  return '';
}

export function providerMetadata(provider, providerInfo = {}, providerNameMap = {}) {
  const name = String(provider || '').trim();
  const canonicalName = providerNameMap[name] || name;
  return providerInfo[canonicalName] || providerInfo[name] || {};
}

// 数据隐私维度：计划级覆盖（privacy_override_json）优先，其余继承品牌级默认值。
// 返回 { training, optOut, retention, policyUrl, verifiedAt, overridden, note }
export function resolvePlanPrivacy(plan, providerInfo = {}, providerNameMap = {}) {
  const metadata = providerMetadata(plan?.provider, providerInfo, providerNameMap);
  let override = plan?.privacyOverride;
  if (!override || typeof override !== 'object') {
    try { override = plan?.privacy_override_json ? JSON.parse(plan.privacy_override_json) : {}; } catch { override = {}; }
  }
  const en = getLang() === 'en';
  const pick = (base, enValue) => {
    const b = String(base || '').trim();
    const e = String(enValue || '').trim();
    if (en && e) return e;
    if (en) return toEnglishDisplay(b); // 英文界面不展示中文兜底值
    return b || e;
  };
  const training = String(override.data_training || metadata.data_training || '').trim();
  const optOut = pick(override.training_opt_out || metadata.training_opt_out, metadata.training_opt_out_en);
  const retention = pick(override.data_retention || metadata.data_retention, metadata.data_retention_en);
  const policyUrl = String(metadata.privacy_policy_url || '').trim();
  const verifiedAt = String(metadata.privacy_verified_at || '').trim();
  const note = String(override.note || '').trim();
  const overridden = Boolean(override.data_training || note);
  return { training, optOut, retention, policyUrl, verifiedAt, overridden, note };
}

export function displayNameForProvider(provider, providerInfo = {}, providerNameMap = {}) {
  const metadata = providerMetadata(provider, providerInfo, providerNameMap);
  const enName = String(metadata.name_en ?? '').trim();
  const baseName = String(metadata.name || provider || '').trim();
  if (getLang() === 'en') {
    if (enName) return enName;
    if (!hasCjk(baseName)) return baseName;
    // 混合型中文品牌键（如「快手StreamLake」）在英文界面只保留拉丁部分
    return baseName.replace(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, '').trim();
  }
  return baseName;
}

export function providerSortOrder(provider, providerInfo = {}, providerNameMap = {}) {
  const sortOrder = providerMetadata(provider, providerInfo, providerNameMap).sort_order;
  return typeof sortOrder === 'number' ? sortOrder : Infinity;
}

export function planSortOrder(plan) {
  const value = plan?.sortOrder;
  return typeof value === 'number' && Number.isFinite(value) ? value : Infinity;
}

export function sortPlansBySortOrder(plans) {
  return plans
    .map((plan, index) => ({ plan, index }))
    .sort((a, b) => (planSortOrder(a.plan) - planSortOrder(b.plan)) || (a.index - b.index))
    .map(entry => entry.plan);
}

export function planKey(plan) {
  return [plan.id, plan.modelId, plan.provider, plan.name]
    .map(value => String(value || '').trim())
    .join('::');
}

export function findPlanByKey(plans, key) {
  if (!key) return null;
  return plans.find(plan => planKey(plan) === key) || null;
}

export function cleanValue(value) {
  const text = String(value ?? '').trim();
  return text && !UNKNOWN_VALUES.has(text) ? text : '';
}

function isGarbledText(text) {
  if (!text) return true;
  const value = String(text).trim();
  if (!value) return true;
  const replacementCount = (value.match(/\?/g) || []).length;
  return replacementCount > value.length * 0.3;
}

export function getRiskDisplayText(plan) {
  if (plan.riskText && !isGarbledText(plan.riskText)) return plan.riskText;
  if (plan.risk && Array.isArray(plan.risk.risks)) {
    const validRisks = plan.risk.risks.filter(risk => risk && !isGarbledText(risk));
    if (validRisks.length) return validRisks.join(getLang() === 'en' ? '; ' : '；');
  }
  return '';
}

export function supportedModelDisplay(plan) {
  const firstModel = String(plan.supportedModels || '').split(/[,，;；、\n]/)[0].trim();
  return cleanValue(firstModel);
}

function planMonthlyNumber(plan) {
  if (Number.isFinite(plan.monthlyPriceValue)) return plan.monthlyPriceValue;
  const number = parseFloat(String(plan.monthlyPrice).match(/[\d.]+/)?.[0]);
  return Number.isFinite(number) ? number : null;
}

export function filterFreePlans(plans) {
  return plans.filter(plan => planMonthlyNumber(plan) === 0);
}

export function filterPlansByProviderInfo(plans, providerInfo = {}, providerNameMap = {}) {
  return plans.filter(plan => {
    const provider = String(plan.provider || '').trim();
    const canonicalProvider = providerNameMap[provider] || provider;
    return providerInfo[canonicalProvider] != null || providerInfo[provider] != null;
  });
}

export function currencySymbol(currency) {
  return currency === 'USD' ? '$' : '¥';
}

export function formatPriceNumber(value) {
  return value.toLocaleString(numberLocale(), { maximumFractionDigits: 2 });
}

export function hasDisplayPrice(value) {
  return cleanValue(value) !== '';
}

export function optionalDetailText(value) {
  const text = String(value ?? '').trim();
  return text && !UNKNOWN_VALUES.has(text) ? text : '';
}

function isYesLikeValue(value) {
  const text = String(value ?? '').trim();
  return Boolean(text) && /^(支持|已支持|yes|true|1|可|可开)/i.test(text);
}

function isConfirmedValue(value) {
  const text = String(value ?? '').trim();
  return Boolean(text) && !/官网为准|待确认|未核实|待更新/.test(text);
}

export function planIsInternational(plan) {
  const currency = String(plan.monthlyCurrency || '').toUpperCase();
  if (currency && currency !== 'CNY') return true;
  const region = String(plan.marketRegion || '').toLowerCase();
  return region === 'international' || region === 'domestic_international';
}

export function planRmbFlag(plan) {
  const raw = plan.rmbRechargeRaw != null ? plan.rmbRechargeRaw : plan.rmbRecharge;
  return { yes: isYesLikeValue(raw), confirmed: isConfirmedValue(raw), raw };
}

export function planInvoiceFlag(plan) {
  const raw = plan.invoiceRaw != null ? plan.invoiceRaw : plan.invoice;
  return { yes: isYesLikeValue(raw), confirmed: isConfirmedValue(raw), raw };
}

// 核实时效：超过阈值天数未核实自动降级为「待复核」
export const VERIFIED_STALE_DAYS = 30;

export function verifiedFreshness(lastVerifiedAt) {
  const date = String(lastVerifiedAt || '').trim();
  if (!date) return { state: 'unknown', days: null, date: '' };
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return { state: 'unknown', days: null, date };
  const days = Math.max(0, Math.floor((Date.now() - parsed.getTime()) / 86400000));
  return { state: days > VERIFIED_STALE_DAYS ? 'stale' : 'fresh', days, date };
}

// 隐私信息核查时效：隐私政策变化频率低于价格，阈值放宽到 90 天
export const PRIVACY_STALE_DAYS = 90;

export function privacyFreshness(privacyVerifiedAt) {
  const date = String(privacyVerifiedAt || '').trim();
  if (!date) return { state: 'unknown', days: null, date: '' };
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return { state: 'unknown', days: null, date };
  const days = Math.max(0, Math.floor((Date.now() - parsed.getTime()) / 86400000));
  return { state: days > PRIVACY_STALE_DAYS ? 'stale' : 'fresh', days, date };
}
