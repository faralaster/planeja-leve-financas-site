import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("mx-auto w-[min(1180px,calc(100%-40px))]", className)}>{children}</div>
}
