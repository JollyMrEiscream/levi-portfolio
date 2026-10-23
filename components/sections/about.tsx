import { site } from "@/content/site"
import { LineReveal } from "@/components/text-reveal"

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-safe py-28 md:py-40">
      <p
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] top-10 select-none font-serif text-[22vw] italic leading-none tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: "1px rgba(243,240,232,0.14)" }}
      >
        Tokyo
      </p>
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          {site.about.index} — About
        </p>
        <LineReveal
          as="h2"
          lines={site.about.lines}
          className="mt-8 max-w-5xl text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.045em]"
        />
        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="space-y-5 text-base leading-relaxed text-muted md:col-span-5 md:text-lg">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {site.about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-line py-4 md:grid-cols-[8rem_1fr]">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <blockquote className="mt-20 max-w-4xl border-l-2 border-accent pl-6 font-serif text-[clamp(1.8rem,4vw,3.5rem)] italic leading-[1.12] tracking-[-0.03em]">
          {site.about.quote}
        </blockquote>
      </div>
    </section>
  )
}
