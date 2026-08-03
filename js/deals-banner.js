// deals-banner.js —— 全站公告条：展示进行中官方活动（最多 3 条）。
// 数据源 deals.json（export:data 从 /api/promotions 导出，含 active/upcoming/ended 状态）。
// 与 build-seo-pages.mjs 的 renderDealsBannerHtml 使用同一数据口径（status=active）与同一双语
// 标记格式（data-locale / data-href-*）：默认英文文本，中文界面由 applyI18n 运行时切换，
// 因此 toggleLang 重新执行 applyI18n 时公告条也会跟随切换。
// header.js 动态覆盖 header-root 后调用本模块重渲染；无活动或加载失败时静默隐藏。
import { escapeHtml, safeExternalUrl } from './render.js';
import { applyI18n, t } from './i18n.js';

export async function renderDealsBanner(container) {
  if (!container) return;
  // 活动页本身就是公告目的地，不重复展示公告条
  if ((globalThis.location?.pathname || '').startsWith('/deals')) return;
  try {
    // 用绝对路径：相对路径在 /deals/、/brands/* 等子页面会解析到错误位置（404）。
    const response = await fetch('/deals.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const data = await response.json();
    const deals = Array.isArray(data.deals) ? data.deals : [];
    const active = deals.filter(deal => deal.status === 'active').slice(0, 3);
    if (!active.length) return;

    const items = active.map(deal => {
      const zhUrl = safeExternalUrl(deal.url);
      const enUrl = safeExternalUrl(deal.url_en) || zhUrl;
      const enTitle = escapeHtml(deal.title_en || deal.title);
      const provider = escapeHtml(deal.provider);
      const localeAttrs = deal.title ? ` data-locale data-locale-en="${enTitle}" data-locale-zh="${escapeHtml(deal.title)}"` : '';
      const hrefLangAttrs = zhUrl ? ` data-href-en="${escapeHtml(enUrl)}" data-href-zh="${escapeHtml(zhUrl)}"` : '';
      const link = enUrl
        ? `<a class="deals-banner-link"${localeAttrs} href="${escapeHtml(enUrl)}"${hrefLangAttrs} target="_blank" rel="noopener noreferrer">${enTitle}</a>`
        : `<span class="deals-banner-title"${localeAttrs}>${enTitle}</span>`;
      return `<span class="deals-banner-item">${provider}: ${link}</span>`;
    }).join('');

    container.innerHTML = `
      <div class="deals-banner" role="note">
        <span class="deals-banner-fire" aria-hidden="true">🔥</span>
        <span class="deals-banner-label">${escapeHtml(t('deals.banner.label'))}</span>
        <span class="deals-banner-items">${items}</span>
        <a class="deals-banner-more" href="/deals/">${escapeHtml(t('deals.banner.viewAll'))}</a>
      </div>`;
    // 按当前语言立即应用一次（默认英文文本 + data-locale 标记）。
    applyI18n(container);
  } catch {
    // 公告条为增强内容，deals.json 缺失/解析失败时静默隐藏
  }
}
