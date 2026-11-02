import { test, expect } from '@playwright/test';

for (const javaScriptEnabled of [false, true]) {
  test(`content and language navigation with JavaScript ${javaScriptEnabled ? 'enabled' : 'disabled'}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    for (const route of ['/', '/en/', '/app/', '/en/app/', '/help/', '/help/create-first-condominium/', '/ajuda/criar-primeiro-condominio/', '/en/privacy/', '/about/', '/en/about/', '/contact/', '/en/contact/']) {
      await page.goto(`http://127.0.0.1:4174${route}`);
      await expect(page.locator('h1')).toBeVisible();
      if (route === '/app/' || route === '/en/app/') {
        await expect(page.getByRole('link', { name: route === '/app/' ? 'Entrar como condómino' : 'Log in as a resident', exact: true })).toHaveAttribute('href', 'https://app.habitae.pt/resident/');
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.goto('http://127.0.0.1:4174/');
    const wordmark = page.locator('.mk-header .habitae-wordmark').first();
    await expect(wordmark).toBeVisible();
    expect(await wordmark.evaluate((element) => getComputedStyle(element, '::before').backgroundImage)).toContain('habitae-icon.svg');
    if (javaScriptEnabled) await page.getByRole('button', { name: 'Rejeitar opcionais', exact: true }).first().click();
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('h1')).toContainText('Your whole');
    if (javaScriptEnabled) {
      await page.goto('http://127.0.0.1:4174/?lang=en');
      await expect(page).toHaveURL(/\/en\/$/);
      await expect(page.locator('.cookie-banner')).toHaveCount(0);
      await page.getByRole('button', { name: 'Manage cookies', exact: true }).click();
      await page.locator('#cookie-preferences').check();
      await page.getByRole('button', { name: 'Save choices', exact: true }).click();
      await page.goto('http://127.0.0.1:4174/');
      await expect(page).toHaveURL(/\/en\/$/);
      await page.getByRole('link', { name: 'Português', exact: true }).click();
      await expect(page).toHaveURL('http://127.0.0.1:4174/');
      await page.reload();
      await expect(page.locator('h1')).toContainText('O condomínio');
    }
    expect(errors).toEqual([]);
    await context.close();
  });
}

test('analytics loads only after consent and stops on withdrawal', async ({ page, context }) => {
  let tags = 0;
  await context.route('https://www.googletagmanager.com/**', async route => { tags++; await route.fulfill({ contentType: 'application/javascript', body: '' }); });
  await page.goto('/en/app/');
  await page.getByRole('button', { name: 'Customise', exact: true }).click();
  await page.locator('#cookie-preferences').check();
  await page.getByRole('button', { name: 'Save choices', exact: true }).click();
  expect(tags).toBe(0);
  await expect(page.getByRole('link', { name: 'Log in', exact: true }).last()).toHaveAttribute('href', 'https://app.habitae.pt/app/');
  await page.getByRole('button', { name: 'Manage cookies', exact: true }).click();
  await page.locator('#cookie-analytics').check();
  await page.getByRole('button', { name: 'Save choices', exact: true }).click();
  await expect.poll(() => tags).toBe(1);
  await page.reload();
  await expect.poll(() => tags).toBe(2);
  await page.getByRole('button', { name: 'Manage cookies', exact: true }).click();
  await expect(page.locator('#cookie-analytics')).toBeChecked();
  await page.locator('#cookie-analytics').uncheck();
  await Promise.all([page.waitForEvent('load'), page.getByRole('button', { name: 'Save choices', exact: true }).click()]);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('habitae-cookie-consent')!).analytics)).toBe(false);
  expect(tags).toBe(2);
});
