import { renderHeader } from './header.js';
import { renderFooter } from './footer.js';
import { initTheme } from './theme.js';
import { initI18n, applyI18n } from './i18n.js';
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
  applyI18n(document);
}

function pageFromLocation() {
  const path = location.pathname;
  if (path.startsWith('/brands/')) return 'brands/';
  if (path.startsWith('/plans/')) return 'index.html';
  return path.split('/').pop() || 'index.html';
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
