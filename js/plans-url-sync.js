export function readPlanScopeFromLocation(state) {
  try {
    const params = new URLSearchParams(globalThis.location?.search || '');
    if (params.get('rmb') === '1') state.rmb = 'yes';
    if (params.get('invoice') === '1') state.invoice = 'yes';
    const access = String(params.get('access') || '').toLowerCase();
    if (access === 'easy' || access === 'medium' || access === 'hard') state.access = access;
    if (params.get('intl') === '1') state.includeIntl = true;
  } catch { /* ignore invalid locations */ }
}

export function syncPlanScopeToLocation(state) {
  if (typeof globalThis.history?.replaceState !== 'function') return;
  try {
    const url = new URL(globalThis.location.href);
    const params = url.searchParams;
    if (state.rmb === 'yes') params.set('rmb', '1'); else params.delete('rmb');
    if (state.invoice === 'yes') params.set('invoice', '1'); else params.delete('invoice');
    if (state.access !== 'any') params.set('access', state.access); else params.delete('access');
    if (state.includeIntl) params.set('intl', '1'); else params.delete('intl');
    globalThis.history.replaceState(null, '', `${url.pathname}${params.toString() ? `?${params.toString()}` : ''}${url.hash}`);
  } catch { /* ignore invalid locations */ }
}
