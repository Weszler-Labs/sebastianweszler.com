# Website Deployment Plan

This document outlines the strategy for deploying and managing the sebastianweszler.com website. It builds upon the existing GitHub Actions workflow for Cloudflare Pages deployment.

## 1. Deployment Trigger and Environment

*   **Primary Deployment:** The website is deployed to Cloudflare Pages automatically on pushes to the `main` branch via the `.github/workflows/deploy.yml` GitHub Actions workflow.
*   **Manual Trigger:** A manual deployment can be triggered using `workflow_dispatch` in the `deploy.yml` workflow.
*   **Environment:** Currently, all deployments are directed to the production environment on Cloudflare Pages, associated with the project `sebastianweszler-com`.

## 2. Build Process

*   **Package Manager:** `pnpm` is used for dependency management and building.
*   **Build Command:** `pnpm build` is executed within the GitHub Actions workflow. This command is expected to generate the static site output in the `out/` directory, which is then deployed.
*   **Caching:** The `actions/setup-node@v4` action is configured to cache `pnpm` dependencies, which speeds up the installation step in subsequent runs.

## 3. Secrets Management

*   **Cloudflare Credentials:** Deployment relies on two secrets stored in GitHub repository settings:
    *   `CLOUDFLARE_API_TOKEN`: For authenticating with Cloudflare.
    *   `CLOUDFLARE_ACCOUNT_ID`: The Cloudflare account identifier.
*   **Security:** These secrets are securely accessed by the GitHub Actions workflow using the `secrets` context and are not exposed in the codebase or logs.

## 4. Testing and Verification

*   **Pre-deployment:** The `pnpm build` command includes any necessary build-time checks or linting. (This section can be expanded as more robust pre-deployment testing is implemented.)
*   **Post-deployment:**
    *   **Automated:** The `cloudflare/wrangler-action@v3` command `pages deploy out --project-name=sebastianweszler-com` will return a status indicating success or failure.
    *   **QA Verification:** The QA Engineer executes Puppeteer-based E2E tests against the deployment URL (e.g., `sebastianweszler-com.pages.dev`) to verify core functionality and i18n.
    *   **Manual:** Upon successful automated and QA verification, the website should be accessible at `sebastianweszler.com`. A manual check should be performed to ensure the site loads correctly and key content is displayed.

## 5. Future Considerations and Improvements

*   **Staging Environment:** Implement a dedicated staging environment on Cloudflare Pages. This will involve creating a new Pages project (e.g., `sebastianweszler-com-staging`) and modifying the GitHub Actions workflow (`.github/workflows/deploy.yml`) to deploy to this staging environment on pull requests targeting `main` or on pushes to a `staging` branch. Use environment variables or separate workflow configurations to manage deployment targets (staging vs. production) and associated secrets.
*   **Rollback Strategy:** Define a clear rollback strategy in case of deployment failures or issues discovered post-deployment. Cloudflare Pages offers version history, which can be leveraged for rollbacks.
*   **Automated E2E Testing:** Fully integrate the Puppeteer/Playwright test suite into the CI/CD pipeline. Add a new job to the `.github/workflows/deploy.yml` workflow that executes these tests against the staging/preview environment before any production rollout.
*   **Monitoring:** Set up monitoring for the live website to detect any performance issues or downtime.
*   **GitHub PAT Integration:** If future development requires CI/CD actions that modify the repository (e.g., version bumping, commit generation), integrate the securely provisioned GitHub PAT into the workflows. (Refer to `plans/github-pat-provisioning.md` for PAT guidelines).
