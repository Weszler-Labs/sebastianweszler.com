# Test Plan — sebastianweszler.com

**Website:** https://sebastianweszler-com.pages.dev/  
**Custom Domain:** https://sebastianweszler.com/  
**Last Updated:** 2026-05-29  
**Tester:** QA Engineer

---

## Scope

Full E2E coverage of the personal portfolio website, including i18n (EN/PL), navigation, content rendering, contact form, newsletter signup, dark mode, accessibility, static assets, and cross-domain validation.

---

## Test Cases

### Content & Rendering

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-01 | Homepage loads (EN root) | `/` | Status 200, title, h1, subtitle, description, "More about me" link |
| TC-02 | Homepage loads (EN via /en) | `/en` | Status 200, h1 present |
| TC-02b | Homepage loads (PL) | `/pl` | Status 200, Polish subtitle/description |
| TC-03 | About page (EN) | `/about` | Status 200, h1 contains "About" |
| TC-03b | About page (PL) | `/pl/about` | Status 200, h1 contains "O Mnie" |
| TC-04 | Projects page (EN) | `/projects` | Status 200, h1 contains "Projects" |
| TC-04b | Projects page (PL) | `/pl/projects` | Status 200, h1 contains "Projekty" |
| TC-05 | Blog listing (EN) | `/blog` | Status 200, h1 contains "Blog" |
| TC-05b | Blog listing (PL) | `/pl/blog` | Status 200, h1 contains "Blog" |
| TC-06 | Blog post: hello-world (EN) | `/blog/hello-world` | Status 200, article element present |
| TC-07 | Contact page (EN) | `/contact` | Status 200, h1 contains "Contact" |
| TC-07b | Contact page (PL) | `/pl/contact` | Status 200, h1 contains "Kontakt" |
| TC-08 | Contact form presence | `/contact` | Form element present |
| TC-09 | Resume page (EN) | `/resume` | Status 200, h1 contains "Resume" |
| TC-09b | Resume page (PL) | `/pl/resume` | Status 200, h1 contains "CV" |
| TC-20 | Blog post: rebuilding (EN) | `/en/blog/rebuilding-sebastianweszler-com` | Status 200, article present |
| TC-20b | Blog post: rebuilding (PL) | `/pl/blog/rebuilding-sebastianweszler-com` | Status 200, article present |

### i18n & Navigation

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-10 | Language toggle from homepage | `/` → PL → EN | Navigates to `/pl/`, then back |
| TC-11 | Language toggle from sub-page | `/about` → PL | Navigates to `/pl/about/` |
| TC-13 | Navigation links | `/` | Nav has Home, About, Projects, Blog, Contact, Resume with correct hrefs |

### UI/UX & Theming

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-12 | Dark mode toggle | `/` | Toggle button present, dark class toggles on click |
| TC-14 | Skip to main content (a11y) | `/` | Skip link exists, hidden by default, visible on Tab focus |

### Forms & Social

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-15 | Newsletter signup form | `/` | Heading "Stay Updated", email input, Subscribe button |
| TC-16 | Social footer links | `/` | GitHub, LinkedIn, Medium, LeetCode, Email with correct hrefs/aria-labels |

### SEO & Metadata

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-17 | SEO metadata | `/` | Title, meta description, OG title, OG image present |
| TC-18 | Viewport meta | `/` | `<meta name="viewport" content="width=device-width, initial-scale=1">` |

### Error Pages & Assets

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-19 | 404 page | `/nonexistent-page` | Status 404, "This page could not be found" |
| TC-21 | robots.txt | `/robots.txt` | Status 200, contains "User-agent" |
| TC-22 | Sitemap XML | `/sitemap.xml` | Status 200, contains urlset + domain reference |
| TC-23 | Favicon | `/favicon.ico` | Status 200 |

### Technical Case Studies (SEB-118 — when implemented)

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-50 | Case studies listing loads (EN root) | `/case-studies` | Status 200, h1 present |
| TC-50b | Case studies listing loads (EN locale) | `/en/case-studies` | Status 200 |
| TC-50c | Case studies listing loads (PL) | `/pl/case-studies` | Status 200 |
| TC-51 | Case studies h1 keywords | `/case-studies` | h1 contains "case studies", "projects", or "work" |
| TC-52 | Case studies content renders | `/case-studies` | Main content has substantial text |
| TC-53 | Case study detail (EN) | `/case-studies/[slug]` | Status 200 for first linked case study |
| TC-53b | Case study detail (PL) | `/pl/case-studies/[slug]` | Status 200 for first PL case study |
| TC-54 | Case studies link in navigation | `/` | Nav includes Case Studies link |
| TC-55 | SiteShell present on case studies | `/case-studies` | Footer + nav present |
| TC-56 | Language toggle from case studies | `/case-studies` → PL | Navigates to `/pl/case-studies/` |
| TC-57 | Dark mode on case studies | `/case-studies` | Dark class toggles on click |
| TC-58 | Skip link on case studies | `/case-studies` | Skip link present |
| TC-59 | Mobile rendering at 375px | `/case-studies` | No horizontal overflow |

### Engineering Leadership Section (SEB-119 / SEB-94 — when implemented)

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-30 | Leadership page loads (EN root) | `/leadership` | Status 200, h1 present |
| TC-30b | Leadership page loads (EN locale) | `/en/leadership` | Status 200, h1 present |
| TC-30c | Leadership page loads (PL) | `/pl/leadership` | Status 200, Polish translation |
| TC-31 | Leadership section headings | `/leadership` | h1 contains leadership keywords |
| TC-32 | Leadership content renders | `/leadership` | Main content has substantial text |
| TC-33 | Leadership link in navigation | `/` | Nav includes Leadership link |
| TC-34 | SiteShell present on leadership | `/leadership` | Footer + nav present |
| TC-35 | AnimatedLayout on leadership | `/leadership` | Fade-in animation classes present |
| TC-36 | Language toggle from leadership | `/leadership` → PL | Navigates to `/pl/leadership/` |
| TC-37 | Language toggle from PL leadership | `/pl/leadership` → EN | Navigates to `/leadership/` |
| TC-38 | Dark mode on leadership | `/leadership` | Dark class toggles on click |
| TC-39 | Text readable in dark mode | `/leadership` | Text visible in both themes |
| TC-40 | Skip link on leadership | `/leadership` | Skip link present, focusable |
| TC-41 | Alt text on leadership images | `/leadership` | All imgs have alt attributes |
| TC-42 | SEO meta on leadership | `/leadership` | Meta description present |
| TC-43 | OG title on leadership | `/leadership` | og:title meta present |
| TC-44 | Leadership page title | `/leadership` | Title contains relevant keywords |
| TC-45 | Sitemap includes leadership | `/sitemap.xml` | Contains `/leadership` URLs |
| TC-46 | Mobile rendering at 375px | `/leadership` | No horizontal overflow |
| TC-47 | Tablet rendering at 768px | `/leadership` | No layout breaks |

### Cross-Domain Validation (optional)

| TC   | Description | URL(s) | Key Checks |
|------|-------------|--------|------------|
| TC-24 | All pages 200 on custom domain | All 20+ pages via `SECONDARY_URL` | Every known page returns 200 on the secondary domain |

Run with:
```bash
# Primary domain (pages.dev)
node tests/e2e.mjs

# Also validate custom domain
SECONDARY_URL=https://sebastianweszler.com node tests/e2e.mjs
```

---

## CI/CD Pipeline Validation

Validated 2026-05-29 against:

| File | Status | Notes |
|------|--------|-------|
| `.github/workflows/deploy.yml` | ✅ Pass | Triggers on push to `main`. Builds, deploys to Cloudflare Pages, configures custom domain, then runs E2E tests. |
| `.github/workflows/test.yml` | ✅ Pass | Triggers on push to non-main branches. Installs deps, runs E2E tests. |
| `package.json` scripts | ✅ Pass | `build`, `lint`, `test:e2e` all functional. |
| `wrangler.toml` | ✅ Pass | Correctly configured for Cloudflare Pages with `pages_build_output_dir = "out"`. |
| E2E test execution | ⚠️ 29/30 pass | TC-23 (favicon) fails on deployed site — see below. Regression validated 2026-05-29. SEB-118 and SEB-119 tests guarded (skip when pages not deployed). |

### CI/CD Gaps & Risks

1. **Stale deployment on pages.dev** — The live site at `sebastianweszler-com.pages.dev` is behind `main`. The current source code includes `<link rel="icon" href="/favicon.svg">` in `layout.tsx:41` and `favicon.svg` exists in `public/`, but the deployed build lacks both. A fresh deploy to `main` will resolve this.

2. **No custom domain E2E validation in CI** — `SECONDARY_URL` is never set in either workflow, so the cross-domain validation (TC-24) never runs. Deploy workflow should optionally validate the custom domain after DNS propagates.

3. **README.md is default Next.js template** — References "Deploy on Vercel" but project deploys to Cloudflare Pages. Should be updated before production launch.

4. **No Lighthouse performance/accessibility audit in CI** — Could break staging without metrics visibility.

5. **Build step not validated in test.yml** — The non-main workflow only runs tests against the live pages.dev URL. It does not build the app, so build regressions wouldn't be caught until they hit `main`.

---

## Content Refresh Test Plan (SEB-118, SEB-119)

When SEB-118 (technical case studies) and SEB-119 (engineering leadership section) land, the following test coverage is already prepared in `tests/e2e.mjs` (guarded):

### New Pages & Content

| TC | Description | URL Pattern | Verification |
|----|-------------|-------------|--------------|
| TC-50..59 | Case studies (SEB-118) | `/case-studies`, `/en\|pl/case-studies/[slug]` | Full suite: listing, detail, nav, shell, i18n, dark mode, a11y, mobile |
| TC-30..47 | Leadership (SEB-119) | `/leadership`, `/en\|pl/leadership` | Full suite: headings, content, nav, shell, i18n, dark mode, a11y, SEO, mobile |

### Regression Coverage

| Area | Concern | Test Approach |
|------|---------|---------------|
| Navigation | New nav links added? | Verify TC-13 still passes with updated nav links |
| i18n | All EN routes have PL equivalents | Batch check all new PL paths return 200 |
| Layout | New pages use SiteShell + AnimatedLayout | Inspect page structure for nav/footer presence |
| Dark mode | New pages render correctly in dark mode | Toggle dark mode, verify text contrast on new pages |
| SEO | OG metadata on new pages | Each new page should have og:title, og:description |
| Sitemap | New pages appear in sitemap.xml | Verify sitemap.xml includes new URLs |
| Mobile | New content renders at 375px viewport | Check no horizontal overflow |

---

## Known Issues

- **SEB-88** - All locale-prefixed pages (`/en/*`, `/pl/*`) return 404 on `sebastianweszler.com`. Non-locale pages `/projects`, `/blog`, `/resume` also affected on custom domain.
- **TC-23 (Favicon)** - Deployed site lacks `<link rel="icon">` and `/favicon.ico` returns 404. Source code has the fix; requires redeploy to `main`.
- **SEB-74 (Newsletter regression)** - Marked done but source code still imports `NewsletterSignup` in `SiteShell.tsx` and the component is live on the deployed site. See SEB-74 for resolution.
- **README stale** - References Vercel deployment but uses Cloudflare Pages. Update before production.
- **SEB-118 (Case studies)** and **SEB-119 (Leadership)** — Not yet deployed. Guarded tests exist in `tests/e2e.mjs` and will activate automatically when pages go live.

---

## Test Execution

```bash
node tests/e2e.mjs
```

Optional env vars:
- `BASE_URL` - Target domain (default: https://sebastianweszler-com.pages.dev)
- `SECONDARY_URL` - Secondary domain for cross-domain validation (optional)

---

## Reporting

Report bugs via the Paperclip issue tracker with:
1. TC ID
2. Expected vs actual behavior
3. Browser/environment
4. Screenshot if applicable
