'use client'

import { Dialog as AlertDialogPrimitive } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import type { ComponentProps, ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

function AlertDialog(props: ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" role="alertdialog" {...props} />
}

function AlertDialogTrigger(props: ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  return <Portal>{children}</Portal>
}

function AlertDialogBackdrop({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Backdrop>) {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-all duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className,
      )}
      data-slot="alert-dialog-backdrop"
      {...props}
    />
  )
}

function AlertDialogPopup({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <Portal>
      <AlertDialogBackdrop />
      <AlertDialogPrimitive.Positioner className="fixed inset-0 z-50">
        <div className="grid h-dvh grid-rows-[1fr_auto] justify-items-center pt-6 max-sm:px-4 sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <AlertDialogPrimitive.Content
            className={cn(
              "relative row-start-2 grid w-full min-w-0 origin-top gap-4 border border-white/12 bg-bg-primary/95 backdrop-blur-xl p-6 text-white shadow-2xl will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[scale,opacity,translate] duration-200 ease-in-out max-sm:border-none max-sm:data-[state=closed]:opacity-0 max-sm:data-[state=open]:opacity-100 max-sm:data-[state=closed]:translate-y-4 max-sm:data-[state=open]:translate-y-0 max-sm:before:hidden sm:max-w-lg sm:rounded-2xl sm:data-[state=closed]:opacity-0 sm:data-[state=open]:opacity-100 sm:data-[state=closed]:scale-95 sm:data-[state=open]:scale-100 sm:before:rounded-[calc(var(--radius-2xl)-1px)]",
              className,
            )}
            data-slot="alert-dialog-popup"
            {...props}
          />
        </div>
      </AlertDialogPrimitive.Positioner>
    </Portal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-1 text-center sm:text-left', className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:border-t sm:border-white/10 sm:bg-white/3 sm:pt-4',
        className,
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      className={cn('font-semibold text-lg text-white', className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn('text-white/70 text-sm', className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  )
}

function AlertDialogClose(props: ComponentProps<typeof AlertDialogPrimitive.CloseTrigger>) {
  return (
    <AlertDialogPrimitive.CloseTrigger data-slot="alert-dialog-close" {...props} />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogBackdrop as AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogPopup as AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
}
