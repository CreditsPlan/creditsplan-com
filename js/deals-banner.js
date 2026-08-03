// deals-banner.js —— 全站公告条：展示进行中官方活动（最多 3 条）。
// 数据源 deals.json（export:data 从 /api/promotions 导出，含 active/upcoming/ended 状态）。
// 与 build-seo-pages.mjs 的 renderDealsBannerHtml 使用同一数据口径（status=active），
// header.js 动态覆盖 header-root 后调用本模块重渲染；无活动或加载失败时静默隐藏。
import { escapeHtml, safeExternalUrl } from './render.js';
import { t } from './i18n.js';

export async function renderDealsBanner(container) {
  if (!container) return;
  try {
    const response = await fetch('./deals.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const data = await response.json();
    const deals = Array.isArray(data.deals) ? data.deals : [];
    const active = deals.filter(deal => deal.status === 'active').slice(0, 3);
    if (!active.length) return;

    const items = active.map(deal => {
      const url = safeExternalUrl(deal.url);
      const title = escapeHtml(deal.title);
      const provider = escapeHtml(deal.provider);
      const link = url
        ? `<a class="deals-banner-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${title}</a>`
        : `<span class="deals-banner-title">${title}</span>`;
      return `<span class="deals-banner-item">${provider}: ${link}</span>`;
    }).join('');

    container.innerHTML = `
      <div class="deals-banner" role="note">
        <span class="deals-banner-fire" aria-hidden="true">🔥</span>
        <span class="deals-banner-label">${escapeHtml(t('deals.banner.label'))}</span>
        <span class="deals-banner-items">${items}</span>
        <a class="deals-banner-more" href="/deals/">${escapeHtml(t('deals.banner.viewAll'))}</a>
      </div>`;
  } catch {
    // 公告条为增强内容，deals.json 缺失/解析失败时静默隐藏
  }
}
