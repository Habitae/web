import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from '../services/waitlist/worker.mjs';
import { deliverPendingEmails, signupEmailPayload, RETRY_CRON } from '../services/waitlist/email.mjs';

const request = (data = {}) => new Request('https://waitlist.example/waitlist', {
  method: 'POST', headers: { Origin: 'https://habitae.pt', Accept: 'application/json' },
  body: new URLSearchParams({ email: 'Owner@Example.com', role: 'resident', consent: 'yes', language: 'en', ...data }),
});
function fixture(t, { migrate = false } = {}) {
  const db = new DatabaseSync(':memory:');
  t.after(() => db.close());
  db.exec('PRAGMA foreign_keys = ON');
  const read = name => readFileSync(new URL(`../services/waitlist/${name}`, import.meta.url), 'utf8');
  if (migrate) {
    db.exec(read('migrations/0001_initial.sql'));
    db.exec("INSERT INTO waitlist VALUES ('existing@example.com', 'pt', 'owner', 'old-consent', '2026-08-01 12:00:00')");
    db.exec(read('migrations/0002_resident_role.sql'));
    db.exec(read('migrations/0003_signup_emails.sql'));
  } else db.exec(read('schema.sql'));
  const prepare = sql => {
    const statement = db.prepare(sql);
    const bound = args => ({
      run: async () => ({ success: true, meta: { changes: statement.run(...args).changes } }),
      all: async () => ({ results: statement.all(...args) }),
      first: async () => statement.get(...args) ?? null,
    });
    return { ...bound([]), bind: (...args) => bound(args) };
  };
  const env = {
    DB: { prepare }, RATE_LIMITER: { limit: async () => ({ success: true }) },
    RESEND_API_KEY: 'test-private-key', RESEND_FROM: 'Habitae <hello@example.com>',
    RESEND_REPLY_TO: 'support@example.com', WAITLIST_ADMIN_TO: 'admin@example.com',
  };
  const pending = [];
  const ctx = { waitUntil: promise => pending.push(promise) };
  return { db, env, ctx, flush: () => Promise.all(pending) };
}

function captureEmails(t, db, respond = () => Response.json({ id: 'provider-message-id' })) {
  const sent = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.headers.Authorization, 'Bearer test-private-key');
    assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist').get().count > 0, true);
    const payload = JSON.parse(options.body);
    sent.push({ key: options.headers['Idempotency-Key'], payload });
    return respond(payload);
  });
  return sent;
}

test('migration preserves old signups without backfilling; new signups atomically enqueue only two emails', async t => {
  const { db, env, ctx, flush } = fixture(t, { migrate: true });
  delete env.RESEND_API_KEY;
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist_email_outbox').get().count, 0);
  assert.equal(db.prepare('SELECT consent_version FROM waitlist').get().consent_version, 'old-consent');
  assert.equal((await worker.fetch(request(), env, ctx)).status, 200);
  assert.equal((await worker.fetch(request(), env, ctx)).status, 200);
  await flush();
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist').get().count, 2);
  const jobs = db.prepare('SELECT * FROM waitlist_email_outbox').all();
  assert.deepEqual(jobs.map(job => job.kind).sort(), ['admin', 'confirmation']);
  assert(jobs.every(job => job.email === 'owner@example.com' && job.attempts === 0));
  await worker.fetch(request({ website: 'spam' }), env, ctx);
  assert.equal((await worker.fetch(request({ consent: '' }), env, ctx)).status, 400);
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist_email_outbox').get().count, 2);
});

test('signup sends separate confirmation and admin emails in the selected language without exposing other recipients', async t => {
  const { db, env, ctx, flush } = fixture(t);
  const sent = captureEmails(t, db);
  for (const language of ['pt', 'en']) {
    const email = `${language}@example.com`;
    assert.deepEqual(await (await worker.fetch(request({ email, language }), env, ctx)).json(), { ok: true, code: 'saved' });
  }
  await flush();
  assert.equal(sent.length, 4);
  assert.equal(new Set(sent.map(item => item.key)).size, 4);
  for (const language of ['pt', 'en']) {
    const confirmation = sent.find(item => item.payload.to[0] === `${language}@example.com`).payload;
    assert(confirmation.subject.includes(language === 'pt' ? 'Está na lista' : 'You’re on'));
    assert(confirmation.html.includes(`lang="${language === 'pt' ? 'pt-PT' : 'en'}"`));
    assert.equal(confirmation.reply_to, env.RESEND_REPLY_TO);
    assert(!confirmation.text.includes(env.WAITLIST_ADMIN_TO));
    assert(!confirmation.cc && !confirmation.bcc);
    const notification = sent.find(item => item.payload.to[0] === env.WAITLIST_ADMIN_TO && item.payload.reply_to === `${language}@example.com`).payload;
    assert(notification.text.includes('Perfil: Morador'));
  }
  assert.equal(db.prepare("SELECT count(*) AS count FROM waitlist_email_outbox WHERE status = 'sent'").get().count, 4);
  await worker.fetch(request({ email: 'pt@example.com', language: 'en' }), env, ctx);
  await flush();
  assert.equal(sent.length, 4);
});

test('email failure does not fail signup; retries preserve the request and skip successful messages', async t => {
  const { db, env, ctx, flush } = fixture(t);
  let fail = true;
  t.mock.method(console, 'error', () => {});
  const sent = captureEmails(t, db, payload => fail && payload.to[0] !== env.WAITLIST_ADMIN_TO
    ? new Response('private provider error', { status: 503 }) : Response.json({ id: 'accepted' }));
  assert.equal((await worker.fetch(request(), env, ctx)).status, 200);
  await flush();
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist').get().count, 1);
  assert.equal(db.prepare("SELECT status FROM waitlist_email_outbox WHERE kind = 'confirmation'").get().status, 'pending');
  assert.equal(db.prepare("SELECT status FROM waitlist_email_outbox WHERE kind = 'admin'").get().status, 'sent');
  assert.equal(db.prepare("SELECT last_error FROM waitlist_email_outbox WHERE kind = 'confirmation'").get().last_error, 'resend_http_503');
  await deliverPendingEmails(env);
  assert.equal(sent.length, 2, 'Backoff prevents immediate retries');
  fail = false;
  env.RESEND_FROM = 'New sender <changed@example.com>';
  db.exec("UPDATE waitlist_email_outbox SET next_attempt_at = datetime('now', '-1 minute') WHERE status = 'pending'");
  await worker.scheduled({ cron: RETRY_CRON }, env);
  assert.equal(sent.length, 3);
  const retries = sent.filter(item => item.payload.to[0] === 'owner@example.com');
  assert.deepEqual(retries[0], retries[1]);
  assert.equal(db.prepare("SELECT count(*) AS count FROM waitlist_email_outbox WHERE status = 'sent'").get().count, 2);
  await deliverPendingEmails(env);
  assert.equal(sent.length, 3);
});

test('concurrent processors claim each email only once and respect existing leases', async t => {
  const { db, env } = fixture(t);
  db.exec("INSERT INTO waitlist (email, language, role, consent_version) VALUES ('owner@example.com', 'en', 'owner', 'test')");
  const sent = captureEmails(t, db);
  db.exec("UPDATE waitlist_email_outbox SET locked_until = datetime('now', '+1 minute')");
  await deliverPendingEmails(env);
  assert.equal(sent.length, 0);
  db.exec("UPDATE waitlist_email_outbox SET locked_until = datetime('now', '-1 minute')");
  await Promise.all([deliverPendingEmails(env), deliverPendingEmails(env)]);
  assert.equal(sent.length, 2);
  assert.equal(new Set(sent.map(item => item.key)).size, 2);
});

test('network failures stay queued; ambiguous delivery is never retried beyond the provider idempotency window', async t => {
  const { db, env, ctx, flush } = fixture(t);
  t.mock.method(console, 'error', () => {});
  const sent = captureEmails(t, db, () => { throw Error('secret network detail'); });
  assert.equal((await worker.fetch(request(), env, ctx)).status, 200);
  await flush();
  assert.equal(sent.length, 2);
  assert.equal(db.prepare("SELECT count(*) AS count FROM waitlist_email_outbox WHERE last_error = 'resend_network_error'").get().count, 2);
  db.exec("UPDATE waitlist_email_outbox SET first_attempt_at = datetime('now', '-24 hours'), next_attempt_at = datetime('now', '-1 minute')");
  await deliverPendingEmails(env);
  assert.equal(sent.length, 2);
  assert.equal(db.prepare("SELECT count(*) AS count FROM waitlist_email_outbox WHERE status = 'failed'").get().count, 2);
});

test('deleting a signup or expiring it also removes its queued email data', async t => {
  const { db, env } = fixture(t);
  delete env.RESEND_API_KEY;
  db.exec("INSERT INTO waitlist VALUES ('expired@example.com', 'en', 'owner', 'test', datetime('now', '-181 days'))");
  db.exec("INSERT INTO waitlist (email, language, role, consent_version) VALUES ('fresh@example.com', 'pt', 'resident', 'test')");
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist_email_outbox').get().count, 4);
  await worker.scheduled({ cron: '0 3 * * *' }, env);
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist_email_outbox').get().count, 2);
  db.exec("DELETE FROM waitlist WHERE email = 'fresh@example.com'");
  assert.equal(db.prepare('SELECT count(*) AS count FROM waitlist_email_outbox').get().count, 0);
});

test('user-supplied values are escaped in HTML notifications', () => {
  const payload = signupEmailPayload('admin', { email: 'a<em>&b@example.com', language: 'en', role: 'resident', created_at: '2026-09-06 12:00:00' }, {
    RESEND_FROM: 'Habitae <hello@example.com>', WAITLIST_ADMIN_TO: 'admin@example.com', RESEND_REPLY_TO: 'support@example.com',
  });
  assert(payload.html.includes('a&lt;em&gt;&amp;b@example.com'));
  assert(!payload.html.includes('a<em>&b@example.com'));
});
