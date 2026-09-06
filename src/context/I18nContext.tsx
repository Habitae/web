import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LANGUAGE_KEY, readConsent } from '../consent';
import { useConsent } from './ConsentContext';
import { appPathname, languageFromUrl, sitePath } from '../site';

export type Language = 'pt' | 'en';

function storedLanguage(): Language {
  const routeLanguage = languageFromUrl();
  if (routeLanguage) return routeLanguage;
  try {
    return readConsent()?.preferences && window.localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'pt';
  } catch { return 'pt'; }
}

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage?: Language }) {
  const { choice } = useConsent();
  const [language, setLanguageState] = useState<Language>(() => initialLanguage ?? storedLanguage());

  const setLanguage = useCallback((nextLanguage: Language) => {
    // The help centre owns its translated slugs; other surfaces use static language paths.
    if (!/^\/(?:help|ajuda)(?:\/|$)/.test(appPathname())) {
      const url = new URL(window.location.href);
      url.pathname = sitePath(appPathname(), nextLanguage);
      url.searchParams.delete('lang');
      window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
    }
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    const syncLanguage = () => setLanguageState(storedLanguage());
    window.addEventListener('popstate', syncLanguage);
    return () => window.removeEventListener('popstate', syncLanguage);
  }, []);

  useEffect(() => {
    try {
      if (choice?.preferences) window.localStorage.setItem(LANGUAGE_KEY, language);
      else window.localStorage.removeItem(LANGUAGE_KEY);
    } catch { /* Language switching remains available without browser storage. */ }
  }, [choice?.preferences, language]);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
