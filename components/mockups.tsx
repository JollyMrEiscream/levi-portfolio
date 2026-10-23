import { assetPath } from "@/lib/base-path"
import { cn } from "@/lib/utils"

export function ProjectMockup({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#0c0c0c]", className)}>
      {slug === "dancingsrq" && <DancingMockup />}
      {slug === "notch-media" && <NotchMockup />}
      {slug === "vela" && <VelaMockup />}
      {slug === "clear-web-studio" && <StudioMockup />}
      {slug === "lockscreen-rotator" && <LockMockup />}
      {slug === "church-bell-tower-watch" && <TowerMockup />}
    </div>
  )
}

function DancingMockup() {
  const rows = [
    { title: "Tonight", time: "8:00" },
    { title: "Featured", time: "7:30" },
    { title: "Explore", time: "9:00" },
  ]
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,59,26,0.42),transparent_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#090909] to-transparent" />
      <div className="absolute left-1/2 top-1/2 flex aspect-[9/18.2] w-[48%] max-w-[240px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-[1.7rem] border border-white/15 bg-black p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] bg-[#120e0c]">
          <div className="flex items-center justify-between px-3 pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
            <span>9:41</span>
            <span>SRQ</span>
          </div>
          <div className="px-3 pt-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Tonight</p>
            <p className="mt-1 font-serif text-[1.7rem] italic leading-none text-[#f3f0e8]">Social</p>
          </div>
          <div className="mt-3 flex flex-1 flex-col gap-1.5 px-3">
            {rows.map((row) => (
              <div key={row.title} className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-2 py-1.5">
                <div>
                  <p className="text-[10px] text-[#f3f0e8]">{row.title}</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">Salsa</p>
                </div>
                <span className="font-mono text-[9px] text-accent">{row.time}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 border-t border-white/10 py-2 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
            <span className="text-accent">Events</span>
            <span>Classes</span>
            <span>Studios</span>
          </div>
        </div>
      </div>
    </>
  )
}

function NotchMockup() {
  const words = ["in", "time", "word", "by", "word"]
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="absolute left-1/2 top-0 h-3 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="absolute left-1/2 top-[18%] w-[min(88%,520px)] -translate-x-1/2 rounded-[1.6rem] border border-white/10 bg-[#0a0a0a] px-4 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.45)] md:top-1/2 md:-translate-y-1/2">
        <div className="flex gap-4">
          <div className="h-16 w-16 shrink-0 bg-[conic-gradient(from_140deg,#ff3b1a,#f3f0e8,#2a2a2a,#ff3b1a)]" />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Now playing</p>
            <p className="truncate text-sm text-[#f3f0e8]">Synced lyric</p>
            <p className="text-xs text-white/45">notch-media</p>
          </div>
        </div>
        <p className="mt-4 flex flex-wrap gap-x-1.5 text-sm text-white/35">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className={index === 2 ? "lyric-current text-accent" : undefined}>
              {word}
            </span>
          ))}
        </p>
        <div className="mt-4 h-px bg-white/10">
          <div className="h-px w-1/3 bg-accent" />
        </div>
      </div>
    </>
  )
}

function VelaMockup() {
  return (
    <div className="absolute inset-[7%] flex flex-col border border-white/15 bg-[#101010] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <div className="ml-2 flex-1 truncate border border-white/10 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-white/45">
          vela://ask
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[1.2fr_0.8fr]">
        <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
          <div className="h-3 w-1/3 bg-white/15" />
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full bg-white/10" />
            <div className="h-2 w-11/12 bg-white/10" />
            <div className="h-2 w-4/5 bg-white/10" />
            <div className="h-2 w-full bg-white/10" />
          </div>
          <div className="mt-6 h-16 w-full bg-white/[0.04]" />
        </div>
        <div className="flex flex-col p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Ask Vela</p>
          <p className="mt-3 text-sm leading-snug text-[#f3f0e8]">Summarize this page.</p>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            Sees the page. Does not move your mouse.
          </p>
          <div className="mt-auto flex items-center gap-2 border border-white/10 px-2 py-2">
            <span className="h-3 w-px bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">Ask</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function StudioMockup() {
  const frames = [
    { title: "Pricing", rotate: -8, className: "left-[4%] top-[18%] z-0" },
    { title: "Process", rotate: 2, className: "left-[22%] top-[24%] z-10" },
    { title: "Contact", rotate: 7, className: "left-[42%] top-[14%] z-0" },
  ]
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,59,26,0.16),transparent_42%)]" />
      <img
        src={assetPath("/media/clear-web-studio/logo.svg")}
        alt=""
        width={64}
        height={64}
        style={{ maxWidth: 64, maxHeight: 64 }}
        className="absolute bottom-5 left-5 h-12 w-12 object-contain"
      />
      {frames.map((frame) => (
        <div
          key={frame.title}
          className={`absolute w-[52%] border border-white/15 bg-[#101010] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${frame.className}`}
          style={{ transform: `rotate(${frame.rotate}deg)` }}
        >
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">{frame.title}</span>
            <span className="h-1.5 w-8 bg-white/20" />
          </div>
          <div className="h-8 bg-white/10" />
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            <div className="h-7 bg-white/5" />
            <div className="h-7 bg-accent" />
            <div className="h-7 bg-white/5" />
          </div>
        </div>
      ))}
    </>
  )
}

function LockMockup() {
  const tabs = ["Library", "Design", "Settings", "Diagnostics"]
  return (
    <>
      <div className="absolute inset-[10%] flex flex-col border border-white/15 bg-[#101010]">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <img
            src={assetPath("/media/lockscreen-rotator/logo.svg")}
            alt=""
            width={457}
            height={318}
            style={{ maxWidth: 46, maxHeight: 32, aspectRatio: "457 / 318" }}
            className="h-8 w-auto object-contain"
          />
          <p className="text-sm text-[#f3f0e8]">LockScreenRotator</p>
        </div>
        <div className="flex gap-4 px-4 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          {tabs.map((tab, index) => (
            <span key={tab} className={index === 0 ? "text-accent" : undefined}>
              {tab}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 p-4">
          <div className="bg-[linear-gradient(160deg,#1c75bc,#2b3990)]" />
          <div className="bg-[linear-gradient(200deg,#27aae1,#0c0c0c)]" />
          <div className="bg-[linear-gradient(20deg,#f3f0e8,#1c75bc)]" />
        </div>
      </div>
    </>
  )
}

function TowerMockup() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(243,240,232,0.2),transparent_18%),linear-gradient(#141210,#090909)]" />
      <svg viewBox="0 0 200 160" className="absolute inset-x-[18%] bottom-[12%] h-[70%] w-auto" aria-hidden>
        <path d="M70 150 V70 H60 L100 28 L140 70 H130 V150 Z" fill="#1c1a17" stroke="#f3f0e8" strokeWidth="1.2" />
        <path d="M92 150 V118 H108 V150 Z" fill="#090909" />
        <rect x="78" y="82" width="10" height="14" fill="#ff3b1a" opacity="0.85" />
        <rect x="112" y="82" width="10" height="14" fill="#f3f0e8" opacity="0.35" />
        <circle cx="148" cy="36" r="8" fill="#f3f0e8" opacity="0.85" />
      </svg>
      <p className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">In progress</p>
    </>
  )
}
