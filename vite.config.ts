import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { websiteCatalogs } from './scripts/website-catalogs.mjs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.VITE_GTM_ID && !/^GTM-[A-Z0-9]+$/.test(env.VITE_GTM_ID)) throw new Error('VITE_GTM_ID must be a GTM container ID, such as GTM-ABC123.');
  if (env.VITE_WAITLIST_ENDPOINT) {
    const endpoint = new URL(env.VITE_WAITLIST_ENDPOINT);
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw new Error('VITE_WAITLIST_ENDPOINT must be an HTTPS URL without credentials.');
  }
  const base = env.HABITAE_BASE_PATH || '/';
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) throw new Error('HABITAE_BASE_PATH must be an absolute path with a trailing slash.');
  return {
    plugins: [
      websiteCatalogs(process.cwd()),
      // Vite serves JSON as JS in dev, so a JSON import attribute makes the browser reject it.
      { name: 'dev-json-imports', apply: 'serve', transform: (code, id) => id.endsWith('/shared/i18n.mjs') ? code.replaceAll(", { with: { type: 'json' } }", '') : undefined },
      react(),
      // Like the edge Worker in production (services/agent-edge), `vite preview`
      // answers a path without a built file with its language's 404 page and
      // status 404, instead of the homepage, which the client would then replace.
      {
        name: 'preview-not-found',
        configurePreviewServer(server) {
          const outDir = join(server.config.root, server.config.build.outDir);
          server.middlewares.use((request, response, next) => {
            const path = decodeURIComponent(new URL(request.url ?? '/', 'http://preview').pathname).slice(base.length - 1);
            const file = join(outDir, path);
            const built = existsSync(file) && (!statSync(file).isDirectory() || existsSync(join(file, 'index.html')));
            if ((request.method !== 'GET' && request.method !== 'HEAD') || (built && !/^\/(?:en\/|fr\/|es\/)?404\.html$/.test(path))) return next();
            const language = /^\/(en|fr|es)(?:\/|$)/.exec(path)?.[1] ?? (path.startsWith('/aide/') ? 'fr' : path.startsWith('/ayuda/') ? 'es' : path.startsWith('/help/') ? 'en' : '');
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.end(request.method === 'HEAD' ? undefined : readFileSync(join(outDir, language, '404.html')));
          });
        },
      },
    ],
    base,
    // The prerenderer uses the manifest to include each surface’s styles in HTML.
    build: { outDir: 'dist', manifest: true },
  };
});
