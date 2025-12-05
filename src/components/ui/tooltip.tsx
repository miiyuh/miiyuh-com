"use client";

import { Tooltip as TooltipPrimitive } from "@ark-ui/react/tooltip";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => children;

const Tooltip = TooltipPrimitive.Root;

function TooltipTrigger({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipPopup({
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Positioner className="z-50" data-slot="tooltip-positioner">
      <TooltipPrimitive.Content
        className={cn(
          "relative flex w-fit origin-(--transform-origin) text-balance rounded-md border bg-[#070707] bg-clip-padding px-2 py-1 text-popover-foreground text-xs shadow-black/5 shadow-md transition-[scale,opacity] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:bg-clip-border",
          className,
        )}
        data-slot="tooltip-content"
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Positioner>
  );
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  TooltipPopup as TooltipContent,
};
