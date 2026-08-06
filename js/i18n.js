// CreditsPlan international site - runtime UI internationalization.
// Language is chosen as: explicit toggle (localStorage) > browser language > English fallback.
// Only interface chrome is translated here; data-derived content (brand names, plan notes,
// SEO body text) is shown as stored. Switching language persists the choice and reloads so
// every rendered surface (including JS-formatted numbers/dates) stays consistent.

const LANG_KEY = 'creditsplan-lang';
const SUPPORTED = ['en', 'zh'];
export const DEFAULT_LANG = 'en';

// 根据浏览器环境推断语言：以 zh 开头（zh / zh-CN / zh-TW 等）视为中文，否则英文。
function detectLang() {
  try {
    const candidates = [];
    if (typeof navigator !== 'undefined') {
      if (Array.isArray(navigator.languages)) candidates.push(...navigator.languages);
      if (navigator.language) candidates.push(navigator.language);
    }
    for (const tag of candidates) {
      const lower = String(tag || '').toLowerCase();
      if (lower.startsWith('zh')) return 'zh';
      if (lower.startsWith('en')) return 'en';
    }
  } catch { /* noop */ }
  return DEFAULT_LANG;
}

export function getLang() {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch { /* noop */ }
  // 未手动选择时，按浏览器语言自动选择（回退英文）。
  return detectLang();
}

export function setLang(lang) {
  const next = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  try { localStorage.setItem(LANG_KEY, next); } catch { /* noop */ }
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  // Reload so all data-rendered content re-formats for the chosen locale.
  window.location.reload();
}

export function toggleLang() {
  setLang(getLang() === 'zh' ? 'en' : 'zh');
}

// Locale tag used by Intl / toLocaleString.
export function numberLocale() {
  return getLang() === 'zh' ? 'zh-CN' : 'en-US';
}

export function isZh() {
  return getLang() === 'zh';
}

export const translations = {
  // —— Header / navigation ——
  'nav.aria.main': { en: 'Main navigation', zh: '主导航' },
  'nav.models': { en: 'Plans', zh: '套餐' },
  'nav.brands': { en: 'Brands', zh: '品牌' },
  'nav.pricing': { en: 'Models', zh: '模型' },
  'nav.news': { en: 'AI News', zh: 'AI动态' },
  'nav.deals': { en: 'Deals', zh: '活动' },
  'nav.changelog': { en: 'Changelog', zh: '更新日志' },
  'nav.priceChanges': { en: 'Price Changes', zh: '价格变动' },
  'nav.advisor': { en: 'Advisor', zh: '选购助手' },
    'nav.priceGroup': { en: 'Prices', zh: '价格' },
    'nav.cheapest': { en: 'Cheapest Plans', zh: '最便宜榜' },
    'nav.reports': { en: 'Price Reports', zh: '价格月报' },
  'header.theme.aria': { en: 'Toggle theme', zh: '切换主题' },
  'header.theme.title': { en: 'Toggle dark / light mode', zh: '切换深色/浅色模式' },
  'header.github.aria': { en: 'GitHub', zh: 'GitHub交流' },
  'header.cnSite': { en: 'Visit China Site →', zh: '前往中国站 →' },
  'header.cnSite.aria': { en: 'Go to Visit China Site (domestic plans / CNY billing)', zh: '前往中国站（国内套餐 / 人民币结算）' },
  'header.cnSite.mobile': { en: 'Visit China Site (domestic plans)', zh: '前往中国站（国内套餐）' },
  'header.github.mobile': { en: 'Go to GitHub', zh: '前往 GitHub' },
  'header.menu.open': { en: 'Open menu', zh: '打开主菜单' },
  'header.menu.close': { en: 'Close menu', zh: '关闭主菜单' },
  'header.menu.label': { en: 'Menu', zh: '菜单' },
  'lang.toggle.aria': { en: 'Switch language', zh: '切换语言' },
  // Label shows the language you can switch TO.
  'lang.toggle.label': { en: 'Chinese', zh: 'EN' },

  // —— Footer ——
  'footer.aria': { en: 'Footer navigation', zh: '页脚导航' },
  'footer.priceChanges': { en: 'Price changes', zh: '价格变动' },
  'footer.methodology': { en: 'Methodology', zh: '数据校对方法' },
  'footer.developers': { en: 'Developer API', zh: '开发者 API' },
  'footer.feedback': { en: 'Feedback: feedback@creditsplan.com', zh: '反馈邮箱：feedback@creditsplan.com' },
  'footer.affiliate': { en: 'Some purchase links are partner links; buying through them may earn us a commission and can unlock discounts on some brands, without affecting our pricing data or rankings.', zh: '通过本站链接购买，部分品牌可享专属优惠；本站可能获得推广收益，不影响价格数据与排序的中立性。' },
  'footer.copyright': { en: '© 2026 CreditsPlan', zh: '© 2026 CreditsPlan' },

  // —— Home / plans overview (plans-page.js) ——
  'home.pageTitle': { en: 'CreditsPlan - International AI Coding Plan Comparison & Subscription Decisions', zh: 'CreditsPlan - 国际 AI Coding 套餐对比与订阅决策' },
  'home.kicker': { en: 'AI developer subscription decision platform', zh: 'AI 开发者订阅决策平台' },
  'home.title': { en: 'International AI Coding plan comparison & decisions', zh: '国际 AI Coding 套餐对比与决策' },
  'home.summary': {
    en: 'Structured comparison of prices, quotas, models and usage conditions for international AI Coding plans; track price changes, keep official sources and verification dates so you can pick tools and decide on cost faster. Always confirm real prices on the vendor\u2019s official site.',
    zh: '结构化比较国际 AI Coding 套餐的价格、额度、模型与使用条件；追踪价格变化，保留官方来源和核对日期，帮你更快完成工具选型与成本决策。真实价格请以厂商官网为准。'
  },
  'home.meta.records': { en: 'records', zh: '条记录' },
  'home.meta.brands': { en: 'brands', zh: '个品牌' },
  'home.meta.models': { en: 'models', zh: '个模型' },
  'home.meta.avgMonthly': { en: 'avg. monthly', zh: '平均月付' },
  'home.dimension.brand': { en: 'By brand', zh: '按品牌' },
  'home.dimension.model': { en: 'By model', zh: '按模型' },
  'home.search.brand': { en: 'Search brands or models, e.g. Qoder, Claude…', zh: '搜索品牌或模型，如 Qoder、Claude…' },
  'home.search.model': { en: 'Search models, e.g. GPT-5, Claude…', zh: '搜索模型，如 GPT-5、Claude…' },
  'home.search.aria': { en: 'Search brands or models', zh: '搜索品牌或模型' },
  'home.hero.usd': { en: 'USD billing', zh: '美元结算' },
  'home.hero.card': { en: 'International card / PayPal', zh: '国际卡 / PayPal' },
  'home.hero.global': { en: 'Global access', zh: '全球可用' },
  'home.hero.cnLink': { en: 'Domestic plans? Go to creditsplan.cn →', zh: '国内套餐？前往 creditsplan.cn →' },
  'home.hero.aria': { en: 'International site value proposition', zh: '国际站价值主张' },
  'home.tab.all': { en: 'All', zh: '全部' },
  'home.tab.free': { en: 'Free', zh: '免费' },
  'home.backTop.aria': { en: 'Back to top of plan list', zh: '返回套餐列表顶部' },
  'home.backTop.title': { en: 'Back to top', zh: '返回顶部' },
  'global.backTop.aria': { en: 'Back to top of page', zh: '返回页面顶部' },
  'global.backTop.title': { en: 'Back to top', zh: '返回顶部' },
  'home.dataUnavailable.title': { en: 'Plan data unavailable', zh: '套餐数据暂不可用' },
  'home.dataUnavailable.backend': {
    en: 'The local database API /api/models is currently unavailable. Make sure public-api is running and connected to the database.',
    zh: '本地数据库接口 /api/models 当前不可用，请确认 public-api 已启动并连接数据库。'
  },
  'home.dataUnavailable.static': {
    en: 'The data.json in the deployment package is currently unavailable. Re-export the database snapshot and redeploy.',
    zh: '部署包中的 data.json 当前不可用，请重新导出数据库快照并部署。'
  },

  // —— Plan value calculator (plan-advisor.js) ——
  'advisor.fab.label': { en: 'Help me choose', zh: '帮我选套餐' },
  'advisor.fab.aria': { en: 'Open plan value calculator', zh: '打开套餐性价比计算器' },
  'advisor.fab.title': { en: 'Which plan is the best value?', zh: '哪个套餐最划算？' },
  'advisor.title': { en: 'Which plan is the best value?', zh: '哪个套餐最划算？' },
  'advisor.close.aria': { en: 'Close calculator', zh: '关闭计算器' },
  'advisor.family.label': { en: 'Which model family do you mainly use?', zh: '主要用哪个模型系？' },
  'advisor.family.hint': { en: 'Multi-select; leave empty for any', zh: '可多选，不选=不限' },
  'advisor.usage.label': { en: 'How many calls per month?', zh: '每月大约调用多少次？' },
  'advisor.usage.light': { en: 'Light ~500/mo', zh: '轻度 ~500 次/月' },
  'advisor.usage.medium': { en: 'Medium ~3,000/mo', zh: '中度 ~3,000 次/月' },
  'advisor.usage.heavy': { en: 'Heavy ~10,000/mo', zh: '重度 ~10,000 次/月' },
  'advisor.usage.extreme': { en: 'Extreme ~30,000/mo', zh: '极重 ~30,000 次/月' },
  'advisor.usage.custom': { en: 'Custom', zh: '自定义次数' },
  'advisor.budget': { en: 'Budget cap', zh: '预算上限' },
  'advisor.budget.placeholder': { en: '$/mo, optional', zh: '$/月，可不填' },
  'advisor.summary': { en: '{n} plans ranked by value:', zh: '按性价比为你排序 {n} 个套餐：' },
  'advisor.expand': { en: 'Show all {n} results', zh: '展开全部 {n} 个结果' },
  'advisor.empty': { en: 'No plans match. Try relaxing the model family or budget.', zh: '没有符合条件的套餐，试试放宽模型系或预算限制。' },
  'advisor.paygo': { en: '{n} pay-as-you-go options are excluded from ranking; see the plan table.', zh: '另有 {n} 个按量计费选项未参与排序，可在套餐表中查看。' },
  'advisor.disclaimer': { en: 'Quotas and prices are estimates from public data, for comparison only. Confirm on the vendor’s official site.', zh: '额度与价格为公开资料估算，仅供比较参考，请以厂商官网为准。' },
  'advisor.chip.enough': { en: 'Quota enough', zh: '额度充足' },
  'advisor.chip.short': { en: 'Quota may be short', zh: '额度可能不足' },
  'advisor.chip.unknown': { en: 'Quota undisclosed', zh: '额度未公开' },
  'advisor.chip.unlabeled': { en: 'Models not listed', zh: '模型未标注' },
  'advisor.chip.monthlyQuota': { en: '~{n} calls/mo', zh: '月额度 ~{n} 次' },
  'advisor.chip.estimated': { en: '{basis}, estimated', zh: '{basis}，估算' },
  'advisor.chip.per1k': { en: '≈ {price} per 1k calls', zh: '每千次 ≈ {price}' },
  'advisor.chip.supports': { en: 'Supports {models}', zh: '支持 {models}' },
  'advisor.price.official': { en: 'See official site for price', zh: '价格请以官网为准' },
  'advisor.price.cnyNote': { en: '≈ ${n} (at $1=¥{rate})', zh: '≈ ${n}（按 $1=¥{rate} 折算）' },
  'advisor.link': { en: 'Official →', zh: '官网 →' },
  'advisor.cycle.monthly': { en: 'Monthly', zh: '月付' },
  'advisor.cycle.quarterly': { en: 'Quarterly equiv.', zh: '季付折算' },
  'advisor.cycle.annual': { en: 'Annual equiv.', zh: '年付折算' },
  'advisor.basis.monthly': { en: 'monthly quota', zh: '月额度' },
  'advisor.basis.weekly': { en: 'from weekly quota', zh: '按周额度估算' },
  'advisor.basis.fiveHours': { en: 'from 5-hour window', zh: '按 5 小时窗口估算' },

  // —— Model price comparison (/model, model-price-table.js) ——
  'pricing.title': { en: 'International AI model price comparison', zh: '国际 AI 模型价格对比' },
  'pricing.summary': {
    en: 'Compare official API prices (input/output, ¥ per 1M tokens) and context length of leading international models, sourced from vendor pricing pages. Check official sites for actual prices.',
    zh: '对比国际主流模型的官方 API 单价（输入/输出，¥/百万 tokens）与上下文长度，数据来自厂商官方定价页。真实价格请以厂商官网为准。'
  },
  'pricing.meta.models': { en: 'models', zh: '个模型' },
  'pricing.meta.vendors': { en: 'vendors', zh: '个厂商' },
  'pricing.th.name': { en: 'Model', zh: '模型' },
  'pricing.th.provider': { en: 'Brand', zh: '品牌' },
  'pricing.th.context': { en: 'Context', zh: '上下文' },
  'pricing.th.input': { en: 'Input (official)', zh: '输入（官方价）' },
  'pricing.th.output': { en: 'Output (official)', zh: '输出（官方价）' },
  'pricing.pending': { en: 'TBD', zh: '待更新' },
  'pricing.unit': { en: '/1M tokens', zh: '/百万tokens' },
  'pricing.legacy': { en: 'Legacy', zh: '旧版' },
  'pricing.unknownVendor': { en: 'Unknown', zh: '未知' },
  'pricing.empty': { en: 'No model price data for this vendor yet', zh: '暂无该厂商的模型价格数据' },
  'pricing.table.aria': { en: 'Model price comparison table', zh: '模型价格对比表' },
  'pricing.group.inputFrom': { en: 'Input from {symbol}{price}', zh: '输入 {symbol}{price} 起' },
  'pricing.footnote': {
    en: 'Prices per 1M tokens in the currency shown ($ USD / ¥ CNY, as officially priced by each vendor) · data from official vendor pricing pages; check official sites for actual prices.',
    zh: '价格单位：表内符号所示币种（$ 美元 / ¥ 人民币，按厂商官方计价）/ 百万 tokens · 数据来源为各厂商官方定价页，真实价格请以官网为准'
  },

  // —— Export (plans-export.js) ——

  'export.trigger': { en: 'Export', zh: '导出数据' },

  'export.trigger.title': { en: 'Export current plan data', zh: '导出当前套餐数据' },

  'export.excel.desc': { en: 'Spreadsheet, best for analysis', zh: '表格文件，适合数据分析' },

  'export.word.desc': { en: 'Document, best for reports', zh: '文档文件，适合报告引用' },

  'export.pdf.desc': { en: 'Fixed layout, best for sharing', zh: '固定版式，适合分享存档' },

  'export.title': { en: 'International AI Coding Plan Comparison Data', zh: '国际 AI Coding 套餐对比数据' },

  'export.source': { en: 'Source: creditsplan.com', zh: '数据来源：creditsplan.com' },

  'export.date': { en: 'Exported', zh: '导出日期' },

  'export.page': { en: 'Page {n} of {total}', zh: '第 {n}/{total} 页' },

  'export.records': { en: '{n} records', zh: '共 {n} 条记录' },

  'export.disclaimer': { en: 'Always confirm real prices on the vendor\u2019s official site.', zh: '真实价格请以厂商官网为准。' },

  'export.footer': { en: 'Real prices prevail on vendor official sites \u2014 creditsplan.com', zh: '真实价格请以厂商官网为准 \u2014 creditsplan.com' },

  'export.col.planType': { en: 'Plan type', zh: '套餐类型' },

  'export.col.url': { en: 'Source URL', zh: '来源链接' },



  // —— Plan table & filters (plans-table.js / plans-filters.js) ——
  'table.caption': { en: 'International AI Coding plan comparison', zh: '国际 AI Coding 套餐对比' },
  'table.col.provider': { en: 'Brand', zh: '品牌' },
  'table.col.name': { en: 'Plan', zh: '套餐名称' },
  'table.col.monthly': { en: 'Monthly', zh: '连续包月' },
  'table.col.quarterly': { en: 'Quarterly', zh: '连续包季' },
  'table.col.annual': { en: 'Annual', zh: '连续包年' },
  'table.col.quota': { en: 'Quota', zh: '额度' },
  'table.col.billingUnit': { en: 'Billing unit', zh: '计费单位' },
  'billing.token': { en: 'Token-based', zh: 'Token 计费' },
  'billing.credits': { en: 'Credits', zh: '积分制' },
  'billing.requests': { en: 'Requests', zh: '请求次数' },
  'billing.undisclosed': { en: 'Undisclosed', zh: '未公开' },
  'table.price.firstMonth': { en: '1st mo', zh: '首月' },
  'price.firstMonth': { en: 'First month', zh: '首月特惠' },
  'table.col.unitPrice': { en: 'Unit price', zh: '等效单价' },
  'table.unitPrice.estimated': { en: 'Estimated from published quota', zh: '按公开额度估算' },
  'table.quick.availableOnly': { en: 'Purchasable only', zh: '只看可购买' },
  'table.col.model': { en: 'Model', zh: '代表模型' },
  'table.col.status': { en: 'Status', zh: '状态' },
  'table.col.verified': { en: 'Verified', zh: '核对日期' },
  'table.col.source': { en: 'Source', zh: '来源' },
  'table.col.domesticPayment': { en: 'CN Pay', zh: '国内支付' },
  'table.col.intlNetwork': { en: 'VPN Req.', zh: '国际网络' },
  'table.col.dataTraining': { en: 'Data Training', zh: '数据训练' },
  'table.colSettings.trigger': { en: 'Columns', zh: '列设置' },
  'table.colSettings.title': { en: 'Choose which columns to show in the table', zh: '选择表格显示的列' },
  'table.colSettings.hidden': { en: '{n} hidden', zh: '隐藏 {n} 列' },
  'table.colSettings.reset': { en: 'Auto fit', zh: '恢复自动' },
  'privacy.label.dataTraining': { en: 'Data Training', zh: '数据训练' },
  'privacy.label.optOut': { en: 'Training Opt-out', zh: '训练关闭' },
  'privacy.label.retention': { en: 'Data Retention', zh: '数据保留' },
  'privacy.training.yes': { en: 'May be used for training', zh: '可能用于训练' },
  'privacy.training.no': { en: 'Not used for training', zh: '不用于训练' },
  'privacy.training.unclear': { en: 'Undisclosed', zh: '未明确' },
  'privacy.cell.yes': { en: 'May train', zh: '可能训练' },
  'privacy.cell.no': { en: 'No training', zh: '不训练' },
  'privacy.policySource': { en: 'Privacy policy source', zh: '隐私政策来源' },
  'privacy.verifiedOn': { en: 'verified {date}', zh: '{date} 核对' },
  'privacy.verifiedStale': { en: 'verified {date}, needs re-check', zh: '{date} 核对，待复核' },
  'privacy.filter.notResearched': { en: 'Not researched', zh: '待调研' },
  'table.filter.all': { en: 'All', zh: '全部' },
  'status.available': { en: 'Available', zh: '可购买' },
  'status.rush_sale': { en: 'Selling Fast', zh: '抢购中' },
  'status.unavailable': { en: 'Unavailable', zh: '不可购买' },
  'status.pending': { en: 'Pending', zh: '待确认' },
  'status.discontinued': { en: 'Discontinued', zh: '已停售' },
  'table.filter.tooltip': { en: 'Filter', zh: '筛选' },
  'table.filter.count': { en: 'items', zh: '条' },
  'table.filter.clear': { en: 'Clear', zh: '清除' },
  'table.source.site': { en: 'Official →', zh: '官网 →' },
  'table.source.name': { en: 'Official', zh: '官网' },
  'table.verified.pending': { en: 'Pending', zh: '待核对' },
  'verified.freshToday': { en: '✓ Verified today', zh: '✓ 今日核实' },
  'verified.freshDaysAgo': { en: '✓ Verified {n}d ago', zh: '✓ {n} 天前核实' },
  'verified.tableToday': { en: '✓ Today', zh: '✓ 今日' },
  'verified.tableDaysAgo': { en: '✓ {n}d ago', zh: '✓ {n} 天前' },
  'verified.stale': { en: 'Needs re-check', zh: '待复核' },
  'verified.freshTitle': { en: 'Verified against the official page on {date}', zh: '官方页核实于 {date}' },
  'verified.staleTitle': { en: 'Last verified {date}, more than 30 days ago', zh: '上次核实 {date}，已超过 30 天' },
  'detail.verifiedFresh': { en: 'Verified on {date} ({rel})', zh: '官方页核实于 {date}（{rel}）' },
  'detail.verifiedStale': { en: 'Last verified {date} · over 30 days, needs re-check', zh: '上次核实 {date} · 超过 30 天，待复核' },
  'verified.relToday': { en: 'today', zh: '今日' },
  'verified.relDaysAgo': { en: '{n}d ago', zh: '{n} 天前' },
  'source.official': { en: 'Official source', zh: '官方来源' },
  'source.official.title': { en: 'Collected from the vendor’s official pricing page and re-verified by the automated pipeline each round', zh: '数据采集自厂商官方定价页，由自动化管线逐轮核验' },
  'source.api': { en: 'API source', zh: 'API 直连' },
  'source.api.title': { en: 'Sourced from the vendor’s official API and re-verified by the automated pipeline each round', zh: '数据来自厂商官方接口，由自动化管线逐轮核验' },
  'source.structured': { en: 'Structured parse', zh: '结构化解析' },
  'source.structured.title': { en: 'Parsed structurally from the official page and re-verified by the automated pipeline each round', zh: '数据来自官方页面结构化解析，由自动化管线逐轮核验' },
  'source.page': { en: 'Page scrape', zh: '页面采集' },
  'source.page.title': { en: 'Scraped from the page; check the official site before ordering', zh: '数据来自页面抓取，下单前请以官网为准' },
  'home.freshness.hours': { en: 'Data updated {n}h ago', zh: '数据更新于 {n} 小时前' },
  'home.freshness.days': { en: 'Data updated {n}d ago', zh: '数据更新于 {n} 天前' },
  'home.freshness.date': { en: 'Data updated {date}', zh: '数据更新于 {date}' },
  'home.freshness.title': { en: 'Latest official-page verification: {date} · {verified}/{total} plans carry a verification record', zh: '最近一次官方页核验：{date} · {verified}/{total} 个套餐有核验记录' },
  'table.empty.match': { en: 'No matching plans', zh: '暂无匹配套餐记录' },
  'table.empty.none': { en: 'No plans available yet.', zh: '后台暂无套餐记录。' },
  'table.price.official': { en: 'See official site', zh: '请以官网为准' },
  'table.price.usage': { en: 'Pay as you go', zh: '按量计费' },
  'table.price.approx': { en: '~', zh: '约' },
  'card.detail.expand': { en: 'View details', zh: '查看详情' },
  'card.detail.collapse': { en: 'Hide details', zh: '收起详情' },
  'group.collapseExtra': { en: 'Collapse extra plans', zh: '收起多余套餐' },
  'group.viewRemaining': { en: 'View {n} more plans', zh: '查看其余 {n} 个套餐' },
  'group.expand': { en: 'Expand', zh: '展开' },
  'group.collapse': { en: 'Collapse', zh: '收起' },
  'group.summary.free': { en: 'From free', zh: '免费起' },
  'group.summary.from': { en: 'From {symbol}{price}', zh: '{symbol}{price} 起' },
  'group.summary.available': { en: '{n} available', zh: '{n} 个可用' },
  'badge.domesticPayment': { en: 'Domestic payment', zh: '支持国内支付' },
  'badge.intl.title': { en: 'International plan, billed in USD.', zh: '国际站套餐，以美元结算。' },
  'trust.label': { en: 'Confidence', zh: '可信度' },
  'common.unknown': { en: 'Unknown', zh: '未知' },

  // —— News page (news.html / news-page.js) ——
  'news.pageTitle': { en: 'International AI Coding News - CreditsPlan', zh: '国内 AI Coding 动态 - CreditsPlan' },
  'news.brand': { en: 'AI News', zh: 'AI 动态' },
  'news.view.selected': { en: 'Featured', zh: '精选动态' },
  'news.view.all': { en: 'All', zh: '全部动态' },
  'news.view.daily': { en: 'Daily digest', zh: '每日日报' },
  'news.filter.label': { en: 'Filter by category', zh: '分类筛选' },
  'news.cat.all': { en: 'All categories', zh: '全部分类' },
  'news.cat.models': { en: 'Model releases', zh: '模型发布' },
  'news.cat.products': { en: 'Product releases', zh: '产品发布' },
  'news.cat.industry': { en: 'Industry', zh: '行业动态' },
  'news.cat.paper': { en: 'Research', zh: '论文研究' },
  'news.cat.tip': { en: 'Tips & takes', zh: '技巧观点' },
  'news.title': { en: 'AI News', zh: 'AI 动态' },
  'news.search.placeholder': { en: 'Search title / summary...', zh: '搜索标题 / 摘要...' },
  'news.search.aria': { en: 'Search news titles and summaries', zh: '搜索动态标题和摘要' },
  'news.chip.selected': { en: 'Featured', zh: '精选' },
  'news.chip.all': { en: 'All', zh: '全部' },
  'news.error': { en: 'The AI news service is temporarily unavailable. Please try again later.', zh: 'AI 动态服务暂时不可用，请稍后再试。' },
  'news.retry': { en: 'Reload', zh: '重新加载' },
  'news.empty': { en: 'No news yet', zh: '暂无动态数据' },
  'news.loadMore': { en: 'Load more', zh: '加载更多' },
  'news.date.select': { en: 'Select date', zh: '选择日期' },
  'news.loading': { en: 'Loading...', zh: '加载中...' },
  'news.daily.error': { en: 'The AI daily digest is temporarily unavailable. Please try again later.', zh: 'AI 日报服务暂时不可用，请稍后再试。' },
  'news.daily.empty': { en: 'No digest yet', zh: '日报尚未生成' },
  'news.daily.badge': { en: 'AI Daily', zh: 'AI 日报' },
  'news.flashes': { en: 'Flashes', zh: '快讯' },
  'news.tab.selected': { en: 'Featured', zh: '精选' },
  'news.tab.all': { en: 'All', zh: '全部' },
  'news.tab.daily': { en: 'Daily', zh: '日报' },
  'news.region.domestic': { en: 'Domestic', zh: '国内' },
  'news.region.international': { en: 'International', zh: '国际' },
  'news.untitled': { en: 'Untitled update', zh: '未命名动态' },
  'news.summary.empty': { en: 'No summary for this update; open the source link to verify.', zh: '该条动态暂无摘要，请打开来源链接核对。' },
  'news.selectedBadge': { en: 'Featured', zh: '精选' },
  'news.reason': { en: 'Why recommended', zh: '推荐理由' },
  'news.daily.sectionEmpty': { en: 'No updates', zh: '暂无动态' },
  'news.time.justNow': { en: 'just now', zh: '刚刚' },
  'news.time.minutesAgo': { en: '{n}m ago', zh: '{n} 分钟前' },
  'news.time.hoursAgo': { en: '{n}h ago', zh: '{n} 小时前' },
  'news.time.today': { en: 'Today', zh: '今天' },
  'news.time.yesterday': { en: 'Yesterday', zh: '昨天' },
  'news.time.daysAgo': { en: '{n}d ago', zh: '{n} 天前' },
  'news.time.weeksAgo': { en: '{n}w ago', zh: '{n} 周前' },

  // —— Changelog page (changelog.html / system-changelog-page.js) ——
  'changelog.pageTitle': { en: 'Changelog - New brands, plans & features on CreditsPlan', zh: '更新日志 - CreditsPlan 新增品牌、套餐与功能' },
  'changelog.kicker': { en: 'Changelog', zh: 'Changelog / 更新日志' },
  'changelog.title': { en: 'Every content expansion, recorded.', zh: '记录每一次内容扩展。' },
  'changelog.lead': {
    en: 'See which brands, plans and site capabilities CreditsPlan has added, and when key data was verified.',
    zh: '在这里查看 CreditsPlan 新增了哪些品牌、套餐与站点能力，以及重要数据何时完成核验。'
  },
  'changelog.overview.aria': { en: 'Changelog summary', zh: '更新日志摘要' },
  'changelog.overview.updated': { en: 'Last updated', zh: '最近更新' },
  'changelog.overview.count': { en: 'Public records', zh: '公开记录' },
  'changelog.overview.countUnit': { en: 'entries', zh: '次' },
  'changelog.overview.scope': { en: 'Scope', zh: '记录范围' },
  'changelog.overview.scopeValue': { en: 'Brands · Plans · Features', zh: '品牌 · 套餐 · 功能' },
  'changelog.section.kicker': { en: 'All updates', zh: 'All updates' },
  'changelog.section.title': { en: 'All updates', zh: '全部更新' },
  'changelog.section.order': { en: 'Sorted by publish date, newest first', zh: '按发布日期由近到远排列' },
  'changelog.loading.aria': { en: 'Loading changelog', zh: '正在加载更新日志' },
  'changelog.error.title': { en: 'Changelog is temporarily unavailable', zh: '更新日志暂时无法读取' },
  'changelog.error.body': { en: 'Please refresh later, or return to the plans page for currently listed content.', zh: '请稍后刷新页面，或返回套餐页查看当前已收录内容。' },
  'changelog.note': { en: 'The changelog records site content and feature changes; subscribe to ongoing plan price changes via the price-change RSS.', zh: '更新日志记录站点内容与功能变化；套餐价格的持续变化可通过价格变动 RSS 订阅。' },
  'changelog.note.rss': { en: 'price-change RSS', zh: '价格变动 RSS' },
  'changelog.kind.catalog': { en: 'Plans & brands', zh: '套餐与品牌' },
  'changelog.kind.data': { en: 'Data update', zh: '数据更新' },
  'changelog.kind.feature': { en: 'Site feature', zh: '站点功能' },
  'changelog.diff.createPlan': { en: 'New plan', zh: '新增套餐' },
  'changelog.diff.updatePlan': { en: 'Plan update', zh: '更新套餐' },
  'changelog.diff.createModel': { en: 'New model', zh: '新增模型' },
  'changelog.diff.updateModel': { en: 'Model update', zh: '更新模型' },
  'changelog.entry.default': { en: 'Content update', zh: '内容更新' },
  'changelog.empty.title': { en: 'No public records yet', zh: '还没有公开记录' },
  'changelog.empty.body': { en: 'Once the changelog is published in the admin console, it will show here automatically.', zh: '后台发布更新日志后，会自动显示在这里。' },
  'changelog.roadmap.kicker': { en: 'Roadmap', zh: 'Roadmap' },
  'changelog.roadmap.title': { en: 'In progress', zh: '正在推进' },
  'changelog.roadmap.order': { en: 'Feature plans sourced from user feedback; items move into the changelog below once shipped', zh: '功能规划来自用户反馈，上线后自动移入下方更新日志' },
  'changelog.roadmap.status.progress': { en: 'In development', zh: '开发中' },
  'changelog.roadmap.status.planned': { en: 'Planned', zh: '已规划' },
  'changelog.roadmap.status.evaluating': { en: 'Evaluating', zh: '评估中' },
  'changelog.roadmap.votes': { en: '{n} mentions', zh: '{n} 人提及' },
  'changelog.roadmap.votesTitle': { en: 'Mentioned in user comments', zh: '用户评论提及次数' },
  'changelog.roadmap.raised': { en: 'raised {date}', zh: '{date} 提出' },
  'changelog.roadmap.usersMany': { en: '{a}, {b} and {n} others', zh: '{a}、{b} 等 {n} 人' },

  // —— Methodology page (methodology.html) ——
  'method.pageTitle': { en: 'Data verification method & update cadence - CreditsPlan', zh: '数据校对方法与更新频率 - CreditsPlan' },
  'method.kicker': { en: 'METHODOLOGY', zh: 'METHODOLOGY' },
  'method.title': { en: 'Data verification method & update cadence', zh: '数据校对方法与更新频率' },
  'method.summary': {
    en: 'CreditsPlan shows price snapshots as of a manual verification point, not a vendor\u2019s live billing system. The "verified date" on a page is the date that record last completed a source comparison.',
    zh: 'CreditsPlan 展示的是人工核对时间点的价格快照，不是厂商的实时结算系统。页面中的“核对日期”代表该条记录最近一次完成来源比对的日期。'
  },
  'method.h.process': { en: 'How prices are verified', zh: '价格怎么核对' },
  'method.process.1.b': { en: 'Prioritize official sources:', zh: '优先查官方来源：' },
  'method.process.1.t': { en: 'We rely on the vendor\u2019s pricing page, product docs, subscription page or the post-login purchase page, not third-party reposts or search snippets.', zh: '以厂商定价页、产品文档、订阅页或登录后的购买页面为准，不把第三方转载或搜索摘要作为最终价格依据。' },
  'method.process.2.b': { en: 'Confirm the price basis:', zh: '确认价格口径：' },
  'method.process.2.t': { en: 'Record monthly, quarterly, annual, first-month discount, seat pricing, currency and purchase status separately; prices for different cycles are not inferred from each other, and undisclosed info is not filled in.', zh: '分别记录月付、季付、年付、首月优惠、席位计价、币种和购买状态；不同周期的价格不互相推算，未公开的信息不补写。' },
  'method.process.3.b': { en: 'Verify plan conditions too:', zh: '同时核对套餐条件：' },
  'method.process.3.t': { en: 'Cross-check quotas, reset cycles, supported models, payment methods, invoicing and refund limits so we don\u2019t record price without applicable conditions.', zh: '对照额度、重置周期、支持模型、国内支付、发票和退款限制，避免只记录价格而遗漏适用条件。' },
  'method.process.4.b': { en: 'Publish after review:', zh: '复查后发布：' },
  'method.process.4.t': { en: 'Compare the structured record against the source page once more, update the "verified date" after confirming; anything still ambiguous is marked "pending" or "see official site".', zh: '将结构化记录与来源页面再比对一次，确认无误后更新“核对日期”；仍有歧义的内容会标为“待核对”或提示以官网为准。' },
  'method.h.fields': { en: 'How to read the fields', zh: '页面字段如何理解' },
  'method.field.verified.t': { en: 'Verified date', zh: '核对日期' },
  'method.field.verified.d': { en: 'The date this plan was last manually compared against official sources, not the vendor page\u2019s publish date.', zh: '该套餐最近一次人工比对官方来源的日期，不等同于厂商页面的发布日期。' },
  'method.field.history.t': { en: 'Price history', zh: '价格历史' },
  'method.field.history.d': { en: 'Currently we archive only monthly price and currency. After each verification, a record is added if the monthly price changed; stable periods also keep monthly checkpoints.', zh: '目前只归档月费和币种。每次完成核对后，如月费变化会新增记录；价格未变时也会按月保留稳定期记录点。' },
  'method.field.pending.t': { en: 'Pending / see official site', zh: '待核对 / 以官网为准' },
  'method.field.pending.d': { en: 'Means official info is missing, unclear, or not yet re-reviewed. Before buying, open the official source to confirm live price and billing terms.', zh: '表示官方信息缺失、口径不清或尚未完成复查。购买前请打开对应的官方来源确认实时价格与结算条款。' },
  'method.h.cadence': { en: 'How often it updates', zh: '多久更新一次' },
  'method.cadence.1.b': { en: 'at least once every 30 days', zh: '至少每 30 天复核一次' },
  'method.cadence.1.pre': { en: 'Listed plans are in principle re-reviewed ', zh: '已收录套餐原则上' },
  'method.cadence.1.post': { en: '. We review earlier when a vendor changes prices, plans go on/offline, rules change, or on valid feedback.', zh: '。遇到厂商调价、套餐上下线、规则变更或有效反馈时，会提前复核。' },
  'method.cadence.2': { en: 'Data is not synced in real time. Whether it is updated depends on the "verified date" next to each plan.', zh: '数据不是实时同步。是否已更新，请以具体套餐旁的“核对日期”为准。' },
  'method.h.feedback': { en: 'Found an error?', zh: '发现错误？' },
  'method.feedback.body': { en: 'Please include the plan name, official page link, the price or rule you saw, and the date you found it, so we can re-verify quickly.', zh: '请附上套餐名称、官方页面链接、你看到的价格或规则，以及发现日期，方便我们快速复核。' },

  // —— Shared value formatters (public-data.js / plan-utils.js) ——
  'common.pending': { en: 'Pending', zh: '待更新' },
  'common.official': { en: 'See official site', zh: '请以官网为准' },
  'common.perMillionTokens': { en: 'million tokens', zh: '百万 tokens' },
  'common.perMonth': { en: 'mo', zh: '月' },
  'common.perQuarter': { en: 'qtr', zh: '季' },
  'common.perYear': { en: 'yr', zh: '年' },
  'currency.usd': { en: 'USD', zh: '美元' },
  'currency.cny': { en: 'CNY', zh: '人民币' },
  // —— Model scenario filter labels (public-data.js) ——
  'scenario.lowCost': { en: 'Low cost', zh: '低成本' },
  'scenario.longContext': { en: 'Long context', zh: '长上下文' },
  'scenario.multimodal': { en: 'Multimodal', zh: '多模态' },
  'scenario.enterpriseApi': { en: 'Enterprise API', zh: '企业 API' },
  'scenario.personalUse': { en: 'Personal use', zh: '个人使用' },

  // —— Plan detail panel (plans-detail.js) ——
  'planType.codingPlan': { en: 'Coding Plan', zh: '编程套餐' },
  'planType.tokenPlan': { en: 'Token Plan', zh: 'Token 套餐' },
  'planType.agentPlan': { en: 'Agent Plan', zh: 'Agent 套餐' },
  'planType.creditsPlan': { en: 'Credits Plan', zh: 'Credits 套餐' },
  'planType.apiPackage': { en: 'Pay as you go', zh: '按量付费' },
  'price.annual': { en: 'Annual', zh: '连续包年' },
  'price.quarterly': { en: 'Quarterly', zh: '连续包季' },
  'price.monthly': { en: 'Monthly', zh: '连续包月' },
  'price.byYear': { en: 'Billed yearly', zh: '按年计费' },
  'price.byQuarter': { en: 'Billed quarterly', zh: '按季计费' },
  'detail.type': { en: 'Plan type', zh: '套餐类型' },
  'detail.supportedModels': { en: 'Supported models', zh: '支持模型' },
  'detail.firstMonth': { en: 'First-month price', zh: '首月价格' },
  'detail.domesticPay': { en: 'Domestic payment', zh: '国内支付' },
  'detail.includedCalls': { en: 'Included calls', zh: '包含调用量' },
  'detail.fiveHourReq': { en: '5-hour requests', zh: '5小时请求' },
  'detail.weeklyReq': { en: 'Weekly requests', zh: '周请求' },
  'detail.monthlyReq': { en: 'Monthly requests', zh: '月请求' },
  'detail.fiveHourTokens': { en: 'Measured 5-hour tokens', zh: '5小时实测 Tokens' },
  'detail.weeklyTokens': { en: 'Measured weekly tokens', zh: '周实测 Tokens' },
  'detail.monthlyTokens': { en: 'Measured monthly tokens', zh: '月实测 Tokens' },
  'detail.tokenLimit': { en: 'Token limit', zh: 'Token上限' },
  'detail.benefits': { en: 'Benefits', zh: '权益' },
  'detail.inputPrice': { en: 'Input price', zh: '输入价格' },
  'detail.outputPrice': { en: 'Output price', zh: '输出价格' },
  'detail.payCurrency': { en: 'Billing currency', zh: '支付币种' },
  'detail.rmbRecharge': { en: 'CNY top-up', zh: '人民币充值' },
  'detail.invoice': { en: 'Invoice support', zh: '发票支持' },
  'detail.creditsLimit': { en: 'Credits limit', zh: 'Credits限制' },
  'detail.concurrency': { en: 'Concurrency limit', zh: '并发限制' },
  'detail.resetRule': { en: 'Reset rule', zh: '刷新规则' },
  'detail.refund': { en: 'Refund policy', zh: '退款政策' },
  'detail.rating': { en: 'Rating', zh: '评分' },
  'detail.tags': { en: 'Tags', zh: '标签' },
  'detail.suitableScene': { en: 'Use cases', zh: '适用场景' },
  'detail.recommendedFor': { en: 'Recommended for', zh: '适合' },
  'detail.caution': { en: 'Caution', zh: '注意' },
  'detail.notes': { en: 'Notes', zh: '备注' },
  'detail.empty': { en: 'No additional info beyond the table.', zh: '暂无表格外补充信息。' },
  'detail.source': { en: 'Source', zh: '数据来源' },
  'detail.sourceOfficial': { en: 'Official', zh: '官方' },
  'detail.sourceMaintained': { en: 'Curated', zh: '后台维护' },
  'detail.verifiedOn': { en: 'Verified', zh: '核对日期' },
  'detail.openOfficial': { en: 'Open official site', zh: '打开官网' },
  'common.supported': { en: 'Yes', zh: '支持' },
  'common.required': { en: 'Required', zh: '需要' },
  'common.notSupported': { en: 'No', zh: '否' },

  // —— Generated SEO pages chrome (build-seo-pages.mjs output) ——
  'seo.breadcrumbAria': { en: 'Breadcrumb', zh: '面包屑' },
  'seo.home': { en: 'Home', zh: '首页' },
  'seo.brands': { en: 'Brands', zh: '品牌' },
  'seo.brandsH1': { en: 'Verified international AI Coding brands', zh: '已核对的国际 AI Coding 品牌' },
  'seo.brandsIntro': { en: 'The plan prices, quotas and representative models below were verified by CreditsPlan against official pages. Other brands are still under review — browse them in the <a href="/" class="text-brand-600 hover:text-brand-800 dark:text-brand-400">home comparison table</a>.', zh: '下列品牌的套餐价格、额度、代表模型均由 CreditsPlan 手工比对官方页面完成核对。其它品牌数据仍在核对中，可在<a href="/" class="text-brand-600 hover:text-brand-800 dark:text-brand-400">首页对比表</a>浏览。' },
  'seo.pricingTiers': { en: 'Pricing tiers', zh: '价格梯度' },
  'seo.planBenefits': { en: 'Plan benefits', zh: '套餐权益' },
  'seo.bestFor': { en: 'Best for', zh: '适合人群' },
  'seo.risks': { en: 'Risks', zh: '注意事项' },
  'seo.billingRenewal': { en: 'Billing & renewal rules', zh: '计费与续费规则' },
  'seo.resetRule': { en: 'Reset rule: ', zh: '刷新规则：' },
  'seo.refundPolicy': { en: 'Refund policy: ', zh: '退款政策：' },
  'seo.morePlans': { en: 'More plans', zh: '更多套餐' },
  'seo.source': { en: 'Source:', zh: '数据来源：' },
  'seo.verified': { en: 'Verified:', zh: '核对日期：' },
  'seo.officialPrevail': { en: 'If it differs from the latest official page, the official site prevails.', zh: '如与最新官方页面不一致，以官网为准。' },
  'seo.goOfficial': { en: 'Go to official purchase page →', zh: '前往官方购买页 →' },
  'seo.priceChanges': { en: 'Price changes', zh: '价格变动' },
  'seo.priceChangesH1': { en: 'Price change timeline', zh: '价格变动时间线' },
  'seo.priceChangesIntro': { en: 'Official pricing pages only ever show the current price. CreditsPlan keeps every verified change — price increases, decreases, first listings and delistings all live here.', zh: '官方定价页永远只展示当前价格，CreditsPlan 持续核对并保留每次调价记录：涨价、降价、首次收录与取消公开定价都在这里。' },
  'seo.pcSubscribeRss': { en: 'Subscribe to price-change RSS →', zh: '订阅价格变动 RSS →' },
  'seo.pcViewAll': { en: 'View all price changes →', zh: '查看全站价格变动 →' },
  'seo.pcRecent': { en: 'Recent price changes', zh: '最近价格变动' },
  'seo.pcTimeline': { en: 'Price change timeline', zh: '价格变动时间线' },
  'seo.pcTimelineNote': { en: 'Official pricing pages only show the current price — CreditsPlan keeps every verified change.', zh: '官方定价页只展示当前价格，CreditsPlan 保留每次核对到的调价记录。' },
  'seo.pcFirstRecorded': { en: 'First recorded', zh: '首次收录' },
  'seo.pcNoPublicPrice': { en: 'No public price', zh: '未公开定价' },
  'seo.pcInfoAdjusted': { en: 'Currency/info adjusted', zh: '币种/信息调整' },
  'seo.pcEmpty': { en: 'No price changes recorded yet.', zh: '暂无价格变动记录。' },
  'seo.priceMonthly': { en: 'Monthly', zh: '连续包月' },
  'seo.priceFirstMonth': { en: 'First month', zh: '首月' },
  'seo.priceQuarterly': { en: 'Quarterly', zh: '连续包季' },
  'seo.priceAnnualOneTime': { en: 'Annual (one-time)', zh: '年付（一次性）' },
  'seo.priceAnnualRecurring': { en: 'Annual (recurring)', zh: '年付（续费）' },
  'seo.noBenefits': { en: 'The official page does not detail benefits; please see the official site.', zh: '官方页面未详列权益，请以官网为准。' },

  // —— Deals page (/deals/, build-seo-pages.mjs) & site-wide deals banner ——
  'deals.pageTitle': { en: 'Official Deals - CreditsPlan', zh: '官方活动 - CreditsPlan' },
  'deals.kicker': { en: 'Deals / Official Promotions', zh: '活动 / 官方优惠' },
  'deals.title': { en: 'Never miss an official deal.', zh: '官方优惠活动，一站掌握。' },
  'deals.lead.empty': {
    en: 'A roundup of official promotions from AI brands (limited-time discounts, top-up bonuses, new user gifts, referral rewards). New deals are listed here as soon as we verify them.',
    zh: '汇总 AI 品牌的官方优惠活动（限时折扣、充值赠送、新人礼包、邀请奖励）。活动一经核实即会收录到这里。'
  },
  'deals.lead.active': {
    en: 'There are currently <strong class="text-slate-900 dark:text-white">{n} official deals running</strong>. All come from official announcements — click "Join" to visit the official activity page.',
    zh: '当前有 <strong class="text-slate-900 dark:text-white">{n} 个官方活动正在进行</strong>。全部来自官方公告——点击「参加」前往官方活动页。'
  },
  'deals.overview.aria': { en: 'Deals summary', zh: '活动概览' },
  'deals.overview.running': { en: 'Running', zh: '进行中' },
  'deals.overview.upcoming': { en: 'Upcoming', zh: '即将开始' },
  'deals.overview.updated': { en: 'Last updated', zh: '最近更新' },
  'deals.subscribeRss': { en: 'Subscribe to deals RSS →', zh: '订阅活动 RSS →' },
  'deals.sidebar.aria': { en: 'Deals navigation', zh: '活动导航' },
  'deals.sidebar.brand': { en: 'Official Deals', zh: '官方活动' },
  'deals.sidebar.rss': { en: 'Subscribe to deals RSS', zh: '订阅活动 RSS' },
  'deals.sidebar.note': {
    en: 'Deal information comes from official announcements. Eligibility and terms are subject to the official activity page.',
    zh: '活动信息均来自各品牌官方公告，参与资格与细则以官方活动页为准。'
  },
  'deals.sidebar.updated': { en: 'Last updated', zh: '最后更新' },
  'deals.toolbar.searchPlaceholder': { en: 'Search deals by title, brand or content…', zh: '搜索活动标题、品牌或内容…' },
  'deals.toolbar.searchAria': { en: 'Search deals', zh: '搜索活动' },
  'deals.toolbar.all': { en: 'All', zh: '全部' },
  'deals.toolbar.countTpl': { en: '{n} deals found', zh: '找到 {n} 个活动' },
  'deals.toolbar.empty': { en: 'No matching deals. Try a different keyword or filter.', zh: '没有匹配的活动，换个关键词或筛选试试。' },
  'deals.view.status': { en: 'By status', zh: '按状态' },
  'deals.view.timeline': { en: 'By time', zh: '按时间' },
  'deals.timeline.today': { en: 'Today', zh: '今天' },
  'deals.timeline.yesterday': { en: 'Yesterday', zh: '昨天' },
  'deals.timeline.noDate': { en: 'Ongoing', zh: '长期' },
  'deals.group.running': { en: 'Running now', zh: '进行中' },
  'deals.group.upcoming': { en: 'Upcoming', zh: '即将开始' },
  'deals.group.ended': { en: 'Ended', zh: '已结束' },
  'deals.ongoing': { en: 'Ongoing', zh: '长期有效' },
  'deals.join': { en: 'Join', zh: '参加' },
  'deals.note': {
    en: 'Deal information comes from official announcements; eligibility and terms are subject to the official activity page. We also track plan price changes — subscribe to the <a class="focus-ring" href="/price-changes.xml">price-change RSS</a>.',
    zh: '活动信息来自官方公告，参与条件与条款以官方活动页为准。我们也在持续跟踪套餐价格变化——可订阅<a class="focus-ring" href="/price-changes.xml">价格变动 RSS</a>。'
  },
  'deals.type.discount': { en: 'Discount', zh: '限时折扣' },
  'deals.type.recharge': { en: 'Top-up Bonus', zh: '充值赠送' },
  'deals.type.gift': { en: 'New User Gift', zh: '新人礼包' },
  'deals.type.invite': { en: 'Referral Reward', zh: '邀请奖励' },
  'deals.type.other': { en: 'Promotion', zh: '优惠活动' },
  'deals.banner.label': { en: 'Official Deals', zh: '官方活动' },
  'deals.banner.viewAll': { en: 'View all →', zh: '查看全部 →' },

  // —— AIHot categories / dates (aihot-service.js) ——
  'aihot.cat.models': { en: 'Model releases / updates', zh: '模型发布/更新' },
  'aihot.cat.products': { en: 'Product releases / updates', zh: '产品发布/更新' },
  'aihot.cat.industry': { en: 'Industry', zh: '行业动态' },
  'aihot.cat.paper': { en: 'Research', zh: '论文研究' },
  'aihot.cat.tip': { en: 'Tips & takes', zh: '技巧与观点' },
  'aihot.date.unknown': { en: 'Unknown date', zh: '未知日期' },
  'aihot.date.today': { en: 'Today', zh: '今天' },
  'aihot.date.yesterday': { en: 'Yesterday', zh: '昨天' },
  'aihot.date.daysAgo': { en: '{n}d ago', zh: '{n}天前' },
};

// 检测文本是否含中日韩统一表意文字（含扩展 A 与兼容区）。
export function hasCjk(value) {
  return /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(String(value ?? ''));
}

// 英文环境展示层兜底：数据侧缺英文字段时，先尝试把常见中文额度/文案模式
// 机械转为英文；转换后仍含中文则返回空串（交由调用方回退下一字段或占位），
// 保证英文界面绝不出现中文。
export function toEnglishDisplay(text) {
  let value = String(text ?? '').trim();
  if (!value) return '';
  if (getLang() !== 'en') return value;
  if (!hasCjk(value)) return value;
  value = value
    .replace(/(\d+(?:\.\d+)?)\s*万/g, (_, n) => String(Math.round(parseFloat(n) * 10000)))
    .replace(/按模型不同/g, 'Varies by model')
    .replace(/约/g, '≈')
    .replace(/估算/g, 'estimated')
    .replace(/请求|次/g, 'requests')
    .replace(/：/g, ': ')
    .replace(/；/g, '; ')
    .replace(/、|，/g, ', ')
    .replace(/（/g, ' (')
    .replace(/）/g, ')')
    .replace(/[ \t]+/g, ' ')
    .trim();
  return hasCjk(value) ? '' : value;
}

export function t(key, vars) {
  const entry = translations[key];
  let value = entry ? (entry[getLang()] ?? entry.en ?? key) : key;
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement));
    }
  }
  return value;
}

// Apply translations to any static markup carrying data-i18n* attributes.
export function applyI18n(root = document) {
  const scope = root || document;
  scope.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  scope.querySelectorAll('[data-i18n-html]').forEach(el => {
    // 可选 data-i18n-vars（JSON 对象）为译文填充 {name} 占位符，如活动数 {n}。
    let vars;
    const varsAttr = el.getAttribute('data-i18n-vars');
    if (varsAttr) {
      try { vars = JSON.parse(varsAttr); } catch { /* 非法 JSON 时按无变量处理 */ }
    }
    el.innerHTML = t(el.getAttribute('data-i18n-html'), vars);
  });
  scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
      const [attr, key] = pair.split(':').map(part => part && part.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
  scope.querySelectorAll('[data-locale]').forEach(el => {
    const lang = getLang();
    // 英文环境绝不回退中文文案：缺失 data-locale-en 时保留标记原有的（英文）默认文本。
    const value = el.getAttribute(`data-locale-${lang}`)
      || (lang === 'zh' ? el.getAttribute('data-locale-en') : '')
      || '';
    if (!value) return;
    if (el.tagName === 'META') {
      el.setAttribute('content', value);
    } else {
      el.textContent = value;
    }
  });
  // 官方活动链接按语言区分：data-href-en / data-href-zh（缺失时回退 en，再回退原 href）。
  scope.querySelectorAll('a[data-href-en], a[data-href-zh]').forEach(el => {
    const lang = getLang();
    const value = el.getAttribute(`data-href-${lang}`) || el.getAttribute('data-href-en') || '';
    if (value) el.setAttribute('href', value);
  });
  // Translate server-rendered status badges by their status code, while
  // keeping the original (Chinese) text as a fallback for unknown codes.
  scope.querySelectorAll('[data-status]').forEach(el => {
    const code = el.getAttribute('data-status');
    if (!code) return;
    const label = t(`status.${code}`);
    if (!label.startsWith('status.')) el.textContent = label;
  });
  if (scope === document) {
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) document.title = t(titleKey);
  }
}

export function initI18n() {
  document.documentElement.lang = getLang() === 'zh' ? 'zh-CN' : 'en';
}
