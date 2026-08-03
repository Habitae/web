import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'pt' | 'en';

const LANGUAGE_STORAGE_KEY = 'habitae-language';

function storedLanguage(): Language {
  return typeof window !== 'undefined' && window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en'
    ? 'en'
    : 'pt';
}

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(storedLanguage);

  const setLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
