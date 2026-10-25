import { expect, test } from '@playwright/test';

test('AI engineering section shows the RAG pipeline in order', async ({ page }) => {
  await page.goto('/');
  const ai = page.locator('#ai');
  await expect(ai.getByRole('heading', { level: 2 })).toHaveText('AI engineering');
  await expect(ai.locator('.pipeline li h3')).toHaveText([
    'Sources', 'Chunk & embed', 'pgvector', 'Hybrid router', 'Claude', 'Guardrails', 'Streamed answer',
  ]);
  await expect(ai.locator('.ai-cards h3')).toHaveText(['Agents & MCP', 'AI workflows', 'AI-native development']);
});

test('stack AI group is the detailed featured card', async ({ page }) => {
  await page.goto('/');
  const ai = page.locator('#stack .group--featured');
  await expect(ai).toContainText('pgvector');
  await expect(ai).toContainText('Vector embeddings');
  await expect(ai).toContainText('Prompt engineering');
});

test('site ships no client JavaScript', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('script[type="module"], astro-island').count()).toBe(0);
});
