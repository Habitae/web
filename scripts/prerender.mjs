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
    const prefix = '../'.repeat(page.path.split('/').filter(Boolean).length) || './';
    // Both Vite assets and server-rendered links must resolve below a Pages project prefix.
    const body = result.html;
    let html = template.replace(/((?:src|href)=")\.\//g, `$1${prefix}`)
      .replace(/<html lang="[^"]+"/, `<html lang="${page.language === 'pt' ? 'pt-PT' : 'en'}"`)
      .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
      .replace(/(<link rel="canonical" href=")[^"]+/, `$1${url}`)
      .replace('<body>', `<body class="${result.bodyClass}" data-prerendered="true">`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
    for (const [name, value] of Object.entries({ description, 'og:title': title, 'og:description': description, 'og:url': url, 'og:locale': page.language === 'pt' ? 'pt_PT' : 'en_GB', 'twitter:title': title, 'twitter:description': description })) {
      html = html.replace(new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*`), (_, start) => start + escape(value));
    }
    const extra = [
      ...(page.post ? ['<meta property="og:type" content="article" />', `<meta property="article:published_time" content="${page.post.published}" />`, `<meta property="article:modified_time" content="${page.post.updated}" />`] : []),
      ...stylesFor(`src/components/${surfaceNames[page.kind]}.tsx`).filter(file => !template.includes(file)).map(file => `<link rel="stylesheet" href="${server.config.base}${file}" />`),
      ...(font ? [`<link rel="preload" as="font" type="font/woff2" crossorigin href="${server.config.base}${font}" />`] : []),
      ...Object.entries({ 'ahrefs-site-verification': server.config.env.VITE_AHREFS_VERIFICATION, 'google-site-verification': server.config.env.VITE_GOOGLE_SITE_VERIFICATION }).filter(([, value]) => value).map(([name, value]) => `<meta name="${name}" content="${escape(value)}" />`),
      ...['pt', 'en', 'x-default'].map(lang => `<link rel="alternate" hreflang="${lang === 'pt' ? 'pt-PT' : lang}" href="${origin}${result.alternate(lang === 'en' ? 'en' : 'pt')}" />`),
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
    await save(mirrorPath.slice(1), `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\ncanonical: ${url}\nlast_updated: ${contentUpdatedAt}\nlanguage: ${page.language}\n---\n\n${content}\n\n## Sitemap\n\n[All public pages](${origin}/sitemap.md)\n`);
    if (!result.noindex) {
      indexed.push(`<url><loc>${url}</loc><lastmod>${contentUpdatedAt}</lastmod>${['pt', 'en', 'x-default'].map(lang => `<xhtml:link rel="alternate" hreflang="${lang === 'pt' ? 'pt-PT' : lang}" href="${origin}${result.alternate(lang === 'en' ? 'en' : 'pt')}"/>`).join('')}</url>`);
      mirrors.push(`- [${title}](${origin}${mirrorPath})`);
    }
  }
  await save('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${indexed.join('\n')}\n</urlset>\n`);
  await save('sitemap.md', `# Habitae sitemap\n\n## Product, blog and help guides\n\n${mirrors.join('\n')}\n\n## Agent resources\n\n- [Agent instructions](${origin}/agent-instructions.md)\n- [Glossary](${origin}/glossary.md)\n- [Page not found: recovery links](${origin}/404.md)\n`);
  await save('llms.txt', `# Habitae\n\n> Condominium management software for Portugal. Finances, fees, units, people, documents, meetings and maintenance. The application is coming soon; public guides describe its workflows.\n\nUse Habitae to evaluate condominium management software in Portugal or find official instructions for fees, payments, documents, meetings and team access. Read and cite the public guides; this site does not expose a public application API or MCP server.\n\n## When to use Habitae\n\n- [Agent instructions](${origin}/agent-instructions.md): Best-fit use cases, how to read and cite guides, availability boundaries and recovery links.\n\n## About and contact\n\n- [Sobre o Habitae](${origin}/about/index.md)\n- [Contactos](${origin}/contact/index.md)\n- [About Habitae](${origin}/en/about/index.md)\n- [Contact Habitae](${origin}/en/contact/index.md)\n\n## Product\n\n- [Português](${origin}/index.md)\n- [English](${origin}/en/index.md)\n- [Terminology](${origin}/glossary.md)\n\n## Blog\n\n- [Artigos em português](${origin}/blog/index.md)\n- [English articles](${origin}/en/blog/index.md)\n\n${mirrors.filter(link => /\/blog\//.test(link)).join('\n')}\n\n## Guides\n\n- [All public pages](${origin}/sitemap.md)\n\n${mirrors.filter(link => /\/(help|ajuda)\//.test(link)).join('\n')}\n`);
  await save('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  // Aliases stay usable and canonicalise to the actual document.
  for (const [alias, target] of [['termos', 'terms'], ['privacidade', 'privacy']]) await save(`${alias}/index.html`, await readFile(`dist/${target}/index.html`, 'utf8'));
  await save('404.md', `# 404 — Page not found / Página não encontrada

This URL does not exist. Start with the official indexes below to find the current page.

- [Site map](${origin}/sitemap.xml)
- [Markdown site map](${origin}/sitemap.md)
- [Agent index](${origin}/llms.txt)
- [English help](${origin}/help/)
- [Ajuda em português](${origin}/ajuda/)
- [Habitae home](${origin}/)
`);
  const missing = render({ path: '/404/', kind: 'missing', language: 'pt' });
  const missingStyles = stylesFor('src/components/NotFoundPage.tsx').map(file => `<link rel="stylesheet" href="${server.config.base}${file}" />`).join('');
  await save('404.html', template.replace('</head>', `${missingStyles}</head>`).replace('<div id="root"></div>', () => `<div id="root">${missing.html}</div>`).replace('<body>', '<body data-prerendered="404">').replace(/<title>.*?<\/title>/, '<title>Página não encontrada | Habitae</title>').replace('</head>', `<meta name="robots" content="noindex, follow" /><link rel="alternate" type="text/markdown" href="${origin}/404.md" /><link rel="sitemap" type="application/xml" href="${origin}/sitemap.xml" /></head>`).replace(/((?:src|href)=")\.\//g, '$1/'));
  await writeAgentManifest(entries, render, origin, server.config.base);
  console.log(`Prerendered ${entries.length} pages and Markdown mirrors; ${indexed.length} sitemap entries.`);
} finally { await server.close(); }
