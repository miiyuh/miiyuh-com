'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border bg-clip-padding font-medium text-sm outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default:
          "min-h-8 px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*1.5-1px)]",
        icon: "size-8",
        "icon-lg": "size-9",
        "icon-sm": "size-7",
        "icon-xl": "size-10 [&_svg:not([class*='size-'])]:size-4.5",
        "icon-xs":
          "size-6 rounded-md before:rounded-[calc(var(--radius-md)-1px)]",
        lg: "min-h-9 px-[calc(var(--spacing)*3.5-1px)] py-[calc(var(--spacing)*2-1px)]",
        sm: "min-h-7 gap-1.5 px-[calc(var(--spacing)*2.5-1px)] py-[calc(var(--spacing)*1-1px)]",
        xl: "min-h-10 px-[calc(var(--spacing)*4-1px)] py-[calc(var(--spacing)*2-1px)] text-base [&_svg:not([class*='size-'])]:size-4.5",
        xs: "min-h-6 gap-1 rounded-md px-[calc(var(--spacing)*2-1px)] py-[calc(var(--spacing)*1-1px)] text-xs before:rounded-[calc(var(--radius-md)-1px)] [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:shadow-none data-pressed:shadow-none",
        destructive:
          "border-destructive bg-destructive text-white shadow-xs hover:bg-destructive/90 active:shadow-none data-pressed:shadow-none",
        "destructive-outline":
          "border-border bg-transparent text-destructive-foreground shadow-xs hover:border-destructive/32 hover:bg-destructive/4 data-pressed:border-destructive/32 data-pressed:bg-destructive/4 dark:bg-input/32",
        ghost: "border-transparent hover:bg-accent data-pressed:bg-accent",
        link: "border-transparent underline-offset-4 hover:underline",
        outline:
          "border-border bg-background shadow-xs hover:bg-accent/50 data-pressed:bg-accent/50 dark:bg-input/32 dark:hover:bg-input/64 dark:data-pressed:bg-input/64",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 data-pressed:bg-secondary/90",
      },
    },
  },
)

interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        data-slot="button"
        type={asChild ? undefined : type}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
