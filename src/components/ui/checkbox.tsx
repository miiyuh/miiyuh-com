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
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input bg-background bg-clip-padding shadow-xs outline-none ring-ring transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(0.25rem-1px)] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-disabled:opacity-64 data-invalid:border-destructive/36 focus-visible:data-invalid:border-destructive/64 focus-visible:data-invalid:ring-destructive/48 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-foreground dark:data-[state=unchecked]:bg-input/32 dark:bg-clip-border dark:data-invalid:ring-destructive/24 [[data-disabled],[data-state=checked],[data-invalid]]:shadow-none",
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
