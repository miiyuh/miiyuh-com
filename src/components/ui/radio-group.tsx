"use client";

import { RadioGroup as RadioGroupPrimitive } from "@ark-ui/react/radio-group";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-col gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

function Radio({
  className,
  value,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      value={value}
      className={cn(
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-background bg-clip-padding shadow-xs outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-disabled:opacity-64 data-invalid:border-destructive/36 focus-visible:data-invalid:border-destructive/64 focus-visible:data-invalid:ring-destructive/48 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=unchecked]:bg-input/32 dark:bg-clip-border dark:data-invalid:ring-destructive/24 [[data-disabled],[data-state=checked],[data-invalid]]:shadow-none",
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <RadioGroupPrimitive.ItemControl
        className="flex size-4 items-center justify-center rounded-full before:size-1.5 before:rounded-full before:bg-current data-[state=unchecked]:hidden"
        data-slot="radio-indicator"
      />
      <RadioGroupPrimitive.ItemHiddenInput />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, Radio, Radio as RadioGroupItem };
