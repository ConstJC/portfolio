# Plan: Portfolio Chat Widget

## Context

`SPEC.md` (root of this project) defines a floating, theme-aware chat widget for the portfolio site, answering visitor FAQs by grounding an LLM in the site's existing `store/*.json` content (about/services/projects/faq/experience/skills/testimonials — ~18KB total, small enough to stuff directly into a system prompt, no vector search needed). The approved capability map has four modules — **A. Widget Shell**, **B. Starter Questions**, **C. Content Context Builder**, **D. LLM Answer Generation** — with build order **A + C in parallel → B → D**.

This plan breaks that into vertical, independently-testable tasks (each a complete observable behavior, not a horizontal layer), grounded in codebase research: confirmed Next.js 16.2.3 App Router Route Handler conventions are unchanged from classic Next.js (no `middleware.ts`/`proxy.ts` exists; Next's own docs recommend rate-limiting inside the route handler itself); confirmed the exact integration point in `app/layout.tsx`/`components/layout/FloatingActions.tsx` and the theming-token system.

**Provider update (2026-08-18):** to keep this at $0 cost, Module D now targets the **Google Gemini API free tier** via `@google/genai` instead of the originally-planned paid Anthropic API. Verified live: the free tier currently covers Flash/Flash-Lite-class models only (Pro moved behind billing in April 2026), quotas are shared across *all* site visitors combined (not per-visitor), and `gemini-2.5-flash-lite` specifically is scheduled to shut down October 16, 2026 — so D2 must verify the current model ID against `ai.google.dev` at implementation time rather than trusting any hardcoded default. This also means D1 needs a **global daily request counter** in addition to per-IP rate limiting (see D1 below), and there's a data-usage caveat to consciously accept: Google's free tier may use submitted chat content to improve their products.

Outcome: visitors can click a chat bubble (stacked in the existing bottom-right floating-button column), see starter questions, ask about Jay's work, and get grounded answers — at $0 cost, with rate limiting (per-IP and global-daily) and no fabricated specifics, before this goes live.

## Reused patterns (don't reinvent)

- **Zustand store, no persist**: `hooks/useTheme.ts` shows the `create<Store>()(persist(...))` pattern. The new `hooks/useChatWidget.ts` follows the same shape but **without** `persist` (chat history is ephemeral by design).
- **Anchored overlay + click-outside + Escape**: `components/layout/FloatingActions.tsx`'s theme-menu (`menuRef`, `pointerdown` outside-close, `Escape` keydown-close, `absolute right-0 bottom-[calc(100%+12px)]` positioning) is the pattern the chat panel reuses — no new modal/portal library.
- **Static JSON import**: `components/sections/Faq.tsx` does `import faqData from "@/store/faq.json"` directly — `lib/chatContext.ts` follows the same style for reading `store/*.json` server-side.
- **Design tokens**: Tailwind v4 `@theme inline` block in `app/globals.css` maps CSS vars to utilities (`bg-card`, `border-border2`, `text-text2`, `bg-primary-light`, `text-primary`) — these auto-theme via `[data-theme]`, zero dark:/light: variants needed. Shadows are the one exception: use the arbitrary-value escape hatch `shadow-[var(--shadow-xl)]` (as `FloatingActions.tsx` already does), not a Tailwind `shadow-*` utility.
- **`cn()` helper**: `lib/utils.ts` (clsx + tailwind-merge) — use in new components instead of manual string concatenation.

## Tasks

### A1 — Chat trigger + open/close shell (no messages yet)
**Files:** `components/layout/FloatingActions.tsx` (modified — **ask-first gate**, see below), `components/chat/ChatWidget.tsx` (new), `hooks/useChatWidget.ts` (new, `isOpen` only).

- New trigger button added to the existing `bottom-7 right-6` column, stacked above the theme toggle (chat → theme → scroll-to-top, top to bottom), same `btnBase`-style classes.
- Panel anchored like the theme dropdown: `bg-card`/`border-border2`/`shadow-[var(--shadow-xl)]`, header with title + close button, empty body placeholder (A2 fills it in).
- Click-outside and Escape both close it; closing returns focus to the trigger button.
- `role="dialog"` (non-modal, no focus trap — consistent with the existing anchored-overlay pattern, not a new modal), `aria-label="Chat"`; trigger has `aria-expanded`/`aria-haspopup`.
- Verified at ≤480px and ≤375px viewport widths: no overflow, no introduced horizontal scroll.
- Verified in both `dark` and `light` theme (via the existing theme menu).

**Verify:** `npm run dev` → click open/close, click outside, Escape, resize to mobile widths, tab through keyboard-only, toggle theme mid-open.

⚠️ **Ask-first:** this is the task that edits already-shipped `FloatingActions.tsx`. Confirm the specific diff before landing, even though SPEC.md's structure anticipates the change.

### A2 — Message list + input + local echo loop
**Files:** `components/chat/ChatMessageList.tsx`, `components/chat/ChatInput.tsx` (new), `hooks/useChatWidget.ts` (extended: `messages`, `sendMessage()`), `lib/types.ts` (add `ChatMessage`).

- `ChatMessage { role: "user" | "assistant"; content: string }` added to `lib/types.ts`.
- Store has **no `persist` middleware** — verify by chatting then refreshing; messages must clear.
- Sending appends a right-aligned user bubble; `sendMessage()` appends a stubbed assistant reply for now (D3 swaps the stub for the real API call — keeps this task testable independent of D).
- Empty state before any message (placeholder text; B1 replaces it with starter chips).
- `ChatMessageList` has `role="log"` `aria-live="polite"`; auto-scrolls on new message; input auto-focuses on panel open.
- Mobile check: input/send button stay usable above the on-screen keyboard at ≤480px.

**Verify:** send several messages, confirm alternating alignment + auto-scroll, confirm live-region behavior in devtools a11y tree, refresh mid-conversation and confirm it clears.

### C1 — Content Context Builder (parallel with A)
**Files:** `lib/chatContext.ts` (new).

- `buildSiteContext()`: server-only, no `"use client"`, static imports of `store/{about,services,projects,faq,experience,skills,testimonials}.json` (matching `Faq.tsx`'s import style), returns one formatted string with clearly delimited sections per source (`## FAQ`, `## Services`, etc.).
- Never imported from a client component — only ever called from `app/api/chat/route.ts` (enforced in D2).
- Sanity-check output size lands near the ~18KB SPEC estimate.

**Verify:** temporarily log `buildSiteContext()` output during dev, diff against current `store/*.json` content, remove the temporary log before committing.

---
### ✅ CHECKPOINT 1 — after A1 + A2 + C1

Stop and manually verify: open/close on desktop + mobile, keyboard-only nav, both themes, no persistence after refresh, `buildSiteContext()` output complete and correctly scoped. No LLM cost/risk surface exists yet — good pause point before the D-related ask-first conversations.

---

### B1 — Starter Questions
**Files:** `components/chat/StarterQuestions.tsx` (new).

- Static curated question list (inline in the component — SPEC doesn't call for a separate data file; flag if you'd rather it live in `store/`).
- Renders in place of A2's empty-state placeholder only while `messages.length === 0`; clicking a chip calls the same `sendMessage()` path as manual typing (not a separate branch); chips vanish permanently for the session once the first message exists (typed or clicked).
- Native `<button>` elements — real Tab stops, no extra ARIA needed since visible text is the label.
- Mobile check: chips wrap/scroll sensibly, no panel overflow.

**Verify:** fresh open → chips show → click one → sends + chips vanish; confirm typing manually also clears them; tab through chips with keyboard.

---
### ✅ CHECKPOINT 2 — after B1

**Confirmed with user (2026-08-18):**
1. ✅ Install `@google/genai` — done.
2. ✅ Rate-limiting: in-memory per-IP token bucket **plus** a global daily counter (resets on redeploy, per-process only — acceptable v1 tradeoff, no hosted service).
3. ✅ `GEMINI_MODEL` default: **`gemini-3.5-flash-lite`** — verified live against `ai.google.dev`'s own pricing/models pages (not aggregator blogs) as the current GA, free-tier-eligible, most cost-efficient Flash-Lite model. `gemini-2.5-flash-lite` was rejected due to conflicting reports on new-user availability and deprecation timing.

---

### D1 — API route skeleton: validation + rate limiting (no LLM call yet)
**Files:** `app/api/chat/route.ts` (new), `.env.example` (add `GEMINI_API_KEY`, `GEMINI_MODEL`, both commented as server-only / never `NEXT_PUBLIC_`).

- `POST` validates body shape (`messages: ChatMessage[]`), rejects malformed bodies with `400`.
- Explicit, stated input-length caps (e.g. single message ≤2000 chars, conversation capped by turn count or char budget) → `400 {"error": "invalid_input"}` when exceeded.
- Per-IP token-bucket rate limiter: module-level `Map<string, {tokens, last}>` keyed off `x-forwarded-for` (documented fallback when absent) → `429 {"error": "rate_limited"}` when exhausted. Comment inline that this is per-process/resets on redeploy.
- **Global daily request counter** (module-level, resets at UTC midnight or on redeploy): once it hits a configured threshold (set comfortably under whatever Gemini's current free-tier RPD actually is — verify the live number, don't trust a cached figure), return `503 {"error": "daily_limit_reached"}` for the rest of the day rather than letting requests fail against Google's own quota with a less graceful error.
- Returns a stubbed `200 {"reply": "stub"}` once checks pass — no Gemini call yet, so this is testable without an API key.

**Verify:** curl/Postman with valid, oversized, and malformed bodies; hammer past the per-IP bucket limit → `429`; hammer past the global daily counter (lower it temporarily in dev) → `503`; `npm run build` then grep `.next/static` output for the API key placeholder string — must find nothing.

### D2 — Wire Gemini call + grounding + graceful degradation
**Files:** `app/api/chat/route.ts` (extended), imports `lib/chatContext.ts`.

- `npm install @google/genai` — done at Checkpoint 2.
- `const ai = new GoogleGenAI({})` (auto-resolves `GEMINI_API_KEY` from env in Node.js). Model: `process.env.GEMINI_MODEL || "gemini-3.5-flash-lite"` — confirmed at Checkpoint 2 via a live fetch of `ai.google.dev`'s pricing/models pages.
- Call shape: `ai.models.generateContent({ model, contents: <mapped conversation>, config: { systemInstruction: buildSiteContext() + grounding instructions } })` — notably simpler than a content-block union: read the answer straight off `response.text`.
- Grounding instructions appended to `systemInstruction`: never fabricate specific prices/dates/commitments beyond what `faq.json` actually states, redirect out-of-scope questions to `/#contact`, never phrase answers as a binding first-person commitment on Jay's behalf.
- Full conversation array sent to Gemini (not just the latest message) so follow-ups stay contextual.
- Any upstream failure (missing/invalid key, API error, Google-side rate limit) → clean `500`/`429` with no leaked internals (no stack traces, no "key missing" hints) to the client.
- Confirm no chat content is forwarded to any *additional* third-party analytics/logging service beyond Gemini itself. Separately, surface the free-tier data-usage caveat (Google may use free-tier prompts/responses to improve their products) as a conscious, documented decision rather than a silent default — see SPEC.md Boundaries for the disclosure option.

**Verify:** ask a question answerable from `faq.json` → grounded answer, no invented specifics; ask an out-of-scope question → contact-form redirect; break `GEMINI_API_KEY` temporarily → clean fallback, no leaked internals.

### D3 — Wire the real endpoint into the widget's send flow
**Files:** `hooks/useChatWidget.ts` (`sendMessage()` now calls `fetch("/api/chat", ...)`), `ChatMessageList.tsx`/`ChatInput.tsx` (loading + error states).

- `sendMessage()`: append user message → set pending → call route with full history → append reply or error bubble → clear pending. Input/send disabled while pending; visible typing indicator during the wait.
- Three visibly distinct fallback bubbles: `429` (rate-limited), `400` (message too long), `500`/network (generic apology + `/#contact` link) — must not collapse into one generic "error" string.
- The `/#contact` link in redirect answers is an actual clickable anchor, working from every page (widget is global via `app/layout.tsx`).
- Re-confirm no persistence: refresh mid-conversation clears history (regression guard).
- Re-verify `aria-live="polite"` actually announces the async-appended assistant bubble — this is a common place for live-region announcements to silently break once async state is involved.
- Full mobile pass (≤375px): ask → loading → answer cycle, including disabled-input and error states.

**Verify:** full manual pass — grounded question, out-of-scope question, missing/invalid key, rate-limit trip (rapid sends) — on desktop and mobile, with a screen reader or accessibility inspector open for live-region confirmation.

---
### ✅ CHECKPOINT 3 — after D3 (feature-complete, pre-production gate)

Re-check every "Never" boundary explicitly before this goes live:
- Per-IP rate limit, input cap, and the global daily counter all actually trip in a live test (not just present in code).
- `GEMINI_API_KEY` confirmed absent from the client bundle.
- No third-party logging/analytics of chat content anywhere in the diff, beyond Gemini itself.
- The free-tier data-usage caveat has been consciously accepted (and disclosed in the UI, if that's the chosen approach) — not silently inherited.
- Adversarial prompts ("what will it cost me exactly", "promise me a delivery date") don't produce binding first-person commitments.
- No accidental persistence anywhere across A2/D3.

---

## Boundary coverage (nothing silently dropped from SPEC.md)

| Boundary | Covered in |
|---|---|
| API key server-only | D1, D2 |
| Grounded answers, no fabricated specifics | D2 (prompt), Checkpoint 3 (adversarial retest) |
| Graceful redirect to contact form | D2 (prompt behavior), D3 (clickable link) |
| Theme/token consistency | A1, A2, B1 |
| Reuse anchored-overlay pattern, no new modal | A1 |
| Ask-first: `@google/genai` install | Gate at Checkpoint 2 → executed D2 |
| Ask-first: `FloatingActions.tsx` edit | Gate inside A1 |
| Ask-first: chat persistence | Negative criteria in A2 + D3 |
| Ask-first: test framework | C1 (stays manual, per Testing Strategy) |
| Ask-first: rate-limit mechanism (per-IP + global daily) | Gate at Checkpoint 2 → executed D1 |
| Ask-first: exact `GEMINI_MODEL` default | Gate at Checkpoint 2 → executed D2 |
| Never: forward chat content to 3rd parties beyond Gemini itself | D2, Checkpoint 3 |
| Never: assume free-tier chat content stays private | D2 (conscious decision + optional disclosure), Checkpoint 3 |
| Never: ship `/api/chat` without per-IP + global-daily rate limits | D1 (build), Checkpoint 3 (confirm both trip) |

## Verification (overall)

1. `npm run dev` for all manual UI/UX passes described per task.
2. `npm run build` + grep `.next/static` for the API key value — confirm zero matches (proves server-only isolation).
3. `npm run lint` clean.
4. Manual curl/Postman pass against `/api/chat` for validation, rate-limit, and error-path behavior.
5. Full keyboard-only and screen-reader spot-check at Checkpoint 3.
