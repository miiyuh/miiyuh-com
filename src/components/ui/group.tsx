import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const groupVariants = cva(
  "flex w-fit *:focus-visible:z-10 has-[>[data-slot=group]]:gap-2 *:has-focus-visible:z-10",
  {
    defaultVariants: {
      orientation: "horizontal",
    },
    variants: {
      orientation: {
        horizontal:
          "*:not-first:rounded-s-none *:not-last:rounded-e-none *:not-first:border-s-0 *:not-last:border-e-0",
        vertical:
          "flex-col *:not-first:rounded-t-none *:not-last:rounded-b-none *:not-first:border-t-0 *:not-last:border-b-0",
      },
    },
  },
)

interface GroupProps extends ComponentPropsWithoutRef<'div'> {
  orientation?: VariantProps<typeof groupVariants>['orientation']
  children: ReactNode
}

const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ className, orientation = 'horizontal', children, ...props }, ref) => {
    return (
      <div
        className={cn(groupVariants({ orientation }), className)}
        data-orientation={orientation}
        data-slot="group"
        role="group"
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Group.displayName = 'Group'

interface GroupTextProps extends ComponentPropsWithoutRef<'div'> {}

const GroupText = forwardRef<HTMLDivElement, GroupTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative inline-flex items-center whitespace-nowrap rounded-lg border border-border bg-muted bg-clip-padding px-[calc(var(--spacing)*3-1px)] font-medium text-sm shadow-xs outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] dark:bg-input/64 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
          className,
        )}
        data-slot="group-text"
        ref={ref}
        {...props}
      />
    )
  },
)
GroupText.displayName = 'GroupText'

interface GroupSeparatorProps extends ComponentPropsWithoutRef<typeof Separator> {}

const GroupSeparator = forwardRef<HTMLHRElement, GroupSeparatorProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <Separator
        className={cn(
          "relative z-20",
          className,
        )}
        orientation={orientation}
        ref={ref}
        {...props}
      />
    )
  },
)
GroupSeparator.displayName = 'GroupSeparator'

export {
  Group,
  Group as ButtonGroup,
  GroupText,
  GroupText as ButtonGroupText,
  GroupSeparator,
  GroupSeparator as ButtonGroupSeparator,
  groupVariants,
}
