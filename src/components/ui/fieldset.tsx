"use client";

import { Fieldset as FieldsetPrimitive } from "@ark-ui/react/fieldset";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Fieldset({
  className,
  ...props
}: ComponentProps<typeof FieldsetPrimitive.Root>) {
  return (
    <FieldsetPrimitive.Root
      className={cn("flex w-full max-w-64 flex-col gap-6", className)}
      data-slot="fieldset"
      {...props}
    />
  );
}

function FieldsetLegend({
  className,
  ...props
}: ComponentProps<typeof FieldsetPrimitive.Legend>) {
  return (
    <FieldsetPrimitive.Legend
      className={cn("font-semibold", className)}
      data-slot="fieldset-legend"
      {...props}
    />
  );
}

export { Fieldset, FieldsetLegend };
