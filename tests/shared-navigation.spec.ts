import { test, expect } from '@playwright/test';
import { helpArticles } from '../src/content/helpArticles';

const routes = ['/', '/blog/', '/terms/', '/privacy/', '/about/', '/contact/', '/ajuda/', '/app/', '/404/'];

test('public pages share navigation and footer styling on desktop and mobile', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Rejeitar opcionais', exact: true }).click();
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    let reference: unknown;
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('header.site-chrome')).toHaveCount(1);
      await expect(page.locator('footer.site-chrome')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      const nav = page.getByRole('navigation', { name: 'Navegação principal', exact: true });
      if (width === 390) {
        const toggle = page.getByRole('button', { name: 'Abrir menu', exact: true });
        await toggle.click();
        await expect(nav).toBeVisible();
        await expect(nav.getByRole('link', { name: 'Blog', exact: true })).toHaveAttribute('href', '/blog/');
        await page.keyboard.press('Escape');
        await expect(toggle).toBeFocused();
        await expect(nav).not.toBeVisible();
      } else {
        await expect(nav.getByRole('link', { name: 'Blog', exact: true })).toBeVisible();
        if (route !== '/') await expect(nav.getByRole('link', { name: 'Funcionalidades', exact: true })).toHaveAttribute('href', '/#funcionalidades');
      }
      const style = await page.evaluate(() => ['.mk-header-inner', '.mk-brand-logo', '.mk-footer-links h2', '.mk-footer-links a', '.mk-footer-legal a'].map(selector => {
        const s = getComputedStyle(document.querySelector(selector)!);
        return [s.fontSize, s.fontWeight, s.lineHeight, s.color, s.textDecorationLine];
      }));
      if (!reference) reference = style;
      expect(style).toEqual(reference);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      if (['/blog/', '/ajuda/', '/terms/'].includes(route)) await page.screenshot({ path: testInfo.outputPath(`${width}-${route.slice(1, -1)}.png`) });
    }
  }
  expect(errors).toEqual([]);
});

for (const javaScriptEnabled of [false, true]) {
  test(`shared footer preserves translations with JavaScript ${javaScriptEnabled}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled });
    const page = await context.newPage();
    if (javaScriptEnabled) {
      await page.goto('http://127.0.0.1:4174/');
      await page.getByRole('button', { name: 'Rejeitar opcionais', exact: true }).click();
    }
    for (const [pt, en] of [
      ['/terms/', '/en/terms/'], ['/contact/', '/en/contact/'], ['/app/', '/en/app/'],
      ['/ajuda/criar-primeiro-condominio/', '/help/create-first-condominium/'],
    ]) {
      await page.goto(`http://127.0.0.1:4174${pt}`);
      await page.locator('footer').getByRole('link', { name: 'English', exact: true }).click();
      await expect(page).toHaveURL(`http://127.0.0.1:4174${en}`);
      await page.locator('footer').getByRole('link', { name: 'Português', exact: true }).click();
      await expect(page).toHaveURL(`http://127.0.0.1:4174${pt}`);
    }
    await context.close();
  });
}

test('help categories, search and article navigation work together', async ({ page }, testInfo) => {
  await page.goto('/ajuda/');
  await page.getByRole('button', { name: 'Rejeitar opcionais', exact: true }).click();
  await page.getByRole('button', { name: /^Financeiro/ }).click();
  await expect(page.locator('.hc-index-heading h2')).toHaveText('Financeiro');
  await expect(page.locator('.hc-article-card').first()).toBeVisible();
  for (const label of await page.locator('.hc-article-card .hc-article-category').allTextContents()) expect(label).toBe('Financeiro');
  await page.getByRole('searchbox').fill('zzzz-no-match');
  await expect(page.locator('.hc-empty')).toBeVisible();
  await page.locator('.hc-empty').getByRole('button', { name: 'Limpar pesquisa' }).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await page.locator('.hc-start-button').click();
  await expect(page).toHaveURL(`http://127.0.0.1:4174/ajuda/${helpArticles.pt.find(article => article.id === 'start')!.slug}/`);
  await expect(page.locator('.hc-article h1')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('help-article-mobile.png') });
  await page.getByRole('button', { name: /^Quotas/ }).click();
  await expect(page).toHaveURL(/\/ajuda\/$/);
  await expect(page.locator('.hc-index-heading h2')).toHaveText('Quotas');
});
