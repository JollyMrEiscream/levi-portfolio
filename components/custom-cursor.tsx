"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return
    if (document.documentElement.classList.contains("rm")) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0
    let running = false
    let visible = false

    const apply = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
    }

    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      apply()
      if (Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2) {
        raf = requestAnimationFrame(loop)
      } else {
        rx = x
        ry = y
        apply()
        running = false
      }
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }

    const setHot = (text: string, link: boolean) => {
      label.textContent = text
      ring.classList.toggle("is-hot", Boolean(text))
      ring.classList.toggle("is-link", link && !text)
      dot.classList.toggle("is-hidden", Boolean(text))
    }

    const onMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
      start()
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const interactive = target.closest<HTMLElement>("a, button, [data-cursor]")
      if (!interactive) {
        setHot("", false)
        return
      }
      const text = interactive.dataset.cursor ?? ""
      setHot(text, true)
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  )
}
