import { test, expect } from '@playwright/test';
import { blogPosts, blogPath } from '../src/content/blog';

for (const javaScriptEnabled of [false, true]) {
  test(`blog discovery, translations and readable articles with JavaScript ${javaScriptEnabled}`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4174/');
    if (javaScriptEnabled) await page.getByRole('button', { name: 'Rejeitar opcionais', exact: true }).click();
    await page.getByRole('link', { name: 'Blog do condomínio', exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/$/);
    await expect(page.locator('.blog-card')).toHaveCount(blogPosts.pt.length);
    await page.locator('.blog-grid').getByRole('link', { name: blogPosts.pt[0].title, exact: true }).click();
    await expect(page.locator('h1')).toHaveText(blogPosts.pt[0].title);
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(blogPath('en', blogPosts.en[0]) + '$'));
    await expect(page.locator('h1')).toHaveText(blogPosts.en[0].title);
    await page.getByRole('link', { name: 'Português', exact: true }).click();
    await expect(page.locator('h1')).toHaveText(blogPosts.pt[0].title);
    for (const language of ['pt', 'en'] as const) {
      for (const post of blogPosts[language]) {
        await page.goto(`http://127.0.0.1:4174${blogPath(language, post)}`);
        await expect(page.locator('h1')).toHaveText(post.title);
        await expect(page.locator('article.legal-article')).toContainText(post.sections[0].paragraphs[0]);
        await expect(page.locator('.blog-card')).toHaveCount(Math.min(3, blogPosts[language].length - 1));
        if (post.id === 'arrears') {
          const legacyAnchors = language === 'pt'
            ? { lembrete: 'conferir-saldo', rotina: 'ata' }
            : { reminder: 'check-balance', routine: 'minutes' };
          for (const [anchor, section] of Object.entries(legacyAnchors)) {
            await page.goto(`http://127.0.0.1:4174${blogPath(language, post)}#${anchor}`);
            await expect(page.locator(`#${section} #${anchor}`)).toBeAttached();
            await expect(page.locator(`#${section} h2`)).toBeInViewport();
          }
        }
        if (post.legalReviewed) {
          await expect(page.locator('.blog-review time')).toHaveAttribute('datetime', post.legalReviewed);
          await expect(page.locator('.legal-reference-links a').first()).toBeVisible();
          const firstSection = post.sections[0];
          await page.getByRole('link', { name: firstSection.heading, exact: true }).click();
          await expect(page).toHaveURL(new RegExp(`#${firstSection.id}$`));
        } else {
          await expect(page.locator('.blog-review')).toHaveCount(0);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
        await expect(page.locator('.blog-next a').last()).toHaveAttribute('href', language === 'en' ? '/en/app/' : '/app/');
      }
    }
    if (javaScriptEnabled) {
      await page.goto(`http://127.0.0.1:4174${blogPath('pt', blogPosts.pt[0])}?lang=en`);
      await expect(page).toHaveURL(new RegExp(blogPath('en', blogPosts.en[0]) + '$'));
    }
    const response = await page.goto('http://127.0.0.1:4174/blog/not-a-real-post/');
    expect(response?.status()).toBe(404);
    expect(errors).toEqual([]);
    await context.close();
  });
}

for (const language of ['pt', 'en'] as const) {
  test(`blog topic search and recovery in ${language}`, async ({ page }) => {
    await page.goto(blogPath(language));
    const search = page.getByRole('searchbox', { name: language === 'en' ? 'Search articles' : 'Pesquisar artigos' });
    const topic = blogPosts[language].find(post => post.id === 'handover')!;
    await page.getByRole('button', { name: topic.category, exact: true }).click();
    await expect(page.locator('.blog-card')).toHaveCount(1);
    await expect(page.locator('.blog-card h3')).toHaveText(topic.title);
    await search.fill('zzzz-no-match');
    await expect(page.locator('.blog-card')).toHaveCount(0);
    await expect(page.locator('.blog-empty')).toBeVisible();
    await page.getByRole('button', { name: language === 'en' ? 'Show all articles' : 'Ver todos os artigos', exact: true }).click();
    await expect(search).toHaveValue('');
    await expect(page.locator('.blog-card')).toHaveCount(blogPosts[language].length);
    await search.fill(language === 'en' ? 'MAINTENANCE' : 'manutencao');
    await expect(page.locator('.blog-card')).toHaveCount(1);
    await expect(page.locator('.blog-card h3')).toHaveText(blogPosts[language].find(post => post.id === 'repairs')!.title);
    await page.setViewportSize({ width: 1280, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.locator('.blog-card h3 a').click();
    await expect(page.locator('.blog-byline')).toContainText(language === 'en' ? 'min read' : 'min de leitura');
    await expect(page.getByText('Habitae · Cobranças', { exact: true })).toHaveCount(0);
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByRole('button', { name: language === 'en' ? 'Copy link' : 'Copiar ligação', exact: true }).click();
    await expect(page.locator('.blog-copy-status')).toHaveText(language === 'en' ? 'Link copied' : 'Ligação copiada');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(page.url());
  });
}

test('blog layouts fit mobile, tablet and desktop', async ({ page }, testInfo) => {
  await page.goto('/en/blog/');
  await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [blogPath('en'), blogPath('en', blogPosts.en[0])]) {
      await page.goto(path);
      await expect(page.locator('.blog-eyebrow')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await page.screenshot({ path: testInfo.outputPath(`${width}-${path === blogPath('en') ? 'index' : 'article'}.png`), fullPage: true });
    }
  }
});
