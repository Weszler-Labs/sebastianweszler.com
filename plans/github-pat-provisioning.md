# GitHub PAT Provisioning Plan

This document outlines the plan for creating and managing a GitHub Personal Access Token (PAT) to unblock the Founding Engineer and enable necessary repository operations within the CI/CD pipeline.

## 1. Purpose

A GitHub PAT is required to grant the CI/CD pipeline (GitHub Actions) elevated permissions beyond the default `GITHUB_TOKEN`. This is typically needed for actions such as:
*   Pushing commits back to the repository (e.g., for version bumps, generated documentation, or tag creation).
*   Interacting with private repositories or specific repository features.

## 2. Required Scopes

For most CI/CD operations requiring write access, the `repo` scope is recommended. This scope grants full control of private repositories, including read/write access to code, commit statuses, deployments, and more.

**Note:** If the Founding Engineer requires specific, more granular permissions, they should detail these requirements.

## 3. Creation Steps

1.  Navigate to your GitHub profile settings.
2.  Go to "Developer settings" -> "Personal access tokens" -> "Tokens (classic)" or "Fine-grained tokens".
3.  Click "Generate new token".
    *   **For Classic Tokens:**
        *   Give the token a descriptive name (e.g., `sebastianweszler-com-ci-deploy`).
        *   Set an expiration date.
        *   Select the `repo` scope (Full control of private repositories).
        *   Click "Generate token".
    *   **For Fine-grained Tokens (Recommended):**
        *   Give the token a descriptive name.
        *   Select the target repository (`sebastianweszler-com` or specific repo if applicable).
        *   Under "Repository permissions", grant "Contents" (Read and Write).
        *   Under "Code and automation", grant "Actions" (Read and Write).
        *   Click "Generate token".
4.  **Crucially:** Copy the generated token immediately. You will not be able to see it again. Store it securely.

## 4. Security Considerations

*   **Never** commit PATs directly into your codebase or commit history.
*   **Always** store PATs as secrets within the GitHub repository's settings. Navigate to `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`.
*   Name the secret consistently, e.g., `GH_PAT`.
*   In your GitHub Actions workflow (`.github/workflows/*.yml`), reference the secret using the `secrets` context, e.g., `${{ secrets.GH_PAT }}`.

## 5. Action Item for Founding Engineer

Please review the above plan. If the `repo` scope (or the specific permissions outlined for fine-grained tokens) is what you need, proceed with generating the PAT and adding it as a repository secret named `GH_PAT`.

If you require different or more specific permissions, please detail them so we can adjust the PAT scope accordingly. Once the PAT is set up as a secret, you will need to update the relevant GitHub Actions workflow file(s) to use it.
