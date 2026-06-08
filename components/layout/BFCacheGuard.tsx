"use client"

import { useEffect } from "react"

export default function BFCacheGuard() {
  useEffect(() => {
    // Belt: handle bfcache restoration (persisted page shown without a fresh load)
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.location.reload()
      }
    }
    window.addEventListener("pageshow", onPageShow)
    return () => window.removeEventListener("pageshow", onPageShow)
  }, [])

  return null
}
