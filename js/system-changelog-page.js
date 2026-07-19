import { initAppShell } from './app.js';
import { escapeHtml } from './render.js';
import { t, numberLocale, getLang } from './i18n.js';
import { isLocalHostname } from './data-source.js';

function pickLang(base, en) {
  return (getLang() === 'en' && en != null && String(en).trim()) ? en : base;
}

const kindLabels = {
  catalog: 'changelog.kind.catalog',
  data: 'changelog.kind.data',
  feature: 'changelog.kind.feature',
};

const els = {
  count: document.getElementById('changelogEntryCount'),
  error: document.getElementById('changelogError'),
  list: document.getElementById('changelogList'),
  loading: document.getElementById('changelogLoading'),
  updatedAt: document.getElementById('changelogUpdatedAt'),
};

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  return match ? `${match[1]}.${match[2]}.${match[3]}` : '—';
}

function renderEntry(entry) {
  const kind = Object.hasOwn(kindLabels, entry?.kind) ? entry.kind : 'data';
  const date = String(entry?.date || '');
  const items = Array.isArray(entry?.items) ? entry.items : [];

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
        ${entry?.summary || entry?.summary_en ? `<p class="changelog-release-summary">${escapeHtml(pickLang(entry.summary, entry.summary_en))}</p>` : ''}
        <ul>
          ${items.map(item => `
            <li><span class="changelog-item-mark" aria-hidden="true"></span><span>${escapeHtml(item)}</span></li>`).join('')}
        </ul>
      </div>
    </article>`;
}

function setVisible(element, visible) {
  if (element) element.hidden = !visible;
}

function renderChangelog(data) {
  const entries = Array.isArray(data?.entries)
    ? [...data.entries].sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))
    : [];
  const updatedAt = data?.last_updated || entries[0]?.date || '';

  els.updatedAt.textContent = formatDate(updatedAt);
  els.updatedAt.dateTime = updatedAt;
  els.count.textContent = entries.length.toLocaleString(numberLocale());
  els.list.innerHTML = entries.length
    ? entries.map(renderEntry).join('')
    : `<div class="changelog-empty"><h3>${escapeHtml(t('changelog.empty.title'))}</h3><p>${escapeHtml(t('changelog.empty.body'))}</p></div>`;

  setVisible(els.loading, false);
  setVisible(els.error, false);
  setVisible(els.list, true);
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
    }));
  const last_updated = entries[0]?.date || '';
  return { entries, last_updated };
}

async function loadChangelog() {
  try {
    if (isLocalHostname()) {
      // 本地环境：直接读取 Public API，实时反映数据库变更（无需重新导出静态文件）
      const response = await fetch('/api/changelog?take=100', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Changelog API unavailable');
      renderChangelog(normalizeChangelogApi(await response.json()));
    } else {
      // 生产环境：读取静态文件（Nginx 托管，随导出脚本更新）
      const response = await fetch('./changelog.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Changelog unavailable');
      renderChangelog(await response.json());
    }
  } catch {
    setVisible(els.loading, false);
    setVisible(els.list, false);
    setVisible(els.error, true);
  }
}

initAppShell();
loadChangelog();
