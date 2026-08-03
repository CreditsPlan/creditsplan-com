// shared/quota-utils.js — 套餐额度解析与等效单价计算（国际站）
// 供套餐对比表格（plans-table.js）复用。额度字段为自由文本（次 / Credits / 积分 / tokens 混合），
// 解析时只做数字提取；等效单价仅在可可靠归一为「月请求数」时计算，避免跨单位误导对比。
// 国际站单价按套餐本币展示（USD 显示 $，CNY 显示 ¥）。

// USD 套餐参与比较时的固定折算汇率（仅用于横向比较，展示保留原币价）
export const USD_TO_CNY = 7.2;

// ---------- 额度解析：自由文本 → 数字 ----------

export function parseQuota(text) {
  const value = String(text || '').trim();
  if (!value) return null;
  if (/未指定|未明确|未说明|无明确|未公开|不适用|待更新|待确认/.test(value)) return null;
  const cleaned = value.replace(/,/g, '');
  // 提取首个有效数字；跳过紧跟在字母后的版本号（如 "DeepSeek V4" 中的 4）
  const pattern = /([A-Za-z]?)(\d+(?:\.\d+)?)\s*(万)?/g;
  let match;
  while ((match = pattern.exec(cleaned)) !== null) {
    if (match[1]) continue;
    const number = parseFloat(match[2]) * (match[3] === '万' ? 10000 : 1);
    if (Number.isFinite(number) && number > 0) return number;
  }
  return null;
}

// 月额度归一：优先月额度，其次周额度 ×4.3，再次 5 小时窗口 ×30（每天 1 个窗口保守估算）
export function monthlyQuota(plan) {
  const monthly = parseQuota(plan.monthlyRequests);
  if (monthly != null) {
    return { value: monthly, estimated: /约|估算|≈|approx|estimat/i.test(plan.monthlyRequests), basis: '月额度' };
  }
  const weekly = parseQuota(plan.weeklyRequests);
  if (weekly != null) {
    return { value: Math.round(weekly * 4.3), estimated: true, basis: '按周额度估算' };
  }
  const fiveHours = parseQuota(plan.fiveHoursRequests);
  if (fiveHours != null) {
    return { value: fiveHours * 30, estimated: true, basis: '按 5 小时窗口估算' };
  }
  return null;
}

// ---------- 有效月价：月/季/年折算取最低 ----------

export function effectiveMonthlyPrice(plan) {
  const candidates = [
    { value: plan.monthlyPriceValue, cycle: '月付' },
    { value: plan.quarterlyMonthlyPriceValue, cycle: '季付折算' },
    { value: plan.annualMonthlyPriceValue, cycle: '年付折算' }
  ].filter(item => Number.isFinite(item.value) && item.value >= 0);
  if (!candidates.length) return null;
  const best = candidates.reduce((a, b) => (b.value < a.value ? b : a));
  const isUsd = plan.monthlyCurrency === 'USD';
  return {
    value: best.value,
    cycle: best.cycle,
    currency: plan.monthlyCurrency || 'CNY',
    cny: isUsd ? best.value * USD_TO_CNY : best.value
  };
}

// ---------- 表格展示：额度文本与等效单价 ----------

function truncateQuota(text, max = 22) {
  const value = String(text || '').trim();
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

// 整串占位文案（如「未明确说明」）不视为有效额度，避免挡住后备字段的真实值
const QUOTA_PLACEHOLDER_RE = /^(未明确说明|未明确|未说明|未指定|未公开|无明确说明|无明确|不适用|待更新|待确认|暂无|—|-)[。.]?$/;

function meaningfulQuotaText(value) {
  const text = String(value || '').trim();
  return QUOTA_PLACEHOLDER_RE.test(text) ? '' : text;
}

// 额度展示文本：优先月额度，其次包含额度（取首段），再次 Token 上限；占位文案视为无值。
// 返回 { text: 截断展示文本, full: 完整文本（供 tooltip）, field: 取值字段（供展开详情去重） }，无则返回 null。
export function planQuotaDisplay(plan) {
  const monthly = meaningfulQuotaText(plan.monthlyRequests);
  if (monthly) return { text: truncateQuota(monthly), full: monthly, field: 'monthlyRequests' };
  const included = meaningfulQuotaText(plan.includedCalls);
  if (included) {
    const first = included.split(/[；;。]/)[0].trim();
    return { text: truncateQuota(first), full: included, field: 'includedCalls' };
  }
  const tokenLimit = meaningfulQuotaText(plan.tokenLimit);
  if (tokenLimit) return { text: truncateQuota(tokenLimit), full: tokenLimit, field: 'tokenLimit' };
  return null;
}

function formatUnitPrice(value) {
  if (value >= 100) return Math.round(value).toLocaleString('en-US');
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(2);
}

// 等效单价：有效月价（本币）÷ 月额度 × 1000（每千次请求成本，按套餐本币）。
// 仅当月额度可可靠归一时返回 { text, estimated }，否则返回 null。
export function planUnitPriceDisplay(plan) {
  const quota = monthlyQuota(plan);
  const price = effectiveMonthlyPrice(plan);
  if (!quota || !price || !(quota.value > 0)) return null;
  const per1k = (price.value / quota.value) * 1000;
  const symbol = price.currency === 'USD' ? '$' : '¥';
  return {
    text: `≈${symbol}${formatUnitPrice(per1k)}/1K`,
    estimated: quota.estimated
  };
}
