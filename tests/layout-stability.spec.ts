import { test, expect } from '@playwright/test';

for (const route of ['/', '/en/', '/help/create-first-condominium/', '/en/app/']) {
  test(`mobile header keeps its layout through hydration: ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 412, height: 823 });
    let releaseScripts!: () => void;
    const scriptsReady = new Promise<void>(resolve => { releaseScripts = resolve; });
    await page.route(/\/assets\/.*\.js$/, async route => {
      await scriptsReady;
      await route.continue();
    });
    try {
      await page.goto(route, { waitUntil: 'commit' });
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const header = page.locator('header.site-chrome');
      await expect(header).toHaveCSS('position', 'sticky');
      const before = await header.boundingBox();
      expect(before).not.toBeNull();
      await expect(page.locator('.mk-menu-toggle')).toBeDisabled();
      releaseScripts();
      await expect(page.locator('.cookie-banner')).toBeVisible();
      const after = await header.boundingBox();
      expect(after).not.toBeNull();
      expect(Math.abs(after!.height - before!.height)).toBeLessThan(1);
      expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
      await page.locator('.mk-menu-toggle').click();
      await expect(page.locator('#marketing-navigation')).toBeVisible();
    } finally {
      releaseScripts();
    }
  });
}

test('mobile navigation remains usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 412, height: 823 } });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4174/en/');
    await expect(page.locator('.mk-menu-toggle')).not.toBeVisible();
    await page.locator('#marketing-navigation').getByRole('link', { name: 'Blog', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/blog\/$/);
    await expect(page.locator('h1')).toBeVisible();
  } finally {
    await context.close();
  }
});
