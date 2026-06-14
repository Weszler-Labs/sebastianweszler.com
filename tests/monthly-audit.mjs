import { readFileSync, writeFileSync } from "fs";

const audit = JSON.parse(readFileSync("audit-report.json", "utf8"));
const outdatedRaw = readFileSync("outdated-report.json", "utf8");
let outdated;
try {
  outdated = JSON.parse(outdatedRaw);
} catch {
  outdated = {};
}

const lines = [];
lines.push("# Monthly Dependency Audit Report\n");
const vulns = audit.metadata?.vulnerabilities || {};
const total = Object.values(vulns).reduce((s, v) => s + v, 0);
lines.push("## Security Vulnerabilities");
lines.push("Total: " + total);
for (const [k, v] of Object.entries(vulns)) {
  if (v > 0) lines.push("- " + k + ": " + v);
}
lines.push("\n## Outdated Packages");
const outdatedCount = Object.keys(outdated).length;
if (outdatedCount > 0) {
  lines.push("Packages behind latest: " + outdatedCount);
  for (const [name, info] of Object.entries(outdated)) {
    lines.push("- " + name + ": " + (info.current || "?") + " -> " + (info.latest || "?"));
  }
} else {
  lines.push("All packages up to date.");
}

writeFileSync("audit-summary.md", lines.join("\n"));
console.log("Audit summary written to audit-summary.md");

const critical = vulns.critical || 0;
const high = vulns.high || 0;
if (critical > 0 || high > 0) {
  console.log(`Found ${critical} critical and ${high} high vulnerabilities`);
  process.exitCode = 1;
}
