import { analyticsAvailable } from '../tracking';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useConsent } from '../context/ConsentContext';
import { useI18n } from '../context/I18nContext';
import { sitePath } from '../site';
import './CookieConsent.css';

export default function CookieConsent() {
  const { choice, saveChoice, storageUnavailable, settingsOpen, setSettingsOpen } = useConsent();
  const { language } = useI18n();
  const [analytics, setAnalytics] = useState(choice?.analytics ?? false);
  const [preferences, setPreferences] = useState(choice?.preferences ?? false);
  const dialog = useRef<HTMLDialogElement>(null);
  const settingsTrigger = useRef<HTMLElement | null>(null);
  const bannerSettings = useRef<HTMLButtonElement>(null);
  const c = language === 'pt' ? {
    title: 'Cookies e privacidade',
    description: analyticsAvailable ? 'Guardamos a sua decisão. Pode aceitar separadamente preferências de idioma e análise de audiência com Google Analytics.' : 'Guardamos a sua decisão e, se aceitar, o idioma escolhido. Não usamos análise de audiência nem publicidade.',
    accept: 'Aceitar todos', reject: 'Rejeitar opcionais', customise: 'Personalizar',
    privacy: 'Cookies e privacidade',
    settings: 'Preferências de cookies', intro: 'Escolha o que este website pode guardar no seu navegador. Pode alterar a decisão a qualquer momento em “Cookies”, no rodapé.',
    necessary: 'Estritamente necessários', always: 'Sempre ativos',
    necessaryCopy: 'Guardam a sua decisão de consentimento durante 180 dias, para não voltar a perguntar em cada visita.',
    preferences: 'Preferências de idioma', optional: 'Opcional',
    preferencesCopy: 'Permitem recordar o idioma entre visitas. Se desativar, a preferência guardada é eliminada; pode continuar a mudar o idioma na página.',
    tracking: analyticsAvailable ? 'A análise de audiência só é ativada com a sua autorização. Não usamos publicidade.' : 'Sem ferramentas de análise de audiência ou publicidade neste website.',
    save: 'Guardar escolhas', close: 'Fechar preferências',
    unavailable: 'A escolha aplica-se nesta página. O navegador não permitiu guardá-la para as próximas visitas.',
  } : {
    title: 'Cookies and privacy',
    description: analyticsAvailable ? 'We save your decision. You can separately allow language preferences and audience measurement with Google Analytics.' : 'We save your decision and, if you accept, your chosen language. We do not use analytics or advertising.',
    accept: 'Accept all', reject: 'Reject optional', customise: 'Customise',
    privacy: 'Cookies and privacy',
    settings: 'Cookie preferences', intro: 'Choose what this website may save in your browser. You can change your decision at any time through “Cookies” in the footer.',
    necessary: 'Strictly necessary', always: 'Always active',
    necessaryCopy: 'Store your consent decision for 180 days so we do not ask again on every visit.',
    preferences: 'Language preferences', optional: 'Optional',
    preferencesCopy: 'Remember your language between visits. Turning this off removes the saved preference; you can still change the language on the page.',
    tracking: analyticsAvailable ? 'Audience measurement is activated only with your permission. We do not use advertising.' : 'No audience analytics or advertising tools on this website.',
    save: 'Save choices', close: 'Close preferences',
    unavailable: 'Your choice applies on this page. Your browser did not allow it to be saved for future visits.',
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const openSettings = () => {
    setPreferences(choice?.preferences ?? false);
    setAnalytics(choice?.analytics ?? false);
    setSettingsOpen(true);
  };
  const closeSettings = () => setSettingsOpen(false);
  const restoreFocus = () => requestAnimationFrame(() => {
    const target = settingsTrigger.current?.isConnected ? settingsTrigger.current
      : bannerSettings.current ?? document.querySelector<HTMLElement>('[data-cookie-settings]');
    target?.focus({ preventScroll: true });
  });
  const decide = (allowPreferences: boolean, allowAnalytics = allowPreferences) => {
    saveChoice(allowPreferences, analyticsAvailable && allowAnalytics);
    setSettingsOpen(false);
    restoreFocus();
  };

  useLayoutEffect(() => {
    if (settingsOpen) {
      setPreferences(choice?.preferences ?? false);
      setAnalytics(choice?.analytics ?? false);
      if (!dialog.current?.open) {
        settingsTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.current?.showModal();
      }
    }
    else dialog.current?.close();
  }, [mounted, settingsOpen, choice?.preferences, choice?.analytics]);

  if (!mounted) return null;

  return (
    <div className="cookie-consent">
      {!choice && !settingsOpen && <section className="cookie-banner" role="region" aria-labelledby="cookie-banner-title">
        <div className="cookie-banner-inner">
          <div className="cookie-banner-copy">
            <h2 id="cookie-banner-title">{c.title}</h2>
            <p>{c.description} <a href={sitePath('/privacy#storage', language)}>{c.privacy}</a>.</p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-choice" onClick={() => decide(false)}>{c.reject}</button>
            <button type="button" className="cookie-choice" onClick={() => decide(true)}>{c.accept}</button>
            <button ref={bannerSettings} type="button" className="cookie-customise" onClick={openSettings}>{c.customise}</button>
          </div>
        </div>
      </section>}

      {storageUnavailable && <p className="cookie-storage-notice" role="status">{c.unavailable}</p>}

      <dialog ref={dialog} className="cookie-dialog" aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-intro"
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input:not([disabled])');
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => { event.preventDefault(); closeSettings(); }}
        onClose={() => {
          closeSettings();
          restoreFocus();
        }}>
        <div className="cookie-dialog-heading">
          <h2 id="cookie-settings-title">{c.settings}</h2>
          <button type="button" className="cookie-close" aria-label={c.close} onClick={closeSettings} autoFocus><X size={24} strokeWidth={1.5} aria-hidden="true" /></button>
        </div>
        <p id="cookie-settings-intro">{c.intro}</p>
        <div className="cookie-categories">
          <div className="cookie-category">
            <div className="cookie-category-heading"><h3>{c.necessary}</h3><span>{c.always}</span></div>
            <p>{c.necessaryCopy}</p>
          </div>
          <div className="cookie-category">
            <label className="cookie-category-heading" htmlFor="cookie-preferences">
              <span>{c.preferences}<small>{c.optional}</small></span>
              <input id="cookie-preferences" type="checkbox" role="switch" checked={preferences} onChange={(event) => setPreferences(event.target.checked)} aria-describedby="cookie-preferences-description" />
            </label>
            <p id="cookie-preferences-description">{c.preferencesCopy}</p>
          </div>
          {analyticsAvailable && <div className="cookie-category">
            <label className="cookie-category-heading" htmlFor="cookie-analytics"><span>{language === 'pt' ? 'Análise de audiência' : 'Audience analytics'}<small>{c.optional}</small></span><input id="cookie-analytics" type="checkbox" role="switch" checked={analytics} onChange={event => setAnalytics(event.target.checked)} aria-describedby="cookie-analytics-description" /></label>
            <p id="cookie-analytics-description">{language === 'pt' ? 'Permite ao Google Analytics medir visitas e inscrições na lista de espera. O formulário não envia o seu email para estas ferramentas.' : 'Allows Google Analytics to measure visits and waitlist signups. The form does not send your email to these tools.'}</p>
          </div>}
        </div>
        <p className="cookie-tracking-note">{c.tracking} <a href={sitePath('/privacy#storage', language)}>{c.privacy}</a>.</p>
        <div className="cookie-actions">
          <button type="button" className="cookie-choice" onClick={() => decide(false)}>{c.reject}</button>
          <button type="button" className="cookie-choice" onClick={() => decide(true)}>{c.accept}</button>
          <button type="button" className="cookie-save" onClick={() => decide(preferences, analytics)}>{c.save}</button>
        </div>
      </dialog>
    </div>
  );
}
