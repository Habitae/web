import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { preview } from 'vite';

const output = 'audit-results';
await mkdir(output, { recursive: true });
const server = await preview({ preview: { host: '127.0.0.1', port: 4175, strictPort: true } });
let failed = false;
try {
  const cli = fileURLToPath(new URL('../cli/index.js', import.meta.resolve('lighthouse')));
  for (const [name, route] of [['pt', '/'], ['en', '/en/'], ['guide', '/help/create-first-condominium/'], ['waitlist', '/en/app/']]) {
    const args = [cli, `http://127.0.0.1:4175${route}`, '--chrome-flags=--headless --no-sandbox', '--output=json', '--output=html', `--output-path=${output}/${name}`, '--quiet'];
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, args, { stdio: 'inherit' });
      child.on('error', reject);
      child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Lighthouse exited ${code}`)));
    });
    const report = JSON.parse(await readFile(`${output}/${name}.report.json`, 'utf8'));
    const scores = Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)]));
    console.log(name, scores);
    console.log(name, Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift'].map(id => [id, report.audits[id]?.displayValue])));
    for (const [key, minimum] of Object.entries({ performance: 95, accessibility: 100, 'best-practices': 100, seo: 100 })) {
      if ((scores[key] ?? 0) < minimum) {
        failed = true;
        console.error(`${name}: ${key} ${scores[key] ?? 'missing'} is below ${minimum}. See ${output}/${name}.report.html`);
      }
    }
  }
} finally { await new Promise(resolve => server.httpServer.close(resolve)); }
if (failed) process.exitCode = 1;
