"use client";

import { Popover as PopoverPrimitive } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

function PopoverTrigger(
  props: ComponentProps<typeof PopoverPrimitive.Trigger>
) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverPopup({
  children,
  className,
  tooltipStyle = false,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content> & {
  tooltipStyle?: boolean;
}) {
  return (
    <Portal>
      <PopoverPrimitive.Positioner
        className="z-100"
        data-slot="popover-positioner"
      >
        <PopoverPrimitive.Content
          className={cn(
            "relative flex origin-(--transform-origin) rounded-xl border border-white/12 bg-[#0a0e18]/95 backdrop-blur-xl text-white shadow-2xl transition-[scale,opacity] not-[class*='w-']:[min-w-80] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
            tooltipStyle &&
              "w-fit text-balance rounded-lg text-xs shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]",
            className,
          )}
          data-slot="popover-content"
          {...props}
        >
          <div
            className={cn(
              "max-h-(--available-height) w-full overflow-y-auto p-4 outline-none",
              tooltipStyle &&
                "px-[calc(--spacing(2)+1px)] py-[calc(--spacing(1)+1px)]",
            )}
          >
            {children}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Positioner>
    </Portal>
  );
}

function PopoverClose(
  props: ComponentProps<typeof PopoverPrimitive.CloseTrigger>
) {
  return (
    <PopoverPrimitive.CloseTrigger data-slot="popover-close" {...props} />
  );
}

function PopoverTitle({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Title>) {
  return (
    <PopoverPrimitive.Title
      className={cn("font-semibold text-lg text-white leading-none", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Description>) {
  return (
    <PopoverPrimitive.Description
      className={cn("text-white/70 text-sm", className)}
      data-slot="popover-description"
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverPopup,
  PopoverPopup as PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
};
