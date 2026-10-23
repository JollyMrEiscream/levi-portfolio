"use client"

import type Lenis from "lenis"

let current: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  current = instance
}

export function getLenis() {
  return current
}

export function scrollToTarget(target: number | HTMLElement, immediate = false) {
  const lenis = current
  const reduce = document.documentElement.classList.contains("rm")
  if (lenis) {
    lenis.scrollTo(target, {
      immediate: immediate || reduce,
      force: true,
      offset: typeof target === "number" ? 0 : -80,
    })
    return
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate || reduce ? "auto" : "smooth" })
    return
  }
  const top = target.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: immediate || reduce ? "auto" : "smooth" })
}

export function scrollToHash(hash: string, immediate = false) {
  if (!hash) {
    scrollToTarget(0, immediate)
    return
  }
  let nodes: HTMLElement[] = []
  try {
    nodes = [...document.querySelectorAll<HTMLElement>(hash)]
  } catch {
    scrollToTarget(0, immediate)
    return
  }
  const el = nodes.find((node) => node.getClientRects().length > 0)
  if (!el) {
    scrollToTarget(0, immediate)
    return
  }
  scrollToTarget(el, immediate)
}
