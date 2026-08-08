// fit-description.js —— 描述文本「能容纳就单行」自适应。
// 活动页（.deal-card-summary）与更新日志页（.changelog-release-summary）的描述：
// 容器宽度能完整容纳时保持单行（不换行），宽度不够时才换行。
// 原理：先挂 fit-single-line（nowrap）测量 scrollWidth，超出 clientWidth 说明放不下，摘掉恢复换行。
const FIT_SELECTOR = '.deal-card-summary, .changelog-release-summary';

function fitElement(el) {
  // 筛选/视图切换中的隐藏元素跳过（clientWidth 为 0 会误判为放得下），重新显示后由 MutationObserver 重测
  if (!el || el.hidden || !el.offsetParent) return;
  el.classList.add('fit-single-line');
  if (el.scrollWidth > el.clientWidth + 1) {
    el.classList.remove('fit-single-line');
  }
}

export function fitDescriptionLines() {
  document.querySelectorAll(FIT_SELECTOR).forEach(fitElement);
}

let observer = null;
let resizeTimer = null;

export function initFitDescription() {
  fitDescriptionLines();
  if (observer) return; // 已初始化过，本次调用只做一次重测
  // 筛选/视图切换通过 hidden 属性显隐卡片，重新显示后需重测（等下一帧布局完成再量宽度）
  observer = new MutationObserver(() => requestAnimationFrame(fitDescriptionLines));
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['hidden'],
    subtree: true,
  });
  // 窗口尺寸变化后重测：窄屏换行、宽屏单行
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitDescriptionLines, 120);
  });
}
