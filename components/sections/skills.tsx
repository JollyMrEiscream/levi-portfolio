import { site } from "@/content/site"
import { LineReveal } from "@/components/text-reveal"

export function Skills() {
  return (
    <section id="skills" className="px-safe py-28 md:py-40">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
        {site.skills.index} — Tools & aims
      </p>
      <LineReveal
        lines={site.skills.lines}
        className="mt-8 max-w-4xl text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.94] tracking-[-0.045em]"
      />
      <p className="mt-6 max-w-xl text-sm text-faint">{site.skills.note}</p>
      <ul className="mt-14 border-t border-line">
        {site.skills.groups.flatMap((group) =>
          group.items.map((item) => (
            <li
              key={item.name}
              className="group grid grid-cols-1 gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:col-span-2">
                {group.label}
              </span>
              <span className="text-3xl tracking-[-0.04em] transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover:translate-x-2 md:col-span-4 md:text-5xl">
                {item.name}
              </span>
              <span className="text-muted md:col-span-6">{item.detail}</span>
            </li>
          )),
        )}
      </ul>
    </section>
  )
}
