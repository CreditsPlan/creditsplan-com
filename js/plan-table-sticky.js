// 表格吸顶浮条：.plan-table-wrap 为支持横向滚动设置了 overflow-x: auto，
// 这会使它成为滚动容器，导致 CSS sticky 表头的 top 偏移相对容器生效（表头被下推产生空白）。
// 因此改用 scroll 监听 + fixed 浮条复刻表头：表头滚出导航栏下方时固定显示，并同步横向滚动位置。
const BAR_CLASS = 'plan-table-sticky-bar';

export function initPlanTableSticky(detail) {
  if (!detail) return;

  let bar = null;
  let barInner = null;
  let barTable = null;
  let boundWrap = null;
  let clonedThead = null;
  let rafId = 0;

  const headerOffset = () => {
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    const value = parseFloat(raw);
    return Number.isFinite(value) && value > 0 ? value : 64;
  };

  const ensureBar = () => {
    if (bar) return;
    bar = document.createElement('div');
    bar.className = BAR_CLASS;
    bar.setAttribute('aria-hidden', 'true');
    barInner = document.createElement('div');
    barInner.className = `${BAR_CLASS}__inner`;
    barTable = document.createElement('table');
    barInner.appendChild(barTable);
    bar.appendChild(barInner);
    document.body.appendChild(bar);
  };

  const rebuildClone = table => {
    const thead = table.querySelector('thead');
    if (!thead) return false;
    const colgroup = table.querySelector('colgroup');
    barTable.className = table.className;
    barTable.innerHTML = '';
    if (colgroup) barTable.appendChild(colgroup.cloneNode(true));
    barTable.appendChild(thead.cloneNode(true));
    clonedThead = thead;
    return true;
  };

  const hideBar = () => {
    if (bar) bar.classList.remove('is-docked');
  };

  const update = () => {
    rafId = 0;
    const viewTable = detail.querySelector('.plan-view-table');
    const wrap = detail.querySelector('.plan-table-wrap');
    const table = wrap?.querySelector('table');
    // 移动端卡片视图 / 表格未渲染时不吸顶
    if (!viewTable || !wrap || !table || window.getComputedStyle(viewTable).display === 'none') {
      hideBar();
      return;
    }
    // 横向滚动事件需要挂在当前 wrap 上（重绘后 wrap 是新节点）
    if (boundWrap !== wrap) {
      boundWrap = wrap;
      wrap.addEventListener('scroll', schedule, { passive: true });
    }
    const offset = headerOffset();
    const wrapRect = wrap.getBoundingClientRect();
    const tableRect = table.getBoundingClientRect();
    const thead = table.querySelector('thead');
    const theadHeight = thead ? thead.getBoundingClientRect().height : 0;
    // 表头尚未滚到导航栏下方，或整张表已滚出视口时不显示浮条
    if (wrapRect.top > offset || tableRect.bottom <= offset + theadHeight) {
      hideBar();
      return;
    }
    ensureBar();
    if (clonedThead !== thead && !rebuildClone(table)) {
      hideBar();
      return;
    }
    bar.style.top = `${offset}px`;
    bar.style.left = `${wrapRect.left}px`;
    bar.style.width = `${wrapRect.width}px`;
    barInner.style.width = `${table.offsetWidth}px`;
    barInner.style.transform = `translateX(${-wrap.scrollLeft}px)`;
    bar.classList.add('is-docked');
  };

  const schedule = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  };

  // 视图重绘（品牌切换/列筛选等）会整体替换表格，需重新计算
  const observer = new MutationObserver(() => {
    clonedThead = null;
    schedule();
  });
  observer.observe(detail, { childList: true, subtree: true });

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();
}
