import { expect, test } from '@playwright/test';

test('theme toggle persists across reloads without a flash', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

  // Capture the attribute as soon as the DOM is parsed, before any module script runs.
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      (window as any).__themeAtParse = document.documentElement.dataset.theme;
    });
  });
  await page.reload();
  expect(await page.evaluate(() => (window as any).__themeAtParse)).toBe('dark');

  await page.getByRole('button', { name: 'Toggle dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
