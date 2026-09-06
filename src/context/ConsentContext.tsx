import { setAnalyticsConsent } from '../tracking';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CONSENT_DURATION_MS, CONSENT_KEY, CONSENT_VERSION, parseConsent, readConsent, type ConsentChoice } from '../consent';

type ConsentContextValue = {
  choice: ConsentChoice | null;
  saveChoice: (preferences: boolean, analytics?: boolean) => void;
  storageUnavailable: boolean;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(readConsent);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const saveChoice = (preferences: boolean, analytics = false) => {
    const now = Date.now();
    const next = { version: CONSENT_VERSION, preferences, analytics, updatedAt: now, expiresAt: now + CONSENT_DURATION_MS };
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
      setStorageUnavailable(false);
    } catch {
      // The decision still applies in memory when browser storage is blocked.
      setStorageUnavailable(true);
    }
    setChoice(next);
    setAnalyticsConsent(analytics);
  };

  useEffect(() => { setAnalyticsConsent(choice?.analytics ?? false); }, [choice?.analytics]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) {
        setChoice(event.key === null ? null : parseConsent(event.newValue));
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  useEffect(() => {
    if (!choice) {
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const expire = () => {
      const remaining = choice.expiresAt - Date.now();
      if (remaining <= 0) setChoice(null);
      else timer = setTimeout(expire, Math.min(remaining, 2_147_483_647));
    };
    expire();
    return () => clearTimeout(timer);
  }, [choice]);

  return <ConsentContext.Provider value={{ choice, saveChoice, storageUnavailable, settingsOpen, setSettingsOpen }}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const value = useContext(ConsentContext);
  if (!value) throw new Error('useConsent must be used within ConsentProvider');
  return value;
}
