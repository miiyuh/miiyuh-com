'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
  size?: 'sm' | 'default' | 'lg' | number
  unstyled?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = 'default', unstyled = false, type, ...props }, ref) => {
    return (
      <span
        className={
          cn(
            !unstyled &&
              "relative inline-flex w-full rounded-lg border border-input bg-background bg-clip-padding text-base/5 shadow-xs ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] has-focus-visible:border-ring has-disabled:opacity-64 has-focus-visible:ring-[3px] has-aria-invalid:border-destructive/36 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 sm:text-sm dark:bg-input/32 dark:has-aria-invalid:ring-destructive/24",
            className,
          ) || undefined
        }
        data-size={size}
        data-slot="input-control"
      >
        <input
          type={type}
          className={cn(
            "w-full min-w-0 rounded-[inherit] px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*1.5-1px)] outline-none placeholder:text-muted-foreground/64 bg-transparent",
            size === 'sm' &&
              "px-[calc(var(--spacing)*2.5-1px)] py-[calc(var(--spacing)*1-1px)]",
            size === 'lg' && "py-[calc(var(--spacing)*2-1px)]",
            type === 'search' &&
              "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
            type === 'file' &&
              "text-muted-foreground file:me-3 file:bg-transparent file:font-medium file:text-foreground file:text-sm",
          )}
          data-slot="input"
          size={typeof size === 'number' ? size : undefined}
          ref={ref}
          {...props}
        />
      </span>
    )
  },
)
Input.displayName = 'Input'

export { Input, type InputProps }
