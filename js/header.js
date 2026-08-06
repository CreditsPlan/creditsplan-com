import { bindThemeToggle } from './theme.js';
import { t, toggleLang } from './i18n.js';
import { renderDealsBanner } from './deals-banner.js';

const pages = [
  ['index.html', '/', 'nav.models'],
  ['brands/', '/brands/', 'nav.brands'],
  ['model', '/model', 'nav.pricing'],
  ['advisor/', '/advisor/', 'nav.advisor'],
  ['news.html', '/news.html', 'nav.news'],
  ['deals/', '/deals/', 'nav.deals'],
  ['changelog.html', '/changelog.html', 'nav.changelog']
];

// 「Prices」下拉分组：价格类页面收进一个入口，避免顶栏菜单过多（插在 Advisor 之后）
const priceGroup = [
  ['price-changes/', '/price-changes/', 'nav.priceChanges'],
  ['rankings/cheapest/', '/rankings/cheapest/', 'nav.cheapest'],
  ['reports/', '/reports/', 'nav.reports']
];

function normalized(page) {
  const value = (page || 'index.html').replace(/^\.\//, '').split('#')[0] || 'index.html';
  return value;
}

// 主题切换按钮 SVG 图标（太阳 = 浅色模式显示，月亮 = 深色模式显示）
const themeToggleBtn = `
  <button data-theme-toggle type="button" class="theme-toggle-btn" aria-label="${t('header.theme.aria')}" aria-pressed="false" title="${t('header.theme.title')}">
    <svg class="theme-icon-sun h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    <svg class="theme-icon-moon h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>`;

// 语言切换按钮（国际站默认英文，可切换到中文）
const langToggleBtn = `
  <button data-lang-toggle type="button" class="lang-toggle-btn" aria-label="${t('lang.toggle.aria')}" title="${t('lang.toggle.aria')}">${t('lang.toggle.label')}</button>`;

// GitHub 跳转按钮
const githubLink = `
  <a href="https://github.com/creditsplan/creditsplan-com" target="_blank" rel="noopener noreferrer" class="github-link-btn" aria-label="${t('header.github.aria')}" title="${t('header.github.aria')}">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
  </a>`;

// 前往中国站按钮（国内套餐 / 人民币结算）
const intlLink = `
  <a href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer" class="intl-site-link" aria-label="${t('header.cnSite.aria')}" title="${t('header.cnSite.aria')}">${t('header.cnSite')}</a>`;

export function renderHeader(currentPage = 'index.html') {
  const root = document.getElementById('header-root');
  if (!root) return;
  const current = normalized(currentPage);
  // 「模型」与「套餐」同为首页文档，通过 /model 路径区分高亮
  const pathname = (globalThis.location?.pathname || '').replace(/\/+$/, '') || '/';
  const isModelView = pathname === '/model';
  // AI News 在两种语言下都提供：中文界面取 AI HOT 中文源，英文界面取 aihub 英文源。
  const navItems = pages.map(([page, href, label]) => {
    let active;
    if (page === 'model') active = current === 'index.html' && isModelView;
    else if (page === 'index.html') active = current === 'index.html' && !isModelView;
    else active = normalized(page) === current;
    return `<li><a class="focus-ring${active ? ' is-current' : ''}" data-page-link="${page}" href="${href}"${active ? ' aria-current="page"' : ''}>${t(label)}</a></li>`;
  });

  // 价格下拉：桌面 hover/focus 展开；移动端菜单里由 CSS 平铺成普通菜单项
  const priceActive = priceGroup.some(([page]) => normalized(page) === current);
  const priceItems = priceGroup.map(([page, href, label]) => {
    const active = normalized(page) === current;
    return `<li><a class="focus-ring${active ? ' is-current' : ''}" data-page-link="${page}" href="${href}"${active ? ' aria-current="page"' : ''}>${t(label)}</a></li>`;
  }).join('');
  const priceDropdown = `<li class="nav-dropdown">
    <button type="button" class="nav-dropdown-toggle focus-ring${priceActive ? ' is-current' : ''}" aria-haspopup="true" aria-expanded="false">${t('nav.priceGroup')}<svg class="nav-dropdown-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></button>
    <div class="nav-dropdown-panel"><ul class="nav-dropdown-menu">${priceItems}</ul></div>
  </li>`;
  // 插入到 Advisor 之后（pages 前 4 项之后）
  navItems.splice(4, 0, priceDropdown);
  const nav = navItems.join('');

  root.innerHTML = `
    <div id="deals-banner-root"></div>
    <header>
      <nav class="nav-bar" id="navbar" aria-label="${t('nav.aria.main')}">
        <a href="/" class="nav-logo">
          <div class="nav-logo-icon"><img class="nav-logo-img" src="https://creditsplan.oss-cn-hangzhou.aliyuncs.com/creditsplan-logo-original-arrow-600.webp?v=20260724" alt="CreditsPlan"/></div>
          <span>CreditsPlan</span>
        </a>
        <ul class="nav-links" id="primaryNav">
          ${nav}
          <li class="nav-mobile-only"><a href="https://www.creditsplan.cn/" target="_blank" rel="noopener noreferrer">${t('header.cnSite.mobile')}</a></li>
          <li class="nav-mobile-only"><a href="https://github.com/creditsplan/creditsplan-com" target="_blank" rel="noopener noreferrer">${t('header.github.mobile')}</a></li>
        </ul>
        <div class="nav-actions">
          ${intlLink}
          ${langToggleBtn}
          ${githubLink}
          ${themeToggleBtn}
          <button class="nav-toggle" id="navToggle" type="button" aria-label="${t('header.menu.open')}" aria-controls="primaryNav" aria-expanded="false">${t('header.menu.label')}</button>
        </div>
      </nav>
      <div id="navOverlay" class="nav-overlay" aria-hidden="true"></div>
    </header>`;

  // 渲染完成后绑定主题切换事件
  bindThemeToggle();

  // 公告条：展示进行中官方活动（无活动/加载失败时静默隐藏）
  renderDealsBanner(root.querySelector('#deals-banner-root'));

  // 绑定语言切换
  root.querySelector('[data-lang-toggle]')?.addEventListener('click', toggleLang);

  const navbar = root.querySelector('#navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

  const navToggle = root.querySelector('#navToggle');
  const navLinks = root.querySelector('.nav-links');
  const navOverlay = root.querySelector('#navOverlay');
  if (navToggle && navLinks) {
    // 打开/关闭菜单的统一入口：同步 aria 状态、背景滚动锁定、焦点管理
    const setMenuOpen = (open, { restoreFocus = false } = {}) => {
      navLinks.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? t('header.menu.close') : t('header.menu.open'));
      document.body.classList.toggle('nav-open', open);
      if (open) {
        // 焦点移入菜单，避免 Tab 直接跳入页面内容（菜单在 DOM 中位于按钮之前）
        const firstLink = navLinks.querySelector('a');
        firstLink?.focus({ preventScroll: true });
      } else if (restoreFocus) {
        navToggle.focus({ preventScroll: true });
      }
    };
    navToggle.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('is-open'), { restoreFocus: true });
    });
    navOverlay?.addEventListener('click', () => setMenuOpen(false));
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !navLinks.classList.contains('is-open')) return;
      setMenuOpen(false, { restoreFocus: true });
    });
  }

  // Speculation Rules：让浏览器在后台预渲染导航目标页，点击菜单时几乎零延迟切换
  injectSpeculationRules();
}

let speculationInjected = false;
function injectSpeculationRules() {
  if (speculationInjected) return;
  if (!HTMLScriptElement.supports?.('speculationrules')) return;
  speculationInjected = true;
  const script = document.createElement('script');
  script.type = 'speculationrules';
  script.textContent = JSON.stringify({
    prerender: [{
      source: 'list',
      urls: ['/', '/brands/', '/model', '/advisor/', '/rankings/cheapest/', '/reports/', '/news.html', '/deals/', '/changelog.html'],
      eagerness: 'immediate'
    }]
  });
  document.head.appendChild(script);
}
