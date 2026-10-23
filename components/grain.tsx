export function Grain() {
  return (
    <div className="grain pointer-events-none fixed inset-0 z-[96]" aria-hidden>
      <svg className="h-full w-full opacity-[0.28] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="site-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#site-grain)" />
      </svg>
    </div>
  )
}
