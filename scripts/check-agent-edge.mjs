import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';

const worker = spawn(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'dev', '--config', 'services/agent-edge/wrangler.jsonc', '--local', '--port', '8788'], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, WRANGLER_SEND_METRICS: 'false' } });
let logs = '';
worker.stdout.on('data', chunk => { logs = (logs + chunk).slice(-8000); });
worker.stderr.on('data', chunk => { logs = (logs + chunk).slice(-8000); });
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (worker.exitCode !== null) throw new Error(`Worker exited ${worker.exitCode}`);
    try {
      const response = await fetch('http://127.0.0.1:8788/llms.txt', { signal: AbortSignal.timeout(1000) });
      ready = response.status === 200;
      await response.arrayBuffer();
      if (ready) break;
    } catch { /* Runtime is still starting. */ }
    await setTimeout(500);
  }
  if (!ready) throw new Error('Local Worker did not become ready');
  await new Promise((resolve, reject) => {
    const verifier = spawn(process.execPath, ['scripts/verify-agent-endpoints.mjs', 'http://127.0.0.1:8788'], { stdio: 'inherit' });
    verifier.on('error', reject);
    verifier.on('exit', code => code === 0 ? resolve() : reject(new Error(`Endpoint verification exited ${code}`)));
  });
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  worker.kill('SIGTERM');
}
