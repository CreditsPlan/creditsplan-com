import { initAppShell } from './app.js';
import { initFitDescription } from './fit-description.js';
import { escapeHtml } from './render.js';
import { t, numberLocale, getLang, hasCjk, toEnglishDisplay } from './i18n.js';
import { isLocalHostname } from './data-source.js';

// 英文优先取英文字段；缺失时经 toEnglishDisplay 兜底，仍含中文则返回空串（不展示）。
function pickLang(base, en) {
  if (getLang() === 'en') {
    if (en != null && String(en).trim()) return en;
    return toEnglishDisplay(base);
  }
  return base;
}

const kindLabels = {
  catalog: 'changelog.kind.catalog',
  data: 'changelog.kind.data',
  feature: 'changelog.kind.feature',
};

// 路线图状态（按展示优先级排序）
const roadmapStatus = {
  in_progress: { key: 'changelog.roadmap.status.progress', cls: 'progress' },
  planned: { key: 'changelog.roadmap.status.planned', cls: 'planned' },
  evaluating: { key: 'changelog.roadmap.status.evaluating', cls: 'evaluating' },
};
const roadmapOrder = ['in_progress', 'planned', 'evaluating'];

// 结构化变更明细的字段显示名（与采集管线 FIELD_LABELS 保持一致；未收录回退原字段名）
const diffFieldLabels = {
  monthly_price: { zh: '月费', en: 'Monthly price' },
  first_month_price: { zh: '首月价', en: 'First-month price' },
  quarterly_price: { zh: '季费', en: 'Quarterly price' },
  yearly_price: { zh: '年费', en: 'Yearly price' },
  annual_price: { zh: '按年价', en: 'Annual price' },
  monthly_currency: { zh: '币种', en: 'Currency' },
  included_calls: { zh: '包含额度', en: 'Included quota' },
  token_limit: { zh: 'Token 上限', en: 'Token limit' },
  five_hours_requests: { zh: '5 小时限额', en: '5-hour limit' },
  weekly_requests: { zh: '每周限额', en: 'Weekly limit' },
  monthly_requests: { zh: '每月限额', en: 'Monthly limit' },
  benefits: { zh: '权益', en: 'Benefits' },
  refund_policy: { zh: '退款政策', en: 'Refund policy' },
  billing_cycle: { zh: '计费周期', en: 'Billing cycle' },
  credits_limit: { zh: 'Credits 上限', en: 'Credits limit' },
  reset_rule: { zh: '重置规则', en: 'Reset rule' },
  notes: { zh: '备注', en: 'Notes' },
  url: { zh: '购买链接', en: 'Purchase URL' },
  url_en: { zh: '购买链接', en: 'Purchase URL' },
  sort_order: { zh: '排序', en: 'Sort order' },
  input_price: { zh: '输入价', en: 'Input price' },
  output_price: { zh: '输出价', en: 'Output price' },
  cache_read_price: { zh: '缓存读价', en: 'Cache read price' },
  cache_write_price: { zh: '缓存写价', en: 'Cache write price' },
  currency: { zh: '币种', en: 'Currency' },
  context_length: { zh: '上下文长度', en: 'Context length' },
  max_output: { zh: '最大输出', en: 'Max output' },
  lifecycle_status: { zh: '生命周期状态', en: 'Lifecycle status' },
  release_date: { zh: '发布日期', en: 'Release date' },
};

function diffFieldLabel(field) {
  const labels = diffFieldLabels[field];
  return labels ? (getLang() === 'en' ? labels.en : labels.zh) : field;
}

const els = {
  count: document.getElementById('changelogEntryCount'),
  error: document.getElementById('changelogError'),
  list: document.getElementById('changelogList'),
  loading: document.getElementById('changelogLoading'),
  empty: document.getElementById('changelogEmpty'),
  changelogView: document.getElementById('changelogView'),
  roadmapList: document.getElementById('roadmapList'),
  roadmapView: document.getElementById('roadmapView'),
  roadmapEmpty: document.getElementById('roadmapEmpty'),
  updatedAt: document.getElementById('changelogUpdatedAt'),
  filterResult: document.getElementById('filterResult'),
  dateFilterList: document.getElementById('dateFilterList'),
  sidebarNav: document.getElementById('changelogSidebarNav'),
  chips: document.getElementById('changelogChips'),
  tabbar: document.getElementById('changelogTabbar'),
  searchInput: document.getElementById('changelogSearchInput'),
};

// 筛选状态：view 为 all（更新日志）或 roadmap（正在推进）；category/month/query 仅在 all 视图生效
const state = { view: 'all', category: '', month: '', query: '' };
let entries = [];
let roadmapItems = [];
let searchTimer = null;

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  return match ? `${match[1]}.${match[2]}.${match[3]}` : '—';
}

function formatDiffValue(value) {
  if (value === null || value === undefined || String(value).trim() === '') return '—';
  return String(value);
}

// 单条结构化变更明细：平台/档位（或模型）标签 + 字段级旧值→新值 diff
function renderChangeItem(change) {
  const isModel = change?.scope === 'model';
  const isCreate = change?.action === 'create';
  const subject = isModel
    ? (change?.model_name || change?.canonical_id || '')
    : (change?.plan_name || change?.plan_id || '');
  const actionKey = `changelog.diff.${isCreate ? 'create' : 'update'}${isModel ? 'Model' : 'Plan'}`;
  const changes = change?.changes && typeof change.changes === 'object' ? Object.entries(change.changes) : [];

  return `
    <li class="changelog-diff-item">
      <div class="changelog-diff-head">
        <span class="changelog-diff-action changelog-diff-action--${isCreate ? 'create' : 'update'}">${escapeHtml(t(actionKey))}</span>
        ${change?.provider ? `<span class="changelog-diff-provider">${escapeHtml(change.provider)}</span>` : ''}
        <span class="changelog-diff-subject">${escapeHtml(subject)}</span>
      </div>
      ${changes.length ? `
      <dl class="changelog-diff-fields">
        ${changes.map(([field, c]) => `
        <div class="changelog-diff-field">
          <dt>${escapeHtml(diffFieldLabel(field))}</dt>
          <dd><del>${escapeHtml(formatDiffValue(c?.from))}</del><span class="changelog-diff-arrow" aria-hidden="true">→</span><ins>${escapeHtml(formatDiffValue(c?.to))}</ins></dd>
        </div>`).join('')}
      </dl>` : ''}
    </li>`;
}

function renderEntry(entry) {
  const kind = Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data';
  const date = String(entry?.date || '');
  const defaultItems = Array.isArray(entry?.items) ? entry.items : [];
  const englishItems = Array.isArray(entry?.items_en) ? entry.items_en : [];
  const items = getLang() === 'en' && englishItems.length ? englishItems : defaultItems;
  const changeItems = Array.isArray(entry?.change_items) ? entry.change_items : [];

  return `
    <article class="changelog-release" data-changelog-kind="${escapeHtml(kind)}">
      <div class="changelog-date">
        <time datetime="${escapeHtml(date)}">${escapeHtml(formatDate(date))}</time>
        <span>${escapeHtml(date.slice(0, 4))}</span>
      </div>
      <div class="changelog-release-body">
        <div class="changelog-release-meta">
          <span>${escapeHtml(entry?.edition || formatDate(date))}</span>
          <span class="changelog-kind changelog-kind--${escapeHtml(kind)}">${escapeHtml(t(kindLabels[kind]))}</span>
        </div>
        <h3>${escapeHtml(pickLang(entry?.title, entry?.title_en) || t('changelog.entry.default'))}</h3>
        ${(() => { const summary = pickLang(entry?.summary, entry?.summary_en); return summary ? `<p class="changelog-release-summary">${escapeHtml(summary)}</p>` : ''; })()}
        <ul>
          ${items.map(item => `
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${escapeHtml(item)}</span></li>`).join('')}
        </ul>
        ${changeItems.length ? `
        <ul class="changelog-diff-list" aria-label="${escapeHtml(getLang() === 'en' ? 'Change details' : '变更明细')}">
          ${changeItems.map(renderChangeItem).join('')}
        </ul>` : ''}
      </div>
    </article>`;
}

function setVisible(element, visible) {
  if (element) element.hidden = !visible;
}

function renderRoadmapItem(item) {
  const st = roadmapStatus[item?.status] || roadmapStatus.planned;
  const votes = Number(item?.votes) > 0 ? Number(item.votes) : 0;
  const rawUsers = Array.isArray(item?.users) ? item.users.filter(Boolean) : [];
  // 英文界面不展示中文用户名（来自小红书等国内渠道的反馈者昵称）
  const users = getLang() === 'en' ? rawUsers.filter(user => !hasCjk(user)) : rawUsers;
  const userLabel = users.length
    ? (users.length > 2
        ? t('changelog.roadmap.usersMany', { a: users[0], b: users[1], n: users.length })
        : users.join(getLang() === 'en' ? ', ' : '、'))
    : '';
  const platform = pickLang(item?.platform, item?.platform_en);
  const metaParts = [
    platform ? escapeHtml(platform) : '',
    userLabel ? escapeHtml(userLabel) : '',
    item?.date ? escapeHtml(t('changelog.roadmap.raised', { date: formatDate(item.date) })) : '',
  ].filter(Boolean).join(' · ');
  return `
    <li class="roadmap-item roadmap-item--${st.cls}">
      <span class="roadmap-status">${escapeHtml(t(st.key))}</span>
      <div class="roadmap-body">
        <h3>${escapeHtml(pickLang(item?.title, item?.title_en) || '')}</h3>
        ${(() => { const note = pickLang(item?.note, item?.note_en); return note ? `<p>${escapeHtml(note)}</p>` : ''; })()}
        ${metaParts ? `<p class="roadmap-meta">${metaParts}</p>` : ''}
      </div>
      ${votes ? `<span class="roadmap-votes" title="${escapeHtml(t('changelog.roadmap.votesTitle'))}">${escapeHtml(t('changelog.roadmap.votes', { n: votes }))}</span>` : ''}
    </li>`;
}

function renderRoadmap(roadmap) {
  roadmapItems = Array.isArray(roadmap) ? roadmap.filter(item => item && (item.title || item.title_en)) : [];
  if (!els.roadmapList || !els.roadmapView) return;
  if (!roadmapItems.length) {
    els.roadmapList.innerHTML = '';
    setVisible(els.roadmapList, false);
    setVisible(els.roadmapEmpty, true);
  } else {
    const sorted = [...roadmapItems].sort((a, b) => {
      const rank = item => {
        const idx = roadmapOrder.indexOf(item.status);
        return idx === -1 ? roadmapOrder.length : idx;
      };
      return rank(a) - rank(b) || (Number(b.votes) || 0) - (Number(a.votes) || 0);
    });
    els.roadmapList.innerHTML = sorted.map(renderRoadmapItem).join('');
    setVisible(els.roadmapList, true);
    setVisible(els.roadmapEmpty, false);
  }
  const countEl = document.getElementById('countRoadmap');
  if (countEl) countEl.textContent = roadmapItems.length.toLocaleString(numberLocale());
}

function renderChangelog(data) {
  entries = Array.isArray(data?.entries)
    ? [...data.entries].sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))
    : [];
  const updatedAt = data?.last_updated || entries[0]?.date || '';

  els.updatedAt.textContent = formatDate(updatedAt);
  els.updatedAt.dateTime = updatedAt;
  els.count.textContent = entries.length.toLocaleString(numberLocale());
  const countAllEl = document.getElementById('countAll');
  if (countAllEl) countAllEl.textContent = entries.length.toLocaleString(numberLocale());
  updateCategoryCounts();
  renderDateFilter();
  applyFilters();
  // 摘要能容纳就单行：列表已渲染且可见，测量容器宽度
  initFitDescription();

  setVisible(els.loading, false);
  setVisible(els.error, false);
}

// —— 侧边栏筛选：分类计数、日期分组、过滤与视图切换 ——

function updateCategoryCounts() {
  const counts = { catalog: 0, data: 0, feature: 0 };
  for (const entry of entries) {
    const kind = Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data';
    counts[kind] = (counts[kind] || 0) + 1;
  }
  const setCount = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value.toLocaleString(numberLocale());
  };
  setCount('catAll', entries.length);
  setCount('catCatalog', counts.catalog);
  setCount('catData', counts.data);
  setCount('catFeature', counts.feature);
}

function renderDateFilter() {
  if (!els.dateFilterList) return;
  const monthCounts = new Map();
  for (const entry of entries) {
    const match = /^(\d{4})-(\d{2})/.exec(entry.date || '');
    if (match) {
      const key = `${match[1]}.${match[2]}`;
      monthCounts.set(key, (monthCounts.get(key) || 0) + 1);
    }
  }
  const months = [...monthCounts.keys()].sort((a, b) => b.localeCompare(a));
  const calendarIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
  els.dateFilterList.innerHTML = `
    <button type="button" class="aihot-nav-item aihot-cat-item is-active" data-month="">
      ${calendarIcon}
      <span>${escapeHtml(t('changelog.date.all'))}</span>
      <span class="aihot-cat-count">${entries.length.toLocaleString(numberLocale())}</span>
    </button>
    ${months.map(month => `
    <button type="button" class="aihot-nav-item aihot-cat-item" data-month="${escapeHtml(month)}">
      ${calendarIcon}
      <span>${escapeHtml(month)}</span>
      <span class="aihot-cat-count">${(monthCounts.get(month) || 0).toLocaleString(numberLocale())}</span>
    </button>`).join('')}`;
}

function applyFilters() {
  const q = state.query.trim().toLowerCase();
  const normalizedKind = entry => (Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data');
  const filtered = entries.filter(entry => {
    if (state.category && normalizedKind(entry) !== state.category) return false;
    if (state.month) {
      const month = (entry.date || '').slice(0, 7).replace('-', '.');
      if (month !== state.month) return false;
    }
    if (q) {
      const haystack = [entry.title, entry.title_en, entry.summary, entry.summary_en,
        ...(Array.isArray(entry.items) ? entry.items : []),
        ...(Array.isArray(entry.items_en) ? entry.items_en : [])]
        .filter(Boolean).join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
  els.list.innerHTML = filtered.length ? filtered.map(renderEntry).join('') : '';
  setVisible(els.list, filtered.length > 0);
  setVisible(els.empty, filtered.length === 0);
  els.filterResult.textContent = filtered.length === entries.length
    ? ''
    : t('changelog.filter.result', { shown: filtered.length.toLocaleString(numberLocale()), total: entries.length.toLocaleString(numberLocale()) });
}

function syncFilterHighlights() {
  document.querySelectorAll('#changelogSidebarNav [data-category]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.category === state.category);
  });
  document.querySelectorAll('#changelogSidebarNav [data-month]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.month === state.month);
  });
}

function switchView(view) {
  state.view = view === 'roadmap' ? 'roadmap' : 'all';
  document.querySelectorAll('#changelogSidebarNav [data-view], #changelogTabbar [data-view]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.view === state.view);
  });
  document.querySelectorAll('#changelogChips [data-filter]').forEach(btn => {
    const active = btn.dataset.filter === state.view;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  const isRoadmap = state.view === 'roadmap';
  setVisible(els.roadmapView, isRoadmap);
  setVisible(els.changelogView, !isRoadmap);
  setVisible(els.roadmapList, isRoadmap && roadmapItems.length > 0);
  setVisible(els.roadmapEmpty, isRoadmap && roadmapItems.length === 0);
  // 分类/日期筛选仅作用于 all 视图：切到 roadmap 时取消侧边栏高亮（保留选中值，切回时恢复）
  if (isRoadmap) {
    document.querySelectorAll('#changelogSidebarNav [data-category], #changelogSidebarNav [data-month]').forEach(btn => btn.classList.remove('is-active'));
    if (els.filterResult) els.filterResult.textContent = '';
  } else {
    syncFilterHighlights();
    setVisible(els.loading, false);
    setVisible(els.error, entries.length === 0);
    applyFilters();
  }
}

function switchCategory(category) {
  state.category = category;
  if (state.view !== 'all') switchView('all');
  syncFilterHighlights();
  applyFilters();
}

function switchMonth(month) {
  state.month = month;
  if (state.view !== 'all') switchView('all');
  syncFilterHighlights();
  applyFilters();
}

function bindEvents() {
  if (els.sidebarNav) {
    els.sidebarNav.addEventListener('click', e => {
      const viewBtn = e.target.closest('[data-view]');
      if (viewBtn) return switchView(viewBtn.dataset.view);
      const catBtn = e.target.closest('[data-category]');
      if (catBtn) return switchCategory(catBtn.dataset.category);
      const monthBtn = e.target.closest('[data-month]');
      if (monthBtn) return switchMonth(monthBtn.dataset.month);
    });
  }
  if (els.chips) {
    els.chips.addEventListener('click', e => {
      const chip = e.target.closest('[data-filter]');
      if (chip) switchView(chip.dataset.filter);
    });
  }
  if (els.tabbar) {
    els.tabbar.addEventListener('click', e => {
      const tab = e.target.closest('[data-view]');
      if (tab) switchView(tab.dataset.view);
    });
  }
  if (els.searchInput) {
    els.searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.query = els.searchInput.value;
        if (state.view !== 'all') switchView('all');
        applyFilters();
      }, 200);
    });
  }
}

function parseDetailsToItems(details) {
  if (Array.isArray(details)) return details.filter(Boolean);
  if (typeof details !== 'string' || !details.trim()) return [];
  return details.split('\n').map(line => line.trim()).filter(Boolean);
}

// 把 /api/changelog 的返回（items / category / publishedAt / details 字符串）
// 转换成公开页面 renderChangelog 期望的（entries / kind / date / items 数组）格式，
// 并仅保留国际站条目，与导出脚本 export-public-data.mjs 的过滤逻辑保持一致。
function normalizeChangelogApi(payload) {
  const rawItems = Array.isArray(payload?.items) ? payload.items : [];
  const entries = rawItems
    .filter(item => item?.region === 'international')
    .map(item => ({
      id: item.id,
      date: item.publishedAt,
      edition: item.edition,
      kind: item.category,
      title: item.title,
      title_en: item.title_en,
      summary: item.summary,
      summary_en: item.summary_en,
      items: parseDetailsToItems(item.details),
      items_en: parseDetailsToItems(item.details_en),
      // 结构化变更明细：与 export-public-data.mjs 保持一致，无则省略
      ...(Array.isArray(item.change_items) && item.change_items.length ? { change_items: item.change_items } : {}),
    }));
  const last_updated = entries[0]?.date || '';
  return { entries, last_updated };
}

async function loadChangelog() {
  try {
    let data;
    if (isLocalHostname()) {
      // 本地环境：直接读取 Public API，实时反映数据库变更（无需重新导出静态文件）
      const response = await fetch('/api/changelog?take=100', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Changelog API unavailable');
      data = normalizeChangelogApi(await response.json());
    } else {
      // 生产环境：读取静态文件（Nginx 托管，随导出脚本更新）
      const response = await fetch('./changelog.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Changelog unavailable');
      data = await response.json();
    }
    renderChangelog(data);
  } catch {
    setVisible(els.loading, false);
    setVisible(els.list, false);
    setVisible(els.empty, false);
    setVisible(els.error, true);
  }
}

// 路线图为独立静态文件（不经 export-public-data 重生，不会被覆盖）
async function loadRoadmap() {
  try {
    const response = await fetch('./roadmap.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const data = await response.json();
    renderRoadmap(data?.items);
  } catch { /* 路线图为可选内容，加载失败时忽略 */ }
}

initAppShell();
bindEvents();
loadChangelog();
loadRoadmap();
