"use client"

import { getLenis } from "@/lib/lenis-store"

const held = new Set<string>()

export function isScrollLocked() {
  return held.size > 0
}

export function lockScroll(id: string) {
  held.add(id)
  document.documentElement.classList.add("scroll-lock")
  getLenis()?.stop()
}

export function unlockScroll(id: string) {
  held.delete(id)
  if (held.size > 0) return
  document.documentElement.classList.remove("scroll-lock")
  getLenis()?.start()
}
