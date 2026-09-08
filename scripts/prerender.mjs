import { writeAgentManifest } from './agent-manifest.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createServer } from 'vite';

const origin = 'https://habitae.pt';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const decode = value => value.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => String.fromCodePoint(code[0] === 'x' ? parseInt(code.slice(1), 16) : Number(code))).replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&apos;', "'");
const markdown = html => decode(html
  .replace(/<(svg|script|style|button)\b[^>]*>[\s\S]*?<\/\1>/g, '')
  .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g, (_, level, text) => `\n\n${'#'.repeat(Number(level))} ${text}\n\n`)
  .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, text) => `[${text}](${href.startsWith('/') ? origin : ''}${href})`)
  .replace(/<li[^>]*>/g, '\n- ').replace(/<\/(p|section|div|ul|ol|header|footer|nav|main|details)>/g, '\n\n')
  .replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim());
const save = async (file, text) => { await mkdir(dirname(`dist/${file}`), { recursive: true }); await writeFile(`dist/${file}`, text); };
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, mode: 'production', appType: 'custom' });
try {
  const { loadLanguage } = await server.ssrLoadModule('/shared/i18n.mjs');
  await Promise.all(['pt', 'en', 'fr'].map(loadLanguage));
  const { pages, render, contentUpdatedAt } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
  const stylesFor = key => {
    const chunk = manifest[key];
    if (!chunk) throw new Error(`Missing manifest entry: ${key}`);
    return [...new Set([...(chunk.css ?? []), ...(chunk.imports ?? []).flatMap(stylesFor)])];
  };
  const font = Object.values(manifest).find(asset => asset.file?.includes('manrope-latin-wght-normal'))?.file;
  const surfaceNames = { home: 'MarketingPage', app: 'ComingSoonPage', help: 'HelpCenter', terms: 'LegalPage', privacy: 'LegalPage', about: 'TrustPage', contact: 'TrustPage', blog: 'BlogPage' };
  const entries = pages();
  const indexed = [];
  const mirrors = [];
  for (const page of entries) {
    const result = render(page);
    const { title, description, structuredData } = result;
    const url = `${origin}${page.path}`;
    const file = `${page.path.slice(1)}index.html`;
    const mirrorPath = `${page.path}index.md`;
    const discovery = { pt: ['Mapa do site', 'Todas as páginas públicas'], en: ['Sitemap', 'All public pages'], fr: ['Plan du site', 'Toutes les pages publiques'] }[page.language];
    const prefix = '../'.repeat(page.path.split('/').filter(Boolean).length) || './';
    // Both Vite assets and server-rendered links must resolve below a Pages project prefix.
    const body = result.html;
    let html = template.replace(/((?:src|href)=")\.\//g, `$1${prefix}`)
      .replace(/<html lang="[^"]+"/, `<html lang="${page.language === 'pt' ? 'pt-PT' : page.language}"`)
      .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
      .replace(/(<link rel="canonical" href=")[^"]+/, `$1${url}`)
      .replace('<body>', `<body class="${result.bodyClass}" data-prerendered="true">`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    for (const [name, value] of Object.entries({ description, 'og:title': title, 'og:description': description, 'og:url': url, 'og:locale': ({pt:'pt_PT',en:'en_GB',fr:'fr_FR'})[page.language], 'twitter:title': title, 'twitter:description': description })) {
      html = html.replace(new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*`), (_, start) => start + escape(value));
    }
    const extra = [
      ...(page.post ? ['<meta property="og:type" content="article" />', `<meta property="article:published_time" content="${page.post.published}" />`, `<meta property="article:modified_time" content="${page.post.updated}" />`] : []),
      ...stylesFor(`src/components/${surfaceNames[page.kind]}.tsx`).filter(file => !template.includes(file)).map(file => `<link rel="stylesheet" href="${server.config.base}${file}" />`),
      ...(font ? [`<link rel="preload" as="font" type="font/woff2" crossorigin href="${server.config.base}${font}" />`] : []),
      ...Object.entries({ 'ahrefs-site-verification': server.config.env.VITE_AHREFS_VERIFICATION, 'google-site-verification': server.config.env.VITE_GOOGLE_SITE_VERIFICATION }).filter(([, value]) => value).map(([name, value]) => `<meta name="${name}" content="${escape(value)}" />`),
      ...['pt', 'en', 'fr', 'x-default'].map(lang => `<link rel="alternate" hreflang="${lang === 'pt' ? 'pt-PT' : lang}" href="${origin}${result.alternate(lang === 'x-default' ? 'pt' : lang)}" />`),
      `<link rel="alternate" type="text/markdown" href="${origin}${mirrorPath}" />`,
      `<link rel="describedby" href="${origin}/llms.txt" />`,
      `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`,
      ...(result.noindex ? ['<meta name="robots" content="noindex, follow" />'] : []),
    ];
    if (page.post) html = html.replace(/<meta property="og:type"[^>]*>/g, '');
    html = html.replace('</head>', `${extra.join('\n')}\n</head>`);
    await save(file, html);
    const article = page.article;
    const content = article ? `# ${article.title}\n\n${article.excerpt}\n\n` + article.sections.map(section => `## ${section.heading}\n\n${(section.paragraphs ?? []).join('\n\n')}\n\n${(section.steps ?? []).map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n${section.table ? '| ' + section.table.columns.join(' | ') + ' |\n| ' + section.table.columns.map(() => '---').join(' | ') + ' |\n' + section.table.rows.map(row => '| ' + row.join(' | ') + ' |').join('\n') : ''}\n\n${section.note ?? ''}`).join('\n\n') : markdown(result.html);
    await save(mirrorPath.slice(1), `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\ncanonical: ${url}\nlast_updated: ${contentUpdatedAt}\nlanguage: ${page.language}\n---\n\n${content}\n\n## ${discovery[0]}\n\n[${discovery[1]}](${origin}/sitemap.md)\n`);
    if (!result.noindex) {
      indexed.push(`<url><loc>${url}</loc><lastmod>${contentUpdatedAt}</lastmod>${['pt', 'en', 'fr', 'x-default'].map(lang => `<xhtml:link rel="alternate" hreflang="${lang === 'pt' ? 'pt-PT' : lang}" href="${origin}${result.alternate(lang === 'x-default' ? 'pt' : lang)}"/>`).join('')}</url>`);
      mirrors.push(`- [${title}](${origin}${mirrorPath})`);
    }
  }
  await save('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${indexed.join('\n')}\n</urlset>\n`);
  await save('sitemap.md', `# Habitae sitemap\n\n## Product, blog and help guides\n\n${mirrors.join('\n')}\n\n## Agent resources\n\n- [Agent instructions](${origin}/agent-instructions.md)\n- [Glossary](${origin}/glossary.md)\n- [Page not found: recovery links](${origin}/404.md)\n`);
  await save('llms.txt', `# Habitae\n\n> Condominium management software for Portugal. Finances, fees, units, people, documents, meetings and maintenance. The application is coming soon; public guides describe its workflows.\n\nUse Habitae to evaluate condominium management software in Portugal or find official instructions for fees, payments, documents, meetings and team access. Read and cite the public guides; this site does not expose a public application API or MCP server.\n\n## When to use Habitae\n\n- [Agent instructions](${origin}/agent-instructions.md): Best-fit use cases, how to read and cite guides, availability boundaries and recovery links.\n\n## About and contact\n\n- [Sobre o Habitae](${origin}/about/index.md)\n- [Contactos](${origin}/contact/index.md)\n- [About Habitae](${origin}/en/about/index.md)\n- [Contact Habitae](${origin}/en/contact/index.md)\n- [À propos de Habitae](${origin}/fr/about/index.md)\n- [Contacter Habitae](${origin}/fr/contact/index.md)\n\n## Product\n\n- [Português](${origin}/index.md)\n- [English](${origin}/en/index.md)\n- [Français](${origin}/fr/index.md)\n- [Terminology](${origin}/glossary.md)\n\n## Blog\n\n- [Artigos em português](${origin}/blog/index.md)\n- [English articles](${origin}/en/blog/index.md)\n- [Articles en français](${origin}/fr/blog/index.md)\n\n${mirrors.filter(link => /\/blog\//.test(link)).join('\n')}\n\n## Guides\n\n- [All public pages](${origin}/sitemap.md)\n\n${mirrors.filter(link => /\/(help|ajuda|aide)\//.test(link)).join('\n')}\n`);
  await save('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  // Aliases stay usable and canonicalise to the actual document.
  for (const [alias, target] of [['termos', 'terms'], ['privacidade', 'privacy']]) await save(`${alias}/index.html`, await readFile(`dist/${target}/index.html`, 'utf8'));
  const errors = {
    pt: ['Página não encontrada', 'Este endereço não existe. Use os índices oficiais abaixo para encontrar a página atual.', 'Mapa do site', 'Mapa do site em Markdown', 'Índice para agentes', 'Ajuda em português', '/ajuda/', 'Página inicial'],
    en: ['Page not found', 'This URL does not exist. Use the official indexes below to find the current page.', 'Site map', 'Markdown site map', 'Agent index', 'English help', '/help/', 'Home page'],
    fr: ['Page introuvable', 'Cette adresse n’existe pas. Utilisez les index officiels ci-dessous pour trouver la page actuelle.', 'Plan du site', 'Plan du site en Markdown', 'Index pour les agents', 'Aide en français', '/aide/', 'Page d’accueil'],
  };
  const missingStyles = stylesFor('src/components/NotFoundPage.tsx').map(file => `<link rel="stylesheet" href="${server.config.base}${file}" />`).join('');
  for (const [language, copy] of Object.entries(errors)) {
    const prefix = language === 'pt' ? '' : `${language}/`;
    const missing = render({ path: `/${prefix}404/`, kind: 'missing', language });
    await save(`${prefix}404.md`, `# 404 — ${copy[0]}\n\n${copy[1]}\n\n- [${copy[2]}](${origin}/sitemap.xml)\n- [${copy[3]}](${origin}/sitemap.md)\n- [${copy[4]}](${origin}/llms.txt)\n- [${copy[5]}](${origin}${copy[6]})\n- [${copy[7]}](${origin}/${prefix})\n`);
    let html = template.replace('</head>', `${missingStyles}</head>`).replace('<div id="root"></div>', () => `<div id="root">${missing.html}</div>`)
      .replace('<body>', '<body data-prerendered="404">')
      .replace(/<html lang="[^"]+"/, `<html lang="${language === 'pt' ? 'pt-PT' : language}"`)
      .replace(/<title>.*?<\/title>/, `<title>${copy[0]} | Habitae</title>`)
      .replace(/<meta (?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/g, '')
      .replace(/<link rel="canonical"[^>]*>/g, '')
      .replace('</head>', `<meta name="description" content="${copy[1]}" /><meta name="robots" content="noindex, follow" /><link rel="alternate" type="text/markdown" href="${origin}/${prefix}404.md" /><link rel="sitemap" type="application/xml" href="${origin}/sitemap.xml" /></head>`)
      .replace(/((?:src|href)=")\.\//g, '$1/');
    await save(`${prefix}404.html`, html);
  }
  await writeAgentManifest(entries, render, origin, server.config.base);
  console.log(`Prerendered ${entries.length} pages and Markdown mirrors; ${indexed.length} sitemap entries.`);
} finally { await server.close(); }
