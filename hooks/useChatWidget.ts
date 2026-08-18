"use client"

import { create } from "zustand"
import type { ChatMessage } from "@/lib/types"

interface ChatWidgetStore {
  isOpen: boolean
  messages: ChatMessage[]
  // Mirrors `messages` for real exchanges only — never a rejected oversized
  // message or a client-side fallback bubble. This is what actually gets
  // sent as conversation history: an oversized message would otherwise
  // permanently fail every future request's validation (the server checks
  // every message in the array, not just the newest), and fallback text
  // was never something Gemini actually said, so it shouldn't be replayed
  // back as if it were prior model output.
  apiHistory: ChatMessage[]
  isPending: boolean
  open: () => void
  close: () => void
  toggle: () => void
  sendMessage: (content: string) => Promise<void>
}

// Must mirror app/api/chat/route.ts's own limits — kept in sync manually,
// not shared, since they run in different bundles.
const MAX_MESSAGE_LENGTH = 2000
const MAX_MESSAGES = 20

const FALLBACK_MESSAGES: Record<string, string> = {
  rate_limited: "You're sending messages a little too fast — give it a moment and try again.",
  invalid_input: "That message is a bit long — try shortening it and sending again.",
  daily_limit_reached:
    "Chat's resting for today's free limit — reach out directly via the [contact form](/#contact).",
}

const GENERIC_FALLBACK = "Something went wrong on my end. Please try the [contact form](/#contact) instead."

export const useChatWidget = create<ChatWidgetStore>()((set, get) => ({
  // Starts closed — ChatWidget's mount effect opens it once per browser
  // session (sessionStorage-gated), so reloading mid-session doesn't
  // reopen it every time. Kept false here (not true) to avoid an SSR/
  // hydration mismatch, since sessionStorage isn't available server-side.
  isOpen: false,
  messages: [],
  apiHistory: [],
  isPending: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  sendMessage: async (content) => {
    const trimmed = content.trim()
    if (!trimmed || get().isPending) return

    const userMessage: ChatMessage = { role: "user", content: trimmed }

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      set((state) => ({
        messages: [...state.messages, userMessage, { role: "assistant", content: FALLBACK_MESSAGES.invalid_input }],
      }))
      return
    }

    const nextApiHistory = [...get().apiHistory, userMessage].slice(-MAX_MESSAGES)
    set((state) => ({
      messages: [...state.messages, userMessage],
      apiHistory: nextApiHistory,
      isPending: true,
    }))

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextApiHistory }),
      })
      const data = await response.json().catch(() => null)

      if (response.ok && data?.reply) {
        const assistantMessage: ChatMessage = { role: "assistant", content: data.reply }
        set((state) => ({
          messages: [...state.messages, assistantMessage],
          apiHistory: [...state.apiHistory, assistantMessage],
        }))
      } else {
        const fallback = FALLBACK_MESSAGES[data?.error] ?? GENERIC_FALLBACK
        set((state) => ({ messages: [...state.messages, { role: "assistant", content: fallback }] }))
      }
    } catch {
      set((state) => ({ messages: [...state.messages, { role: "assistant", content: GENERIC_FALLBACK }] }))
    } finally {
      set({ isPending: false })
    }
  },
}))
