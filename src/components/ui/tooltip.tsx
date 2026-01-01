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
    <TooltipPrimitive.Positioner className="z-100" data-slot="tooltip-positioner">
      <TooltipPrimitive.Content
        className={cn(
          "relative flex w-fit origin-(--transform-origin) text-balance rounded-lg border border-white/12 bg-[#0a0e18]/95 backdrop-blur-xl px-2.5 py-1.5 text-white text-xs shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] transition-[scale,opacity] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
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
