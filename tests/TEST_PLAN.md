# Test Plan — sebastianweszler.com

**Website:** https://sebastianweszler-com.pages.dev/  
**Last Updated:** 2026-05-15  
**Tester:** QA Engineer

---

## Scope

Full E2E coverage of the personal portfolio website, including i18n (EN/PL), navigation, content rendering, contact form, newsletter signup, dark mode, and accessibility.

---

## Test Cases

### TC-01: Homepage loads (EN)
- **URL:** `/`
- **Checks:** Title, heading, subtitle, description, More about me link, navigation links present, footer content, newsletter section

### TC-02: Homepage loads (PL)
- **URL:** `/pl`
- **Checks:** Polish heading, subtitle, description, nav labels in Polish, newsletter in Polish

### TC-03: About page loads (EN/PL)
- **URL:** `/about`, `/pl/about`
- **Checks:** Title "About Me" / "O Mnie", intro text, skills visualization section, back to home link

### TC-04: Projects page loads (EN/PL)
- **URL:** `/projects`, `/pl/projects`
- **Checks:** Title, project cards (4 items), experience timeline section

### TC-05: Blog page loads (EN/PL)
- **URL:** `/blog`, `/pl/blog`
- **Checks:** Title, description, blog post listing, read more links

### TC-06: Blog post detail (EN)
- **URL:** `/blog/hello-world`
- **Checks:** Post renders, back to blog link, thanks for reading section

### TC-07: Contact page loads (EN/PL)
- **URL:** `/contact`, `/pl/contact`
- **Checks:** Title, description, email displayed, socials listed, contact form with name/email/message fields

### TC-08: Contact form submission
- **URL:** `/contact`
- **Checks:** Fill form, submit, success message displayed, send another button works

### TC-09: Resume page loads (EN/PL)
- **URL:** `/resume`, `/pl/resume`
- **Checks:** Title, description, download PDF button, experience/education sections, skills

### TC-10: Language toggle
- **URL:** `/` → toggle to PL → toggle back to EN
- **Checks:** Clicking PL link navigates to `/pl`, nav labels switch, clicking EN returns to `/`

### TC-11: Language toggle from sub-page
- **URL:** `/about` → toggle to PL
- **Checks:** Navigates to `/pl/about`

### TC-12: Dark mode toggle
- **URL:** `/`
- **Checks:** Click toggle, verify dark class on html, verify toggle icon changes (moon → sun or vice versa)

### TC-13: Navigation links
- **URL:** `/`
- **Checks:** All nav links present and navigate to correct URLs, active link has correct styling

### TC-14: Skip to main content (a11y)
- **URL:** `/`
- **Checks:** Skip link exists, is hidden by default, becomes visible on focus via Tab

### TC-15: Newsletter signup form
- **URL:** `/`
- **Checks:** Newsletter section present with email input and subscribe button, form submission

### TC-16: Animations (visual)
- **URL:** `/`
- **Checks:** Page content fades in (opacity transitions from 0 to 1), scroll reveal elements present

### TC-17: Responsive meta viewport
- **URL:** `/`
- **Checks:** Viewport meta tag set to `width=device-width, initial-scale=1`

### TC-18: SEO metadata
- **URL:** `/`
- **Checks:** Title tag, meta description, OG tags, robots meta present

### TC-19: Social footer links
- **URL:** `/`
- **Checks:** GitHub, LinkedIn, Medium, LeetCode, Email links present with correct hrefs and aria-labels

### TC-20: 404 page
- **URL:** `/nonexistent-page`
- **Checks:** 404 status or "This page could not be found" text

---

## Test Execution

Run tests with:

```bash
cd /path/to/project
node tests/e2e.mjs
```

Requires Node.js 18+ and Puppeteer.

---

## Reporting

Report bugs via the Paperclip issue tracker with:
1. TC ID
2. Expected vs actual behavior
3. Browser/environment
4. Screenshot if applicable
