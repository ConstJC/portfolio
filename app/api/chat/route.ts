import { NextResponse } from "next/server"
import { GoogleGenAI, ApiError, type Content } from "@google/genai"
import type { ChatMessage } from "@/lib/types"
import { buildSiteContext } from "@/lib/chatContext"

const MAX_MESSAGE_LENGTH = 2000
const MAX_MESSAGES = 20

// Per-IP token bucket — cheap abuse guard for a single visitor. Per-process
// only: resets on redeploy/cold start, and doesn't share state across
// multiple serverless instances. Acceptable for a low-traffic site; a
// multi-instance deployment would need a shared store (e.g. Redis) instead.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_PER_WINDOW = 6
const ipBuckets = new Map<string, { count: number; windowStart: number }>()

// Global daily counter — Gemini's free-tier quota is shared across ALL
// visitors combined, not per-visitor, so per-IP limiting alone isn't enough.
// The API doesn't publish a fixed RPD figure; check your actual limit at
// https://aistudio.google.com/rate-limit and tune DAILY_REQUEST_LIMIT below it.
const DAILY_REQUEST_LIMIT = Number(process.env.DAILY_REQUEST_LIMIT) || 200
let dailyCount = 0
let dailyResetAt = nextUtcMidnight()

function nextUtcMidnight(): number {
  const now = new Date()
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
}

function getClientIp(request: Request): string {
  // Missing/unproxied requests all share one bucket — a documented
  // degradation, not a bypass: it still throttles, just coarsely.
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = ipBuckets.get(ip)

  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipBuckets.set(ip, { count: 1, windowStart: now })
    return true
  }

  if (bucket.count >= RATE_LIMIT_MAX_PER_WINDOW) return false

  bucket.count += 1
  return true
}

function checkDailyLimit(): boolean {
  if (Date.now() >= dailyResetAt) {
    dailyCount = 0
    dailyResetAt = nextUtcMidnight()
  }

  if (dailyCount >= DAILY_REQUEST_LIMIT) return false

  dailyCount += 1
  return true
}

function isValidMessages(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return false

  return value.every(
    (item): item is ChatMessage =>
      typeof item === "object" &&
      item !== null &&
      (item as ChatMessage).role !== undefined &&
      ((item as ChatMessage).role === "user" || (item as ChatMessage).role === "assistant") &&
      typeof (item as ChatMessage).content === "string" &&
      (item as ChatMessage).content.length > 0 &&
      (item as ChatMessage).content.length <= MAX_MESSAGE_LENGTH
  )
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite"
const MAX_OUTPUT_TOKENS = 1024

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const SYSTEM_INSTRUCTIONS = `You are a helpful assistant for Jay Clark Anore's portfolio website, answering visitor questions using ONLY the site content below.

Rules:
1. Ground every answer in the SITE CONTENT section. Do not invent specific prices, dates, deadlines, or guarantees that aren't stated there.
2. If a question can't be answered from the site content, say so and point the visitor to the contact section instead of guessing, formatted exactly as the markdown link [contact form](/#contact).
3. You may relay the site's own words in first person where the source does (it's Jay's own voice) — but never state a new commitment, promise, or guarantee ("I guarantee...", "I will deliver by...") beyond what's explicitly written below. You represent the site; you don't make new commitments on Jay's behalf.
4. Keep answers concise and conversational.

SITE CONTENT:
${buildSiteContext()}`

function toGeminiContents(messages: ChatMessage[]): Content[] {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }))
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (!checkIpRateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 })
  }

  const messages = (body as { messages?: unknown } | null)?.messages
  if (!isValidMessages(messages)) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 })
  }

  if (!checkDailyLimit()) {
    return NextResponse.json({ error: "daily_limit_reached" }, { status: 503 })
  }

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: toGeminiContents(messages),
      config: {
        systemInstruction: SYSTEM_INSTRUCTIONS,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    })

    const reply = response.text
    if (!reply) {
      console.error("[api/chat] empty response from Gemini")
      return NextResponse.json({ error: "upstream_failure" }, { status: 500 })
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("[api/chat] Gemini request failed:", error)

    if (error instanceof ApiError && error.status === 429) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 })
    }

    return NextResponse.json({ error: "upstream_failure" }, { status: 500 })
  }
}
