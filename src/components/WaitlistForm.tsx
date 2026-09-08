import { translateText } from '../../shared/i18n.mjs';
import { useState, type FormEvent } from 'react';
import { useI18n } from '../context/I18nContext';
import { sitePath } from '../site';
import { trackWaitlistSignup } from '../tracking';
import './WaitlistForm.css';

export default function WaitlistForm() {
  const { language } = useI18n();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;
  const en = language === 'en';
  if (!endpoint) return <p>{en ? 'Early access registration opens soon.' : translateText('As inscrições para acesso antecipado abrem em breve.', language)}</p>;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const data = new URLSearchParams();
      new FormData(form).forEach((value, key) => { if (typeof value === 'string') data.set(key, value); });
      const response = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data, signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Signup failed');
      setStatus('success');
      form.reset();
      trackWaitlistSignup(language);
    } catch { setStatus('error'); }
  };
  return <div className="waitlist">
    <h2>{en ? 'Be first to hear when we launch.' : translateText('Saiba primeiro quando lançarmos.', language)}</h2>
    {status === 'success' ? <p role="status">{en ? 'You’re on the list. We’ll email you when Habitae is ready.' : translateText('Está na lista. Enviaremos um email quando o Habitae estiver disponível.', language)}</p> : <form action={endpoint} method="post" onSubmit={submit}>
      <input type="hidden" name="language" value={language} />
      <div className="waitlist-honeypot" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
      <label htmlFor="waitlist-email">{translateText('Email', language)}</label>
      <input id="waitlist-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder={en ? 'you@example.com' : translateText('nome@exemplo.pt', language)} />
      <label htmlFor="waitlist-role">{en ? 'I am a…' : translateText('Sou…', language)}</label>
      <select id="waitlist-role" name="role" defaultValue="owner"><option value="owner">{en ? 'Condominium owner' : translateText('Condómino', language)}</option><option value="resident">{en ? 'Resident' : translateText('Morador', language)}</option><option value="manager">{en ? 'Condominium administrator' : translateText('Administrador de condomínios', language)}</option><option value="other">{en ? 'Other' : translateText('Outro', language)}</option></select>
      <label className="waitlist-consent"><input type="checkbox" name="consent" value="yes" required /><span>{en ? 'I agree to receive a signup confirmation and an email about Habitae’s launch.' : translateText('Aceito receber a confirmação de inscrição e um email sobre o lançamento do Habitae.', language)} <a href={sitePath('/privacy#waitlist', language)}>{en ? 'Privacy' : translateText('Privacidade', language)}</a></span></label>
      <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? (en ? 'Saving…' : translateText('A guardar…', language)) : (en ? 'Join the waitlist' : translateText('Entrar na lista de espera', language))}</button>
      {status === 'error' && <p role="alert">{en ? 'We couldn’t save your email. Please try again shortly.' : translateText('Não foi possível guardar o email. Tente novamente dentro de momentos.', language)}</p>}
    </form>}
  </div>;
}
