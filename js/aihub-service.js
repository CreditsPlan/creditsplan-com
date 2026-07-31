// aihub.com 公开 RSS：com 站英文界面的 AI 动态数据源。
// 条目 link 直接指向一手源（实验室官网或老牌媒体），本站只把 aihub 当发现渠道，不转载其自身内容。
// 输出结构与 AI HOT items 保持一致，便于 news 页复用同一套渲染逻辑。
const FEED_URL = '/aihub-api/rss.xml';
const REQUEST_TIMEOUT_MS = 10000;

// 可信来源白名单：注册域 -> 展示名。白名单之外的条目一律丢弃，作为无人工审核下的质量闸门。
const TRUSTED_SOURCES = new Map([
  ['openai.com', 'OpenAI'],
  ['anthropic.com', 'Anthropic'],
  ['x.ai', 'xAI'],
  ['blog.google', 'Google'],
  ['deepmind.google', 'Google DeepMind'],
  ['googleblog.com', 'Google'],
  ['ai.meta.com', 'Meta AI'],
  ['microsoft.com', 'Microsoft'],
  ['mistral.ai', 'Mistral AI'],
  ['deepseek.com', 'DeepSeek'],
  ['huggingface.co', 'Hugging Face'],
  ['nvidia.com', 'NVIDIA'],
  ['techcrunch.com', 'TechCrunch'],
  ['theverge.com', 'The Verge'],
  ['arstechnica.com', 'Ars Technica'],
  ['cnbc.com', 'CNBC']
]);

// aihub 的 RSS 分类映射到站内分类；未知分类归入 industry。
const CATEGORY_MAP = new Map([
  ['models', 'ai-models'],
  ['products', 'ai-products'],
  ['chips', 'industry'],
  ['startups', 'industry'],
  ['policy', 'industry'],
  ['ai', 'industry'],
  ['research', 'paper'],
  ['papers', 'paper']
]);

function trustedSourceName(url) {
  let host;
  try {
    host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
  for (const [domain, label] of TRUSTED_SOURCES) {
    if (host === domain || host.endsWith(`.${domain}`)) return label;
  }
  return '';
}

function textOf(node, tagName) {
  const el = node.querySelector(tagName);
  return el ? String(el.textContent || '').trim() : '';
}

function toIsoDate(pubDate) {
  const date = new Date(pubDate);
  return isNaN(date.getTime()) ? '' : date.toISOString();
}

// 去重键：忽略协议、www 与末尾斜杠，防御 feed 自身出现同一篇文章的多个变体链接。
function dedupeKey(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    const path = parsed.pathname.replace(/\/+$/, '').toLowerCase();
    return `${host}${path}`;
  } catch {
    return String(url || '').trim().toLowerCase();
  }
}

function normalizeItem(node) {
  const url = textOf(node, 'link');
  const source = trustedSourceName(url);
  if (!source) return null;

  const title = textOf(node, 'title');
  const publishedAt = toIsoDate(textOf(node, 'pubDate'));
  // 标题、链接、时间缺任何一项即丢弃：无人工审核，字段不全的条目不进页面。
  if (!title || !publishedAt) return null;

  const rawCategory = textOf(node, 'category').toLowerCase();
  return {
    id: textOf(node, 'guid') || url,
    title,
    url,
    source,
    publishedAt,
    summary: textOf(node, 'description'),
    category: CATEGORY_MAP.get(rawCategory) || 'industry',
    selected: false,
    origin: 'aihub'
  };
}

export async function fetchAihubItems() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(FEED_URL, {
      cache: 'no-store',
      headers: { 'Accept': 'application/rss+xml, application/xml' },
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`Feed ${res.status}: ${res.statusText}`);
    const doc = new DOMParser().parseFromString(await res.text(), 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('Feed is not valid XML');
    const seen = new Set();
    return Array.from(doc.querySelectorAll('item'))
      .map(normalizeItem)
      .filter(item => {
        if (!item) return false;
        const key = dedupeKey(item.url);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  } finally {
    clearTimeout(timeoutId);
  }
}

// 与 AI HOT 侧的服务端筛选对齐：分类精确匹配，关键词在标题与摘要内不区分大小写匹配。
export function filterAihubItems(items, { category = '', query = '' } = {}) {
  const keyword = query.trim().toLowerCase();
  return items.filter(item => {
    if (category && item.category !== category) return false;
    if (!keyword) return true;
    return `${item.title} ${item.summary}`.toLowerCase().includes(keyword);
  });
}
