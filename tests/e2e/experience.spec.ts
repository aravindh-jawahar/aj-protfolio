import { expect, test } from '@playwright/test';

test('experience lists every role newest first with company, role and dates', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('#experience details');
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText('Francium Tech · MoneySmart');
  await expect(rows.nth(0)).toContainText('Jan 2022 – present');
  await expect(rows.nth(1)).toContainText('Artus Meggitt');
  await expect(rows.nth(1)).toContainText('Mar 2021 – Sep 2021');
  await expect(rows.nth(2)).toContainText('CADS Software India');
});

test('details open in place with grouped outcomes and no partner names', async ({ page }) => {
  await page.goto('/');
  const moneysmart = page.locator('#experience details').first();
  await expect(moneysmart.getByText('Retrieval pipeline')).toBeHidden();
  await moneysmart.locator('summary').click();
  await expect(moneysmart).toHaveAttribute('open', '');
  await expect(moneysmart).toContainText('100K+ daily users');
  await expect(moneysmart).toContainText(/a bank/i);
  await expect(moneysmart.getByRole('heading', { name: 'AI assistant (RAG)' })).toBeVisible();
});

test('details toggle from the keyboard', async ({ page }) => {
  await page.goto('/');
  const meggitt = page.locator('#experience details').nth(1);
  await meggitt.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(meggitt).toHaveAttribute('open', '');
  await expect(meggitt).toContainText('PyQt5');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('details still open', async ({ page }) => {
    await page.goto('/');
    const cads = page.locator('#experience details').nth(2);
    await cads.locator('summary').click();
    await expect(cads).toContainText('70%');
  });
});

test('education is its own section with both degrees', async ({ page }) => {
  await page.goto('/');
  const education = page.locator('#education');
  await expect(education.getByRole('heading', { level: 2 })).toHaveText('Education');
  await expect(education.locator('article')).toHaveCount(2);
  await expect(education).toContainText('M.S. IT Project Management & Development');
  await expect(education).toContainText('2019 – 2021');
  await expect(education).toContainText('Anna University');
  await expect(page.locator('#experience')).not.toContainText('Anna University');
});

test('phone has no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#experience details').first().locator('summary').click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
