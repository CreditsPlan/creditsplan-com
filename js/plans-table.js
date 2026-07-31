import { escapeHtml, safeExternalUrl } from './render.js';
import { t } from './i18n.js';
import { PROVIDER_NAME_MAP, brandForProvider } from './shared/brands.js';
import {
  currencySymbol,
  displayNameForProvider,
  filterPlansByProviderInfo,
  formatPriceNumber,
  hasDisplayPrice,
  planDetailSlug,
  planIsInternational,
  planKey,
  providerMetadata,
  providerSortOrder,
  resolvePlanPrivacy,
  safeIconUrl,
  seoBrandSlugForProvider,
  sortPlansBySortOrder,
  supportedModelDisplay,
  verifiedFreshness
} from './shared/plan-utils.js';
import {
  PLAN_TABLE_FILTER_COLUMNS,
  applyPlanTableFilter,
  isAvailableOnlyActive,
  isPlanTableFilterActive,
  planBillingUnitIsDisclosed,
  planBillingUnitLabel,
  renderPlanTableFilterHeader,
  renderPlanTableFilterSummary,
  renderPlanTableQuickFilters,
  setPlanTablePrivacyContext
} from './plans-filters.js';
import {
  PLAN_TYPE_LABELS,
  firstMonthPriceText,
  outboundTrackingAttributes,
  purchaseLinkTarget,
  renderPlanPriceBlock,
  renderSelectedPlanDetail
} from './plans-detail.js';
import { planQuotaDisplay, planUnitPriceDisplay } from './shared/quota-utils.js';

const PLAN_TABLE_GROUP_PREVIEW = 2;

// 核实徽标：30 天内显示「✓ Verified Xd ago」，超期降级「Needs re-check」，无记录不展示
function verifiedBadgeHtml(plan) {
  const fresh = verifiedFreshness(plan.lastVerifiedAt);
  if (fresh.state === 'fresh') {
    const label = fresh.days === 0 ? t('verified.freshToday') : t('verified.freshDaysAgo', { n: fresh.days });
    return `<span class="whitespace-nowrap rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${escapeHtml(t('verified.freshTitle', { date: fresh.date }))}">${escapeHtml(label)}</span>`;
  }
  if (fresh.state === 'stale') {
    return `<span class="whitespace-nowrap rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:bg-amber-950/40 dark:text-amber-300" title="${escapeHtml(t('verified.staleTitle', { date: fresh.date }))}">${escapeHtml(t('verified.stale'))}</span>`;
  }
  return '';
}

function planDetailHref(plan, providerInfo) {
  const brandSlug = seoBrandSlugForProvider(plan.provider, providerInfo, PROVIDER_NAME_MAP);
  const detailSlug = planDetailSlug(plan, brandSlug);
  return detailSlug ? `/plans/${encodeURIComponent(detailSlug)}/` : '';
}

// 品牌页链接：仅当品牌主数据已配置 SEO Slug、介绍与 Logo（即已生成 /brands/<slug>/ 页面）时返回
function brandDetailHref(provider, providerInfo) {
  const metadata = providerMetadata(provider, providerInfo, PROVIDER_NAME_MAP);
  const slug = String(metadata.seo_slug || '').trim();
  const intro = String(metadata.seo_intro || '').trim();
  const icon = String(metadata.icon_url || '').trim();
  return slug && intro && icon ? `/brands/${encodeURIComponent(slug)}/` : '';
}

function planIconUrl(plan, providerInfo = {}) {
  const metadata = providerMetadata(plan.provider, providerInfo, PROVIDER_NAME_MAP);
  return safeIconUrl(metadata.icon_url)
    || safeIconUrl(plan.providerIconUrl)
    || safeIconUrl(brandForProvider(plan.provider)?.iconUrl);
}

export function renderBrandIcon(iconUrl, label, className = 'brand-icon') {
  const safeUrl = safeIconUrl(iconUrl);
  const initial = String(label || '?').trim().slice(0, 1).toUpperCase() || '?';
  const fallbackClass = safeUrl ? 'brand-icon-fallback hidden' : 'brand-icon-fallback';
  return `<span class="${className}" aria-hidden="true">
    ${safeUrl ? `<img class="brand-icon-img" src="${escapeHtml(safeUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ''}
    <span class="${fallbackClass}">${escapeHtml(initial)}</span>
  </span>`;
}

function groupPlansByProvider(plans, providerInfo) {
  const groupMap = new Map();
  for (const plan of plans) {
    const key = PROVIDER_NAME_MAP[plan.provider] || plan.provider;
    if (!groupMap.has(key)) {
      groupMap.set(key, {
        provider: plan.provider,
        label: displayNameForProvider(plan.provider, providerInfo, PROVIDER_NAME_MAP),
        iconUrl: planIconUrl(plan, providerInfo),
        brandHref: brandDetailHref(plan.provider, providerInfo),
        plans: []
      });
    }
    groupMap.get(key).plans.push(plan);
  }
  const groups = [...groupMap.values()];
  for (const group of groups) {
    group.plans = sortPlansBySortOrder(group.plans);
  }
  groups.sort((a, b) => (
    providerSortOrder(a.provider, providerInfo, PROVIDER_NAME_MAP)
      - providerSortOrder(b.provider, providerInfo, PROVIDER_NAME_MAP)
  ));
  return groups;
}

function planIsAvailable(plan) {
  return plan.status === 'available' || plan.statusLabel === '可用' || plan.statusLabel === '可购买';
}

function planCheapestMonthly(plan) {
  let value = null;
  if (Number.isFinite(plan.monthlyPriceValue)) {
    value = plan.monthlyPriceValue;
  } else {
    const match = String(plan.monthlyPrice || '').match(/[\d.]+/);
    const parsed = match ? parseFloat(match[0]) : NaN;
    if (Number.isFinite(parsed)) value = parsed;
  }
  if (value == null || value < 0) return null;
  return { value, currency: plan.monthlyCurrency || 'USD' };
}

function planCheapestMonthlyValue(plans) {
  let min = null;
  for (const plan of plans) {
    const entry = planCheapestMonthly(plan);
    if (!entry) continue;
    if (min == null || entry.value < min.value) min = entry;
  }
  return min;
}

function renderGroupSummary(group) {
  const cheapest = planCheapestMonthlyValue(group.plans);
  const availableCount = group.plans.filter(planIsAvailable).length;
  const parts = [];
  if (cheapest != null) {
    parts.push(cheapest.value === 0
      ? t('group.summary.free')
      : t('group.summary.from', { symbol: currencySymbol(cheapest.currency), price: formatPriceNumber(cheapest.value) }));
  }
  if (availableCount > 0) {
    parts.push(t('group.summary.available', { n: availableCount }));
  }
  const text = parts.join(' · ');
  return `<span class="plan-table-group-summary">${escapeHtml(text)}</span>`;
}

function renderDataTrainingCell(plan, providerInfo) {
  const privacy = resolvePlanPrivacy(plan, providerInfo, PROVIDER_NAME_MAP);
  if (privacy.training === 'no') {
    return `<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${escapeHtml(t('privacy.training.no'))}">${escapeHtml(t('privacy.cell.no'))}</span>`;
  }
  if (privacy.training === 'yes') {
    return `<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${escapeHtml(t('privacy.training.yes'))}">${escapeHtml(t('privacy.cell.yes'))}</span>`;
  }
  if (privacy.training === 'unclear') {
    return `<span class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(t('privacy.training.unclear'))}</span>`;
  }
  return '<span class="text-slate-400">—</span>';
}

function planStatusClass(plan) {
  if (plan.status === 'available' || plan.statusLabel === '可用' || plan.statusLabel === '可购买') {
    return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300';
  }
  if (plan.status === 'rush_sale') {
    return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
  }
  return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
}

function planPriceCard(plan, trustHtml = '', domesticHtml = '', isExpanded = false) {
  const statusColor = planStatusClass(plan);
  const hasSpecificPricing = plan.includedCalls && plan.includedCalls.length > 10
    && (plan.includedCalls.includes('¥') || plan.includedCalls.includes('元') || plan.includedCalls.includes('百万'));
  const typeLabel = PLAN_TYPE_LABELS[plan.planType] || plan.planType || '';

  let priceHtml;
  const subscriptionPriceHtml = renderPlanPriceBlock(plan);
  if (subscriptionPriceHtml) {
    priceHtml = subscriptionPriceHtml;
  } else if (hasSpecificPricing) {
    priceHtml = `<span class="text-sm font-semibold text-slate-700 dark:text-slate-300">${escapeHtml(plan.includedCalls)}</span>`;
  } else if (plan.includedCalls || plan.planType !== 'api-usage') {
    priceHtml = `<span class="text-lg font-bold text-slate-500 dark:text-slate-400">${escapeHtml(t('table.price.official'))}</span>`;
  } else {
    priceHtml = `<span class="text-lg font-bold text-slate-400 dark:text-slate-500">${escapeHtml(t('table.price.usage'))}</span>`;
  }

  const cardQuota = planQuotaDisplay(plan);
  const cardUnitPrice = planUnitPriceDisplay(plan);
  const quotaRowHtml = (cardQuota || cardUnitPrice)
    ? `<div class="plan-card-quota-row mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
        ${cardQuota ? `<span title="${escapeHtml(cardQuota.full)}">${escapeHtml(t('table.col.quota'))}: ${escapeHtml(cardQuota.text)}</span>` : ''}
        ${cardUnitPrice ? `<span class="font-medium text-brand-700 dark:text-brand-300"${cardUnitPrice.estimated ? ` title="${escapeHtml(t('table.unitPrice.estimated'))}"` : ''}>${escapeHtml(cardUnitPrice.text)}</span>` : ''}
      </div>`
    : '';

  return `
    <div class="plan-card">
      <div class="plan-card-head">
        <div class="plan-card-title-row flex items-start justify-between gap-2">
          <div class="flex min-w-0 flex-1 items-start gap-2">
            ${trustHtml}
            <div class="min-w-0 flex-1">
              <p class="plan-card-title">${escapeHtml(plan.name)}</p>
            </div>
          </div>
          <div class="plan-card-meta flex shrink-0 flex-col items-end gap-1.5">
            <span class="whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${statusColor}">${escapeHtml(plan.statusLabel)}</span>
            ${domesticHtml}
            ${typeLabel ? `<span class="whitespace-nowrap rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-medium text-brand-600 dark:bg-brand-950/40 dark:text-brand-300">${escapeHtml(typeLabel)}</span>` : ''}
            ${verifiedBadgeHtml(plan)}
          </div>
          <span class="plan-card-disclosure" aria-hidden="true">
            <span>${isExpanded ? t('card.detail.collapse') : t('card.detail.expand')}</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        <div class="plan-card-price-row mt-3 flex items-baseline gap-1.5">
          ${priceHtml}
        </div>
        ${quotaRowHtml}
      </div>
    </div>
  `;
}

function renderAllPlansCards(plans, selectedPlanKey, providerInfo, expandedProviders, showAllGroups) {
  if (!plans.length) return '';
  return groupPlansByProvider(plans, providerInfo).map(group => {
    const isGroupExpanded = showAllGroups || expandedProviders.has(group.provider);
    const visibleGroupPlans = isGroupExpanded
      ? group.plans
      : group.plans.slice(0, PLAN_TABLE_GROUP_PREVIEW);
    const cards = visibleGroupPlans.map(plan => {
      const key = planKey(plan);
      const isSelected = key === selectedPlanKey;
      const confidence = plan.confidenceScore;
      let dotClass = 'trust-dot--yellow';
      if (confidence && confidence >= 0.8) dotClass = 'trust-dot--high';
      else if (confidence && confidence < 0.5) dotClass = 'trust-dot--red';
      const domesticHtml = [
        plan.domesticPayment ? `<span class="plan-card-badge">${escapeHtml(t('badge.domesticPayment'))}</span>` : '',
        planIsInternational(plan)
          ? `<span class="plan-card-badge plan-card-badge--intl" title="${escapeHtml(t('badge.intl.title'))}">${escapeHtml(String(plan.monthlyCurrency || 'USD').toUpperCase())}</span>`
          : ''
      ].filter(Boolean).join('');
      const trustHtml = `<span class="trust-dot ${dotClass}" title="${escapeHtml(t('trust.label'))}: ${confidence != null ? Math.round(confidence * 100) + '%' : t('common.unknown')}"></span>`;
      return `
        <article class="plan-card-mobile${isSelected ? ' is-selected' : ''}">
          <div class="plan-card-toggle" role="button" tabindex="0" data-plan-key="${escapeHtml(key)}" aria-expanded="${isSelected ? 'true' : 'false'}">
            ${planPriceCard(plan, trustHtml, domesticHtml, isSelected)}
          </div>
          ${isSelected ? renderSelectedPlanDetail(plan, providerInfo) : ''}
        </article>`;
    }).join('');
    const remainingCount = Math.max(0, group.plans.length - PLAN_TABLE_GROUP_PREVIEW);
    const groupToggle = !showAllGroups && remainingCount > 0
      ? `<button type="button" class="plan-group-toggle" data-plan-group-toggle="${escapeHtml(group.provider)}" aria-expanded="${isGroupExpanded ? 'true' : 'false'}">${isGroupExpanded ? t('group.collapseExtra') : t('group.viewRemaining', { n: remainingCount })}</button>`
      : '';
    const groupHeading = `${renderBrandIcon(group.iconUrl, group.label, 'brand-icon brand-icon--section')}
          <h3 class="text-sm font-bold text-brand-800 dark:text-brand-200">${escapeHtml(group.label)}</h3>`;
    return `
      <section class="plan-card-group">
        <div class="mb-2 flex items-center gap-2">
          ${group.brandHref ? `<a href="${escapeHtml(group.brandHref)}" class="plan-group-brand-link">${groupHeading}</a>` : groupHeading}
          <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${group.plans.length}</span>
        </div>
        <div class="plan-card-grid">
          ${cards}
        </div>
        ${groupToggle}
      </section>`;
  }).join('');
}

function renderPlanRows(group, selectedPlanKey, isGroupExpanded, providerInfo, previewCount = PLAN_TABLE_GROUP_PREVIEW) {
  const rowPlans = isGroupExpanded ? group.plans : group.plans.slice(0, previewCount);
  if (!rowPlans.length) return '';
  return rowPlans.map(plan => {
    const key = planKey(plan);
    const isSelected = key === selectedPlanKey;
    const statusColor = planStatusClass(plan);
    const firstMonthText = firstMonthPriceText(plan);
    const monthlyDisplay = hasDisplayPrice(plan.monthlyPrice)
      ? `<div>${escapeHtml(plan.monthlyPrice)}</div>${firstMonthText ? `<div class="plan-table-price-first">${escapeHtml(t('table.price.firstMonth'))} ${escapeHtml(firstMonthText)}</div>` : ''}`
      : '<span class="text-slate-400">—</span>';
    const quarterlyDisplay = hasDisplayPrice(plan.quarterlyPrice)
      ? `<div>${escapeHtml(plan.quarterlyPrice)}</div>${hasDisplayPrice(plan.quarterlyMonthlyPrice) ? `<div class="plan-table-price-sub">${escapeHtml(t('table.price.approx'))} ${escapeHtml(plan.quarterlyMonthlyPrice)}</div>` : ''}`
      : '<span class="text-slate-400">—</span>';
    const annualDisplay = hasDisplayPrice(plan.annualPrice)
      ? `<div>${escapeHtml(plan.annualPrice)}</div>${hasDisplayPrice(plan.annualMonthlyPrice) ? `<div class="plan-table-price-sub">${escapeHtml(t('table.price.approx'))} ${escapeHtml(plan.annualMonthlyPrice)}</div>` : ''}`
      : '<span class="text-slate-400">—</span>';
    const quotaDisplay = planQuotaDisplay(plan);
    const quotaHtml = quotaDisplay
      ? `<span class="text-slate-700 dark:text-slate-300" title="${escapeHtml(quotaDisplay.full)}">${escapeHtml(quotaDisplay.text)}</span>`
      : '<span class="text-slate-400">—</span>';
    const billingUnitHtml = planBillingUnitIsDisclosed(plan)
      ? `<span class="billing-unit-badge billing-unit-badge--${escapeHtml(plan.limitType || 'undisclosed')}">${escapeHtml(planBillingUnitLabel(plan))}</span>`
      : '<span class="text-slate-400">—</span>';
    const unitPrice = planUnitPriceDisplay(plan);
    const unitPriceHtml = unitPrice
      ? `<span class="whitespace-nowrap font-medium text-brand-700 dark:text-brand-300"${unitPrice.estimated ? ` title="${escapeHtml(t('table.unitPrice.estimated'))}"` : ''}>${escapeHtml(unitPrice.text)}</span>`
      : '<span class="text-slate-400">—</span>';
    const verifiedFresh = verifiedFreshness(plan.lastVerifiedAt);
    const verifiedDisplay = verifiedFresh.state === 'fresh'
      ? `<span class="text-xs font-medium text-emerald-600 dark:text-emerald-400" title="${escapeHtml(t('verified.freshTitle', { date: verifiedFresh.date }))}">${escapeHtml(verifiedFresh.days === 0 ? t('verified.tableToday') : t('verified.tableDaysAgo', { n: verifiedFresh.days }))}</span>`
      : verifiedFresh.state === 'stale'
        ? `<span class="text-xs font-medium text-amber-600 dark:text-amber-400" title="${escapeHtml(t('verified.staleTitle', { date: verifiedFresh.date }))}">${escapeHtml(t('verified.stale'))}</span>`
        : `<span class="text-xs text-slate-400">${escapeHtml(t('table.verified.pending'))}</span>`;
    const planUrl = safeExternalUrl(plan.url);
    const purchaseLink = purchaseLinkTarget(plan, planUrl);
    const sourceHtml = planUrl
      ? `<a href="${escapeHtml(purchaseLink.href)}" target="_blank" rel="${purchaseLink.rel}" ${outboundTrackingAttributes(plan)} class="text-sm font-medium text-brand-600 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">${escapeHtml(t('table.source.site'))}</a>`
      : '<span class="text-slate-400">—</span>';
    const domesticPayDisplay = plan.domesticPayment
      ? `<span class="rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">${escapeHtml(t('common.supported'))}</span>`
      : `<span class="text-slate-400">${escapeHtml(t('common.notSupported'))}</span>`;
    const intlNetworkDisplay = plan.intlNetwork
      ? `<span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">${escapeHtml(t('common.required'))}</span>`
      : `<span class="text-slate-400">${escapeHtml(t('common.notSupported'))}</span>`;
    const dataTrainingHtml = renderDataTrainingCell(plan, providerInfo);
    const detailRow = isSelected
      ? `<tr class="plan-detail-row">
          <td colspan="15" class="plan-inline-detail-cell">
            ${renderSelectedPlanDetail(plan, providerInfo)}
          </td>
        </tr>`
      : '';
    const href = planDetailHref(plan, providerInfo);
    const label = escapeHtml(plan.name);
    const intlBadge = planIsInternational(plan)
      ? ` <span class="plan-intl-tag" title="${escapeHtml(t('badge.intl.title'))}">${escapeHtml(String(plan.monthlyCurrency || 'USD').toUpperCase())}</span>`
      : '';
    const nameHtml = (href
      ? `<a href="${escapeHtml(href)}" class="font-medium text-brand-700 hover:text-brand-900 hover:underline dark:text-brand-300 dark:hover:text-brand-200">${label}</a>`
      : label) + intlBadge;
    const providerInner = `${renderBrandIcon(group.iconUrl, group.label, 'brand-icon brand-icon--table')}<span>${escapeHtml(group.label)}</span>`;
    const providerCell = group.brandHref
      ? `<a href="${escapeHtml(group.brandHref)}" class="plan-provider-cell plan-provider-cell--link">${providerInner}</a>`
      : `<div class="plan-provider-cell">${providerInner}</div>`;
    return `
      <tr class="plan-select-row${isSelected ? ' is-selected' : ''}" data-plan-key="${escapeHtml(key)}" tabindex="0" aria-selected="${isSelected ? 'true' : 'false'}">
        <td class="px-3 py-3 font-medium text-slate-900 dark:text-white">${providerCell}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${nameHtml}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${monthlyDisplay}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${quarterlyDisplay}</td>
        <td class="break-words px-3 py-3 text-slate-900 dark:text-white">${annualDisplay}</td>
        <td class="plan-table-nowrap px-3 py-3">${billingUnitHtml}</td>
        <td class="break-words px-3 py-3">${quotaHtml}</td>
        <td class="plan-table-nowrap px-3 py-3">${unitPriceHtml}</td>
        <td class="break-words px-3 py-3 text-slate-600 dark:text-slate-300">${escapeHtml(supportedModelDisplay(plan) || '—')}</td>
        <td class="plan-table-nowrap px-3 py-3"><span class="rounded-md px-2 py-0.5 text-xs font-medium ${statusColor}">${escapeHtml(plan.statusLabel)}</span></td>
        <td class="plan-table-nowrap px-3 py-3">${domesticPayDisplay}</td>
        <td class="plan-table-nowrap px-3 py-3">${intlNetworkDisplay}</td>
        <td class="plan-table-nowrap px-3 py-3">${dataTrainingHtml}</td>
        <td class="plan-table-nowrap px-3 py-3">${verifiedDisplay}</td>
        <td class="plan-table-nowrap px-3 py-3">${sourceHtml}</td>
      </tr>
      ${detailRow}`;
  }).join('');
}

function renderAllPlansTable(plans, visiblePlans, selectedPlanKey, providerInfo, expandedProviders, showAllGroups) {
  const body = visiblePlans.length
    ? groupPlansByProvider(visiblePlans, providerInfo).map(group => {
      if (group.plans.length === 1) {
        return renderPlanRows(group, selectedPlanKey, true, providerInfo);
      }
      const canCollapse = !showAllGroups && group.plans.length > PLAN_TABLE_GROUP_PREVIEW;
      const isGroupExpanded = showAllGroups || !canCollapse || expandedProviders.has(group.provider);
      const summary = renderGroupSummary(group);
      const brandInner = `${renderBrandIcon(group.iconUrl, group.label, 'brand-icon brand-icon--section')}
              <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${escapeHtml(group.label)}</span>`;
      const headerInner = `
              ${group.brandHref ? `<a href="${escapeHtml(group.brandHref)}" class="plan-table-group-brand">${brandInner}</a>` : brandInner}
              <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${group.plans.length}</span>
              <span class="plan-table-group-right">
                ${summary}
                ${canCollapse ? '<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>' : ''}
              </span>`;
      // 折叠头改用 div[role=button]，便于内部嵌入品牌页链接（button 内嵌 a 为非法结构）
      const header = canCollapse
        ? `<div class="plan-table-group-toggle" role="button" tabindex="0" data-plan-group-toggle="${escapeHtml(group.provider)}" aria-expanded="${isGroupExpanded ? 'true' : 'false'}" aria-label="${isGroupExpanded ? t('group.collapse') : t('group.expand')} ${escapeHtml(group.label)}">${headerInner}</div>`
        : `<div class="plan-table-group-toggle plan-table-group-toggle--static">${headerInner}</div>`;
      return `
        <tr class="border-y border-slate-200 dark:border-slate-700">
          <td colspan="15" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
            ${header}
          </td>
        </tr>
        ${renderPlanRows(group, selectedPlanKey, isGroupExpanded, providerInfo)}`;
    }).join('')
    : `<tr>
        <td colspan="15" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${escapeHtml(t('table.empty.match'))}</td>
      </tr>`;

  return `
    <div class="plan-table-wrap">
      <table class="w-full table-fixed text-sm">
        <caption class="sr-only">${escapeHtml(t('table.caption'))}</caption>
        <colgroup>
          <col style="width: 8%">
          <col style="width: 10%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 7%">
          <col style="width: 6%">
          <col style="width: 9%">
          <col style="width: 7%">
          <col style="width: 8%">
          <col style="width: 6%">
          <col style="width: 6%">
          <col style="width: 6%">
          <col style="width: 5%">
          <col style="width: 4%">
          <col style="width: 4%">
        </colgroup>
        <thead>
          <tr>
            ${PLAN_TABLE_FILTER_COLUMNS.map(column => renderPlanTableFilterHeader(column, plans)).join('')}
          </tr>
        </thead>
        <tbody>
          ${body}
        </tbody>
      </table>
    </div>`;
}

export function renderAllPlansDualView(
  plans,
  selectedPlanKey = '',
  providerInfo = {},
  expandedProviders = new Set(),
  showAllGroups = false
) {
  if (!plans.length) {
    return `<p class="text-sm text-slate-500 dark:text-slate-400">${escapeHtml(t('table.empty.none'))}</p>`;
  }
  const brandFilteredPlans = filterPlansByProviderInfo(plans, providerInfo, PROVIDER_NAME_MAP);
  if (!brandFilteredPlans.length) {
    return `<p class="text-sm text-slate-500 dark:text-slate-400">${escapeHtml(t('table.empty.none'))}</p>`;
  }
  setPlanTablePrivacyContext(providerInfo);
  const filteredPlans = applyPlanTableFilter(brandFilteredPlans);
  const showAllFilteredGroups = showAllGroups || isPlanTableFilterActive() || isAvailableOnlyActive();
  return `
    <div>
      ${renderPlanTableQuickFilters(filteredPlans, brandFilteredPlans)}
      ${renderPlanTableFilterSummary(filteredPlans, brandFilteredPlans)}
      <div class="plan-view-cards">
        ${renderAllPlansCards(filteredPlans, selectedPlanKey, providerInfo, expandedProviders, showAllFilteredGroups)}
      </div>
      <div class="plan-view-table">
        ${renderAllPlansTable(brandFilteredPlans, filteredPlans, selectedPlanKey, providerInfo, expandedProviders, showAllFilteredGroups)}
      </div>
    </div>`;
}
