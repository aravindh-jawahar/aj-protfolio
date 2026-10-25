import type { Role } from './types';

export const experience: Role[] = [
  {
    id: 'moneysmart',
    company: 'Francium Tech · MoneySmart',
    location: 'Chennai · Singapore & Hong Kong',
    role: 'Senior software engineer',
    badge: 'FM',
    colour: 'ruby',
    start: '2022-01',
    end: null,
    summary: 'Fintech comparison platform for Singapore and Hong Kong, built through Francium Tech, Chennai.',
    stack: [
      'Ruby on Rails 7', 'Vue 3', 'Nuxt 2/3', 'React', 'Node.js/Express', 'TypeScript', 'PostgreSQL 14',
      'pgvector', 'Redis', 'Elasticsearch', 'Sidekiq', 'Karafka', 'BullMQ', 'Docker', 'Kubernetes', 'AWS',
      'Cloudflare Workers', 'Claude API', 'Claude Code', 'MCP servers', 'n8n', 'LangGraph',
    ],
    details: [
      {
        points: [
          'Senior engineer and repository owner for a platform serving 100K+ daily users — features end to end from business requirements and tech specs to delivery and success metrics; mentors teammates.',
        ],
      },
      {
        heading: 'AI assistant (RAG)',
        points: [
          'Retrieval pipeline over product content, FAQs and guides in pgvector.',
          'Claude API / MCP tool layer for live Singapore and Hong Kong product data.',
          'Hybrid routing — retrieval for knowledge, tool calls for fees and promos — behind streaming APIs with Redis caching and guardrails.',
        ],
      },
      {
        heading: 'AEO / SEO',
        points: [
          'Led a 4-engineer team adding JSON-LD schema across 300+ pages.',
          'Fixed Nuxt 3 SSR gaps that hid comparison content from crawlers (LCP < 2.5s, CLS < 0.1 with Cloudflare edge caching).',
          'n8n AI workflows for meta titles and descriptions with validation and human review.',
        ],
      },
      {
        heading: 'Purchase and partner integrations',
        points: [
          'End-to-end purchase flows for insurers with Stripe.',
          "A bank's credit-card apply flow with Karafka events to the data lake.",
          'CRM sync — contributing to a 25% conversion uplift on key insurance products.',
        ],
      },
      {
        heading: 'Content, search and engagement',
        points: [
          'Contentful and Strapi integrations so content ships without releases.',
          'Elasticsearch relevance tuning; Braze lifecycle campaigns.',
        ],
      },
      {
        heading: 'Experimentation',
        points: [
          'GrowthBook A/B testing with SSR anti-flicker handling.',
          'Tech lead on the comparison-page revamp; zero-incident deprecation of a feature across 4 repos.',
        ],
      },
      {
        heading: 'Reliability',
        points: [
          'Traced Sidekiq OOM crashes to malloc arena fragmentation; fixed with jemalloc and Kubernetes limits.',
          'Idempotent Kafka/Karafka and Sidekiq consumers, 99.9% uptime.',
          'Multi-layer caching across Cloudflare Workers, Redis and SSR.',
        ],
      },
      {
        heading: 'Rewards store and AI tooling',
        points: [
          'Rewards store with a voucher engine and partner vouchers.',
          'MCP servers exposing live product data to LLMs, and a Sidekiq ops MCP server with scoped, blast-radius-limited actions.',
          'Daily Claude Code use across multi-repo work.',
        ],
      },
    ],
  },
  {
    id: 'meggitt',
    company: 'Artus Meggitt',
    location: 'Avrillé, France',
    role: 'Full-stack developer',
    badge: 'AM',
    colour: 'node',
    start: '2021-03',
    end: '2021-09',
    summary: 'Aviation manufacturing. Sole full-stack developer on site.',
    stack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Knex', 'Passport/JWT', 'Jest', 'Python', 'PyQt5', 'SQLite'],
    details: [
      {
        heading: 'Manufacturing order lifecycle platform (web)',
        points: [
          'Order lifecycle from intake to delivery sign-off.',
          'Role-based access for operators, supervisors and managers.',
          '40% faster API queries via PostgreSQL index tuning.',
        ],
      },
      {
        heading: 'Shop-floor tooling & inspection app (Windows)',
        points: [
          'Python + PyQt5 app for recording tooling usage and inspection checks.',
          'Offline-first capture in SQLite with background sync to PostgreSQL.',
        ],
      },
    ],
  },
  {
    id: 'cads',
    company: 'CADS Software India',
    location: 'Chennai, India',
    role: 'KPI reporting platform',
    badge: 'CS',
    colour: 'node',
    start: '2018-05',
    end: '2019-01',
    summary: 'KPI tracking and management reporting platform.',
    stack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Docker', 'Jenkins', 'Airbrake'],
    details: [
      {
        points: [
          'Multi-department KPI platform with scheduled Node.js import jobs feeding executive dashboards.',
          'Materialized views and indexed aggregates cut repeated aggregation load by ~50%.',
          'Docker + Jenkins CI/CD cut manual deployment effort by 70%; N+1 fixes sped up reports by 35%.',
        ],
      },
    ],
  },
];
