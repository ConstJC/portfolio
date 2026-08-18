"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Link from "next/link"
import type { ChatMessage } from "@/lib/types"

interface ChatMessageListProps {
  messages: ChatMessage[]
  isPending: boolean
}

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g
// Gemini doesn't always wrap the contact link in markdown syntax — sometimes
// it's just the bare path in a sentence. Linkify that case too so the link
// is clickable regardless of how the model happens to phrase it.
const BARE_CONTACT_LINK = /\/#contact\b/g
const BOLD = /\*\*([^*]+)\*\*/g
const BULLET_LINE = /^[-*]\s+(.*)/
const NUMBERED_LINE = /^(\d+)\.\s+(.*)/

function linkifyBareContact(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  BARE_CONTACT_LINK.lastIndex = 0
  while ((match = BARE_CONTACT_LINK.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    nodes.push(
      <Link
        key={`${keyPrefix}-${match.index}`}
        href="/#contact"
        className="underline text-primary hover:text-primary-hover"
      >
        {match[0]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))

  return nodes
}

function linkifyText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  MARKDOWN_LINK.lastIndex = 0
  while ((match = MARKDOWN_LINK.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...linkifyBareContact(text.slice(lastIndex, match.index), `${keyPrefix}-pre-${match.index}`))
    }
    nodes.push(
      <Link key={`${keyPrefix}-link-${match.index}`} href={match[2]} className="underline text-primary hover:text-primary-hover">
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    nodes.push(...linkifyBareContact(text.slice(lastIndex), `${keyPrefix}-tail-${lastIndex}`))
  }

  return nodes
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  BOLD.lastIndex = 0
  while ((match = BOLD.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...linkifyText(text.slice(lastIndex, match.index), `${keyPrefix}-t-${lastIndex}`))
    }
    nodes.push(
      <strong key={`${keyPrefix}-b-${match.index}`} className="font-semibold">
        {match[1]}
      </strong>
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) nodes.push(...linkifyText(text.slice(lastIndex), `${keyPrefix}-t-${lastIndex}`))

  return nodes
}

// Small chat-appropriate markdown subset — bold, bullet/numbered lists, links.
// Not a full markdown parser (no headers/code blocks/tables): Gemini's replies
// here are short, conversational answers, so this covers what actually shows
// up without pulling in a markdown library for it.
function renderContent(content: string): ReactNode[] {
  const lines = content.split("\n")
  const blocks: ReactNode[] = []
  let listItems: ReactNode[] = []
  let listType: "ul" | "ol" | null = null

  const flushList = () => {
    if (listItems.length === 0) return
    const List = listType === "ol" ? "ol" : "ul"
    blocks.push(
      <List key={`list-${blocks.length}`} className="list-none pl-0 my-1 space-y-1">
        {listItems}
      </List>
    )
    listItems = []
    listType = null
  }

  lines.forEach((line, lineIndex) => {
    const bulletMatch = line.match(BULLET_LINE)
    const numberedMatch = line.match(NUMBERED_LINE)

    if (bulletMatch) {
      if (listType === "ol") flushList()
      listType = "ul"
      listItems.push(
        <li key={lineIndex} className="flex gap-2">
          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <span>{renderInline(bulletMatch[1], `li-${lineIndex}`)}</span>
        </li>
      )
    } else if (numberedMatch) {
      if (listType === "ul") flushList()
      listType = "ol"
      listItems.push(
        <li key={lineIndex} className="flex gap-2">
          <span className="text-primary font-semibold shrink-0">{numberedMatch[1]}.</span>
          <span>{renderInline(numberedMatch[2], `li-${lineIndex}`)}</span>
        </li>
      )
    } else {
      flushList()
      if (line.trim().length > 0) {
        blocks.push(
          <p key={`p-${lineIndex}`} className="my-1 first:mt-0 last:mb-0">
            {renderInline(line, `p-${lineIndex}`)}
          </p>
        )
      }
    }
  })
  flushList()

  return blocks
}

export default function ChatMessageList({ messages, isPending }: ChatMessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages.length, isPending])

  return (
    <div role="log" aria-live="polite" className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={[
            "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
            message.role === "user"
              ? "self-end bg-primary text-white rounded-br-sm whitespace-pre-wrap"
              : "self-start bg-card2 text-text rounded-bl-sm",
          ].join(" ")}
        >
          {message.role === "assistant" ? renderContent(message.content) : message.content}
        </div>
      ))}
      {isPending && (
        <div
          aria-label="Assistant is typing"
          className="self-start bg-card2 text-text2 rounded-2xl rounded-bl-sm px-3 py-2 text-sm flex gap-1"
        >
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}
