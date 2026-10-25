import { expect, test } from '@playwright/test';

test('header nav links to every section', async ({ page }) => {
  await page.goto('/');
  for (const [name, id] of [['Work', 'work'], ['Stack', 'stack'], ['Contact', 'contact']]) {
    await expect(page.getByRole('navigation').getByRole('link', { name, exact: true })).toHaveAttribute("href", `/#${id}`);
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test('contact offers the resume and never shows the phone number', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contact a[href$=".pdf"]')).toHaveAttribute('href', '/resume/Aravindh_Jawahar_Resume.pdf');
  await expect(page.locator('#contact img')).toHaveAttribute('alt', 'Aravindh Jawahar');
  await expect(page.locator('#stack')).toContainText('pgvector');
  expect(await page.content()).not.toContain('8870637220');
});

test('404 page is noindex and links home', async ({ page }) => {
  await page.goto('/404');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('main').getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  await expect(page.locator('main img')).toBeVisible();
});
