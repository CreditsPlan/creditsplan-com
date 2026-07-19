const BASE_URL = '/aihot-api';
const REQUEST_TIMEOUT_MS = 10000;
const _UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36 aihot-skill/0.2.0';

import { t, numberLocale } from './i18n.js';

const CATEGORY_LABEL_KEYS = {
  'ai-models': 'aihot.cat.models',
  'ai-products': 'aihot.cat.products',
  'industry': 'aihot.cat.industry',
  'paper': 'aihot.cat.paper',
  'tip': 'aihot.cat.tip'
};

export { CATEGORY_LABEL_KEYS };

async function apiFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`, location.origin);
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') url.searchParams.set(key, String(value));
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchAiHotItems({ mode = 'selected', take = 50, category, q, since, cursor } = {}) {
  const params = { mode, take };
  if (category) params.category = category;
  if (q) params.q = q;
  if (since) params.since = since;
  if (cursor) params.cursor = cursor;
  const data = await apiFetch('/items', params);
  return {
    items: Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []),
    nextCursor: data?.nextCursor || null,
    total: data?.total ?? null
  };
}

export async function fetchAiHotDaily() {
  return apiFetch('/daily');
}

export async function fetchAiHotDailyByDate(date) {
  if (!date) return fetchAiHotDaily();
  return apiFetch(`/daily/${date}`);
}

export async function fetchAiHotDailies(take = 30) {
  const data = await apiFetch('/dailies', { take });
  return Array.isArray(data?.items) ? data.items : (Array.isArray(data?.dailies) ? data.dailies : (Array.isArray(data) ? data : []));
}

export function formatPublishedTime(isoStr) {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return '';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.floor((today - target) / 86400000);
  const hhmm = date.toLocaleTimeString(numberLocale(), { hour: '2-digit', minute: '2-digit', hour12: false });
  if (dayDiff === 0) return `${t('aihot.date.today')} ${hhmm}`;
  if (dayDiff === 1) return `${t('aihot.date.yesterday')} ${hhmm}`;
  if (dayDiff < 7) return `${t('aihot.date.daysAgo', { n: dayDiff })} ${hhmm}`;
  const md = date.toLocaleDateString(numberLocale(), { month: 'short', day: 'numeric' });
  return `${md} ${hhmm}`;
}

export function formatTimeOnly(isoStr) {
  if (!isoStr) return '';
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString(numberLocale(), { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function getDateKey(isoStr) {
  if (!isoStr) return t('aihot.date.unknown');
  const date = new Date(isoStr);
  if (isNaN(date.getTime())) return t('aihot.date.unknown');
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.floor((today - target) / 86400000);
  const full = date.toLocaleDateString(numberLocale(), { month: 'short', day: 'numeric', weekday: 'short' });
  if (dayDiff === 0) return `${t('aihot.date.today')} ${full}`;
  if (dayDiff === 1) return `${t('aihot.date.yesterday')} ${full}`;
  return full;
}

export function getCategoryLabel(key) {
  const labelKey = CATEGORY_LABEL_KEYS[key];
  return labelKey ? t(labelKey) : (key || '');
}

export function groupByDate(items) {
  const groups = new Map();
  for (const item of items) {
    const key = getDateKey(item.publishedAt);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return Array.from(groups, ([date, dateItems]) => ({ date, items: dateItems }));
}
