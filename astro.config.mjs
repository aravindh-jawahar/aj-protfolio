import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Served from github.io until aravindhjawahar.dev is registered; then set site to the domain and drop base.
  site: 'https://aravindh-jawahar.github.io',
  base: '/aj-protfolio',
  output: 'static',
  integrations: [sitemap()],
});
