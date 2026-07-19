// AI News 仅有中文内容：英文界面下不提供新闻页。
// 若解析出的语言不是中文，则在页面主体与新闻模块加载前重定向回首页，
// 避免出现新闻外壳闪现或无谓的 /aihot-api 请求。
// 语言判定需与 i18n.js 的 LANG_KEY / getLang() / detectLang() 优先级保持一致：
// 已存储的 'zh'/'en' 优先，其次按浏览器语言推断，最终回退英文。
(function () {
  function resolvedIsZh() {
    try {
      var stored = localStorage.getItem('creditsplan-lang');
      if (stored === 'zh') return true;
      if (stored === 'en') return false;
    } catch (_error) { /* noop */ }
    try {
      var candidates = [];
      if (Array.isArray(navigator.languages)) candidates = candidates.concat(navigator.languages);
      if (navigator.language) candidates.push(navigator.language);
      for (var i = 0; i < candidates.length; i += 1) {
        var lower = String(candidates[i] || '').toLowerCase();
        if (lower.indexOf('zh') === 0) return true;
        if (lower.indexOf('en') === 0) return false;
      }
    } catch (_error2) { /* noop */ }
    return false;
  }

  if (!resolvedIsZh()) {
    window.location.replace('/');
  }
})();
