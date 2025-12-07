"use client";

import { Switch as SwitchPrimitive } from "@ark-ui/react/switch";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group/switch inline-flex shrink-0 items-center outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Control
        className={cn(
          "inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-white/12 p-0.5 shadow-inner transition-all focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#070707] data-[state=checked]:border-amber-500/50 data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-white/8",
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block size-4 rounded-full bg-white shadow-md transition-[translate,width] group-active/switch:w-5 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 data-[state=checked]:group-active/switch:translate-x-3",
          )}
          data-slot="switch-thumb"
        />
      </SwitchPrimitive.Control>
      <SwitchPrimitive.HiddenInput />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
