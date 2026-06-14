# Maintenance Schedule — sebastianweszler.com

## Daily (Automated — GitHub Actions)

| Task | Tool | Description |
|------|------|-------------|
| Uptime check | `tests/uptime-check.mjs` | HTTP 200 verification of all key pages (EN/PL) on both `pages.dev` and `sebastianweszler.com` |
| Core Web Vitals | Lighthouse CI | LCP, FID, CLS scores captured and trended |

## Weekly (Manual)

| Task | Frequency | Description |
|------|-----------|-------------|
| Review monitoring alerts | Weekly (Mon) | Check GitHub Issues for any auto-filed monitoring failures |
| Dependency audit | Weekly (Mon) | Run `pnpm audit` and review for critical vulnerabilities |
| Check Cloudflare Analytics | Weekly (Mon) | Review traffic, bandwidth, and security events |

## Monthly (Automated + Manual)

| Task | Tool | Description |
|------|------|-------------|
| Full Lighthouse report | Lighthouse CI | Comprehensive performance, accessibility, SEO, and best-practice audit |
| SSL certificate check | Automated | Verify TLS validity and expiry (>30 days) |
| Broken link check | Automated | Crawl all pages for 404s and broken anchors |

## Incident Response

| Severity | Response Time | Action |
|----------|---------------|--------|
| Critical (site down) | < 15 min | Auto-filed GitHub issue, notify via email |
| High (page error) | < 1 hr | Auto-filed GitHub issue |
| Medium (performance regression) | < 24 hr | Filed issue for next sprint |
| Low (CV score dip) | < 1 week | Track in monitoring dashboard |

## Core Web Vitals Targets

| Metric | Target | Threshold |
|--------|--------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s - 4.0s (needs improvement) |
| FID (First Input Delay) | < 100ms | 100ms - 300ms (needs improvement) |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 (needs improvement) |

## Monitoring Stack

- **Uptime**: GitHub Actions scheduled workflow with curl-based health checks
- **Core Web Vitals**: Lighthouse CI via GitHub Actions
- **Analytics**: Cloudflare Analytics dashboard
- **Alerting**: GitHub Issues auto-filed on failure
