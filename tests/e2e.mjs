import { chromium } from "@playwright/test";
import { execSync } from "child_process";

const BASE_URL = process.env.BASE_URL || "https://sebastianweszler-com.pages.dev";
const BASE = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
const SECONDARY_URL = process.env.SECONDARY_URL || "";
const SECONDARY = SECONDARY_URL ? (SECONDARY_URL.endsWith("/") ? SECONDARY_URL.slice(0, -1) : SECONDARY_URL) : null;

const ALL_PAGES = [
  "", "en", "pl",
  "about", "en/about", "pl/about",
  "projects", "en/projects", "pl/projects",
  "blog", "en/blog", "pl/blog",
  "contact", "en/contact", "pl/contact",
  "resume", "en/resume", "pl/resume",
  "en/blog/hello-world", "pl/blog/hello-world",
  "en/blog/rebuilding-sebastianweszler-com", "pl/blog/rebuilding-sebastianweszler-com",
];

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, msg) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
}

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  \u2713 ${name}`);
  } catch (e) {
    failed++;
    failures.push({ name, message: e.message });
    console.log(`  \u2717 ${name}`);
    console.log(`    ${e.message}`);
  }
}

async function checkUrlStatus(domain, path) {
  const url = `${domain}${path ? "/" + path : ""}`;
  try {
    const status = execSync(`curl -sL -o /dev/null -w "%{http_code}" "${url}"`, {
      timeout: 10000,
      encoding: "utf-8",
    }).trim();
    return parseInt(status, 10);
  } catch {
    return 0;
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  console.log("\n=== sebastianweszler.com E2E Tests ===\n");

  // ========== HOMEPAGE ==========
  await test("TC-01: Homepage loads (EN root)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(BASE, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const title = await page.title();
    assert(title.includes("Sebastian Weszler"), `Title: "${title}"`);

    const h1 = await page.textContent("h1");
    assert(h1 === "Sebastian Weszler", `H1: "${h1}"`);

    const subtitle = await page.textContent("p.text-xl");
    assert(subtitle.includes("Engineering Leader"), `Subtitle: "${subtitle}"`);

    const desc = await page.textContent("p.max-w-md");
    assert(desc.includes("Technical leader"), `Description check: "${desc.substring(0, 50)}"`);

    const moreLink = page.locator("a").filter({ hasText: "More about me" });
    assert(await moreLink.count() > 0, "More about me link missing");

    await page.close();
  });

  await test("TC-02: Homepage loads correctly", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1 === "Sebastian Weszler", `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-02b: Homepage PL loads", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const subtitle = await page.textContent("p.text-xl");
    assert(subtitle.includes("Lider In\u017Cynierii") || subtitle.includes("Lider"), `PL subtitle: "${subtitle}"`);

    await page.close();
  });

  // ========== ABOUT PAGE ==========
  await test("TC-03: About page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/about/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("about"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-03b: About page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/about/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("o mnie") || h1.toLowerCase().includes("about"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== PROJECTS PAGE ==========
  await test("TC-04: Projects page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/projects/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("projects") || h1.toLowerCase().includes("projekty"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-04b: Projects page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/projects/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("projekty") || h1.toLowerCase().includes("projects"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== BLOG PAGE ==========
  await test("TC-05: Blog page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/blog/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("blog"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-05b: Blog page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/blog/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("blog"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== BLOG POST ==========
  await test("TC-06: Blog post detail (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/blog/hello-world/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    await page.close();
  });

  // ========== CONTACT PAGE ==========
  await test("TC-07: Contact page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/contact/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("contact") || h1.toLowerCase().includes("kontakt"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-07b: Contact page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/contact/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("kontakt") || h1.toLowerCase().includes("contact"), `PL H1: "${h1}"`);

    await page.close();
  });

  await test("TC-08: Contact form presence", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/contact/`, { waitUntil: "networkidle" });

    const form = page.locator("form");
    assert(await form.count() > 0, "Contact form missing");

    await page.close();
  });

  // ========== RESUME PAGE ==========
  await test("TC-09: Resume page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/resume/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("resume") || h1.toLowerCase().includes("cv"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-09b: Resume page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/resume/`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("cv") || h1.toLowerCase().includes("resume"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== LANGUAGE TOGGLE ==========
  await test("TC-10: Language toggle from homepage", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

    const togglePL = page.locator("a").filter({ hasText: "PL" });
    if (await togglePL.count() > 0) {
        await togglePL.first().click();
        await page.waitForTimeout(1000);
        assert(page.url().includes("/pl/"), `URL after toggle: "${page.url()}"`);
    }

    await page.close();
  });

  await test("TC-11: Language toggle from sub-page", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/about/`, { waitUntil: "networkidle" });

    const toggle = page.locator("a").filter({ hasText: "PL" });
    if (await toggle.count() > 0) {
        await toggle.first().click();
        await page.waitForTimeout(1000);
        assert(page.url().includes("/pl/about/"), `URL: "${page.url()}"`);
    }

    await page.close();
  });

  // ========== DARK MODE ==========
  await test("TC-12: Dark mode toggle", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

    const toggle = page.locator('button[aria-label="Toggle theme"]');
    assert(await toggle.count() > 0, "Theme toggle button missing");

    let hasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
    // Initial state depends on system preference, so we just toggle and check change
    await toggle.click();
    await page.waitForTimeout(300);
    let hasDarkAfter = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
    assert(hasDark !== hasDarkAfter, `Dark class did not toggle: ${hasDark} -> ${hasDarkAfter}`);

    await page.close();
  });

  // ========== NAVIGATION ==========
  await test("TC-13: Navigation links", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });

    const navLinks = page.locator("nav ul li a");
    const count = await navLinks.count();
    const linkData = [];
    for (let i = 0; i < count; i++) {
      linkData.push({
        href: await navLinks.nth(i).getAttribute("href"),
        text: (await navLinks.nth(i).textContent()).trim(),
      });
    }

    const expectedLinks = [
      { href: "/", text: "Home" },
      { href: "/about/", text: "About" },
      { href: "/projects/", text: "Projects" },
      { href: "/blog/", text: "Blog" },
      { href: "/contact/", text: "Contact" },
      { href: "/resume/", text: "Resume" },
    ];

    for (const expected of expectedLinks) {
      const found = linkData.some((l) => l.href === expected.href && l.text === expected.text);
      assert(found, `Nav link "${expected.text}" -> "${expected.href}" not found.\n  Found: ${JSON.stringify(linkData)}`);
    }

    await page.close();
  });

  // ========== ACCESSIBILITY ==========
  await test("TC-14: Skip to main content link", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const skipLink = page.locator('a[href="#main-content"]');
    assert(await skipLink.count() > 0, "Skip to main content link missing");

    assert(await skipLink.evaluate((el) => el.classList.contains("sr-only")),
      "Skip link should be sr-only by default");

    await page.keyboard.press("Tab");
    await page.waitForTimeout(200);

    const isIntersecting = await skipLink.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= 0 && r.left >= 0 && r.bottom <= window.innerHeight && r.right <= window.innerWidth;
    });
    assert(isIntersecting, "Skip link should be visible in viewport on focus");

    await page.close();
  });

  // ========== NEWSLETTER ==========
  await test("TC-15: Newsletter signup form", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const heading = page.locator("footer h3");
    assert(await heading.count() > 0, "Newsletter heading missing");
    assert((await heading.textContent()) === "Stay Updated", `Newsletter title mismatch`);

    assert(await page.locator('footer input[type="email"]').count() > 0, "Newsletter email input missing");

    const btn = page.locator('footer button[type="submit"]');
    assert(await btn.count() > 0, "Subscribe button missing");
    assert((await btn.textContent()).trim() === "Subscribe", `Subscribe btn text mismatch`);

    await page.close();
  });

  // ========== FOOTER SOCIAL LINKS ==========
  await test("TC-16: Social footer links", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const socialLinks = page.locator('footer a[target="_blank"]');
    const count = await socialLinks.count();
    const linkData = [];
    for (let i = 0; i < count; i++) {
      linkData.push({
        href: await socialLinks.nth(i).getAttribute("href"),
        label: await socialLinks.nth(i).getAttribute("aria-label"),
      });
    }

    const expected = [
      { href: "https://github.com/SWeszler", label: "Visit my GitHub profile" },
      { href: "https://linkedin.com/in/sebastianweszler", label: "Visit my LinkedIn profile" },
      { href: "https://medium.com/@s.weszler", label: "Visit my Medium profile" },
      { href: "https://leetcode.com/sweszler/", label: "Visit my LeetCode profile" },
      { href: "mailto:sebastian.weszler@gmail.com", label: "Visit my Email profile" },
    ];

    for (const exp of expected) {
      const found = linkData.some((l) => l.href === exp.href && l.label === exp.label);
      assert(found, `Social link "${exp.label}" -> "${exp.href}" not found`);
    }

    await page.close();
  });

  // ========== SEO META ==========
  await test("TC-17: SEO metadata", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const title = await page.title();
    assert(title === "Sebastian Weszler | Software Engineer", `Title: "${title}"`);

    for (const sel of [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:image"]',
    ]) {
      assert(await page.locator(sel).count() > 0, `${sel} missing`);
    }

    const metaDesc = page.locator('meta[name="description"]').first();
    const descContent = await metaDesc.getAttribute("content");
    assert(descContent.includes("Software Engineer"), `Meta desc: "${descContent}"`);

    await page.close();
  });

  // ========== VIEWPORT META ==========
  await test("TC-18: Viewport meta", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const vp = page.locator('meta[name="viewport"]').first();
    assert(await vp.count() > 0, "Viewport meta missing");
    assert((await vp.getAttribute("content")) === "width=device-width, initial-scale=1",
      `Viewport content mismatch`);

    await page.close();
  });

  // ========== 404 PAGE ==========
  await test("TC-19: 404 page", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/nonexistent-page`, { waitUntil: "networkidle" });
    assert(resp.status() === 404, `Status ${resp.status()}`);

    const bodyText = await page.textContent("body");
    assert(bodyText.includes("This page could not be found"), `Body missing 404 text`);

    await page.close();
  });

  // ========== SECOND BLOG POST ==========
  await test("TC-20: Second blog post (rebuilding-sebastianweszler-com) EN", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/en/blog/rebuilding-sebastianweszler-com`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);
    const article = page.locator("article");
    assert(await article.count() > 0, "Article element missing");
    const body = await page.textContent("main");
    assert(body.includes("rebuilding") || body.includes("Rebuilding"), "Post body content missing");
    await page.close();
  });

  await test("TC-20b: Second blog post PL", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/blog/rebuilding-sebastianweszler-com`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);
    const article = page.locator("article");
    assert(await article.count() > 0, "Article element missing");
    await page.close();
  });

  // ========== STATIC ASSETS ==========
  await test("TC-21: robots.txt", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/robots.txt`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);
    const text = await page.textContent("body");
    const lower = text.toLowerCase();
    assert(lower.includes("user-agent"), `robots.txt content: "${text.substring(0, 50)}"`);
    await page.close();
  });

  await test("TC-22: Sitemap XML", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/sitemap.xml`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);
    const text = await page.textContent("body");
    assert(text.includes("urlset"), "sitemap.xml missing urlset");
    assert(text.includes("sebastianweszler"), "sitemap.xml missing domain reference");
    await page.close();
  });

  await test("TC-23: Favicon accessible", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const iconLink = page.locator('link[rel="icon"], link[rel="shortcut icon"]').first();
    const hasLink = await iconLink.count() > 0;

    if (hasLink) {
      const href = await iconLink.getAttribute("href");
      assert(href && href.length > 0, "Favicon link has empty href");
    } else {
      const status = await checkUrlStatus(BASE, "favicon.ico");
      assert(status === 200,
        `Favicon not found: no <link> in head and /favicon.ico returned ${status}. ` +
        `Add favicon.ico (or favicon.svg) to public/ and redeploy.`
      );
    }
    await page.close();
  });

  // ========== SEB-94: ENGINEERING LEADERSHIP SECTION (guarded — page may not exist yet) ==========
  const leadershipExists = await checkUrlStatus(BASE, "leadership") === 200;

  if (!leadershipExists) {
    console.log("\n  --- Skipping SEB-94 leadership tests (page not deployed yet) ---\n");
  } else {
    console.log("\n  --- SEB-94: Engineering Leadership Section ---\n");

    await test("TC-30: Leadership page loads (EN root)", async () => {
      const page = await context.newPage();
      const resp = await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      assert(resp.status() === 200, `Status ${resp.status()}`);
      const h1 = await page.textContent("h1");
      assert(h1 && h1.length > 0, `H1: "${h1}"`);
      await page.close();
    });

    await test("TC-30b: Leadership page loads (EN locale)", async () => {
      const page = await context.newPage();
      const resp = await page.goto(`${BASE}/en/leadership/`, { waitUntil: "networkidle" });
      assert(resp.status() === 200, `Status ${resp.status()}`);
      await page.close();
    });

    await test("TC-30c: Leadership page loads (PL)", async () => {
      const page = await context.newPage();
      const resp = await page.goto(`${BASE}/pl/leadership/`, { waitUntil: "networkidle" });
      assert(resp.status() === 200, `Status ${resp.status()}`);
      await page.close();
    });

    await test("TC-31: Leadership h1 contains keywords", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      const h1 = await page.textContent("h1");
      assert(/leadership|engineering|leading|technology/i.test(h1), `H1: "${h1}"`);
      await page.close();
    });

    await test("TC-32: Leadership content renders", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      const body = await page.textContent("main");
      assert(body.length > 100, `main content only ${body.length} chars`);
      await page.close();
    });

    await test("TC-33: Leadership link in navigation", async () => {
      const page = await context.newPage();
      await page.goto(BASE, { waitUntil: "networkidle" });
      const navLinks = page.locator("nav ul li a");
      const count = await navLinks.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const href = await navLinks.nth(i).getAttribute("href");
        if (href && (href.includes("leadership") || href.includes("leadership"))) {
          found = true;
          break;
        }
      }
      assert(found, "Leadership link not found in navigation");
      await page.close();
    });

    await test("TC-34: SiteShell present on leadership page", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      assert(await page.locator("footer").count() > 0, "Footer missing");
      assert(await page.locator("nav").count() > 0, "Nav missing");
      await page.close();
    });

    await test("TC-36: Language toggle from leadership to PL", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      const togglePL = page.locator('a[aria-label*="Polish"], a').filter({ hasText: "PL" });
      if (await togglePL.count() > 0) {
        await togglePL.first().click();
        await page.waitForTimeout(1000);
        assert(page.url().includes("/pl/"), `URL after toggle: "${page.url()}"`);
      }
      await page.close();
    });

    await test("TC-38: Dark mode toggle on leadership", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      const toggle = page.locator('button[aria-label="Toggle theme"]');
      assert(await toggle.count() > 0, "Theme toggle missing");
      const hasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
      await toggle.click();
      await page.waitForTimeout(300);
      const hasDarkAfter = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
      assert(hasDark !== hasDarkAfter, `Dark class did not toggle: ${hasDark} -> ${hasDarkAfter}`);
      await page.close();
    });

    await test("TC-40: Skip link on leadership page", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      const skipLink = page.locator('a[href="#main-content"]');
      assert(await skipLink.count() > 0, "Skip link missing");
      await page.close();
    });

    await test("TC-42: Leadership page SEO meta", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      assert(await page.locator('meta[name="description"]').count() > 0, "Meta description missing");
      await page.close();
    });

    await test("TC-43: Leadership page OG title", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      assert(await page.locator('meta[property="og:title"]').count() > 0, "OG title missing");
      await page.close();
    });

    await test("TC-46: Mobile rendering 375px", async () => {
      const mobilePage = await context.newPage();
      await mobilePage.setViewportSize({ width: 375, height: 812 });
      await mobilePage.goto(`${BASE}/leadership/`, { waitUntil: "networkidle" });
      const overflow = await mobilePage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert(!overflow, "Horizontal overflow detected at 375px");
      await mobilePage.close();
    });
  }

  // ========== SEB-118: TECHNICAL CASE STUDIES (guarded — page may not exist yet) ==========
  const caseStudiesExists = await checkUrlStatus(BASE, "case-studies") === 200;

  if (!caseStudiesExists) {
    console.log("\n  --- Skipping SEB-118 case studies tests (page not deployed yet) ---\n");
  } else {
    console.log("\n  --- SEB-118: Technical Case Studies ---\n");

    await test("TC-50: Case studies listing loads (EN root)", async () => {
      const page = await context.newPage();
      const resp = await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      assert(resp.status() === 200, `Status ${resp.status()}`);
      assert(await page.locator("h1").count() > 0, "h1 missing");
      await page.close();
    });

    await test("TC-50b: Case studies listing loads (EN locale)", async () => {
      const page = await context.newPage();
      const resp = await page.goto(`${BASE}/en/case-studies/`, { waitUntil: "networkidle" });
      assert(resp.status() === 200, `Status ${resp.status()}`);
      await page.close();
    });

    await test("TC-50c: Case studies listing loads (PL)", async () => {
      const page = await context.newPage();
      const resp = await page.goto(`${BASE}/pl/case-studies/`, { waitUntil: "networkidle" });
      assert(resp.status() === 200, `Status ${resp.status()}`);
      await page.close();
    });

    await test("TC-51: Case studies h1 contains relevant keywords", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const h1 = await page.textContent("h1");
      assert(/case\s*stud|project|work/i.test(h1), `H1: "${h1}"`);
      await page.close();
    });

    await test("TC-52: Case studies content renders", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const body = await page.textContent("main");
      assert(body.length > 100, `main content only ${body.length} chars`);
      await page.close();
    });

    await test("TC-53: Case study detail page loads (EN)", async () => {
      const page = await context.newPage();
      // first find a case study link from the listing
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const links = page.locator('a[href*="/case-studies/"]');
      const count = await links.count();
      if (count > 0) {
        const href = await links.first().getAttribute("href");
        await page.goto(`${BASE}${href}`, { waitUntil: "networkidle" });
        assert(page.url().includes("/case-studies/"), `URL: "${page.url()}"`);
      } else {
        console.log("    (no case study links found to test detail)");
      }
      await page.close();
    });

    await test("TC-53b: Case study detail page loads (PL)", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/pl/case-studies/`, { waitUntil: "networkidle" });
      const links = page.locator('a[href*="/case-studies/"]');
      const count = await links.count();
      if (count > 0) {
        const href = await links.first().getAttribute("href");
        await page.goto(`${BASE}${href}`, { waitUntil: "networkidle" });
        assert(page.url().includes("/case-studies/"), `URL: "${page.url()}"`);
      } else {
        console.log("    (no PL case study links found to test detail)");
      }
      await page.close();
    });

    await test("TC-54: Case studies link in navigation", async () => {
      const page = await context.newPage();
      await page.goto(BASE, { waitUntil: "networkidle" });
      const navLinks = page.locator("nav ul li a");
      const count = await navLinks.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const href = await navLinks.nth(i).getAttribute("href");
        if (href && href.includes("case-studies")) {
          found = true;
          break;
        }
      }
      assert(found, "Case studies link not found in navigation");
      await page.close();
    });

    await test("TC-55: SiteShell present on case studies", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      assert(await page.locator("footer").count() > 0, "Footer missing");
      assert(await page.locator("nav").count() > 0, "Nav missing");
      await page.close();
    });

    await test("TC-56: Language toggle from case studies to PL", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const togglePL = page.locator('a').filter({ hasText: "PL" });
      if (await togglePL.count() > 0) {
        await togglePL.first().click();
        await page.waitForTimeout(1000);
        assert(page.url().includes("/pl/"), `URL after toggle: "${page.url()}"`);
      }
      await page.close();
    });

    await test("TC-57: Dark mode toggle on case studies", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const toggle = page.locator('button[aria-label="Toggle theme"]');
      assert(await toggle.count() > 0, "Theme toggle missing");
      const hasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
      await toggle.click();
      await page.waitForTimeout(300);
      const hasDarkAfter = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
      assert(hasDark !== hasDarkAfter, `Dark class did not toggle: ${hasDark} -> ${hasDarkAfter}`);
      await page.close();
    });

    await test("TC-58: Skip link on case studies", async () => {
      const page = await context.newPage();
      await page.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const skipLink = page.locator('a[href="#main-content"]');
      assert(await skipLink.count() > 0, "Skip link missing");
      await page.close();
    });

    await test("TC-59: Mobile rendering 375px on case studies", async () => {
      const mobilePage = await context.newPage();
      await mobilePage.setViewportSize({ width: 375, height: 812 });
      await mobilePage.goto(`${BASE}/case-studies/`, { waitUntil: "networkidle" });
      const overflow = await mobilePage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      assert(!overflow, "Horizontal overflow detected at 375px");
      await mobilePage.close();
    });
  }

  // ========== ALL PAGES BATCH CHECK (optional secondary domain) ==========
  if (SECONDARY) {
    console.log(`\n  --- Batch URL check: ${SECONDARY} ---\n`);
    const brokenPages = [];
    for (const path of ALL_PAGES) {
      const status = await checkUrlStatus(SECONDARY, path);
      if (status !== 200) {
        brokenPages.push({ path: path || "/", status });
      }
    }
    if (brokenPages.length > 0) {
      console.log(`  Found ${brokenPages.length} broken URLs on ${SECONDARY}:`);
      for (const bp of brokenPages) {
        console.log(`    [${bp.status}] /${bp.path}`);
      }
    } else {
      console.log(`  All ${ALL_PAGES.length} pages returned 200 on ${SECONDARY}`);
    }

    await test(`TC-24: All pages return 200 on custom domain`, async () => {
      assert(brokenPages.length === 0,
        `${brokenPages.length} URLs returned non-200 on ${SECONDARY}:\n${
          brokenPages.map((bp) => `  [${bp.status}] /${bp.path}`).join("\n")
        }`);
    });
  }

  // ========== SUMMARY ==========
  await browser.close();

  const total = passed + failed;
  console.log(`\n=== Results: ${passed}/${total} passed, ${failed} failed ===\n`);

  if (failures.length > 0) {
    console.log("Failures:");
    for (const f of failures) {
      console.log(`  - ${f.name}: ${f.message}`);
    }
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
