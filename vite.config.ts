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
    plugins: [websiteCatalogs(process.cwd()), react()],
    base,
    // The prerenderer uses the manifest to include each surface’s styles in HTML.
    build: { outDir: 'dist', manifest: true },
  };
});
