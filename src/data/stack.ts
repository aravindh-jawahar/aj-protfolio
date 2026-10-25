import type { StackGroup } from './types';

export const stack: StackGroup[] = [
  {
    name: 'AI engineering',
    featured: true,
    items: [
      'RAG pipelines', 'Vector embeddings', 'pgvector semantic search', 'Hybrid retrieval + tool routing',
      'Claude API (tool use, streaming)', 'MCP servers (TypeScript)', 'LangGraph', 'n8n',
      'Guardrails for source-grounded answers', 'Prompt engineering', 'Claude Code (agentic)', 'GitHub Copilot',
    ],
  },
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Ruby', 'Python', 'SQL'] },
  { name: 'Backend', items: ['Ruby on Rails', 'Node.js/Express', 'REST APIs', 'Sidekiq', 'Karafka', 'BullMQ'] },
  { name: 'Frontend & desktop', items: ['Vue 3', 'Nuxt 2 & 3', 'React', 'Redux', 'Tailwind CSS', 'PyQt5'] },
  { name: 'Data & search', items: ['PostgreSQL', 'pgvector', 'Redis', 'Elasticsearch', 'Kafka'] },
  {
    name: 'Infra & observability',
    items: ['Docker', 'Kubernetes', 'AWS', 'Cloudflare Workers', 'CircleCI', 'Jenkins', 'Datadog', 'Sentry'],
  },
  { name: 'Testing', items: ['RSpec', 'Capybara', 'Jest', 'Cypress', 'Playwright', 'pytest'] },
  { name: 'Product & growth', items: ['GrowthBook', 'Braze', 'Segment', 'Contentful', 'Strapi'] },
];
