# Project Spec — Personal Website (arunkumar-velusamy.com)

> A living specification of the personal website: what it is, how it's built, how it's
> deployed, and the repeatable workflows for adding content. Kept in the repo root
> (not under `docs/`, so it is **not** published to the site).
>
> **Last verified against the repo: 29 September 2026.** Counts, table dimensions and menu labels
> below were checked against the working tree on that date, not carried forward.

---

## 1. Overview

A personal website for **Arunkumar Velusamy**, built with **MkDocs** and hosted on **GitHub Pages**
behind the custom domain **https://arunkumar-velusamy.com** (DNS via Cloudflare).

It replaces a previous Carrd landing page and now serves five things behind a custom top menu:

- **Profile** — a landing/hero page replicating the old Carrd card (photo, tagline, social + contact links).
- **Blogs** — a Medium-style feed of all 17 published Medium stories, each **self-hosted** as Markdown (no external Medium links).
- **News & Reports** — "Daily Bytes" tech briefings *and* long-form reference reports, generated on demand and hosted as sub-pages of `/news/`.
- **Apps** — small utilities; currently **Market Indicators** and **AI Model Comparison**, reachable via a dropdown submenu.
- **Requests** — placeholder (not yet defined).

**Goal / spirit:** everything the user publishes lives on their own domain as Markdown, versioned in git,
and deploys automatically on push.

---

## 2. Tech stack & key decisions

| Area | Choice | Notes |
|---|---|---|
| Static site generator | **MkDocs 1.6.1** (default theme) | Content authored in Markdown under `docs/`. |
| Markdown extensions | `attr_list`, `md_in_html` | Enable raw HTML + attribute lists in Markdown (used for the profile card, feeds, dropdown). Tables render out of the box. |
| Styling | Single `docs/stylesheets/profile.css` | Custom card/feed/menu/reading-layout styling; scoped with `:has()` and marker classes so each page type gets its own treatment. |
| Templates | `overrides/main.html` (`theme.custom_dir: overrides`) | Overrides the theme's `content` block to give articles, News & Reports and app pages a reading layout (§5.6). Everything else falls through to the stock theme. |
| Client JS | `docs/javascripts/menu.js`, `docs/javascripts/email.js` | Menu injected at runtime; email assembled client-side to dodge scrapers. |
| Hosting | **GitHub Pages** via **GitHub Actions** | Repo: `arunvelusamyd/personal-website`. Publishes on push to `main`. |
| Custom domain | `arunkumar-velusamy.com` (apex) | Cloudflare DNS, **grey-cloud / DNS-only**, GitHub-issued HTTPS. |
| Fonts | Google Fonts (Inter, Source Sans 3, Source Serif 4) via `@import` | Requires internet; falls back to system sans-serif / Georgia. |

**Why GitHub Actions (not `mkdocs gh-deploy`):** the legacy branch-based Pages builder's *deploy* stage
failed repeatedly (build succeeded, deploy failed) during a GitHub Pages incident. We switched to the
Actions workflow (`actions/upload-pages-artifact` + `actions/deploy-pages`), which is the modern, reliable
path and auto-deploys on every push. `mkdocs gh-deploy` is **no longer used**.

---

## 3. Repository structure

```
personal-website/
├── .github/workflows/deploy.yml   # CI: build mkdocs + deploy to Pages on push to main
├── mkdocs.yml                     # site config (site_url = custom domain, theme.custom_dir)
├── PROJECT_SPEC.md                # this file (not published)
├── overrides/
│   └── main.html                  # reading-layout template for articles / news / app pages (§5.6)
├── docs/
│   ├── CNAME                      # "arunkumar-velusamy.com" — persists custom domain across deploys
│   ├── index.md                   # Profile hero (site homepage)
│   ├── blogs.md                   # Blogs feed (Medium-style cards → hosted articles)
│   ├── news.md                    # News feed (Daily Bytes cards → dated briefings)
│   ├── apps.md                    # Apps index (card grid of available apps)
│   ├── requests.md                # placeholder
│   ├── market-indicators.md       # long-form blog article (full write-up)
│   ├── <17 blog articles>.md      # ai-terms, agent-engineering, neural-networks, gpu, … etc.
│   ├── apps/
│   │   ├── market-indicators.md   # Apps → Market Indicators summary-table page (/apps/market-indicators/)
│   │   └── model-comparison.md    # Apps → AI Model Comparison reference (/apps/model-comparison/)
│   ├── news/
│   │   ├── 2026-08-06.md          # a Daily Bytes briefing (/news/<YYYY-MM-DD>/)
│   │   └── payment-systems-sg-my-in-hk.md   # a long-form report (/news/<slug>/, undated)
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
- **News & Reports** → `/news/` (label renamed Aug 2026; the URL stayed `/news/`)
- **Apps** → `/apps/` — has a **dropdown submenu**: *Market Indicators* → `/apps/market-indicators/`,
  *Model Comparison* → `/apps/model-comparison/`
- **Requests** → `/requests/`

The menu uses MkDocs' per-page `base_url` global so links resolve at any path (root or subpath).
Dropdowns open on hover/focus (desktop) and tap-toggle (mobile). The default MkDocs navbar/footer are
hidden globally, and the theme's doc sidebar/TOC is no longer shown anywhere: feed/landing pages hide it
via `:has()`, and every article, news and app page uses the reading layout (§5.6), which has its own
contents list. On a blog article (served at `/<slug>/`, not under `/blogs/`), `menu.js` still highlights
**Blogs** by detecting `.blog-article--blog`.

### Pages

| URL | Source file | What it is |
|---|---|---|
| `/` | `docs/index.md` | Profile hero: avatar, tagline, LinkedIn/GitHub/Medium/X, Call/Text/Email |
| `/blogs/` | `docs/blogs.md` | Feed of 17 Medium-style cards → hosted articles |
| `/<slug>/` | `docs/<slug>.md` | Each hosted blog article (17 total) |
| `/news/` | `docs/news.md` | News & Reports feed (cards, newest first) |
| `/news/<YYYY-MM-DD>/` | `docs/news/<date>.md` | A Daily Bytes briefing |
| `/news/<slug>/` | `docs/news/<slug>.md` | A long-form reference report (undated slug) |
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
`*By Arunkumar Velusamy · <Mon YYYY>*`, `---`, then the body. **Keep that header shape** — the reading
layout (§5.6) styles the subtitle, the avatar byline and the header rule purely from their position.

The **feed** (`blogs.md`, wrapper `.blog-feed.blog-feed--grid`) is a magazine grid of `.blog-card`
entries (author line, title, excerpt, date, read time, optional thumbnail), newest first, each linking
to the hosted article. The first card is **featured** (full width, image beside text); the rest sit in
two columns with the cover on top. Cards without a thumbnail get a green accent strip instead.

### 5.3 News & Reports
Renamed from "News" in Aug 2026 (`b82f36e`) — menu label and page heading only, the URL stayed `/news/`.
The section now carries **two kinds of page**:

- **Daily Bytes briefings** — a daily tech-briefing feed for software engineers, saved as **dated** pages
  (`docs/news/<YYYY-MM-DD>.md`). Byline "Daily Bytes", excerpt = that day's Executive Summary. Source
  spec: `Notes/Daily Bytes — Claude Project System Prompt.md`. Workflow in §7.2.
  Seeded: `docs/news/2026-08-06.md`.
- **Long-form reference reports** — undated, **slug-named** pages (`docs/news/<slug>.md`) carrying a
  `*Reference guide · Added <Month Year>*` line instead of a date heading. Byline "Report".
  First: `docs/news/payment-systems-sg-my-in-hk.md`.

Because the site is static (no AI at runtime), both are **generated on demand by Claude Code**.
`news.md` is a `.blog-feed.blog-feed--grid` mixing both card types, newest first (same grid as Blogs;
newest item featured). Both page kinds render in the reading layout (§5.6) with an
"AI-generated · reviewed by" footer; their italic first line becomes the subtitle (no avatar byline).

### 5.4 Apps
Small reference utilities, each reached via the **Apps** dropdown submenu. The index (`apps.md`) is a
`.blog-feed.blog-feed--grid.blog-feed--even` card grid — `--even` turns off the featured first card so
the apps sit side by side. Cards say "Living reference" rather than a date, because the refresh agents
update only the app pages and a card date would go stale. The app pages themselves are plain Markdown
rendered in the **wide** variant of the reading layout (§5.6): a 64rem column for the tables, prose
capped at a readable width, no contents list.

**Market Indicators** (`docs/apps/market-indicators.md`) — the **Summary Table**: a 4-column × 16-row
indicator table with a footnote line, a dated narrative paragraph and a Sources section, plus a link back
to the full `market-indicators.md` write-up. It is a **living page** — the "Updated &lt;Month Year&gt;"
heading moves with each refresh. Refresh workflow in §7.5.

The table is **always exactly 4 columns** (`Indicator | prior | current | Signal`), which is why it is the
only content table on the site with **no** `table-responsive` wrapper — 4 columns fit a phone. Refreshing
rolls the column pair rather than appending, so it never widens.

The full article `docs/market-indicators.md` is **deliberately frozen** — a dated blog post, not a living
page. As of `ba175ce` it is an exact copy of the Medium original and contains **no tables at all**; the
threshold definitions the Signal column depends on survive there only as prose. Never "fix" its figures to
match the Apps page.

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
settings (`GPT-5.6 Sol (xhigh)`, `Claude Opus 5 (Adaptive, Max Effort)`). Main-table cells whose score is
contested or whose leader is unconfirmed are flagged `⁸`, pointing at the **per-model benchmark table**.
BenchLM's weighted composite category indices are deliberately excluded — they are not raw scores, and its
published "top 3" lists are internally inconsistent.

**There is no longer a separate "SOTA table."** Commit `87126bd` (16 Aug 2026) replaced it with the
per-model benchmark matrix above: every model gets its score in every benchmark column rather than only
the leaders, with the column leader **bolded** so SOTA stays readable at a glance. The `**SOTA**` markers
that remain in the *main* table mean "highest value **in this table** for that benchmark as of the update
date" — a relative claim, not an absolute one.

Two disclosure states are used deliberately and mean different things: **"Not published"** (the lab has
never disclosed it — true of every parameter count and training-compute figure for every closed model)
versus **"—"** (may be public, didn't surface in the research). Preserve that distinction on refresh;
it is the most useful thing on the page.

**Wide-table pattern:** content tables render at full width inside the 64rem app column, so an 11-column
table would overflow on mobile. **Both** model-comparison tables (11-col and 9-col) are wrapped in
`<div class="table-responsive" markdown="1">` — Bootstrap's own `overflow-x: auto` helper, already bundled
in `site/css/bootstrap.min.css`, so **no new CSS**. The `markdown="1"` attribute is what lets the Markdown
table render inside raw HTML (needs the `md_in_html` extension, already enabled). `theme/js/base.js` then
adds `.table table-striped table-hover` to every table at runtime, so the wrapped table still picks up
standard styling, which the reading layout then restyles (shaded header, light striping). Reuse this
wrapper for any future wide table — but note the Market Indicators table is
**deliberately unwrapped** (4 columns fit a phone unaided); adding a wrapper there would be a regression.

### 5.5 Requests
Placeholder page; behavior **to be defined by the user**.

### 5.6 Reading layout (`overrides/main.html`)
Added Sep 2026. The template overrides the theme's `content` block and picks a page **kind** from the
source path — no front matter or per-page markup needed, so new pages pick it up automatically:

| Kind | Which pages | Back link / footer | Contents list |
|---|---|---|---|
| `blog` | any top-level `docs/<slug>.md` except `index`, `blogs`, `news`, `apps`, `requests` | "← All blogs" / "Written by … · More blogs · Follow on Medium" | "In this article" |
| `news` | anything under `docs/news/` | "← All news & reports" / "AI-generated · reviewed by …" | "On this page" |
| `app` | anything under `docs/apps/` | "← All apps" / "Maintained by … · More apps" | none (wide column) |

Any other page falls through to the stock theme layout. **Adding a new top-level landing page means
adding it to the `landing` list in the template**, or it will be styled as a blog article.

The layout: centred 42rem serif reading column (64rem for apps), white page, sans headings, captions for
the italic line under an image, soft code blocks, a sticky contents list on screens ≥1200px when a page
has 3+ `##` sections, and a thin reading-progress bar (browsers with scroll-driven animations only).
Header styling is positional: a paragraph right after `# Title` is the subtitle; on blog articles the
paragraph before the first `---` is the avatar byline; a `---` directly after the header lines is a thin
rule, and every other `---` renders as a centred "· · ·" section break.

Two theme quirks the CSS works around: the theme frames every content image (`.col-md-9 img` — padding,
border, auto margins), which the cards and articles reset; and a global `footer { display: none }` hides
the theme footer, so the author footer is a `<div class="blog-article-end">`, not a `<footer>`.

---

## 6. Deployment

### 6.1 CI/CD — GitHub Actions (`.github/workflows/deploy.yml`)
On push to `main` (or manual dispatch): **build** job checks out, sets up Python, `pip install mkdocs`,
`mkdocs build`, uploads `site/` as a Pages artifact; **deploy** job publishes via `actions/deploy-pages@v4`.
Pages "source" is set to **GitHub Actions** (`build_type=workflow`).

**To publish any change:**
```bash
cd personal-website
git status --short                                   # check what you are about to sweep up
git add <your files> && git commit -m "..." && git push   # Actions builds + deploys (~1 min)
```
Watch runs in the repo's **Actions** tab. (No `mkdocs gh-deploy` needed.)

**Prefer staging your own files over `git add -A`.** Content pages are often edited in parallel (a feed
subtitle, a half-finished briefing), and `-A` silently commits someone else's work-in-progress under your
message. If `git status` shows anything outside what you touched, stage only your files and say what you
left uncommitted. A push that does not return a green Actions run has not published — check the run, then
`curl -sL -o /dev/null -w '%{http_code}' <url>` before reporting a page as live.

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
5. **Deploy** — `mkdocs build` to verify (§7.6), then commit + push.

**For a long-form report instead of a briefing** (the other `/news/` shape, §5.3): name the file by
**slug**, not date (`docs/news/<slug>.md`); open with `# Title` then `*Reference guide · Added <Month
Year>*` rather than a date heading; use byline "Report" on the card and a descriptive kicker
("Reference guide") where a briefing would carry its read time. Same feed, same deploy.

### 7.3 Add an app
1. `docs/apps/<app>.md` for the app page; add a `.blog-card` to `docs/apps.md` (link `<app>/`,
   author line "App", meta "Living reference").
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
2. **Update** — revise **both** tables in `docs/apps/model-comparison.md` (main 11-col, and the 9-col
   per-model benchmark matrix); add or retire model rows as needed. Keep the "Not published" vs "—"
   distinction honest — do **not** fill in parameter counts or training compute for closed models. Put any
   new caveat in a footnote line, not a new prose section. **Re-check the `SOTA` markers and the bolded
   column leaders** — they go stale fastest; each means "highest value in this table for that benchmark",
   so a single new row can invalidate several.
3. **Re-date** — bump the `*Updated <Month Year>*` line and refresh the Sources section links.
4. **Deploy** — `mkdocs build` to verify, then commit + push. **Do not use `--strict`** — see §7.6.

### 7.5 Refresh the Market Indicators table
**Use the `market-indicators-updater` agent** (`Notes/.claude/agents/market-indicators-updater.md`) — just
ask to "update the market indicators". It carries the per-indicator source list (FRED series IDs, which
providers block automated access), the honesty rules, the verification steps and the deploy sequence.
**It deploys by default**; say "don't deploy" to review first. The manual shape, kept here so the workflow
survives the agent:

1. **Fetch** current readings for all 16 indicators — FRED CSV
   (`https://fred.stlouisfed.org/graph/fredgraph.csv?id=<SERIES>`) covers most; sentiment, breadth and the
   Buffett Indicator need WebSearch because their providers 403/451 automated access.
2. **Roll** the column pair — old current becomes prior (values kept verbatim, they are published fact),
   new current added on the right, oldest dropped. **Never widen past 4 columns.**
3. **Re-derive every Signal** against the thresholds — never carry one forward.
4. **Rewrite** the narrative paragraph, re-date the heading, refresh Sources.
5. **Verify** (§7.6), then commit + push.

**Honesty rules are the point of this page.** Never silently carry a figure forward — footnote it with its
as-of date, or write `—` and "Not retrieved". Label every data vintage; an August table legitimately mixes
July CPI, an August daily spread and a Q2 GDP estimate. An estimate is never an actual. A source being
unreachable is **not** a reason to block the deploy — a page that admits a gap is fine to have live.

### 7.6 Verifying a build (all workflows)
```bash
cd personal-website
mkdocs build 2>&1 | grep -c "^WARNING"
```
**`--strict` cannot pass on this repo and never could.** The blog articles carry `../img/*.png` links that
MkDocs flags but that resolve correctly in the browser (pages are served at `/<slug>/`). As of 28 Sep 2026
there are **32** such warnings; the count **grows as articles are added** — it was 31 in Aug 2026 — so it
is a baseline to compare against, not a constant to assert.

The real failure signal is **any warning that is not an `../img/*.png` link**. To tell a moved baseline
from something you broke, rebuild with your change stashed and compare.

---

## 8. Design system (CSS in `docs/stylesheets/profile.css`)

Reusable class families (avoid new CSS by reusing these):
- **`.profile-landing`** + `.profile-avatar/.profile-name/.profile-tagline/.profile-buttons/.profile-icons` — the hero card. Triggers dark fixed-background + hidden chrome via `body:has(.profile-landing)`.
- **`.blog-feed`** + `.blog-card` (`.blog-card-body/-author/-title/-excerpt/-meta/-thumb`) — feeds. Used by Blogs, News and Apps. Full-bleed + hidden sidebar via `body:has(.blog-feed)`. The plain `.blog-feed` is a single-column list; **`.blog-feed--grid`** turns it into the card grid (warm `#f6f4ef` background, featured first card), and **`.blog-feed--even`** drops the featured card.
- **`.blog-article`** (`.blog-article--blog/--news/--app`) + `.blog-article-layout` (`.has-toc`, `.is-wide`), `.blog-article-body`, `.blog-article-toc`, `.blog-article-end`, `.blog-article-progress` — the reading layout emitted by `overrides/main.html` (§5.6).
- **`.coming-soon`** — centered placeholder (Requests).
- **`.site-menu`** + `.site-menu-inner/-brand/-links` and `.has-dropdown/.site-menu-dropdown` — the top menu and Apps dropdown.

Scoping principle: page-type-specific layout (dark background, hidden sidebar, full-bleed) is applied with
`:has(<marker-class>)` so a single global stylesheet styles different page types without per-page CSS.

---

## 9. Status & open items

**Done**
- Profile hero, 17 hosted blogs + feed.
- News & Reports (renamed from "News", Aug 2026): 1 Daily Bytes briefing + 1 long-form report.
- Redesign (Sep 2026): card-grid feeds for Blogs / News / Apps and a reading layout for every article, news and app page (§5.6).
- Apps → Market Indicators summary table + dropdown; refreshed on demand via agent (§7.5).
- Apps → AI Model Comparison (21 models + 31-model benchmark matrix; refresh workflow in §7.4).
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
