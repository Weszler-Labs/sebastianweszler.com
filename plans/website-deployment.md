# Website Deployment Plan

## Current Blockers

*   **GitHub PAT (SEB-130):** The absence of a properly provisioned GitHub Personal Access Token (PAT) remains a critical blocker for several CI/CD operations, including triggering `workflow_dispatch` and ensuring robust repository interactions. This is currently being addressed by the Founding Engineer.
*   **Cloudflare API Token Permissions:** While the `CLOUDFLARE_API_TOKEN` is present, its permissions require verification. Insufficient permissions will prevent full custom domain management via the API and affect live site verification.

This document outlines the strategy for deploying and managing the sebastianweszler.com website. It builds upon the existing GitHub Actions workflow for Cloudflare Pages deployment.

## 1. Deployment Trigger and Environment

*   **Primary Deployment:** The website is deployed to Cloudflare Pages automatically on pushes to the `main` branch via the `.github/workflows/deploy.yml` GitHub Actions workflow.
*   **Manual Trigger:** A manual deployment can be triggered using `workflow_dispatch` in the `deploy.yml` workflow.
*   **Environment:** Currently, all deployments are directed to the production environment on Cloudflare Pages, associated with the project `sebastianweszler-com`. The job is configured to use the `production` GitHub Environment for secrets management.

## 2. Build Process

*   **Package Manager:** `pnpm` is used for dependency management and building.
*   **Build Command:** `pnpm build` is executed within the GitHub Actions workflow. This command generates the static site output in the `out/` directory.
*   **Caching:** The `actions/setup-node@v4` action is configured to cache `pnpm` dependencies.

## 3. Secrets Management

*   **Cloudflare Credentials:** Deployment relies on two secrets stored in the **GitHub "production" Environment**:
    *   `CLOUDFLARE_API_TOKEN`: Required for authentication. Must have `Cloudflare Pages:Edit` and `Zone:Edit` permissions.
    *   `CLOUDFLARE_ACCOUNT_ID`: The Cloudflare account identifier.
*   **Current Status:** Secrets are confirmed present in the `production` environment. However, auth errors suggest either incorrect token permissions or mismatch in environment name mapping.

## 4. Automation & Robustness Fixes

To resolve the persistent deployment blockers, the following improvements are being implemented:
1.  **Resilient DNS Management:** The DNS update steps in the workflow will be made non-fatal. If the API token lacks Zone-level permissions, the deployment will still proceed to the `.pages.dev` subdomain.
2.  **Simplify Custom Domain Management (Pending `deploy.yml` Update):** The brittle manual `curl` calls for DNS record management in `deploy.yml` will be removed. The custom domain will instead be configured directly in the Cloudflare Pages project settings ("Custom domains" section) to ensure reliability and decouple domain configuration from CI/CD logic.
3.  **Environment Sync:** Verified that the `production` environment in GitHub exactly matches the `environment: production` key in the workflow (`deploy.yml`).
4.  **QA Integration:** As per `plans/qa-plan.md`, the E2E test suite (`node tests/e2e.mjs`) will be integrated into the deployment workflow. This is currently in place, but the `BASE_URL` in `deploy.yml` needs to be updated to test the custom domain (`sebastianweszler.com`) once it's consistently deployed.
5.  **Static Asset Compatibility (Addresses SEB-88):** Removed manual `_redirects` management to allow Cloudflare Pages' native asset compatibility to handle Next.js static exports and localized routes, which directly addresses the 404 issue for locale-prefixed pages (SEB-88).

## 5. Rollout Checklist

1.  [ ] Verify `CLOUDFLARE_API_TOKEN` permissions in Cloudflare dashboard (Critical for custom domain management).
2. [x] Refactor `deploy.yml` for robustness. (Refactored to simplify custom domain management and await `GH_PAT` and Cloudflare secrets)
3. [x] **Implement `deploy.yml` updates**: Remove manual `curl` calls for custom domain management. (Done)
4.  [ ] Successfully trigger `workflow_dispatch` on `main`. (Blocked by `GH_PAT` - SEB-130).
5.  [ ] Configure `sebastianweszler.com` as a custom domain in Cloudflare Pages project settings (Manual Step - See Section 6).
6.  [ ] Update `BASE_URL` in `deploy.yml` for E2E tests to `https://sebastianweszler.com`.
7.  [ ] Verify live site at `sebastianweszler.com`. (Blocked by `GH_PAT` and Cloudflare secrets).
8.  [ ] Explicitly test locale-prefixed routes (e.g., `sebastianweszler.com/en/about`, `sebastianweszler.com/pl/about`). (Blocked by `GH_PAT` and Cloudflare secrets).
9.  [ ] Ensure Plausible analytics and Resend email integration are active.

## 6. Custom Domain Configuration (Manual Steps in Cloudflare Pages)

To ensure the custom domain `sebastianweszler.com` is properly configured, the following manual steps must be performed in the Cloudflare Pages dashboard:

1.  Navigate to your Cloudflare Pages project (`sebastianweszler-com`).
2.  Go to the "Custom domains" tab.
3.  Click "Set up a custom domain."
4.  Enter `sebastianweszler.com` and follow the prompts to verify ownership and set up DNS records if not already present. This process will typically involve adding CNAME records pointing to your Cloudflare Pages project.

## 7. Future Considerations and Improvements

*   **Staging Environment:** Implement a dedicated staging environment on Cloudflare Pages for Pull Requests.
*   **Rollback Strategy:** Use Cloudflare Pages version history for quick rollbacks.
*   **Monitoring:** Set up uptime monitoring and performance alerts.
