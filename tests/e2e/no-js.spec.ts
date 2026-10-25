import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('without JavaScript the static career list shows every span', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.trace')).toBeHidden();
  await expect(page.locator('.career-list')).toBeVisible();
  const details = page.locator('.career-list details');
  await expect(details).toHaveCount(7);
  const moneysmart = details.filter({ hasText: 'Francium Tech · MoneySmart' });
  await moneysmart.locator('summary').click();
  await expect(moneysmart).toContainText('99.9% uptime');
});
