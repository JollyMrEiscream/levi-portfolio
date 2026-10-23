import { useId } from "react"
import { assetPath } from "@/lib/base-path"
import { DeviceStage } from "@/components/device-stage"

/**
 * Drawn previews for products that cannot be run from here.
 * Each one shows UI the write-up already describes, with fictional demo copy.
 */
export function ProjectMockup({ slug, className }: { slug: string; className?: string }) {
  return (
    <div className={className ? `h-full w-full ${className}` : "h-full w-full"}>
      {slug === "dancingsrq" && <DancingMockup />}
      {slug === "notch-media" && <NotchMockup />}
      {slug === "vela" && <VelaMockup />}
      {slug === "lockscreen-rotator" && <LockMockup />}
      {slug === "church-bell-tower-watch" && <TowerMockup />}
    </div>
  )
}

function DancingMockup() {
  return (
    <DeviceStage>
      <div className="w-[46%] max-w-[220px] rounded-[1.7rem] border border-white/15 bg-black p-1.5 shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
        <div className="overflow-hidden rounded-[1.25rem] bg-[#120e0c] px-3 py-3" style={{ aspectRatio: "1179 / 2556" }}>
          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">Tonight</p>
          <p className="mt-2 font-serif text-2xl italic leading-none text-[#f3f0e8]">Social</p>
        </div>
      </div>
    </DeviceStage>
  )
}

function NotchMockup() {
  const words = ["hold", "the", "note", "and", "let", "it", "land"]
  return (
    <DeviceStage>
      <div className="w-full">
        <div className="rounded-[1.15rem] border border-white/12 bg-[#161616] p-[2.4%] shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
          <div className="relative overflow-hidden rounded-[0.55rem] bg-[#100e0c]" style={{ aspectRatio: "16 / 10" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_78%,rgba(255,59,26,0.2),transparent_36%)]" />
            <div className="absolute inset-x-[7%] top-[22%] bottom-[16%] rounded-md border border-white/10 bg-white/[0.03]" />
            <div className="absolute inset-x-0 bottom-0 flex h-[8%] items-center justify-center gap-[1.4%] bg-black/50">
              <span className="h-[36%] w-[1.8%] rounded-[1px] bg-white/40" />
              <span className="h-[36%] w-[1.8%] rounded-[1px] bg-white/20" />
              <span className="h-[36%] w-[1.8%] rounded-[1px] bg-white/20" />
            </div>
            <div className="absolute left-1/2 top-0 w-[86%] -translate-x-1/2">
              <div className="mx-auto h-1.5 w-[16%] rounded-b-full bg-black" />
              <div
                className="rounded-b-[1.1rem] border border-t-0 border-white/15 bg-white/[0.07] px-[4%] py-[3.2%] shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
                style={{ containerType: "inline-size" }}
              >
                <div className="flex items-center gap-[3%]">
                  <div className="aspect-square w-[16%] shrink-0 bg-[conic-gradient(from_140deg,#ff3b1a,#f3f0e8_40%,#2a2a2a_70%,#ff3b1a)]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[clamp(7px,2.1cqi,10px)] uppercase tracking-[0.16em] text-white/40">Now playing</p>
                    <p className="truncate text-[clamp(11px,3.4cqi,15px)] text-[#f3f0e8]">Glass hour</p>
                    <p className="truncate text-[clamp(8px,2.3cqi,11px)] text-white/45">Demo track</p>
                  </div>
                  <div className="w-[18%] shrink-0">
                    <div className="h-1 rounded-full bg-white/15">
                      <div className="h-1 w-2/3 rounded-full bg-[#f3f0e8]/80" />
                    </div>
                    <p className="mt-1 text-right font-mono text-[clamp(7px,1.8cqi,9px)] uppercase tracking-[0.12em] text-white/35">Vol</p>
                  </div>
                </div>
                <p className="mt-[3%] flex flex-wrap gap-x-[0.35em] text-[clamp(8px,2.5cqi,12px)] text-white/35">
                  {words.map((word, index) => (
                    <span key={`${word}-${index}`} className={index === 2 ? "lyric-current text-accent" : undefined}>
                      {word}
                    </span>
                  ))}
                </p>
                <div className="mt-[3.5%] flex items-center gap-[3%]">
                  <Transport />
                  <div className="h-px flex-1 bg-white/15">
                    <div className="h-px w-1/3 bg-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-2.5 w-[15%] bg-[#1c1c1c]" />
        <div className="mx-auto h-1.5 w-[26%] rounded-b-md bg-[#262626]" />
      </div>
    </DeviceStage>
  )
}

function Transport() {
  return (
    <span className="flex items-center gap-[0.65em] text-[#f3f0e8]" aria-hidden>
      <svg viewBox="0 0 12 12" className="h-[1em] w-[1em] fill-current">
        <path d="M1 1h2v10H1zM11 1v10L4 6z" />
      </svg>
      <svg viewBox="0 0 12 12" className="h-[1.15em] w-[1.15em] fill-current">
        <path d="M2 1h3.2v10H2zM6.8 1H10v10H6.8z" />
      </svg>
      <svg viewBox="0 0 12 12" className="h-[1em] w-[1em] fill-current">
        <path d="M1 1l7 5-7 5zM9 1h2v10H9z" />
      </svg>
    </span>
  )
}

function VelaMockup() {
  return (
    <DeviceStage>
      <div className="w-full overflow-hidden rounded-[0.9rem] border border-white/12 bg-[#101010] shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <Dots />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">Vela</span>
        </div>
        <div className="grid aspect-[16/10] grid-cols-[1.22fr_0.78fr]">
          <div className="flex min-w-0 flex-col border-r border-white/10">
            <div className="flex items-end gap-1 border-b border-white/10 px-2 pt-2">
              <span className="rounded-t bg-white/[0.07] px-2 py-1 text-[10px] text-[#f3f0e8]">Field notes</span>
              <span className="px-2 py-1 text-[10px] text-white/35">New tab</span>
            </div>
            <div className="mx-2 mt-2 truncate border border-white/10 px-2 py-1 font-mono text-[10px] text-white/45">notes.example</div>
            <div className="min-h-0 flex-1 px-3 py-3">
              <p className="text-[12px] tracking-[-0.02em] text-[#f3f0e8]">Field notes</p>
              <p className="mt-2 text-[10px] leading-relaxed text-white/50">A demo page for the sidebar. No account is signed in.</p>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-full bg-white/10" />
                <div className="h-1.5 w-4/5 bg-white/10" />
                <div className="h-1.5 w-11/12 bg-white/[0.06]" />
              </div>
            </div>
          </div>
          <div className="flex min-w-0 flex-col bg-black/25 p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">Ask Vela</p>
            <p className="mt-3 text-[11px] leading-snug text-[#f3f0e8]">Summarize this page.</p>
            <p className="mt-2 text-[10px] leading-relaxed text-white/50">A short demo note. Nothing to send.</p>
            <p className="mt-auto pt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-white/35">
              Asks before submit, pay, or send.
            </p>
            <div className="mt-2 flex items-center gap-2 border border-white/10 px-2 py-1.5">
              <span className="h-3 w-px bg-accent" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">Ask</span>
            </div>
          </div>
        </div>
      </div>
    </DeviceStage>
  )
}

function LockMockup() {
  const tabs = ["Library", "Design", "Settings", "Diagnostics"]
  const tiles = [
    "linear-gradient(165deg,#1c75bc,#2b3990)",
    "linear-gradient(200deg,#27aae1,#101820)",
    "linear-gradient(25deg,#e7eef3,#1c75bc)",
  ]
  return (
    <DeviceStage>
      <div className="w-full overflow-hidden rounded-[0.9rem] border border-white/12 bg-[#101010] shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-3 py-2">
          <Dots />
          <img
            src={assetPath("/media/lockscreen-rotator/logo.svg")}
            alt=""
            width={457}
            height={318}
            style={{ height: 22, width: "auto", maxHeight: 22, aspectRatio: "457 / 318" }}
            className="w-auto object-contain"
          />
          <p className="min-w-0 truncate text-[12px] text-[#f3f0e8]">LockScreenRotator</p>
        </div>
        <div className="flex gap-3 overflow-hidden px-3 pt-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
          {tabs.map((tab, index) => (
            <span key={tab} className={index === 0 ? "text-accent" : undefined}>
              {tab}
            </span>
          ))}
        </div>
        <div className="grid aspect-[16/10] grid-cols-3 gap-2 p-3">
          {tiles.map((background, index) => (
            <div key={background} className="relative min-h-0" style={{ background }}>
              <span className="absolute bottom-1.5 left-1.5 font-mono text-[9px] tracking-[0.12em] text-white/85">0{index + 1}</span>
            </div>
          ))}
        </div>
        <p className="border-t border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
          On sign-in and unlock
        </p>
      </div>
    </DeviceStage>
  )
}

function TowerMockup() {
  const uid = useId().replace(/:/g, "")
  const sky = `${uid}-sky`
  return (
    <DeviceStage>
      <div className="w-full overflow-hidden rounded-[0.85rem] border border-white/14 bg-[#141210] p-[2.2%] shadow-[0_28px_60px_rgba(0,0,0,0.55)]">
        <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
          <svg viewBox="0 0 320 180" className="block h-auto w-full" role="img" aria-label="Drawn bell tower at night">
            <title>Drawn bell tower at night</title>
            <defs>
              <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#100c0a" />
                <stop offset="0.5" stopColor="#3a2418" />
                <stop offset="1" stopColor="#1a120e" />
              </linearGradient>
            </defs>
            <rect width="320" height="180" fill={`url(#${sky})`} />
            <g fill="#f3f0e8">
              <rect x="24" y="22" width="2" height="2" />
              <rect x="58" y="40" width="1.5" height="1.5" />
              <rect x="96" y="16" width="2" height="2" />
              <rect x="188" y="26" width="1.5" height="1.5" />
              <rect x="214" y="14" width="2" height="2" />
              <rect x="292" y="36" width="1.5" height="1.5" />
            </g>
            <circle cx="250" cy="32" r="14" fill="#f3f0e8" />
            <circle cx="257" cy="28" r="11" fill="#2a1a14" />
            <path d="M0 132 L54 116 L110 128 L168 112 L230 126 L286 114 L320 124 V180 H0 Z" fill="#1a1613" />
            <path d="M0 150 L70 140 L140 154 L220 138 L320 150 V180 H0 Z" fill="#100e0c" />
            <path d="M14 150 V136 H26 L36 124 L46 136 H58 V150 Z" fill="#241c18" />
            <path d="M248 148 V132 H260 L272 118 L284 132 H296 V148 Z" fill="#241c18" />
            <rect x="266" y="136" width="3" height="4" fill="#ff3b1a" opacity="0.55" />
            <rect x="108" y="156" width="104" height="16" fill="#141210" />
            <rect x="120" y="78" width="80" height="90" fill="#2a2622" stroke="#d9d3c8" strokeWidth="1.2" />
            <rect x="112" y="70" width="96" height="12" fill="#1a1816" stroke="#f3f0e8" strokeWidth="1" />
            <path d="M108 74 H212 L160 36 Z" fill="#12100e" stroke="#f3f0e8" strokeWidth="1.15" />
            <rect x="157" y="22" width="6" height="16" fill="#f3f0e8" />
            <rect x="150" y="26" width="20" height="4" fill="#f3f0e8" />
            <rect x="136" y="84" width="48" height="22" fill="#090909" />
            <path d="M148 102 H172 L168 88 H152 Z" fill="#c4bfb4" />
            <circle cx="160" cy="128" r="7" fill="none" stroke="#f3f0e8" strokeWidth="1.2" />
            <path d="M160 128 V123 M160 128 L164 131" stroke="#f3f0e8" strokeWidth="1" />
            <rect x="152" y="146" width="16" height="22" fill="#0c0a09" />
            <rect x="132" y="112" width="10" height="16" fill="#ff3b1a" opacity="0.85" />
            <path d="M112 118 L122 112 L128 122 L120 136 L108 128 Z" fill="#070605" />
            <ellipse cx="160" cy="174" rx="130" ry="8" fill="#000" opacity="0.4" />
          </svg>
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.16)_0_1px,transparent_1px_3px)]" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.45)]" />
        </div>
      </div>
    </DeviceStage>
  )
}

function Dots() {
  return (
    <span className="flex shrink-0 gap-1.5" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
      <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
    </span>
  )
}
