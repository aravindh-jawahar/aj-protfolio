import { expect, test } from '@playwright/test';

const span = (page: import('@playwright/test').Page, name: RegExp) =>
  page.locator('.trace').getByRole('button', { name });

// The island hydrates on client:visible; Astro drops the `ssr` attribute once it has.
async function openTrace(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.waitForSelector('astro-island:not([ssr])', { state: 'attached' });
}

test('keyboard opens, moves between and closes spans', async ({ page }) => {
  await openTrace(page);
  const be = span(page, /Anna University/);
  const cads = span(page, /CADS Software/);
  await be.focus();
  await page.keyboard.press('Enter');
  await expect(be).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.trace .span-detail')).toContainText('2014 – 2018');

  await page.keyboard.press('ArrowDown');
  await expect(cads).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(be).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.trace .span-detail')).toHaveCount(1);
  await expect(page.locator('.trace .span-detail')).toContainText('KPI');

  await page.keyboard.press('Escape');
  await expect(page.locator('.trace .span-detail')).toHaveCount(0);
  await expect(cads).toBeFocused();
});

test('moneysmart panel shows outcomes without partner names', async ({ page }) => {
  await openTrace(page);
  await span(page, /Francium Tech · MoneySmart/).click();
  const panel = page.locator('.trace .span-detail');
  await expect(panel).toContainText('100K+ daily users');
  await expect(panel).toContainText(/a bank/i);
});

test('mobile has no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openTrace(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  for (const button of await page.locator('.trace button.span').all()) {
    await expect(button).toBeVisible();
  }
  await expect(page.locator('.trace button.span')).toHaveCount(7);
});

test('phone: focusing a span highlights its own bar and dims the rest', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openTrace(page);
  await span(page, /Anna University/).focus();
  const opacity = (id: string) =>
    page.locator(`#span-${id} .bar`).evaluate((el) => Number(getComputedStyle(el).opacity));
  await expect.poll(() => opacity('cads')).toBeLessThan(0.5);
  expect(await opacity('be')).toBe(1);
});

test('phone: opening a span scrolls its labelled panel into view', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openTrace(page);
  await span(page, /Anna University/).click();
  const panel = page.locator('.trace .span-detail');
  await expect(panel).toContainText('Anna University');
  await expect(panel).toBeInViewport();
});

test('desktop: child spans are marked as nested', async ({ page }) => {
  await openTrace(page);
  const marker = (id: string) =>
    page.locator(`#span-${id} .span__label`).evaluate((el) => getComputedStyle(el, '::before').content);
  expect(await marker('meggitt-web')).toContain('↳');
  expect(await marker('cads')).toBe('none');
});
