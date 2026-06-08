"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUp, Monitor, Moon, Sun, type LucideIcon } from "lucide-react"
import { useTheme, type Theme } from "@/hooks/useTheme"

const themeOptions: Array<{ value: Theme; label: string; Icon: LucideIcon }> = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
]

const btnBase = [
  "w-10 h-10 rounded-[10px] bg-card border border-border2 text-text2",
  "flex items-center justify-center cursor-pointer backdrop-blur-[10px] shadow-[var(--shadow-md)]",
  "[transition:border-color_0.18s,color_0.18s,background_0.18s,opacity_0.25s,transform_0.25s]",
  "hover:border-primary-border hover:bg-primary-light hover:text-primary",
].join(" ")

export default function FloatingActions() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  const CurrentThemeIcon = themeOptions.find((o) => o.value === theme)?.Icon ?? Monitor

  return (
    <div className="fixed bottom-7 right-6 z-[200] flex flex-col gap-2.5 items-center">
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          title="Theme mode"
          aria-label="Choose theme mode"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className={`${btnBase} ${menuOpen ? "border-primary-border bg-primary-light text-primary" : ""}`}
        >
          <CurrentThemeIcon size={16} />
        </button>

        <div
          role="menu"
          aria-label="Theme mode"
          className={[
            "absolute right-0 bottom-[calc(100%+12px)] w-[130px] p-2 rounded-[20px]",
            "bg-card border border-border2 shadow-[var(--shadow-xl)] backdrop-blur-[18px]",
            "transition-[opacity,transform] duration-[180ms] ease-in-out",
            menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[10px] pointer-events-none",
          ].join(" ")}
        >
          {themeOptions.map(({ value, label, Icon }) => {
            const active = theme === value

            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setTheme(value)
                  setMenuOpen(false)
                }}
                className={[
                  "w-full border-0 flex items-center justify-start gap-3.5 py-[6px] px-[10px] my-0.5",
                  "rounded-lg text-[12px] font-sans text-left cursor-pointer",
                  "transition-[background,color] duration-[180ms] ease-in-out",
                  active
                    ? "bg-primary-light text-primary font-bold hover:bg-primary-light hover:text-primary"
                    : "bg-transparent text-text font-semibold hover:bg-card2 hover:text-text",
                ].join(" ")}
              >
                <Icon size={20} strokeWidth={2.1} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Scroll to top — visible only after scrolling */}
      <button
        onClick={scrollToTop}
        title="Scroll to top"
        aria-label="Scroll to top"
        className={`${btnBase} ${scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[10px] pointer-events-none"}`}
      >
        <ArrowUp size={16} />
      </button>
    </div>
  )
}
