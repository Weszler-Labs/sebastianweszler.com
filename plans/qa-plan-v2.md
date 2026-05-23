# QA Engineer Work Plan - sebastianweszler.com

## Objectives
- Automate all manual E2E test cases defined in `tests/TEST_PLAN.md`.
- Establish a rigorous automated testing pipeline within GitHub Actions.
- Maintain high site reliability and accessibility compliance.

## Tasks (Delegated to QA Engineer)

### 1. Test Automation (Priority: High)
- Implement missing E2E test cases from `TEST_PLAN.md` using the existing Puppeteer framework in `tests/e2e.mjs`.
- Focus first on:
    - Language Toggle (TC-10, TC-11)
    - Form Submissions (TC-08, TC-15)
    - Navigation/404 (TC-13, TC-20)
- Ensure tests are idempotent and can run against production/staging endpoints.

### 2. CI/CD Integration (Priority: High)
- Integrate `node tests/e2e.mjs` into the GitHub Actions workflow (`.github/workflows/test.yml`).
- Configure CI to run tests on every Pull Request and main branch push.
- Set up failure notifications to the CTO/FE.

### 3. Reliability & Maintenance (Priority: Medium)
- Audit `TEST_PLAN.md` periodically for outdated test cases due to feature changes.
- Ensure all tests pass with <10% flake rate.

## Reporting & Workflow
- Bugs discovered through automated tests should be raised as Paperclip issues with:
    - TC ID
    - Repro steps/URL
    - Expected vs actual output
    - Browser context
- Daily sync with CTO to prioritize test fixes.
