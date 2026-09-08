import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { test } from 'node:test';

const read = path => readFile(`dist/${path}`, 'utf8');
const textContent = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
async function htmlFiles(dir = '') {
  const entries = await readdir(`dist/${dir}`, { withFileTypes: true });
  const nested = await Promise.all(entries.filter(entry => entry.isDirectory() && entry.name !== 'assets').map(entry => htmlFiles(`${dir}${entry.name}/`)));
  return [...entries.filter(entry => entry.name.endsWith('.html')).map(entry => `${dir}${entry.name}`), ...nested.flat()];
}

test('all static surfaces have real content, metadata, schema, and styles before JS', async () => {
  const files = (await htmlFiles()).filter(file => !file.endsWith('404.html'));
  assert.equal(files.length, 173);
  for (const file of files) {
    const html = await read(file);
    assert.match(html, /<h1[ >]/, file);
    assert.match(html, /<link rel="stylesheet"[^>]*href="\/assets\//, file);
    assert.equal((html.match(/<link rel="canonical"/g) || []).length, 1, file);
    for (const name of ['description', 'og:title', 'og:description', 'og:url', 'twitter:title']) assert.match(html, new RegExp(`(?:name|property)="${name}" content="[^\"]+"`), file);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert(schema['@graph'].some(item => item.breadcrumb?.['@type'] === 'BreadcrumbList'), file);
    assert.match(html, /hreflang="pt-PT"/, file);
    assert.match(html, /hreflang="en"/, file);
    assert.match(html, /hreflang="fr"/, file);
    assert.match(html, /type="text\/markdown"/, file);
    assert.match(html, /rel="describedby" href="https:\/\/habitae.pt\/llms.txt"/, file);
    assert(!html.includes('<div id="root"></div>'), file);
  }
});

test('blog articles have complete sections, translated canonicals, article schema and Markdown discovery', async () => {
  const manifest = JSON.parse(await read('agent-manifest.json'));
  const routes = Object.entries(manifest.routes).filter(([path, route]) => route.kind === 'blog' && path.endsWith('/'));
  assert.equal(routes.length, 21);
  const sitemap = await read('sitemap.xml');
  const llms = await read('llms.txt');
  for (const [path, route] of routes) {
    const html = await read(route.html.slice(1));
    const md = await read(route.markdown.slice(1));
    assert(sitemap.includes(`<loc>${route.canonical}</loc>`));
    assert(llms.includes(`https://habitae.pt${route.markdown}`));
    assert(!html.includes('noindex'));
    for (const lang of ['pt', 'en', 'fr']) {
      assert(html.includes(`href="https://habitae.pt${route.alternates[lang]}"`));
      assert.equal(manifest.routes[route.alternates[lang]].alternates[path.startsWith('/en/') ? 'en' : path.startsWith('/fr/') ? 'fr' : 'pt'], path);
    }
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
    const article = graph.find(item => item['@type'] === 'BlogPosting');
    if (!article) {
      assert(graph.some(item => item['@type'] === 'CollectionPage'));
      assert.equal((html.match(/class="blog-card"/g) || []).length, 6);
      continue;
    }
    const body = html.match(/<article class="legal-article"[^>]*>(.*?)<\/article>/s)[1];
    // Completeness is testable; an arbitrary word count is not an editorial quality measure.
    const sections = [...body.matchAll(/<section id="([^"]+)">(.*?)<\/section>/gs)];
    assert(sections.length > 0, path);
    for (const [, id, section] of sections) {
      assert(html.includes(`href="#${id}"`), path);
      assert.match(section, /<h2>.+?<\/h2>/s, path);
      assert.match(section, /<p>.+?<\/p>/s, path);
      const heading = section.match(/<h2>(.*?)<\/h2>/s)[1]
        .replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
      assert(md.includes(`## ${heading}`), path);
    }
    assert.equal(article.author.name, 'Habitae');
    assert.equal(article.publisher['@id'], 'https://habitae.pt/#organization');
    assert.equal(article.mainEntityOfPage, route.canonical);
    assert.match(article.datePublished, /^2026-0[789]-[0-3][0-9]$/);
    assert(article.datePublished < '2026-09-06', path);
    assert.equal(article.dateModified, '2026-09-06');
    assert.equal(article.headline, textContent(html.match(/<h1>(.*?)<\/h1>/s)[1]));
    assert.equal(article.breadcrumb.itemListElement.length, 3);
    assert.equal((html.match(/property="og:type"/g) || []).length, 1);
    assert(html.includes('property="og:type" content="article"'));
    assert(md.includes(article.headline));
    assert(md.includes('https://habitae.pt/' + (path.startsWith('/en/') ? 'en/' : path.startsWith('/fr/') ? 'fr/' : '') + 'app/'));
    assert(md.includes(path.startsWith('/fr/') ? '## Plan du site' : path.startsWith('/en/') ? '## Sitemap' : '## Mapa do site'));
    for (const [, href] of body.matchAll(/href="(https:[^"]+)"/g)) assert(md.includes(href.replaceAll('&amp;', '&')), path);
  }
  assert((await read('index.html')).includes('href="/blog/"'));
  assert((await read('en/index.html')).includes('href="/en/blog/"'));
});

test('arrears case-law references are published alongside the minutes guidance in HTML and Markdown', async () => {
  const citations = [
    ['3263/23.0T8VLG-A.P1', 'https://diariodarepublica.pt/dr/detalhe/acordao/3263-2025-929497275'],
    ['1459/22.0T8CVL.C1', 'https://www.dgsi.pt/jtrc.nsf/c3fb530030ea1c61802568d9005cd5bb/6b8bf60fa5850841802589d7003f423e'],
  ];
  for (const [path, id] of [
    ['blog/quotas-condominio-em-atraso', 'ata'],
    ['en/blog/overdue-condominium-fees-portugal', 'minutes'],
  ]) {
    const html = await read(`${path}/index.html`);
    const md = await read(`${path}/index.md`);
    const section = html.match(new RegExp(`<section id="${id}">(.*?)</section>`, 's'))?.[1];
    assert(section, path);
    for (const [caseNumber, href] of citations) {
      assert(section.includes(`href="${href}"`), path);
      assert(section.includes(caseNumber), path);
      assert(md.includes(href) && md.includes(caseNumber), path);
    }
  }
});

test('law-referenced articles retain review dates, primary sources and navigable sections in both formats', async () => {
  const manifest = JSON.parse(await read('agent-manifest.json'));
  let reviewed = 0;
  for (const [path, route] of Object.entries(manifest.routes)) {
    if (route.kind !== 'blog' || !path.endsWith('/')) continue;
    const html = await read(route.html.slice(1));
    const md = await read(route.markdown.slice(1));
    const references = [...html.matchAll(/href="(https:\/\/(?:files\.)?diariodarepublica\.pt\/[^"]+)"/g)];
    if (!references.length) {
      assert(!html.includes('class="blog-review"'), path);
      continue;
    }
    reviewed++;
    const review = html.match(/<p class="blog-review">(.*?)<\/p>/s)?.[1];
    assert(review, path);
    assert(review.includes('<time dateTime="2026-09-06">'), path);
    assert(md.includes(review.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()), path);
    for (const [, href] of references) assert(md.includes(href), path);
    for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert(html.includes(`id="${anchor}"`), path);
  }
  assert.equal(reviewed, 15);
});

test('English, legal drafts, missing pages, and discovery files are accurate', async () => {
  const en = await read('en/index.html');
  assert.match(en, /<html lang="en"/);
  const fr = await read('fr/index.html');
  assert.match(fr, /<html lang="fr"/);
  assert.match(fr, /href="\/fr\/app\/"/);
  for (const [prefix, lang, text] of [['', 'pt-PT', 'Esta página não existe.'], ['en/', 'en', 'This page does not exist.'], ['fr/', 'fr', 'Cette page n’existe pas.']]) {
    const missing = await read(`${prefix}404.html`);
    assert(missing.includes(`<html lang="${lang}"`));
    assert(missing.includes(text));
    assert(missing.includes('noindex, follow'));
  }
  assert.match(en, /Your whole/);
  assert.match(en, /href="\/en\/app\/"/);
  assert.match(await read('en/privacy/index.html'), /noindex, follow/);
  assert.match(await read('404.html'), /noindex, follow/);
  assert.match(await read('robots.txt'), /Sitemap: https:\/\/habitae.pt\/sitemap.xml/);
  const sitemap = await read('sitemap.xml');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 165);
  assert(!sitemap.includes('/privacy/'));
  assert(!sitemap.includes('/terms/'));
  assert.match(await read('help/create-first-condominium/index.md'), /## Sitemap/);
  assert.match(await read('llms.txt'), /help\/.*index.md/);
});

test('every internal page and asset link resolves to a generated file', async () => {
  const known = new Set(await htmlFiles());
  const missing = new Set();
  for (const file of known) {
    if (file.endsWith('404.html')) continue;
    const html = await read(file);
    for (const [, href] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
      const path = new URL(href.replaceAll('&amp;', '&'), 'https://habitae.pt').pathname.slice(1);
      const resolved = path.endsWith('/') || !path.split('/').pop().includes('.') ? `${path.replace(/\/$/, '')}${path ? '/' : ''}index.html` : path;
      try { await read(resolved); } catch { missing.add(`${file}: ${href}`); }
    }
  }
  assert.deepEqual([...missing], []);
});

test('organization and site identity are consistent on every rendered page', async () => {
  for (const file of (await htmlFiles()).filter(file => !file.endsWith('404.html'))) {
    const html = await read(file);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
    const organization = graph.find(item => item['@type'] === 'Organization');
    assert.equal(organization.name, 'Habitae');
    assert.equal(organization.url, 'https://habitae.pt/');
    assert.equal(organization.contactPoint['@type'], 'ContactPoint');
    assert.equal(organization.contactPoint.contactType, 'customer support');
    assert.equal(organization.contactPoint.url, 'https://habitae.pt/contact/');
    assert.equal(organization.contactPoint.email, 'joaollfrias@hotmail.com');
    assert.equal(organization.contactPoint.telephone, '+351923072360');
    assert.deepEqual(organization.address, { '@type': 'PostalAddress', streetAddress: 'Av. 21 de Junho 4 2FTE', postalCode: '2435-087', addressLocality: 'Caxarias', addressCountry: 'PT' });
    assert(!JSON.stringify(organization).includes('[['));
    const website = graph.find(item => item['@type'] === 'WebSite');
    assert.equal(website.name, 'Habitae');
    assert.equal(website.alternateName, 'habitae.pt');
  }
});

test('About and Contact are substantial, indexable, translated and discoverable', async () => {
  const sitemap = await read('sitemap.xml');
  const llms = await read('llms.txt');
  for (const prefix of ['', 'en/', 'fr/']) {
    const home = await read(`${prefix}index.html`);
    for (const [page, type] of [['about', 'AboutPage'], ['contact', 'ContactPage']]) {
      const path = `${prefix}${page}/`;
      const html = await read(`${path}index.html`);
      const article = html.match(/<article\b[^>]*>(.*?)<\/article>/s)?.[1];
      assert(article && textContent(article).length >= 500, path);
      assert(!html.includes('noindex'), path);
      assert(!article.includes('[['), path);
      const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
      const schema = graph.find(item => item['@type'] === type);
      assert.equal(schema.url, `https://habitae.pt/${path}`);
      assert.equal(schema.about['@id'], 'https://habitae.pt/#organization');
      assert.match(html, new RegExp(`hreflang="en" href="https://habitae.pt/en/${page}/"`));
      assert.match(html, new RegExp(`hreflang="pt-PT" href="https://habitae.pt/${page}/"`));
      assert(home.includes(`href="/${path}"`), path);
      assert(sitemap.includes(`<loc>https://habitae.pt/${path}</loc>`), path);
      assert(llms.includes(`https://habitae.pt/${path}index.md`), path);
      const mirror = await read(`${path}index.md`);
      assert(mirror.length >= 500);
      assert(mirror.includes(`canonical: https://habitae.pt/${path}`));
      if (page === 'contact') {
        for (const value of ['joaollfrias@hotmail.com', '+351923072360', 'Av. 21 de Junho 4 2FTE', '2435-087', 'Caxarias']) {
          assert(article.includes(value), value);
          assert(mirror.includes(value), value);
        }
        assert.match(article, /href="mailto:joaollfrias@hotmail.com"/);
        assert.match(article, /href="tel:\+351923072360"/);
      }
    }
    const privacy = await read(`${prefix}privacy/index.html`);
    assert(textContent(privacy.match(/<article\b[^>]*>(.*?)<\/article>/s)[1]).length >= 500);
    assert(privacy.includes('noindex, follow'), 'Unfinished privacy draft must remain identified as a draft');
  }
});

test('waitlist privacy identifies the real operator, removal contact and actual storage', async () => {
  for (const prefix of ['', 'en/', 'fr/']) {
    const html = await read(`${prefix}privacy/index.html`);
    const section = html.match(/<section id="waitlist"[^>]*>(.*?)<\/section>/s)?.[1];
    assert(section);
    assert(section.includes('João Leandro Lopes Frias'));
    assert(section.includes('joaollfrias@hotmail.com'));
    assert(section.includes('2435-087 Caxarias'));
    assert(section.includes('Cloudflare D1'));
    assert(section.includes('180'));
    assert(!section.includes('[['));
    assert(html.includes('noindex, follow'), 'Application legal drafts remain identified');
    assert(html.includes(prefix ? 'OVH, France' : 'OVH, França'));
    assert(!html.includes('[[FORNECEDOR E REGIÃO DO ALOJAMENTO DA APLICAÇÃO]]'));
  }
});

test('legal drafts describe current hosting, transfer safeguards and conditional dispute resolution', async () => {
  for (const prefix of ['', 'en/', 'fr/']) {
    const privacy = await read(`${prefix}privacy/index.html`);
    const terms = await read(`${prefix}terms/index.html`);
    const transfers = privacy.match(/<section id="transfers"[^>]*>(.*?)<\/section>/s)?.[1];
    assert(transfers);
    for (const provider of ['OVH', 'Cloudflare', 'GitHub Pages']) assert(transfers.includes(provider));
    assert(transfers.includes(prefix === 'fr/' ? 'juridiction de l’Union européenne' : prefix ? 'European Union jurisdiction' : 'jurisdição da União Europeia'));
    assert(transfers.includes(prefix === 'fr/' ? 'clauses contractuelles types' : prefix ? 'standard contractual clauses' : 'cláusulas contratuais-tipo'));
    assert(transfers.includes('https://www.cloudflare.com/cloudflare-customer-dpa/'));
    assert(!transfers.includes('[['));
    assert(!privacy.includes(prefix ? 'GitHub Pages serves the website.' : 'O website é servido por GitHub Pages.'));
    for (const value of ['CNIACC', 'geral@cniacc.pt', '+351 253 619 107']) assert(terms.includes(value));
    assert(terms.includes(prefix === 'fr/' ? 'relève de sa compétence' : prefix ? 'within its jurisdiction' : 'abrangido pela sua competência'));
    for (const html of [privacy, terms]) {
      assert(html.includes('noindex, follow'));
      assert(html.includes('id="legal-draft-title"'));
      assert(!html.includes('[object Object]'));
    }
  }
});

test('approved identity, date and refund policy render while unfinished legal documents remain draft', async () => {
  for (const prefix of ['', 'en/', 'fr/']) {
    for (const document of ['terms', 'privacy']) {
      const html = await read(`${prefix}${document}/index.html`);
      assert(html.includes('259605948'));
      assert(html.includes('2026-09-06'));
      assert(!html.includes('[[NIF / NIPC]]'));
      assert(!html.includes('[[DATA DE ENTRADA EM VIGOR]]'));
      assert(html.includes('noindex, follow'));
      assert(html.includes('id="legal-draft-title"'));
    }
    const terms = await read(`${prefix}terms/index.html`);
    const cancellation = terms.match(/<section id="cancellation"[^>]*>(.*?)<\/section>/s)?.[1];
    assert(cancellation);
    for (const phrase of prefix === 'fr/'
      ? ['Pour les abonnements payants,', 'fin de la période déjà payée', 'rétractation', 'non-conformité du service', 'facturations en double ou indues'] : prefix
      ? ['For paid subscriptions,', 'until the end of the paid period', 'statutory withdrawal', 'non-conforming service', 'Duplicate or incorrect charges']
      : ['Nas subscrições pagas,', 'até ao fim do período já pago', 'livre resolução', 'falta de conformidade', 'Cobranças duplicadas ou indevidas']) assert(cancellation.includes(phrase));
    assert(!cancellation.includes('[['));
    assert(!cancellation.includes('[object Object]'));
  }
});

test('production waitlist exposes a real native form with explicit consent and privacy links', async () => {
  for (const prefix of ['', 'en/', 'fr/']) {
    const html = await read(`${prefix}app/index.html`);
    const form = html.match(/<form\b([^>]*)>(.*?)<\/form>/s);
    assert(form, 'Production waitlist must be available');
    assert.match(form[1], /action="https:\/\/[^\"]+\/waitlist"/);
    assert.match(form[1], /method="post"/);
    assert.match(form[2], /type="email"/);
    assert(form[2].includes(`<option value="resident">${prefix === 'fr/' ? 'Résident' : prefix ? 'Resident' : 'Morador'}</option>`));
    const consent = form[2].match(/<input\b[^>]*name="consent"[^>]*>/)?.[0];
    assert(consent);
    assert.match(consent, /type="checkbox"/);
    assert.match(consent, /required(?:[\s=>])/);
    assert(form[2].includes(`href="/${prefix}privacy/#waitlist"`));
    assert(!html.includes('waitlist.example'));
  }
});

test('agent instructions and recovery files are discoverable and link to real public resources', async () => {
  const llms = await read('llms.txt');
  assert.match(llms, /^# Habitae\n\n> /);
  assert.match(llms, /## When to use Habitae/);
  assert.match(llms, /\[Agent instructions\]\(https:\/\/habitae.pt\/agent-instructions.md\)/);
  const guidance = await read('agent-instructions.md');
  assert.match(guidance, /## When to use Habitae/);
  assert.match(guidance, /## How to read and cite/);
  assert.match(guidance, /no public application API, MCP server/);
  const missing = await read('404.md');
  assert(missing.length < 1500);
  assert.match(missing, /sitemap.xml/);
  assert.match(missing, /llms.txt/);
  assert.match(await read('404.html'), /type="text\/markdown" href="https:\/\/habitae.pt\/404.md"/);
  const manifest = JSON.parse(await read('agent-manifest.json'));
  for (const text of [llms, guidance, missing, await read('sitemap.md'), await read('glossary.md')]) {
    for (const [, target] of text.matchAll(/\]\((https:\/\/habitae.pt\/[^)]+)\)/g)) {
      const path = new URL(target).pathname;
      assert(Object.hasOwn(manifest.routes, path) || Object.hasOwn(manifest.files, path), target);
    }
  }
  assert(!Object.hasOwn(manifest.files, '/.vite/manifest.json'));
});
