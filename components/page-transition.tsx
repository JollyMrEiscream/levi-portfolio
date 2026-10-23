"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { getLenis, scrollToHash } from "@/lib/lenis-store"
import { toAppPath } from "@/lib/base-path"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

function cover(panel: HTMLElement, labelEl: HTMLElement, root: HTMLElement, label: string, duration: number) {
  labelEl.textContent = label
  return new Promise<void>((resolve) => {
    const timeline = gsap.timeline({ onComplete: resolve })
    timeline.set(root, { autoAlpha: 1, pointerEvents: "auto" })
    timeline.set(panel, { transformOrigin: "bottom center" })
    timeline.fromTo(panel, { scaleY: 0 }, { scaleY: 1, duration, ease: "power4.inOut" })
    if (label) {
      timeline.fromTo(
        labelEl,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: Math.min(0.35, duration), ease: "power3.out" },
        duration * 0.42,
      )
    } else {
      gsap.set(labelEl, { autoAlpha: 0 })
    }
  })
}

function reveal(panel: HTMLElement, labelEl: HTMLElement, root: HTMLElement, duration: number) {
  return new Promise<void>((resolve) => {
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" })
        resolve()
      },
    })
    timeline.set(panel, { transformOrigin: "top center" })
    timeline.to(labelEl, { autoAlpha: 0, y: -12, duration: duration * 0.35, ease: "power2.in" }, 0)
    timeline.to(panel, { scaleY: 0, duration, ease: "power4.inOut" }, 0)
  })
}

function durationForPointer() {
  return window.matchMedia("(pointer: coarse)").matches ? 0.46 : 0.64
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const routerRef = useRef(router)
  const pending = useRef(false)
  const busy = useRef(false)
  const popped = useRef(false)
  const runId = useRef(0)
  const safetyRef = useRef(0)

  useEffect(() => {
    routerRef.current = router
  }, [router])

  useLayoutEffect(() => {
    const onPop = () => {
      popped.current = true
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest?.("a")
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (anchor.target && anchor.target !== "_self") return
      if (anchor.hasAttribute("download")) return
      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return

      let url: URL
      try {
        url = new URL(anchor.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return

      const reduce = document.documentElement.classList.contains("rm")
      const nextPath = `${toAppPath(url.pathname)}${url.search}${url.hash}`
      const samePath = toAppPath(url.pathname) === toAppPath(window.location.pathname)

      if (anchor.hasAttribute("data-skip")) {
        event.preventDefault()
        scrollToHash(url.hash, true)
        const target = document.querySelector(url.hash)
        if (target instanceof HTMLElement) target.focus()
        return
      }

      if (samePath && url.hash) {
        event.preventDefault()
        scrollToHash(url.hash, reduce)
        return
      }
      if (samePath) {
        event.preventDefault()
        scrollToHash("", reduce)
        return
      }
      if (reduce || busy.current) {
        if (busy.current) event.preventDefault()
        return
      }

      event.preventDefault()
      const root = rootRef.current
      const panel = panelRef.current
      const labelEl = labelRef.current
      if (!root || !panel || !labelEl) {
        routerRef.current.push(nextPath)
        return
      }

      busy.current = true
      pending.current = true
      document.getElementById("site")?.setAttribute("inert", "")
      lockScroll("transition")
      window.clearTimeout(safetyRef.current)
      safetyRef.current = window.setTimeout(() => {
        if (!busy.current) return
        busy.current = false
        pending.current = false
        document.getElementById("site")?.removeAttribute("inert")
        unlockScroll("transition")
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" })
      }, 3200)

      void cover(panel, labelEl, root, anchor.dataset.transition ?? "", durationForPointer()).then(() => {
        routerRef.current.push(nextPath, { scroll: false })
      })
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  useLayoutEffect(() => {
    if (!pending.current && !popped.current) return

    const root = rootRef.current
    const panel = panelRef.current
    const labelEl = labelRef.current
    const hash = window.location.hash
    const reduce = document.documentElement.classList.contains("rm")
    const fromPop = popped.current
    popped.current = false
    window.clearTimeout(safetyRef.current)
    const id = ++runId.current

    const finish = () => {
      scrollToHash(hash, true)
      getLenis()?.resize()
      ScrollTrigger.refresh()
      const heading = [...document.querySelectorAll<HTMLElement>("#site h1")].find(
        (node) => node.getClientRects().length > 0,
      )
      heading?.focus({ preventScroll: true })
    }

    if (reduce || !root || !panel || !labelEl) {
      pending.current = false
      busy.current = false
      document.getElementById("site")?.removeAttribute("inert")
      unlockScroll("transition")
      finish()
      return
    }

    if (fromPop && !pending.current) {
      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" })
      gsap.set(panel, { scaleY: 1, transformOrigin: "bottom center" })
      gsap.set(labelEl, { autoAlpha: 0 })
      lockScroll("transition")
      busy.current = true
    }

    const run = async () => {
      finish()
      await reveal(panel, labelEl, root, durationForPointer() + 0.06)
      if (runId.current !== id) return
      document.getElementById("site")?.removeAttribute("inert")
      unlockScroll("transition")
      busy.current = false
      pending.current = false
    }

    void run()
    return () => {
      gsap.killTweensOf([panel, labelEl, root])
    }
  }, [pathname])

  return (
    <>
      {children}
      <div ref={rootRef} className="pointer-events-none invisible fixed inset-0 z-[80]" aria-hidden>
        <div ref={panelRef} className="wipe-panel absolute inset-0 bg-paper" />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <span
            ref={labelRef}
            className="font-serif text-[clamp(2.4rem,6vw,5rem)] italic leading-none tracking-[-0.04em] text-ink"
          />
        </div>
      </div>
    </>
  )
}
