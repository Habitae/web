import { deliverPendingEmails, emailConfigured, RETRY_CRON } from './email.mjs';

const CONSENT_VERSION = 'waitlist-email-2026-09-06';

const languages = ['pt', 'en', 'fr', 'es'];
const replyCopy = {
  pt: { saved: ['Está na lista.', 'Enviaremos um email quando o Habitae estiver disponível.'], failed: ['Não foi possível guardar a inscrição.', 'Volte atrás, verifique os dados e tente novamente dentro de momentos.'], back: 'Voltar ao Habitae' },
  en: { saved: ['You’re on the list.', 'We’ll email you when Habitae is ready.'], failed: ['We could not save your signup.', 'Please go back, check your details and try again shortly.'], back: 'Back to Habitae' },
  fr: { saved: ['Vous êtes sur la liste.', 'Nous vous enverrons un e-mail lorsque Habitae sera disponible.'], failed: ['Impossible d’enregistrer votre inscription.', 'Revenez en arrière, vérifiez vos données et réessayez dans quelques instants.'], back: 'Retour à Habitae' },
  es: { saved: ['Ya está en la lista.', 'Le enviaremos un correo electrónico cuando Habitae esté disponible.'], failed: ['No hemos podido guardar su inscripción.', 'Vuelva atrás, revise sus datos e inténtelo de nuevo en unos instantes.'], back: 'Volver a Habitae' },
};

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin');
    const allowedOrigin = env.SITE_ORIGIN || 'https://habitae.pt';
    const headers = { 'Cache-Control': 'no-store', Vary: 'Origin', 'X-Content-Type-Options': 'nosniff' };
    if (origin === allowedOrigin) headers['Access-Control-Allow-Origin'] = origin;
    if (new URL(request.url).pathname !== '/waitlist') return new Response('Not found', { status: 404, headers });
    if (origin !== allowedOrigin) return new Response('Forbidden', { status: 403, headers });
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...headers, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { ...headers, Allow: 'POST, OPTIONS' } });
    const json = request.headers.get('Accept')?.includes('application/json');
    const queryLanguage = new URL(request.url).searchParams.get('lang');
    let language = languages.includes(queryLanguage) ? queryLanguage : 'pt';
    const reply = (status, code) => {
      if (json) return Response.json({ ok: status === 200, code }, { status, headers });
      const success = status === 200;
      const { saved, failed, back } = replyCopy[language];
      const [title, message] = success ? saved : failed;
      return new Response(`<!doctype html><html lang="${({ pt: 'pt-PT', es: 'es-ES' })[language] ?? language}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>${title}</title><main><h1>${title}</h1><p>${message}</p><a href="${allowedOrigin}${language === 'pt' ? '/app/' : `/${language}/app/`}">${back}</a></main></html>`, { status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'" } });
    };
    try {
      if (!env.DB || !env.RATE_LIMITER) return reply(503, 'unavailable');
      const limit = await env.RATE_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' });
      if (!limit.success) return reply(429, 'rate_limited');
      if (Number(request.headers.get('Content-Length')) > 4096) return reply(413, 'too_large');
      // Enforce a streaming limit as chunked requests need not send Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return reply(400, 'invalid');
      let length = 0;
      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 4096) { await reader.cancel(); return reply(413, 'too_large'); }
        chunks.push(value);
      }
      const contentType = request.headers.get('Content-Type') || '';
      if (!contentType.startsWith('application/x-www-form-urlencoded')) return reply(415, 'invalid');
      const data = new URLSearchParams(await new Blob(chunks).text());
      language = languages.includes(data.get('language')) ? data.get('language') : 'pt';
      if (data.get('website')) return reply(200, 'saved');
      const email = (data.get('email') || '').trim().toLowerCase();
      const role = data.get('role');
      if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || data.get('consent') !== 'yes' || !['owner', 'resident', 'manager', 'other'].includes(role)) return reply(400, 'invalid');
      await env.DB.prepare('INSERT INTO waitlist (email, language, role, consent_version) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING').bind(email, language, role, CONSENT_VERSION).run();
      if (emailConfigured(env)) {
        const delivery = deliverPendingEmails(env, { email, limit: 2 }).catch(() => {
          console.error('Waitlist email processing deferred to the scheduled retry');
        });
        if (ctx?.waitUntil) ctx.waitUntil(delivery);
        else await delivery;
      }
      return reply(200, 'saved');
    } catch { return reply(503, 'unavailable'); }
  },
  async scheduled(event, env) {
    if (event.cron !== RETRY_CRON) await env.DB.prepare("DELETE FROM waitlist WHERE created_at < datetime('now', '-180 days')").run();
    await deliverPendingEmails(env);
  },
};
