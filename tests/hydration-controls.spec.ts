import { test, expect, type Page } from '@playwright/test';
import { CONSENT_KEY, CONSENT_VERSION, CONSENT_DURATION_MS, LANGUAGE_KEY } from '../src/consent';

async function pauseScripts(page: Page) {
  let release!: () => void;
  const ready = new Promise<void>(resolve => { release = resolve; });
  await page.route(/\/assets\/.*\.js$/, async route => {
    await ready;
    await route.continue();
  });
  return release;
}

test('help controls wait for hydration and the first category click opens the index', async ({ page }) => {
  const release = await pauseScripts(page);
  try {
    await page.goto('/ajuda/comecar-aqui/', { waitUntil: 'commit' });
    await expect(page.locator('.hc-article h1')).toBeVisible();
    const category = page.getByRole('button', { name: /^Quotas/ });
    await expect(category).toBeDisabled();
    await expect(page.getByRole('searchbox')).toBeDisabled();
    const click = category.click();
    release();
    await click;
    await expect(page).toHaveURL(/\/ajuda\/$/);
    await expect(page.locator('.hc-index-heading h2')).toHaveText('Quotas');
    await page.getByRole('searchbox').fill('zzzz-no-match');
    await expect(page.locator('.hc-empty')).toBeVisible();
  } finally {
    release();
  }
});

test('returning visitors can open cookie settings on the first click after hydration', async ({ page }) => {
  // No banner is expected for a visitor who has already rejected optional storage.
  const now = Date.now();
  await page.addInitScript(({ key, choice }) => localStorage.setItem(key, JSON.stringify(choice)), {
    key: CONSENT_KEY,
    choice: { version: CONSENT_VERSION, preferences: false, analytics: false, updatedAt: now, expiresAt: now + CONSENT_DURATION_MS },
  });
  const release = await pauseScripts(page);
  try {
    await page.goto('/en/', { waitUntil: 'commit' });
    const settings = page.getByRole('button', { name: 'Manage cookies', exact: true });
    await expect(settings).toBeDisabled();
    const click = settings.click();
    release();
    await click;
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.locator('#cookie-preferences').check();
    await page.getByRole('button', { name: 'Save choices', exact: true }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    const choice = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), CONSENT_KEY);
    expect(choice.preferences).toBe(true);
    expect(choice.analytics).toBe(false);
  } finally {
    release();
  }
});

test('a native Portuguese link overrides remembered English before its click handler loads', async ({ page }) => {
  const now = Date.now();
  await page.addInitScript(({ consentKey, languageKey, choice }) => {
    if (!localStorage.getItem(consentKey)) {
      localStorage.setItem(consentKey, JSON.stringify(choice));
      localStorage.setItem(languageKey, 'en');
    }
  }, {
    consentKey: CONSENT_KEY, languageKey: LANGUAGE_KEY,
    choice: { version: CONSENT_VERSION, preferences: true, analytics: false, updatedAt: now, expiresAt: now + CONSENT_DURATION_MS },
  });
  const release = await pauseScripts(page);
  try {
    await page.goto('/en/', { waitUntil: 'commit' });
    await page.getByRole('link', { name: 'Português', exact: true }).click({ noWaitAfter: true });
    await page.waitForURL('http://127.0.0.1:4174/', { waitUntil: 'commit' });
    release();
    await expect(page.getByRole('button', { name: 'Gerir cookies', exact: true })).toBeEnabled();
    await expect(page).toHaveURL('http://127.0.0.1:4174/');
    await expect(page.locator('h1')).toContainText('O condomínio');
    expect(await page.evaluate(key => localStorage.getItem(key), LANGUAGE_KEY)).toBe('pt');
    await page.reload();
    await expect(page.locator('h1')).toContainText('O condomínio');
  } finally {
    release();
  }
});
