import { chromium } from "@playwright/test";

const BASE = process.env.BASE_URL || "https://sebastianweszler-com.pages.dev";

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
    const resp = await page.goto(`${BASE}/about`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("about"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-03b: About page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/about`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("o mnie") || h1.toLowerCase().includes("about"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== PROJECTS PAGE ==========
  await test("TC-04: Projects page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("projects") || h1.toLowerCase().includes("projekty"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-04b: Projects page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/projects`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("projekty") || h1.toLowerCase().includes("projects"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== BLOG PAGE ==========
  await test("TC-05: Blog page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("blog"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-05b: Blog page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/blog`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("blog"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== BLOG POST ==========
  await test("TC-06: Blog post detail (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/blog/hello-world`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    await page.close();
  });

  // ========== CONTACT PAGE ==========
  await test("TC-07: Contact page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("contact") || h1.toLowerCase().includes("kontakt"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-07b: Contact page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/contact`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("kontakt") || h1.toLowerCase().includes("contact"), `PL H1: "${h1}"`);

    await page.close();
  });

  await test("TC-08: Contact form presence", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });

    const form = page.locator("form");
    assert(await form.count() > 0, "Contact form missing");

    await page.close();
  });

  // ========== RESUME PAGE ==========
  await test("TC-09: Resume page loads (EN)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("resume") || h1.toLowerCase().includes("cv"), `H1: "${h1}"`);

    await page.close();
  });

  await test("TC-09b: Resume page loads (PL)", async () => {
    const page = await context.newPage();
    const resp = await page.goto(`${BASE}/pl/resume`, { waitUntil: "networkidle" });
    assert(resp.status() === 200, `Status ${resp.status()}`);

    const h1 = await page.textContent("h1");
    assert(h1.toLowerCase().includes("cv") || h1.toLowerCase().includes("resume"), `PL H1: "${h1}"`);

    await page.close();
  });

  // ========== LANGUAGE TOGGLE ==========
  await test("TC-10: Language toggle from homepage", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const togglePL = page.locator("a").filter({ hasText: "PL" });
    if (await togglePL.count() > 0) {
        await togglePL.first().click();
        await page.waitForTimeout(1000);
        assert(page.url().includes("/pl"), `URL after toggle: "${page.url()}"`);
    }

    await page.close();
  });

  await test("TC-11: Language toggle from sub-page", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/about`, { waitUntil: "networkidle" });

    const toggle = page.locator("a").filter({ hasText: "PL" });
    if (await toggle.count() > 0) {
        await toggle.first().click();
        await page.waitForTimeout(1000);
        assert(page.url().includes("/pl/about"), `URL: "${page.url()}"`);
    }

    await page.close();
  });

  // ========== DARK MODE ==========
  await test("TC-12: Dark mode toggle", async () => {
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });

    const toggle = page.locator('button[aria-label="Toggle theme"]');
    assert(await toggle.count() > 0, "Theme toggle button missing");

    let hasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
    assert(hasDark === false, `Dark class before toggle: ${hasDark}`);

    await toggle.click();
    await page.waitForTimeout(300);
    hasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
    assert(hasDark === true, `Dark class after toggle: ${hasDark}`);

    await toggle.click();
    await page.waitForTimeout(300);
    hasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));
    assert(hasDark === false, `Dark class after second toggle: ${hasDark}`);

    await page.close();
  });

  // ========== NAVIGATION ==========
  await test("TC-13: Navigation links", async () => {
    const page = await context.newPage();
    await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });

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
      { href: "/about", text: "About" },
      { href: "/projects", text: "Projects" },
      { href: "/blog", text: "Blog" },
      { href: "/contact", text: "Contact" },
      { href: "/resume", text: "Resume" },
    ];

    for (const expected of expectedLinks) {
      const found = linkData.some((l) => l.href === expected.href && l.text === expected.text);
      assert(found, `Nav link "${expected.text}" -> "${expected.href}" not found.\n  Found: ${JSON.stringify(linkData)}`);
    }

    const activeLink = linkData.find((l) => l.href === "/" && l.text === "Home");
    assert(activeLink !== undefined, "Home nav link should exist");

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
