import { useEffect, useState } from 'react';
import { useConsent } from '../context/ConsentContext';
import { useI18n } from '../context/I18nContext';
import './CookieSettingsButton.css';

export default function CookieSettingsButton() {
  const { setSettingsOpen } = useConsent();
  const { language } = useI18n();
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);
  return <button type="button" className="cookie-settings-button" data-cookie-settings disabled={!ready}
    aria-haspopup="dialog" aria-label={language === 'pt' ? 'Gerir cookies' : 'Manage cookies'}
    onClick={() => setSettingsOpen(true)}>Cookies</button>;
}
