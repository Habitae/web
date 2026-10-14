// Captures the administration app's timeline screen as a static HTML snapshot
// (markup plus only the CSS rules it uses) for the homepage hero.
//
// Run the app locally first (Condominio-plus: `pnpm dev`), then:
//   node scripts/capture-app-preview.mjs [appUrl]
// Writes public/app-preview/timeline-pt.html and timeline-en.html.
import { chromium } from '@playwright/test';
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const appUrl = process.argv[2] ?? 'http://localhost:5173/demo';
const outDir = join(process.cwd(), 'public/app-preview');
const fontSource = join(process.cwd(), '../Condominio-plus/node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2');
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
copyFileSync(fontSource, join(outDir, 'manrope.woff2'));

// Set CHROMIUM_PATH to use an already-installed Chromium instead of Playwright's pinned build.
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const language of ['pt', 'en']) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await context.addInitScript((lang) => {
    localStorage.setItem('habitae-language', lang);
    localStorage.setItem('darkMode', 'false');
  }, language);
  const page = await context.newPage();
  await page.goto(appUrl);
  await page.waitForSelector('.tl-event', { timeout: 30_000 });
  await page.waitForTimeout(1000);

  const html = await page.evaluate(({ data, width, height }) => {
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

    // Static snapshot: no scripts, links or focus targets.
    const root = document.getElementById('root');
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
    for (const sheet of document.styleSheets) { try { css += keep(sheet.cssRules); } catch { /* cross-origin */ } }

    return `<!doctype html>
<html lang="${document.documentElement.lang}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${width}">
<meta name="robots" content="noindex">
<title>Habitae</title>
<style>
@font-face { font-family: 'Manrope Variable'; font-style: normal; font-display: swap; font-weight: 200 800; src: url(manrope.woff2) format('woff2-variations'); }
${css}
html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
body * { pointer-events: none !important; animation: none !important; transition: none !important; }
</style>
</head>
<body class="${document.body.className}">${root.outerHTML}</body>
</html>`;
  }, { data: examples[language], width, height });

  writeFileSync(join(outDir, `timeline-${language}.html`), html);
  console.log(`timeline-${language}.html: ${(html.length / 1024).toFixed(0)} KB`);
  await context.close();
}
await browser.close();
