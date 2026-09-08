import { loadLanguage } from '../shared/i18n.mjs';
import { preferredLanguage, rememberLanguage } from './consent';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/manrope';
import './design-tokens.css';
import { I18nProvider } from './context/I18nContext';
import { ConsentProvider } from './context/ConsentContext';
import CookieConsent from './components/CookieConsent';
import { appPathname, languageFromUrl, sitePath } from './site';

async function start() {
  const pathname = appPathname();
  const language = languageFromUrl() ?? 'pt';
  await loadLanguage(language);
  // Native links can navigate before React attaches rememberLanguage handlers.
  // An internal visit to the Portuguese homepage is an explicit route choice.
  const internalVisit = Boolean(document.referrer && new URL(document.referrer).origin === window.location.origin);
  if (pathname === '/' && languageFromUrl() === null && internalVisit) {
    rememberLanguage('pt');
  }
  if (pathname === '/' && languageFromUrl() === null && !internalVisit && preferredLanguage() !== null && preferredLanguage() !== 'pt') {
    window.location.replace(sitePath(`/${window.location.search}${window.location.hash}`, preferredLanguage()!));
    return;
  }
  // Existing shared query-language URLs continue to work; new links use static routes.
  const current = new URL(window.location.href);
  if (current.searchParams.has('lang') && !/^\/(help|ajuda|aide)(\/|$)/.test(pathname)) {
    rememberLanguage(language);
    if (/^\/blog\//.test(pathname)) {
      const { blogPath, translatedBlogPost } = await import('./content/blog');
      const slug = pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
      const post = translatedBlogPost(language, slug);
      current.pathname = sitePath(post ? blogPath(language, post) : pathname, language);
    } else current.pathname = sitePath(pathname, language);
    current.searchParams.delete('lang');
    window.location.replace(`${current.pathname}${current.search}${current.hash}`);
    return;
  }
  const { default: Surface } = await (pathname === '/'
    ? import('./components/MarketingPage')
    : /^\/app\/?$/.test(pathname) ? import('./components/ComingSoonPage')
    : /^\/blog(?:\/|$)/.test(pathname) ? import('./components/BlogPage')
    : /^\/(?:ajuda|help|aide)(?:\/|$)/.test(pathname) ? import('./components/HelpCenter')
    : /^\/(?:terms|privacy|termos|privacidade)\/?$/.test(pathname) ? import('./components/LegalPage')
    : /^\/(?:about|contact)\/?$/.test(pathname) ? import('./components/TrustPage')
    : import('./components/NotFoundPage'));
  const tree = <React.StrictMode><ConsentProvider><I18nProvider initialLanguage={language}><Surface /><CookieConsent /></I18nProvider></ConsentProvider></React.StrictMode>;
  const root = document.getElementById('root')!;
  if (root.hasChildNodes() && document.body.dataset.prerendered !== '404') ReactDOM.hydrateRoot(root, tree);
  else ReactDOM.createRoot(root).render(tree);
}
void start();
