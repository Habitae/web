import { expect, test } from '@playwright/test';

for (const javaScriptEnabled of [false, true]) {
  test(`French pages and article language links work with JavaScript ${javaScriptEnabled}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [route, heading] of [
      ['/fr/', 'Questions fréquentes'],
      ['/fr/blog/', 'Blog de gestion de copropriétés'],
      ['/fr/terms/', 'Conditions générales'],
      ['/fr/privacy/', 'Politique de confidentialité'],
      ['/fr/about/', 'À propos de Habitae'],
      ['/aide/', 'Votre copropriété, pas à pas.'],
      ['/aide/registar-pagamento-quota/', 'Enregistrer le paiement d’une charge'],
    ]) {
      await page.goto(`http://127.0.0.1:4174${route}`);
      await expect(page.locator('html')).toHaveAttribute('lang', /^fr/);
      await expect(page.getByRole('heading', { name: heading, exact: true }).first()).toBeVisible();
      if (javaScriptEnabled && await page.getByRole('button', { name: 'Refuser les cookies facultatifs', exact: true }).isVisible()) await page.getByRole('button', { name: 'Refuser les cookies facultatifs', exact: true }).click();
      await expect(page.locator('footer').getByRole('link', { name: 'Français', exact: true })).toHaveAttribute('aria-current', 'page');
      expect(await page.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
    }
    await page.locator('footer').getByRole('link', { name: 'English', exact: true }).click();
    await expect(page).toHaveURL(/\/help\/record-fee-payment\/$/);
    await page.locator('footer').getByRole('link', { name: 'Português', exact: true }).click();
    await expect(page).toHaveURL(/\/ajuda\/registar-pagamento-quota\/$/);
    await page.locator('footer').getByRole('link', { name: 'Français', exact: true }).click();
    await expect(page).toHaveURL(/\/aide\/registar-pagamento-quota\/$/);
    if (process.env.HABITAE_TEST_EDGE === 'true') {
      const response = await page.goto('http://127.0.0.1:4174/fr/unknown-i18n-page/');
      expect(response?.status()).toBe(404);
      await expect(page.locator('html')).toHaveAttribute('lang', /^fr/);
      await expect(page.getByRole('heading', { name: 'Cette page n’existe pas.', exact: true })).toBeVisible();
    }
    expect(errors).toEqual([]);
    await context.close();
  });
}

test('French consent preferences and help search translate client-only states', async ({ page }) => {
  await page.goto('/fr/');
  await expect(page.getByText('Nous conservons votre choix.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Personnaliser', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Préférences linguistiques');
  await page.getByRole('button', { name: 'Enregistrer mes choix', exact: true }).click();
  await page.goto('/aide/');
  await page.getByRole('searchbox').fill('paiement');
  await expect(page.locator('main')).toContainText('Enregistrer le paiement');
  await page.getByRole('searchbox').fill('zzzz-inexistant');
  await expect(page.locator('main')).toContainText('Aucun');
});
