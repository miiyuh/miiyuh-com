'use client'

import { Dialog as SheetPrimitive } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { cva, type VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

const Sheet = SheetPrimitive.Root

function SheetTrigger(props: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal({ children }: { children: React.ReactNode }) {
  return <Portal>{children}</Portal>
}

function SheetClose(props: ComponentProps<typeof SheetPrimitive.CloseTrigger>) {
  return <SheetPrimitive.CloseTrigger data-slot="sheet-close" {...props} />
}

const sheetPopupVariants = cva(
  "fixed z-50 flex flex-col gap-4 overflow-y-auto bg-popover text-popover-foreground shadow-lg transition-all duration-300 ease-in-out will-change-transform [--sheet-inset:0px] data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    defaultVariants: {
      inset: false,
      side: 'right',
    },
    variants: {
      inset: {
        true: 'sm:rounded-xl sm:[--sheet-inset:1rem]',
      },
      side: {
        bottom:
          "inset-x-[var(--sheet-inset)] bottom-[var(--sheet-inset)] h-auto max-h-[calc(100dvh-var(--sheet-inset)*2)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-[var(--sheet-inset)] left-[var(--sheet-inset)] h-dvh w-[calc(100%-3rem)] max-w-sm sm:h-[calc(100dvh-var(--sheet-inset)*2)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "inset-y-[var(--sheet-inset)] right-[var(--sheet-inset)] h-dvh w-[calc(100%-3rem)] max-w-sm sm:h-[calc(100dvh-var(--sheet-inset)*2)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        top: "inset-x-[var(--sheet-inset)] top-[var(--sheet-inset)] h-auto max-h-[calc(100dvh-var(--sheet-inset)*2)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      },
    },
  },
)

function SheetBackdrop({ className, ...props }: ComponentProps<typeof SheetPrimitive.Backdrop>) {
  return (
    <SheetPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className,
      )}
      data-slot="sheet-backdrop"
      {...props}
    />
  )
}

function SheetPopup({
  className,
  children,
  showCloseButton = true,
  side = 'right',
  inset = false,
  ...props
}: ComponentProps<typeof SheetPrimitive.Content> & {
  showCloseButton?: boolean
} & VariantProps<typeof sheetPopupVariants>) {
  return (
    <Portal>
      <SheetBackdrop />
      <SheetPrimitive.Positioner className="fixed inset-0 z-50">
        <SheetPrimitive.Content
          className={cn(sheetPopupVariants({ inset, side }), className)}
          data-slot="sheet-popup"
          {...props}
        >
          {children}
          {showCloseButton && (
            <SheetPrimitive.CloseTrigger className="absolute end-2 top-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-72 outline-none transition-[color,background-color,box-shadow,opacity] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
              <XIcon />
              <span className="sr-only">Close</span>
            </SheetPrimitive.CloseTrigger>
          )}
        </SheetPrimitive.Content>
      </SheetPrimitive.Positioner>
    </Portal>
  )
}

function SheetHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 p-4', className)}
      data-slot="sheet-header"
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      data-slot="sheet-footer"
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn('font-semibold', className)}
      data-slot="sheet-title"
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="sheet-description"
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetClose,
  SheetBackdrop,
  SheetBackdrop as SheetOverlay,
  SheetPopup,
  SheetPopup as SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetPopupVariants,
}
