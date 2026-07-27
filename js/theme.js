// CreditsPlan - 主题切换（深色 / 浅色）
const STORAGE_KEY = 'creditsplan-theme';

function getStoredTheme() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function setStoredTheme(theme) {
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
}

export function initTheme() {
  const stored = getStoredTheme();
  const theme = stored || 'light';
  applyTheme(theme);
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  setStoredTheme(next);
  syncToggleIcons();
}

export function getCurrentTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  if (document.body) {
    document.body.classList.toggle('dark', isDark);
  }
}

// 同步所有主题切换按钮的图标显示
function syncToggleIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const sunIcon = btn.querySelector('.theme-icon-sun');
    const moonIcon = btn.querySelector('.theme-icon-moon');
    btn.setAttribute('aria-pressed', String(isDark));
    if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
    if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
  });
}

// 暴露给外部调用（header.js 渲染后绑定事件）
export function bindThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
  syncToggleIcons();
}
