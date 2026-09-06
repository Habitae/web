import manifest from '../../dist/agent-manifest.json' with { type: 'json' };
import { createHandler } from './handler.mjs';

if (manifest.base !== '/') throw new Error('Rebuild with HABITAE_BASE_PATH=/ before deploying the apex Worker.');
const handle = createHandler(manifest);
export default { fetch(request, env) { return handle(request, env.ASSETS); } };
