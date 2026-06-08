"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionItemProps {
  question: string
  answer: string
  defaultOpen?: boolean
  /** "card" = bordered rounded card (default) | "flat" = divider-only rows */
  variant?: "card" | "flat"
  isLast?: boolean
}

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
  variant = "card",
  isLast = false,
}: AccordionItemProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  if (variant === "flat") {
    return (
      <div
        style={{
          borderBottom: isLast ? "none" : "1px solid var(--divider)",
        }}
      >
        <button
          className={cn("faq-flat-btn")}
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "18px 0",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            color: "var(--text)",
            fontFamily: "inherit",
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              lineHeight: 1.45,
              flex: 1,
            }}
          >
            {question}
          </span>
          <ChevronDown
            size={16}
            style={{
              flexShrink: 0,
              color: "var(--text3)",
              transition: "transform 0.25s",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? 400 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--text2)",
              lineHeight: 1.75,
              paddingBottom: 18,
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    )
  }

  // --- card variant (original) ---
  return (
    <div
      className={cn(
        "border rounded-[14px] mb-[10px] overflow-hidden transition-colors duration-200",
        open ? "border-[var(--primary-border)]" : "border-[var(--border)]"
      )}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-[22px] py-[18px] bg-[var(--card)] hover:bg-[var(--card2)] text-left font-semibold text-[0.9rem] text-[var(--text)] transition-colors duration-150 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <ChevronDown
          size={18}
          className={cn(
            "flex-shrink-0 transition-transform duration-250",
            open ? "rotate-180 text-[var(--primary)]" : "text-[var(--text3)]"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden bg-[var(--card)] text-[0.85rem] text-[var(--text2)] leading-[1.72] transition-all duration-300",
          open ? "max-h-[300px] px-[22px] pb-[18px] pt-0" : "max-h-0 px-[22px] py-0"
        )}
      >
        {answer}
      </div>
    </div>
  )
}
