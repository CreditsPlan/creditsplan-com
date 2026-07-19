import { escapeHtml, safeExternalUrl } from '../render.js';
import { modelDataUrl } from '../data-source.js';

export function modelMatchesRegion(model, activeRegion, hasRegionFilter = true) {
  if (!hasRegionFilter) return true;
  if (activeRegion === 'domestic') {
    return model.market_region === 'domestic' || model.market_region === 'domestic_international';
  }
  return model.market_region === 'international' || model.market_region === 'domestic_international';
}

export function regionModels(models, activeRegion, hasRegionFilter = true) {
  return models.filter(model => modelMatchesRegion(model, activeRegion, hasRegionFilter));
}

export function packageUrlForRegion(model, activeRegion) {
  if (activeRegion === 'domestic' && model.domestic_plan_url) {
    return model.domestic_plan_url;
  }
  if (activeRegion === 'international' && model.coding_plan_international_url) {
    return model.coding_plan_international_url;
  }
  if (activeRegion === 'international' && model.international_plan_url) {
    return model.international_plan_url;
  }
  return model.coding_plan_url || model.plan_url || model.docs_url;
}

export function packagePlanRows(models, activeRegion) {
  const providerMap = new Map();
  models.forEach(model => {
    // 区域由品牌决定：套餐区域跟随所属模型/品牌的 market_region
    if (!modelMatchesRegion(model, activeRegion)) return;
    const plans = model.package_plans || [];
    plans.forEach(plan => {
      const provider = plan.provider || model.provider;
      if (!providerMap.has(provider)) {
        providerMap.set(provider, { ...plan, model });
      }
    });
  });
  return Array.from(providerMap.values());
}

export function accessBadge(level) {
  const map = {
    easy: ['容易', 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300'],
    medium: ['中等', 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300'],
    hard: ['较难', 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300']
  };
  const item = map[level] || ['未知', 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'];
  return `<span class="inline-flex rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${item[1]}">${item[0]}</span>`;
}

export function codingPlanBadge(model) {
  if (!model.coding_plan_status_label && !model.plan_url) return '<span class="text-xs text-slate-400 dark:text-slate-500">暂无</span>';
  const styleMap = {
    available: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
    rush_sale: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    unavailable: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
    unknown: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
  };
  const status = model.coding_plan_status || 'available';
  const label = model.coding_plan_status_label || '可购买';
  const style = styleMap[status] || styleMap.unknown;
  return `<span class="inline-flex rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${style}">${escapeHtml(label)}</span>`;
}

export function officialPackageLink(model, activeRegion) {
  const url = safeExternalUrl(packageUrlForRegion(model, activeRegion));
  if (!url) return codingPlanBadge(model);
  const planId = String(model.planId || model.plan_id || model.raw?.planId || model.raw?.plan_id || '').trim();
  const brand = String(model.brand || model.brand_slug || model.raw?.brand || model.raw?.brand_slug || planId.split('.')[0] || '').trim();
  return `<a class="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-transparent px-1.5 py-1 transition hover:border-slate-200 hover:bg-slate-50/90 hover:shadow-sm dark:hover:border-slate-700 dark:hover:bg-slate-900/90" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer nofollow" data-track="plan-out" data-plan-id="${escapeHtml(planId)}" data-brand="${escapeHtml(brand)}" aria-label="打开 ${escapeHtml(model.name)} 官方套餐购买页面" title="打开官方套餐购买页面">${codingPlanBadge(model)}<svg class="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg></a>`;
}

export async function loadData() {
  const dataUrl = modelDataUrl();
  let lastError;
  try {
    const response = await fetch(dataUrl, { cache: 'no-store', headers: { Accept: 'application/json' } });
    if (response.ok) {
      return await response.json();
    }
    lastError = new Error(`HTTP ${response.status}`);
  } catch (err) {
    lastError = err;
  }
  throw new Error(`${dataUrl} unavailable: ${lastError?.message || 'unknown error'}`);
}
