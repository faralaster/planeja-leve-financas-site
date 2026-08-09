import { cn } from "@/lib/utils"

export function ImagePlaceholder({
  label,
  aspect = "portrait",
  className,
}: {
  label: string
  aspect?: "portrait" | "square"
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        aspect === "portrait" ? "aspect-[3/4]" : "aspect-square",
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gold/60 bg-mint/40 p-4 text-center text-muted",
        className
      )}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5-11 11" />
      </svg>
      <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
    </div>
  )
}
