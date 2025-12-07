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
              "relative inline-flex w-full rounded-xl border border-white/15 bg-white/4 backdrop-blur-md text-base/5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] ring-amber-300/30 transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-2px)] has-focus-visible:border-amber-300/70 has-disabled:opacity-60 has-focus-visible:ring-[3px] has-aria-invalid:border-red-400/60 has-focus-visible:has-aria-invalid:ring-red-300/40 sm:text-sm",
            className,
          ) || undefined
        }
        data-size={size}
        data-slot="input-control"
      >
        <input
          type={type}
          className={cn(
            "w-full min-w-0 rounded-[inherit] px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*1.5-1px)] outline-none bg-transparent text-white placeholder:text-white/50",
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
