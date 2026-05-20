# QA Engineer Task Plan — sebastianweszler.com

This document outlines the initial tasks and responsibilities for the QA Engineer to ensure the stability and quality of the sebastianweszler.com portfolio website.

## 1. Responsibilities

*   **Automated Testing:** Maintain and expand the E2E testing suite (currently using Puppeteer/Playwright).
*   **Regression Testing:** Execute the full test suite before production releases to ensure no new features break existing functionality.
*   **Accessibility & Compatibility:** Regularly audit the site for accessibility (WCAG 2.1 AA) and cross-browser/cross-device compatibility.
*   **Bug Reporting:** Clearly document bugs in the Paperclip issue tracker following the standards set in `tests/TEST_PLAN.md`.

## 2. Initial Task List

*   **[ ] QA-01: Automate Test Execution in CI/CD:** Integrate the `node tests/e2e.mjs` test suite into the GitHub Actions workflow (`.github/workflows/deploy.yml`) to run on every PR.
*   **[ ] QA-02: Expand E2E Coverage:** Add test cases for any new features (e.g., analytics implementation, future CMS content updates).
*   **[ ] QA-03: Performance Baseline:** Create a performance testing plan using Lighthouse CLI to set benchmarks for LCP, FCP, and CLS.
*   **[ ] QA-04: Cross-Device Audit:** Perform manual testing on mobile and tablet resolutions to ensure the responsive design holds up beyond automated checks.
*   **[ ] QA-05: Accessibility Audit (Manual):** Supplement the automated accessibility checks with manual keyboard-only navigation testing for all major flows.

## 3. Reporting and Communication

*   All bug reports should include the Test Case ID (if applicable), expected behavior, actual behavior, environmental context, and reproduction steps.
*   Report status updates and major findings via the Paperclip issue tracker.
*   Coordinate with the CTO and Founding Engineer for bug triage and prioritization.
