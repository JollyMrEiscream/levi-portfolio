"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { site } from "@/content/site"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const node = timeRef.current
    if (!node) return
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: site.timeZone,
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date())
    const tick = () => {
      node.textContent = `${format()} ET`
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!open) return
    lockScroll("menu")
    const background = [...document.querySelectorAll("#site > header, #site > main, #site > footer, #site > .skip-link")]
    background.forEach((node) => node.setAttribute("inert", ""))
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (desktop.matches) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onChange)
    return () => {
      background.forEach((node) => node.removeAttribute("inert"))
      unlockScroll("menu")
      window.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onChange)
    }
  }, [open])

  useEffect(() => {
    const onPop = () => setOpen(false)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-40">
        <div className="nav-bar flex items-center justify-between gap-4 px-safe py-4">
          <Link
            href="/"
            data-cursor="Home"
            data-transition="Home"
            className="text-sm font-medium tracking-[0.18em]"
            aria-label={`${site.name}, home`}
          >
            {site.monogram}
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-transition={item.label}
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint lg:flex">
            <span>{site.locationShort}</span>
            <span className="h-1 w-1 bg-accent" aria-hidden />
            <span ref={timeRef}>ET</span>
          </p>
          <Button
            variant="ghost"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            Menu
          </Button>
        </div>
      </header>
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        data-open={open ? "true" : "false"}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-background px-safe pt-8 md:hidden",
          open ? "visible" : "invisible pointer-events-none",
        )}
      >
        <div className="flex justify-end">
          <Button ref={closeRef} variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <nav className="mt-16 flex flex-col gap-4" aria-label="Mobile" onClick={() => setOpen(false)}>
          {site.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              data-transition={item.label}
              className="menu-link font-serif text-[clamp(3.2rem,14vw,5rem)] italic leading-[0.95] tracking-[-0.04em]"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-auto pb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {site.location} · {pathname === "/" ? "Index" : "Case study"}
        </p>
      </div>
    </>
  )
}
