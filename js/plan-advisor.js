// plan-advisor.js — "Help me choose" plan value calculator (pure frontend, based on loaded plan data).
// Inputs: model family (multi), monthly usage tier, budget cap. Output: tier-ranked plan recommendations.
// International site: prices are normalized to USD for ranking (CNY plans converted at a fixed rate).
import { escapeHtml, safeExternalUrl } from './render.js';
import { renderBrandIcon } from './plans-table.js';
import { outboundTrackingAttributes, purchaseLinkTarget } from './plans-detail.js';
import { PROVIDER_NAME_MAP } from './shared/brands.js';
import { displayNameForProvider } from './shared/plan-utils.js';
import { t, numberLocale } from './i18n.js';

// Fixed CNY-per-USD rate used only to normalize the single CNY plan for cross-plan ranking.
const CNY_PER_USD = 7.2;

// Monthly usage tiers (calls / month).
const USAGE_TIERS = [
  { id: 'light', labelKey: 'advisor.usage.light', value: 500 },
  { id: 'medium', labelKey: 'advisor.usage.medium', value: 3000 },
  { id: 'heavy', labelKey: 'advisor.usage.heavy', value: 10000 },
  { id: 'extreme', labelKey: 'advisor.usage.extreme', value: 30000 }
];

// model_catalog provider → model family name (falls back to the provider name itself).
const PROVIDER_FAMILY_MAP = {
  'Anthropic': 'Claude',
  'Claude': 'Claude',
  'ChatGPT': 'GPT',
  'ChartGPT': 'GPT', // 旧名兼容：2026-07-29 品牌名由 ChartGPT 更正为 ChatGPT
  'Google': 'Gemini',
  'Google Antigravity': 'Gemini',
  'Grok': 'Grok',
  'Z.ai': 'GLM',
  'BytePlus': 'Doubao',
  '阿里云': 'Qwen',
  'StepFun': 'Step',
  '阶跃星辰': 'Step',
  'Cursor': 'Cursor',
  'Qoder': 'Qoder',
  'Trae': 'Trae',
  'OpenCode': 'OpenCode'
};

const DEFAULT_VISIBLE_RESULTS = 8;

// ---------- Quota parsing: free text → number (bilingual) ----------

export function parseQuota(text) {
  const value = String(text || '').trim();
  if (!value) return null;
  if (/未指定|无明确|未公开|不适用|待更新|待确认|unspecified|not specified|n\/a|tbd|unknown/i.test(value)) return null;
  const match = value.replace(/,/g, '').match(/(\d+(?:\.\d+)?)\s*(万)?/);
  if (!match) return null;
  const number = parseFloat(match[1]) * (match[2] === '万' ? 10000 : 1);
  return Number.isFinite(number) && number > 0 ? number : null;
}

// Normalize to a monthly quota: prefer monthly, else weekly ×4.3, else 5-hour window ×30 (one window/day, conservative).
export function monthlyQuota(plan) {
  const monthly = parseQuota(plan.monthlyRequests);
  if (monthly != null) {
    return { value: monthly, estimated: /约|估算|approx|estimat/i.test(plan.monthlyRequests), basis: 'monthly' };
  }
  const weekly = parseQuota(plan.weeklyRequests);
  if (weekly != null) {
    return { value: Math.round(weekly * 4.3), estimated: true, basis: 'weekly' };
  }
  const fiveHours = parseQuota(plan.fiveHoursRequests);
  if (fiveHours != null) {
    return { value: fiveHours * 30, estimated: true, basis: 'fiveHours' };
  }
  return null;
}

// ---------- Effective monthly price: lowest of monthly / quarterly / annual (normalized to USD) ----------

export function effectiveMonthlyPrice(plan) {
  const candidates = [
    { value: plan.monthlyPriceValue, cycle: 'monthly' },
    { value: plan.quarterlyMonthlyPriceValue, cycle: 'quarterly' },
    { value: plan.annualMonthlyPriceValue, cycle: 'annual' }
  ].filter(item => Number.isFinite(item.value) && item.value >= 0);
  if (!candidates.length) return null;
  const best = candidates.reduce((a, b) => (b.value < a.value ? b : a));
  const isCny = plan.monthlyCurrency === 'CNY';
  return {
    value: best.value,
    cycle: best.cycle,
    currency: plan.monthlyCurrency || 'USD',
    usd: isCny ? best.value / CNY_PER_USD : best.value
  };
}

// ---------- Model family options ----------

function familyForCatalogModel(model) {
  return PROVIDER_FAMILY_MAP[model.provider] || model.provider || 'Other';
}

export function buildFamilyOptions(modelCatalog, plans) {
  const familyByModelId = new Map();
  for (const model of modelCatalog) {
    if (model.id) familyByModelId.set(model.id, familyForCatalogModel(model));
  }
  const counts = new Map();
  for (const plan of plans) {
    const families = new Set((plan.modelIds || [])
      .map(id => familyByModelId.get(id))
      .filter(Boolean));
    for (const family of families) {
      counts.set(family, (counts.get(family) || 0) + 1);
    }
  }
  const options = [...counts.entries()]
    .map(([family, count]) => ({ family, count }))
    .sort((a, b) => (b.count - a.count) || a.family.localeCompare(b.family, 'en'));
  return { options, familyByModelId };
}

function planFamilies(plan, familyByModelId) {
  return new Set((plan.modelIds || []).map(id => familyByModelId.get(id)).filter(Boolean));
}

// ---------- Matching & tiered ranking ----------

// Tiers: 1 quota covers usage (cost per 1k asc) → 2 quota may be short → 3 quota undisclosed (price asc) → 4 models not listed.
export function rankPlans(plans, criteria, familyByModelId) {
  const { families, usage, budget } = criteria;
  const results = [];
  let paygoCount = 0;

  for (const plan of plans) {
    if (plan.planType === 'api_package') { paygoCount += 1; continue; }

    const price = effectiveMonthlyPrice(plan);
    if (budget != null && price && price.usd > budget) continue;

    let unlabeled = false;
    if (families.size) {
      const matched = planFamilies(plan, familyByModelId);
      if (!matched.size) {
        unlabeled = true; // Models not listed: keep but demote, do not drop.
      } else if (![...matched].some(family => families.has(family))) {
        continue;
      }
    }

    const quota = monthlyQuota(plan);
    const costPer1k = quota && price && quota.value > 0 ? (price.usd / quota.value) * 1000 : null;
    let tier;
    if (unlabeled) tier = 4;
    else if (!quota) tier = 3;
    else if (quota.value >= usage) tier = 1;
    else tier = 2;

    results.push({ plan, price, quota, costPer1k, tier });
  }

  results.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    if (a.tier === 1 || a.tier === 2) {
      if (a.costPer1k !== b.costPer1k) return (a.costPer1k ?? Infinity) - (b.costPer1k ?? Infinity);
    }
    const priceA = a.price ? a.price.usd : Infinity;
    const priceB = b.price ? b.price.usd : Infinity;
    return priceA - priceB;
  });

  return { results, paygoCount };
}

// ---------- Formatting ----------

function formatCount(value) {
  return Math.round(value).toLocaleString(numberLocale());
}

function formatMoney(value, currency = 'USD') {
  const symbol = currency === 'CNY' ? '¥' : '$';
  return `${symbol}${value.toLocaleString(numberLocale(), { maximumFractionDigits: value < 10 ? 2 : 0 })}`;
}

// ---------- Dialog rendering ----------

function renderResultItem(item, providerInfo) {
  const { plan, price, quota, costPer1k, tier } = item;
  const providerLabel = displayNameForProvider(plan.provider, providerInfo, PROVIDER_NAME_MAP);
  const chips = [];
  if (tier === 1) chips.push(`<span class="plan-advisor-chip plan-advisor-chip--good">${escapeHtml(t('advisor.chip.enough'))}</span>`);
  else if (tier === 2) chips.push(`<span class="plan-advisor-chip plan-advisor-chip--warn">${escapeHtml(t('advisor.chip.short'))}</span>`);
  else if (tier === 3) chips.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${escapeHtml(t('advisor.chip.unknown'))}</span>`);
  else chips.push(`<span class="plan-advisor-chip plan-advisor-chip--muted">${escapeHtml(t('advisor.chip.unlabeled'))}</span>`);
  if (quota) {
    const suffix = quota.estimated ? `（${escapeHtml(t('advisor.chip.estimated', { basis: t(`advisor.basis.${quota.basis}`) }))}）` : '';
    chips.push(`<span class="plan-advisor-chip">${escapeHtml(t('advisor.chip.monthlyQuota', { n: formatCount(quota.value) }))}${suffix}</span>`);
  }
  if (costPer1k != null) {
    chips.push(`<span class="plan-advisor-chip">${escapeHtml(t('advisor.chip.per1k', { price: formatMoney(costPer1k) }))}</span>`);
  }
  if (plan.supportedModelNames?.length) {
    const names = plan.supportedModelNames.slice(0, 3).join(' / ');
    const more = plan.supportedModelNames.length > 3 ? ' …' : '';
    chips.push(`<span class="plan-advisor-chip">${escapeHtml(t('advisor.chip.supports', { models: names + more }))}</span>`);
  }

  let priceHtml = `<span class="plan-advisor-price-muted">${escapeHtml(t('advisor.price.official'))}</span>`;
  if (price) {
    const cycleBadge = price.cycle !== 'monthly' ? `<span class="plan-advisor-cycle">${escapeHtml(t(`advisor.cycle.${price.cycle}`))}</span>` : '';
    const cnyNote = price.currency === 'CNY'
      ? `<span class="plan-advisor-price-note">${escapeHtml(t('advisor.price.cnyNote', { n: formatCount(price.usd), rate: CNY_PER_USD }))}</span>`
      : '';
    priceHtml = `<span class="plan-advisor-price">${formatMoney(price.value, price.currency)}/${escapeHtml(t('common.perMonth'))}</span>${cycleBadge}${cnyNote}`;
  }

  const planUrl = safeExternalUrl(plan.url);
  const link = planUrl ? purchaseLinkTarget(plan, planUrl) : null;
  const linkHtml = link
    ? `<a href="${escapeHtml(link.href)}" target="_blank" rel="${link.rel}" ${outboundTrackingAttributes(plan)} class="plan-advisor-link">${escapeHtml(t('advisor.link'))}</a>`
    : '';

  return `
    <li class="plan-advisor-result">
      <div class="plan-advisor-result-head">
        ${renderBrandIcon(plan.providerIconUrl, providerLabel, 'brand-icon plan-advisor-result-icon')}
        <div class="plan-advisor-result-name">
          <strong>${escapeHtml(plan.name)}</strong>
          <span>${escapeHtml(providerLabel)}</span>
        </div>
        <div class="plan-advisor-result-price">${priceHtml}</div>
      </div>
      <div class="plan-advisor-result-chips">${chips.join('')}</div>
      ${linkHtml}
    </li>
  `;
}

function renderDialogShell(familyOptions) {
  return `
    <div class="plan-advisor-dialog" role="dialog" aria-modal="true" aria-labelledby="planAdvisorTitle" tabindex="-1">
      <div class="plan-advisor-head">
        <h2 id="planAdvisorTitle">${escapeHtml(t('advisor.title'))}</h2>
        <button type="button" class="plan-advisor-close" data-advisor-close aria-label="${escapeHtml(t('advisor.close.aria'))}">✕</button>
      </div>
      <div class="plan-advisor-body">
        <div class="plan-advisor-form">
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">${escapeHtml(t('advisor.family.label'))}<small>${escapeHtml(t('advisor.family.hint'))}</small></span>
            <div class="plan-advisor-options" data-advisor-families>
              ${familyOptions.map(option => `
                <button type="button" class="plan-advisor-option" data-family="${escapeHtml(option.family)}" aria-pressed="false">
                  ${escapeHtml(option.family)}<span class="plan-advisor-option-count">${option.count}</span>
                </button>
              `).join('')}
            </div>
          </div>
          <div class="plan-advisor-field">
            <span class="plan-advisor-label">${escapeHtml(t('advisor.usage.label'))}</span>
            <div class="plan-advisor-options" data-advisor-usage>
              ${USAGE_TIERS.map(tier => `
                <button type="button" class="plan-advisor-option${tier.id === 'medium' ? ' is-active' : ''}" data-usage="${tier.value}" aria-pressed="${tier.id === 'medium'}">
                  ${escapeHtml(t(tier.labelKey))}
                </button>
              `).join('')}
              <input type="number" min="1" class="plan-advisor-input" data-advisor-usage-custom placeholder="${escapeHtml(t('advisor.usage.custom'))}" aria-label="${escapeHtml(t('advisor.usage.custom'))}">
            </div>
          </div>
          <div class="plan-advisor-field plan-advisor-field--row">
            <label class="plan-advisor-budget">
              <span>${escapeHtml(t('advisor.budget'))}</span>
              <input type="number" min="0" class="plan-advisor-input" data-advisor-budget placeholder="${escapeHtml(t('advisor.budget.placeholder'))}" aria-label="${escapeHtml(t('advisor.budget'))}">
            </label>
          </div>
        </div>
        <div class="plan-advisor-results" data-advisor-results aria-live="polite"></div>
      </div>
      <p class="plan-advisor-disclaimer">${escapeHtml(t('advisor.disclaimer'))}</p>
    </div>
  `;
}

// ---------- Init ----------

export function initPlanAdvisor({ plans, providerInfo = {}, modelCatalog = [], fab }) {
  if (!fab) return null;
  const { options: familyOptions, familyByModelId } = buildFamilyOptions(modelCatalog, plans);

  const state = {
    families: new Set(),
    usage: USAGE_TIERS[1].value,
    budget: null,
    showAll: false
  };

  let overlay = null;
  let lastFocused = null;

  const renderResults = () => {
    const container = overlay.querySelector('[data-advisor-results]');
    const { results, paygoCount } = rankPlans(plans, state, familyByModelId);
    if (!results.length) {
      container.innerHTML = `
        <p class="plan-advisor-empty">${escapeHtml(t('advisor.empty'))}</p>
        ${paygoCount ? `<p class="plan-advisor-paygo">${escapeHtml(t('advisor.paygo', { n: paygoCount }))}</p>` : ''}
      `;
      return;
    }
    const visible = state.showAll ? results : results.slice(0, DEFAULT_VISIBLE_RESULTS);
    container.innerHTML = `
      <p class="plan-advisor-summary">${escapeHtml(t('advisor.summary', { n: results.length }))}</p>
      <ol class="plan-advisor-list">
        ${visible.map(item => renderResultItem(item, providerInfo)).join('')}
      </ol>
      ${results.length > DEFAULT_VISIBLE_RESULTS && !state.showAll
        ? `<button type="button" class="plan-advisor-more" data-advisor-more>${escapeHtml(t('advisor.expand', { n: results.length }))}</button>`
        : ''}
      ${paygoCount ? `<p class="plan-advisor-paygo">${escapeHtml(t('advisor.paygo', { n: paygoCount }))}</p>` : ''}
    `;
  };

  const close = () => {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    lastFocused?.focus?.();
  };

  const ensureOverlay = () => {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'plan-advisor-overlay';
    overlay.hidden = true;
    overlay.innerHTML = renderDialogShell(familyOptions);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', event => {
      // Backdrop clicks no longer dismiss the dialog (avoid losing filter state); only ✕ button and ESC close it.
      if (event.target.closest('[data-advisor-close]')) {
        close();
        return;
      }
      const familyButton = event.target.closest('[data-family]');
      if (familyButton) {
        const family = familyButton.dataset.family;
        if (state.families.has(family)) state.families.delete(family);
        else state.families.add(family);
        const active = state.families.has(family);
        familyButton.classList.toggle('is-active', active);
        familyButton.setAttribute('aria-pressed', String(active));
        state.showAll = false;
        renderResults();
        return;
      }
      const usageButton = event.target.closest('[data-usage]');
      if (usageButton) {
        state.usage = Number(usageButton.dataset.usage);
        overlay.querySelectorAll('[data-usage]').forEach(button => {
          const active = button === usageButton;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        const custom = overlay.querySelector('[data-advisor-usage-custom]');
        if (custom) custom.value = '';
        state.showAll = false;
        renderResults();
        return;
      }
      if (event.target.closest('[data-advisor-more]')) {
        state.showAll = true;
        renderResults();
      }
    });

    overlay.querySelector('[data-advisor-usage-custom]')?.addEventListener('input', event => {
      const value = Number(event.target.value);
      if (Number.isFinite(value) && value > 0) {
        state.usage = value;
        overlay.querySelectorAll('[data-usage]').forEach(button => {
          button.classList.remove('is-active');
          button.setAttribute('aria-pressed', 'false');
        });
      }
      state.showAll = false;
      renderResults();
    });

    overlay.querySelector('[data-advisor-budget]')?.addEventListener('input', event => {
      const value = Number(event.target.value);
      state.budget = Number.isFinite(value) && value > 0 ? value : null;
      state.showAll = false;
      renderResults();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && overlay && !overlay.hidden) close();
    });
  };

  const open = () => {
    ensureOverlay();
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    renderResults();
    overlay.querySelector('.plan-advisor-dialog')?.focus();
  };

  fab.addEventListener('click', open);
  return { open, close };
}
