const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1']);

export function isLocalHostname(hostname = globalThis.location?.hostname || '') {
  const normalized = String(hostname).trim().toLowerCase().replace(/^\[|\]$/g, '');
  return LOCAL_HOSTNAMES.has(normalized) || normalized.endsWith('.localhost');
}

export function modelDataUrl(hostname = globalThis.location?.hostname || '') {
  return isLocalHostname(hostname) ? '/api/models' : '/data.json';
}
