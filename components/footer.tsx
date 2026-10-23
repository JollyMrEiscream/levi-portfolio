import Link from "next/link"
import { site } from "@/content/site"
import { CayenneCredit } from "@/components/cayenne-credit"

export function Footer() {
  return (
    <footer className="border-t border-line px-safe py-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-3xl italic tracking-[-0.04em]">{site.name}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            © {site.copyrightYear} · {site.locationShort} · {site.studio}
          </p>
          <CayenneCredit className="mt-4 max-w-md text-[11px] leading-relaxed text-faint" />
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" aria-label="Footer">
          <Link href="/#work" data-transition="Work" className="hover:text-foreground">
            Work
          </Link>
          <Link href="/#about" data-transition="About" className="hover:text-foreground">
            About
          </Link>
          <Link href="/#skills" data-transition="Tools" className="hover:text-foreground">
            Tools
          </Link>
          <Link href="/#contact" data-transition="Contact" className="hover:text-foreground">
            Contact
          </Link>
          {site.socials.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer" data-cursor="Open" className="hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
