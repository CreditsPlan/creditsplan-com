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
  roadmapList: document.getElementById('roadmapList'),
  roadmapSection: document.getElementById('roadmapSection'),
  updatedAt: document.getElementById('changelogUpdatedAt'),
};

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
        ${entry?.summary || entry?.summary_en ? `<p class="changelog-release-summary">${escapeHtml(pickLang(entry.summary, entry.summary_en))}</p>` : ''}
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
  const users = Array.isArray(item?.users) ? item.users.filter(Boolean) : [];
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
        ${item?.note || item?.note_en ? `<p>${escapeHtml(pickLang(item.note, item.note_en))}</p>` : ''}
        ${metaParts ? `<p class="roadmap-meta">${metaParts}</p>` : ''}
      </div>
      ${votes ? `<span class="roadmap-votes" title="${escapeHtml(t('changelog.roadmap.votesTitle'))}">${escapeHtml(t('changelog.roadmap.votes', { n: votes }))}</span>` : ''}
    </li>`;
}

function renderRoadmap(roadmap) {
  const items = Array.isArray(roadmap) ? roadmap.filter(item => item && (item.title || item.title_en)) : [];
  if (!items.length || !els.roadmapList || !els.roadmapSection) return;
  const sorted = [...items].sort((a, b) => {
    const rank = item => {
      const idx = roadmapOrder.indexOf(item.status);
      return idx === -1 ? roadmapOrder.length : idx;
    };
    return rank(a) - rank(b) || (Number(b.votes) || 0) - (Number(a.votes) || 0);
  });
  els.roadmapList.innerHTML = sorted.map(renderRoadmapItem).join('');
  setVisible(els.roadmapSection, true);
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
loadChangelog();
loadRoadmap();
