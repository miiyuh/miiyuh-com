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
        "relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-sm outline-none transition-all before:pointer-events-none before:absolute before:inset-0 before:rounded-full focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#070707] data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-red-500/50 focus-visible:data-invalid:ring-red-500/50 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white",
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
