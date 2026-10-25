# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-page static portfolio for Aravindh Jawahar at `aravindhjawahar.dev` whose hero is a career "trace waterfall", deployed to GitHub Pages.

**Architecture:** Astro 5 static site. All content lives in typed `src/data/*.ts`; pure date→position maths in `src/lib/timeline.ts` is shared by the Vue waterfall island (JS) and an Astro `CareerList` (no-JS fallback). Everything except the waterfall and the theme toggle ships zero JS.

**Tech Stack:** astro 5.18.2, @astrojs/vue 5.1.4, vue ^3.5, @astrojs/sitemap 3.7.4, typescript strict, vitest 3.2.7, @playwright/test 1.64.1, @axe-core/playwright 4.14.0. Node 20.11 (local).

**Spec:** `CLAUDE.md` (brief + content) and `PLAN.md` (phases, deploy). Read both before every task; section numbers below refer to CLAUDE.md.

## Global Constraints

- Astro **5** (not 6/7 — the brief fixes it). Static output, no `base`, `site: 'https://aravindhjawahar.dev'`.
- No dependencies beyond the Tech Stack line. No Tailwind, no UI kit, no icon libs.
- Colour tokens exactly as CLAUDE.md §3 table (light + dark). Only `ruby`, `node`, `python`, neutral (`--ink-muted`) for spans.
- Schibsted Grotesk for all text; Martian Mono ONLY for dates, durations, axis ticks.
- Type scale rem: 0.875 / 1 / 1.25 / 1.563 / 2.441 / 3.815; body 1rem, line-height 1.6, max 70ch; max content width 1120px, left-aligned.
- Radius: 2px spans, 6px detail panel, 0 elsewhere. No card grids, no drop shadows, no gradients.
- Copy: sentence case, no ALL-CAPS labels, no "→" on buttons, no "A · B · C" meta strings (the span label "Francium Tech · MoneySmart" is a name, allowed).
- Never name MoneySmart's insurers, banks or partners. Never render the phone number. Never invent numbers — missing content is `TODO`.
- Zero client JS outside `TraceWaterfall.vue` and the theme toggle/`js`-class inline script.
- Every task ends with `npm run build` passing. Commit per task with conventional messages. **Do not push** until Task 6 Step 4 says so.
- Code comments: why, not what; ≤3 lines; no ticket numbers.

## Review Focus

1. **No JavaScript** → `html` lacks `.js`; the Vue waterfall is hidden and `CareerList` (static bars + `<details>`) shows every span's details. Test: Task 3, `no-js.spec.ts`.
2. **390px phone** → vertical axis, `document.documentElement.scrollWidth <= 390`, every span label visible. Test: Task 3, `waterfall.spec.ts › mobile has no horizontal scroll`.
3. **Keyboard only** → Tab reaches spans, ArrowDown/ArrowUp move focus, Enter opens, Esc closes and focus returns to the span button, opening a second span closes the first. Test: Task 3, `waterfall.spec.ts › keyboard`.
4. **Stored dark theme + reload** → no flash of light theme; `data-theme="dark"` is set before first paint by the inline head script. Test: Task 4, `theme.spec.ts`.
5. **Open-ended span in a future month** → `end: null` resolves to the build month, so the live span always reaches the right edge of the axis (offset + width = 100). Test: Task 2, `timeline.test.ts › open span reaches axis end`.

---

### Task 1: Scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `public/CNAME`, `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/Base.astro`, `src/pages/index.astro`
- Keep (already present): `src/assets/images/{portrait,candid}.jpg`, `public/resume/Aravindh_Jawahar_Resume.pdf`

**Interfaces:**
- Produces: `Base.astro` props `{ title?: string; description?: string; noindex?: boolean }`; default title `Aravindh Jawahar — AI product engineer`; slot for page body. CSS custom properties from §3 plus `--font-sans`, `--font-mono`, `--step--1 … --step-4` (the six scale values), `--max-width: 1120px`.

- [ ] **Step 1:** `npm init -y`, then install exact versions: `npm i astro@5.18.2 @astrojs/vue@5.1.4 vue@^3.5 @astrojs/sitemap@3.7.4` and `npm i -D vitest@3.2.7 @playwright/test@1.64.1 @axe-core/playwright@4.14.0 typescript`. Scripts: `dev`, `build` (`astro build`), `preview`, `test` (`vitest run`), `e2e` (`playwright test`). `"type": "module"`.
- [ ] **Step 2:** `astro.config.mjs`: `site: 'https://aravindhjawahar.dev'`, `output: 'static'`, integrations `[vue(), sitemap()]`. `tsconfig.json` extends `astro/tsconfigs/strict`. `.gitignore`: `node_modules`, `dist`, `.astro`, `test-results`, `playwright-report`. `public/CNAME` = `aravindhjawahar.dev`.
- [ ] **Step 3:** `tokens.css`: light values on `:root`; dark values under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {…} }` and again under `:root[data-theme="dark"]`. `global.css`: modern reset, `body { background: var(--surface); color: var(--ink); font: 1rem/1.6 var(--font-sans) }`, visible `:focus-visible` outline (2px `--ink`, offset 2px), `.visually-hidden` utility.
- [ ] **Step 4:** `Base.astro`: `<html lang="en">`, Google Fonts `<link>` (preconnect + `Schibsted+Grotesk:wght@400;500;700` and `Martian+Mono:wght@400` with `display=swap`); fallback stacks `system-ui, sans-serif` / `ui-monospace, monospace`. Head inline script (`is:inline`), first in `<head>`:

```js
document.documentElement.classList.add('js');
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch {}
```

  Meta: description (default from §5 one-liner, ≤160 chars), canonical `new URL(Astro.url.pathname, Astro.site)`, OG/Twitter tags with `og:image` `/og.png`, JSON-LD `Person` (name, jobTitle `AI Product Engineer`, url, email `mailto:`, `sameAs` LinkedIn + GitHub, address Chennai IN). `noindex` adds `<meta name="robots" content="noindex">`.
- [ ] **Step 5:** `index.astro` placeholder using `Base` with an `<h1>Aravindh Jawahar</h1>`. Run `npm run build` → exits 0, `dist/index.html` and `dist/sitemap-index.xml` exist, `dist/CNAME` exists.
- [ ] **Step 6:** `git add -A && git commit -m "chore: scaffold astro site"` (includes CLAUDE.md, PLAN.md, assets, this plan).

---

### Task 2: Content layer + timeline maths

**Files:**
- Create: `src/data/types.ts`, `src/data/site.ts`, `src/data/career.ts`, `src/data/stack.ts`, `src/lib/timeline.ts`
- Test: `src/lib/timeline.test.ts`

**Interfaces:**
- Produces (`types.ts`):

```ts
export type StackColour = 'ruby' | 'node' | 'python' | 'neutral';
export interface DetailGroup { heading?: string; points: string[] }
export interface Span {
  id: string; label: string; parentId: string | null;
  start: string;            // 'YYYY-MM'
  end: string | null;       // 'YYYY-MM' inclusive; null = present
  stackColour: StackColour;
  stack?: string[];         // technologies line in the panel
  summary?: string;         // one line under the label in the panel
  details: DetailGroup[];
}
export interface StackGroup { name: string; items: string[] }
```

- Produces (`site.ts`): `export const site = { name, title, oneLiner, location, email, linkedin, github, resumePath: '/resume/Aravindh_Jawahar_Resume.pdf' }` — values from §5 Identity.
- Produces (`career.ts`): `export const career: Span[]` — root `{ id: 'career', label: 'career', parentId: null, start: '2014-09', end: null, stackColour: 'neutral', details: [] }` then the 7 rows of §5 table with `parentId: 'career'` except `meggitt-web`/`meggitt-desktop` (`'meggitt'`). Education: `be` 2014-09 → 2018-06, `esaip` 2019-09 → 2021-06, each with `// TODO confirm months` and a label showing years only. `details` copied from §5 Span details (MoneySmart: one `DetailGroup` per italic heading; others: points only). No insurer/bank names.
- Produces (`stack.ts`): `export const stack: StackGroup[]` — the 8 groups of §5 Stack.
- Produces (`timeline.ts`):

```ts
export function monthIndex(ym: string): number;                 // year*12 + (month-1)
export function toYearMonth(d: Date): string;                   // 'YYYY-MM' (UTC)
export interface Axis { start: string; end: string }            // end inclusive
export function axisFor(spans: Span[], now: string): Axis;      // earliest start → now
export function spanBox(span: Span, axis: Axis, now: string): { offset: number; size: number }; // percent 0–100
export function yearTicks(axis: Axis): { year: number; offset: number }[]; // every Jan inside the axis
export function orderSpans(spans: Span[]): { span: Span; depth: number }[]; // depth-first, siblings by start; root depth 0
export function formatRange(span: Span): string;                // 'May 2018 – Jan 2019', 'Jan 2022 – present', education: '2014 – 2018'
```

- [ ] **Step 1: Write failing tests** in `timeline.test.ts` (`now = '2026-10'`):

```ts
expect(monthIndex('2018-05')).toBe(2018 * 12 + 4);
const axis = axisFor(career, '2026-10');
expect(axis).toEqual({ start: '2014-09', end: '2026-10' });
// open span reaches axis end
const live = spanBox(career.find(s => s.id === 'moneysmart')!, axis, '2026-10');
expect(live.offset + live.size).toBeCloseTo(100);
// inclusive end: CADS 2018-05..2019-01 = 9 of 146 months
const cads = spanBox(career.find(s => s.id === 'cads')!, axis, '2026-10');
expect(cads.size).toBeCloseTo((9 / 146) * 100);
expect(yearTicks(axis)[0]).toEqual({ year: 2015, offset: (4 / 146) * 100 });
expect(orderSpans(career).map(r => r.span.id)).toEqual(
  ['career', 'be', 'cads', 'esaip', 'meggitt', 'meggitt-web', 'meggitt-desktop', 'moneysmart']);
expect(orderSpans(career).find(r => r.span.id === 'meggitt-web')!.depth).toBe(2);
expect(formatRange(career.find(s => s.id === 'moneysmart')!)).toBe('Jan 2022 – present');
expect(formatRange(career.find(s => s.id === 'be')!)).toBe('2014 – 2018');
// content guard
expect(JSON.stringify(career)).not.toMatch(/Starr|MSIG|TIQ|Standard Chartered|SCB|Talon|Shopify|Freshsales|8870637220/);
```

  (Months on axis = monthIndex(end) − monthIndex(start) + 1 = 146.) `meggitt-web` and `meggitt-desktop` share a start; tie-break by array order.
- [ ] **Step 2:** `npm test` → FAIL (module not found).
- [ ] **Step 3:** Implement types, data and `timeline.ts`. `formatRange` uses years only when `span.id` is `be` or `esaip` — add `yearsOnly?: boolean` to `Span` instead of hard-coding ids, and set it on those two.
- [ ] **Step 4:** `npm test` → PASS. `npm run build` → exit 0.
- [ ] **Step 5:** `git commit -m "feat: typed content layer"`.

---

### Task 3: Trace waterfall

**Files:**
- Create: `src/components/TraceWaterfall.vue`, `src/components/SpanDetail.vue`, `src/components/CareerList.astro`, `playwright.config.ts`, `tests/e2e/waterfall.spec.ts`, `tests/e2e/no-js.spec.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `career`, `orderSpans`, `axisFor`, `spanBox`, `yearTicks`, `formatRange`, `toYearMonth`, `site`.
- Produces: `<TraceWaterfall :spans="career" :now="now" client:visible />` and `<CareerList spans={career} now={now} />`, where `index.astro` computes `const now = toYearMonth(new Date())` once at build time and passes it to both. `SpanDetail.vue` props `{ span: Span; range: string }`.

Behaviour (from §2/§3 and PLAN Phase 3):
- Markup: `<section class="trace" aria-label="Career timeline">` → year ticks (Martian Mono, `--ink-muted`, gridlines `--grid`) → legend (ruby "Rails / Ruby", node "React / Node / TypeScript", python "Python"; neutral not listed) → `<ol>` of `<li>` per `orderSpans` row. The root `career` span is a plain bar (not a button, no panel). Every other `<li>` has a `<button aria-expanded aria-controls>` positioned with CSS vars `--offset`/`--size` and indented by `depth`; button text = label + visually-hidden range, so the `<ol>` is the screen-reader text equivalent.
- Live span (`end === null`, excluding root): open right edge plus a static marker; no looping animation.
- Interaction: one `openId` ref. Click/Enter/Space toggles. ArrowDown/ArrowRight → next button, ArrowUp/ArrowLeft → previous (wrap off). Esc closes and focuses the span's button. Panel: 6px radius, ~200ms expand via `<Transition>`, instant under reduced motion.
- Placement: ≥720px panel renders inside the row's `<li>` under the bar; <720px (`matchMedia('(max-width: 719px)')`) the axis is vertical (bars use `top`/`height` from the same vars, labels to the right, fixed chart height ~ 40px per axis year) and the panel renders once below the chart.
- Load draw-in: pure CSS on SSR markup, `transform: scaleX(0)→1` (vertical: `scaleY`), `animation-delay: calc(var(--offset) * 6ms)`, duration 300ms (total ≤ 900ms); `@media (prefers-reduced-motion: reduce) { animation: none }`.
- No-JS: `CareerList.astro` renders static bars (same `spanBox` maths) with a `<details><summary>label + range</summary>…</details>` per span. CSS in `global.css`: `html:not(.js) .trace { display: none }` and `html.js .career-list { display: none }`.
- Hero in `index.astro`: `<h1>` name, a `<p>` with title + one-liner (`site.title`, `site.oneLiner`), then the waterfall and `CareerList`.

- [ ] **Step 1:** `playwright.config.ts`: `webServer: { command: 'npm run build && npm run preview -- --port 4321', port: 4321 }`, chromium only. Write failing specs:
  - `waterfall.spec.ts › keyboard`: Tab until the `be` button is focused; `Enter` → `aria-expanded="true"` and panel contains "Anna University"; `ArrowDown` → `cads` focused; `Enter` → `be` panel gone, `cads` panel shown (one open); `Escape` → no panel and `cads` button focused.
  - `waterfall.spec.ts › moneysmart panel`: click "Francium Tech · MoneySmart" → panel contains "100K+ daily users" and "a bank".
  - `waterfall.spec.ts › mobile has no horizontal scroll`: viewport 390×844, `scrollWidth <= 390`, every span button `toBeVisible()`.
  - `no-js.spec.ts` (`javaScriptEnabled: false`): `.trace` hidden, `.career-list` visible, 7 `<details>` (root excluded); opening the MoneySmart one shows "99.9% uptime".
- [ ] **Step 2:** `npx playwright install chromium && npm run e2e` → FAIL.
- [ ] **Step 3:** Implement the three components and the hero.
- [ ] **Step 4:** `npm run e2e` → PASS. `npm test` → PASS.
- [ ] **Step 5:** Screenshot `/` at 1440 and 390 wide (`page.screenshot({ fullPage: true })` into the scratchpad, not the repo). Critique against §2–§3 (tokens, fonts, radius, no banned styles, labels legible in light and dark) and fix. Re-run e2e.
- [ ] **Step 6:** `npm run build` → exit 0. `git commit -m "feat: career trace waterfall"`.

---

### Task 4: Header, theme toggle, stack, contact, 404

**Files:**
- Create: `src/components/Header.astro`, `src/components/Stack.astro`, `src/components/Contact.astro`, `src/pages/404.astro`, `tests/e2e/theme.spec.ts`
- Modify: `src/pages/index.astro`, `src/layouts/Base.astro` (render `Header`)

**Interfaces:**
- Consumes: `site`, `stack`, `Base` props.
- Produces: section ids `#work` (hero/waterfall), `#stack`, `#contact`; header nav links "Work", "Stack", "Contact".

- Header: name left, nav right, theme toggle `<button aria-label="Toggle dark mode">` with a small `<script is:inline>` click handler that flips `data-theme` between `light`/`dark` (starting from the current effective theme via `matchMedia`) and stores it in `localStorage` (try/catch).
- Stack: `<h2>Stack</h2>` then one `<dl>` (`<dt>` group name, `<dd>` items comma-joined). Plain text.
- Contact: `<h2>Contact</h2>`, `portrait.jpg` via Astro `<Image>` (width 360, `formats` avif/webp via `<Picture>`, alt "Aravindh Jawahar"), email `mailto:`, LinkedIn, GitHub, "Download resume (PDF)" linking `site.resumePath` with `download`.
- 404: `Base` with `noindex`, short sentence-case line, link home, `candid.jpg` via `<Picture>` (width 480, alt "Aravindh on a beach").

- [ ] **Step 1:** Failing `theme.spec.ts`: click toggle → `html[data-theme]` changes and `localStorage.theme` set; reload → same `data-theme` present on `html` before `DOMContentLoaded` (check via `page.evaluate` on load). Add to `waterfall.spec.ts`: `#contact a[href$=".pdf"]` exists; `page.content()` contains no `8870637220`.
- [ ] **Step 2:** `npm run e2e` → FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** `npm run e2e` → PASS. Screenshot 1440 + 390 (light and dark), critique, fix.
- [ ] **Step 5:** `npm run build` → exit 0; `dist/404.html` exists. `git commit -m "feat: stack and contact"`.

---

### Task 5: Polish and audit

**Files:**
- Create: `public/favicon.svg`, `public/robots.txt`, `public/og.png`, `scripts/og.mjs`, `tests/e2e/a11y.spec.ts`
- Modify: `src/layouts/Base.astro` (favicon link)

- favicon.svg: three stacked horizontal bars of different widths in ruby/node/python light values, 2px radius.
- og.png: `scripts/og.mjs` uses Playwright `page.setContent()` with an inline HTML card (1200×630, `--surface` light, name, title, mini waterfall bars from `career` positions hard-coded in the script), loads the Google Fonts, screenshots to `public/og.png`. Run once with `node scripts/og.mjs`; commit the PNG.
- robots.txt: `User-agent: *`, `Allow: /`, `Sitemap: https://aravindhjawahar.dev/sitemap-index.xml`.

- [ ] **Step 1:** Failing `a11y.spec.ts`: `AxeBuilder` on `/` (light and dark, 1440 and 390) and `/404` → `violations` is `[]`. Meta description length ≤ 160.
- [ ] **Step 2:** `npm run e2e` → FAIL (or pass — fix whatever axe reports).
- [ ] **Step 3:** Add the files above; fix axe findings.
- [ ] **Step 4:** `npm run build && npm run preview -- --port 4321 &` then `npx lighthouse http://localhost:4321 --preset=desktop --quiet --chrome-flags="--headless" --output=json --output-path=<scratchpad>/lh.json` and the same with mobile (default). Every category ≥ 0.95; fix and repeat until it holds. Stop the preview server.
- [ ] **Step 5:** Copy pass: remove marketing fluff, confirm sentence case and banned patterns (§3 Type). `grep -rnE "TODO" src` → list remaining TODOs for the summary.
- [ ] **Step 6:** `npm test && npm run e2e && npm run build` all pass. `git commit -m "chore: polish and audit"`.

---

### Task 6: Deploy workflow, local review, push

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1:** `deploy.yml`: name `Deploy`; on `push` to `main` and `workflow_dispatch`; `permissions: { contents: read, pages: write, id-token: write }`; `concurrency: { group: pages, cancel-in-progress: false }`. Job `build`: `actions/checkout@v7.0.1`, `withastro/action@v6.1.4`. Job `deploy` (needs build, `environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }`): `actions/deploy-pages@v5.0.1` with `id: deployment`.
- [ ] **Step 2:** `git commit -m "ci: deploy to github pages"`.
- [ ] **Step 3: Local review — STOP here.** `npm run build && npm run preview -- --port 4321` in the background; give Aravindh `http://localhost:4321` plus the 1440/390 screenshots and the remaining-TODO list. Wait for their explicit go-ahead. Apply any requested changes as `fix:` commits and re-run `npm test && npm run e2e && npm run build`.
- [ ] **Step 4:** Only after the go-ahead: `git push -u origin main`. Confirm with `gh run list --repo aravindh-jawahar/aj-protfolio --limit 1`. Give them the manual steps from PLAN.md Step 2 (Pages source = GitHub Actions, custom domain, DNS records, Enforce HTTPS) — the first workflow run may fail until Pages source is set; re-run it after.
