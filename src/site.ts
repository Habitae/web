function deploymentPrefix() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

  const moduleScript = document.querySelector<HTMLScriptElement>('script[type="module"][src]');
  if (!moduleScript) return '';

  const scriptPath = new URL(moduleScript.src, window.location.href).pathname;
  const assetsMarker = scriptPath.lastIndexOf('/assets/');
  return assetsMarker === -1 ? '' : scriptPath.slice(0, assetsMarker);
}

export type SiteLanguage = 'pt' | 'en' | 'fr' | 'es';

export function languageFromUrl(): SiteLanguage | null {
  const pathname = appPathname();
  if (/^\/help(?:\/|$)/.test(pathname)) return 'en';
  if (/^\/aide(?:\/|$)/.test(pathname)) return 'fr';
  if (/^\/ayuda(?:\/|$)/.test(pathname)) return 'es';
  if (/^\/ajuda(?:\/|$)/.test(pathname)) return 'pt';
  if (typeof window === 'undefined') return null;
  const language = new URLSearchParams(window.location.search).get('lang');
  if (language === 'pt' || language === 'en' || language === 'fr' || language === 'es') return language;
  const route = window.location.pathname.match(/\/(en|fr|es)(?:\/|$)/)?.[1];
  return route === 'en' || route === 'fr' || route === 'es' ? route : null;
}

export function sitePath(path = '/', language?: SiteLanguage) {
  const prefix = deploymentPrefix();
  const url = new URL(path, 'https://habitae.pt');
  if (language) url.pathname = url.pathname.replace(/^\/(?:(?:en|fr|es)\/)?termos(?=\/|$)/, '/terms').replace(/^\/(?:(?:en|fr|es)\/)?privacidade(?=\/|$)/, '/privacy');
  const isHelp = /^\/(?:help|ajuda|aide|ayuda)(?:\/|$)/.test(url.pathname);
  if (language === 'fr' && isHelp) url.pathname = url.pathname.replace(/^\/(?:help|ajuda|ayuda)(?=\/|$)/, '/aide');
  if (language === 'es' && isHelp) url.pathname = url.pathname.replace(/^\/(?:help|ajuda|aide)(?=\/|$)/, '/ayuda');
  if (language && !isHelp) {
    url.pathname = url.pathname.replace(/^\/(?:en|fr|es)(?:\/|$)/, '/');
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
    return pathname.slice(prefix.length).replace(/^\/(?:en|fr|es)(?:\/|$)/, '/') || '/';
  }

  return pathname.replace(/^\/(?:en|fr|es)(?:\/|$)/, '/');
}

export const helpRoot = (language: SiteLanguage) => ({ pt: '/ajuda', en: '/help', fr: '/aide', es: '/ayuda' })[language];
