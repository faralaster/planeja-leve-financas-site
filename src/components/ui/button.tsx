import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Layered gradient + inset-highlight depth inspired by cult-ui.com's texture-button (MIT),
// reimplemented as a single element so Radix Slot can correctly hoist an `asChild` <a>.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-b text-sm font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_1px_2px_rgba(23,60,53,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_6px_14px_rgba(23,60,53,0.3)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "from-green to-[#20493d] text-white",
        outline: "border border-line from-white/60 to-white/60 text-ink shadow-none hover:shadow-none",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        lg: "h-[52px] px-7 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
