export const CONSENT_KEY = 'habitae-cookie-consent';
export const LANGUAGE_KEY = 'habitae-language';
export const CONSENT_VERSION = 2;
export const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;

export type ConsentChoice = {
  version: number;
  preferences: boolean;
  analytics: boolean;
  updatedAt: number;
  expiresAt: number;
};

export function parseConsent(raw: string | null, now = Date.now()): ConsentChoice | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    if (!value || value.version !== CONSENT_VERSION || typeof value.preferences !== 'boolean' || typeof value.analytics !== 'boolean'
      || !Number.isFinite(value.updatedAt) || !Number.isFinite(value.expiresAt)
      || value.updatedAt > now || value.expiresAt <= now
      || value.expiresAt <= value.updatedAt || value.expiresAt - value.updatedAt > CONSENT_DURATION_MS) return null;
    return { version: value.version, preferences: value.preferences, analytics: value.analytics, updatedAt: value.updatedAt, expiresAt: value.expiresAt };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentChoice | null {
  try { return parseConsent(window.localStorage.getItem(CONSENT_KEY)); }
  catch { return null; }
}

export function rememberLanguage(language: 'pt' | 'en') {
  try { if (readConsent()?.preferences) window.localStorage.setItem(LANGUAGE_KEY, language); }
  catch { /* Native language links still work when storage is unavailable. */ }
}

export function preferredLanguage(): 'pt' | 'en' | null {
  try {
    if (!readConsent()?.preferences) return null;
    const language = window.localStorage.getItem(LANGUAGE_KEY);
    return language === 'pt' || language === 'en' ? language : null;
  } catch { return null; }
}
