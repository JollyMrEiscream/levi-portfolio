import { assetPath } from "@/lib/base-path"

export function Grain() {
  return (
    <div
      className="grain pointer-events-none fixed inset-0 z-[96]"
      style={{ backgroundImage: `url(${assetPath("/media/grain.png")})` }}
      aria-hidden
    />
  )
}
