'use client'

import { Toast, Toaster, createToaster } from '@ark-ui/react/toast'
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  LoaderCircleIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

type ToastPosition =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'

const TOAST_ICONS = {
  error: CircleAlertIcon,
  info: InfoIcon,
  loading: LoaderCircleIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
} as const

const toastManager = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 12,
})

interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
}

function ToastProvider({
  children,
  position = 'bottom-end',
}: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster toaster={toastManager}>
        {(toast) => {
          const Icon = toast.type
            ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
            : null

          return (
            <Toast.Root
              key={toast.id}
              className={cn(
                "relative z-50 select-none rounded-xl border border-white/12 bg-[#0a0e18]/95 backdrop-blur-xl px-3.5 py-3 text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
              )}
            >
              <div className="flex items-center justify-between gap-1.5 text-sm">
                <div className="flex gap-2">
                  {Icon && (
                    <div
                      className="mt-0.5 [&>svg]:h-4 [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                      data-slot="toast-icon"
                    >
                      <Icon className={cn(
                        toast.type === 'loading' && "animate-spin opacity-72",
                        toast.type === 'error' && "text-destructive",
                        toast.type === 'info' && "text-info",
                        toast.type === 'success' && "text-success",
                        toast.type === 'warning' && "text-warning",
                      )} />
                    </div>
                  )}

                  <div className="flex flex-col gap-0.5">
                    <Toast.Title className="font-medium" data-slot="toast-title" />
                    <Toast.Description
                      className="text-white/60"
                      data-slot="toast-description"
                    />
                  </div>
                </div>
                <Toast.CloseTrigger
                  className={cn(
                    buttonVariants({ size: 'icon-xs', variant: 'ghost' }),
                    "shrink-0 opacity-72 hover:opacity-100",
                  )}
                >
                  <XIcon className="size-4" />
                </Toast.CloseTrigger>
              </div>
            </Toast.Root>
          )
        }}
      </Toaster>
    </>
  )
}

export { ToastProvider, type ToastPosition, toastManager }
