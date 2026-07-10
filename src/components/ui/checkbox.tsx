"use client";

import { Checkbox as CheckboxPrimitive } from "@ark-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/5 shadow-sm outline-none transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(0.375rem-1px)] focus-visible:ring-2 focus-visible:ring-accent-hover/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#070707] data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-red-500/50 focus-visible:data-invalid:ring-red-500/50 data-[state=checked]:border-accent-primary data-[state=checked]:bg-accent-primary data-[state=checked]:text-text-primary data-[state=indeterminate]:border-accent-primary data-[state=indeterminate]:bg-accent-primary data-[state=indeterminate]:text-text-primary",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Control className="flex items-center justify-center">
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <CheckIcon weight="bold" className="size-3" />
        </CheckboxPrimitive.Indicator>
        <CheckboxPrimitive.Indicator indeterminate className="flex items-center justify-center">
          <MinusIcon weight="bold" className="size-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
      <CheckboxPrimitive.HiddenInput />
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
