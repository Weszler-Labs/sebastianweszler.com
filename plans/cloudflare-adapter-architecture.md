# Cloudflare Workers AI Adapter Architecture Plan (SEB-76)

## Objective
Implement a Paperclip adapter to interact with Cloudflare's Workers AI service for LLM tasks.

## Design
The adapter will act as a bridge between the Paperclip agent runtime and Cloudflare's REST API.

### 1. Key Components
- **Client:** Wrapper around `fetch` to interact with the Cloudflare AI API endpoint.
- **Config:** Store `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
- **Capability Mapping:**
    - `generate(prompt)` -> Maps to `@cf/meta/llama-3-8b-instruct` (simple prompt)
    - `chat(messages)` -> Maps to `@cf/meta/llama-3-8b-instruct` (chat messages)

### 2. API Interaction
- **Endpoint:** `https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/$MODEL`
- **Headers:** 
    - `Authorization: Bearer $API_TOKEN`
    - `Content-Type: application/json`

### 3. Implementation Steps
1. [ ] Create `lib/adapters/cloudflare-ai.ts`.
2. [ ] Define the interface for model interaction (`AIAdapter`).
3. [ ] Implement the `fetch` logic for request handling and error processing.
4. [ ] Expose standard interfaces for `generate` and `chat`.
5. [ ] Integrate and test with a sample prompt as described in the issue.

## Security
- Secrets (`API_TOKEN`, `ACCOUNT_ID`) must NOT be hardcoded. They will be retrieved from the environment variables managed by the Paperclip runtime.
