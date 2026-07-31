import { t, isZh } from './i18n.js';

export function renderFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;
  // 中国 ICP / 公安备案仅在中文（面向中国大陆访客）时展示；国际站英文界面下隐藏。
  const icp = isZh()
    ? `
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer" class="hover:text-slate-900 dark:hover:text-white">湘ICP备2026019664号-2</a>
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=43062102000099" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"><img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt="公安备案" class="h-4 w-4" loading="lazy" decoding="async">湘公网安备43062102000099号</a>`
    : '';
  root.innerHTML = `
    <footer>
      <div class="footer-shell mx-auto flex flex-col gap-2 px-4 py-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <nav class="flex flex-wrap items-center gap-x-3 gap-y-1" aria-label="${t('footer.aria')}">
          <a class="focus-ring rounded hover:text-slate-900 dark:hover:text-white" href="/methodology.html">${t('footer.methodology')}</a>
          <a class="focus-ring rounded hover:text-slate-900 dark:hover:text-white" href="mailto:feedback@creditsplan.com">${t('footer.feedback')}</a>
          <span>${t('footer.affiliate')}</span>
        </nav>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">${icp}
          <span>${t('footer.copyright')}</span>
        </div>
      </div>
    </footer>`;
}
