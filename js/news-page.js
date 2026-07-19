import { initAppShell } from './app.js';
import { escapeHtml, safeExternalUrl } from './render.js';
import { t, numberLocale } from './i18n.js';
import {
  fetchAiHotItems,
  fetchAiHotDaily,
  fetchAiHotDailyByDate,
  fetchAiHotDailies,
  formatTimeOnly,
  getCategoryLabel,
  groupByDate
} from './aihot-service.js';

const BLOCKED_HOSTS = new Set(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com']);
function isBlockedUrl(url) {
  if (!url) return false;
  try { return BLOCKED_HOSTS.has(new URL(url).hostname.toLowerCase()); }
  catch { return false; }
}

const state = {
  view: 'selected',
  category: '',
  query: '',
  items: [],
  nextCursor: null,
  loading: false,
  dailyDates: [],
  dailyReport: null
};

const els = {};
let searchTimer = null;

function initEls() {
  const ids = [
    'sidebarNav', 'searchInput', 'filterChips',
    'feedView', 'feedContent', 'skeletonLoading', 'errorState', 'errorMessage',
    'emptyState', 'loadMoreWrap', 'loadMoreBtn', 'retryBtn',
    'dailyView', 'dailyDateSelect', 'dailySkeleton', 'dailyContent',
    'dailyErrorState', 'dailyErrorMessage', 'dailyRetryBtn', 'dailyEmptyState',
    'reportDate', 'leadSection', 'dailySections', 'flashesSection', 'flashesList',
    'catAll', 'catModels', 'catProducts', 'catIndustry', 'catPaper', 'catTip',
    'tabbar', 'mainContent'
  ];
  for (const id of ids) els[id] = document.getElementById(id);
}

function showState(which) {
  els.skeletonLoading?.classList.toggle('hidden', which !== 'loading');
  els.errorState?.classList.toggle('hidden', which !== 'error');
  els.emptyState?.classList.toggle('hidden', which !== 'empty');
  els.feedContent?.classList.toggle('hidden', which !== 'content');
  els.loadMoreWrap?.classList.toggle('hidden', which !== 'content' || !state.nextCursor);
}

function showDailyState(which) {
  els.dailySkeleton?.classList.toggle('hidden', which !== 'loading');
  els.dailyErrorState?.classList.toggle('hidden', which !== 'error');
  els.dailyEmptyState?.classList.toggle('hidden', which !== 'empty');
  els.dailyContent?.classList.toggle('hidden', which !== 'content');
}

async function loadItems(append = false) {
  if (state.loading) return;
  state.loading = true;

  if (!append) {
    state.items = [];
    state.nextCursor = null;
    showState('loading');
  } else {
    if (els.loadMoreBtn) els.loadMoreBtn.textContent = t('news.loading');
  }

  try {
    const mode = state.view === 'all' ? 'all' : 'selected';
    const take = mode === 'all' ? 100 : 50;
    const result = await fetchAiHotItems({
      mode,
      take,
      category: state.category || undefined,
      q: state.query || undefined,
      cursor: append ? state.nextCursor : undefined
    });

    const filtered = (result.items || []).filter(item => !isBlockedUrl(item.url));
    if (append) {
      state.items = [...state.items, ...filtered];
    } else {
      state.items = filtered;
    }
    state.nextCursor = result.nextCursor;

    updateCategoryCounts(state.items);

    if (!state.items.length) {
      showState('empty');
    } else {
      renderFeed();
      showState('content');
    }
  } catch (_err) {
    if (els.errorMessage) els.errorMessage.textContent = t('news.error');
    showState('error');
  } finally {
    state.loading = false;
    if (els.loadMoreBtn) els.loadMoreBtn.textContent = t('news.loadMore');
  }
}

function updateCategoryCounts(items) {
  const counts = { '': items.length };
  for (const item of items) {
    const cat = item.category || '';
    counts[cat] = (counts[cat] || 0) + 1;
  }
  if (els.catAll) els.catAll.textContent = counts[''] || 0;
  if (els.catModels) els.catModels.textContent = counts['ai-models'] || 0;
  if (els.catProducts) els.catProducts.textContent = counts['ai-products'] || 0;
  if (els.catIndustry) els.catIndustry.textContent = counts['industry'] || 0;
  if (els.catPaper) els.catPaper.textContent = counts['paper'] || 0;
  if (els.catTip) els.catTip.textContent = counts['tip'] || 0;
}

function renderFeed() {
  if (!els.feedContent) return;
  const groups = groupByDate(state.items);
  els.feedContent.innerHTML = groups.map(renderDateGroup).join('');
}

function renderDateGroup(group) {
  const items = group.items.map(renderTimelineItem).join('');
  return `<div class="aihot-date-group">
    <div class="aihot-date-marker">${escapeHtml(group.date)}</div>
    <div class="aihot-timeline-track">
      ${items}
    </div>
  </div>`;
}

function renderTimelineItem(item) {
  const timeShort = formatTimeOnly(item.publishedAt);
  const source = item.source || '';
  const title = item.title || '';
  const summary = item.summary || '';
  const url = safeExternalUrl(item.url);
  const category = item.category || '';
  const score = item.score;
  const selected = item.selected;
  const reason = item.recommendReason || '';

  const catLabel = getCategoryLabel(category);

  const scoreBadge = (score != null && score > 0)
    ? `<span class="aihot-score">${score}</span>`
    : '';

  const selectedBadge = selected
    ? `<span class="aihot-selected-badge">${escapeHtml(t('news.selectedBadge'))}</span>`
    : '';

  const catBadge = catLabel
    ? `<span class="aihot-cat-badge">${escapeHtml(catLabel)}</span>`
    : '';

  const summaryHtml = summary
    ? `<p class="aihot-card-summary">${escapeHtml(summary)}</p>`
    : '';

  const reasonHtml = reason
    ? `<div class="aihot-card-reason"><span class="aihot-reason-label">${escapeHtml(t('news.reason'))}</span>${escapeHtml(reason)}</div>`
    : '';

  const tagsHtml = [catBadge, scoreBadge, selectedBadge].filter(Boolean).join('');

  const cardInner = `
    <div class="aihot-card-meta">
      ${source ? `<span class="aihot-card-source">${escapeHtml(source)}</span>` : ''}
    </div>
    <h3 class="aihot-card-title">${escapeHtml(title)}</h3>
    ${summaryHtml}
    <div class="aihot-card-footer">
      <div class="aihot-card-tags">${tagsHtml}</div>
    </div>
    ${reasonHtml}
  `;

  const cardEl = url
    ? `<a class="aihot-card" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${cardInner}</a>`
    : `<div class="aihot-card">${cardInner}</div>`;

  return `<div class="aihot-timeline-item">
    <div class="aihot-timeline-gutter">
      <span class="aihot-timeline-time">${escapeHtml(timeShort)}</span>
    </div>
    <div class="aihot-timeline-rail">
      <span class="aihot-timeline-dot"></span>
    </div>
    <div class="aihot-timeline-content">
      ${cardEl}
    </div>
  </div>`;
}

function switchView(view) {
  if (state.view === view && view !== 'daily') return;
  state.view = view;
  state.category = '';

  document.querySelectorAll('.aihot-nav-item[data-view]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.view === view);
  });
  document.querySelectorAll('.aihot-tab[data-view]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.view === view);
  });
  document.querySelectorAll('.aihot-cat-item').forEach(btn => {
    btn.classList.toggle('is-active', !state.category && btn.dataset.category === '');
  });

  document.querySelectorAll('.aihot-chip[data-filter]').forEach(btn => {
    const isActive = btn.dataset.filter === view;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  if (view === 'daily') {
    els.feedView?.classList.add('hidden');
    els.dailyView?.classList.remove('hidden');
    els.filterChips?.classList.add('hidden');
    loadDailyView();
  } else {
    els.feedView?.classList.remove('hidden');
    els.dailyView?.classList.add('hidden');
    els.filterChips?.classList.remove('hidden');
    loadItems();
  }
}

function switchCategory(category) {
  state.category = category;
  document.querySelectorAll('.aihot-cat-item').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.category === category);
  });
  if (state.view === 'daily') {
    switchView('selected');
  } else {
    loadItems();
  }
}

async function loadDailyView() {
  showDailyState('loading');
  try {
    const dailies = await fetchAiHotDailies(30);
    state.dailyDates = dailies;
    populateDailySelect();
    if (dailies.length > 0) {
      const latestDate = dailies[0].date || dailies[0];
      await loadDailyReport(latestDate);
    } else {
      showDailyState('empty');
    }
  } catch {
    if (els.dailyErrorMessage) els.dailyErrorMessage.textContent = t('news.daily.error');
    showDailyState('error');
  }
}

function populateDailySelect() {
  if (!els.dailyDateSelect) return;
  if (!state.dailyDates.length) {
    els.dailyDateSelect.innerHTML = `<option value="">${escapeHtml(t('news.daily.empty'))}</option>`;
    return;
  }
  els.dailyDateSelect.innerHTML = state.dailyDates.map(d => {
    const date = typeof d === 'string' ? d : (d.date || '');
    const label = typeof d === 'string' ? d : (d.leadTitle ? `${date} - ${d.leadTitle}` : date);
    return `<option value="${escapeHtml(date)}">${escapeHtml(label)}</option>`;
  }).join('');
}

async function loadDailyReport(date) {
  showDailyState('loading');
  try {
    const data = date
      ? await fetchAiHotDailyByDate(date)
      : await fetchAiHotDaily();
    if (!data || data.error) {
      showDailyState('empty');
      return;
    }
    state.dailyReport = data;
    renderDailyReport(data);
    showDailyState('content');
  } catch {
    if (els.dailyErrorMessage) els.dailyErrorMessage.textContent = t('news.daily.error');
    showDailyState('error');
  }
}

function renderDailyReport(data) {
  if (els.reportDate) els.reportDate.textContent = data.date || '';
  renderLead(data.lead);
  renderDailySections(data.sections || []);
  renderFlashes(data.flashes || []);
}

function renderLead(lead) {
  if (!els.leadSection || !lead) { if (els.leadSection) els.leadSection.innerHTML = ''; return; }
  const title = lead.title ? `<p class="daily-lead-title">${escapeHtml(lead.title)}</p>` : '';
  const paragraph = lead.leadParagraph ? `<p class="mt-1">${escapeHtml(lead.leadParagraph)}</p>` : '';
  els.leadSection.innerHTML = title + paragraph;
}

function renderDailySections(sections) {
  if (!els.dailySections) return;
  const filtered = sections.filter(s => {
    const text = `${s.key || ''} ${s.label || ''}`;
    // 国际站：只保留国际相关栏目，过滤掉纯国内栏目。
    return !text.includes('domestic') && !text.includes('国内');
  });
  els.dailySections.innerHTML = filtered.map(renderDailySection).join('');
}

function renderDailySection(section) {
  const items = (Array.isArray(section.items) ? section.items : [])
    .filter(item => !isBlockedUrl(item.sourceUrl || item.url || ''));
  const itemsHtml = items.length
    ? items.map(renderDailyItem).join('')
    : `<p class="aihot-daily-empty">${escapeHtml(t('news.daily.sectionEmpty'))}</p>`;
  return `<div class="daily-section">
    <h3 class="daily-section-title">${escapeHtml(section.label || section.key)} (${items.length})</h3>
    ${itemsHtml}
  </div>`;
}

function renderDailyItem(item) {
  const title = item.title || '';
  const summary = item.summary || '';
  const sourceUrl = safeExternalUrl(item.sourceUrl || item.url);
  const sourceName = item.sourceName || item.source || '';
  const category = item.category || '';
  const score = item.score || 0;
  const catLabel = getCategoryLabel(category);

  const categoryBadge = catLabel
    ? `<span class="daily-badge" style="font-size:10px;padding:1px 6px">${escapeHtml(catLabel)}</span>`
    : '';
  const scoreBadge = score > 0
    ? `<span class="news-score">${score}</span>`
    : '';

  const inner = `
    <span class="daily-item-title">${escapeHtml(title)} ${categoryBadge} ${scoreBadge}</span>
    ${summary ? `<span class="daily-item-summary">${escapeHtml(summary)}</span>` : ''}
    ${sourceName ? `<span class="daily-flash-source">${escapeHtml(sourceName)}</span>` : ''}
  `;

  if (sourceUrl) {
    return `<a class="daily-item" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }
  return `<div class="daily-item">${inner}</div>`;
}

function renderFlashes(flashes) {
  const safe = flashes.filter(f => !isBlockedUrl(f.sourceUrl || f.url || ''));
  if (!els.flashesSection || !els.flashesList || !safe.length) {
    if (els.flashesSection) els.flashesSection.classList.add('hidden');
    return;
  }
  els.flashesSection.classList.remove('hidden');
  els.flashesList.innerHTML = safe.map(flash => {
    const title = flash.title || '';
    const sourceUrl = safeExternalUrl(flash.sourceUrl || flash.url);
    const sourceName = flash.sourceName || flash.source || '';
    const publishedAt = flash.publishedAt || '';
    const timeStr = publishedAt ? new Date(publishedAt).toLocaleTimeString(numberLocale(), { hour: '2-digit', minute: '2-digit' }) : '';
    const inner = `${escapeHtml(title)}
      ${sourceName ? `<span class="daily-flash-source">${escapeHtml(sourceName)}</span>` : ''}
      ${timeStr ? `<span class="daily-flash-time">${escapeHtml(timeStr)}</span>` : ''}`;
    if (sourceUrl) {
      return `<a class="daily-flash" href="${escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
    }
    return `<div class="daily-flash">${inner}</div>`;
  }).join('');
}

function bindEvents() {
  els.sidebarNav?.addEventListener('click', e => {
    const viewBtn = e.target.closest('[data-view]');
    if (viewBtn) { switchView(viewBtn.dataset.view); return; }
    const catBtn = e.target.closest('[data-category]');
    if (catBtn) { switchCategory(catBtn.dataset.category); }
  });

  els.tabbar?.addEventListener('click', e => {
    const tab = e.target.closest('[data-view]');
    if (tab) switchView(tab.dataset.view);
  });

  els.filterChips?.addEventListener('click', e => {
    const chip = e.target.closest('[data-filter]');
    if (chip) switchView(chip.dataset.filter);
  });

  els.searchInput?.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = e.target.value.trim();
      if (state.view === 'daily') switchView('selected');
      else loadItems();
    }, 400);
  });

  els.retryBtn?.addEventListener('click', () => loadItems());
  els.dailyRetryBtn?.addEventListener('click', () => loadDailyView());
  els.loadMoreBtn?.addEventListener('click', () => { if (state.nextCursor) loadItems(true); });

  els.dailyDateSelect?.addEventListener('change', e => {
    const date = e.target.value;
    if (date) loadDailyReport(date);
  });
}

async function initNewsPage() {
  initAppShell();
  initEls();
  bindEvents();
  await loadItems();
}

initNewsPage();
