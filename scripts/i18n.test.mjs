import assert from 'node:assert/strict';
import { test } from 'node:test';
import { catalogs, loadLanguage, translateText, withFrench } from '../shared/i18n.mjs';

test('catalogs load on demand and lazy French copy refreshes after its catalog arrives', async () => {
  assert.deepEqual(Object.keys(catalogs), []);
  const portuguese = loadLanguage('pt');
  assert.equal(loadLanguage('pt'), portuguese, 'Concurrent loads must share the same request');
  await portuguese;
  assert.deepEqual(Object.keys(catalogs), ['pt']);
  const copy = withFrench({ pt: { label: 'Guardar', slug: 'guardar' }, en: { label: 'Save', slug: 'save' } });
  assert.equal(copy.fr.slug, 'guardar', 'Other-language route identifiers remain available before loading');
  await loadLanguage('fr');
  assert.equal(copy.fr.label, 'Enregistrer');
  assert.equal(copy.fr.slug, 'guardar');
  assert.equal(copy.fr, copy.fr, 'Loaded copy should be cached');
  assert.equal(translateText('Olá, {{v0}}!', 'fr', { v0: 'Pago' }), 'Bonjour, Pago !');
  assert.equal(translateText('  Guardar  ', 'fr'), '  Enregistrer  ');
  assert.equal(translateText('Rua da Liberdade 123', 'fr'), 'Rua da Liberdade 123');
  await loadLanguage('en');
  assert.equal(translateText('Guardar', 'en'), 'Save');
  for (const language of ['pt', 'en', 'fr']) {
    assert.deepEqual(Object.keys(catalogs[language]).sort(), Object.keys(catalogs.pt).sort());
    assert(Object.values(catalogs[language]).every(value => value.trim()));
  }
});

test('website bundles retain hidden UI copy and dynamic messages but exclude application-only copy', async () => {
  const { websiteSources, selectWebsiteCopy } = await import('./website-catalogs.mjs');
  const sources = websiteSources(new URL('../src', import.meta.url).pathname);
  for (const language of ['pt', 'en', 'fr']) {
    const selected = selectWebsiteCopy(catalogs[language], sources);
    assert.equal(selected['Nenhum artigo encontrado'], catalogs[language]['Nenhum artigo encontrado']);
    assert.equal(selected['Guardar escolhas'], catalogs[language]['Guardar escolhas']);
    assert(!Object.hasOwn(selected, 'Payment receipt batch has no payment lines'));
    for (const key of Object.keys(catalogs[language]).filter(key => key.includes('{{'))) {
      assert.equal(selected[key], catalogs[language][key], `Dynamic message missing: ${key}`);
    }
  }
});
