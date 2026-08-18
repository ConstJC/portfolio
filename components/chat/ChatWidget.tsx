"use client"

import { useEffect, useRef } from "react"
import { MessageCircle, X } from "lucide-react"
import { useChatWidget } from "@/hooks/useChatWidget"
import ChatMessageList from "@/components/chat/ChatMessageList"
import ChatInput from "@/components/chat/ChatInput"
import StarterQuestions from "@/components/chat/StarterQuestions"

const btnBase = [
  "w-10 h-10 rounded-[10px] bg-card border border-border2 text-text2",
  "flex items-center justify-center cursor-pointer backdrop-blur-[10px] shadow-[var(--shadow-md)]",
  "[transition:border-color_0.18s,color_0.18s,background_0.18s,opacity_0.25s,transform_0.25s]",
  "hover:border-primary-border hover:bg-primary-light hover:text-primary",
].join(" ")

export default function ChatWidget() {
  const { isOpen, open, toggle, close, messages, sendMessage, isPending } = useChatWidget()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // Auto-open once per browser session (not every reload): a fresh tab
    // gets the courtesy open, but reloading mid-session respects a visitor
    // who already closed it. Clears when the tab/browser closes.
    const SESSION_KEY = "chat-auto-opened"
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, "true")
    open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) close()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, close])

  const handleClose = () => {
    close()
    triggerRef.current?.focus()
  }

  return (
    <div ref={panelRef} className="relative">
      <button
        ref={triggerRef}
        onClick={toggle}
        title="Chat"
        aria-label="Open chat"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={`${btnBase} ${isOpen ? "border-primary-border bg-primary-light text-primary" : ""}`}
      >
        <MessageCircle size={16} />
      </button>

      <div
        role="dialog"
        aria-label="Chat"
        inert={!isOpen}
        className={[
          "absolute right-0 bottom-[calc(100%+12px)]",
          "w-[350px] max-w-[calc(100vw-3rem)] h-[460px] max-h-[calc(100vh-8rem)]",
          "flex flex-col rounded-[20px] bg-card border border-border2",
          "shadow-[var(--shadow-xl)] backdrop-blur-[18px] overflow-hidden",
          "transition-[opacity,transform] duration-[180ms] ease-in-out",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[10px] pointer-events-none",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-divider shrink-0">
          <span className="text-sm font-bold text-text">Chat</span>
          <button
            onClick={handleClose}
            aria-label="Close chat"
            className="w-7 h-7 rounded-md flex items-center justify-center text-text2 cursor-pointer hover:bg-card2 hover:text-text"
          >
            <X size={16} />
          </button>
        </div>
        {messages.length === 0 ? (
          <StarterQuestions onSelect={sendMessage} />
        ) : (
          <ChatMessageList messages={messages} isPending={isPending} />
        )}
        <ChatInput onSend={sendMessage} isOpen={isOpen} isPending={isPending} />
      </div>
    </div>
  )
}
