# Plan - Build Cloudflare LLM Paperclip Adapter

## Objective
Create a custom Paperclip adapter that allows agents to utilize Cloudflare Workers AI for LLM capabilities.

## Architecture Proposal

### 1. Adapter Interface (`CloudflareAIAdapter`)
The adapter will act as a bridge between Paperclip's task execution environment and Cloudflare's AI Gateway/Workers AI.

- **Methods:**
    - `generateCompletion(prompt: string, options: AdapterOptions): Promise<string>`
    - `generateChat(messages: ChatMessage[], options: AdapterOptions): Promise<ChatMessage>`
- **Configuration:** 
    - `apiToken`: Required for Cloudflare AI Gateway/Workers AI.
    - `accountId`: Required.
    - `model`: Defaults to `@cf/meta/llama-3-8b-instruct`.

### 2. Integration Strategy
- **Worker Proxy:** Since we can't implement a direct adapter in this project (as it requires platform-level changes to Paperclip), we will implement an *agent-level utility* that acts as a client to a lightweight Cloudflare Worker. This Worker will act as a secure proxy to the Cloudflare AI API, handling token management and request transformation.
- **Agent Usage:** Agents will be configured to use this utility as a tool (e.g., `cloudflareAI.runCompletion`) to leverage the model.

### 3. Implementation Plan
1. **Develop Worker:** Create a simple Cloudflare Worker that exposes an `/ai` endpoint. It will accept JSON payloads, pass them to the AI model, and return the response.
2. **Develop Agent Tool:** Create a TS library in `src/lib/cloudflare-ai.ts` that provides a standard interface for agents to call the Worker endpoint.
3. **Configuration:** Secure the Worker endpoint (e.g., using a simple secret header or Cloudflare Access).
4. **Agent Integration:** Update agent `AGENTS.md` and instructions to enable the `cloudflareAI` tool.

## Verification
1. Deploy the Worker to Cloudflare.
2. Verify Worker endpoint is reachable and returns AI responses.
3. Create a test agent using this tool and verify heartbeat/tool calling.
