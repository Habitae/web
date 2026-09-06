import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from '../services/waitlist/worker.mjs';

function fixture() {
  const rows = [];
  const env = { SITE_ORIGIN: 'https://habitae.pt', RATE_LIMITER: { limit: async () => ({ success: true }) }, DB: { prepare: sql => ({ bind: (...args) => ({ run: async () => rows.push({ sql, args }) }), run: async () => rows.push({ sql }) }) } };
  return { rows, env };
}
function request(data = {}, headers = {}) { return new Request('https://waitlist.example/waitlist', { method: 'POST', headers: { Origin: 'https://habitae.pt', Accept: 'application/json', ...headers }, body: new URLSearchParams({ email: 'Owner@Example.com', language: 'en', role: 'owner', consent: 'yes', ...data }) }); }

test('stores normalised signup with consent and returns success after storage', async () => {
  const { rows, env } = fixture();
  const response = await worker.fetch(request(), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, code: 'saved' });
  assert.equal(rows[0].args[0], 'owner@example.com');
  assert.equal(rows[0].args[3], 'waitlist-email-2026-09-06');
  assert.match(rows[0].sql, /ON CONFLICT\(email\) DO NOTHING/);
});

test('rejects invalid data, cross-origin requests, abuse and missing storage', async () => {
  const { rows, env } = fixture();
  for (const data of [{ consent: '' }, { email: 'bad' }, { role: 'invalid' }]) assert.equal((await worker.fetch(request(data), env)).status, 400);
  assert.equal((await worker.fetch(request({}, { Origin: 'https://evil.example' }), env)).status, 403);
  assert.equal((await worker.fetch(request({ email: 'x'.repeat(5000) }), env)).status, 413);
  assert.equal((await worker.fetch(request({ website: 'bot' }), env)).status, 200);
  assert.equal(rows.length, 0);
  env.RATE_LIMITER.limit = async () => ({ success: false });
  assert.equal((await worker.fetch(request(), env)).status, 429);
  delete env.DB;
  assert.equal((await worker.fetch(request(), env)).status, 503);
});

test('native HTML forms get accessible confirmation; errors never claim success', async () => {
  const { env } = fixture();
  const response = await worker.fetch(request({}, { Accept: 'text/html' }), env);
  assert.match(response.headers.get('Content-Type'), /text\/html/);
  assert.match(await response.text(), /You’re on the list/);
  env.DB.prepare = () => { throw Error('private database detail'); };
  const error = await worker.fetch(request(), env);
  assert.equal(error.status, 503);
  assert.deepEqual(await error.json(), { ok: false, code: 'unavailable' });
});

test('scheduled cleanup enforces 180-day retention', async () => {
  const { rows, env } = fixture();
  await worker.scheduled({}, env);
  assert.match(rows[0].sql, /DELETE FROM waitlist.*-180 days/);
});

test('resident migration preserves existing signups and accepts residents in both languages', async () => {
  const { DatabaseSync } = await import('node:sqlite');
  const { readFileSync } = await import('node:fs');
  const db = new DatabaseSync(':memory:');
  const migration = name => readFileSync(new URL(`../services/waitlist/migrations/${name}`, import.meta.url), 'utf8');
  try {
    db.exec(migration('0001_initial.sql'));
    for (const role of ['owner', 'manager', 'other']) db.prepare('INSERT INTO waitlist VALUES (?, ?, ?, ?, ?)').run(`${role}@example.com`, 'pt', role, 'original-consent', '2026-09-01 12:34:56');
    const before = db.prepare('SELECT * FROM waitlist ORDER BY email').all();
    db.exec(migration('0002_resident_role.sql'));
    assert.deepEqual(db.prepare('SELECT * FROM waitlist ORDER BY email').all(), before);
    const { env } = fixture();
    env.DB = { prepare: sql => ({ bind: (...args) => ({ run: async () => db.prepare(sql).run(...args) }) }) };
    for (const language of ['pt', 'en']) {
      const data = { email: `resident-${language}@example.com`, role: 'resident', language };
      assert.equal((await worker.fetch(request(data), env)).status, 200);
      assert.equal((await worker.fetch(request(data), env)).status, 200);
      assert.deepEqual({ ...db.prepare('SELECT role, language FROM waitlist WHERE email = ?').get(data.email) }, { role: 'resident', language });
    }
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM waitlist').get().count, 5);
    assert.throws(() => db.prepare('INSERT INTO waitlist (email, language, role, consent_version) VALUES (?, ?, ?, ?)').run('invalid@example.com', 'en', 'invalid', 'test'), /CHECK constraint/);
    assert(db.prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'waitlist_created_at'").get());
  } finally { db.close(); }
});

test('real SQLite schema deduplicates addresses and deletes only expired records', async () => {
  const { DatabaseSync } = await import('node:sqlite');
  const { readFileSync } = await import('node:fs');
  const db = new DatabaseSync(':memory:');
  try {
    db.exec(readFileSync(new URL('../services/waitlist/schema.sql', import.meta.url), 'utf8'));
    const { env } = fixture();
    env.DB = { prepare: sql => ({ bind: (...args) => ({ run: async () => db.prepare(sql).run(...args) }), run: async () => db.prepare(sql).run() }) };
    assert.equal((await worker.fetch(request(), env)).status, 200);
    assert.equal((await worker.fetch(request(), env)).status, 200);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM waitlist').get().count, 1);
    db.exec("INSERT INTO waitlist VALUES ('old@example.com', 'en', 'owner', 'old', datetime('now', '-181 days'))");
    await worker.scheduled({}, env);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM waitlist').get().count, 1);
    assert.equal(db.prepare('SELECT email FROM waitlist').get().email, 'owner@example.com');
  } finally { db.close(); }
});
