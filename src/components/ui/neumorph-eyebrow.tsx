// Adapted from cult-ui.com's neumorph-eyebrow (MIT license, github.com/nolly-studio/cult-ui):
// dropped the intent color-variant system (used blue/green shades outside the locked
// palette) and recolored the default variant to the project's gold/ink/paper tokens.
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function NeumorphEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-6 w-fit items-center rounded-full border border-gold/70 bg-paper px-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-[#6d5b31] shadow-[inset_0px_-2px_0px_0px_rgba(196,168,106,0.15),0px_1px_6px_0px_rgba(196,168,106,0.15)]",
        className
      )}
    >
      {children}
    </div>
  )
}
