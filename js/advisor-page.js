// advisor-page.js — standalone plan advisor page (/advisor/): reuses createAdvisorApp from
// plan-advisor.js. Filters sync to the URL query (families/usage/budget) so the current
// result can be shared by copying the link.
// Page chrome (header/footer/theme/i18n) is initialized by app.js via data-auto-init in HEAD_COMMON.
import { createAdvisorApp } from './plan-advisor.js';
import { loadPlanDataset } from './public-data.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import { filterPlansByProviderInfo } from './shared/plan-utils.js';
import { t } from './i18n.js';

function stateFromLocation() {
  const params = new URLSearchParams(location.search);
  const families = (params.get('families') || '').split(',').map(item => item.trim()).filter(Boolean);
  const usage = Number(params.get('usage'));
  const budget = Number(params.get('budget'));
  return {
    families,
    usage: Number.isFinite(usage) && usage > 0 ? usage : undefined,
    budget: Number.isFinite(budget) && budget > 0 ? budget : undefined
  };
}

function syncStateToLocation(state) {
  const params = new URLSearchParams();
  if (state.families.size) params.set('families', [...state.families].join(','));
  if (state.usage) params.set('usage', String(state.usage));
  if (state.budget != null) params.set('budget', String(state.budget));
  const query = params.toString();
  history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}`);
}

// Same wording as the plans-page data-unavailable notice.
function renderDataUnavailable(root, source) {
  const message = source === 'backend'
    ? t('home.dataUnavailable.backend')
    : t('home.dataUnavailable.static');
  root.innerHTML = `<p class="plan-advisor-empty">${message}</p>`;
}

async function initAdvisorPage() {
  const root = document.getElementById('advisorRoot');
  if (!root) return;
  const dataset = await loadPlanDataset();
  if (dataset.dataUnavailable) {
    renderDataUnavailable(root, dataset.source);
    return;
  }
  const providerInfo = dataset.providerInfo || {};
  // Same scope as the home dialog: only displayable plans of registered brands.
  const plans = filterPlansByProviderInfo(dataset.plans, providerInfo, PROVIDER_NAME_MAP);
  createAdvisorApp({
    root,
    plans,
    providerInfo,
    modelCatalog: dataset.modelCatalog || [],
    initialState: stateFromLocation(),
    onStateChange: syncStateToLocation
  });
}

initAdvisorPage();
