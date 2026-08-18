"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSend: (content: string) => void
  isOpen: boolean
  isPending: boolean
}

export default function ChatInput({ onSend, isOpen, isPending }: ChatInputProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the initial mount: the widget opens by default on page load, and
    // auto-focusing then would pop the on-screen keyboard on mobile before
    // the visitor has done anything. Still auto-focus on every later open.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || isPending) return
    onSend(trimmed)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-3 border-t border-divider shrink-0">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={isPending}
        placeholder="Ask a question..."
        aria-label="Message"
        className="flex-1 min-w-0 rounded-full bg-card2 border border-border2 px-3 py-2 text-sm text-text placeholder:text-text2 outline-none focus:border-primary-border disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={!value.trim() || isPending}
        aria-label="Send message"
        className="w-8 h-8 shrink-0 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Send size={14} />
      </button>
    </form>
  )
}
