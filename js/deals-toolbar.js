// deals-toolbar.js —— 活动页筛选/搜索/视图工具栏（渐进增强）。
// 静态页已按状态分组渲染全部卡片；本模块在其上叠加：状态筛选、类型筛选、关键词搜索、
// 「按状态 / 按时间」双视图（时间视图按开始日期生成日期标记时间线，风格对齐 AI 动态）。
// 计数/空态/视图文案写在 DOM dataset 上（com 站由 i18n data-i18n-attr 翻译），模块本身不依赖语言。
export function initDealsToolbar(main = document) {
  const toolbar = main.querySelector('[data-deals-toolbar]');
  if (!toolbar) return;
  const cards = [...main.querySelectorAll('.deal-card')];
  if (!cards.length) return;
  const groups = [...main.querySelectorAll('.deal-group')];
  const searchInput = toolbar.querySelector('[data-deal-search]');
  const countEl = toolbar.querySelector('[data-deal-count]');

  let status = 'all';
  let type = 'all';
  let query = '';
  let view = 'status';
  let timeline = null;
  // 记录每张卡片在状态分组中的原始位置，切回「按状态」时还原
  const homeMap = new Map(cards.map(card => [card, { parent: card.parentElement, next: card.nextSibling }]));

  const syncChips = (selector, attr, value) => {
    toolbar.querySelectorAll(selector).forEach(chip => {
      chip.classList.toggle('is-active', chip.dataset[attr] === value);
    });
  };

  const locale = () => ((document.documentElement.lang || 'zh').toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US');

  // 日期标记文案：今天/昨天优先，否则「日期 · 星期」
  const markerLabel = (dateStr, todayLabel, yesterdayLabel) => {
    if (!dateStr) return countEl?.dataset.noDateText || '';
    const date = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateStr;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round((startOfToday - date) / 864e5);
    if (diffDays === 0 && todayLabel) return todayLabel;
    if (diffDays === 1 && yesterdayLabel) return yesterdayLabel;
    const weekday = date.toLocaleDateString(locale(), { weekday: 'short' });
    return `${dateStr} · ${weekday}`;
  };

  // 懒构建时间线容器：按开始日期倒序分组，卡片直接从状态分组中移入（不复制，保持单一 DOM 源）
  const ensureTimeline = () => {
    if (timeline) return timeline;
    timeline = document.createElement('div');
    timeline.className = 'deals-timeline';
    timeline.hidden = true;
    const buckets = new Map();
    cards.forEach(card => {
      const key = card.dataset.startDate || '';
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(card);
    });
    const keys = [...buckets.keys()].sort((a, b) => (b || '').localeCompare(a || ''));
    const todayLabel = countEl?.dataset.todayText || '';
    const yesterdayLabel = countEl?.dataset.yesterdayText || '';
    for (const key of keys) {
      const block = document.createElement('section');
      block.className = 'deals-timeline-block';
      const marker = document.createElement('h3');
      marker.className = 'deals-date-marker';
      marker.innerHTML = `<span>${markerLabel(key, todayLabel, yesterdayLabel)}</span><span class="deals-date-count">${buckets.get(key).length}</span>`;
      const list = document.createElement('ul');
      list.className = 'deal-list';
      buckets.get(key).forEach(card => list.appendChild(card));
      block.appendChild(marker);
      block.appendChild(list);
      timeline.appendChild(block);
    }
    const lastGroup = groups[groups.length - 1];
    (lastGroup?.parentElement || main).insertBefore(timeline, lastGroup ? lastGroup.nextSibling : null);
    return timeline;
  };

  // 切回状态视图：卡片按记录的原始位置还原
  const restoreStatusView = () => {
    cards.forEach(card => {
      const home = homeMap.get(card);
      if (home?.parent) home.parent.insertBefore(card, home.next);
    });
    if (timeline) timeline.hidden = true;
    groups.forEach(group => { group.hidden = false; });
  };

  const apply = () => {
    let visible = 0;
    cards.forEach(card => {
      const matchStatus = status === 'all' || card.dataset.status === status;
      const matchType = type === 'all' || card.dataset.type === type;
      const haystack = `${card.dataset.title || ''} ${card.dataset.provider || ''} ${card.dataset.summary || ''}`;
      const matchQuery = !query || haystack.includes(query);
      const show = matchStatus && matchType && matchQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });
    // 无可见卡片的分组/日期块连同标题一起隐藏，避免出现空分组
    if (view === 'timeline' && timeline) {
      timeline.querySelectorAll('.deals-timeline-block').forEach(block => {
        block.hidden = !block.querySelector('.deal-card:not([hidden])');
      });
    } else {
      groups.forEach(group => {
        group.hidden = !group.querySelector('.deal-card:not([hidden])');
      });
    }
    if (!countEl) return;
    const filtering = status !== 'all' || type !== 'all' || query;
    if (!filtering) {
      countEl.textContent = '';
      return;
    }
    countEl.textContent = visible
      ? (countEl.dataset.countTemplate || '{n}').replace('{n}', String(visible))
      : (countEl.dataset.emptyText || '');
  };

  const switchView = next => {
    if (next === view) return;
    view = next;
    syncChips('[data-deal-view]', 'dealView', view);
    if (view === 'timeline') {
      groups.forEach(group => { group.hidden = true; });
      ensureTimeline();
      timeline.hidden = false;
    } else {
      restoreStatusView();
    }
    apply();
  };

  toolbar.querySelectorAll('[data-deal-status]').forEach(chip => {
    chip.addEventListener('click', () => {
      status = chip.dataset.dealStatus || 'all';
      syncChips('[data-deal-status]', 'dealStatus', status);
      apply();
    });
  });
  toolbar.querySelectorAll('[data-deal-type]').forEach(chip => {
    chip.addEventListener('click', () => {
      const value = chip.dataset.dealType || 'all';
      type = type === value ? 'all' : value; // 再次点击同一类型 = 取消筛选
      syncChips('[data-deal-type]', 'dealType', type);
      apply();
    });
  });
  toolbar.querySelectorAll('[data-deal-view]').forEach(chip => {
    chip.addEventListener('click', () => switchView(chip.dataset.dealView || 'status'));
  });
  searchInput?.addEventListener('input', () => {
    query = (searchInput.value || '').trim().toLowerCase();
    apply();
  });
  // 侧边栏锚点指向状态分组：时间视图下先切回状态视图再滚动定位
  main.querySelectorAll('.deals-nav-item[href^="#deals-"]').forEach(link => {
    link.addEventListener('click', clickEvent => {
      if (view !== 'status') {
        switchView('status');
        const target = main.querySelector(link.getAttribute('href'));
        if (target) {
          clickEvent.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
  apply();
}
