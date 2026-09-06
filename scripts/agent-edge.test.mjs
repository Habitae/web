import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHandler, representation, HTML, MARKDOWN } from '../services/agent-edge/handler.mjs';

const canonical = 'https://habitae.pt/';
const manifest = {
  origin: 'https://habitae.pt',
  routes: {
    '/': { html: '/index.html', markdown: '/index.md', canonical, kind: 'home', alternates: { pt: '/', en: '/en/' } },
    '/en/': { html: '/en/index.html', markdown: '/en/index.md', canonical: `${canonical}en/`, kind: 'home', alternates: { pt: '/', en: '/en/' } },
    '/privacy/': { html: '/privacy/index.html', markdown: '/privacy/index.md', canonical: `${canonical}privacy/`, kind: 'privacy', noindex: true, alternates: { pt: '/privacy/', en: '/en/privacy/' } },
  },
  files: {
    '/index.md': { type: MARKDOWN, canonical },
    '/llms.txt': { type: 'text/plain' },
    '/logo.png': { type: 'image/png' },
    '/style.css': { type: 'text/css' },
    '/app.js': { type: 'text/javascript' },
  },
};
const bodies = { '/index.html': '<h1>Habitae</h1>', '/index.md': '# Habitae', '/404.md': '# 404\n\n[Help](https://habitae.pt/help/)\n[llms.txt](https://habitae.pt/llms.txt)', '/404.html': '<h1>Esta página não existe.</h1>', '/privacy/index.md': '# Privacy draft', '/llms.txt': '# Habitae\n\n## When to use Habitae', '/logo.png': 'binary' };
function fixture() {
  bodies['/style.css'] = 'body { color: black; }';
  bodies['/app.js'] = 'export const ready = true;';
  const requests = [];
  return { requests, assets: { fetch: async request => {
    requests.push(request);
    const path = new URL(request.url).pathname;
    return new Response(request.method === 'HEAD' ? null : bodies[path], { status: Object.hasOwn(bodies, path) ? 200 : 404, headers: { 'Content-Type': 'text/plain', Vary: 'Accept-Encoding, Origin', ETag: `"${path}"`, 'Cache-Control': 'public, max-age=600' } });
  } } };
}
const handle = createHandler(manifest);
const request = (path = '/', accept = 'text/html', method = 'GET', headers = {}) => new Request(`https://habitae.pt${path}`, { method, headers: { ...(accept === null ? {} : { Accept: accept }), ...headers } });
function assertVary(response) { const vary = response.headers.get('Vary').toLowerCase().split(/,\s*/); assert(vary.includes('accept')); assert(vary.includes('accept-encoding')); }

test('public HTTP redirects to HTTPS with paths and queries intact, without fetching assets', async () => {
  const { assets, requests } = fixture();
  for (const method of ['GET', 'HEAD']) {
    for (const path of ['/', '/blog/como-calcular-quotas-condominio/?utm_source=a%26b', '/?lang=en', '/logo.png', '//other.example/path?next=https%3A%2F%2Fexample.com']) {
      const response = await handle(new Request(`http://habitae.pt${path}`, { method }), assets);
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('Location'), `https://habitae.pt${path}`);
      assert.equal(await response.text(), '');
    }
  }
  assert.equal(requests.length, 0);
  for (const origin of ['http://127.0.0.1:8788', 'http://localhost:8788', 'https://habitae.pt']) {
    const response = await handle(new Request(`${origin}/`), assets);
    assert.equal(response.status, 200, origin);
    assert.equal(response.headers.get('Location'), null, origin);
  }
});

test('RFC Accept selection: weights, specific exclusions, wildcards, parameters and default', () => {
  for (const [accept, expected] of [
    [null, HTML], ['', null], ['*/*', HTML], ['text/*', HTML],
    ['text/markdown', MARKDOWN], ['TEXT/MARKDOWN; CHARSET=UTF-8', MARKDOWN],
    ['text/markdown;q=0.2, text/html;q=0.8', HTML],
    ['text/html;q=0.2, text/markdown;q=0.8', MARKDOWN],
    ['text/markdown;q=0, */*;q=1', HTML], ['text/html;q=0, text/*;q=0.8', MARKDOWN],
    ['text/*;q=0, */*;q=1', null], ['text/markdown;q=0, text/html;q=0', null],
    ['text/markdown;q=0', null], ['application/json', null],
    ['text/markdown;variant=unsupported', null], ['text/markdown;charset=iso-8859-1', null],
    ['text/markdown;profile="a,b";q=1, text/html;q=0.5', HTML],
    ['text/markdown, text/html', MARKDOWN], ['text/html, text/markdown', HTML],
    ['text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', HTML],
  ]) assert.equal(representation(accept), expected, String(accept));
});

test('alternating variants use separate assets, correct metadata and no shared cache', async () => {
  const { assets, requests } = fixture();
  for (const [accept, type, body] of [[MARKDOWN, MARKDOWN, '# Habitae'], [HTML, HTML, '<h1>Habitae</h1>'], [MARKDOWN, MARKDOWN, '# Habitae']]) {
    const response = await handle(request('/', accept), assets);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Content-Type'), `${type}; charset=utf-8`);
    assert.equal(await response.text(), body);
    assertVary(response);
    assert.match(response.headers.get('Vary'), /Origin/);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.match(response.headers.get('Link'), /<https:\/\/habitae.pt\/>; rel="canonical"/);
    assert.match(response.headers.get('Link'), /<https:\/\/habitae.pt\/llms.txt>; rel="describedby"/);
  }
  assert.deepEqual(requests.map(req => new URL(req.url).pathname), ['/index.md', '/index.html', '/index.md']);
});

test('404 recovery defaults to Markdown for agents and preserves HTML for browsers', async () => {
  for (const path of ['/missing', '/help/missing/', '/missing.md', '/constructor', '/__proto__', '/404.html']) {
    for (const accept of [null, '*/*', MARKDOWN, HTML]) {
      const { assets } = fixture();
      const response = await handle(request(path, accept), assets);
      assert.equal(response.status, 404, path);
      assertVary(response);
      assert.match(response.headers.get('X-Robots-Tag'), /noindex/);
      assert.match(response.headers.get('Link'), /sitemap.xml/);
      assert.match(await response.text(), accept === HTML ? /Esta página/ : /# 404[\s\S]*llms.txt/);
    }
  }
});

test('HEAD, unsupported types and methods have correct statuses and no bodies', async () => {
  const { assets } = fixture();
  for (const [path, accept, status] of [['/', MARKDOWN, 200], ['/missing', MARKDOWN, 404], ['/', 'application/json', 406]]) {
    const response = await handle(request(path, accept, 'HEAD'), assets);
    assert.equal(response.status, status);
    assert.equal(await response.text(), '');
    assertVary(response);
  }
  assert.equal((await handle(request('/', HTML, 'POST'), assets)).status, 405);
  assert.equal((await handle(request('/index.md', HTML), assets)).status, 406);
});

test('language aliases redirect once and preserve unrelated query parameters', async () => {
  const { assets } = fixture();
  const response = await handle(request('/?lang=en&utm_source=test', MARKDOWN), assets);
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('Location'), '/en/?utm_source=test');
  assertVary(response);
  const pt = await handle(request('/en/?lang=pt', HTML), assets);
  assert.equal(pt.headers.get('Location'), '/');
});

test('draft Markdown stays noindex, direct resources have correct types, failures are not hidden', async () => {
  const { assets, requests } = fixture();
  assert.match((await handle(request('/privacy/', MARKDOWN), assets)).headers.get('X-Robots-Tag'), /noindex/);
  const direct = await handle(request('/index.md', MARKDOWN), assets);
  assert.equal(direct.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(direct.headers.get('Link'), /rel="canonical"/);
  assert.match(direct.headers.get('Link'), /<https:\/\/habitae.pt\/llms.txt>; rel="describedby"/);
  assert.equal((await handle(request('/llms.txt', '*/*'), assets)).headers.get('Content-Type'), 'text/plain; charset=utf-8');
  const asset = await handle(request('/logo.png', '*/*'), assets);
  assert.equal(asset.headers.get('Cache-Control'), 'public, max-age=600');
  for (const [path, type] of [['/style.css', 'text/css'], ['/app.js', 'text/javascript']]) {
    const resource = await handle(request(path, '*/*'), assets);
    assert.equal(resource.status, 200);
    assert.equal(resource.headers.get('Cache-Control'), 'public, max-age=600');
    assert.equal(resource.headers.get('Content-Type'), `${type}; charset=utf-8`);
  }
  const broken = { fetch: async () => new Response(null, { status: 500 }) };
  assert.equal((await handle(request('/', MARKDOWN), broken)).status, 503);
  await handle(request('/', MARKDOWN, 'GET', { 'If-None-Match': '"HTML-etag"', Range: 'bytes=0-4' }), assets);
  assert.equal(requests.at(-1).headers.get('If-None-Match'), null);
  assert.equal(requests.at(-1).headers.get('Range'), null);
});
