# Founding Engineer Tasks

- [x] Investigate conflict between manual `<head>` in `src/app/layout.tsx` and Next.js metadata icons (causing TC-23 failure).
- [x] Refactor `src/app/layout.tsx` to remove manual `<head>` and utilize Next.js `metadata` for viewport and scripts where possible, or ensure `<head>` and metadata coexist correctly.
- [x] Configure GitHub PAT (GH_PAT) in repository secrets (SEB-131: Resolved - Updated deploy.yml).
- [x] Ensure all required environment variables are set in the GitHub repository secrets for the CI/CD pipeline.
- [x] Report findings and propose a fix for the CI/CD deployment failure.
- [x] Fix CI/CD race condition: add a wait period or deployment health check in `.github/workflows/deploy.yml` before running E2E tests to ensure deployment propagation.
- [x] Configure local git credential helpers on the Founding Engineer's machine to resolve push conflicts.
- [x] Fix SEB-88: Create `public/_redirects` to map `/en/*` and `/pl/*` to the correct static folders for custom domain routing.
