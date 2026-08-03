import { escapeHtml, safeExternalUrl } from './render.js';
import { t, getLang } from './i18n.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import {
  currencySymbol,
  displayNameForProvider,
  formatPriceNumber,
  getRiskDisplayText,
  hasDisplayPrice,
  optionalDetailText,
  privacyFreshness,
  resolvePlanPrivacy,
  sourceTypeKind,
  supportedModelDisplay,
  verifiedFreshness
} from './shared/plan-utils.js';
import { planQuotaDisplay } from './shared/quota-utils.js';

export const PLAN_TYPE_LABELS = {
  coding_plan: t('planType.codingPlan'),
  token_plan: t('planType.tokenPlan'),
  agent_plan: t('planType.agentPlan'),
  credits_plan: t('planType.creditsPlan'),
  api_package: t('planType.apiPackage')
};

export function outboundTrackingAttributes(plan) {
  const planId = String(plan.planId || plan.plan_id || plan.raw?.planId || plan.raw?.plan_id || '').trim();
  const brand = String(
    plan.brand || plan.brandSlug || plan.brand_slug || plan.raw?.brand || plan.raw?.brand_slug || planId.split('.')[0] || ''
  ).trim();
  return `data-track="plan-out" data-plan-id="${escapeHtml(planId)}" data-brand="${escapeHtml(brand)}"`;
}

// affiliate 跳转层：配置了邀请码的套餐走站内 /go/{plan_id}（nginx 302 带码 URL），
// 其余保持官方直链；带码外跳按规范标注 rel="sponsored nofollow"。
export function purchaseLinkTarget(plan, planUrl) {
  const planId = String(plan.planId || plan.plan_id || plan.raw?.planId || plan.raw?.plan_id || '').trim();
  const hasAffiliate = plan.hasAffiliate === true || plan.raw?.has_affiliate === true;
  if (hasAffiliate && planId && /^[A-Za-z0-9._-]+$/.test(planId)) {
    return { href: `/go/${planId}`, rel: 'sponsored nofollow noopener noreferrer' };
  }
  return { href: planUrl, rel: 'noopener noreferrer nofollow' };
}

function addPlanExtraRow(rows, label, value, keepInline, wide, compactInline, nowrapValue) {
  const text = optionalDetailText(value);
  if (text) {
    rows.push({
      label,
      value: text,
      keepInline: keepInline || false,
      wide: wide || false,
      compactInline: compactInline || false,
      nowrapValue: nowrapValue || false
    });
  }
}

function notesWithoutTableDuplicates(plan, providerInfo = {}) {
  const notes = optionalDetailText(plan.notes);
  if (!notes) return '';
  const resetRule = optionalDetailText(plan.resetRule);
  if (resetRule && notes.includes(resetRule)) return '';
  const tableValues = [
    plan.name,
    displayNameForProvider(plan.provider, providerInfo, PROVIDER_NAME_MAP),
    supportedModelDisplay(plan),
    plan.monthlyPrice,
    plan.quarterlyPrice,
    plan.quarterlyMonthlyPrice,
    plan.annualPrice,
    plan.annualMonthlyPrice,
    plan.statusLabel,
    plan.lastVerifiedAt
  ];
  for (const value of tableValues) {
    const text = optionalDetailText(value);
    if (!text) continue;
    if (notes.includes(text)) return '';
    const compactText = text.replace(/[\s年月季约/]/g, '');
    if (compactText.length >= 2 && notes.includes(compactText)) return '';
  }
  return notes;
}

// First-month promo line: only shown when the intro price beats the standard monthly price.
export function firstMonthPriceText(plan) {
  const value = Number(plan.firstMonthPrice);
  if (!Number.isFinite(value) || value <= 0) return '';
  const monthly = Number(plan.monthlyPriceValue);
  if (Number.isFinite(monthly) && value >= monthly) return '';
  return `${currencySymbol(plan.monthlyCurrency || 'USD')}${formatPriceNumber(value)}`;
}

function firstMonthLineHtml(plan) {
  const text = firstMonthPriceText(plan);
  return text
    ? `<div class="plan-price-subline plan-price-subline--first"><span>${escapeHtml(t('price.firstMonth'))}</span><strong>${escapeHtml(text)}/${escapeHtml(t('common.perMonth'))}</strong></div>`
    : '';
}

export function renderPlanPriceBlock(plan) {
  const hasMonthlyPrice = hasDisplayPrice(plan.monthlyPrice);
  const hasQuarterlyPrice = hasDisplayPrice(plan.quarterlyPrice);
  const hasAnnualPrice = hasDisplayPrice(plan.annualPrice);
  if (!hasMonthlyPrice && !hasQuarterlyPrice && !hasAnnualPrice) return '';

  if (hasAnnualPrice) {
    const annualMainPrice = hasDisplayPrice(plan.annualMonthlyPrice) ? plan.annualMonthlyPrice : plan.annualPrice;
    const quarterlyLineHtml = hasQuarterlyPrice
      ? `<div class="plan-price-subline"><span>${escapeHtml(t('price.quarterly'))}</span><strong>${escapeHtml(plan.quarterlyPrice)}</strong></div>`
      : '';
    const originalMonthlyHtml = hasMonthlyPrice
      ? `<span class="plan-price-original">${escapeHtml(plan.monthlyPrice)}</span>`
      : '';
    const monthlyLineHtml = hasMonthlyPrice
      ? `<div class="plan-price-subline"><span>${escapeHtml(t('price.monthly'))}</span><strong>${escapeHtml(plan.monthlyPrice)}</strong></div>`
      : '';
    return `
      <div class="plan-price-block">
        <div class="plan-price-mainline">
          <span class="plan-price-label">${escapeHtml(t('price.annual'))}</span>
          <span class="plan-price-main">${escapeHtml(annualMainPrice)}</span>
          ${originalMonthlyHtml}
        </div>
        <div class="plan-price-subline"><span>${escapeHtml(t('price.byYear'))}</span><strong>${escapeHtml(plan.annualPrice)}</strong></div>
        ${quarterlyLineHtml}
        ${monthlyLineHtml}
        ${firstMonthLineHtml(plan)}
      </div>`;
  }

  if (hasQuarterlyPrice) {
    const quarterlyMainPrice = hasDisplayPrice(plan.quarterlyMonthlyPrice) ? plan.quarterlyMonthlyPrice : plan.quarterlyPrice;
    const originalMonthlyHtml = hasMonthlyPrice
      ? `<span class="plan-price-original">${escapeHtml(plan.monthlyPrice)}</span>`
      : '';
    const monthlyLineHtml = hasMonthlyPrice
      ? `<div class="plan-price-subline"><span>${escapeHtml(t('price.monthly'))}</span><strong>${escapeHtml(plan.monthlyPrice)}</strong></div>`
      : '';
    return `
      <div class="plan-price-block">
        <div class="plan-price-mainline">
          <span class="plan-price-label">${escapeHtml(t('price.quarterly'))}</span>
          <span class="plan-price-main">${escapeHtml(quarterlyMainPrice)}</span>
          ${originalMonthlyHtml}
        </div>
        <div class="plan-price-subline"><span>${escapeHtml(t('price.byQuarter'))}</span><strong>${escapeHtml(plan.quarterlyPrice)}</strong></div>
        ${monthlyLineHtml}
        ${firstMonthLineHtml(plan)}
      </div>`;
  }

  return `
    <div class="plan-price-block">
      <div class="plan-price-mainline">
        <span class="plan-price-label">${escapeHtml(t('price.monthly'))}</span>
        <span class="plan-price-main">${escapeHtml(plan.monthlyPrice)}</span>
      </div>
      ${firstMonthLineHtml(plan)}
    </div>`;
}

export function renderSelectedPlanDetail(plan, providerInfo = {}) {
  if (!plan) return '';
  const typeLabel = PLAN_TYPE_LABELS[plan.planType] || plan.planType || '';
  const rows = [];
  const hasRmb = plan.rmbRecharge && plan.rmbRecharge !== 'TBD' && plan.rmbRecharge !== 'See official site';
  const hasInvoice = plan.invoice && plan.invoice !== 'TBD' && plan.invoice !== 'See official site';
  const privacy = resolvePlanPrivacy(plan, providerInfo, PROVIDER_NAME_MAP);
  // 额度列已展示的字段不在展开详情中重复；包含调用量与 Token 上限内容重复时只保留一处
  const quotaField = (planQuotaDisplay(plan) || {}).field || '';
  const compactTokenLimit = optionalDetailText(plan.tokenLimit).replace(/\s+/g, '');
  const tokenLimitDuplicated = Boolean(compactTokenLimit)
    && optionalDetailText(plan.includedCalls).replace(/\s+/g, '').includes(compactTokenLimit);

  addPlanExtraRow(rows, t('detail.type'), typeLabel, false, false, true);
  addPlanExtraRow(rows, t('detail.supportedModels'), (plan.supportedModelNames || []).join(getLang() === 'en' ? ', ' : '、'), false, true);
  if (plan.firstMonthPrice != null) {
    const firstMonthPrice = Number(plan.firstMonthPrice);
    addPlanExtraRow(rows, t('detail.firstMonth'), Number.isFinite(firstMonthPrice)
      ? `${currencySymbol(plan.monthlyCurrency || 'USD')}${formatPriceNumber(firstMonthPrice)}`
      : plan.firstMonthPrice);
  }
  if (plan.domesticPayment) addPlanExtraRow(rows, t('detail.domesticPay'), t('common.supported'), false, false, true);
  if (quotaField !== 'includedCalls') addPlanExtraRow(rows, t('detail.includedCalls'), plan.includedCalls, false, false, true);
  // Combine five-hour, weekly, monthly requests into a single row to prevent wrapping
  const fiveHourText = optionalDetailText(plan.fiveHoursRequests);
  const weeklyText = optionalDetailText(plan.weeklyRequests);
  const monthlyText = quotaField === 'monthlyRequests' ? '' : optionalDetailText(plan.monthlyRequests);
  if (fiveHourText || weeklyText || monthlyText) {
    rows.push({
      label: '',
      value: '',
      keepInline: false,
      wide: false,
      compactInline: false,
      nowrapValue: false,
      isRequestsRow: true,
      fiveHourText,
      weeklyText,
      monthlyText
    });
  }
  addPlanExtraRow(rows, t('detail.fiveHourTokens'), plan.measuredFiveHoursTokens);
  addPlanExtraRow(rows, t('detail.weeklyTokens'), plan.measuredWeeklyTokens);
  addPlanExtraRow(rows, t('detail.monthlyTokens'), plan.measuredMonthlyTokens);
  if (quotaField !== 'tokenLimit' && !tokenLimitDuplicated) addPlanExtraRow(rows, t('detail.tokenLimit'), plan.tokenLimit);
  addPlanExtraRow(rows, t('detail.benefits'), plan.benefits ? plan.benefits.replace(/\n/g, getLang() === 'en' ? '; ' : '；') : undefined);
  addPlanExtraRow(rows, t('detail.inputPrice'), plan.modelInputPrice);
  addPlanExtraRow(rows, t('detail.outputPrice'), plan.modelOutputPrice);
  if (plan.monthlyCurrency === 'USD') {
    addPlanExtraRow(rows, t('detail.payCurrency'), plan.monthlyCurrencyLabel || t('currency.usd'), true);
  } else if (hasRmb) {
    addPlanExtraRow(rows, t('detail.rmbRecharge'), plan.rmbRecharge);
  }
  if (hasInvoice) addPlanExtraRow(rows, t('detail.invoice'), plan.invoice, true);
  addPlanExtraRow(rows, t('detail.creditsLimit'), plan.creditsLimit, true);
  addPlanExtraRow(rows, t('detail.concurrency'), plan.concurrencyLimit);
  addPlanExtraRow(rows, t('detail.resetRule'), plan.resetRule, false, true);
  addPlanExtraRow(rows, t('detail.refund'), plan.refundPolicy);
  addPlanExtraRow(rows, t('detail.rating'), plan.rating);
  addPlanExtraRow(rows, t('detail.tags'), plan.tags);
  addPlanExtraRow(rows, t('detail.suitableScene'), plan.suitableFor);
  addPlanExtraRow(rows, t('detail.recommendedFor'), plan.recommendationText, false, true);
  addPlanExtraRow(rows, t('detail.caution'), getRiskDisplayText(plan), false, true);
  if (privacy.training) {
    const trainingLabel = t(`privacy.training.${privacy.training}`) || privacy.training;
    const privacyFresh = privacyFreshness(privacy.verifiedAt);
    const openParen = getLang() === 'en' ? ' (' : '（';
    const closeParen = getLang() === 'en' ? ')' : '）';
    const freshnessNote = privacyFresh.state === 'stale'
      ? `${openParen}${t('privacy.verifiedStale', { date: privacyFresh.date })}${closeParen}`
      : (privacyFresh.state === 'fresh' ? `${openParen}${t('privacy.verifiedOn', { date: privacyFresh.date })}${closeParen}` : '');
    const baseLabel = privacy.note ? `${trainingLabel}${openParen}${privacy.note}${closeParen}` : trainingLabel;
    addPlanExtraRow(rows, t('privacy.label.dataTraining'), `${baseLabel}${freshnessNote}`, true);
  }
  addPlanExtraRow(rows, t('privacy.label.optOut'), privacy.optOut);
  addPlanExtraRow(rows, t('privacy.label.retention'), privacy.retention);
  addPlanExtraRow(rows, t('detail.notes'), notesWithoutTableDuplicates(plan, providerInfo), false, true);

  const rowsHtml = rows.length ? rows.map(row => {
    if (row.isRequestsRow) {
      return `
      <div class="plan-extra-item plan-extra-requests-row">
        ${row.fiveHourText ? `<div class="plan-requests-metric">
          <span class="plan-extra-label">${escapeHtml(t('detail.fiveHourReq'))}</span>
          <span class="plan-extra-value">${escapeHtml(row.fiveHourText)}</span>
        </div>` : ''}
        ${row.weeklyText ? `<div class="plan-requests-metric">
          <span class="plan-extra-label">${escapeHtml(t('detail.weeklyReq'))}</span>
          <span class="plan-extra-value">${escapeHtml(row.weeklyText)}</span>
        </div>` : ''}
        ${row.monthlyText ? `<div class="plan-requests-metric">
          <span class="plan-extra-label">${escapeHtml(t('detail.monthlyReq'))}</span>
          <span class="plan-extra-value">${escapeHtml(row.monthlyText)}</span>
        </div>` : ''}
      </div>`;
    }
    const isLong = row.value.length > 40 || row.wide;
    const itemClass = row.keepInline
      ? 'plan-extra-item plan-extra-inline'
      : (isLong ? 'plan-extra-item plan-extra-wide' : `plan-extra-item ${row.compactInline ? 'plan-extra-compact-inline' : 'plan-extra-inline'}`);
    const nowrapClass = row.nowrapValue ? ' plan-extra-nowrap' : '';
    return `
    <div class="${itemClass}${nowrapClass}">
      <span class="plan-extra-label">${escapeHtml(row.label)}</span>
      <span class="plan-extra-value">${escapeHtml(row.value)}</span>
    </div>`;
  }).join('') : `<p class="plan-extra-empty">${escapeHtml(t('detail.empty'))}</p>`;
  const planUrl = safeExternalUrl(plan.url);
  const purchaseLink = purchaseLinkTarget(plan, planUrl);
  const sourceKind = sourceTypeKind(plan.sourceType);
  const sourceTypeLabel = sourceKind
    ? t(`source.${sourceKind}`)
    : (plan.sourceType || t('detail.sourceMaintained'));
  const verifiedFresh = verifiedFreshness(plan.lastVerifiedAt);
  const verifiedText = verifiedFresh.state === 'fresh'
    ? t('detail.verifiedFresh', {
      date: verifiedFresh.date,
      rel: verifiedFresh.days === 0 ? t('verified.relToday') : t('verified.relDaysAgo', { n: verifiedFresh.days })
    })
    : verifiedFresh.state === 'stale'
      ? t('detail.verifiedStale', { date: verifiedFresh.date })
      : '';
  const sourceMeta = verifiedText
    ? `${escapeHtml(t('detail.source'))}${getLang() === 'en' ? ': ' : '：'}${escapeHtml(sourceTypeLabel)} · ${escapeHtml(verifiedText)}`
    : '';
  const privacyPolicyLink = privacy.policyUrl
    ? `<a href="${escapeHtml(privacy.policyUrl)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(t('privacy.policySource'))}</a>`
    : '';
  const footerHtml = sourceMeta || planUrl || privacyPolicyLink
    ? `<div class="selected-plan-detail-footer">
        <span>${sourceMeta}</span>
        <span class="selected-plan-detail-footer-links">
          ${privacyPolicyLink}
          ${planUrl ? `<a href="${escapeHtml(purchaseLink.href)}" target="_blank" rel="${purchaseLink.rel}" ${outboundTrackingAttributes(plan)}>${escapeHtml(t('detail.openOfficial'))}</a>` : ''}
        </span>
       </div>`
    : '';

  return `
    <section class="selected-plan-detail" aria-live="polite">
      <div class="plan-detail-header selected-plan-detail-header"></div>
      <div class="selected-plan-detail-body">
        <div class="plan-extra-list">
          ${rowsHtml}
        </div>
        ${footerHtml}
      </div>
    </section>
  `;
}
