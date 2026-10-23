import { site } from "@/content/site"

export function Marquee() {
  const items = [...site.marquee, ...site.marquee]
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="mx-5 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{item}</span>
            <span className="h-1.5 w-1.5 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
