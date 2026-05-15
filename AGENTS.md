<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deployment Strategy: Next.js to Cloudflare Pages

The website is a Next.js application configured for static site generation.

**Build Process:**
The `pnpm build` command, executed within the GitHub Actions workflow (`.github/workflows/deploy.yml`), generates the static assets for the website. These assets are placed in the `out/` directory.

**Deployment Mechanism:**
The `cloudflare/wrangler-action@v3` is used in the `deploy.yml` workflow to deploy the contents of the `out/` directory to Cloudflare Pages. This process requires `secrets.CLOUDFLARE_API_TOKEN` and `secrets.CLOUDFLARE_ACCOUNT_ID` to be configured in GitHub, targeting the project named `sebastianweszler-com`. The deployment is triggered on pushes to the `main` branch or manually via `workflow_dispatch`.

## Action Item: GitHub Personal Access Token (PAT) for Founding Engineer

To unblock the Founding Engineer's work, a GitHub Personal Access Token (PAT) is required. Please follow these steps to generate and provide the token:

**Instructions for Generating a GitHub PAT:**
1.  **Log in to GitHub:** Access your GitHub account at [github.com](https://github.com/).
2.  **Navigate to Developer Settings:**
    *   Click your profile picture in the top-right corner.
    *   Select **Settings**.
    *   In the left sidebar, scroll down and click **Developer settings**.
3.  **Generate a Fine-grained Token (Recommended):**
    *   Click **Personal access tokens** > **Fine-grained tokens**.
    *   Click **Generate new token**.
    *   **Configure the token:**
        *   **Name:** e.g., "Sebastian Weszler Website - Founding Engineer Access"
        *   **Expiration:** Set an appropriate expiration date.
        *   **Description:** Briefly describe its purpose.
        *   **Repository access:** Select "Only select repositories" and choose the repository for this project, or "All repositories" if appropriate.
        *   **Permissions:** Under the "Repository permissions" section, grant the necessary access. For typical development and deployment workflows, `Contents: Read and write` is often required. Ensure you only grant the minimum necessary permissions.
4.  **Generate and Save:**
    *   Click **Generate token** at the bottom of the page.
    *   **IMPORTANT:** **Copy the token immediately.** You will not be able to view it again. Store it securely.
5.  **Provide the Token:** Once generated, please provide the copied token to me so I can securely configure it for the Founding Engineer. Treat this token as a password and do not share it publicly or commit it to code.

Please complete these steps at your earliest convenience to unblock progress.