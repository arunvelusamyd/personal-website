# Project Spec — Personal Website (arunkumar-velusamy.com)

> A living specification of the personal website: what it is, how it's built, how it's
> deployed, and the repeatable workflows for adding content. Kept in the repo root
> (not under `docs/`, so it is **not** published to the site).

---

## 1. Overview

A personal website for **Arunkumar Velusamy**, built with **MkDocs** and hosted on **GitHub Pages**
behind the custom domain **https://arunkumar-velusamy.com** (DNS via Cloudflare).

It replaces a previous Carrd landing page and now serves four things behind a custom top menu:

- **Profile** — a landing/hero page replicating the old Carrd card (photo, tagline, social + contact links).
- **Blogs** — a Medium-style feed of all 17 published Medium stories, each **self-hosted** as Markdown (no external Medium links).
- **News** — "Daily Bytes," a daily tech-briefing feed (generated on demand and hosted as dated pages).
- **Apps** — small utilities; currently **Market Indicators** (a summary table), reachable via a dropdown submenu.
- **Requests** — placeholder (not yet defined).

**Goal / spirit:** everything the user publishes lives on their own domain as Markdown, versioned in git,
and deploys automatically on push.

---

## 2. Tech stack & key decisions

| Area | Choice | Notes |
|---|---|---|
| Static site generator | **MkDocs 1.6.1** (default theme) | Content authored in Markdown under `docs/`. |
| Markdown extensions | `attr_list`, `md_in_html` | Enable raw HTML + attribute lists in Markdown (used for the profile card, feeds, dropdown). Tables render out of the box. |
| Styling | Single `docs/stylesheets/profile.css` | Custom card/feed/menu styling; scoped with `:has()` so only the relevant pages get full-bleed/dark treatment. |
| Client JS | `docs/javascripts/menu.js`, `docs/javascripts/email.js` | Menu injected at runtime; email assembled client-side to dodge scrapers. |
| Hosting | **GitHub Pages** via **GitHub Actions** | Repo: `arunvelusamyd/personal-website`. Publishes on push to `main`. |
| Custom domain | `arunkumar-velusamy.com` (apex) | Cloudflare DNS, **grey-cloud / DNS-only**, GitHub-issued HTTPS. |
| Fonts | Google Fonts (Inter, Source Sans 3) via `@import` | Requires internet; falls back to system sans-serif. |

**Why GitHub Actions (not `mkdocs gh-deploy`):** the legacy branch-based Pages builder's *deploy* stage
failed repeatedly (build succeeded, deploy failed) during a GitHub Pages incident. We switched to the
Actions workflow (`actions/upload-pages-artifact` + `actions/deploy-pages`), which is the modern, reliable
path and auto-deploys on every push. `mkdocs gh-deploy` is **no longer used**.

---

## 3. Repository structure

```
personal-website/
├── .github/workflows/deploy.yml   # CI: build mkdocs + deploy to Pages on push to main
├── mkdocs.yml                     # site config (site_url = custom domain)
├── PROJECT_SPEC.md                # this file (not published)
├── docs/
│   ├── CNAME                      # "arunkumar-velusamy.com" — persists custom domain across deploys
│   ├── index.md                   # Profile hero (site homepage)
│   ├── blogs.md                   # Blogs feed (Medium-style cards → hosted articles)
│   ├── news.md                    # News feed (Daily Bytes cards → dated briefings)
│   ├── apps.md                    # Apps index (lists available apps)
│   ├── requests.md                # placeholder
│   ├── market-indicators.md       # long-form blog article (full write-up)
│   ├── <17 blog articles>.md      # ai-terms, agent-engineering, neural-networks, gpu, … etc.
│   ├── apps/
│   │   ├── market-indicators.md   # Apps → Market Indicators summary-table page (/apps/market-indicators/)
│   │   └── model-comparison.md    # Apps → AI Model Comparison reference (/apps/model-comparison/)
│   ├── news/
│   │   └── 2026-08-06.md          # a Daily Bytes briefing (/news/2026-08-06/)
│   ├── img/                       # avatar, bg, blog covers, article diagrams
│   ├── javascripts/{menu.js,email.js}
│   └── stylesheets/profile.css
└── site/                          # build output (gitignored; regenerated)
```

Note the pattern: a section index page `X.md` (→ `/X/`) can coexist with a folder `X/` holding
sub-pages (→ `/X/<page>/`). Used by **apps** and **news**.

---

## 4. Site structure & navigation

**Top menu** (injected on every page by `menu.js`, styled dark/translucent, floats over the profile hero):

- Brand "Arunkumar Velusamy" → homepage
- **Blogs** → `/blogs/`
- **News** → `/news/`
- **Apps** → `/apps/` — has a **dropdown submenu**: *Market Indicators* → `/apps/market-indicators/`,
  *Model Comparison* → `/apps/model-comparison/`
- **Requests** → `/requests/`

The menu uses MkDocs' per-page `base_url` global so links resolve at any path (root or subpath).
Dropdowns open on hover/focus (desktop) and tap-toggle (mobile). The default MkDocs navbar/footer are
hidden globally; the doc sidebar/TOC is hidden only on the custom feed/landing pages (via `:has()`),
and kept on long-form article pages.

### Pages

| URL | Source file | What it is |
|---|---|---|
| `/` | `docs/index.md` | Profile hero: avatar, tagline, LinkedIn/GitHub/Medium/X, Call/Text/Email |
| `/blogs/` | `docs/blogs.md` | Feed of 17 Medium-style cards → hosted articles |
| `/<slug>/` | `docs/<slug>.md` | Each hosted blog article (17 total) |
| `/news/` | `docs/news.md` | Daily Bytes feed (cards, newest first) |
| `/news/<YYYY-MM-DD>/` | `docs/news/<date>.md` | A daily briefing |
| `/apps/` | `docs/apps.md` | Apps index |
| `/apps/market-indicators/` | `docs/apps/market-indicators.md` | Market indicators **summary table** (links to full article) |
| `/apps/model-comparison/` | `docs/apps/model-comparison.md` | AI model comparison — 21 models across price, context, benchmarks, risk |
| `/requests/` | `docs/requests.md` | Placeholder |

---

## 5. Content sections in detail

### 5.1 Profile (homepage)
Replicates the original Carrd card using the real assets pulled from the old site:
`docs/img/bg.jpg` (fixed dark-gradient background) and `docs/img/avatar.jpg`. Structure: circular avatar,
name in Source Sans 3, tagline ("More than 15 years of experience in software development and delivery"),
four stacked translucent social buttons (LinkedIn, GitHub, Medium, X) with inline SVG icons, and a row of
circular contact icons (Call / Text / Email). Email is assembled in JS (`email.js`). Phone/SMS use a
`0000000000` placeholder (same as the original) — **real number still to be filled in**.

### 5.2 Blogs
All **17** published Medium stories are **hosted as Markdown** (not linked out). Two acquisition methods were used:
- **10 recent stories** — pulled from Medium's RSS `content:encoded` (full HTML) and converted to Markdown, with cover images and inline diagrams downloaded locally to `docs/img/`.
- **7 older stories** — not in the RSS feed; fetched via **WebFetch verbatim transcription** (Medium blocks `curl` with 403). Text is complete; these older posts had no real cover images (text-only cards).

Each article follows the format of `docs/market-indicators.md`: `# Title`, optional `*italic subtitle*`,
`*By Arunkumar Velusamy · <Mon YYYY>*`, `---`, then the body. The **feed** (`blogs.md`) is a list of
`.blog-card` entries (author line, title, excerpt, date, read time, optional thumbnail), newest first,
each linking to the hosted article.

### 5.3 News — "Daily Bytes"
A daily tech-briefing feed for software engineers. Because the site is static (no AI at runtime),
briefings are **generated on demand by Claude Code** and saved as dated pages. Source spec:
`Notes/Daily Bytes — Claude Project System Prompt.md`. See the workflow in §7.2.
`news.md` is a `.blog-feed` of briefing cards (byline "Daily Bytes", excerpt = that day's Executive Summary,
dated). First entry seeded: `docs/news/2026-08-06.md`.

### 5.4 Apps
Small reference utilities, each reached via the **Apps** dropdown submenu. Both are plain Markdown
(no wrapper `<div>`), so they keep the standard doc layout — the sidebar TOC is useful on long pages.

**Market Indicators** (`docs/apps/market-indicators.md`) — the **Summary Table** (the "Updated July 2026"
indicator table with footnotes + narrative update) extracted from the full `market-indicators.md` article,
plus a link back to the full write-up.

**AI Model Comparison** (`docs/apps/model-comparison.md`) — **two** tables, each followed by a compact
footnote line, then a Sources section, and nothing else. Carries an "Updated &lt;Month Year&gt;" line.

1. **Main table** — 11 columns × 21 frontier and open-weight models: context, price, parameters, training
   compute, benchmark, capabilities, resource intensity, operational risk and provider traffic.
2. **Benchmark scores by model** — 9 columns × 31 models: licence, then one column per benchmark
   (TB 2.0, TB 2.1, OSWorld-V, ARC-AGI-2, HLE, GPQA, SWE-bench Verified). **Bold = column leader.**
   Model list is the union of every leaderboard's published slice, so it deliberately differs from the
   main table's 21 — it includes models like Claude Mythos 5, Grok 4.6 and Kimi K3 that lead benchmarks
   without being buyable API options, and omits main-table models nobody has benchmarked.

   **It is ~24% dense and that is expected.** Most leaderboards publish only a top-10 view, so "—" means
   *not in the retrieved slice* — never a zero. Do not fill gaps by inference; an empty cell is honest and
   a guessed one is not.

**Benchmark scores are contested — treat this as a standing hazard.** Leaderboards disagree because they
conflate benchmark variants (SWE-bench Verified vs Pro vs Lite; Terminal-Bench 2.0 vs 2.1), model snapshots
(`DeepSeek V4 Pro` vs `DeepSeek V4 Pro 0813`, a 16-point spread on the same benchmark name), and effort
settings (`GPT-5.6 Sol (xhigh)`, `Claude Opus 5 (Adaptive, Max Effort)`). The SOTA table therefore always
names the configuration and the source, and where two sources conflict it carries **both rows** rather than
picking a winner. Main-table cells whose score is contested or whose leader is unconfirmed are flagged `⁸`,
pointing at the SOTA table. BenchLM's weighted composite category indices are deliberately excluded — they
are not raw scores, and its published "top 3" lists are internally inconsistent.

Two disclosure states are used deliberately and mean different things: **"Not published"** (the lab has
never disclosed it — true of every parameter count and training-compute figure for every closed model)
versus **"—"** (may be public, didn't surface in the research). Preserve that distinction on refresh;
it is the most useful thing on the page.

**Wide-table pattern:** the theme renders content tables at full width inside `col-md-9`, so an 11-column
table would overflow on mobile. The table is wrapped in
`<div class="table-responsive" markdown="1">` — Bootstrap's own `overflow-x: auto` helper, already bundled
in `site/css/bootstrap.min.css`, so **no new CSS**. The `markdown="1"` attribute is what lets the Markdown
table render inside raw HTML (needs the `md_in_html` extension, already enabled). `theme/js/base.js` then
adds `.table table-striped table-hover` to every table at runtime, so the wrapped table still picks up
standard styling. Reuse this wrapper for any future wide table.

### 5.5 Requests
Placeholder page; behavior **to be defined by the user**.

---

## 6. Deployment

### 6.1 CI/CD — GitHub Actions (`.github/workflows/deploy.yml`)
On push to `main` (or manual dispatch): **build** job checks out, sets up Python, `pip install mkdocs`,
`mkdocs build`, uploads `site/` as a Pages artifact; **deploy** job publishes via `actions/deploy-pages@v4`.
Pages "source" is set to **GitHub Actions** (`build_type=workflow`).

**To publish any change:**
```bash
cd personal-website
git add -A && git commit -m "..." && git push        # Actions builds + deploys (~1 min)
```
Watch runs in the repo's **Actions** tab. (No `mkdocs gh-deploy` needed.)

### 6.2 Custom domain (Cloudflare → GitHub Pages)
- **GitHub side:** custom domain `arunkumar-velusamy.com` registered on Pages; `docs/CNAME` keeps it
  persistent across deploys; `site_url` in `mkdocs.yml` set to the domain (correct canonical URLs/sitemap).
- **Cloudflare DNS (already configured):**
  - Apex `@` → four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `www` → CNAME `arunvelusamyd.github.io`
  - **Proxy = DNS-only (grey cloud)**, SSL/TLS mode **Full**. GitHub issues the HTTPS cert.
- Optional: enable Cloudflare proxy (orange cloud) later for CDN/caching — keep SSL mode "Full".

### 6.3 Known operational note
GitHub Pages had a **"Deployment Lag" incident on 2026-08-06** that made deploys fail/hang for hours
(build succeeded, deploy failed). This was a GitHub-side outage, not a repo problem; deploys recovered
after the incident cleared. If a deploy hangs, check https://www.githubstatus.com before debugging content.

---

## 7. Repeatable workflows

### 7.1 Add / refresh a blog post
1. Get the source (RSS `content:encoded` if recent; else WebFetch verbatim transcription).
2. Convert to Markdown in the standard header format; download images to `docs/img/`.
3. Save `docs/<slug>.md`; prepend a `.blog-card` to `docs/blogs.md` (internal link `../<slug>/`).
4. `mkdocs build` to verify, then commit + push.

### 7.2 Add a Daily Bytes briefing (say "Daily Bytes" / "today's briefing")
1. **Fetch** — WebSearch the spec's sources (Hacker News, Dev.to, Stack Overflow Blog, GitHub Trending,
   Reddit r/programming + r/webdev + r/devops, Changelog, Syntax.fm, Medium, Twitter/X). Collect 20–30 items.
2. **Synthesize** — write the briefing in the spec's exact structure/voice with inline `[Title](url)` links;
   no invented stories.
3. **Save** — `docs/news/<YYYY-MM-DD>.md` with `# Daily Bytes — <Full Date>`.
4. **List** — prepend a `.blog-card` to `docs/news.md` (excerpt = Executive Summary; link `<date>/`).
5. **Deploy** — `mkdocs build` to verify, then commit + push.

### 7.3 Add an app
1. `docs/apps/<app>.md` for the app page; add a link in `docs/apps.md`.
2. Add a child entry under the **Apps** item's `children` array in `docs/javascripts/menu.js`.
3. Reuse existing styles where possible; build + push.

### 7.4 Refresh the AI Model Comparison
**Use the `model-table-updater` agent** (`Notes/.claude/agents/model-table-updater.md`) — just ask for
"update the model table". It carries the working/blocked source list, the honesty rules, and the
verification steps. The manual steps below are what it does, kept here so the workflow survives the agent.

The page is a **living reference**, not a dated post — model pricing moves fast (two OpenAI tiers were
cut on 30 Jul 2026; Gemini 3.7 Flash's promo rate expires Dec 2026).

1. **Re-search** — WebSearch current pricing and lineups per provider (Anthropic, OpenAI, Google), current
   benchmark leaderboards (GPQA, SWE-bench, Terminal-Bench), open-weight releases, and Similarweb-style
   traffic/market-share figures.
2. **Update** — revise the table in `docs/apps/model-comparison.md`; add or retire model rows as needed.
   Keep the "Not published" vs "—" distinction honest — do **not** fill in parameter counts or training
   compute for closed models. Keep it to one table; put any new caveat in the footnote line, not a new
   prose section. **Re-check the `SOTA` markers** — they go stale fastest; each one means "highest value
   in this table for that benchmark", so a single new row can invalidate several.
3. **Re-date** — bump the `*Updated <Month Year>*` line and refresh the Sources section links.
4. **Deploy** — `mkdocs build --strict` to verify, then commit + push.

---

## 8. Design system (CSS in `docs/stylesheets/profile.css`)

Reusable class families (avoid new CSS by reusing these):
- **`.profile-landing`** + `.profile-avatar/.profile-name/.profile-tagline/.profile-buttons/.profile-icons` — the hero card. Triggers dark fixed-background + hidden chrome via `body:has(.profile-landing)`.
- **`.blog-feed`** + `.blog-card` (`.blog-card-body/-author/-title/-excerpt/-meta/-thumb`) — Medium-style feeds. Used by **both** Blogs and News. Full-bleed + hidden sidebar via `body:has(.blog-feed)`.
- **`.apps-index`** — simple list for the Apps index.
- **`.coming-soon`** — centered placeholder (Requests).
- **`.site-menu`** + `.site-menu-inner/-brand/-links` and `.has-dropdown/.site-menu-dropdown` — the top menu and Apps dropdown.

Scoping principle: page-type-specific layout (dark background, hidden sidebar, full-bleed) is applied with
`:has(<marker-class>)` so a single global stylesheet styles different page types without per-page CSS.

---

## 9. Status & open items

**Done**
- Profile hero, 17 hosted blogs + feed, News/Daily Bytes (1 briefing seeded), Apps → Market Indicators summary + dropdown.
- Apps → AI Model Comparison (21 models; refresh workflow in §7.4).
- GitHub Actions deployment; custom domain live over HTTPS at `arunkumar-velusamy.com`.

**Open / to decide**
- **Phone number** — replace `0000000000` in the profile Call/Text links with the real number.
- **Requests** section — define what it should do.
- **News automation (optional)** — currently manual/on-demand; could later be a scheduled cloud agent that
  posts a briefing daily and auto-deploys.
- **Cloudflare proxy** — optionally enable (orange cloud, SSL "Full") for CDN/caching.
- **Same-month blog ordering** — two Sep 2024 and two Oct 2023 posts were ordered without exact days; can be flipped if desired.

---

## 10. Quick reference

- **Live site:** https://arunkumar-velusamy.com
- **Repo:** https://github.com/arunvelusamyd/personal-website
- **Publish a change:** commit + push to `main` → GitHub Actions deploys (~1 min)
- **Local preview:** `mkdocs serve` (served at `/` because `site_url` is the domain root)
- **Daily Bytes source spec:** `Notes/Daily Bytes — Claude Project System Prompt.md`
