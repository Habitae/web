import { test, expect } from '@playwright/test';

for (const javaScriptEnabled of [false, true]) {
  test(`About and Contact navigation works with JavaScript ${javaScriptEnabled ? 'enabled' : 'disabled'}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 320, height: 740 } });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4174/en/');
    if (javaScriptEnabled) await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
    await page.locator('footer').getByRole('link', { name: 'About Habitae', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/about\/$/);
    await expect(page.locator('h1')).toHaveText('About Habitae');
    await expect(page.locator('article')).toContainText('software project for Portugal');
    await page.locator('main .legal-documents').getByRole('link', { name: 'Contact Habitae', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/contact\/$/);
    await expect(page.locator('h1')).toHaveText('Contact Habitae');
    await expect(page.locator('article a[href^="mailto:"]')).toHaveAttribute('href', 'mailto:joaollfrias@hotmail.com');
    await expect(page.locator('article a[href^="tel:"]')).toHaveAttribute('href', 'tel:+351923072360');
    await expect(page.locator('article')).toContainText('2435-087 Caxarias');
    await page.locator('footer').getByRole('link', { name: 'Português', exact: true }).click();
    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.locator('h1')).toHaveText('Contactar o Habitae');
    await page.locator('main .legal-documents').getByRole('link', { name: 'Sobre o Habitae', exact: true }).click();
    await expect(page).toHaveURL(/\/about\/$/);
    await expect(page.locator('h1')).toHaveText('Sobre o Habitae');
    for (const route of ['/about/', '/contact/', '/en/about/', '/en/contact/']) {
      await page.goto(`http://127.0.0.1:4174${route}`);
      expect((await page.locator('article').innerText()).length).toBeGreaterThanOrEqual(500);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    if (javaScriptEnabled) await page.screenshot({ path: 'agent-verification/contact-mobile.png', fullPage: true });
    expect(errors).toEqual([]);
    await context.close();
  });
}
