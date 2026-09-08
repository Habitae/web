import assert from 'node:assert/strict';
import { test } from 'node:test';
import { appPathname, languageFromUrl, siteAsset, sitePath } from '../src/site.ts';

function location(path, prefix = '') {
  globalThis.window = { location: new URL(`https://habitae.pt${prefix}${path}`) };
  globalThis.document = { querySelector: () => ({ src: `https://habitae.pt${prefix}/assets/index.js` }) };
}

test('navigation carries either language and preserves queries and fragments', () => {
  location('/');
  assert.equal(sitePath('/privacy', 'en'), '/en/privacy/');
  assert.equal(sitePath('/terms', 'pt'), '/terms/');
  assert.equal(sitePath('/privacy?source=footer#storage', 'en'), '/en/privacy/?source=footer#storage');
  assert.equal(sitePath('/privacy?lang=pt', 'en'), '/en/privacy/');
  assert.equal(sitePath('/#planos', 'pt'), '/#planos');
});

test('help paths encode their language; assets never receive a language query', () => {
  location('/');
  assert.equal(sitePath('/help/create-first-condominium/', 'en'), '/help/create-first-condominium/');
  assert.equal(sitePath('/ajuda/', 'pt'), '/ajuda/');
  assert.equal(siteAsset('timeline-preview-en.png'), '/timeline-preview-en.png');
});

test('language comes from translated help paths or a valid query', () => {
  for (const [path, expected] of [['/?lang=en', 'en'], ['/privacy?lang=pt', 'pt'], ['/app?lang=fr', 'fr'], ['/fr/privacy/', 'fr'], ['/aide/guide/', 'fr'], ['/terms', null], ['/help?lang=pt', 'en'], ['/ajuda/guia?lang=en', 'pt']]) {
    location(path);
    assert.equal(languageFromUrl(), expected, path);
  }
});

test('project-prefix deployments preserve paths, assets and language', () => {
  location('/en/privacy/', '/web');
  assert.equal(appPathname(), '/privacy/');
  assert.equal(languageFromUrl(), 'en');
  assert.equal(sitePath('/terms', 'en'), '/web/en/terms/');
  assert.equal(sitePath('/help', 'en'), '/web/help/');
  assert.equal(siteAsset('og-image.png'), '/web/og-image.png');
  assert.equal(sitePath('/privacy#storage', 'en'), '/web/en/privacy/#storage');
  location('/help/guide', '/web');
  assert.equal(languageFromUrl(), 'en');
});

test('French links preserve deployment prefix, anchors and help routes', () => {
  location('/fr/', '/web');
  assert.equal(sitePath('/privacy#storage', 'fr'), '/web/fr/privacy/#storage');
  assert.equal(sitePath('/ajuda/criar-primeiro-condominio', 'fr'), '/web/aide/criar-primeiro-condominio/');
  assert.equal(appPathname(), '/');
});
