/**
 * cheapest-ranking.js — Cheapest plans ranking interactive enhancement
 * Adds: sticky header, column sorting, column filtering
 * Reuses plans-table CSS classes (plan-table-wrap / plan-column-filter etc.) for consistent styling
 */
import { escapeHtml } from './render.js';
import { t } from './i18n.js';

// ---- Column definitions ----
const COLUMNS = [
  { key: 'rank', labelKey: 'cheapest.col.rank', labelFallback: '#', sortable: true, filterable: false, numeric: true },
  { key: 'brand', labelKey: 'cheapest.col.brand', labelFallback: 'Brand', sortable: true, filterable: true },
  { key: 'plan', labelKey: 'cheapest.col.plan', labelFallback: 'Plan', sortable: true, filterable: true },
  { key: 'price', labelKey: 'cheapest.col.price', labelFallback: 'Monthly', sortable: true, filterable: true, numeric: true },
  { key: 'model', labelKey: 'cheapest.col.model', labelFallback: 'Models', sortable: true, filterable: true },
  { key: 'verified', labelKey: 'cheapest.col.verified', labelFallback: 'Verified', sortable: true, filterable: true }
];

function colLabel(col) {
  const translated = t(col.labelKey);
  // t() returns the key itself when translation is missing
  return translated !== col.labelKey ? translated : col.labelFallback;
}

// ---- State ----
let sortColumn = 'price';
let sortAsc = true;
const activeFilters = {};

// ---- Data reading ----
function readRows(table) {
  const tbody = table.querySelector('tbody');
  if (!tbody) return [];
  return [...tbody.querySelectorAll('tr')].map(tr => {
    const cells = {};
    tr.querySelectorAll('td').forEach(td => {
      const key = td.dataset.cheapestCol;
      if (key) cells[key] = td.dataset.sortValue || td.textContent.trim();
    });
    return { tr, cells };
  });
}

// ---- Sorting ----
function compareRows(a, b, col) {
  const def = COLUMNS.find(c => c.key === col);
  if (!def) return 0;
  const va = a.cells[col] || '';
  const vb = b.cells[col] || '';
  if (def.numeric) {
    const na = parseFloat(va.replace(/[^\d.\-]/g, ''));
    const nb = parseFloat(vb.replace(/[^\d.\-]/g, ''));
    const aEmpty = isNaN(na);
    const bEmpty = isNaN(nb);
    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1;
    if (bEmpty) return -1;
    return na - nb;
  }
  return va.localeCompare(vb, 'en');
}

// ---- Filtering ----
function passesFilter(row) {
  return Object.entries(activeFilters).every(([key, value]) => {
    if (!value) return true;
    return (row.cells[key] || '') === value;
  });
}

function getFilterOptions(rows, col) {
  const counts = new Map();
  for (const row of rows) {
    const val = row.cells[col.key] || '';
    if (!val) continue;
    counts.set(val, (counts.get(val) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], 'en'))
    .map(([value, count]) => ({ value, count }));
}

// ---- Rendering ----
function renderTable(wrap, allRows) {
  const filtered = allRows.filter(r => passesFilter(r));
  filtered.sort((a, b) => {
    const result = compareRows(a, b, sortColumn);
    return sortAsc ? result : -result;
  });

  // Re-number rows
  filtered.forEach((row, i) => {
    row.cells.rank = String(i + 1);
  });

  const table = wrap.querySelector('table');

  // Re-render thead
  const thead = table.querySelector('thead');
  thead.innerHTML = `<tr>${COLUMNS.map(col => renderHeaderCell(col, allRows)).join('')}</tr>`;

  // Re-render tbody
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = filtered.map(row => {
    // Preserve original HTML (with links) from the static table
    const origTds = row.tr.querySelectorAll('td');
    const tdMap = {};
    origTds.forEach(td => {
      const key = td.dataset.cheapestCol;
      if (key) tdMap[key] = td;
    });

    return `<tr>
      <td data-cheapest-col="rank" data-sort-value="${row.cells.rank}" class="py-2 pr-3 tabular-nums text-slate-500 dark:text-slate-400">${row.cells.rank}</td>
      <td data-cheapest-col="brand" data-sort-value="${escapeHtml(row.cells.brand)}" class="py-2 pr-3">${tdMap.brand ? tdMap.brand.innerHTML : escapeHtml(row.cells.brand || '')}</td>
      <td data-cheapest-col="plan" data-sort-value="${escapeHtml(row.cells.plan)}" class="py-2 pr-3">${tdMap.plan ? tdMap.plan.innerHTML : escapeHtml(row.cells.plan || '')}</td>
      <td data-cheapest-col="price" data-sort-value="${escapeHtml(row.cells.price)}" class="whitespace-nowrap py-2 pr-3 font-semibold tabular-nums text-slate-900 dark:text-white">${escapeHtml(row.cells.price || '')}</td>
      <td data-cheapest-col="model" data-sort-value="${escapeHtml(row.cells.model)}" class="py-2 pr-3 text-xs text-slate-500 dark:text-slate-400">${escapeHtml(row.cells.model || '')}</td>
      <td data-cheapest-col="verified" data-sort-value="${escapeHtml(row.cells.verified)}" class="py-2 text-xs tabular-nums text-slate-500 dark:text-slate-400">${escapeHtml(row.cells.verified || '')}</td>
    </tr>`;
  }).join('');

  // Update filter count
  const countEl = wrap.parentElement?.querySelector('[data-cheapest-count]');
  if (countEl) {
    const labelEn = `Showing ${filtered.length} of ${allRows.length} plans`;
    const labelZh = `显示 ${filtered.length} / ${allRows.length} 个套餐`;
    countEl.textContent = labelEn;
    countEl.setAttribute('data-locale', '');
    countEl.setAttribute('data-locale-zh', labelZh);
    countEl.setAttribute('data-locale-en', labelEn);
  }
}

function renderHeaderCell(col, allRows) {
  const isActive = sortColumn === col.key;
  const hasFilter = !!activeFilters[col.key];
  const sortIcon = isActive ? (sortAsc ? ' ↑' : ' ↓') : '';
  const label = colLabel(col);

  let filterMenu = '';
  if (col.filterable) {
    const options = getFilterOptions(allRows, col);
    const allLabel = t('table.filter.all');
    const allText = allLabel !== 'table.filter.all' ? allLabel : 'All';
    filterMenu = `
      <div class="plan-column-filter-menu" data-cheapest-menu="${col.key}" role="menu" hidden>
        <button type="button" class="plan-column-filter-option${!hasFilter ? ' is-active' : ''}" data-cheapest-filter-value="">
          <span class="plan-column-filter-option-label">${escapeHtml(allText)}</span>
          <span class="plan-column-filter-option-count">${allRows.length}</span>
        </button>
        ${options.map(opt => `
        <button type="button" class="plan-column-filter-option${hasFilter && activeFilters[col.key] === opt.value ? ' is-active' : ''}" data-cheapest-filter-value="${escapeHtml(opt.value)}">
          <span class="plan-column-filter-option-label">${escapeHtml(opt.value)}</span>
          <span class="plan-column-filter-option-count">${opt.count}</span>
        </button>`).join('')}
      </div>`;
  }

  const filterTooltip = t('table.filter.tooltip');
  const tooltipText = filterTooltip !== 'table.filter.tooltip' ? filterTooltip : 'Filter';

  return `
    <th scope="col" class="plan-column-filter px-3 py-3 text-left font-semibold text-slate-900 dark:text-white">
      <button type="button" class="plan-column-filter-trigger${isActive || hasFilter ? ' is-active' : ''}" data-cheapest-sort="${col.key}" title="${tooltipText} ${label}${col.filterable ? '' : ''}">
        <span class="plan-column-filter-label">${escapeHtml(label)}${sortIcon}</span>
        ${col.filterable ? '<span class="plan-column-filter-caret" aria-hidden="true"></span>' : ''}
      </button>
      ${filterMenu}
    </th>`;
}

// ---- Event binding ----
function bindEvents(wrap, allRows) {
  wrap.addEventListener('click', e => {
    // Filter menu toggle takes priority on the caret; clicking the header body sorts
    const caret = e.target.closest('.plan-column-filter-caret');
    if (caret) {
      const trigger = caret.closest('.plan-column-filter-trigger');
      const th = trigger?.closest('th');
      const menu = th?.querySelector('.plan-column-filter-menu');
      if (menu) {
        const wasHidden = menu.hidden;
        // Close other menus
        wrap.querySelectorAll('.plan-column-filter-menu').forEach(m => { m.hidden = true; });
        wrap.querySelectorAll('.plan-column-filter-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
        if (wasHidden) {
          menu.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
        }
        e.stopPropagation();
      }
      return;
    }

    // Sort
    const sortBtn = e.target.closest('[data-cheapest-sort]');
    if (sortBtn) {
      const col = sortBtn.dataset.cheapestSort;
      const colDef = COLUMNS.find(c => c.key === col);
      if (colDef?.sortable) {
        if (sortColumn === col) {
          sortAsc = !sortAsc;
        } else {
          sortColumn = col;
          sortAsc = true;
        }
        renderTable(wrap, allRows);
      }
      return;
    }

    // Toggle filter menu
    const trigger = e.target.closest('.plan-column-filter-trigger');
    if (trigger) {
      const th = trigger.closest('th');
      const menu = th?.querySelector('.plan-column-filter-menu');
      if (menu) {
        const wasHidden = menu.hidden;
        // Close other menus
        wrap.querySelectorAll('.plan-column-filter-menu').forEach(m => { m.hidden = true; });
        wrap.querySelectorAll('.plan-column-filter-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
        if (wasHidden) {
          menu.hidden = false;
          trigger.setAttribute('aria-expanded', 'true');
        }
        e.stopPropagation();
      }
      return;
    }

    // Filter option selected
    const filterOpt = e.target.closest('[data-cheapest-filter-value]');
    if (filterOpt) {
      const menu = filterOpt.closest('.plan-column-filter-menu');
      const col = menu?.dataset.cheapestMenu;
      const value = filterOpt.dataset.cheapestFilterValue;
      if (col) {
        if (value) {
          activeFilters[col] = value;
        } else {
          delete activeFilters[col];
        }
        renderTable(wrap, allRows);
      }
      return;
    }
  });

  // Close menus on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.plan-table-wrap[data-cheapest-ranking]')) {
      wrap.querySelectorAll('.plan-column-filter-menu').forEach(m => { m.hidden = true; });
      wrap.querySelectorAll('.plan-column-filter-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
  });
}

// ---- Sticky header (same fixed-bar approach as plan-table-sticky.js) ----
function initStickyHeader(wrap) {
  const BAR_CLASS = 'plan-table-sticky-bar';
  const table = wrap.querySelector('table');
  if (!table) return;

  let bar = null;
  let barInner = null;
  let barTable = null;
  let rafId = 0;

  const headerOffset = () => {
    const header = document.getElementById('header-root');
    if (header) {
      const bottom = header.getBoundingClientRect().bottom;
      if (Number.isFinite(bottom) && bottom > 0) return bottom;
    }
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    const value = parseFloat(raw);
    return Number.isFinite(value) && value > 0 ? value : 64;
  };

  const ensureBar = () => {
    if (bar) return;
    bar = document.createElement('div');
    bar.className = BAR_CLASS;
    bar.setAttribute('aria-hidden', 'true');
    barInner = document.createElement('div');
    barInner.className = `${BAR_CLASS}__inner`;
    barTable = document.createElement('table');
    barInner.appendChild(barTable);
    bar.appendChild(barInner);
    document.body.appendChild(bar);
  };

  const rebuildClone = () => {
    const thead = table.querySelector('thead');
    if (!thead) return false;
    barTable.className = table.className;
    barTable.innerHTML = '';
    const cols = [...thead.querySelectorAll('th')];
    if (cols.length) {
      const cg = document.createElement('colgroup');
      cols.forEach(th => {
        const col = document.createElement('col');
        const width = th.getBoundingClientRect().width;
        if (width > 0) col.style.width = `${width}px`;
        cg.appendChild(col);
      });
      barTable.appendChild(cg);
    }
    barTable.appendChild(thead.cloneNode(true));
    return true;
  };

  const update = () => {
    rafId = 0;
    wrap.classList.toggle('can-scroll', wrap.scrollWidth > wrap.clientWidth + 1);
    wrap.classList.toggle('is-scrolled-end', wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 1);

    const offset = headerOffset();
    const wrapRect = wrap.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    const thead = table.querySelector('thead');
    const theadHeight = thead ? thead.getBoundingClientRect().height : 0;

    if (wrapRect.top > offset || tableRect.bottom <= offset + theadHeight) {
      if (bar) bar.classList.remove('is-docked');
      return;
    }

    ensureBar();
    rebuildClone();
    bar.style.top = `${offset}px`;
    bar.style.left = `${wrapRect.left}px`;
    bar.style.width = `${wrapRect.width}px`;
    barInner.style.width = `${table.offsetWidth}px`;
    barInner.style.transform = `translateX(${-wrap.scrollLeft}px)`;
    bar.classList.add('is-docked');
  };

  const schedule = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  };

  const observer = new MutationObserver(() => schedule());
  observer.observe(table.querySelector('thead'), { childList: true, subtree: true });

  wrap.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();
}

// ---- Init ----
function init() {
  const wrap = document.querySelector('.plan-table-wrap[data-cheapest-ranking]');
  if (!wrap) return;
  const table = wrap.querySelector('table');
  if (!table) return;

  const allRows = readRows(table);
  if (!allRows.length) return;

  wrap.classList.add('plan-table-wrap');

  bindEvents(wrap, allRows);
  renderTable(wrap, allRows);
  initStickyHeader(wrap);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
