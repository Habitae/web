import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

const base = new URL(process.argv[2] || 'http://127.0.0.1:8787');
const manifest = JSON.parse(await readFile('dist/agent-manifest.json', 'utf8'));
const errorDocuments = Object.keys(manifest.files).filter(path => /^\/(?:en\/|fr\/)?404\.html$/.test(path));
const failures = [];
let checks = 0;
async function check(name, fn) { try { await fn(); checks++; } catch (error) { failures.push({ name, error: error.message }); } }
const get = (path, accept = '*/*', method = 'GET') => fetch(new URL(path, base), { method, headers: { Accept: accept }, redirect: 'manual', signal: AbortSignal.timeout(15000) });
const assertVary = response => {
  const values = (response.headers.get('Vary') || '').toLowerCase().split(/,\s*/);
  assert(values.includes('accept'), `Vary lacks Accept: ${values}`);
  assert(values.includes('accept-encoding'), `Vary lacks Accept-Encoding: ${values}`);
};
function assertCanonical(response, expected) {
  const target = (response.headers.get('Link') || '').match(/<([^>]+)>;\s*rel="canonical"/);
  assert(target, 'Missing canonical Link header');
  const canonical = new URL(expected);
  const actual = new URL(target[1]);
  // Wrangler's local proxy rewrites Link header origins to the dev address.
  // Unit tests check the Worker's original absolute production canonical URL.
  if (['localhost', '127.0.0.1'].includes(base.hostname) && actual.origin === base.origin) {
    actual.protocol = canonical.protocol;
    actual.hostname = canonical.hostname;
    actual.port = canonical.port;
  }
  assert.equal(actual.href, canonical.href);
}
function assertInstructions(response) {
  const link = response.headers.get('Link') || '';
  assert.match(link, /<[^>]+\/llms\.txt>;\s*rel="describedby"/, 'Missing agent instruction discovery link');
}
const entries = Object.entries(manifest.routes);
for (const [path, route] of entries) {
  if (path !== new URL(route.canonical).pathname) {
    await check(`redirect ${path}`, async () => {
      const response = await get(path);
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('Location'), new URL(route.canonical).pathname);
      assertVary(response);
    });
    continue;
  }
  for (const [accept, source, type] of [['text/html', route.html, 'text/html'], ['text/markdown', route.markdown, 'text/markdown']]) {
    await check(`${path} ${type}`, async () => {
      const expected = await readFile(`dist${source}`, 'utf8');
      const response = await get(path, accept);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('Content-Type'), `${type}; charset=utf-8`);
      assertVary(response);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assertCanonical(response, route.canonical);
      assertInstructions(response);
      assert.equal(await response.text(), expected, 'Response differs from its generated representation');
      if (route.noindex) assert.match(response.headers.get('X-Robots-Tag'), /noindex/);
      const head = await get(path, accept, 'HEAD');
      assert.equal(head.status, 200);
      assert.equal(head.headers.get('Content-Type'), response.headers.get('Content-Type'));
      assertVary(head);
      assert.equal(await head.text(), '');
    });
  }
}
for (const [path, file] of Object.entries(manifest.files)) {
  if (manifest.routes[path] || errorDocuments.includes(path)) continue;
  await check(`file ${path}`, async () => {
    const response = await get(path);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type')?.split(';')[0], file.type);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`dist${path}`));
    if (file.canonical) { assertCanonical(response, file.canonical); assertInstructions(response); }
    const head = await get(path, '*/*', 'HEAD');
    assert.equal(head.status, 200);
    assert.equal(head.headers.get('Content-Type')?.split(';')[0], file.type);
    assert.equal(await head.text(), '');
  });
}
for (const path of ['/agent-check-does-not-exist', '/help/agent-check-missing/', '/missing.md', '/missing.js', ...errorDocuments]) {
  for (const accept of ['*/*', 'text/markdown', 'text/html']) {
    await check(`404 ${path} ${accept}`, async () => {
      const response = await get(path, accept);
      assert.equal(response.status, 404);
      assertVary(response);
      assert.match(response.headers.get('Link'), /sitemap.xml/);
      const language = path.startsWith('/fr/') ? 'fr' : /^\/(?:en|help)\//.test(path) ? 'en' : 'pt';
      const extension = accept === 'text/html' ? 'html' : 'md';
      const source = `${language === 'pt' ? '' : `/${language}`}/404.${extension}`;
      assert.equal(response.headers.get('Content-Language'), language);
      const body = await response.text();
      assert.match(body, accept === 'text/html' ? /not-found-page/ : /# 404[\s\S]*llms.txt/);
      assert.equal(body, await readFile(`dist${source}`, 'utf8'), 'Error response differs from its localized representation');
      const head = await get(path, accept, 'HEAD');
      assert.equal(head.status, 404);
      assert.equal(head.headers.get('Content-Language'), language);
      assert.equal(await head.text(), '');
    });
  }
}
for (const [accept, type, status] of [
  ['text/markdown;q=0.9,text/html;q=0.1', 'text/markdown', 200],
  ['text/markdown;q=0,*/*;q=1', 'text/html', 200],
  ['text/html;q=0,text/*;q=0.8', 'text/markdown', 200],
  ['TEXT/MARKDOWN;CHARSET=UTF-8', 'text/markdown', 200],
  ['application/json', null, 406], ['text/html;q=0,text/markdown;q=0', null, 406],
]) await check(`Accept ${accept}`, async () => {
  const response = await get('/', accept);
  assert.equal(response.status, status);
  if (type) assert.equal(response.headers.get('Content-Type').split(';')[0], type);
  assertVary(response);
});
for (const accept of ['text/markdown', 'text/html', 'text/markdown', 'text/html']) await check(`repeat ${accept}`, async () => {
  const response = await get('/', accept);
  assert.equal(response.headers.get('Content-Type').split(';')[0], accept);
  assertVary(response);
});
await check('legacy language URL', async () => {
  const response = await get('/?lang=en&utm_source=agent', 'text/markdown');
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('Location'), '/en/?utm_source=agent');
});
await check('no directory listing or build metadata', async () => {
  for (const path of ['/assets/', '/.vite/manifest.json', '/src/main.tsx']) assert.equal((await get(path)).status, 404);
});
const report = { base: base.href, time: new Date().toISOString(), checksPassed: checks, failures };
await mkdir('agent-verification', { recursive: true });
await writeFile('agent-verification/endpoints.json', JSON.stringify(report, null, 2) + '\n');
console.log(`${checks} checks passed; ${failures.length} failed. Report: agent-verification/endpoints.json`);
for (const failure of failures.slice(0, 10)) console.error(failure.name, failure.error);
if (failures.length > 10) console.error('Additional failures are in the JSON report.');
if (failures.length) process.exitCode = 1;
