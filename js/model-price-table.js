/**
 * 模型价格对比表组件（国际站版）
 * 「模型」菜单（/model）下提供纯 token 单价对比视图；界面文案走 i18n，价格保持人民币口径
 */
import { escapeHtml } from './render.js';
import { t, numberLocale } from './i18n.js';
import { PROVIDER_NAME_MAP, brandForProvider } from './shared/brands.js';
import { providerMetadata, displayNameForProvider } from './shared/plan-utils.js';
import { renderBrandIcon } from './plans-table.js';

// ─── 数据工具 ───────────────────────────────────────────────────────────────

// 与套餐表格一致：每个品牌分组默认只展示 2 条模型，点击分组头展开/收起
const MODEL_TABLE_GROUP_PREVIEW = 2;

// Anthropic 官网当前列在 “Legacy models” 下的型号。
// 若后台后续提供 lifecycle_status，则优先以后台状态为准。
const ANTHROPIC_LEGACY_MODEL_IDS = new Set([
  'claude-opus-4-8',
  'claude-sonnet-4-6',
  'claude-opus-4-7',
  'claude-opus-4-6',
  'claude-sonnet-4-5',
  'claude-opus-4-5',
  'claude-opus-4-1'
]);

function numberOrNull(value) {
  if (value == null || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function formatTokenPrice(value, currency) {
  const n = numberOrNull(value);
  if (n == null) return t('pricing.pending');
  // 币种随后台 currency 字段显示，不做汇率转化（默认 CNY）
  const symbol = currency === 'USD' ? '$' : '¥';
  return `${symbol}${n.toLocaleString(numberLocale(), { maximumFractionDigits: 4 })}`;
}

function formatContextShort(value) {
  const n = numberOrNull(value);
  if (n == null) return '—';
  if (n >= 1000000) return `${(n / 1000000).toLocaleString(numberLocale(), { maximumFractionDigits: 1 })}M`;
  if (n >= 1000) return `${(n / 1000).toLocaleString(numberLocale(), { maximumFractionDigits: 0 })}K`;
  return n.toLocaleString(numberLocale());
}

function providerDisplayName(provider) {
  // 优先品牌主数据 name_en（随 currentProviderInfo 注入），其次静态映射，避免中文品牌键泄漏到英文界面
  const fromInfo = displayNameForProvider(provider, currentProviderInfo, PROVIDER_NAME_MAP);
  return fromInfo || PROVIDER_NAME_MAP[provider] || provider || t('pricing.unknownVendor');
}

function providerBrandName(provider) {
  const displayName = providerDisplayName(provider);
  return displayName === 'Anthropic' ? 'Claude' : displayName;
}

// 当前品牌主数据（由 renderModelPriceView 传入，用于品牌页链接）
let currentProviderInfo = {};

// 当前视图下经过 Tab/搜索/列筛选后的模型列表（导出用，随每次渲染更新）
let currentExportModels = [];

// 供导出模块读取当前可见模型（筛选口径与表格展示一致）
export function getModelPriceExportModels() {
  return currentExportModels;
}

// 品牌页链接：仅当品牌主数据已配置 SEO Slug、介绍与 Logo 时返回（与套餐表格一致）
function brandDetailHref(provider) {
  const metadata = providerMetadata(provider, currentProviderInfo, PROVIDER_NAME_MAP);
  const slug = String(metadata.seo_slug || '').trim();
  const intro = String(metadata.seo_intro || '').trim();
  const icon = String(metadata.icon_url || '').trim();
  return slug && intro && icon ? `/brands/${encodeURIComponent(slug)}/` : '';
}

function providerIcon(provider, iconUrl) {
  const brand = brandForProvider(provider);
  const displayName = providerBrandName(provider);
  const url = iconUrl || brand?.iconUrl || '';
  return renderBrandIcon(url, displayName, 'brand-icon brand-icon--tab');
}

function isLegacyModel(model) {
  const lifecycle = String(model.raw?.lifecycle_status || '').trim().toLowerCase();
  if (lifecycle) return lifecycle === 'legacy';
  if (String(model.vendor || '').trim().toLowerCase() !== 'anthropic') return false;
  const modelId = String(model.raw?.model_id || model.raw?.id || model.id || '')
    .trim()
    .toLowerCase()
    .replace(/[._]/g, '-');
  return ANTHROPIC_LEGACY_MODEL_IDS.has(modelId);
}

function releaseTimestamp(model) {
  const value = String(model.raw?.release_date || '').trim();
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : null;
}

// ─── 排序 ───────────────────────────────────────────────────────────────────

const SORT_KEYS = {
  release: { numeric: true, raw: releaseTimestamp },
  name: { labelKey: 'pricing.th.name', numeric: false },
  provider: { labelKey: 'pricing.th.provider', numeric: false },
  context: { labelKey: 'pricing.th.context', numeric: true, raw: m => numberOrNull(m.raw?.context_length) },
  input: { labelKey: 'pricing.th.input', numeric: true, raw: m => numberOrNull(m.raw?.input_price) },
  output: { labelKey: 'pricing.th.output', numeric: true, raw: m => numberOrNull(m.raw?.output_price) }
};

function sortModels(models, sortKey, sortDir) {
  const config = SORT_KEYS[sortKey];
  if (!config) return models;
  const sorted = [...models];
  sorted.sort((a, b) => {
    if (sortKey === 'release') {
      const lifecycleCmp = Number(isLegacyModel(a)) - Number(isLegacyModel(b));
      if (lifecycleCmp !== 0) return lifecycleCmp;
    }
    let cmp = 0;
    if (config.numeric) {
      const va = config.raw(a);
      const vb = config.raw(b);
      // NULL 无论升降序都排末尾
      if (va == null || vb == null) {
        if (va == null && vb == null) return 0;
        return va == null ? 1 : -1;
      }
      cmp = va - vb;
    } else if (sortKey === 'name') {
      cmp = (a.modelName || '').localeCompare(b.modelName || '', numberLocale());
    } else if (sortKey === 'provider') {
      cmp = providerBrandName(a.vendor).localeCompare(providerBrandName(b.vendor), numberLocale());
    }
    return sortDir === 'desc' ? -cmp : cmp;
  });
  return sorted;
}

// ─── 分组 ───────────────────────────────────────────────────────────────────

// 按品牌分组；分组顺序沿用传入列表（全局排序后首次出现的顺序），组内保持全局排序
function groupModelsByProvider(models) {
  const map = new Map();
  for (const model of models) {
    const name = providerBrandName(model.vendor);
    let group = map.get(name);
    if (!group) {
      group = { name, vendor: model.vendor, icon: model.logoUrl || model.providerIconUrl, models: [] };
      map.set(name, group);
    }
    group.models.push(model);
  }
  return [...map.values()];
}

// 「按模型」维度：每个品牌只保留最新一条模型（优先非旧版，其次发布日期最新）
function isNewerModel(candidate, current) {
  const legacyDiff = Number(isLegacyModel(current)) - Number(isLegacyModel(candidate));
  if (legacyDiff !== 0) return legacyDiff > 0;
  const ta = releaseTimestamp(candidate);
  const tb = releaseTimestamp(current);
  if (ta != null && tb != null) return ta > tb;
  return ta != null && tb == null;
}

function latestModelsPerBrand(models) {
  const map = new Map();
  for (const model of models) {
    const name = providerBrandName(model.vendor);
    const current = map.get(name);
    if (!current || isNewerModel(model, current)) map.set(name, model);
  }
  return [...map.values()];
}

function groupCheapestInput(models) {
  let min = null;
  for (const model of models) {
    const value = numberOrNull(model.raw?.input_price);
    if (value == null || value < 0) continue;
    if (!min || value < min.value) min = { value, currency: model.raw?.currency };
  }
  return min;
}

function renderGroupSummary(group) {
  const cheapest = groupCheapestInput(group.models);
  const parts = [];
  if (cheapest) {
    const symbol = cheapest.currency === 'USD' ? '$' : '¥';
    parts.push(t('pricing.group.inputFrom', {
      symbol,
      price: cheapest.value.toLocaleString(numberLocale(), { maximumFractionDigits: 4 })
    }));
  }
  // 与套餐表格的「N 个可用」同款数量统计（复用 pricing.meta.models：'models' / '个模型'）
  parts.push(`${group.models.length} ${t('pricing.meta.models')}`);
  return `<span class="plan-table-group-summary">${escapeHtml(parts.join(' · '))}</span>`;
}

// ─── 表头筛选 ─────────────────────────────────────────────────────────────

// 与套餐表格表头筛选一致：每列可按展示值筛选，同时只生效一列
const FILTER_COLUMNS = {
  name: m => String(m.modelName || '').trim() || '—',
  provider: m => providerBrandName(m.vendor),
  context: m => formatContextShort(m.raw?.context_length),
  input: m => formatTokenPrice(m.raw?.input_price, m.raw?.currency),
  output: m => formatTokenPrice(m.raw?.output_price, m.raw?.currency)
};

function isEmptyFilterValue(value) {
  return value === '—' || value === t('pricing.pending');
}

function filterColumnValue(model, key) {
  const fn = FILTER_COLUMNS[key];
  return fn ? String(fn(model) || '').trim() || '—' : '';
}

function filterColumnOptions(models, key) {
  const counts = new Map();
  for (const model of models) {
    const value = filterColumnValue(model, key);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  const collator = new Intl.Collator(numberLocale(), { numeric: true, sensitivity: 'base' });
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => {
      const aEmpty = isEmptyFilterValue(a.value);
      const bEmpty = isEmptyFilterValue(b.value);
      if (aEmpty !== bEmpty) return aEmpty ? 1 : -1;
      return collator.compare(a.value, b.value);
    });
}

// ─── 渲染 ───────────────────────────────────────────────────────────────────

function renderSortIcon(key, activeKey, dir) {
  if (key !== activeKey) {
    return '<svg class="model-price-sort-icon model-price-sort-icon--idle" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l2.5 3h-5zM6 10l-2.5-3h5z" fill="currentColor"/></svg>';
  }
  const path = dir === 'asc' ? 'M6 2l3 4H3z' : 'M6 10L3 6h6z';
  return `<svg class="model-price-sort-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="${path}" fill="currentColor"/></svg>`;
}

function renderFilterMenu(key, filterState, baseModels) {
  const config = SORT_KEYS[key];
  const isActive = filterState.column === key && !!filterState.value;
  const options = filterColumnOptions(baseModels, key);
  return `<button type="button" class="plan-column-filter-trigger model-price-filter-trigger${isActive ? ' is-active' : ''}" data-model-filter-column="${key}" aria-haspopup="menu" aria-expanded="false" title="${escapeHtml(t('table.filter.tooltip'))} ${escapeHtml(t(config.labelKey))}">
      <span class="plan-column-filter-caret" aria-hidden="true"></span>
    </button>
    <div class="plan-column-filter-menu" data-model-filter-menu="${key}" role="menu" hidden>
      <button type="button" class="plan-column-filter-option${isActive ? '' : ' is-active'}" data-model-filter-value="">
        <span class="plan-column-filter-option-label">${escapeHtml(t('table.filter.all'))}</span>
        <span class="plan-column-filter-option-count">${baseModels.length}</span>
      </button>
      ${options.map(option => `
        <button type="button" class="plan-column-filter-option${isActive && option.value === filterState.value ? ' is-active' : ''}" data-model-filter-value="${escapeHtml(option.value)}">
          <span class="plan-column-filter-option-label">${escapeHtml(option.value)}</span>
          <span class="plan-column-filter-option-count">${option.count}</span>
        </button>
      `).join('')}
    </div>`;
}

function renderTableHeader(sortKey, sortDir, filterState, baseModels) {
  const th = (key, cls = '') => {
    const config = SORT_KEYS[key];
    const active = key === sortKey;
    return `<th class="model-price-th plan-column-filter ${cls}" data-sort-key="${key}" role="columnheader" aria-sort="${active ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}" tabindex="0">
      <span class="model-price-th-inner">${escapeHtml(t(config.labelKey))}${renderSortIcon(key, sortKey, sortDir)}</span>
      ${renderFilterMenu(key, filterState, baseModels)}
    </th>`;
  };
  return `<thead class="model-price-thead">
    <tr>
      ${th('name')}
      ${th('provider', 'model-price-col-provider')}
      ${th('context')}
      ${th('input')}
      ${th('output')}
    </tr>
  </thead>`;
}

function renderTableRow(model) {
  const inputRaw = numberOrNull(model.raw?.input_price);
  const outputRaw = numberOrNull(model.raw?.output_price);
  const contextRaw = numberOrNull(model.raw?.context_length);
  const currency = model.raw?.currency;

  const inputDisplay = formatTokenPrice(inputRaw, currency);
  const outputDisplay = formatTokenPrice(outputRaw, currency);
  const contextDisplay = formatContextShort(contextRaw);
  const displayName = providerBrandName(model.vendor);
  const docsUrl = model.sourceUrl || model.raw?.docs_url || '';
  const legacyBadge = isLegacyModel(model)
    ? `<span class="model-price-legacy-badge">${escapeHtml(t('pricing.legacy'))}</span>`
    : '';

  const nameHtml = docsUrl
    ? `<a class="model-price-name-link" href="${escapeHtml(docsUrl)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(model.modelName)}</a>`
    : `<span>${escapeHtml(model.modelName)}</span>`;

  // 品牌列：已生成品牌页时可点击跳转（与套餐表格一致）
  const providerHref = brandDetailHref(model.vendor);
  const providerInner = `${providerIcon(model.vendor, model.logoUrl || model.providerIconUrl)}<span>${escapeHtml(displayName)}</span>`;
  const providerHtml = providerHref
    ? `<a href="${escapeHtml(providerHref)}" class="model-price-provider plan-provider-cell--link">${providerInner}</a>`
    : `<span class="model-price-provider">${providerInner}</span>`;

  return `<tr class="model-price-row">
    <td class="model-price-td model-price-td--name">
      <span class="model-price-model-name">${nameHtml}${legacyBadge}</span>
    </td>
    <td class="model-price-td model-price-td--provider model-price-col-provider">
      ${providerHtml}
    </td>
    <td class="model-price-td model-price-td--context">${escapeHtml(contextDisplay)}</td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${inputRaw == null ? ' model-price-value--empty' : ''}">${escapeHtml(inputDisplay)}</span>
      ${inputRaw != null ? `<span class="model-price-unit">${escapeHtml(t('pricing.unit'))}</span>` : ''}
    </td>
    <td class="model-price-td model-price-td--price">
      <span class="model-price-value${outputRaw == null ? ' model-price-value--empty' : ''}">${escapeHtml(outputDisplay)}</span>
      ${outputRaw != null ? `<span class="model-price-unit">${escapeHtml(t('pricing.unit'))}</span>` : ''}
    </td>
  </tr>`;
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

/**
 * 渲染模型价格对比视图
 * @param {HTMLElement} container - 挂载容器
 * @param {Array} models - normalizeBackendModel 后的模型数组
 */
export function renderModelPriceView(container, models, providerInfo = {}) {
  currentProviderInfo = providerInfo || {};
  // 只保留有价格数据的模型（至少 input 或 output 有值）
  const pricedModels = models.filter(m =>
    numberOrNull(m.raw?.input_price) != null || numberOrNull(m.raw?.output_price) != null
  );

  // 提取品牌列表
  const providerSet = new Map();
  for (const model of pricedModels) {
    const name = providerBrandName(model.vendor);
    if (!providerSet.has(name)) {
      providerSet.set(name, { name, icon: model.logoUrl || model.providerIconUrl, vendor: model.vendor });
    }
  }
  const providers = [...providerSet.values()].sort((a, b) => a.name.localeCompare(b.name, numberLocale()));

  let activeProvider = 'all';
  let sortKey = 'release';
  let sortDir = 'desc';
  // 视图维度：按品牌（品牌 Tab）/ 按模型（模型 Tab，选项只列每品牌最新一条）
  let activeDimension = 'brand';
  // 「按模型」维度选中的模型 Tab
  let activeModel = 'all';
  // 搜索词：可搜全部模型（不受「按模型」只显示最新一条的限制）
  let searchQuery = '';
  // 表头筛选状态（与套餐表格一致，同时只生效一列）
  let filterColumn = '';
  let filterValue = '';
  // 已手动展开的品牌分组（与套餐表格一致，跨排序/切换保留）
  const expandedProviders = new Set();

  function isFilterActive() {
    return Boolean(filterColumn && filterValue && FILTER_COLUMNS[filterColumn]);
  }

  // 当前 Tab 范围：按品牌=品牌 Tab；按模型=模型 Tab（选项只列每品牌最新一条）
  function getScopeModels() {
    if (activeDimension === 'model') {
      if (activeModel === 'all') return pricedModels;
      return pricedModels.filter(m => (m.modelName || '') === activeModel);
    }
    if (activeProvider === 'all') return pricedModels;
    return pricedModels.filter(m => providerBrandName(m.vendor) === activeProvider);
  }

  // 表头筛选/统计的基准集：Tab 范围 + 搜索（搜全部模型，不限于最新模型选项）
  function getBaseModels() {
    let list = getScopeModels();
    const query = searchQuery.toLowerCase();
    if (query) {
      list = list.filter(m =>
        String(m.modelName || '').toLowerCase().includes(query)
        || providerBrandName(m.vendor).toLowerCase().includes(query)
      );
    }
    return list;
  }

  function getFilteredModels(baseModels) {
    let list = baseModels;
    if (isFilterActive()) {
      list = list.filter(m => filterColumnValue(m, filterColumn) === filterValue);
    }
    return sortModels(list, sortKey, sortDir);
  }

  function renderTabs() {
    return activeDimension === 'model' ? renderModelTabs() : renderProviderTabs();
  }

  // 「按模型」维度的 Tab 选项：只列每个品牌的最新模型（与套餐页模型 Tab 同款）
  function renderModelTabs() {
    const latest = latestModelsPerBrand(pricedModels)
      .sort((a, b) => (a.modelName || '').localeCompare(b.modelName || '', numberLocale()));
    const allTab = `<button type="button" class="brand-tab${activeModel === 'all' ? ' is-active' : ''}" data-model-tab="all">
      <span>${escapeHtml(t('home.tab.all'))}</span><span class="brand-count">${pricedModels.length}</span>
    </button>`;
    const tabs = latest.map(m => {
      const name = m.modelName || '';
      return `<button type="button" class="brand-tab${activeModel === name ? ' is-active' : ''}" data-model-tab="${escapeHtml(name)}">
        ${providerIcon(m.vendor, m.logoUrl || m.providerIconUrl)}
        <span>${escapeHtml(name)}</span>
      </button>`;
    }).join('');
    return `<div class="brand-tab-list model-price-tabs">${allTab}<span class="brand-divider"></span>${tabs}</div>`;
  }

  function renderProviderTabs() {
    const allTab = `<button type="button" class="brand-tab${activeProvider === 'all' ? ' is-active' : ''}" data-provider="all">
      <span>${escapeHtml(t('home.tab.all'))}</span><span class="brand-count">${pricedModels.length}</span>
    </button>`;
    const tabs = providers.map(p => {
      const count = pricedModels.filter(m => providerBrandName(m.vendor) === p.name).length;
      return `<button type="button" class="brand-tab${activeProvider === p.name ? ' is-active' : ''}" data-provider="${escapeHtml(p.name)}">
        ${providerIcon(p.vendor, p.icon)}
        <span>${escapeHtml(p.name)}</span>
        <span class="brand-count">${count}</span>
      </button>`;
    }).join('');
    return `<div class="brand-tab-list model-price-tabs">${allTab}<span class="brand-divider"></span>${tabs}</div>`;
  }

  function renderGroupRows(group, showAllGroups) {
    const canCollapse = !showAllGroups && group.models.length > MODEL_TABLE_GROUP_PREVIEW;
    const isGroupExpanded = showAllGroups || !canCollapse || expandedProviders.has(group.name);
    const visibleModels = isGroupExpanded ? group.models : group.models.slice(0, MODEL_TABLE_GROUP_PREVIEW);
    // 分组头品牌：已生成品牌页时可点击跳转（与套餐表格一致）
    const brandHref = brandDetailHref(group.vendor);
    const brandInner = `${renderBrandIcon(group.icon || brandForProvider(group.vendor)?.iconUrl || '', group.name, 'brand-icon brand-icon--section')}
            <span class="text-sm font-bold text-brand-800 dark:text-brand-200">${escapeHtml(group.name)}</span>`;
    const headerInner = `
            ${brandHref ? `<a href="${escapeHtml(brandHref)}" class="plan-table-group-brand">${brandInner}</a>` : brandInner}
            <span class="rounded-full bg-brand-100 px-1.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">${group.models.length}</span>
            <span class="plan-table-group-right">
              ${renderGroupSummary(group)}
              ${canCollapse ? '<svg class="plan-table-group-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg>' : ''}
            </span>`;
    const header = canCollapse
      ? `<div class="plan-table-group-toggle" role="button" tabindex="0" data-model-group-toggle="${escapeHtml(group.name)}" aria-expanded="${isGroupExpanded ? 'true' : 'false'}" aria-label="${isGroupExpanded ? t('group.collapse') : t('group.expand')} ${escapeHtml(group.name)}">${headerInner}</div>`
      : `<div class="plan-table-group-toggle plan-table-group-toggle--static">${headerInner}</div>`;
    return `
      <tr class="border-y border-slate-200 dark:border-slate-700">
        <td colspan="5" class="bg-brand-50/70 p-0 dark:bg-brand-950/20">
          ${header}
        </td>
      </tr>
      ${visibleModels.map(renderTableRow).join('')}`;
  }

  // 筛选摘要条（与套餐表格一致：列名 + 选中值 + 命中数 + 清除）
  function renderFilterSummary(filteredCount, baseCount) {
    if (!isFilterActive()) return '';
    return `<div class="plan-table-filter-summary">
      <span class="plan-table-filter-chip">
        <span>${escapeHtml(t(SORT_KEYS[filterColumn].labelKey))}</span>
        <strong>${escapeHtml(filterValue)}</strong>
      </span>
      <span class="plan-table-filter-count">${filteredCount} / ${baseCount} ${escapeHtml(t('table.filter.count'))}</span>
      <button type="button" class="plan-table-filter-clear" data-model-filter-clear>${escapeHtml(t('table.filter.clear'))}</button>
    </div>`;
  }

  function renderTable() {
    const baseModels = getBaseModels();
    if (!baseModels.length) {
      currentExportModels = [];
      return `<p class="model-price-empty">${escapeHtml(t('pricing.empty'))}</p>`;
    }
    const filtered = getFilteredModels(baseModels);
    // 导出数据与当前可见列表保持一致（排序后的完整列表，不截断分组）
    currentExportModels = filtered;
    // 选中具体品牌/模型 Tab、表头筛选或搜索生效时视为已筛选，全部展开（与套餐表格一致）
    const showAllGroups = activeProvider !== 'all' || activeModel !== 'all' || isFilterActive() || Boolean(searchQuery);
    const body = filtered.length
      ? groupModelsByProvider(filtered)
        .map(group => renderGroupRows(group, showAllGroups))
        .join('')
      : `<tr>
          <td colspan="5" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">${escapeHtml(t('pricing.empty'))}</td>
        </tr>`;
    return `${renderFilterSummary(filtered.length, baseModels.length)}
    <div class="model-price-table-wrap">
      <table class="model-price-table" role="grid" aria-label="${escapeHtml(t('pricing.table.aria'))}">
        ${renderTableHeader(sortKey, sortDir, { column: filterColumn, value: filterValue }, baseModels)}
        <tbody class="model-price-tbody">
          ${body}
        </tbody>
      </table>
    </div>
    <p class="model-price-footnote">${escapeHtml(t('pricing.footnote'))}</p>`;
  }

  // 顶部工具栏：维度切换 + 搜索（与套餐页同款交互；只渲染一次，避免搜索框失焦）
  function renderToolbar() {
    return `<div class="brand-filter-row model-price-toolbar">
      <div class="brand-tab-list">
        <button type="button" data-model-dimension="brand" class="brand-tab${activeDimension === 'brand' ? ' is-active' : ''}"><span>${escapeHtml(t('home.dimension.brand'))}</span></button>
        <button type="button" data-model-dimension="model" class="brand-tab${activeDimension === 'model' ? ' is-active' : ''}"><span>${escapeHtml(t('home.dimension.model'))}</span></button>
      </div>
      <div class="brand-search-box">
        <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
        <input type="search" class="brand-search-input" data-model-search placeholder="${escapeHtml(t('home.search.model'))}" autocomplete="off" aria-label="${escapeHtml(t('home.search.aria'))}" value="${escapeHtml(searchQuery)}">
      </div>
    </div>`;
  }

  function render() {
    container.innerHTML = `
      <div class="model-price-view">
        ${renderToolbar()}
        <div class="model-price-content" data-model-price-content></div>
      </div>`;
    bindToolbarEvents();
    renderContent();
  }

  function renderContent() {
    const content = container.querySelector('[data-model-price-content]');
    if (!content) return;
    content.innerHTML = `${renderTabs()}${renderTable()}`;
    bindEvents();
  }

  function bindToolbarEvents() {
    container.querySelectorAll('[data-model-dimension]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.modelDimension;
        if (mode === activeDimension) return;
        activeDimension = mode;
        // 切换维度时重置选中项与搜索（与套餐页一致）
        activeProvider = 'all';
        activeModel = 'all';
        searchQuery = '';
        const searchInput = container.querySelector('[data-model-search]');
        if (searchInput) searchInput.value = '';
        container.querySelectorAll('[data-model-dimension]').forEach(b => {
          b.classList.toggle('is-active', b.dataset.modelDimension === mode);
        });
        renderContent();
      });
    });
    const searchInput = container.querySelector('[data-model-search]');
    searchInput?.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      renderContent();
    });
  }

  function closeFilterMenus() {
    container.querySelectorAll('.plan-column-filter-menu').forEach(menu => { menu.hidden = true; });
    container.querySelectorAll('[data-model-filter-column]').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  }

  function bindEvents() {
    // 品牌/模型 Tab 切换
    container.querySelectorAll('.model-price-tabs .brand-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.dataset.modelTab != null) {
          activeModel = tab.dataset.modelTab;
        } else {
          activeProvider = tab.dataset.provider;
        }
        renderContent();
      });
    });
    // 分组头展开/收起
    container.querySelectorAll('[data-model-group-toggle]').forEach(toggle => {
      const handler = e => {
        // 分组头内的品牌页链接点击不触发折叠，交给浏览器跳转
        if (e?.target?.closest?.('a')) return;
        const name = toggle.dataset.modelGroupToggle;
        if (expandedProviders.has(name)) {
          expandedProviders.delete(name);
        } else {
          expandedProviders.add(name);
        }
        renderContent();
      };
      toggle.addEventListener('click', handler);
      toggle.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(e); } });
    });
    // 表头筛选：触发器开关菜单（阻止冒泡，避免触发表头排序）
    container.querySelectorAll('[data-model-filter-column]').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        const menu = trigger.closest('.plan-column-filter')?.querySelector('.plan-column-filter-menu');
        if (!menu) return;
        const wasOpen = !menu.hidden;
        closeFilterMenus();
        if (!wasOpen) {
          menu.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); trigger.click(); }
      });
    });
    // 表头筛选：选项选中/取消
    container.querySelectorAll('[data-model-filter-menu]').forEach(menu => {
      menu.addEventListener('click', e => {
        e.stopPropagation();
        const option = e.target.closest('[data-model-filter-value]');
        if (!option) return;
        const value = option.dataset.modelFilterValue || '';
        filterColumn = value ? menu.dataset.modelFilterMenu : '';
        filterValue = value;
        renderContent();
      });
    });
    // 表头筛选：清除
    container.querySelectorAll('[data-model-filter-clear]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterColumn = '';
        filterValue = '';
        renderContent();
      });
    });
    // 表头排序
    container.querySelectorAll('.model-price-th[data-sort-key]').forEach(th => {
      const handler = e => {
        // 点在筛选触发器/菜单上时不触发排序
        if (e?.target?.closest?.('.plan-column-filter-trigger, .plan-column-filter-menu')) return;
        const key = th.dataset.sortKey;
        if (sortKey === key) {
          sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          sortKey = key;
          sortDir = 'asc';
        }
        renderContent();
      };
      th.addEventListener('click', handler);
      th.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(e); } });
    });
  }

  // 点击表格外部时关闭筛选菜单（重复调用时先移除旧监听，避免叠加）
  if (container._modelFilterDocClose) {
    document.removeEventListener('click', container._modelFilterDocClose);
    document.removeEventListener('keydown', container._modelFilterDocKey);
  }
  container._modelFilterDocClose = e => { if (!container.contains(e.target)) closeFilterMenus(); };
  container._modelFilterDocKey = e => { if (e.key === 'Escape') closeFilterMenus(); };
  document.addEventListener('click', container._modelFilterDocClose);
  document.addEventListener('keydown', container._modelFilterDocKey);

  render();
}
