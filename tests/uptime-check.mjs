import { execSync } from "child_process";

const SITE = process.env.SITE_URL || "https://sebastianweszler-com.pages.dev";
const SECONDARY_SITE = process.env.SECONDARY_SITE || "https://sebastianweszler.com";
const BASE = SITE.endsWith("/") ? SITE.slice(0, -1) : SITE;
const SECONDARY = SECONDARY_SITE.endsWith("/") ? SECONDARY_SITE.slice(0, -1) : SECONDARY_SITE;

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

function checkUrl(url) {
  try {
    const status = execSync(`curl -sL -o /dev/null -w "%{http_code}" --max-time 10 "${url}"`, {
      timeout: 15000,
      encoding: "utf-8",
    }).trim();
    return parseInt(status, 10);
  } catch {
    return 0;
  }
}

function checkTls(domain) {
  try {
    const output = execSync(
      `echo | openssl s_client -servername "${domain}" -connect "${domain}:443" 2>/dev/null | openssl x509 -noout -enddate`,
      { timeout: 10000, encoding: "utf-8" }
    );
    const match = output.match(/notAfter=(.+)/);
    if (!match) return { valid: false, error: "could not parse cert" };
    const expiry = new Date(match[1]);
    const now = new Date();
    const daysLeft = Math.floor((expiry - now) / (1000 * 60 * 60 * 24));
    return { valid: true, daysLeft, expiry: expiry.toISOString() };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

function checkDomain(d) {
  const results = [];
  for (const path of ALL_PAGES) {
    const url = `${d}${path ? "/" + path : ""}`;
    const status = checkUrl(url);
    results.push({ url, status, ok: status === 200 });
  }
  return results;
}

function printResults(domain, results, label) {
  const failed = results.filter((r) => !r.ok);
  console.log(`\n--- ${label}: ${domain} ---`);
  console.log(`  Total: ${results.length}, OK: ${results.length - failed.length}, Failed: ${failed.length}`);
  if (failed.length > 0) {
    for (const f of failed) {
      console.log(`  FAIL [${f.status}] ${f.url}`);
    }
  }
}

async function run() {
  console.log("=== sebastianweszler.com Uptime Check ===\n");
  console.log(`Timestamp: ${new Date().toISOString()}`);

  const primaryResults = checkDomain(BASE);
  printResults(BASE, primaryResults, "Primary");

  const secondaryResults = checkDomain(SECONDARY);
  printResults(SECONDARY, secondaryResults, "Secondary");

  console.log("\n--- TLS Certificate Check ---");
  const tlsPrimary = checkTls(new URL(BASE).hostname);
  if (tlsPrimary.valid) {
    console.log(`  ${new URL(BASE).hostname}: ${tlsPrimary.daysLeft} days until expiry (${tlsPrimary.expiry})`);
  } else {
    console.log(`  ${new URL(BASE).hostname}: ERROR - ${tlsPrimary.error}`);
  }

  const tlsSecondary = checkTls(new URL(SECONDARY).hostname);
  if (tlsSecondary.valid) {
    console.log(`  ${new URL(SECONDARY).hostname}: ${tlsSecondary.daysLeft} days until expiry (${tlsSecondary.expiry})`);
  } else {
    console.log(`  ${new URL(SECONDARY).hostname}: ERROR - ${tlsSecondary.error}`);
  }

  const allFailed = [...primaryResults, ...secondaryResults].filter((r) => !r.ok);
  const tlsWarning = tlsSecondary.valid && tlsSecondary.daysLeft < 30;

  console.log(`\n=== Summary ===`);
  if (allFailed.length > 0) {
    console.log(`FAILURES: ${allFailed.length} URLs returned non-200`);
    process.exitCode = 1;
  } else {
    console.log("All URLs OK");
  }

  if (tlsWarning) {
    console.log(`WARNING: TLS certificate expires in ${tlsSecondary.daysLeft} days`);
  }
}

run().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
