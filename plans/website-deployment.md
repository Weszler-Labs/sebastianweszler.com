# Website Deployment Plan

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
2.  **Environment Sync:** Verify that the `production` environment in GitHub exactly matches the `environment: production` key in the workflow.
3.  **QA Integration:** As per `plans/qa-plan.md`, the E2E test suite (`node tests/e2e.mjs`) will be integrated into the deployment workflow to verify the live site post-deployment.

## 5. Rollout Checklist

1.  [ ] Verify `CLOUDFLARE_API_TOKEN` permissions in Cloudflare dashboard.
2.  [ ] Refactor `deploy.yml` for robustness.
3.  [ ] Successfully trigger `workflow_dispatch` on `main`.
4.  [ ] Verify live site at `sebastianweszler.com`.
5.  [ ] Ensure Plausible analytics and Resend email integration are active.

## 6. Future Considerations and Improvements

*   **Staging Environment:** Implement a dedicated staging environment on Cloudflare Pages for Pull Requests.
*   **Rollback Strategy:** Use Cloudflare Pages version history for quick rollbacks.
*   **Monitoring:** Set up uptime monitoring and performance alerts.
