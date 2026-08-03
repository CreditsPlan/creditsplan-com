import { escapeHtml } from './render.js';
import { t, numberLocale } from './i18n.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import {
  cleanValue,
  displayNameForProvider,
  findPlanByKey,
  resolvePlanPrivacy,
  supportedModelDisplay
} from './shared/plan-utils.js';
import {
  EMPTY_TABLE_VALUE,
  createPlanTableFilterState,
  filterPlansByTableState,
  hasActivePlanTableFilter,
  planTablePriceValue
} from './shared/plan-table-utils.js';
import { planQuotaDisplay, planUnitPriceDisplay } from './shared/quota-utils.js';

let privacyProviderInfo = {};
export function setPlanTablePrivacyContext(providerInfo) {
  privacyProviderInfo = providerInfo || {};
}

function planDataTrainingLabel(plan) {
  const privacy = resolvePlanPrivacy(plan, privacyProviderInfo, PROVIDER_NAME_MAP);
  if (!privacy.training) return t('privacy.filter.notResearched');
  return t(`privacy.training.${privacy.training}`) || privacy.training;
}

// Billing-unit label: normalize limit_type into comparable metering buckets
// (cross-platform units differ, so raw quota numbers are not directly comparable).
const BILLING_UNIT_KEYS = {
  token: 'billing.token',
  credits: 'billing.credits',
  five_hours: 'billing.requests',
  weekly: 'billing.requests',
  monthly: 'billing.requests'
};

export function planBillingUnitLabel(plan) {
  const key = BILLING_UNIT_KEYS[plan.limitType];
  return key ? t(key) : t('billing.undisclosed');
}

export function planBillingUnitIsDisclosed(plan) {
  return Boolean(BILLING_UNIT_KEYS[plan.limitType]);
}

export const PLAN_TABLE_FILTER_COLUMNS = [
  { key: 'provider', labelKey: 'table.col.provider', value: plan => displayNameForProvider(plan.provider) || EMPTY_TABLE_VALUE },
  { key: 'name', labelKey: 'table.col.name', value: plan => cleanValue(plan.name) || EMPTY_TABLE_VALUE },
  { key: 'monthlyPrice', labelKey: 'table.col.monthly', value: plan => planTablePriceValue(plan.monthlyPrice) },
  { key: 'quarterlyPrice', labelKey: 'table.col.quarterly', value: plan => planTablePriceValue(plan.quarterlyPrice) },
  { key: 'annualPrice', labelKey: 'table.col.annual', value: plan => planTablePriceValue(plan.annualPrice) },
  { key: 'billingUnit', labelKey: 'table.col.billingUnit', value: plan => planBillingUnitLabel(plan) },
  { key: 'quota', labelKey: 'table.col.quota', value: plan => planQuotaDisplay(plan)?.text || EMPTY_TABLE_VALUE },
  { key: 'unitPrice', labelKey: 'table.col.unitPrice', value: plan => planUnitPriceDisplay(plan)?.text || EMPTY_TABLE_VALUE },
  { key: 'model', labelKey: 'table.col.model', value: plan => supportedModelDisplay(plan) || EMPTY_TABLE_VALUE },
  { key: 'status', labelKey: 'table.col.status', value: plan => cleanValue(plan.statusLabel) || EMPTY_TABLE_VALUE },
  { key: 'domesticPayment', labelKey: 'table.col.domesticPayment', value: plan => plan.domesticPayment ? t('common.supported') : '—' },
  { key: 'intlNetwork', labelKey: 'table.col.intlNetwork', value: plan => plan.intlNetwork ? t('common.required') : '—' },
  { key: 'dataTraining', labelKey: 'table.col.dataTraining', value: plan => planDataTrainingLabel(plan) },
  { key: 'verifiedAt', labelKey: 'table.col.verified', value: plan => cleanValue(plan.lastVerifiedAt) || t('table.verified.pending') },
  { key: 'source', labelKey: 'table.col.source', value: plan => plan.url ? t('table.source.name') : EMPTY_TABLE_VALUE }
];

let planTableFilterState = createPlanTableFilterState();
// “只看可购买”快捷开关（与列筛选独立，可叠加）
let availableOnly = false;
const collator = new Intl.Collator(numberLocale(), { numeric: true, sensitivity: 'base' });

// 可购买判定：可用与抢购中均算可购买，排除售罄/下线/待确认
function planIsPurchasable(plan) {
  return plan.status === 'available' || plan.status === 'rush_sale'
    || plan.statusLabel === '可用' || plan.statusLabel === '可购买';
}

export function isAvailableOnlyActive() {
  return availableOnly;
}

export function toggleAvailableOnly() {
  availableOnly = !availableOnly;
}

function findPlanTableColumn(key) {
  return PLAN_TABLE_FILTER_COLUMNS.find(column => column.key === key);
}

function planTableColumnValue(plan, key) {
  const column = findPlanTableColumn(key);
  if (!column) return '';
  const value = String(column.value(plan) || '').trim();
  return value || EMPTY_TABLE_VALUE;
}

export function clearPlanTableFilter() {
  planTableFilterState = createPlanTableFilterState();
  availableOnly = false;
}

export function isPlanTableFilterActive() {
  return hasActivePlanTableFilter(planTableFilterState)
    && Boolean(findPlanTableColumn(planTableFilterState.column));
}

export function applyPlanTableFilter(plans) {
  let result = plans;
  if (availableOnly) result = result.filter(planIsPurchasable);
  if (isPlanTableFilterActive()) {
    result = filterPlansByTableState(result, planTableFilterState, planTableColumnValue);
  }
  return result;
}

// “只看可购买”开关按钮已移入筛选栏（plans-page.js），此处仅在开关激活时显示过滤计数
export function renderPlanTableQuickFilters(filteredPlans, plans) {
  if (!availableOnly) return '';
  return `
    <div class="plan-table-quick-filters">
      <span class="plan-table-filter-count">${escapeHtml(t('table.quick.availableOnly'))}：${filteredPlans.length} / ${plans.length}</span>
    </div>
  `;
}

function planTableFilterOptions(plans, column) {
  const counts = new Map();
  for (const plan of plans) {
    const value = planTableColumnValue(plan, column.key);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => {
      if (a.value === EMPTY_TABLE_VALUE && b.value !== EMPTY_TABLE_VALUE) return 1;
      if (b.value === EMPTY_TABLE_VALUE && a.value !== EMPTY_TABLE_VALUE) return -1;
      return collator.compare(a.value, b.value);
    });
}

export function renderPlanTableFilterHeader(column, plans) {
  const isActive = planTableFilterState.column === column.key && !!planTableFilterState.value;
  const options = planTableFilterOptions(plans, column);
  return `
    <th scope="col" class="plan-column-filter break-words px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${isActive ? ' is-active' : ''}" data-plan-filter-column="${escapeHtml(column.key)}" aria-haspopup="menu" aria-expanded="false" title="${escapeHtml(t('table.filter.tooltip'))} ${escapeHtml(t(column.labelKey))}">
        <span class="plan-column-filter-label">${escapeHtml(t(column.labelKey))}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-filter-menu" data-plan-filter-menu="${escapeHtml(column.key)}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${isActive ? '' : ' is-active'}" data-plan-filter-value="">
          <span class="plan-column-filter-option-label">${escapeHtml(t('table.filter.all'))}</span>
          <span class="plan-column-filter-option-count">${plans.length}</span>
        </button>
        ${options.map(option => `
          <button type="button" class="plan-column-filter-option${isActive && option.value === planTableFilterState.value ? ' is-active' : ''}" data-plan-filter-value="${escapeHtml(option.value)}">
            <span class="plan-column-filter-option-label">${escapeHtml(option.value)}</span>
            <span class="plan-column-filter-option-count">${option.count}</span>
          </button>
        `).join('')}
      </div>
    </th>
  `;
}

export function renderPlanTableFilterSummary(filteredPlans, plans) {
  if (!isPlanTableFilterActive()) return '';
  const column = findPlanTableColumn(planTableFilterState.column);
  return `
    <div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${escapeHtml(t(column.labelKey))}</span>
        <strong>${escapeHtml(planTableFilterState.value)}</strong>
      </span>
      <span class="plan-table-filter-count">${filteredPlans.length} / ${plans.length} ${escapeHtml(t('table.filter.count'))}</span>
      <button type="button" class="plan-table-filter-clear" data-plan-filter-clear>${escapeHtml(t('table.filter.clear'))}</button>
    </div>
  `;
}

function closePlanColumnFilterMenus(root) {
  if (!root) return;
  root.querySelectorAll('.plan-column-filter-menu').forEach(menu => {
    menu.hidden = true;
  });
  root.querySelectorAll('[data-plan-filter-column]').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
  });
}

export function bindPlanTableFilters(detail, getPlans, renderCurrentView, selectPlan) {
  detail.addEventListener('click', event => {
    const trigger = event.target.closest('[data-plan-filter-column]');
    if (trigger && detail.contains(trigger)) {
      const menu = trigger.closest('.plan-column-filter')?.querySelector('.plan-column-filter-menu');
      if (!menu) return;
      const wasOpen = !menu.hidden;
      closePlanColumnFilterMenus(detail);
      if (!wasOpen) {
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
      return;
    }

    const option = event.target.closest('[data-plan-filter-value]');
    if (option && detail.contains(option)) {
      const column = option.closest('[data-plan-filter-menu]');
      const value = option.dataset.planFilterValue || '';
      planTableFilterState = column && value
        ? createPlanTableFilterState(column.dataset.planFilterMenu, value)
        : createPlanTableFilterState();
      renderCurrentView();
      return;
    }

    const clear = event.target.closest('[data-plan-filter-clear]');
    if (clear && detail.contains(clear)) {
      clearPlanTableFilter();
      renderCurrentView();
      return;
    }

    const planTrigger = event.target.closest('[data-plan-key]');
    if (planTrigger && detail.contains(planTrigger) && !event.target.closest('a')) {
      const key = planTrigger.dataset.planKey || '';
      if (findPlanByKey(getPlans(), key)) selectPlan(key);
      return;
    }

    if (!event.target.closest('.plan-column-filter')) closePlanColumnFilterMenus(detail);
  });

  detail.addEventListener('keydown', event => {
    const planTrigger = event.target.closest('[data-plan-key]');
    if (!planTrigger || !detail.contains(planTrigger) || event.target.closest('a')) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const key = planTrigger.dataset.planKey || '';
    if (findPlanByKey(getPlans(), key)) selectPlan(key);
  });

  document.addEventListener('click', event => {
    if (!detail.contains(event.target)) closePlanColumnFilterMenus(detail);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePlanColumnFilterMenus(detail);
  });
}
