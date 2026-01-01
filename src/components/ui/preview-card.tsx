'use client'

import { HoverCard as PreviewCardPrimitive } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

const PreviewCard = PreviewCardPrimitive.Root

function PreviewCardTrigger({ ...props }: ComponentProps<typeof PreviewCardPrimitive.Trigger>) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  )
}

function PreviewCardPopup({
  className,
  children,
  ...props
}: ComponentProps<typeof PreviewCardPrimitive.Content>) {
  return (
    <Portal>
      <PreviewCardPrimitive.Positioner className="z-50">
        <PreviewCardPrimitive.Content
          className={cn(
            "relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-clip-border",
            className,
          )}
          data-slot="preview-card-content"
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Content>
      </PreviewCardPrimitive.Positioner>
    </Portal>
  )
}

export {
  PreviewCard,
  PreviewCard as HoverCard,
  PreviewCardTrigger,
  PreviewCardTrigger as HoverCardTrigger,
  PreviewCardPopup,
  PreviewCardPopup as HoverCardContent,
}
