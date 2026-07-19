import { numberLocale } from './i18n.js';

export function escapeHtml(value) {
  if (value == null) return '';
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

export function safeExternalUrl(value) {
  if (value == null || !String(value).trim()) return '';
  try {
    const url = new URL(String(value).trim());
    if (url.username || url.password) return '';
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

export function formatPrice(value) {
  // 使用 ￥（全角￥）的 Unicode 转义，源码保持纯 ASCII，避免符号被编码转换损坏
  return `￥${Number(value).toLocaleString(numberLocale(), { maximumFractionDigits: 2 })}`;
}

export function formatTokens(value) {
  if (value >= 1000000) return `${(value / 1000000).toLocaleString(numberLocale(), { maximumFractionDigits: 1 })}M`;
  if (value >= 1000) return `${(value / 1000).toLocaleString(numberLocale(), { maximumFractionDigits: 0 })}K`;
  return Number(value).toLocaleString(numberLocale());
}
