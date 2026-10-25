# Aravindh Jawahar — portfolio

Personal portfolio for Aravindh Jawahar, AI product engineer in Chennai. Live at
**[aravindhjawahar.dev](https://aravindhjawahar.dev)**.

A single static page: a hero with resume stats, an AI engineering section that walks through a
production RAG pipeline, work experience, education, stack and contact. It ships zero client-side
JavaScript.

## Tech stack

- [Astro 5](https://astro.build) — static output, TypeScript (strict)
- Plain CSS with custom properties (`src/styles/tokens.css`), no UI framework
- `@astrojs/sitemap` for the sitemap; Astro `<Picture>` for AVIF/WebP images
- Vitest for content tests, Playwright + axe for end-to-end and accessibility tests
- GitHub Pages via GitHub Actions

## Getting started

Requires Node 18.20+, 20.3+ or 22+.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command           | What it does                                              |
|-------------------|-----------------------------------------------------------|
| `npm run dev`     | Start the dev server                                      |
| `npm run build`   | Build the static site into `dist/`                        |
| `npm run preview` | Serve the production build locally                        |
| `npm test`        | Run the Vitest content tests                              |
| `npm run e2e`     | Build, serve and run the Playwright suite (needs port 4321 free) |

First time running the e2e suite: `npx playwright install chromium`.

## Editing content

All copy lives in typed data files — components never hard-code it.

| File                        | Content                                           |
|-----------------------------|---------------------------------------------------|
| `src/data/site.ts`          | Name, headline, links, hero stats, impact numbers, services |
| `src/data/ai.ts`            | RAG pipeline steps and AI engineering cards       |
| `src/data/experience.ts`    | Roles and their grouped details                   |
| `src/data/education.ts`     | Degrees                                           |
| `src/data/stack.ts`         | Stack groups (the `featured` group renders full width) |

Content rules: every number comes from the resume, no client or partner names, and no phone
number on the site. `src/data/content.test.ts` fails if a partner name or the phone number slips in.

The resume download is `public/resume/Aravindh_Jawahar_Resume.pdf`; replace that file to update it.
The social card `public/og.png` is generated once with `node scripts/og.mjs`.

## Project layout

```
src/
  components/   Header, Hero, AiEngineering, Services, Experience, Education, Stack, Contact
  data/         typed content (see above)
  layouts/      Base.astro — head, SEO meta, JSON-LD Person schema
  lib/          dates.ts — date range formatting
  pages/        index.astro, 404.astro
  styles/       tokens.css (design tokens), global.css
tests/e2e/      Playwright specs
public/         CNAME, favicon, og.png, robots.txt, resume PDF
```

`CLAUDE.md` is the full design and content brief; `PLAN.md` covers the build phases and deploy steps.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds with `withastro/action`
and publishes with `actions/deploy-pages`. The custom domain is set in `public/CNAME` and in the
repository's Pages settings.
