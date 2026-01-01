"use client";

import { Checkbox as CheckboxPrimitive } from "@ark-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/5 shadow-sm outline-none transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(0.375rem-1px)] focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#070707] data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-red-500/50 focus-visible:data-invalid:ring-red-500/50 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white data-[state=indeterminate]:border-amber-500 data-[state=indeterminate]:bg-amber-500 data-[state=indeterminate]:text-white",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Control className="flex items-center justify-center">
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <CheckIcon className="size-3" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
        <CheckboxPrimitive.Indicator indeterminate className="flex items-center justify-center">
          <MinusIcon className="size-3" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
      <CheckboxPrimitive.HiddenInput />
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
