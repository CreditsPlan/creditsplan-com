import { numberLocale, getLang } from '../i18n.js';

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

export function displayNameForProvider(provider, providerInfo = {}, providerNameMap = {}) {
  const metadata = providerMetadata(provider, providerInfo, providerNameMap);
  const en = metadata.name_en;
  const localized = (getLang() === 'en' && en != null && String(en).trim()) ? en : metadata.name;
  return String(localized || provider || '');
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
    if (validRisks.length) return validRisks.join('；');
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
