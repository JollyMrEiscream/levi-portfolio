import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col justify-end px-safe pb-16 pt-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">404</p>
      <h1 tabIndex={-1} className="mt-6 max-w-4xl font-serif text-[clamp(3.4rem,9vw,7.5rem)] italic leading-[0.9] tracking-[-0.045em] outline-none">
        Nothing lives at this address.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">The link doesn’t match a page on this site.</p>
      <div className="mt-10">
        <Button asChild variant="accent" size="lg">
          <Link href="/" data-transition="Home">
            Back home
          </Link>
        </Button>
      </div>
    </section>
  );
}
