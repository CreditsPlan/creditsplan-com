// 表格吸顶浮条：.plan-table-wrap / .model-price-table-wrap 为支持横向滚动设置了 overflow-x: auto，
// 这会使它成为滚动容器，导致 CSS sticky 表头的 top 偏移相对容器生效（表头被下推产生空白）。
// 因此改用 scroll 监听 + fixed 浮条复刻表头：表头滚出导航栏下方时固定显示，并同步横向滚动位置。
const BAR_CLASS = 'plan-table-sticky-bar';

// 需要吸顶的表格容器（套餐对比表 + 模型价格表共用同一套浮条逻辑）
const WRAP_SELECTORS = ['.plan-table-wrap', '.model-price-table-wrap'];

export function initPlanTableSticky(detail) {
  if (!detail) return;

  let bar = null;
  let barInner = null;
  let barTable = null;
  let boundWrap = null;
  let clonedThead = null;
  let rafId = 0;

  // 吸顶基准线取顶部固定导航（#header-root）的实际下边缘：活动横幅存在时导航整体下移
  // （--deals-banner-height 叠加在 --header-height 之上），仅读 --header-height 会让浮条被导航遮挡
  const headerOffset = () => {
    const header = document.getElementById('header-root');
    if (header) {
      const bottom = header.getBoundingClientRect().bottom;
      if (Number.isFinite(bottom) && bottom > 0) return bottom;
    }
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
    if (colgroup) {
      barTable.appendChild(colgroup.cloneNode(true));
    } else {
      // 无 colgroup 的表格（如模型价格表，table-layout: auto）按当前真实列宽生成，
      // 保证浮条表头列宽与表格一致
      const cols = [...thead.querySelectorAll('th')];
      if (cols.length) {
        const cg = document.createElement('colgroup');
        cols.forEach(th => {
          const col = document.createElement('col');
          const width = th.getBoundingClientRect().width;
          if (width > 0) col.style.width = `${width}px`;
          cg.appendChild(col);
        });
        barTable.appendChild(cg);
      }
    }
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
    const wrap = WRAP_SELECTORS.map(selector => detail.querySelector(selector)).find(Boolean);
    const table = wrap?.querySelector('table');
    // 横向滚动遮罩状态：可滚动时显示右缘渐隐提示，滚到最右淡出（CSS 类驱动，复用本函数 scroll 链路，无额外监听器）
    if (wrap) {
      wrap.classList.toggle('can-scroll', wrap.scrollWidth > wrap.clientWidth + 1);
      wrap.classList.toggle('is-scrolled-end', wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 1);
    }
    // 移动端卡片视图 / 表格未渲染时不吸顶（模型价格视图无 .plan-view-table，不受卡片判断限制）
    if (!wrap || !table || (viewTable && window.getComputedStyle(viewTable).display === 'none')) {
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
