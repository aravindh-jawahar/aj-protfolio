import type { StackGroup } from './types';

export const stack: StackGroup[] = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Ruby', 'Python', 'SQL'] },
  { name: 'Backend', items: ['Ruby on Rails', 'Node.js/Express', 'REST APIs', 'Sidekiq', 'Karafka', 'BullMQ'] },
  { name: 'Frontend & desktop', items: ['Vue 3', 'Nuxt 2 & 3', 'React', 'Redux', 'Tailwind CSS', 'PyQt5'] },
  { name: 'Data & search', items: ['PostgreSQL', 'pgvector', 'Redis', 'Elasticsearch', 'Kafka'] },
  { name: 'AI', items: ['Claude Code', 'Claude API (tool use)', 'RAG pipelines', 'MCP servers', 'LangGraph', 'n8n'] },
  {
    name: 'Infra & observability',
    items: ['Docker', 'Kubernetes', 'AWS', 'Cloudflare Workers', 'CircleCI', 'Jenkins', 'Datadog', 'Sentry'],
  },
  { name: 'Testing', items: ['RSpec', 'Capybara', 'Jest', 'Cypress', 'Playwright', 'pytest'] },
  { name: 'Product & growth', items: ['GrowthBook', 'Braze', 'Segment', 'Contentful', 'Strapi'] },
];
