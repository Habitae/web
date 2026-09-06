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
        await expect(page.locator('#waitlist-role option[value="resident"]')).toHaveText(route === '/app/' ? 'Morador' : 'Resident');
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    await page.goto('http://127.0.0.1:4174/');
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

test('signup handles failures, tracks only consented success, and stops tracking on withdrawal', async ({ page, context }) => {
  let tags = 0;
  let fail = true;
  await context.route('https://www.googletagmanager.com/**', async route => { tags++; await route.fulfill({ contentType: 'application/javascript', body: '' }); });
  await context.route('https://waitlist.example/waitlist', route => {
    expect(new URLSearchParams(route.request().postData()!).get('role')).toBe('resident');
    return route.fulfill({ status: fail ? 503 : 200, contentType: 'application/json', body: JSON.stringify({ ok: !fail }) });
  });
  await page.goto('/en/app/');
  await page.getByRole('button', { name: 'Customise', exact: true }).click();
  await page.locator('#cookie-preferences').check();
  await page.getByRole('button', { name: 'Save choices', exact: true }).click();
  expect(tags).toBe(0);
  await page.locator('#waitlist-email').fill('test@example.com');
  await page.locator('#waitlist-role').selectOption('resident');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button', { name: 'Join the waitlist', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('couldn’t save');
  await expect(page.locator('#waitlist-email')).toHaveValue('test@example.com');
  fail = false;
  await page.getByRole('button', { name: 'Join the waitlist', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('You’re on the list');
  expect(await page.evaluate(() => window.dataLayer?.length || 0)).toBe(0);
  await page.reload();
  await page.getByRole('button', { name: 'Manage cookies', exact: true }).click();
  await page.locator('#cookie-analytics').check();
  await page.getByRole('button', { name: 'Save choices', exact: true }).click();
  await expect.poll(() => tags).toBe(1);
  await page.locator('#waitlist-email').fill('second@example.com');
  await page.locator('#waitlist-role').selectOption('resident');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button', { name: 'Join the waitlist', exact: true }).click();
  await expect(page.getByRole('status')).toBeVisible();
  const data = await page.evaluate(() => JSON.stringify(window.dataLayer));
  expect(data).toContain('waitlist_signup');
  expect(data).not.toContain('example.com');
  await page.reload();
  await expect.poll(() => tags).toBe(2);
  await page.getByRole('button', { name: 'Manage cookies', exact: true }).click();
  await expect(page.locator('#cookie-analytics')).toBeChecked();
  await page.locator('#cookie-analytics').uncheck();
  await Promise.all([page.waitForEvent('load'), page.getByRole('button', { name: 'Save choices', exact: true }).click()]);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('habitae-cookie-consent')!).analytics)).toBe(false);
  expect(tags).toBe(2);
});

test('waitlist submits a native POST without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('https://waitlist.example/waitlist', async route => {
    expect(route.request().method()).toBe('POST');
    expect(route.request().postData()).toContain('email=native%40example.com');
    expect(new URLSearchParams(route.request().postData()!).get('role')).toBe('resident');
    await route.fulfill({ contentType: 'text/html', body: '<h1>Saved without JavaScript</h1>' });
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4174/en/app/');
  await page.locator('#waitlist-email').fill('native@example.com');
  await page.locator('#waitlist-role').selectOption('resident');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button', { name: 'Join the waitlist', exact: true }).click();
  await expect(page.getByRole('heading')).toHaveText('Saved without JavaScript');
  await context.close();
});
