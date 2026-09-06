import { readdir, writeFile } from 'node:fs/promises';

const types = { html: 'text/html', md: 'text/markdown', txt: 'text/plain', xml: 'application/xml', json: 'application/json', js: 'text/javascript', css: 'text/css', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml', woff2: 'font/woff2' };

/** Inventory exact files so unknown URLs can never fall through to an app shell. */
export async function writeAgentManifest(entries, render, origin, base = '/') {
  const routes = {};
  const files = {};
  for (const page of entries) {
    const result = render(page);
    const route = { html: `${page.path}index.html`, markdown: `${page.path}index.md`, canonical: `${origin}${page.path}`, noindex: result.noindex, kind: page.kind, alternates: { pt: result.alternate('pt'), en: result.alternate('en') } };
    for (const path of [page.path, page.path === '/' ? '' : page.path.slice(0, -1), route.html].filter(Boolean)) routes[path] = route;
    files[route.markdown] = { type: 'text/markdown', canonical: route.canonical, noindex: route.noindex };
  }
  for (const [alias, target] of [['termos', 'terms'], ['privacidade', 'privacy']]) {
    for (const path of [`/${alias}`, `/${alias}/`, `/${alias}/index.html`]) routes[path] = routes[`/${target}/`];
  }
  async function walk(directory = '') {
    for (const entry of await readdir(`dist/${directory}`, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const path = `${directory}${entry.name}`;
      if (entry.isDirectory()) await walk(`${path}/`);
      else files[`/${path}`] ??= { type: types[entry.name.split('.').pop()] || 'text/plain' };
    }
  }
  await walk();
  files['/404.md'].noindex = true;
  files['/agent-manifest.json'] = { type: 'application/json', noindex: true };
  const manifest = { origin, base, routes, files };
  await writeFile('dist/agent-manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}
