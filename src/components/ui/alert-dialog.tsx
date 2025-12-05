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
        "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
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
        <div className="flex h-dvh flex-col items-center overflow-hidden pt-6 max-sm:before:flex-1 sm:overflow-y-auto sm:p-4 sm:after:flex-1 sm:before:basis-[20vh]">
          <AlertDialogPrimitive.Content
            className={cn(
              "row-start-2 grid w-full min-w-0 origin-top gap-4 border bg-popover bg-clip-padding p-6 text-popover-foreground shadow-lg transition-all duration-200 ease-in-out will-change-transform max-sm:overflow-y-auto max-sm:border-none sm:max-w-lg sm:rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:bg-clip-border",
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
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
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
      className={cn('font-semibold text-lg', className)}
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
      className={cn('text-muted-foreground text-sm', className)}
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
