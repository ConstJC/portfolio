"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "dark" | "light" | "system"
export type ResolvedTheme = "dark" | "light"

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return "dark"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const resolveTheme = (theme: Theme): ResolvedTheme => {
  return theme === "system" ? getSystemTheme() : theme
}

const applyTheme = (theme: Theme): ResolvedTheme => {
  const resolvedTheme = resolveTheme(theme)

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", resolvedTheme)
    document.documentElement.style.colorScheme = resolvedTheme
  }

  return resolvedTheme
}

interface ThemeStore {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (t: Theme) => void
  syncTheme: () => void
  toggle: () => void
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "dark",
      syncTheme: () => {
        const resolvedTheme = applyTheme(get().theme)
        set({ resolvedTheme })
      },
      setTheme: (theme) => {
        const resolvedTheme = applyTheme(theme)
        set({ theme, resolvedTheme })
      },
      toggle: () => {
        const nextTheme = get().resolvedTheme === "dark" ? "light" : "dark"
        const resolvedTheme = applyTheme(nextTheme)
        set({ theme: nextTheme, resolvedTheme })
      },
    }),
    {
      name: "portfolio-theme",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        state?.syncTheme()
      },
    }
  )
)
