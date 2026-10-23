import { site } from "@/content/site"
import { LineReveal } from "@/components/text-reveal"
import { Magnetic } from "@/components/magnetic"
import { Button } from "@/components/ui/button"

export function Contact() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Hello from your site")}`
  return (
    <section id="contact" className="bg-paper px-safe py-28 text-ink md:py-40">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
        {site.contact.index} — Contact
      </p>
      <LineReveal
        lines={site.contact.lines}
        className="mt-8 max-w-5xl text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.045em] text-ink"
      />
      <p className="mt-8 max-w-xl text-lg text-ink/70">{site.contact.lede}</p>
      <div className="mt-14">
        <a
          href={mailto}
          data-cursor="Mail"
          className="inline-block font-serif text-[clamp(1.7rem,4.6vw,4.2rem)] italic leading-none tracking-[-0.04em] text-ink underline decoration-accent decoration-2 underline-offset-[0.14em]"
        >
          {site.email}
        </a>
        {site.emailIsPlaceholder ? (
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">
            Placeholder address. It does not receive mail. Replace it in{" "}
            <span className="font-mono text-[12px]">content/site.ts</span> before sharing the site.
          </p>
        ) : null}
      </div>
      {site.socials.length > 0 ? (
        <nav aria-label="Social" className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {site.socials.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 underline decoration-accent decoration-2 underline-offset-[0.45em] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Magnetic strength={0.4}>
          <Button asChild variant="paper" size="lg">
            <a href={mailto} data-cursor="Mail">
              {site.contact.button}
            </a>
          </Button>
        </Magnetic>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
          {site.locationShort} · {site.region} · {site.studio}
        </p>
      </div>
    </section>
  )
}
