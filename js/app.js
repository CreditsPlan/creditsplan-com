import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { initTheme } from './theme.js';
import { initI18n, applyI18n, t } from './i18n.js';
import { initDealsToolbar } from './deals-toolbar.js';
import { installOutboundTracker, trackPageView } from './shared/outbound-tracker.js';

initI18n();
installOutboundTracker();
trackPageView();

export function initAppShell() {
  const currentPage = document.body.dataset.page || pageFromLocation();
  renderHeader(currentPage);
  renderFooter();
  initTheme();
  initPageNav();
  initScrollAnimations();
  initImageFallbacks();
  initGlobalBackTop();
  applyI18n(document);
  // 在 applyI18n 之后初始化：计数文案模板由 data-i18n-attr 先行翻译
  initDealsToolbar();
}

function pageFromLocation() {
  const path = location.pathname;
  if (path.startsWith('/brands/')) return 'brands/';
  if (path.startsWith('/advisor')) return 'advisor/';
  if (path.startsWith('/rankings/')) return 'rankings/cheapest/';
  if (path.startsWith('/price-changes')) return 'price-changes/';
  if (path.startsWith('/reports')) return 'reports/';
  if (path.startsWith('/plans/')) return 'index.html';
  return path.split('/').pop() || 'index.html';
}

// 全局返回顶部：静态长页（品牌页/套餐页/价格变动等）滚动超过一屏后出现；
// 首页由 plans-page.js 渲染自己的 #plansBackTop（回到套餐列表顶部），此处跳过避免重复。
function initGlobalBackTop() {
  if (document.getElementById('codingPlanOverview')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.id = 'globalBackTop';
  button.className = 'plans-back-top';
  button.setAttribute('data-i18n-attr', 'aria-label:global.backTop.aria;title:global.backTop.title');
  button.setAttribute('aria-label', t('global.backTop.aria'));
  button.title = t('global.backTop.title');
  button.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(button);

  const syncVisibility = () => {
    button.classList.toggle('is-visible', window.scrollY > 480);
  };
  button.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', syncVisibility, { passive: true });
  window.addEventListener('resize', syncVisibility);
  syncVisibility();
}

function initImageFallbacks() {
  document.addEventListener('error', event => {
    const image = event.target;
    if (image?.tagName !== 'IMG' || !image.classList.contains('brand-icon-img')) return;
    image.classList.add('hidden');
    image.nextElementSibling?.classList.remove('hidden');
  }, true);
}

function initPageNav() {
  const siteNavLinks = document.querySelectorAll('.site-nav-link');
  if (!siteNavLinks.length) return;

  const rawPage = location.pathname.split('/').pop();
  const pathPage = rawPage === '' || rawPage === '/' ? 'index.html' : rawPage;
  const normalize = p => { const n = (p || 'index').replace(/\.html$/, '') || 'index'; return n; };

  siteNavLinks.forEach(link => {
    const target = link.dataset.pageLink || 'index.html';
    const isActive = normalize(target) === normalize(pathPage);
    link.classList.toggle('is-current', isActive);
  });
}

function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('[data-animate]');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.animateDelay || '0';
        el.style.animationDelay = `${delay}ms`;
        el.classList.add('animate-in');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

if (document.getElementById('header-root')?.hasAttribute('data-auto-init')) {
  initAppShell();
}
