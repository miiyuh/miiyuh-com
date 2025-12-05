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
        "group/switch inline-flex shrink-0 items-center outline-none data-disabled:cursor-not-allowed data-disabled:opacity-64",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Control
        className={cn(
          "inset-shadow-[0_1px_--theme(--color-black/4%)] inline-flex h-4.5 w-7.5 shrink-0 items-center rounded-full p-px transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block size-4 rounded-full bg-background shadow-sm transition-[translate,width] group-active/switch:w-4.5 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0 data-[state=checked]:group-active/switch:translate-x-2.5",
          )}
          data-slot="switch-thumb"
        />
      </SwitchPrimitive.Control>
      <SwitchPrimitive.HiddenInput />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
