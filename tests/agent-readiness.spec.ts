import { test, expect } from '@playwright/test';

test.describe('agent edge HTTP behavior', () => {
  test.skip(process.env.HABITAE_TEST_EDGE !== 'true', 'Requires the actual Worker runtime: pnpm test:edge');

  test('browsers keep the styled 404 while agents receive Markdown recovery links', async ({ page, request }) => {
    const response = await page.goto('/missing-agent-check');
    expect(response?.status()).toBe(404);
    await expect(page.locator('.not-found-page')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Esta página não existe');
    const agent = await request.get('/missing-agent-check', { headers: { Accept: 'text/markdown' } });
    expect(agent.status()).toBe(404);
    expect(agent.headers()['content-type']).toBe('text/markdown; charset=utf-8');
    expect(await agent.text()).toContain('https://habitae.pt/llms.txt');
    expect(agent.headers().vary.toLowerCase()).toContain('accept');
  });

  test('legacy English URLs and help links work without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4174/?lang=en');
    await expect(page).toHaveURL('http://127.0.0.1:4174/en/');
    await expect(page.locator('h1')).toContainText('Your whole');
    await page.goto('http://127.0.0.1:4174/help/create-first-condominium/');
    await expect(page.locator('h1')).toHaveText('Create your first condominium');
    await context.close();
  });

  test('HTML and Markdown remain separate after alternating requests', async ({ request }) => {
    for (const accept of ['text/markdown', 'text/html', 'text/markdown', 'text/html']) {
      const response = await request.get('/en/', { headers: { Accept: accept } });
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toBe(`${accept}; charset=utf-8`);
      expect(response.headers().vary.toLowerCase()).toContain('accept');
      expect(response.headers()['cache-control']).toBe('no-store');
      const body = await response.text();
      if (accept === 'text/html') expect(body).toContain('<h1');
      else expect(body).toContain('canonical: https://habitae.pt/en/');
    }
  });
});
