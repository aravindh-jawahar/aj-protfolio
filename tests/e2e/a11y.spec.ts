import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const scheme of ['dark'] as const) {
  for (const width of [1440, 390]) {
    test(`home has no axe violations (${scheme}, ${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
      await page.goto('./');
      await page.locator('#experience summary').first().click();
      const { violations } = await new AxeBuilder({ page }).analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([]);
    });
  }
}

test('404 has no axe violations', async ({ page }) => {
  await page.goto('./404');
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test('head has favicon, og image and a short description', async ({ page, request }) => {
  await page.goto('./');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description!.length).toBeLessThanOrEqual(160);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/aj-protfolio/favicon.svg');
  for (const path of ['./favicon.svg', './og.png', './robots.txt', './sitemap-index.xml']) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});
