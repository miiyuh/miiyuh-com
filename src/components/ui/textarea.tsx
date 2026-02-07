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
              "relative inline-flex w-full rounded-xl border border-white/15 bg-white/4 backdrop-blur-md text-base shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] ring-amber-300/30 transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-2px)] has-focus-visible:has-aria-invalid:border-red-400/60 has-focus-visible:has-aria-invalid:ring-red-300/40 has-aria-invalid:border-red-400/60 has-focus-visible:border-amber-300/70 has-disabled:opacity-60 has-focus-visible:ring-[3px] sm:text-sm",
            className,
          ) || undefined
        }
        data-size={size}
        data-slot="textarea-control"
      >
        <textarea
          className={cn(
            "min-h-18 w-full rounded-[inherit] px-[calc(var(--spacing)*3-1px)] py-[calc(var(--spacing)*1.5-1px)] outline-none bg-transparent resize-y text-white placeholder:text-white/50",
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
