'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  size?: 'sm' | 'default' | 'lg'
  unstyled?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size = 'default', unstyled = false, ...props }, ref) => {
    return (
      <span
        className={
          cn(
            !unstyled &&
              "relative inline-flex w-full rounded-lg border border-input bg-background bg-clip-padding text-base shadow-xs ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-disabled:opacity-64 has-focus-visible:ring-[3px] sm:text-sm dark:bg-input/32 dark:bg-clip-border dark:has-aria-invalid:ring-destructive/24",
            className,
          ) || undefined
        }
        data-size={size}
        data-slot="textarea-control"
      >
        <textarea
          className={cn(
            "min-h-18 w-full rounded-[inherit] px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*1.5-1px)] outline-none bg-transparent resize-y placeholder:text-muted-foreground/64",
            size === 'sm' &&
              "min-h-16 px-[calc(var(--spacing)*2.5-1px)] py-[calc(var(--spacing)*1-1px)]",
            size === 'lg' &&
              "min-h-20 py-[calc(var(--spacing)*2-1px)]",
          )}
          data-slot="textarea"
          ref={ref}
          {...props}
        />
      </span>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea, type TextareaProps }
