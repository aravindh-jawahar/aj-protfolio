# PLAN.md — Build & deploy the portfolio with Claude Code

Total time: ~1 weekend. Cost: GitHub Pages is free; the `aravindhjawahar.dev` domain is ~₹800–1,000/year.

Repo: `aravindh-jawahar/aj-protfolio`. Site: `https://aravindhjawahar.dev`.

---

## Step 0 — One-time setup (10 min)

1. **Repo** — `aravindh-jawahar/aj-protfolio` already exists (public). Clone it:
   ```bash
   git clone https://github.com/aravindh-jawahar/aj-protfolio.git
   cd aj-protfolio
   ```
2. **Check Node** — Astro 5 needs Node 18.20+ / 20.3+ / 22+:
   ```bash
   node -v
   ```
3. **Kit files** — `CLAUDE.md` and `PLAN.md` sit in the repo root.
4. **Assets** (already in the repo)
   - `src/assets/images/portrait.jpg` — navy headshot, 900×900, Gemini mark cropped out.
   - `src/assets/images/candid.jpg` — beach photo, 1200×1500, OnePlus watermark cropped out.
   - `public/resume/Aravindh_Jawahar_Resume.pdf` — copy of
     `~/Downloads/Aravindh_Jawahar_AI_Product_Engineer_Resume.pdf` (kept as-is, phone included).
5. **Buy the domain** `aravindhjawahar.dev` (Cloudflare Registrar sells at cost). Can happen any
   time before Step 2.
6. **Start Claude Code in the repo**
   ```bash
   claude
   ```
   Tip: press **Shift+Tab** to switch to Plan mode for the first prompt of each phase so you can
   approve the plan before it writes code.

---

## Step 1 — Run the phases (paste each prompt into Claude Code, one at a time)

Wait for each phase to finish, check `npm run dev` at http://localhost:4321, then move on.

### Phase 1 — Scaffold
```
Read CLAUDE.md fully. Phase 1: scaffold the project.
- Create an Astro 5 project in the current folder (TypeScript strict, static output) and add the
  Vue integration. No Tailwind, no other UI libs.
- Set `site` in astro.config to https://aravindhjawahar.dev (no `base`). Add @astrojs/sitemap.
  Add public/CNAME containing `aravindhjawahar.dev`.
- Create the folder structure from CLAUDE.md section 4, styles/tokens.css with every colour,
  type and spacing token from section 3 (light + dark), and global.css with a reset.
- Load Schibsted Grotesk and Martian Mono via Google Fonts with font-display: swap and
  proper fallback stacks.
- Base.astro layout with SEO meta, Open Graph tags and JSON-LD Person schema.
- Run npm run build, fix errors, commit "chore: scaffold astro site", and summarise.
```

### Phase 2 — Content layer
```
Phase 2: content. Create src/data/site.ts, career.ts and stack.ts with TypeScript
types, filled ONLY from CLAUDE.md section 5. Career spans need id, label, parentId, start, end
(null = present), stackColour and details. Unit-test the date-to-position maths for the waterfall with Vitest.
Build, commit "feat: typed content layer", summarise.
```

### Phase 3 — The trace waterfall (the signature piece)
```
Phase 3: build TraceWaterfall.vue + SpanDetail.vue exactly as described in CLAUDE.md section 2
and 3.
- Real time axis from the earliest span to today; year ticks in Martian Mono.
- Nested spans (Meggitt → web/desktop), one merged Francium · MoneySmart span, colour by stack
  (ruby / node / python), legend for colours.
- Spans with end = null extend to "now" with a subtle live marker.
- Click / Enter opens the detail panel inline below the span row; Esc closes; arrow keys move
  between spans; one panel open at a time.
- Load animation: spans draw left-to-right once (~900ms), disabled for prefers-reduced-motion.
- Below 720px switch to a vertical time axis.
- No-JS fallback: static bars + <details>; screen-reader ordered list equivalent.
- Mount it in index.astro hero under the name and one-liner with client:visible.
Then use Playwright to screenshot at 1440px and 390px, critique against CLAUDE.md, fix issues.
Build, commit "feat: career trace waterfall", summarise.
```

### Phase 4 — Remaining sections
```
Phase 4: build Stack.astro (grouped plain text, no logo wall), Contact.astro (email, LinkedIn, GitHub, resume PDF download), a header with in-page nav
and a dark-mode toggle that persists in localStorage, and a 404 page in the same style.
Use the portrait from src/assets/images with Astro <Image> in the Contact section (not the hero —
the hero belongs to the waterfall), and candid.jpg on the 404 page. Zero client JS outside the
waterfall and the theme toggle.
Screenshot at 1440 and 390, critique, fix. Build, commit "feat: stack and contact".
```

### Phase 5 — Polish & audit
```
Phase 5: quality pass.
- Generate a 1200x630 og.png in the site's style (name + mini waterfall) and a favicon.svg.
- Add robots.txt, confirm sitemap, canonical URLs, meta description under 160 chars.
- Run Lighthouse (npx lighthouse or unlighthouse) on the production build; get every category
  ≥ 95 and fix what blocks it.
- Keyboard-only walkthrough and axe accessibility check; fix all issues.
- Remove any copy that reads like marketing fluff; keep sentence case and plain verbs.
Build, commit "chore: polish and audit", summarise remaining TODOs.
```

### Phase 6 — Deploy workflow
```
Phase 6: add .github/workflows/deploy.yml that builds the Astro site and deploys to GitHub Pages
using the official withastro/action and actions/deploy-pages, triggered on push to main and
workflow_dispatch, with permissions contents: read, pages: write, id-token: write. Pin action
versions. Commit
"ci: deploy to github pages" and push.
```

---

## Step 2 — Deploy (GitHub Pages + aravindhjawahar.dev)

1. Push to `main` (Phase 6 does this).
2. On GitHub: **repo → Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Settings → Pages → Custom domain → enter `aravindhjawahar.dev` → Save.
4. At your DNS provider add:
   - `A` records for the apex → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `aravindh-jawahar.github.io`
5. Open the **Actions** tab, wait for the "Deploy" workflow to go green (~1–2 min).
6. Tick **Enforce HTTPS** once the certificate is issued, then visit `https://aravindhjawahar.dev`.
7. Every future `git push` to `main` redeploys automatically.

Until DNS is live the site also answers at `aravindh-jawahar.github.io/aj-protfolio/`, but links
and assets there will break (no `base` path) — that's expected; use the real domain.

### Alternative host: Cloudflare Pages (also free)
Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo →
framework preset **Astro**, build command `npm run build`, output `dist`. Delete the GitHub
Pages workflow if you switch.

---

## Step 3 — After launch (15 min)

- Add the URL to your GitHub profile (Settings → Profile → URL), LinkedIn Contact info and
  Featured section, and your resume header.
- Submit the sitemap in Google Search Console (`/sitemap-index.xml`).
- When the Sidekiq Ops MCP article goes live on Medium, add a small Writing section linking it.

---

## Checklist before you share the link

- [ ] No phone number on the site
- [x] No insurer/bank/partner names in the site's HTML (decided: say "insurers", "a bank")
- [x] Resume PDF kept unaltered — it does include phone number and client names (Aravindh's decision)
- [ ] Resume PDF is the latest version
- [ ] Works on your phone (open the real URL, not localhost)
- [ ] Dark mode looks right
- [ ] All `TODO`s resolved or hidden
