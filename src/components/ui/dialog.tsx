"use client";

import { Dialog as DialogPrimitive } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { XIcon } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

function DialogTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: ComponentProps<typeof Portal>) {
  return <Portal {...props} />;
}

function DialogClose(props: ComponentProps<typeof DialogPrimitive.CloseTrigger>) {
  return <DialogPrimitive.CloseTrigger data-slot="dialog-close" {...props} />;
}

function DialogBackdrop({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-all duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
        className,
      )}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

function DialogPopup({
  className,
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Positioner className="fixed inset-0 z-50">
        <div className="grid h-dvh grid-rows-[1fr_auto] justify-items-center pt-6 sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          <DialogPrimitive.Content
            className={cn(
              "sm:-translate-y-[calc(1.25rem*var(--nested-layer-count,0))] relative row-start-2 grid max-h-full w-full min-w-0 origin-top overflow-hidden border border-white/12 bg-[#0a0e18]/95 backdrop-blur-xl text-white opacity-[calc(1-0.1*var(--nested-layer-count,0))] shadow-2xl transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] **:has-[+[data-slot=dialog-footer]]:pb-4 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 max-sm:border-none max-sm:data-[state=closed]:translate-y-4 max-sm:data-[state=open]:translate-y-0 max-sm:before:hidden sm:max-w-lg sm:rounded-2xl sm:data-[state=closed]:scale-95 sm:data-[state=open]:scale-100 sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:has-[+[data-slot=dialog-footer]]:pb-6",
              className,
            )}
            data-slot="dialog-popup"
            {...props}
          >
            <div className="flex h-full flex-col overflow-y-auto">
              {children}
              {showCloseButton && (
                <DialogPrimitive.CloseTrigger className="absolute end-2 top-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent text-white/70 outline-none transition-[color,background-color,box-shadow,opacity] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-1 focus-visible:ring-offset-background [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.CloseTrigger>
              )}
            </div>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Positioner>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 px-6 pt-6 pb-4 text-center last:pb-6 sm:text-left",
        className,
      )}
      data-slot="dialog-header"
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 px-6 pb-4 sm:flex-row sm:justify-end sm:rounded-b-xl sm:border-t sm:border-white/10 sm:bg-white/3 sm:pt-4",
        className,
      )}
      data-slot="dialog-footer"
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-heading text-xl text-white leading-none", className)}
      data-slot="dialog-title"
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-white/70 text-sm", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogBackdrop,
  DialogBackdrop as DialogOverlay,
  DialogPopup,
  DialogPopup as DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
