"use client"

import { useEffect } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { onIntroDone } from "@/lib/intro"
import { setLenis, getLenis } from "@/lib/lenis-store"
import { isScrollLocked } from "@/lib/scroll-lock"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = document.documentElement.classList.contains("rm")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    const weak = (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) || Boolean(nav.connection?.saveData)
    if (reduce || !fine || weak) return

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
      anchors: false,
      stopInertiaOnNavigate: true,
    })

    setLenis(lenis)
    if (isScrollLocked()) lenis.stop()

    const onScroll = () => {
      ScrollTrigger.update()
    }
    const unsubscribe = lenis.on("scroll", onScroll)
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.config({ ignoreMobileResize: true })

    const offIntro = onIntroDone(() => {
      requestAnimationFrame(() => {
        getLenis()?.resize()
        ScrollTrigger.refresh()
      })
    })

    const onRefresh = () => {
      lenis.resize()
    }
    ScrollTrigger.addEventListener("refresh", onRefresh)

    return () => {
      offIntro()
      unsubscribe()
      ScrollTrigger.removeEventListener("refresh", onRefresh)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return children
}
