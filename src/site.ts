function deploymentPrefix() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

  const moduleScript = document.querySelector<HTMLScriptElement>('script[type="module"][src]');
  if (!moduleScript) return '';

  const scriptPath = new URL(moduleScript.src, window.location.href).pathname;
  const assetsMarker = scriptPath.lastIndexOf('/assets/');
  return assetsMarker === -1 ? '' : scriptPath.slice(0, assetsMarker);
}

export type SiteLanguage = 'pt' | 'en' | 'fr';

export function languageFromUrl(): SiteLanguage | null {
  const pathname = appPathname();
  if (/^\/help(?:\/|$)/.test(pathname)) return 'en';
  if (/^\/aide(?:\/|$)/.test(pathname)) return 'fr';
  if (/^\/ajuda(?:\/|$)/.test(pathname)) return 'pt';
  if (typeof window === 'undefined') return null;
  const language = new URLSearchParams(window.location.search).get('lang');
  if (language === 'pt' || language === 'en' || language === 'fr') return language;
  const route = window.location.pathname.match(/\/(en|fr)(?:\/|$)/)?.[1];
  return route === 'en' || route === 'fr' ? route : null;
}

export function sitePath(path = '/', language?: SiteLanguage) {
  const prefix = deploymentPrefix();
  const url = new URL(path, 'https://habitae.pt');
  if (language) url.pathname = url.pathname.replace(/^\/(?:(?:en|fr)\/)?termos(?=\/|$)/, '/terms').replace(/^\/(?:(?:en|fr)\/)?privacidade(?=\/|$)/, '/privacy');
  const isHelp = /^\/(?:help|ajuda|aide)(?:\/|$)/.test(url.pathname);
  if (language === 'fr' && isHelp) url.pathname = url.pathname.replace(/^\/(?:help|ajuda)(?=\/|$)/, '/aide');
  if (language && !isHelp) {
    url.pathname = url.pathname.replace(/^\/(?:en|fr)(?:\/|$)/, '/');
    if (language !== 'pt') url.pathname = `/${language}${url.pathname}`;
    url.searchParams.delete('lang');
  }
  if (!url.pathname.split('/').pop()?.includes('.') && !url.pathname.endsWith('/')) url.pathname += '/';
  return `${prefix}${url.pathname}${url.search}${url.hash}`;
}

export function siteAsset(filename: string) {
  return sitePath(filename);
}

export function appPathname() {
  const prefix = deploymentPrefix();
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;

  if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return pathname.slice(prefix.length).replace(/^\/(?:en|fr)(?:\/|$)/, '/') || '/';
  }

  return pathname.replace(/^\/(?:en|fr)(?:\/|$)/, '/');
}

export const helpRoot = (language: SiteLanguage) => ({ pt: '/ajuda', en: '/help', fr: '/aide' })[language];
