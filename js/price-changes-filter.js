// /price-changes/ global price change timeline - brand/plan/changed filtering.
// The build step (build-seo-pages.mjs) emits the filter controls (#priceChangesFilter)
// and per-event markers (li[data-brand][data-plan][data-change-type] / grouped li[data-brand][data-plans]).
// This module only filters client-side: hides non-matching rows and empty date groups;
// without JS the page remains fully readable. Language follows the site toggle via i18n.
import { t } from './i18n.js';

export function initPriceChangesFilter() {
  const root = document.getElementById('priceChangesFilter');
  const container = document.getElementById('priceChangesContainer');
  if (!root || !container) return;
  const brandSel = document.getElementById('pcFilterBrand');
  const planSel = document.getElementById('pcFilterPlan');
  const countEl = document.getElementById('pcFilterCount');
  const changedBtn = document.getElementById('pcFilterChanged');
  if (!brandSel || !planSel || !countEl) return;

  // "Price changed" = increase / decrease / delisted; first listings and info-only adjustments are not changes.
  const CHANGED_TYPES = new Set(['increase', 'decrease', 'delisted']);
  let changedOnly = false;

  const rows = Array.from(container.querySelectorAll('li[data-brand]')).map(li => ({
    li,
    brand: li.dataset.brand,
    plans: (li.dataset.plans || li.dataset.plan || '').split(/\s+/).filter(Boolean),
    changeType: li.dataset.changeType || ''
  }));

  function applyFilter() {
    const brand = brandSel.value;
    const plan = planSel.value;
    let visible = 0;
    for (const row of rows) {
      const show = (!brand || row.brand === brand)
        && (!plan || row.plans.includes(plan))
        && (!changedOnly || CHANGED_TYPES.has(row.changeType));
      row.li.classList.toggle('hidden', !show);
      if (show) visible += 1;
    }
    // Hide date groups with no visible rows to keep the timeline semantics.
    for (const section of container.querySelectorAll(':scope > section')) {
      const hasVisible = Array.from(section.querySelectorAll('li')).some(li => !li.classList.contains('hidden'));
      section.classList.toggle('hidden', !hasVisible);
    }
    if (!brand && !plan && !changedOnly) {
      countEl.textContent = '';
      countEl.classList.add('hidden');
    } else {
      countEl.textContent = t('seo.pcMatchCount', { n: visible });
      countEl.classList.remove('hidden');
    }
  }

  // On brand change rebuild the plan dropdown by data-brand (keep "All plans"),
  // avoiding cross-brand options noise. The "All plans" label is re-created via i18n.
  brandSel.addEventListener('change', () => {
    const brand = brandSel.value;
    const keep = Array.from(planSel.options).filter(option => option.value && option.dataset.brand === brand);
    planSel.replaceChildren();
    const all = document.createElement('option');
    all.value = '';
    all.textContent = t('seo.pcAllPlans');
    planSel.appendChild(all);
    keep.forEach(option => planSel.appendChild(option));
    applyFilter();
  });
  planSel.addEventListener('change', applyFilter);

  // "Price Changed" quick filter: keep only increase/decrease/delisted events.
  // Active state is driven by aria-pressed (styles.css); stacks with the other filters.
  if (changedBtn) {
    changedBtn.addEventListener('click', () => {
      changedOnly = !changedOnly;
      changedBtn.setAttribute('aria-pressed', String(changedOnly));
      applyFilter();
    });
  }
}
