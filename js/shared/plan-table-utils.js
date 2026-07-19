export const EMPTY_TABLE_VALUE = '—';

const UNKNOWN_PRICE_VALUES = new Set(['待更新', '待确认', '请以官网为准']);

export function planTablePriceValue(value) {
  const text = String(value ?? '').trim();
  return text && !UNKNOWN_PRICE_VALUES.has(text) ? text : EMPTY_TABLE_VALUE;
}

export function createPlanTableFilterState(column = '', value = '') {
  const normalizedValue = String(value ?? '').trim();
  return {
    column: normalizedValue ? String(column ?? '').trim() : '',
    value: normalizedValue
  };
}

export function hasActivePlanTableFilter(state) {
  return Boolean(state?.column && state?.value);
}

export function filterPlansByTableState(plans, state, valueForColumn) {
  if (!hasActivePlanTableFilter(state)) return plans;
  return plans.filter(plan => valueForColumn(plan, state.column) === state.value);
}
