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

## 2. The concept: "Career as a distributed trace"

Aravindh's daily work is production engineering: requests flowing through Cloudflare → Nuxt SSR →
Rails API → Sidekiq/Kafka → PostgreSQL. So the site borrows the visual language of a
**distributed-tracing waterfall** (the span view in an observability tool) — but uses it to tell
his career story. This is the one bold idea. Everything else stays quiet.

- **Hero = a trace waterfall of his career.** The root span is "career" (2014 → now).
  Child spans are jobs and education, laid out on a real time axis. Span width = real duration.
- **Nesting only where the dates are real.** Artus Meggitt has two child spans (web platform and
  desktop app, which ran side by side). Francium Tech and MoneySmart are ONE span — they share the
  same dates, so a parent with one identical child would add nothing.
- **Span colour encodes the primary stack of that work** (information, not decoration):
  Rails/Ruby, Node/React/TS, Python. A small legend explains it. Education and the Meggitt
  parent span are neutral (`--ink-muted`).
- **Clicking a span** expands its detail panel (role, dates, stack, outcomes). This is the
  main interaction and should feel like opening a span in a tracing tool. The Francium · MoneySmart
  panel groups outcomes under short headings (section 5) — it is the richest panel.
- The Francium · MoneySmart span stays visually "open" (still running) — a subtle live indicator.

### Page structure (single page)

```
┌──────────────────────────────────────────────────────────────┐
│ Aravindh Jawahar                         Work  Stack  Contact │
│ AI product engineer. <one-liner from section 5>               │
│                                                               │
│ 2014 ...... 2018   2019 ... 2021      2022 .............. now │
│ ├ career ───────────────────────────────────────────────────▶ │
│ ├ B.E. Anna Univ ┤                                            │
│                  ├CADS┤                                       │
│                         ├ M.S. ESAIP ─┤                       │
│                                       ├Meggitt┤               │
│                                       ├web────┤               │
│                                       ├desktop┤               │
│                                          ├ Francium · MoneySmart ──▶ │
│ [ span detail panel opens here on click ]                     │
├──────────────────────────────────────────────────────────────┤
│ Stack — grouped, plain text, no logo wall                     │
├──────────────────────────────────────────────────────────────┤
│ Contact — portrait, email, LinkedIn, GitHub, resume PDF       │
└──────────────────────────────────────────────────────────────┘
```

On mobile (< 720px) the waterfall rotates to a **vertical** time axis (time flows down,
spans become vertical bars with labels on the right). It must not become a sideways-scrolling mess.

## 3. Design system

### Colour (light is default; dark mode via prefers-color-scheme + a toggle)

| Token            | Light     | Dark      | Use                                   |
|------------------|-----------|-----------|---------------------------------------|
| `--surface`      | `#EEF1F4` | `#161B26` | page background (cool, not cream)     |
| `--ink`          | `#1C2433` | `#E4E8EF` | primary text                          |
| `--ink-muted`    | `#5A6475` | `#9AA4B5` | secondary text, axis ticks, neutral spans |
| `--grid`         | `#D5DBE3` | `#2A3242` | time-axis gridlines, dividers         |
| `--span-ruby`    | `#B3263E` | `#E0566C` | Rails / Ruby work                     |
| `--span-node`    | `#2F5DA8` | `#6C97E0` | React / Node / TypeScript work        |
| `--span-python`  | `#B07A0C` | `#E0AE45` | Python work                           |

Do NOT use: cream/beige backgrounds, terracotta accents, near-black + neon green,
gradient washes, glassmorphism, or a grey drop shadow under every card.

### Type
- **Schibsted Grotesk** (Google Fonts) — headings and body. One family, varied weight/size.
- **Martian Mono** — ONLY for real trace data: timestamps, durations, axis ticks. Never for
  decorative labels.
- Type scale (rem): 0.875 / 1 / 1.25 / 1.563 / 2.441 / 3.815. Body 1rem, line-height 1.6.
  Max line length 70ch.
- No ALL-CAPS eyebrow labels. No single highlighted word in headlines. Sentence case everywhere.
  No "→" appended to buttons. No "A · B · C" meta strings.

### Layout & shape
- Left-aligned content, 12-column grid, max width 1120px.
- Border radius: 2px on spans only (they are bars), 6px on the detail panel, 0 elsewhere.
  Do not chop the page into identical rounded cards.

### Motion
- ONE orchestrated moment: on first load, spans draw left-to-right along the time axis
  (~900ms total, staggered by start date). Nothing else animates on load.
- Interaction motion only: span detail panel expands/collapses (~200ms).
- Respect `prefers-reduced-motion` (no draw-in, panels just appear).

### Quality floor
- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.
- Full keyboard support: spans are `<button>`s, arrow keys move between spans, Enter opens,
  Esc closes. Visible focus ring.
- The waterfall must have a text equivalent (an ordered list read by screen readers).
- Works without JavaScript: spans render as static bars with details in `<details>` elements.

## 4. Tech stack (decided — do not change without asking)

- **Astro 5** (static output) + **TypeScript** (strict).
- Vue 3 island ONLY for the interactive trace waterfall (`client:visible`). Everything else is
  plain Astro components with zero JS.
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
  data/        site.ts, career.ts, stack.ts
  components/  TraceWaterfall.vue, SpanDetail.vue, Stack.astro, Contact.astro
  layouts/     Base.astro
  pages/       index.astro, 404.astro
  styles/      tokens.css, global.css
  assets/images/  portrait.jpg (900×900 navy headshot), candid.jpg (1200×1500 beach photo)
public/        CNAME, resume/Aravindh_Jawahar_Resume.pdf, favicon.svg, og.png
```

### Photos
- `portrait.jpg` — Contact section, shown at ~300–400px wide. Already cropped and sized; do not
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
- Never add a dependency not listed here without asking. Approved: `@astrojs/vue`,
  `@astrojs/sitemap`, Vitest, Playwright (screenshots and the one-off `og.png` — render a page,
  screenshot at 1200×630, commit the PNG; no build-time image pipeline), Lighthouse, axe.
- Never invent numbers, clients or achievements. If content is missing, leave `TODO`.
- Commit after each phase with a conventional commit message (`feat:`, `fix:`, `chore:`).
