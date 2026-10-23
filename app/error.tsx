"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-dvh flex-col justify-end px-safe pb-16 pt-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Error</p>
      <h1 tabIndex={-1} className="mt-6 max-w-4xl font-serif text-[clamp(3.2rem,8vw,6.5rem)] italic leading-[0.9] tracking-[-0.045em] outline-none">
        Something broke on the way through.
      </h1>
      <div className="mt-10">
        <Button type="button" variant="accent" size="lg" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </section>
  );
}
