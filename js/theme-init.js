(function () {
  document.documentElement.classList.add('js');
  var theme;
  try { theme = localStorage.getItem('creditsplan-theme'); } catch (_error) { /* noop */ }
  if (!theme) theme = document.documentElement.dataset.defaultTheme || 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
})();
