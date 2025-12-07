"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@ark-ui/react/scroll-area";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  children,
  orientation,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  orientation?: "horizontal" | "vertical" | "both";
}) {
  return (
    <ScrollAreaPrimitive.Root className="min-h-0" {...props}>
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "size-full overscroll-contain rounded-[inherit] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#070707]",
          className,
        )}
        data-slot="scroll-area-viewport"
      >
        <ScrollAreaPrimitive.Content>
          {children}
        </ScrollAreaPrimitive.Content>
      </ScrollAreaPrimitive.Viewport>
      {orientation === "both" ? (
        <>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </>
      ) : (
        <ScrollBar orientation={orientation} />
      )}
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "m-0.5 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-hover:opacity-100 data-scrolling:opacity-100 data-hover:delay-0 data-scrolling:delay-0 data-hover:duration-100 data-scrolling:duration-100",
        className,
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative flex-1 rounded-full bg-white/20"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
