import { expect, test } from '@playwright/test';

test('hero has headline, both calls to action and resume stats', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('#top');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('I build AI products and the systems they run on');
  await expect(hero.getByRole('link', { name: /Download resume/ })).toHaveAttribute('href', '/resume/Aravindh_Jawahar_Resume.pdf');
  await expect(hero.getByRole('link', { name: /Get in touch/ })).toHaveAttribute('href', '/#contact');
  for (const stat of ['100K+', '6 years', '99.9%']) await expect(hero).toContainText(stat);
  await expect(hero.locator('img')).toHaveAttribute('alt', 'Aravindh Jawahar');
});

test('impact numbers and service cards come from the resume', async ({ page }) => {
  await page.goto('/');
  for (const n of ['300+', '25%', '40%']) await expect(page.locator('#impact')).toContainText(n);
  await expect(page.locator('#services h3')).toHaveText([
    'AI products', 'Full-stack platforms', 'Reliability & performance', 'SEO & growth',
  ]);
});

test('site is dark only, with no theme toggle', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Toggle dark mode' })).toHaveCount(0);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const [r, g, b] = bg.match(/\d+/g)!.map(Number);
  expect(r + g + b).toBeLessThan(60);
});

test('get in touch scrolls smoothly to contact, clear of the sticky header', async ({ page }) => {
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('smooth');
  await page.locator('#top').getByRole('link', { name: /Get in touch/ }).click();
  const contact = page.locator('#contact');
  await expect(contact).toBeInViewport();
  const headerBottom = await page.locator('.site-header').evaluate((el) => el.getBoundingClientRect().bottom);
  await expect.poll(() => contact.evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(headerBottom - 1);
});
