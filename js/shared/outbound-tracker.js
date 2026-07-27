// 一方访问与外链点击埋点：同源 1x1 gif，兼容严格 CSP (img-src 'self')。
// 不阻塞页面或跳转；不做重试；失败静默。

const BEACON_URL = '/b.gif';
const VISITOR_STORAGE_KEY = 'creditsplan.analytics.visitor';
const SEARCH_HOSTS = [
  'baidu.com',
  'bing.com',
  'duckduckgo.com',
  'shenma.com',
  'sm.cn',
  'so.com',
  'sogou.com',
];

function fire(payload) {
  try {
    const qs = new URLSearchParams(payload).toString();
    // 使用 Image 而非 fetch/sendBeacon：
    //   1) 只需 img-src 'self'，兼容严格 CSP；
    //   2) 浏览器在页面卸载/新 tab 打开时不会中断已发起的图片请求。
    const beacon = new window.Image();
    beacon.referrerPolicy = 'origin';
    beacon.src = `${BEACON_URL}?${qs}&_=${Date.now()}`;
  } catch (_) {
    // 埋点绝不能影响主流程
  }
}

function createVisitorId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  if (window.crypto?.getRandomValues) {
    const values = window.crypto.getRandomValues(new Uint32Array(4));
    return Array.from(values, value => value.toString(16).padStart(8, '0')).join('');
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function getVisitorId() {
  try {
    const stored = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (stored) return stored;
    const visitorId = createVisitorId();
    window.localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
    return visitorId;
  } catch (_) {
    return '';
  }
}

function isSearchHost(hostname) {
  const host = hostname.toLowerCase();
  if (host === 'google.com' || host.startsWith('google.') || host.includes('.google.')) return true;
  return SEARCH_HOSTS.some(searchHost => host === searchHost || host.endsWith(`.${searchHost}`));
}

function getTrafficSource() {
  if (!document.referrer) return { channel: 'direct', refHost: '' };
  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin) {
      return { channel: 'internal', refHost: referrer.hostname };
    }
    return {
      channel: isSearchHost(referrer.hostname) ? 'search' : 'referral',
      refHost: referrer.hostname,
    };
  } catch (_) {
    return { channel: 'referral', refHost: '' };
  }
}

let pageViewSent = false;
export function trackPageView() {
  if (pageViewSent || typeof document === 'undefined') return;
  // Speculation Rules 预渲染阶段不发送 pageview，等激活后再发
  if (document.prerendering) {
    document.addEventListener('prerenderingchange', () => trackPageView(), { once: true });
    return;
  }
  pageViewSent = true;
  const source = getTrafficSource();
  fire({
    event: 'pageview',
    path: window.location.pathname || '/',
    channel: source.channel,
    ref_host: source.refHost,
    vid: getVisitorId(),
  });
}

function onClick(event) {
  const anchor = event.target && event.target.closest
    ? event.target.closest('a[data-track="plan-out"]')
    : null;
  if (!anchor) return;
  fire({
    event: 'outbound',
    planId: anchor.dataset.planId || '',
    brand: anchor.dataset.brand || '',
    src: window.location.pathname || '',
  });
}

let installed = false;
export function installOutboundTracker() {
  if (installed || typeof document === 'undefined') return;
  document.addEventListener('click', onClick, { capture: true });
  installed = true;
}
