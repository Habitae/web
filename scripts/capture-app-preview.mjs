// Captures the administration app's timeline screen as a static HTML snapshot
// (markup plus only the CSS rules it uses) for the homepage hero.
//
// Run the app locally first (../app: `pnpm dev`), then:
//   node scripts/capture-app-preview.mjs [appUrl]
// Writes public/app-preview/timeline-pt.html and timeline-en.html, and the
// pictures of them the homepage shows: timeline-pt.webp (1280×800) and
// timeline-pt@2x.webp, and the same for en. The HTML stays as their source.
//
// `--refresh` reprocesses the existing snapshots with the steps below the example
// data (trimming and CSS selection) without the app, after those steps change.
import { chromium } from '@playwright/test';
import { copyFileSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const refresh = process.argv[2] === '--refresh';
const appUrl = (!refresh && process.argv[2]) || 'http://localhost:5173/demo';
const outDir = join(process.cwd(), 'public/app-preview');
const fontSource = join(process.cwd(), '../app/node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2');
const width = 1280;
const height = 800;

// Tidy example data replacing whatever the local demo database contains.
const examples = {
  pt: {
    user: 'Maria Silva', role: 'Administradora', actions: '4 ações pendentes',
    events: [
      { tone: 'positive', tag: 'Quota paga', title: 'Fração 3.º D · 2026-10', time: '10:32', amount: '+86,50 €' },
      { tone: 'negative', tag: 'Despesa', title: 'Revisão do elevador · Ascensores Norte', time: '09:14', amount: '-124,00 €' },
      { tone: 'positive', tag: 'Receita', title: 'Aluguer de espaço comum', time: '09:02', amount: '+350,00 €' },
      { tone: 'neutral', tag: 'Quota pendente', title: 'Fração 1.º A · 2026-10', time: '08:00', amount: '86,50 €' },
    ],
    meeting: 'Assembleia geral ordinária', room: 'Sala do condomínio', tasks: '4', urgent: '1 com prioridade alta',
  },
  en: {
    user: 'Maria Silva', role: 'Administrator', actions: '4 pending actions',
    events: [
      { tone: 'positive', tag: 'Fee paid', title: 'Unit 3rd D · 2026-10', time: '10:32', amount: '+€86.50' },
      { tone: 'negative', tag: 'Expense', title: 'Lift inspection · Ascensores Norte', time: '09:14', amount: '-€124.00' },
      { tone: 'positive', tag: 'Income', title: 'Common room rental', time: '09:02', amount: '+€350.00' },
      { tone: 'neutral', tag: 'Fee pending', title: 'Unit 1st A · 2026-10', time: '08:00', amount: '€86.50' },
    ],
    meeting: 'Annual general meeting', room: 'Common room', tasks: '4', urgent: '1 high priority',
  },
};

mkdirSync(outDir, { recursive: true });
if (!refresh) copyFileSync(fontSource, join(outDir, 'manrope.woff2'));

// Set CHROMIUM_PATH to use an already-installed Chromium instead of Playwright's pinned build.
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const language of ['pt', 'en']) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await context.addInitScript((lang) => {
    localStorage.setItem('habitae-language', lang);
    localStorage.setItem('darkMode', 'false');
  }, language);
  const page = await context.newPage();
  if (refresh) await page.goto(pathToFileURL(join(outDir, `timeline-${language}.html`)).href);
  else {
    await page.goto(appUrl);
    await page.waitForSelector('.tl-event', { timeout: 30_000 });
    await page.waitForTimeout(1000);
    await page.evaluate(exampleData, examples[language]);
  }
  await page.evaluate(() => document.fonts.ready);
  const html = await page.evaluate(snapshot, { width, height });

  writeFileSync(join(outDir, `timeline-${language}.html`), html);
  console.log(`timeline-${language}.html: ${(html.length / 1024).toFixed(0)} KB`);
  await context.close();

  for (const [scale, suffix] of [[1, ''], [2, '@2x']]) {
    const shot = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale });
    const page = await shot.newPage();
    await page.goto(pathToFileURL(join(outDir, `timeline-${language}.html`)).href);
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot();
    // Chromium's own WebP encoder, so the script needs nothing else installed.
    const webp = await page.evaluate(async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      const canvas = new OffscreenCanvas(image.width, image.height);
      canvas.getContext('2d').drawImage(image, 0, 0);
      const bytes = new Uint8Array(await (await canvas.convertToBlob({ type: 'image/webp', quality: 0.9 })).arrayBuffer());
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      return btoa(binary);
    }, `data:image/png;base64,${png.toString('base64')}`);
    const file = join(outDir, `timeline-${language}${suffix}.webp`);
    writeFileSync(file, Buffer.from(webp, 'base64'));
    console.log(`timeline-${language}${suffix}.webp: ${(statSync(file).size / 1024).toFixed(0)} KB`);
    await shot.close();
  }
}
await browser.close();

// Runs in the app: replaces whatever the local demo database contains with the examples.
function exampleData(data) {
  const set = (selector, text, root = document) => { const el = root.querySelector(selector); if (el) el.textContent = text; };

  // Example data.
  set('.app-command-account-avatar', 'MS');
  set('.app-command-account-copy strong', data.user);
  set('.app-command-account-copy span', data.role);
  const actions = document.querySelector('.condominium-tasks-heading p');
  if (actions?.firstChild) actions.firstChild.textContent = data.actions;
  const days = [...document.querySelectorAll('.tl-day')];
  days.slice(1).forEach((day) => day.remove());
  document.querySelector('.tl-more-activity')?.remove();
  const templates = Object.fromEntries(['positive', 'negative', 'neutral'].map((tone) => [tone, document.querySelector(`.tl-event-${tone}`)]));
  const list = days[0].querySelector('.tl-events') ?? days[0];
  const fresh = data.events.map((event) => {
    const node = templates[event.tone].cloneNode(true);
    set('.tl-event-copy span', event.tag, node);
    set('.tl-event-copy strong', event.title, node);
    set('.tl-event-time', event.time, node);
    set('.tl-event-amount', event.amount, node);
    return node;
  });
  list.querySelectorAll('.tl-event').forEach((node) => node.remove());
  fresh.forEach((node) => list.append(node));
  set('.tl-next-meeting strong', data.meeting);
  set('.tl-next-meeting span:last-child', data.room);
  set('.tl-maintenance-summary strong', data.tasks);
  const alert = document.querySelector('.tl-maintenance-alert');
  if (alert?.lastChild) alert.lastChild.textContent = data.urgent;
  const badge = document.querySelector('.notification-bell-badge, .notification-badge, [class*="bell"] [class*="badge"]');
  if (badge) badge.textContent = '4';
}

// Runs in the app or in an existing snapshot and returns the snapshot's HTML.
function snapshot({ width, height }) {
  const root = document.getElementById('root');

  // Drop everything the frame never shows: the mobile header, panels below the
  // fold and anything else without a box inside it. The homepage lays the
  // snapshot out while it loads, so every element here costs it time. Decided
  // before removing anything, so one removal can't move another element in or out.
  const inFrame = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.right > 0 && r.bottom > 0 && r.left < width && r.top < height;
  };
  // An <svg> counts as a whole (its <defs> have no box), and an <option> shows in its <select>.
  const shows = (el) => el.tagName === 'OPTION' || inFrame(el) || (!(el instanceof SVGElement) && [...el.children].some(shows));
  const hidden = [];
  const collect = (el) => {
    for (const child of el.children) {
      if (!shows(child)) hidden.push(child);
      else if (!(child instanceof SVGElement)) collect(child);
    }
  };
  collect(root);
  hidden.forEach((el) => el.remove());

  // Static snapshot: no scripts, links or focus targets.
  root.querySelectorAll('[tabindex], a, button, input, select, summary').forEach((el) => el.setAttribute('tabindex', '-1'));
  root.querySelectorAll('a[href]').forEach((el) => el.removeAttribute('href'));

  // Keep only CSS rules that match something in the snapshot.
  const all = [root, ...root.querySelectorAll('*')];
  const matches = (selectorText) => selectorText.split(',').some((part) => {
    const base = part.replace(/::?(before|after|placeholder|marker|selection|backdrop|-webkit-[\w-]+|picker\([^)]*\)|picker-icon|checkmark)/g, '')
      .replace(/:(hover|focus|focus-visible|focus-within|active|visited|checked|disabled|open|popover-open)/g, '').trim() || '*';
    try { return base.startsWith(':root') || base === 'html' || base === 'body' || base === '*' || all.some((el) => el.matches(base)); } catch { return false; }
  });
  const keep = (rules) => {
    let out = '';
    for (const rule of rules) {
      if (rule instanceof CSSStyleRule) { if (matches(rule.selectorText)) out += rule.cssText + '\n'; }
      else if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule || rule instanceof CSSContainerRule || rule instanceof CSSLayerBlockRule) {
        const inner = keep(rule.cssRules);
        if (inner) out += rule.cssText.slice(0, rule.cssText.indexOf('{')) + '{\n' + inner + '}\n';
      } else if (rule instanceof CSSKeyframesRule || rule instanceof CSSPropertyRule) out += rule.cssText + '\n';
    }
    return out;
  };
  let css = '';
  for (const sheet of document.styleSheets) {
    if (sheet.ownerNode?.hasAttribute?.('data-frame')) continue;
    try { css += keep(sheet.cssRules); } catch { /* cross-origin */ }
  }

  return `<!doctype html>
<html lang="${document.documentElement.lang}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${width}">
<meta name="robots" content="noindex">
<title>Habitae</title>
<style>
${css}</style>
<style data-frame>
@font-face { font-family: 'Manrope Variable'; font-style: normal; font-display: swap; font-weight: 200 800; src: url(manrope.woff2) format('woff2-variations'); }
html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
body * { pointer-events: none !important; animation: none !important; transition: none !important; }
</style>
</head>
<body class="${document.body.className}">${root.outerHTML}</body>
</html>`;
}
