// Captures the help centre's screenshots from a local copy of the app with demo data.
//
// Never point this at production. It signs in, opens forms and adds a few demo
// records, so give the app its own database seeded from the app repository:
//   createdb habitae_help_capture (owned by the schema owner, with the app role's grants)
//   DATABASE_URL=…/habitae_help_capture DATABASE_APP_URL=…/habitae_help_capture \
//     npm run postgres:migrate && npm run postgres:seed-demo && npm run postgres:seed-local-accounts
// Start the app against that database with email switched off (RESEND_API_KEY=),
// then from this repository:
//   npm run help:screenshots [-- --only units,payment] [-- --lang pt,en] [-- --app http://localhost:5173]
//
// HABITAE_APP_REPO points at the app's checkout when it isn't ../app.
// PDF previews need a full Chrome or Chromium, as Playwright's headless shell has no PDF
// viewer: set CHROMIUM_PATH to its executable.
// DEBUG_CAPTURE=1 prints the app's console errors and failed requests.
// Signs in with HABITAE_CAPTURE_EMAIL/HABITAE_CAPTURE_PASSWORD, or the local owner
// and resident accounts from ../app/scripts/seed-local-test-accounts.js.
// Writes public/help-screens/<shot>-<language>.webp and the picture sizes in
// src/content/helpScreenshotSizes.json. The alt text lives in src/content/helpScreenshots.ts.
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values: options } = parseArgs({ options: {
  app: { type: 'string', default: process.env.HABITAE_APP_URL || 'http://localhost:5173' },
  only: { type: 'string' },
  lang: { type: 'string', default: 'pt,en,fr,es' },
} });
const appUrl = options.app.replace(/\/$/, '');
if (!['localhost', '127.0.0.1', '[::1]'].includes(new URL(appUrl).hostname)) {
  throw new Error('Screenshots are taken from a local app with demo data only.');
}
const appRoot = process.env.HABITAE_APP_REPO || join(process.cwd(), '../app');
const outDir = join(process.cwd(), 'public/help-screens');
const sizesFile = join(process.cwd(), 'src/content/helpScreenshotSizes.json');
const languages = options.lang.split(',');
const viewport = { width: 1280, height: 800 };
const phone = { width: 390, height: 844 };
const maxWidth = 1200;
const locales = { pt: 'pt-PT', en: 'en-GB', fr: 'fr-FR', es: 'es-ES' };

const seed = existsSync(join(appRoot, 'scripts/seed-local-test-accounts.js')) ? readFileSync(join(appRoot, 'scripts/seed-local-test-accounts.js'), 'utf8') : '';
const seeded = (name) => new RegExp(`${name} = '([^']+)'`).exec(seed)?.[1];
const owner = { email: process.env.HABITAE_CAPTURE_EMAIL || seeded('DEFAULT_OWNER_EMAIL'), password: process.env.HABITAE_CAPTURE_PASSWORD || seeded('DEFAULT_OWNER_PASSWORD') };
const resident = { email: process.env.HABITAE_CAPTURE_RESIDENT_EMAIL || seeded('DEFAULT_RESIDENT_EMAIL'), password: process.env.HABITAE_CAPTURE_RESIDENT_PASSWORD || seeded('DEFAULT_RESIDENT_PASSWORD') };
if (!owner.email || !owner.password) throw new Error('Set HABITAE_CAPTURE_EMAIL and HABITAE_CAPTURE_PASSWORD to a local owner account.');

// The app's catalogues turn its Portuguese labels into the other languages, so
// one list of steps clicks the same buttons in every language.
const catalogs = Object.fromEntries(['en', 'fr', 'es'].map((language) => [language, JSON.parse(readFileSync(join(appRoot, `shared/locales/${language}.json`), 'utf8'))]));
const label = (language, text) => (language === 'pt' ? text : catalogs[language][text] ?? text);
const exactly = (text) => new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);

// A short demo bank statement in the format the importer reads.
const statement = [
  'DATA MOV.;DATA VALOR;DESCRIÇÃO;IMPORTÂNCIA;SALDO',
  '2026-08-03;2026-08-03;TRF QUOTA 1A AGOSTO;86,50;22266,90',
  '2026-08-04;2026-08-04;TRF QUOTA 2C AGOSTO;86,50;22353,40',
  '2026-08-06;2026-08-06;PAG ASCENSORES NORTE;-124,00;22229,40',
  '2026-08-10;2026-08-10;PAG BRILHO COMUM LIMPEZA;-85,00;22144,40',
].join('\n');

// Shots: `id` names the files and `guide` lets --only pick a guide's shots; where each
// picture goes and its alt text are in src/content/helpScreenshots.ts. `open` gets the
// page ready and returns what to crop (a locator, an area, or nothing for the whole window).
const shots = [
  { id: 'start', guide: 'start', view: 'resumo', open: async ({ page }) => {
    await page.locator('.condominium-tasks [aria-expanded=false]').first().click();
  } },
  { id: 'access', guide: 'access', signedOut: true, open: async ({ page }) => {
    await page.goto(`${appUrl}/app/`);
    await page.waitForSelector('input[type=email]');
  } },
  { id: 'condominium', guide: 'condominium', welcome: true, open: async ({ page, click, language }) => {
    await click('Novo condomínio');
    await page.getByPlaceholder(label(language, 'Nome do condomínio')).fill({ pt: 'Edifício Jardim', en: 'Garden Building', fr: 'Résidence du Jardin', es: 'Edificio Jardín' }[language]);
    return modal(page);
  } },
  { id: 'workspace', guide: 'workspace', welcome: true },
  { id: 'units', guide: 'units', view: 'fracoes' },
  { id: 'units-form', guide: 'units', view: 'fracoes', open: async ({ page, click }) => {
    await click('Nova Fração');
    return modal(page);
  } },
  { id: 'people', guide: 'people', view: 'pessoas', open: async ({ page, click }) => {
    await click('Nova Pessoa');
    return modal(page);
  } },
  { id: 'people-changes', guide: 'people-changes', view: 'pessoas' },
  { id: 'resident-access', guide: 'resident-access', view: 'pessoas', open: ({ page }) => rowMenu(page, 1) },
  { id: 'resident-app', guide: 'resident-app', resident: true, open: async ({ page }) => {
    await page.fill('input[type=email]', resident.email);
    await page.fill('input[type=password]', resident.password);
    await page.click('button[type=submit]');
    await page.waitForSelector('input[type=password]', { state: 'detached', timeout: 30_000 });
    // The headless browser can't keep the offline copy, so its warning is a capture artefact.
    await settle(page);
    const offlineNote = page.locator('.resident-banner.is-warning .resident-icon-button');
    if (await offlineNote.isVisible()) await offlineNote.click();
  } },
  { id: 'map', guide: 'map', view: 'mapa-condominos' },
  { id: 'access-devices', guide: 'access-devices', view: 'chaves-e-tags', open: async ({ page, click }) => {
    await click('Registar item');
    return modal(page);
  } },
  { id: 'transaction', guide: 'transaction', view: 'movimentos', open: async ({ page, click }) => {
    await click('Novo Movimento');
    return modal(page);
  } },
  { id: 'transaction-review', guide: 'transaction-review', view: 'movimentos' },
  { id: 'bank', guide: 'bank', view: 'conta-bancaria' },
  { id: 'bank-import', guide: 'bank-import', view: 'conta-bancaria', open: async ({ page }) => {
    await page.locator('input[type=file][accept*=".csv"]').setInputFiles({ name: 'extrato-demonstracao.csv', mimeType: 'text/csv', buffer: Buffer.from(statement) });
  } },
  { id: 'invoices', guide: 'invoices', view: 'faturas-despesas', open: async ({ page, click }) => {
    await click('Adicionar fatura');
    return modal(page);
  } },
  { id: 'trial-balance', guide: 'trial-balance', view: 'balancetes' },
  { id: 'budget', guide: 'budget', view: 'orcamento' },
  { id: 'budget-details', guide: 'budget-details', view: 'orcamento', open: ({ page }) => rowMenu(page, 0) },
  { id: 'schedule', guide: 'schedule', view: 'plano-quotas' },
  { id: 'standalone', guide: 'standalone', view: 'plano-quotas', open: ({ click }) => click('Quota Avulsa') },
  { id: 'safes', guide: 'safes', view: 'plano-quotas', open: async ({ page, click, language }) => {
    await click('Quota Avulsa');
    await page.getByText(label(language, 'Criar cofre para esta quota avulsa').trim()).first().scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 200);
  } },
  { id: 'payment', guide: 'payment', view: 'quotas' },
  { id: 'corrections', guide: 'corrections', view: 'quotas', open: async ({ page, menuItem }) => {
    await rowMenu(page, 3);
    await menuItem('Abrir detalhe');
  } },
  { id: 'reminders', guide: 'reminders', view: 'quotas', open: ({ page }) => rowMenu(page, 3) },
  { id: 'credit', guide: 'credit', view: 'quotas', open: async ({ page, click }) => {
    await click('Saldo antecipado');
    return modal(page);
  } },
  { id: 'receipts', guide: 'receipts', view: 'quotas', open: ({ click }) => click('Gerar Recibo') },
  { id: 'suppliers', guide: 'suppliers', view: 'fornecedores' },
  { id: 'maintenance', guide: 'maintenance', view: 'manutencao' },
  { id: 'cleaning', guide: 'cleaning', view: 'limpeza' },
  { id: 'notices', guide: 'notices', view: 'avisos' },
  { id: 'inbox', guide: 'inbox', view: 'caixa-de-entrada', open: async ({ page }) => {
    await page.locator('.resident-thread-items button').first().click();
  } },
  { id: 'meeting', guide: 'meeting', view: 'reunioes' },
  { id: 'meeting-votes', guide: 'meeting-votes', view: 'reunioes', open: ({ page }) => page.locator('.meeting-occurrence-prompt').first().locator('xpath=..') },
  { id: 'proxy', guide: 'proxy', view: 'procuracoes' },
  { id: 'signature', guide: 'signature', view: 'lista-assinaturas' },
  { id: 'documents', guide: 'documents', view: 'documentos' },
  { id: 'timeline', guide: 'timeline', view: 'resumo' },
  { id: 'team', guide: 'team', welcome: true, open: async ({ page, click, accountMenu }) => {
    await accountMenu('Administração');
    await click('Utilizadores');
    await click('Enviar convite');
  } },
  { id: 'permissions', guide: 'permissions', welcome: true, open: async ({ page, click, accountMenu }) => {
    await accountMenu('Administração');
    await click('Utilizadores');
    return modal(page);
  } },
  { id: 'audit', guide: 'audit', welcome: true, open: async ({ page, click, accountMenu }) => {
    await accountMenu('Administração');
    await click('Auditoria');
    return modal(page);
  } },
  { id: 'deleted-records', guide: 'deleted-records', welcome: true, open: async ({ page, click, accountMenu }) => {
    await accountMenu('Administração');
    await click('Registos eliminados');
    return modal(page);
  } },
  { id: 'assistants', guide: 'assistants', view: 'resumo', open: async ({ page, accountMenu }) => {
    await accountMenu('Ligações a assistentes');
    return modal(page);
  } },
  { id: 'settings', guide: 'settings', view: 'configuracoes' },
  { id: 'portal-design', guide: 'portal-design', view: 'configuracoes', open: ({ click }) => click('Portal dos residentes') },
  { id: 'pdf-design', guide: 'pdf-design', view: 'configuracoes', open: ({ click }) => click('Personalizar PDFs') },
  { id: 'privacy', guide: 'privacy', view: 'configuracoes', open: ({ click }) => click('Privacidade e direitos') },
  { id: 'billing', guide: 'billing', view: 'subscricao' },
  { id: 'billing-changes', guide: 'billing-changes', view: 'subscricao', open: ({ page }) => page.locator('.billing-plan-management') },
  // The demo organisation has a plan; the code box shows during the free trial.
  { id: 'access-code', guide: 'access-code', view: 'subscricao', trial: true, open: ({ page }) => page.locator('.billing-redeem') },
];

const only = options.only?.split(',');
const selected = only ? shots.filter((shot) => only.includes(shot.id) || only.includes(shot.guide)) : shots;
mkdirSync(outDir, { recursive: true });
const failed = [];
const sizes = existsSync(sizesFile) ? JSON.parse(readFileSync(sizesFile, 'utf8')) : {};

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const session = await signIn();
const condominium = await session.evaluate(async () => (await (await fetch('/api/condominiums')).json()).data.find((item) => item.name === 'Condomínio Aurora'));
if (!condominium) throw new Error('The demo condominium (Condomínio Aurora) is missing; run the app’s demo seed.');
const state = await session.context().storageState();
await session.context().close();
if (selected.some((shot) => shot.id === 'inbox')) await prepareResident();

for (const language of languages) {
  for (const shot of selected) {
    const context = await browser.newContext({
      viewport: shot.resident ? phone : viewport, deviceScaleFactor: 2, reducedMotion: 'reduce', locale: locales[language],
      storageState: shot.signedOut || shot.resident ? undefined : state,
    });
    await context.addInitScript((lang) => {
      localStorage.setItem('habitae-language', lang);
      localStorage.setItem('darkMode', 'false');
    }, language);
    if (shot.trial) {
      await context.route('**/api/billing/subscription', async (route) => {
        const response = await route.fetch();
        const body = await response.json();
        body.data = { ...body.data, status: 'trialing', complimentary: false, stripe_subscription_id: null };
        await route.fulfill({ response, json: body });
      });
    }
    const page = await context.newPage();
    if (process.env.DEBUG_CAPTURE) page.on('console', (m) => m.type() === 'error' && console.log('console:', m.text().slice(0, 300)));
    if (process.env.DEBUG_CAPTURE) page.on('response', (r) => (r.status() >= 400 || /pdf/.test(r.url())) && console.log('response:', r.status(), r.url().slice(0, 160)));
    if (process.env.DEBUG_CAPTURE) page.on('pageerror', (e) => console.log('pageerror:', e.message.slice(0, 200)));
    const click = async (text) => {
      const name = exactly(label(language, text));
      await page.getByRole('button', { name }).or(page.getByRole('tab', { name })).first().click();
      await page.waitForTimeout(600);
    };
    const menuItem = async (text) => {
      await page.locator('.quiet-row-menu-popover, .account-preferences-panel').getByText(exactly(label(language, text))).first().click();
      await page.waitForTimeout(600);
    };
    const accountMenu = async (text) => {
      await page.locator('.account-preferences-trigger').first().click();
      await menuItem(text);
    };
    if (shot.resident) await page.goto(`${appUrl}/resident/`);
    else if (shot.welcome) await page.goto(`${appUrl}/app/`);
    else if (shot.view) await page.goto(`${appUrl}/app/condominiums/${condominium.public_id}/${shot.view}`);
    const file = `${shot.id}-${language}.webp`;
    try {
      if (shot.welcome || shot.view || shot.resident) await settle(page);
      const target = shot.open ? await shot.open({ page, click, menuItem, accountMenu, fill: (name, text) => fill(page, language, name, text), language }) : undefined;
      await settle(page);
      await page.evaluate(tidy);
      const size = await save(page, await cropTarget(target), join(outDir, file), shot.resident ? phone : viewport);
      (sizes[shot.id] ??= {})[language] = size;
      console.log(`${file}: ${size.join('×')}, ${(statSync(join(outDir, file)).size / 1024).toFixed(0)} KB`);
    } catch (error) {
      failed.push(file);
      const debug = join(process.env.TMPDIR || '/tmp', `help-${shot.id}-${language}.png`);
      await page.screenshot({ path: debug }).catch(() => {});
      console.error(`${file}: ${error.message.split('\n')[0]} (see ${debug})`);
    }
    await context.close();
  }
}
writeFileSync(sizesFile, `${JSON.stringify(Object.fromEntries(Object.entries(sizes).sort()), null, 2)}\n`);
await browser.close();
if (failed.length) {
  console.error(`Failed: ${failed.join(', ')}`);
  process.exitCode = 1;
}

async function signIn() {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(`${appUrl}/app/`);
  await page.fill('input[type=email]', owner.email);
  await page.fill('input[type=password]', owner.password);
  await page.click('button[type=submit]');
  await page.waitForSelector('.app-command-account-copy', { timeout: 30_000 });
  return page;
}

async function settle(page) {
  // PDF previews keep a connection open, so network idle is only a hint.
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
}

function modal(page) {
  return page.locator('.form-modal, [role=dialog]').last();
}

// Opens the options menu on the nth row and crops to the row and the menu.
async function rowMenu(page, index) {
  const trigger = page.locator('.tx-row-actions-trigger').nth(index);
  await trigger.click();
  const menu = page.locator('.quiet-row-menu-popover').first();
  await menu.waitFor();
  return { area: [trigger.locator('xpath=ancestor::*[self::li or self::tr or self::article][1]'), menu] };
}

// The box to crop: a locator's, the union of several, or none for the whole
// window. Forms that open as a page show the whole window, so the menu still says where they are.
async function cropTarget(target) {
  if (!target) return undefined;
  if (target.area) {
    const boxes = await Promise.all(target.area.map((locator) => locator.boundingBox()));
    const x = Math.min(...boxes.map((box) => box.x));
    const y = Math.min(...boxes.map((box) => box.y));
    return { x, y, width: Math.max(...boxes.map((box) => box.x + box.width)) - x, height: Math.max(...boxes.map((box) => box.y + box.height)) - y };
  }
  await target.waitFor({ timeout: 10_000 });
  if (await target.evaluate((el) => el.classList.contains('form-modal-page'))) return undefined;
  await target.scrollIntoViewIfNeeded();
  return target.boundingBox();
}

// Makes sure the manager's inbox has a conversation to show.
async function prepareResident() {
  if (!resident.email || !resident.password) throw new Error('Set HABITAE_CAPTURE_RESIDENT_EMAIL and HABITAE_CAPTURE_RESIDENT_PASSWORD to a local resident account.');
  const context = await browser.newContext({ viewport: phone });
  const page = await context.newPage();
  await page.goto(`${appUrl}/resident/`);
  const result = await page.evaluate(async ({ email, password }) => {
    const json = (response) => response.json();
    const login = await fetch('/api/resident/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(json);
    if (!login.success) return login.error;
    const threads = await fetch('/api/resident/threads').then(json);
    if ((threads.data?.threads ?? threads.data ?? []).length) return null;
    const profile = await fetch('/api/resident/profile').then(json);
    const personId = profile.data?.person?.id ?? profile.data?.id ?? profile.data?.people?.[0]?.id;
    const created = await fetch('/api/resident/threads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
      personId, kind: 'issue', subject: 'Lâmpada fundida na garagem',
      body: 'Boa tarde. A lâmpada junto ao lugar 4 da garagem está fundida desde ontem. Obrigada.',
    }) }).then(json);
    return created.success ? null : created.error;
  }, resident);
  if (result) throw new Error(`Resident setup failed: ${result}`);
  await context.close();
}

// Types example values into a form field found by its label.
async function fill(page, language, name, text) {
  await page.getByLabel(exactly(label(language, name))).first().fill(text);
}

// Runs in the app: a neutral account name and no stray focus rings or toasts.
function tidy() {
  const local = /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/g;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent.replaceAll('Proprietário Local', 'Maria Silva').replace(local, 'https://app.habitae.pt');
    if (text !== node.textContent) node.textContent = text;
  }
  for (const input of document.querySelectorAll('input')) input.value = input.value.replace(local, 'https://app.habitae.pt');
  for (const el of document.querySelectorAll('.app-command-account-avatar')) el.textContent = 'MS';
  // The sign-in page lists the local test accounts in development only.
  document.querySelectorAll('details').forEach((el) => { if (/Credenciais de teste|Test credentials|Identifiants de test|Credenciales de prueba/i.test(el.textContent)) el.remove(); });
  document.querySelectorAll('[class*="toast"]').forEach((el) => el.remove());
  document.activeElement?.blur?.();
}

// Crops to the target (with a margin) or the whole window, scales to at most
// 1200 pixels wide and encodes WebP with Chromium, so nothing else needs installing.
async function save(page, target, file, frame) {
  let clip = { x: 0, y: 0, ...frame };
  if (target) {
    const box = target;
    const margin = 24;
    const x = Math.max(0, box.x - margin);
    const y = Math.max(0, box.y - margin);
    clip = { x, y, width: Math.min(frame.width, box.x + box.width + margin) - x, height: Math.min(frame.height, box.y + box.height + margin) - y };
  }
  const png = await page.screenshot({ clip });
  const { data, width, height } = await page.evaluate(async ({ src, maxWidth }) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    const scale = Math.min(1, maxWidth / image.width);
    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);
    const canvas = new OffscreenCanvas(width, height);
    const context = canvas.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, width, height);
    const bytes = new Uint8Array(await (await canvas.convertToBlob({ type: 'image/webp', quality: 0.82 })).arrayBuffer());
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { data: btoa(binary), width, height };
  }, { src: `data:image/png;base64,${png.toString('base64')}`, maxWidth });
  writeFileSync(file, Buffer.from(data, 'base64'));
  return [width, height];
}
