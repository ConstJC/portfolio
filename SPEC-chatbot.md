# SPEC: Portfolio Chat Widget

Status: Draft — pending confirmation
Location: `my-website` (Next.js 16 / React 19 portfolio site). Not part of the `agent-skills` repo nested inside this project — that is a separate upstream OSS repo for AI-agent skill docs and holds no app code.

## Capability Map (approved)

| Module | Scope | Depends on |
|---|---|---|
| **A. Widget Shell** | Floating trigger + open/close chat panel, theme-aware, messenger-style layout | none |
| **B. Starter Questions** | Static curated sample questions shown on first open | A |
| **C. Content Context Builder** | Server-side function that assembles grounding context from `store/*.json` | none |
| **D. LLM Answer Generation** | API route: takes conversation + C's context, calls the LLM, returns an answer | A + C |

Build order: **A** and **C** in parallel → **B** → **D**.

**RAG note:** total FAQ/about/services/projects/experience/skills/testimonials content in `store/*.json` is ~18KB. That's small enough to pass in full as system-prompt context on every request — no embeddings or vector search needed. Module C is a context-assembly function, not a retrieval/similarity search step. Revisit only if site content grows to the point a single prompt can't hold it (hundreds of KB+).

**Provider decision (2026-08-18):** to keep this at $0 cost, Module D uses the **Google Gemini API free tier** (Gemini Developer API) instead of a paid provider. Confirmed live (not from training data, since free-tier terms churn fast): as of mid-2026 the free tier covers Flash/Flash-Lite-class models only (Pro models moved behind billing in April 2026), with daily/per-minute quotas shared across *all* site visitors combined (not per-visitor).

**Model confirmed at Checkpoint 2 (2026-08-18):** `GEMINI_MODEL` defaults to **`gemini-3.5-flash-lite`** — verified live against `ai.google.dev`'s own pricing and models pages (not aggregator blogs), which name it the current GA, free-tier-eligible, most cost-efficient Flash-Lite model. `gemini-2.5-flash-lite` was considered but rejected: sources disagreed on whether it's still available to new API keys and its exact deprecation date, so `gemini-3.5-flash-lite` avoids that ambiguity entirely. Two consequences that ripple into Module D's design:
1. **Global daily budget, not just per-IP limiting.** Because Google's free-tier request quota is shared across the whole site (not per visitor), Module D1's rate limiter needs a global daily counter in addition to per-IP throttling — once the day's free quota is spent, the bot should degrade gracefully (a "chat's resting for today, please use the contact form" message) rather than erroring or silently failing.
2. **Data-usage caveat.** Google's free tier may use submitted prompts/responses to improve their products (this is *in addition to* the unavoidable fact that any hosted LLM API sees the chat content to process it). This is a conscious tradeoff to accept, not silently inherit — see Boundaries.

## 1. Objective

Give portfolio visitors a fast, self-serve way to get answers about Jay — services, projects, experience, pricing/timeline FAQs — without digging through pages, via a floating chat bubble that opens a messenger-style panel. Answers must be grounded in the site's actual content (`store/*.json`); anything outside that scope should be redirected to the contact form rather than guessed at.

Out of scope for v1: lead capture/CRM routing, n8n orchestration, streaming responses, persistent chat history across sessions. These can be layered on later without changing the module boundaries above.

## 2. Commands

No new scripts needed — existing commands cover this feature:

- `npm run dev` — run locally; requires `GEMINI_API_KEY` set in `.env.local` to exercise Module D
- `npm run build` / `npm run start` — production build/serve
- `npm run lint` — existing ESLint config (`eslint-config-next` core-web-vitals + typescript)

## 3. Project Structure

```
app/
  api/
    chat/
      route.ts            # Module D — POST handler, calls Google Gemini (free tier), uses lib/chatContext
components/
  chat/
    ChatWidget.tsx         # Module A — trigger button + panel, "use client"
    ChatMessageList.tsx    # Module A — scrollable message bubbles (user right / assistant left)
    ChatInput.tsx          # Module A — text input + send button
    StarterQuestions.tsx   # Module B — curated question chips, shown until first message sent
  layout/
    FloatingActions.tsx    # MODIFIED — add chat trigger button to the existing fixed
                           # bottom-right column (bottom-7 right-6), stacked above the
                           # theme-toggle/scroll-to-top buttons already there; panel opens
                           # as an anchored overlay, same pattern as the existing theme
                           # dropdown (menuRef + click-outside + Escape handling)
hooks/
  useChatWidget.ts         # Module A — zustand store: isOpen, messages[], sendMessage()
                           # (NOT persisted — chat history is ephemeral by design, see Boundaries)
lib/
  chatContext.ts           # Module C — buildSiteContext(): reads store/{about,services,
                           # projects,faq,experience,skills,testimonials}.json server-side,
                           # formats into a single system-prompt string
  types.ts                 # add ChatMessage { role: "user" | "assistant"; content: string }
.env.example                # add GEMINI_API_KEY (server-only) and GEMINI_MODEL
                           # (default: gemini-3.5-flash-lite — confirmed at Checkpoint 2)
```

## 4. Code Style

- Match existing conventions in `components/layout/FloatingActions.tsx`: Tailwind utility classes, `bg-card`/`border-border2`/`text2`/`primary` design tokens (already theme-aware via `data-theme` — no new ad-hoc colors), `"use client"` at the top of interactive components.
- Client state via **zustand**, following the `hooks/useTheme.ts` pattern (same library, same file location convention). Skip the `persist` middleware for chat state — see Boundaries.
- Animations via **framer-motion** (already a dependency) for panel open/close, matching the transition durations already used in `FloatingActions.tsx` (`180ms` menu, `250ms` button fade).
- Server-only code (`lib/chatContext.ts`, `app/api/chat/route.ts`) must never import client-only modules and must never be imported from a client component directly — only called via the API route.
- No new npm dependency besides `@google/genai` (Google's current official Node/TypeScript SDK for the Gemini API — confirm before installing, see Boundaries).

## 5. Testing Strategy

This repo has no automated test runner configured today (no jest/vitest, no existing test files) — testing here follows the same manual-verification convention already in use across the codebase.

- **Module A (Widget Shell):** manual browser check — open/close via click and Escape, click-outside-to-close, verify styling in both `dark` and `light` theme (toggle via the existing theme menu), verify it doesn't overlap/collide with the existing scroll-to-top button.
- **Module B (Starter Questions):** manual check — starter chips appear on first open, disappear after the first message is sent, clicking a chip sends it as a user message.
- **Module C (Context Builder):** pure function — verify by temporarily logging `buildSiteContext()` output during dev and confirming it reflects current `store/*.json` content. Introducing vitest for real unit coverage is a reasonable follow-up, but confirm with the user before adding a new test framework to the repo.
- **Module D (LLM Answer Generation):** manual end-to-end via the dev server — ask a question answerable from site content (verify grounded, no fabricated specifics), ask an out-of-scope question (verify graceful redirect to contact form), verify the fallback message when `GEMINI_API_KEY` is missing/invalid or the API call fails, and verify the global daily-budget fallback message by temporarily lowering the daily counter threshold in dev.

## 6. Boundaries

**Always:**
- Keep `GEMINI_API_KEY` server-side only — never `NEXT_PUBLIC_`-prefixed, never sent to or readable by the client bundle.
- Ground every answer in the actual content returned by `buildSiteContext()`. Never let the model invent specifics not present in the source — pricing, timelines, and guarantees in `store/faq.json` are intentionally vague ("depends on scope," "1–4 weeks"); the bot may rephrase or quote them but must not fabricate exact numbers, dates, or commitments.
- For questions outside the grounded content, respond with a graceful redirect to the contact form rather than guessing.
- Respect the active theme via the existing `data-theme` attribute and design tokens — no separate color system for the widget.
- Follow the existing `FloatingActions.tsx` interaction pattern (anchored overlay + click-outside + Escape) for consistency rather than introducing a new modal/portal pattern.
- Track a **global daily request counter** (shared across all visitors) alongside per-IP rate limiting — Google's free-tier quota applies to the whole site's traffic combined, not per visitor, so per-IP limiting alone isn't enough to stay within it.

**Ask first:**
- Before adding `@google/genai` (or any new npm dependency).
- Before modifying `FloatingActions.tsx`'s existing layout/behavior, since it's shared, already-shipped UI.
- Before adding chat history persistence (localStorage/sessionStorage) — v1 default is ephemeral, in-memory only, cleared on refresh.
- Before introducing a test framework (vitest/jest) to the repo.
- Before adding rate limiting/abuse protection infrastructure choices (e.g., in-memory counter vs. a service like Upstash) — flagged as required before production use, but the specific mechanism needs a decision.

**Never:**
- Never let the chatbot claim to literally *be* Jay in a way that implies a binding first-person commitment (e.g., promising a specific price or deadline) — it represents the site, it doesn't speak for the person.
- Never log or forward visitor chat content to any third-party analytics/tracking tool without explicit user consent, beyond the unavoidable fact that Gemini itself processes the content to answer.
- Never assume free-tier chat content stays private — Google's free tier may use submitted prompts/responses to improve their products. **Decided at Checkpoint 3 (2026-08-18):** accepted as-is, no in-widget disclosure — the widget only ever handles non-sensitive public info (services, projects, FAQ content), not personal or private visitor data, so the tradeoff was judged acceptable without extra UI.
- Never ship the `/api/chat` route to production without both a per-IP request cap and the global daily-budget counter — it's an unauthenticated endpoint and a direct risk of exhausting the shared free-tier quota (or, if ever upgraded to paid, a cost-abuse risk) otherwise.
