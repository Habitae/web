const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RETRY_CRON = '*/5 * * * *';
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const roleLabels = {
  pt: { owner: 'Condómino', resident: 'Morador', manager: 'Administrador de condomínios', other: 'Outro' },
  fr: { owner: 'Copropriétaire', resident: 'Résident', manager: 'Gestionnaire de copropriétés', other: 'Autre' },
  en: { owner: 'Condominium owner', resident: 'Resident', manager: 'Condominium administrator', other: 'Other' },
  es: { owner: 'Propietario', resident: 'Residente', manager: 'Administrador de fincas', other: 'Otro' },
};
const confirmationCopy = {
  pt: {
    subject: 'Está na lista de espera do Habitae',
    title: 'Está na lista.',
    paragraphs: [
      'Obrigado pelo seu interesse no Habitae. A sua inscrição na lista de espera ficou guardada.',
      'Enviaremos um email quando o Habitae estiver disponível. Por agora, não precisa de fazer mais nada.',
      'A inscrição na lista de espera não cria uma conta nem uma subscrição paga.',
    ],
    footer: replyTo => `Se não fez esta inscrição, ou quiser sair da lista, responda a este email ou contacte ${replyTo}.`,
    blog: 'Ler o blog do condomínio',
    privacy: 'Privacidade',
  },
  en: {
    subject: 'You’re on the Habitae waitlist',
    title: 'You’re on the list.',
    paragraphs: [
      'Thanks for your interest in Habitae. Your waitlist signup is saved.',
      'We’ll email you when Habitae is ready. There’s nothing else you need to do for now.',
      'Joining the waitlist does not create an account or a paid subscription.',
    ],
    footer: replyTo => `If you did not sign up, or would like to leave the list, reply to this email or contact ${replyTo}.`,
    blog: 'Read the condominium blog',
    privacy: 'Privacy',
  },
  fr: {
    subject: 'Vous êtes sur la liste d’attente de Habitae',
    title: 'Vous êtes sur la liste.',
    paragraphs: [
      'Merci de votre intérêt pour Habitae. Votre inscription sur la liste d’attente est enregistrée.',
      'Nous vous enverrons un e-mail lorsque Habitae sera disponible. Vous n’avez rien d’autre à faire pour le moment.',
      'L’inscription sur la liste d’attente ne crée ni compte ni abonnement payant.',
    ],
    footer: replyTo => `Si vous ne vous êtes pas inscrit ou souhaitez quitter la liste, répondez à cet e-mail ou contactez ${replyTo}.`,
    blog: 'Lire le blog de la copropriété',
    privacy: 'Confidentialité',
  },
  es: {
    subject: 'Ya está en la lista de espera de Habitae',
    title: 'Ya está en la lista.',
    paragraphs: [
      'Gracias por su interés en Habitae. Hemos guardado su inscripción en la lista de espera.',
      'Le enviaremos un correo electrónico cuando Habitae esté disponible. Por ahora no tiene que hacer nada más.',
      'La inscripción en la lista de espera no crea una cuenta ni una suscripción de pago.',
    ],
    footer: replyTo => `Si no se ha inscrito usted, o desea salir de la lista, responda a este correo o escriba a ${replyTo}.`,
    blog: 'Leer el blog de la comunidad',
    privacy: 'Privacidad',
  },
};

export function emailConfigured(env) {
  return Boolean(env.RESEND_API_KEY && env.RESEND_FROM && env.RESEND_REPLY_TO && env.WAITLIST_ADMIN_TO);
}

function emailHtml(language, title, paragraphs, action, footer) {
  return `<!doctype html><html lang="${({ pt: 'pt-PT', es: 'es-ES' })[language] ?? language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f7f5ee;color:#17251f;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:auto;background:#fffefa;border:1px solid #dedfd7;border-radius:8px"><tr><td style="padding:32px"><a href="https://habitae.pt/${language === 'pt' ? '' : `${language}/`}" style="color:#245d46;font-size:24px;font-weight:bold;text-decoration:none">Habitae</a><h1 style="font-size:28px;line-height:1.2;font-weight:500;margin:32px 0 24px">${escapeHtml(title)}</h1>${paragraphs.map(paragraph => `<p style="font-size:16px;line-height:1.7;margin:0 0 16px">${escapeHtml(paragraph)}</p>`).join('')}${action ? `<p style="margin:28px 0"><a href="${escapeHtml(action.href)}" style="display:inline-block;padding:14px 20px;border-radius:12px;background:#245d46;color:#fffefa;text-decoration:none;font-size:14px">${escapeHtml(action.label)}</a></p>` : ''}<p style="padding-top:24px;border-top:1px solid #dedfd7;font-size:12px;line-height:1.7;color:#606e65">${escapeHtml(footer)}<br><a href="https://habitae.pt/${language === 'pt' ? '' : `${language}/`}privacy/#waitlist" style="color:#245d46">${confirmationCopy[language].privacy}</a></p></td></tr></table></td></tr></table></body></html>`;
}

export function signupEmailPayload(kind, signup, env) {
  const language = Object.hasOwn(confirmationCopy, signup.language) ? signup.language : 'pt';
  if (kind === 'admin') {
    const title = 'Nova inscrição na lista de espera';
    const paragraphs = [
      `Email: ${signup.email}`,
      `Perfil: ${roleLabels.pt[signup.role] ?? signup.role}`,
      `Idioma: ${({ pt: 'Português', en: 'Inglês', fr: 'Francês', es: 'Espanhol' })[language]}`,
      `Inscrição: ${signup.created_at} UTC`,
    ];
    const footer = 'Notificação automática do formulário Habitae. Responder a este email contacta a pessoa inscrita.';
    return {
      from: env.RESEND_FROM, to: [env.WAITLIST_ADMIN_TO], reply_to: signup.email,
      subject: `${title} | Habitae`,
      text: `${title}\n\n${paragraphs.join('\n')}\n\n${footer}`,
      html: emailHtml('pt', title, paragraphs, null, footer),
    };
  }
  const copy = confirmationCopy[language];
  const { title, paragraphs } = copy;
  const footer = copy.footer(env.RESEND_REPLY_TO);
  const action = { href: `https://habitae.pt/${language === 'pt' ? '' : `${language}/`}blog/`, label: copy.blog };
  return {
    from: env.RESEND_FROM, to: [signup.email], reply_to: env.RESEND_REPLY_TO,
    subject: copy.subject,
    text: `Habitae\n\n${title}\n\n${paragraphs.join('\n\n')}\n\n${action.label}: ${action.href}\n\n${footer}\n\n${copy.privacy}: https://habitae.pt/${language === 'pt' ? '' : `${language}/`}privacy/#waitlist`,
    html: emailHtml(language, title, paragraphs, action, footer),
  };
}

// Persist the exact request on the first attempt so retries use the same payload
// and idempotency key. Stop after 23 hours, within Resend's 24-hour guarantee.
export async function deliverPendingEmails(env, { email, limit = 10 } = {}, send = fetch) {
  if (!emailConfigured(env)) return;
  await env.DB.prepare(`UPDATE waitlist_email_outbox SET status = 'failed', locked_until = NULL,
    last_error = 'retry_window_expired' WHERE status = 'pending'
    AND first_attempt_at <= datetime('now', '-23 hours')
    AND (locked_until IS NULL OR locked_until <= CURRENT_TIMESTAMP)`).run();
  const candidates = await env.DB.prepare(`SELECT o.id, o.kind, o.payload_json, w.email, w.language, w.role, w.created_at
    FROM waitlist_email_outbox o JOIN waitlist w ON w.email = o.email
    WHERE o.status = 'pending' AND o.next_attempt_at <= CURRENT_TIMESTAMP
    AND (o.locked_until IS NULL OR o.locked_until <= CURRENT_TIMESTAMP)
    AND (? IS NULL OR o.email = ?)
    ORDER BY o.created_at, o.id LIMIT ?`).bind(email ?? null, email ?? null, limit).all();
  for (const candidate of candidates.results) {
    const payload = candidate.payload_json ?? JSON.stringify(signupEmailPayload(candidate.kind, candidate, env));
    const job = await env.DB.prepare(`UPDATE waitlist_email_outbox
      SET locked_until = datetime('now', '+2 minutes'), attempts = attempts + 1,
        first_attempt_at = COALESCE(first_attempt_at, CURRENT_TIMESTAMP), payload_json = COALESCE(payload_json, ?)
      WHERE id = ? AND status = 'pending' AND next_attempt_at <= CURRENT_TIMESTAMP
        AND (locked_until IS NULL OR locked_until <= CURRENT_TIMESTAMP)
        AND (first_attempt_at IS NULL OR first_attempt_at > datetime('now', '-23 hours'))
      RETURNING id, payload_json, attempts`).bind(payload, candidate.id).first();
    if (!job) continue;
    let failure = 'resend_network_error';
    try {
      const response = await send(RESEND_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `waitlist/${job.id}` },
        body: job.payload_json, signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        const result = await response.json();
        if (typeof result.id === 'string' && result.id) {
          await env.DB.prepare(`UPDATE waitlist_email_outbox SET status = 'sent', sent_at = CURRENT_TIMESTAMP,
            provider_id = ?, locked_until = NULL, last_error = NULL WHERE id = ? AND attempts = ?`)
            .bind(result.id, job.id, job.attempts).run();
          continue;
        }
        failure = 'resend_invalid_response';
      } else {
        failure = `resend_http_${response.status}`;
      }
    } catch { /* The persisted job is retried; private provider responses are never logged. */ }
    const delayMinutes = Math.min(60, 5 * 2 ** Math.min(job.attempts - 1, 4));
    await env.DB.prepare(`UPDATE waitlist_email_outbox SET locked_until = NULL, last_error = ?,
      next_attempt_at = datetime('now', ?) WHERE id = ? AND attempts = ? AND status = 'pending'`)
      .bind(failure, `+${delayMinutes} minutes`, job.id, job.attempts).run();
    console.error('Waitlist email delivery deferred', { job: job.id, code: failure });
  }
}

export { RETRY_CRON };
