# CLAUDE.md — Aravindh Jawahar Portfolio

This file is the project brief for Claude Code. Read it fully before every phase.
Do not copy the layout, copy, or visual style of any existing portfolio or template.

Content source of truth: Aravindh's "AI Product Engineer" resume
(`public/resume/Aravindh_Jawahar_Resume.pdf`). Section 5 below is taken from it. Where this file
and the resume disagree, the resume wins — ask before resolving it any other way.

---

## 1. What we are building

A personal portfolio site for **Aravindh Jawahar**, AI Product Engineer (Chennai, India),
live at **https://aravindhjawahar.dev**.
Audience: hiring managers, tech leads and recruiters for senior AI-product / full-stack roles.
Primary job of the site: in under 30 seconds, show that he ships AI features and the production
systems around them (Rails, Nuxt/Vue, React, Node/TypeScript, Python) at real scale, and make it
one click to contact him or open his resume.

## 2. Page concept

A dark landing page that leads with AI engineering (2026-10-25 redesign; the earlier career "trace
waterfall" was retired at Aravindh's request).

- **Hero:** headline, lead, resume + contact buttons, bento of portrait and resume stats.
- **AI engineering:** the RAG pipeline as a 7-step diagram (sources → chunk & embed → pgvector →
  hybrid router → Claude → guardrails → streamed answer) plus cards for agents & MCP, AI workflows
  and AI-native development (`src/data/ai.ts`).
- **Work experience:** a list of roles (badge · company + location · role + dates · Details). Each row
  is a native `<details>` that expands in place with grouped outcomes — works without JavaScript.
- **Education:** its own section with one card per degree; never mixed into experience.
- **Stack:** card grid; the "AI engineering" group is a full-width featured card with pills.

## 3. Design system

Redesigned on 2026-10-25 after Aravindh shared a dark landing-page reference (near-black, green accent,
bento cards). The earlier "quiet, light, no cards" rules are replaced by these.

### Colour (dark only — no light mode, no theme toggle)

| Token            | Value     | Use                                   |
|------------------|-----------|---------------------------------------|
| `--bg`           | `#060907` | page background                       |
| `--surface`      | `#0C110E` | cards, strip                          |
| `--surface-2`    | `#121914` | card gradient top, hover              |
| `--border`       | `#1D2820` | card borders, dividers, gridlines     |
| `--ink`          | `#EEF3EF` | primary text                          |
| `--ink-muted`    | `#9AA79E` | secondary text, axis ticks, neutral spans |
| `--accent`       | `#5CBF62` | buttons, big numbers, icons           |
| `--accent-ink`   | `#04150A` | text on accent buttons                |
| `--glow`         | `rgba(76,175,80,.18)` | radial glows behind hero/contact |
| `--span-ruby`    | `#E0566C` | Rails / Ruby work                     |
| `--span-node`    | `#6C97E0` | React / Node / TypeScript work        |
| `--span-python`  | `#E0AE45` | Python work                           |

### Type
- **Manrope** (Google Fonts) — headings (700–800) and body. **Martian Mono** only for dates
  (dates, axis ticks).
- Type scale (rem): 0.875 / 1 / 1.25 / 1.563 / 2.441 / 3.815. Body 1rem, line-height 1.6.
- Sentence case. "→" is allowed on buttons.

### Layout & shape
- Max width 1120px. Rounded cards (14px radius, thin border, subtle gradient), pill nav,
  green primary buttons.
- Sections in order: sticky header → hero (headline + bento of portrait and resume stats) →
  stack strip → impact numbers → AI engineering → services → work experience → education → stack →
  contact card → footer.
- Decorative 3D-ish shapes are CSS only (gradients/masks); no image or 3D libraries.

### Motion
- Hover transitions and smooth in-page scrolling only. Respect `prefers-reduced-motion`.

### Quality floor
- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.
- Full keyboard support with a visible focus ring; experience rows open with Enter/Space.
- The whole site works without JavaScript (it ships none).

## 4. Tech stack (decided — do not change without asking)

- **Astro 5** (static output) + **TypeScript** (strict).
- Plain Astro components, zero client JavaScript (no theme toggle — the site is dark only).
- Plain CSS with custom properties (no Tailwind, no UI kit).
- Content lives in `src/data/*.ts` typed objects — never hard-coded inside components.
- No projects section: no personal projects and no GitHub repo list on the site.
- Images: Astro `<Image>` with AVIF/WebP output. Photos live in `src/assets/images/`.
- SEO: `<title>`, meta description, Open Graph image (generated static PNG), JSON-LD
  `Person` schema, `sitemap.xml`, `robots.txt`.
- Hosting: GitHub Pages via GitHub Actions, repo `aravindh-jawahar/aj-protfolio`, custom domain
  `aravindhjawahar.dev` (`site` in astro.config = `https://aravindhjawahar.dev`, no `base`,
  `public/CNAME` contains `aravindhjawahar.dev`). See PLAN.md.

### Folder structure
```
src/
  data/        site.ts, experience.ts, education.ts, ai.ts, stack.ts, types.ts
  components/  Header, Hero, AiEngineering, Services, Experience, Education, Stack, Contact
  layouts/     Base.astro
  pages/       index.astro, 404.astro
  styles/      tokens.css, global.css
  lib/         dates.ts (formatRange)
  assets/images/  portrait.jpg (900×900 navy headshot), candid.jpg (1200×1500 beach photo)
public/        CNAME, resume/Aravindh_Jawahar_Resume.pdf, favicon.svg, og.png
```

### Photos
- `portrait.jpg` — hero bento card. Already cropped and sized; do not
  upscale.
- `candid.jpg` — the 404 page, next to a short line pointing back home.

## 5. Content (source of truth — use this, do not invent metrics)

### Identity
- Name: Aravindh Jawahar
- Title: AI Product Engineer
- One-liner: "I build AI features and the production systems they run on — RAG assistants,
  MCP servers and Rails/Nuxt platforms serving 100K+ daily users."
- Location: Chennai, India
- Email: j.aravindh@zohomail.com
- LinkedIn: https://www.linkedin.com/in/aravindh-jawahar
- GitHub: https://github.com/aravindh-jawahar
- Never name insurers, banks or other partners/clients of MoneySmart — say "insurers", "a bank".
  MoneySmart work (incl. the Sidekiq ops MCP server) is company code: no repo links.
- Do NOT put the phone number in the site's HTML. (The downloadable resume PDF contains it —
  that is Aravindh's decision.)

### Career spans (for the waterfall)
| id | label | parent | start | end | stack colour |
|----|-------|--------|-------|-----|--------------|
| be | B.E. Computer Science & Engineering — Anna University, Chennai | career | 2014 | 2018 | neutral |
| cads | CADS Software India, Chennai — KPI reporting platform | career | 2018-05 | 2019-01 | node |
| esaip | M.S. IT Project Management & Development — ESAIP, Angers, France | career | 2019 | 2021 | neutral |
| meggitt | Artus Meggitt, Avrillé, France — Full-Stack Developer | career | 2021-03 | 2021-09 | neutral (parent) |
| meggitt-web | Manufacturing order lifecycle platform (web) | meggitt | 2021-03 | 2021-09 | node |
| meggitt-desktop | Shop-floor tooling & inspection app (Windows) | meggitt | 2021-03 | 2021-09 | python |
| moneysmart | Francium Tech, Chennai — MoneySmart (Singapore & Hong Kong) | career | 2022-01 | present | ruby |

Education dates are years only on the resume. Place them on the axis using September → June as a
display default and keep the label year-only; leave a `// TODO confirm months` comment.

### Span details

**Francium Tech · MoneySmart** — fintech comparison platform (Singapore & Hong Kong), Jan 2022 → present.
Stack: Ruby on Rails 7, Vue 3, Nuxt 2/3, React, Node.js/Express, TypeScript, PostgreSQL 14, pgvector,
Redis, Elasticsearch, Sidekiq, Karafka, BullMQ, Docker, Kubernetes, AWS, Cloudflare Workers,
Claude API, Claude Code, MCP servers, n8n, LangGraph
- Senior engineer and repository owner for a platform serving 100K+ daily users — features end to
  end from business requirements and tech specs to delivery and success metrics; mentors teammates.
- *AEO / SEO:* led a 4-engineer team adding JSON-LD schema across 300+ pages; fixed Nuxt 3 SSR gaps
  that hid comparison content from crawlers (LCP < 2.5s, CLS < 0.1 with Cloudflare edge caching);
  n8n AI workflows for meta titles and descriptions with validation and human review.
- *AI assistant (RAG):* retrieval pipeline over product content, FAQs and guides in pgvector;
  Claude API / MCP tool layer for live SG/HK product data; hybrid routing (retrieval for knowledge,
  tool calls for fees and promos) behind streaming APIs with Redis caching and guardrails.
- *Purchase & partner integrations:* end-to-end purchase flows for insurers with Stripe;
  a bank's credit-card apply flow with Karafka events to the data lake;
  CRM sync — contributing to a 25% conversion uplift on key insurance products.
- *Content, search & engagement:* Contentful and Strapi integrations so content ships without
  releases; Elasticsearch relevance tuning; Braze lifecycle campaigns.
- *Experimentation:* GrowthBook A/B testing with SSR anti-flicker handling; tech lead on the
  comparison-page revamp; zero-incident deprecation of a feature across 4 repos.
- *Reliability:* traced Sidekiq OOM crashes to malloc arena fragmentation (fixed with jemalloc +
  Kubernetes limits); idempotent Kafka/Karafka and Sidekiq consumers, 99.9% uptime; multi-layer
  caching across Cloudflare Workers, Redis and SSR.
- *Rewards store & AI tooling:* rewards store with a voucher engine and partner vouchers; MCP servers exposing live
  product data to LLMs, and a Sidekiq ops MCP server with scoped, blast-radius-limited actions; daily Claude Code use across multi-repo work.

**Artus Meggitt** — aviation manufacturing, Avrillé, France, Mar → Sep 2021. Sole full-stack developer on site.
- *Web — manufacturing order lifecycle platform* (Node.js, Express, React, PostgreSQL, Knex,
  Passport/JWT, Jest): order lifecycle from intake to delivery sign-off; role-based access for
  operators, supervisors and managers; 40% faster API queries via PostgreSQL index tuning.
- *Desktop — shop-floor tooling & inspection app* (Python, PyQt5, SQLite, PostgreSQL, PyInstaller,
  pytest): Windows app for tooling usage and inspection checks; offline-first capture in SQLite with
  background sync to PostgreSQL.

**CADS Software India** — KPI tracking & management reporting platform, May 2018 → Jan 2019.
Stack: Node.js, Express, React, PostgreSQL, Docker, Jenkins, Airbrake
- Multi-department KPI platform with scheduled Node.js import jobs feeding executive dashboards.
- Materialized views and indexed aggregates cut repeated aggregation load by ~50%.
- Docker + Jenkins CI/CD cut manual deployment effort by 70%; N+1 fixes sped up reports by 35%.

### Stack (grouped, plain text)
- Languages: TypeScript, JavaScript, Ruby, Python, SQL
- Backend: Ruby on Rails, Node.js/Express, REST APIs, Sidekiq, Karafka, BullMQ
- Frontend & desktop: Vue 3, Nuxt 2 & 3, React, Redux, Tailwind CSS, PyQt5
- Data & search: PostgreSQL, pgvector, Redis, Elasticsearch, Kafka
- AI: Claude Code, Claude API (tool use), RAG pipelines, MCP servers, LangGraph, n8n
- Infra & observability: Docker, Kubernetes, AWS, Cloudflare Workers, CircleCI, Jenkins, Datadog, Sentry
- Testing: RSpec, Capybara, Jest, Cypress, Playwright, pytest
- Product & growth: GrowthBook, Braze, Segment, Contentful, Strapi

### Education
- M.S. IT Project Management & Development — ESAIP, Angers, France (2019 – 2021)
- B.E. Computer Science & Engineering — Anna University, Chennai (2014 – 2018)

## 6. Working rules for Claude Code

- Work phase by phase from PLAN.md. At the end of each phase: run `npm run build`,
  fix all errors, then stop and summarise what changed.
- Before writing UI code in a phase, restate the design tokens you will use.
- Take screenshots (Playwright) at 1440px and 390px widths after UI phases and critique them
  against this brief before declaring the phase done.
- Never add a dependency not listed here without asking. Approved:
  `@astrojs/sitemap`, Vitest, Playwright (screenshots and the one-off `og.png` — render a page,
  screenshot at 1200×630, commit the PNG; no build-time image pipeline), Lighthouse, axe.
- Never invent numbers, clients or achievements. If content is missing, leave `TODO`.
- Commit after each phase with a conventional commit message (`feat:`, `fix:`, `chore:`).
