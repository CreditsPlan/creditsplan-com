import { escapeHtml } from './render.js';
import { t, numberLocale, getLang } from './i18n.js';
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
import { planQuotaDisplay } from './shared/quota-utils.js';

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

// width 与 colgroup 列宽一致；defaultVisible=false 的次要列默认隐藏（避免常见桌面分辨率出现横向滚动条），
// 用户可在「列设置」菜单勾选恢复；provider 为品牌图标列，minWidth 防止图标被挤压
export const PLAN_TABLE_FILTER_COLUMNS = [
  { key: 'provider', labelKey: 'table.col.provider', width: 8, minWidth: 150, defaultVisible: true, value: plan => displayNameForProvider(plan.provider, privacyProviderInfo, PROVIDER_NAME_MAP) || EMPTY_TABLE_VALUE },
  { key: 'name', labelKey: 'table.col.name', width: 13, defaultVisible: true, value: plan => cleanValue(plan.name) || EMPTY_TABLE_VALUE },
  { key: 'monthlyPrice', labelKey: 'table.col.monthly', width: 7, defaultVisible: true, value: plan => planTablePriceValue(plan.monthlyPrice) },
  { key: 'quarterlyPrice', labelKey: 'table.col.quarterly', width: 7, defaultVisible: true, value: plan => planTablePriceValue(plan.quarterlyPrice) },
  { key: 'annualPrice', labelKey: 'table.col.annual', width: 7, defaultVisible: true, value: plan => planTablePriceValue(plan.annualPrice) },
  { key: 'billingUnit', labelKey: 'table.col.billingUnit', width: 7, defaultVisible: false, value: plan => planBillingUnitLabel(plan) },
  { key: 'quota', labelKey: 'table.col.quota', width: 11, defaultVisible: true, value: plan => planQuotaDisplay(plan)?.text || EMPTY_TABLE_VALUE },
  { key: 'model', labelKey: 'table.col.model', width: 7, defaultVisible: true, value: plan => supportedModelDisplay(plan) || EMPTY_TABLE_VALUE },
  { key: 'domesticPayment', labelKey: 'table.col.domesticPayment', width: 7, defaultVisible: false, value: plan => plan.domesticPayment ? t('common.supported') : '—' },
  { key: 'intlNetwork', labelKey: 'table.col.intlNetwork', width: 7, defaultVisible: false, value: plan => plan.intlNetwork ? t('common.required') : '—' },
  { key: 'dataTraining', labelKey: 'table.col.dataTraining', width: 7, defaultVisible: false, value: plan => planDataTrainingLabel(plan) },
  { key: 'verifiedAt', labelKey: 'table.col.verified', width: 7, defaultVisible: false, value: plan => cleanValue(plan.lastVerifiedAt) || t('table.verified.pending') },
  { key: 'status', labelKey: 'table.col.status', width: 6, minWidth: 110, defaultVisible: true, value: plan => cleanValue(plan.statusLabel) || EMPTY_TABLE_VALUE }
];

// —— 列显隐设置 ——
// 默认只显示核心列；隐藏列不删除，用户随时可在「列设置」菜单勾选恢复。
// 自动模式：未手动设置时按表格容器宽度自动增减列（容器 ≥ 全列最小宽度时展开全部列）；
// 用户勾选/取消任意列即进入手动模式（localStorage 持久化），此后宽度变化不再覆盖手动选择。
const PLAN_TABLE_COLUMNS_STORAGE_KEY = 'plan-table-columns';
const PLAN_TABLE_MIN_WIDTH = 1520;       // 全部列展开时的最小表格宽度（与历史 colgroup 总宽一致）
const PLAN_TABLE_MIN_WIDTH_FLOOR = 1080; // 宽度下限：保证默认 9 列时各列内容可读且 1280/1366 视口无横向滚动

const DEFAULT_VISIBLE_COLUMN_KEYS = PLAN_TABLE_FILTER_COLUMNS
  .filter(column => column.defaultVisible)
  .map(column => column.key);

const ALL_COLUMN_KEYS = PLAN_TABLE_FILTER_COLUMNS.map(column => column.key);

// 自动模式列集：容器可用宽度 ≥ 全列最小宽度时显示全部列，否则核心列
function autoVisibleColumnKeysForWidth(containerWidth) {
  return containerWidth >= PLAN_TABLE_MIN_WIDTH ? ALL_COLUMN_KEYS : DEFAULT_VISIBLE_COLUMN_KEYS;
}

// 读取页面容器宽度用于列数档位判断（DOM 未就绪时退回视口宽度）。
// 注意不能优先读 .plan-table-wrap：它是横向滚动容器，clientWidth 是可见区宽度，
// 全列展开时总比页面容器窄（如 1600px 容器下仅 1492px），会把宽屏误判为窄屏。
export function planTableContainerWidth() {
  const el = document.querySelector('.plans-page-shell') || document.querySelector('.page-shell') || document.querySelector('.plan-table-wrap');
  return el ? el.clientWidth : window.innerWidth;
}

let planColumnVisibilityManual = false;

function loadPlanColumnVisibility() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(PLAN_TABLE_COLUMNS_STORAGE_KEY));
    // 新版 { v, manual, cols }；旧版纯数组视为手动记录（兼容历史设置）
    const cols = Array.isArray(stored) ? stored : (stored && Array.isArray(stored.cols) ? stored.cols : null);
    if (cols && cols.length) {
      const valid = cols.filter(key => PLAN_TABLE_FILTER_COLUMNS.some(column => column.key === key));
      if (valid.length) {
        planColumnVisibilityManual = Array.isArray(stored) || stored.manual === true;
        return new Set(valid);
      }
    }
  } catch {
    // localStorage 不可用/数据损坏时回退自动默认集
  }
  planColumnVisibilityManual = false;
  return new Set(DEFAULT_VISIBLE_COLUMN_KEYS);
}

let planColumnVisibility = loadPlanColumnVisibility();

function persistPlanColumnVisibility() {
  try {
    window.localStorage.setItem(PLAN_TABLE_COLUMNS_STORAGE_KEY, JSON.stringify({
      v: 1,
      manual: planColumnVisibilityManual,
      cols: [...planColumnVisibility]
    }));
  } catch {
    // 隐私模式等场景下持久化失败不影响本次会话
  }
}

export function isPlanColumnVisible(key) {
  return planColumnVisibility.has(key);
}

export function isPlanColumnVisibilityManual() {
  return planColumnVisibilityManual;
}

export function togglePlanColumn(key) {
  if (!PLAN_TABLE_FILTER_COLUMNS.some(column => column.key === key)) return;
  if (planColumnVisibility.has(key)) planColumnVisibility.delete(key);
  else planColumnVisibility.add(key);
  planColumnVisibilityManual = true; // 用户显式选择进入手动模式
  persistPlanColumnVisibility();
}

export function resetPlanColumnVisibility() {
  planColumnVisibilityManual = false;
  try { window.localStorage.removeItem(PLAN_TABLE_COLUMNS_STORAGE_KEY); } catch { /* 隐私模式等场景忽略 */ }
  planColumnVisibility = new Set(autoVisibleColumnKeysForWidth(planTableContainerWidth()));
}

// 自动模式下按容器宽度调整列集；返回是否发生变化（调用方据此决定是否重渲染）
export function syncPlanColumnVisibilityWithWidth(containerWidth) {
  if (planColumnVisibilityManual) return false;
  const next = autoVisibleColumnKeysForWidth(containerWidth);
  const changed = next.length !== planColumnVisibility.size
    || next.some(key => !planColumnVisibility.has(key));
  if (changed) {
    planColumnVisibility = new Set(next);
    // 自动模式下列集随宽度变化，同步列设置按钮的隐藏数列标签与勾选态（按钮在表格容器之外，不随表格重渲染）
    syncPlanColumnSettingsMenu();
  }
  return changed;
}

export function visiblePlanTableColumns() {
  return PLAN_TABLE_FILTER_COLUMNS.filter(column => planColumnVisibility.has(column.key));
}

// 表格可视宽度：优先取滚动容器 .plan-table-wrap 的内容宽（表格实际可显示区域，比外层 shell 窄一层内边距），
// 用于 min-width 封顶；DOM 未就绪时退回页面容器宽度。
// 注意：列数档位判断（autoVisibleColumnKeysForWidth）仍用 planTableContainerWidth，两处口径不同不可混用。
function planTableViewportWidth() {
  const wrap = document.querySelector('.plan-table-wrap');
  return wrap ? wrap.clientWidth : planTableContainerWidth();
}

// 表格最小宽度随可见列权重折算：列越少表格越窄（默认无横向滚动），全部恢复时回到原始宽度自动横滚。
// 默认列集（自然宽 ≤ 下限）时再以表格可视宽度封顶，避免窄视口下最后一列被横向滚动挤出可视区；
// 手动展开全列（自然宽 > 下限）时保持原始宽度，允许用户横向滚动查看全部列。
export function planTableMinWidth() {
  const totalWidth = PLAN_TABLE_FILTER_COLUMNS.reduce((sum, column) => sum + (column.width || 0), 0);
  const visibleWidth = visiblePlanTableColumns().reduce((sum, column) => sum + (column.width || 0), 0);
  const natural = Math.round(PLAN_TABLE_MIN_WIDTH * visibleWidth / totalWidth);
  if (natural <= PLAN_TABLE_MIN_WIDTH_FLOOR) {
    return Math.min(PLAN_TABLE_MIN_WIDTH_FLOOR, planTableViewportWidth());
  }
  return natural;
}

// 渲染后/窗口变化后自适应：初次渲染时 .plan-table-wrap 尚未挂载，min-width 只能按页面容器估算；
// 即使挂载后 CSS 也可能尚未应用（异步加载），此时容器宽度是未加内边距的值，
// 故下一帧再校准一次，避免窄视口下最后一列被横向滚动挤出可视区。
export function fitPlanTableToViewport() {
  const wrap = document.querySelector('.plan-table-wrap');
  const table = wrap && wrap.querySelector('table');
  if (!table) return;
  table.style.minWidth = planTableMinWidth() + 'px';
  requestAnimationFrame(() => {
    const wrap2 = document.querySelector('.plan-table-wrap');
    const table2 = wrap2 && wrap2.querySelector('table');
    if (table2) table2.style.minWidth = planTableMinWidth() + 'px';
  });
}

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
      <span class="plan-table-filter-count">${escapeHtml(t('table.quick.availableOnly'))}${getLang() === 'en' ? ': ' : '：'}${filteredPlans.length} / ${plans.length}</span>
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

let planColumnSettingsOpen = false;

export function setPlanColumnSettingsOpen(open) {
  planColumnSettingsOpen = open;
}

// 「列设置」菜单：勾选切换表格列显隐；隐藏列不删除（信息零丢失），菜单打开状态跨重渲染保持
export function renderPlanColumnSettings() {
  const hiddenCount = PLAN_TABLE_FILTER_COLUMNS.length - visiblePlanTableColumns().length;
  return `
    <div class="plan-column-settings">
      <button type="button" class="plan-column-settings-trigger" data-plan-column-settings aria-haspopup="menu" aria-expanded="${planColumnSettingsOpen ? 'true' : 'false'}" title="${escapeHtml(t('table.colSettings.title'))}">
        <span class="plan-column-settings-label">${escapeHtml(t('table.colSettings.trigger'))}${hiddenCount ? ` · ${escapeHtml(t('table.colSettings.hidden', { n: hiddenCount }))}` : ''}</span>
        <span class="plan-column-filter-caret" aria-hidden="true"></span>
      </button>
      <div class="plan-column-settings-menu" role="menu"${planColumnSettingsOpen ? '' : ' hidden'}>
        ${PLAN_TABLE_FILTER_COLUMNS.map(column => `
          <button type="button" class="plan-column-settings-option${isPlanColumnVisible(column.key) ? ' is-active' : ''}" role="menuitemcheckbox" aria-checked="${isPlanColumnVisible(column.key) ? 'true' : 'false'}" data-plan-column-toggle="${escapeHtml(column.key)}">
            <span class="plan-column-settings-check" aria-hidden="true">✓</span>
            <span class="plan-column-settings-option-label">${escapeHtml(t(column.labelKey))}</span>
          </button>
        `).join('')}
        <button type="button" class="plan-column-settings-reset" data-plan-column-reset>${escapeHtml(t('table.colSettings.reset'))}</button>
      </div>
    </div>
  `;
}

function closePlanColumnFilterMenus(root) {
  if (!root) return;
  planColumnSettingsOpen = false;
  // 列设置按钮/菜单在筛选行（表格容器之外），不随表格重渲染重建，显隐直接操作 DOM 全局关闭，保证与表格筛选菜单互斥
  document.querySelectorAll('.plan-column-filter-menu').forEach(menu => {
    menu.hidden = true;
  });
  document.querySelectorAll('[data-plan-filter-column]').forEach(button => {
    button.setAttribute('aria-expanded', 'false');
  });
  document.querySelectorAll('.plan-column-settings-menu').forEach(menu => {
    menu.hidden = true;
  });
  document.querySelectorAll('[data-plan-column-settings]').forEach(button => {
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

    const columnSettings = event.target.closest('[data-plan-column-settings]');
    if (columnSettings && detail.contains(columnSettings)) {
      const wasOpen = planColumnSettingsOpen;
      closePlanColumnFilterMenus(detail);
      if (!wasOpen) setPlanColumnSettingsOpen(true);
      renderCurrentView();
      return;
    }

    const columnToggle = event.target.closest('[data-plan-column-toggle]');
    if (columnToggle && detail.contains(columnToggle)) {
      togglePlanColumn(columnToggle.dataset.planColumnToggle);
      renderCurrentView();
      return;
    }

    const columnReset = event.target.closest('[data-plan-column-reset]');
    if (columnReset && detail.contains(columnReset)) {
      resetPlanColumnVisibility();
      renderCurrentView();
      return;
    }

    const planTrigger = event.target.closest('[data-plan-key]');
    if (planTrigger && detail.contains(planTrigger) && !event.target.closest('a')) {
      const key = planTrigger.dataset.planKey || '';
      if (findPlanByKey(getPlans(), key)) selectPlan(key);
      return;
    }

    if (!event.target.closest('.plan-column-filter') && !event.target.closest('.plan-column-settings')) {
      closePlanColumnFilterMenus(detail);
    }
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
    // 列设置菜单保持打开依赖重渲染后不误关：点击导致重渲染时 event.target 已脱离 DOM，
    // body.contains 为 false 时视为点击发生在页面内（旧节点），不做外部点击关闭处理；
    // 列设置按钮/菜单在筛选行（detail 之外），点击其内部由独立绑定处理，此处不关闭
    if (!detail.contains(event.target) && document.body.contains(event.target) && !event.target.closest('.plan-column-settings')) {
      closePlanColumnFilterMenus(detail);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePlanColumnFilterMenus(detail);
  });
}

// 同步所有「列设置」按钮的勾选态与隐藏数列标签：与列集变化同一时机调用，
// 避免 resize 同步监听与防抖回调之间的时序错位（列集先变，标签随后同步）
export function syncPlanColumnSettingsMenu() {
  document.querySelectorAll('.plan-column-settings').forEach(container => {
    container.querySelectorAll('[data-plan-column-toggle]').forEach(button => {
      const active = isPlanColumnVisible(button.dataset.planColumnToggle);
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-checked', String(active));
    });
    container.querySelectorAll('[data-plan-column-settings]').forEach(button => {
      const label = button.querySelector('.plan-column-settings-label');
      if (!label) return;
      const hiddenCount = PLAN_TABLE_FILTER_COLUMNS.length - visiblePlanTableColumns().length;
      label.textContent = `${t('table.colSettings.trigger')}${hiddenCount ? ` · ${t('table.colSettings.hidden', { n: hiddenCount })}` : ''}`;
    });
  });
}

// 「列设置」按钮/菜单在筛选行（表格容器 detail 之外），不随表格重渲染重建，
// 事件独立绑定：菜单显隐、勾选态与隐藏数标签直接操作 DOM 保持同步。
export function bindPlanColumnSettings(settingsRoot, renderCurrentView) {
  settingsRoot.addEventListener('click', event => {
    const trigger = event.target.closest('[data-plan-column-settings]');
    if (trigger && settingsRoot.contains(trigger)) {
      const wasOpen = planColumnSettingsOpen;
      closePlanColumnFilterMenus(settingsRoot);
      if (wasOpen) return;
      planColumnSettingsOpen = true;
      const menu = trigger.closest('.plan-column-settings')?.querySelector('.plan-column-settings-menu');
      if (menu) menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      return;
    }
    const columnToggle = event.target.closest('[data-plan-column-toggle]');
    if (columnToggle && settingsRoot.contains(columnToggle)) {
      togglePlanColumn(columnToggle.dataset.planColumnToggle);
      renderCurrentView();
      syncPlanColumnSettingsMenu();
      return;
    }
    const columnReset = event.target.closest('[data-plan-column-reset]');
    if (columnReset && settingsRoot.contains(columnReset)) {
      resetPlanColumnVisibility();
      renderCurrentView();
      syncPlanColumnSettingsMenu();
      return;
    }
  });
}
