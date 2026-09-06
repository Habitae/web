export const gtmId = import.meta.env.VITE_GTM_ID ?? '';
export const analyticsAvailable = /^GTM-[A-Z0-9]+$/.test(gtmId);
let loaded = false;
let granted = false;

declare global { interface Window { dataLayer?: unknown[]; } }
function command(..._args: unknown[]) { window.dataLayer!.push(arguments); }

export function setAnalyticsConsent(allowed: boolean) {
  granted = allowed && analyticsAvailable;
  if (!granted) {
    if (loaded) {
      command('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      // Unloading the page stops already executed tags as well as future events.
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (!/^(_ga|_gid|_gat)(_|$)/.test(name)) continue;
        const parts = window.location.hostname.split('.');
        const domains = ['', ...parts.map((_, i) => `; Domain=${parts.slice(i).join('.')}`)];
        for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
      }
      window.location.reload();
    }
    return;
  }
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  command('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  command('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

export function trackWaitlistSignup(language: 'pt' | 'en') {
  if (granted) window.dataLayer?.push({ event: 'waitlist_signup', language });
}
