// Adapted from cult-ui.com's minimal-card (MIT license, github.com/nolly-studio/cult-ui):
// dropped the unused next/image import and the Image/Title/Description/Content/Footer
// sub-components we don't need, and recolored neutral-* shades to the project's tokens.
import * as React from "react"
import { cn } from "@/lib/utils"

const MinimalCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[24px] border border-line bg-white/70 p-5 shadow-sm transition-colors hover:bg-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
MinimalCard.displayName = "MinimalCard"

export { MinimalCard }
