'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border font-medium outline-none transition-all focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 [&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
        sm: "px-1.5 py-0.5 text-[.625rem]",
      },
      variant: {
        default:
          "border-white/70 bg-white text-black hover:bg-white/90",
        destructive:
          "border-red-400/50 bg-red-500/20 text-red-300 hover:bg-red-500/30",
        error:
          "border-red-400/30 bg-red-500/15 text-red-300",
        info: "border-sky-400/30 bg-sky-500/15 text-sky-300",
        outline:
          "border-white/30 bg-transparent text-white hover:bg-white/10",
        secondary:
          "border-white/15 bg-white/10 text-white hover:bg-white/15",
        success: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
        warning: "border-amber-400/30 bg-amber-500/15 text-amber-300",
      },
    },
  },
)

interface BadgeProps
  extends ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'
    return (
      <Comp
        className={cn(badgeVariants({ className, size, variant }))}
        data-slot="badge"
        ref={ref}
        {...props}
      />
    )
  },
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
