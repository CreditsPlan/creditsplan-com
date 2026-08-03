import { initAppShell } from './app.js';
import {
  applyPlanTableFilter,
  bindPlanTableFilters,
  clearPlanTableFilter,
  isAvailableOnlyActive,
  toggleAvailableOnly
} from './plans-filters.js';
import { getModelPriceExportModels, renderModelPriceView } from './model-price-table.js';
import { initPlanAdvisor } from './plan-advisor.js';
import { initPlanTableSticky } from './plan-table-sticky.js';
import { renderAllPlansDualView, renderBrandIcon } from './plans-table.js';
import { loadPlanDataset } from './public-data.js';
import { escapeHtml } from './render.js';
import { t } from './i18n.js';
import { PROVIDER_NAME_MAP, brandForProvider } from './shared/brands.js';
import {
  dataFreshnessSummary,
  displayNameForProvider,
  filterFreePlans,
  filterPlansByProviderInfo,
  providerMetadata,
  providerSortOrder,
  safeIconUrl,
  sortPlansBySortOrder
} from './shared/plan-utils.js';

const VIRTUAL_TABS = [
  { id: 'all', labelKey: 'home.tab.all' },
  { id: 'free', labelKey: 'home.tab.free' }
];

function modelHasPrice(model) {
  const input = model.raw?.input_price;
  const output = model.raw?.output_price;
  return (input != null && input !== '') || (output != null && output !== '');
}

// Average monthly price across USD-billed plans with a listed monthly price
// (CNY-billed outliers are excluded to keep the mean in one currency).
function averageMonthlyPrice(plans) {
  const values = plans
    .filter(plan => (plan.monthlyCurrency || 'USD') === 'USD')
    .map(plan => plan.monthlyPriceValue)
    .filter(value => Number.isFinite(value) && value > 0);
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

const els = {
  codingPlanOverview: document.getElementById('codingPlanOverview')
};

function finishPlansLoading() {
  if (!els.codingPlanOverview) return;
  els.codingPlanOverview.classList.remove('plans-loading-shell');
  els.codingPlanOverview.setAttribute('aria-busy', 'false');
}

function groupPlansByBrand(plans, providerInfo) {
  const grouped = new Map();
  for (const plan of plans) {
    const brand = brandForProvider(plan.provider);
    const provider = String(plan.provider || '').trim();
    const canonicalProvider = PROVIDER_NAME_MAP[provider] || provider;
    if (!canonicalProvider) continue;
    const metadata = providerMetadata(provider, providerInfo, PROVIDER_NAME_MAP);
    const id = brand?.id || canonicalProvider;
    let group = grouped.get(id);
    if (!group) {
      group = {
        id,
        provider,
        label: displayNameForProvider(provider, providerInfo, PROVIDER_NAME_MAP),
        iconUrl: safeIconUrl(metadata.icon_url)
          || safeIconUrl(plan.providerIconUrl)
          || safeIconUrl(brand?.iconUrl),
        sortOrder: providerSortOrder(provider, providerInfo, PROVIDER_NAME_MAP),
        plans: []
      };
      grouped.set(id, group);
    } else if (!group.iconUrl) {
      group.iconUrl = safeIconUrl(metadata.icon_url)
        || safeIconUrl(plan.providerIconUrl)
        || safeIconUrl(brand?.iconUrl);
    }
    group.plans.push(plan);
  }
  for (const group of grouped.values()) {
    group.plans = sortPlansBySortOrder(group.plans);
  }
  return grouped;
}

function groupPlansByModel(plans, modelCatalog, providerInfo = {}) {
  const grouped = new Map();
  for (const model of modelCatalog) {
    const matched = plans.filter(plan => Array.isArray(plan.modelIds) && plan.modelIds.includes(model.id));
    if (!matched.length) continue;
    const metadata = providerMetadata(model.provider, providerInfo, PROVIDER_NAME_MAP);
    const iconUrl = safeIconUrl(model.logoUrl)
      || safeIconUrl(metadata.icon_url)
      || safeIconUrl(model.providerIconUrl)
      || safeIconUrl(brandForProvider(model.provider)?.iconUrl);
    grouped.set(`model:${model.id}`, {
      id: `model:${model.id}`,
      label: model.name || model.id,
      iconUrl,
      sortOrder: Number.isFinite(model.sortOrder) ? model.sortOrder : 99,
      plans: sortPlansBySortOrder(matched)
    });
  }
  return grouped;
}

// 页面级数据新鲜度：把「每条数据都有最后核验时间」外显为页头信任状（文案走 i18n）
function renderDataFreshness(plans) {
  const fresh = dataFreshnessSummary(plans);
  if (fresh.state !== 'ok') return '';
  const text = fresh.hours < 24
    ? t('home.freshness.hours', { n: fresh.hours })
    : fresh.days < 60
      ? t('home.freshness.days', { n: fresh.days })
      : t('home.freshness.date', { date: fresh.date });
  const title = t('home.freshness.title', { date: fresh.date, verified: fresh.verifiedCount, total: fresh.total });
  return `<span id="dataFreshness" class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300" title="${escapeHtml(title)}">
    <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
    ${escapeHtml(text)}
  </span>`;
}

function renderHeroBanner() {
  return `
    <div class="cn-hero-banner" role="complementary" aria-label="${escapeHtml(t('home.hero.aria'))}">
      <div class="cn-hero-banner__points">
        <span class="cn-hero-point"><span aria-hidden="true">$</span>${escapeHtml(t('home.hero.usd'))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">□</span>${escapeHtml(t('home.hero.card'))}</span>
        <span class="cn-hero-point"><span aria-hidden="true">◈</span>${escapeHtml(t('home.hero.global'))}</span>
      </div>
      <a class="cn-hero-banner__intl" href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${escapeHtml(t('home.hero.cnLink'))}</a>
    </div>
  `;
}

function initPlansBackTop(workbench) {
  const button = els.codingPlanOverview.querySelector('#plansBackTop');
  if (!button || !workbench) return;

  const syncVisibility = () => {
    const rect = workbench.getBoundingClientRect();
    button.classList.toggle('is-visible', rect.top < -160 && rect.bottom > 160);
  };
  button.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    workbench.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
  window.addEventListener('scroll', syncVisibility, { passive: true });
  window.addEventListener('resize', syncVisibility);
  syncVisibility();
}

function renderExportMenu() {
  return `
    <div class="plans-export" id="plansExport">
      <button type="button" class="plans-export-trigger" id="plansExportTrigger" aria-haspopup="menu" aria-expanded="false" title="${escapeHtml(t('export.trigger.title'))}">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 15.5h12" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>${escapeHtml(t('export.trigger'))}</span>
      </button>
      <div class="plans-export-menu" id="plansExportMenu" role="menu" hidden>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="excel">
          <span class="plans-export-option-icon plans-export-option-icon--excel" aria-hidden="true">X</span>
          <span class="plans-export-option-text"><strong>Excel</strong><small>${escapeHtml(t('export.excel.desc'))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="word">
          <span class="plans-export-option-icon plans-export-option-icon--word" aria-hidden="true">W</span>
          <span class="plans-export-option-text"><strong>Word</strong><small>${escapeHtml(t('export.word.desc'))}</small></span>
        </button>
        <button type="button" class="plans-export-option" role="menuitem" data-export-format="pdf">
          <span class="plans-export-option-icon plans-export-option-icon--pdf" aria-hidden="true">P</span>
          <span class="plans-export-option-text"><strong>PDF</strong><small>${escapeHtml(t('export.pdf.desc'))}</small></span>
        </button>
      </div>
    </div>
  `;
}

function bindExportMenu(root, getExportPayload, providerInfo) {
  const trigger = root.querySelector('#plansExportTrigger');
  const menu = root.querySelector('#plansExportMenu');
  if (!trigger || !menu) return;

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };
  trigger.addEventListener('click', () => {
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    trigger.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('click', event => {
    if (!root.querySelector('#plansExport')?.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  menu.addEventListener('click', async event => {
    const option = event.target.closest('[data-export-format]');
    if (!option) return;
    closeMenu();
    const format = option.dataset.exportFormat;
    const payload = getExportPayload();
    // 导出模块体积较大且非首屏功能，点击时才动态加载（build 时分包）
    const exporter = await import('./plans-export.js');
    // 模型价格视图导出当前筛选后的模型；套餐视图导出跟随列筛选与「只看可购买」的套餐
    if (payload.kind === 'models') {
      if (format === 'excel') exporter.exportModelPricesExcel(payload.models);
      else if (format === 'word') exporter.exportModelPricesWord(payload.models);
      else if (format === 'pdf') exporter.exportModelPricesPdf(payload.models);
      return;
    }
    if (format === 'excel') exporter.exportPlansExcel(payload.plans, providerInfo);
    else if (format === 'word') exporter.exportPlansWord(payload.plans, providerInfo);
    else if (format === 'pdf') exporter.exportPlansPdf(payload.plans, providerInfo);
  });
}

function renderCodingPlanOverview(plans, providerInfo = {}, modelCatalog = [], models = []) {
  if (!els.codingPlanOverview) return;
  const displayablePlans = filterPlansByProviderInfo(plans, providerInfo, PROVIDER_NAME_MAP);
  const grouped = groupPlansByBrand(displayablePlans, providerInfo);
  const visibleBrands = [...grouped.values()]
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const modelGrouped = groupPlansByModel(displayablePlans, modelCatalog, providerInfo);
  const visibleModels = [...modelGrouped.values()]
    .sort((a, b) => (a.sortOrder - b.sortOrder) || a.label.localeCompare(b.label, 'zh-CN'));
  const counts = { all: displayablePlans.length, free: filterFreePlans(displayablePlans).length };
  const avgMonthly = averageMonthlyPrice(displayablePlans);
  // Stats row hierarchy: avg. monthly as the primary stat (large number + brand card), counts as secondary chips
  const statsHtml = `
            ${avgMonthly != null ? `<span class="workbench-stat workbench-stat--primary">
              <span class="workbench-stat-value">$${Math.round(avgMonthly)}</span>
              <span class="workbench-stat-label">${escapeHtml(t('home.meta.avgMonthly'))}</span>
            </span>` : ''}
            <span class="workbench-stat"><strong>${displayablePlans.length}</strong> ${escapeHtml(t('home.meta.records'))}</span>
            <span class="workbench-stat"><strong>${visibleBrands.length}</strong> ${escapeHtml(t('home.meta.brands'))}</span>
            <span class="workbench-stat"><strong>${visibleModels.length}</strong> ${escapeHtml(t('home.meta.models'))}</span>`;

  els.codingPlanOverview.innerHTML = `
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div class="workbench-intro">
          <p class="workbench-kicker">${escapeHtml(t('home.kicker'))}</p>
          <h1 id="codingPlanTitle" class="workbench-title">${escapeHtml(t('home.title'))}</h1>
          <p id="workbenchSummary" class="workbench-summary">${escapeHtml(t('home.summary'))}</p>
        </div>
        <div class="workbench-meta">
          <span id="workbenchStats">${statsHtml}
          </span>
          ${renderDataFreshness(displayablePlans)}
          ${renderExportMenu()}
        </div>
      </div>
      ${renderHeroBanner()}
      <div class="workbench-body">
        <div id="brandFilterBar" class="brand-filter-bar">
          <div class="brand-filter-row">
            <div id="dimensionSwitch" class="brand-tab-list">
              <button type="button" data-dimension="brand" class="brand-tab is-active"><span>${escapeHtml(t('home.dimension.brand'))}</span></button>
              <button type="button" data-dimension="model" class="brand-tab"><span>${escapeHtml(t('home.dimension.model'))}</span></button>
            </div>
            <button type="button" class="plan-quick-filter" data-plan-available-toggle aria-pressed="false">
              <span class="plan-quick-filter-mark" aria-hidden="true">✓</span>${escapeHtml(t('table.quick.availableOnly'))}
            </button>
            <div class="brand-search-box">
              <svg class="brand-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4" stroke-linecap="round"/></svg>
              <input id="brandSearchInput" type="search" class="brand-search-input" placeholder="${escapeHtml(t('home.search.brand'))}" autocomplete="off" aria-label="${escapeHtml(t('home.search.aria'))}">
            </div>
          </div>
          <div id="brandTabs" class="brand-tab-list">
            ${VIRTUAL_TABS.map(tab => `
              <button type="button" data-brand="${tab.id}" data-brand-label="${escapeHtml(t(tab.labelKey))}" class="brand-tab${tab.id === 'all' ? ' is-active' : ''}">
                <span>${escapeHtml(t(tab.labelKey))}</span>
                ${counts[tab.id] > 0 ? `<span class="brand-count">${counts[tab.id]}</span>` : ''}
              </button>
            `).join('')}
            <span class="brand-divider"></span>
            ${visibleBrands.map(brand => {
              return `<button type="button" data-brand="${escapeHtml(brand.id)}" data-brand-label="${escapeHtml(brand.label)}" class="brand-tab">
                ${renderBrandIcon(brand.iconUrl, brand.label, 'brand-icon brand-icon--tab')}
                <span>${escapeHtml(brand.label)}</span>
                <span class="brand-count">${brand.plans.length}</span>
              </button>`;
            }).join('')}
          </div>
          <div id="modelTabs" class="brand-tab-list" hidden>
            <button type="button" data-brand="all" data-brand-label="${escapeHtml(t('home.tab.all'))}" class="brand-tab is-active">
              <span>${escapeHtml(t('home.tab.all'))}</span>
              ${counts.all > 0 ? `<span class="brand-count">${counts.all}</span>` : ''}
            </button>
            <span class="brand-divider"></span>
            ${visibleModels.map(model => {
              return `<button type="button" data-brand="${escapeHtml(model.id)}" data-brand-label="${escapeHtml(model.label)}" class="brand-tab">
                ${renderBrandIcon(model.iconUrl, model.label, 'brand-icon brand-icon--tab')}
                <span>${escapeHtml(model.label)}</span>
                <span class="brand-count">${model.plans.length}</span>
              </button>`;
            }).join('')}
          </div>
        </div>
        <div id="brandDetail" class="brand-detail">
          ${renderAllPlansDualView(displayablePlans, '', providerInfo)}
        </div>
      </div>
    </section>
    <button id="plansBackTop" class="plans-back-top" type="button" aria-label="${escapeHtml(t('home.backTop.aria'))}" title="${escapeHtml(t('home.backTop.title'))}">
      <span aria-hidden="true">↑</span>
    </button>
    <button id="planAdvisorFab" class="plan-advisor-fab" type="button" aria-label="${escapeHtml(t('advisor.fab.aria'))}" title="${escapeHtml(t('advisor.fab.title'))}">
      <span aria-hidden="true">$</span>
      <span>${escapeHtml(t('advisor.fab.label'))}</span>
    </button>
  `;

  finishPlansLoading();

  const workbench = els.codingPlanOverview.querySelector('.plans-workbench');
  const filterBar = els.codingPlanOverview.querySelector('#brandFilterBar');
  const brandTabs = els.codingPlanOverview.querySelector('#brandTabs');
  const modelTabs = els.codingPlanOverview.querySelector('#modelTabs');
  const detail = els.codingPlanOverview.querySelector('#brandDetail');
  initPlansBackTop(workbench);
  // 表头吸顶（横向滚动容器下 CSS sticky 失效，改用 JS 浮条）
  initPlanTableSticky(detail);
  const advisorFab = els.codingPlanOverview.querySelector('#planAdvisorFab');
  const advisor = initPlanAdvisor({ plans: displayablePlans, providerInfo, modelCatalog, fab: advisorFab });
  // SEO 落地页导流：通过 /#advisor 进入首页时自动打开计算器
  if (advisor && location.hash === '#advisor') advisor.open();

  let currentPlans = displayablePlans;
  bindExportMenu(els.codingPlanOverview, () => ({
    kind: activeDimension === 'pricing' ? 'models' : 'plans',
    plans: applyPlanTableFilter(currentPlans),
    models: getModelPriceExportModels()
  }), providerInfo);
  let activeBrandId = 'all';
  let activeDimension = 'brand';
  let selectedPlanKey = '';
  const expandedProviders = new Set();
  // “只看可购买”开关常驻筛选栏，不随视图重绘，需手动同步激活态（切换品牌/维度时会被重置）
  const availableOnlyToggle = filterBar.querySelector('[data-plan-available-toggle]');
  const syncAvailableOnlyToggle = () => {
    if (!availableOnlyToggle) return;
    const active = isAvailableOnlyActive();
    availableOnlyToggle.classList.toggle('is-active', active);
    availableOnlyToggle.setAttribute('aria-pressed', String(active));
  };
  const renderCurrentView = () => {
    syncAvailableOnlyToggle();
    if (activeDimension === 'pricing') {
      renderModelPriceView(detail, models, providerInfo);
      return;
    }
    detail.innerHTML = renderAllPlansDualView(
      currentPlans,
      selectedPlanKey,
      providerInfo,
      expandedProviders,
      activeBrandId !== 'all'
    );
  };
  const resetViewState = () => {
    clearPlanTableFilter();
    selectedPlanKey = '';
    expandedProviders.clear();
  };

  const renderFilteredView = () => {
    expandedProviders.clear();
    renderCurrentView();
  };

  bindPlanTableFilters(detail, () => currentPlans, renderFilteredView, key => {
    selectedPlanKey = selectedPlanKey === key ? '' : key;
    renderCurrentView();
  });
  const togglePlanGroup = provider => {
    if (expandedProviders.has(provider)) expandedProviders.delete(provider);
    else expandedProviders.add(provider);
    renderCurrentView();
  };
  detail.addEventListener('click', event => {
    // 分组头内的品牌页链接点击不触发折叠，交给浏览器跳转
    if (event.target.closest('a')) return;
    const toggle = event.target.closest('[data-plan-group-toggle]');
    if (!toggle) return;
    togglePlanGroup(toggle.dataset.planGroupToggle);
  });
  // 表格分组折叠头为 div[role=button]，需补齐键盘操作（真正的 button 由原生 click 处理）
  detail.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const toggle = event.target.closest('[data-plan-group-toggle]');
    if (!toggle || toggle.tagName === 'BUTTON' || event.target.closest('a')) return;
    event.preventDefault();
    togglePlanGroup(toggle.dataset.planGroupToggle);
  });
  const clearTabSelection = () => {
    [brandTabs, modelTabs].forEach(container => {
      container.querySelectorAll('.brand-tab').forEach(tab => tab.classList.remove('is-active'));
    });
  };

  const setCurrentPlansById = id => {
    if (id === 'all') currentPlans = displayablePlans;
    else if (id === 'free') currentPlans = filterFreePlans(displayablePlans);
    else if (grouped.has(id)) currentPlans = grouped.get(id).plans;
    else if (modelGrouped.has(id)) currentPlans = modelGrouped.get(id).plans;
  };

  // 根据当前视图切换头部标题、摘要与统计数据
  const syncWorkbenchHead = mode => {
    const title = els.codingPlanOverview.querySelector('#codingPlanTitle');
    const summary = els.codingPlanOverview.querySelector('#workbenchSummary');
    const stats = els.codingPlanOverview.querySelector('#workbenchStats');
    if (title) title.textContent = t(mode === 'pricing' ? 'pricing.title' : 'home.title');
    if (summary) summary.textContent = t(mode === 'pricing' ? 'pricing.summary' : 'home.summary');
    if (!stats) return;
    if (mode === 'pricing') {
      const priced = models.filter(modelHasPrice);
      const vendorCount = new Set(priced.map(m => PROVIDER_NAME_MAP[m.vendor] || m.vendor)).size;
      stats.innerHTML = `<span><strong>${priced.length}</strong> ${escapeHtml(t('pricing.meta.models'))}</span><span><strong>${vendorCount}</strong> ${escapeHtml(t('pricing.meta.vendors'))}</span>`;
    } else {
      stats.innerHTML = statsHtml;
    }
  };

  const switchDimension = mode => {
    if (mode === activeDimension) return;
    activeDimension = mode;
    filterBar.querySelectorAll('[data-dimension]').forEach(button => {
      button.classList.toggle('is-active', button.dataset.dimension === mode);
    });
    brandTabs.hidden = mode !== 'brand';
    modelTabs.hidden = mode !== 'model';
    if (searchInput) searchInput.placeholder = t(mode === 'brand' ? 'home.search.brand' : 'home.search.model');
    resetViewState();
    activeBrandId = 'all';
    currentPlans = displayablePlans;
    clearTabSelection();
    if (mode === 'pricing') {
      // 「模型」菜单页：只展示价格对比表，隐藏整个筛选栏（价格表自带厂商筛选）；
      // 导出菜单两种视图通用：价格视图导出当前筛选后的模型价格
      filterBar.hidden = true;
    } else {
      filterBar.hidden = false;
      (mode === 'brand' ? brandTabs : modelTabs).querySelector('[data-brand="all"]')?.classList.add('is-active');
    }
    // The calculator only serves the plans view; hide the fab on the model pricing view.
    if (advisorFab) advisorFab.hidden = mode === 'pricing';
    if (searchInput) { searchInput.value = ''; }
    filterTabsBySearch();
    syncWorkbenchHead(mode);
    syncPricingViewToLocation(mode);
    renderCurrentView();
  };

  const searchInput = els.codingPlanOverview.querySelector('#brandSearchInput');

  const filterTabsBySearch = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const activeTabs = activeDimension === 'brand' ? brandTabs : modelTabs;
    activeTabs.querySelectorAll('.brand-tab[data-brand]').forEach(tab => {
      const id = tab.dataset.brand;
      if (id === 'all' || id === 'free') { tab.hidden = false; return; }
      const label = (tab.dataset.brandLabel || '').toLowerCase();
      tab.hidden = query ? !label.includes(query) : false;
    });
    const divider = activeTabs.querySelector('.brand-divider');
    if (divider) divider.hidden = false;
  };

  searchInput?.addEventListener('input', filterTabsBySearch);

  filterBar.addEventListener('click', event => {
    const availableToggle = event.target.closest('[data-plan-available-toggle]');
    if (availableToggle) {
      toggleAvailableOnly();
      renderFilteredView();
      return;
    }
    const dimension = event.target.closest('[data-dimension]');
    if (dimension) {
      switchDimension(dimension.dataset.dimension);
      return;
    }
    const button = event.target.closest('.brand-tab');
    if (!button) return;
    if (!brandTabs.contains(button) && !modelTabs.contains(button)) return;
    const id = button.dataset.brand;
    resetViewState();
    activeBrandId = id;
    clearTabSelection();
    button.classList.add('is-active');
    setCurrentPlansById(id);
    renderCurrentView();
  });

  // 导航菜单「模型」入口：/model 直达模型价格对比视图
  const entryPath = (globalThis.location?.pathname || '').replace(/\/+$/, '') || '/';
  if (entryPath === '/model') {
    switchDimension('pricing');
  }
}

// 将价格对比视图状态同步到 URL（/model 与 / 互切），使链接可分享、导航高亮正确
function syncPricingViewToLocation(mode) {
  if (typeof globalThis.history?.replaceState !== 'function') return;
  try {
    const url = new URL(globalThis.location.href);
    const pathname = mode === 'pricing' ? '/model' : '/';
    globalThis.history.replaceState(null, '', `${pathname}${url.search}${url.hash}`);
  } catch { /* ignore invalid locations */ }
}

function renderPlanDataUnavailable(source) {
  if (!els.codingPlanOverview) return;
  const message = source === 'backend'
    ? t('home.dataUnavailable.backend')
    : t('home.dataUnavailable.static');
  els.codingPlanOverview.innerHTML = `
    <section class="plans-workbench" aria-labelledby="codingPlanTitle">
      <div class="workbench-head">
        <div>
          <span id="codingPlanTitle" style="font-weight:bold">${escapeHtml(t('home.dataUnavailable.title'))}</span>
        </div>
      </div>
      <div class="workbench-body">
        <p class="text-sm text-slate-600 dark:text-slate-300">${escapeHtml(message)}</p>
      </div>
    </section>
  `;
  finishPlansLoading();
}

async function initPlansPage() {
  initAppShell();
  const dataset = await loadPlanDataset();
  if (dataset.dataUnavailable) {
    renderPlanDataUnavailable(dataset.source);
    return;
  }
  renderCodingPlanOverview(dataset.plans, dataset.providerInfo || {}, dataset.modelCatalog || [], dataset.models || []);
}

initPlansPage();
