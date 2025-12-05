"use client";

import { NumberInput as NumberInputPrimitive } from "@ark-ui/react/number-input";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { ComponentProps } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const NumberFieldContext = React.createContext<{
  fieldId: string;
} | null>(null);

function NumberField({
  id,
  className,
  size = "default",
  ...props
}: ComponentProps<typeof NumberInputPrimitive.Root> & {
  size?: "sm" | "default" | "lg";
}) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;

  return (
    <NumberFieldContext.Provider value={{ fieldId }}>
      <NumberInputPrimitive.Root
        className={cn("flex w-full flex-col items-start gap-2", className)}
        data-size={size}
        data-slot="number-field"
        id={fieldId}
        {...props}
      />
    </NumberFieldContext.Provider>
  );
}

function NumberFieldGroup({
  className,
  ...props
}: ComponentProps<typeof NumberInputPrimitive.Control>) {
  return (
    <NumberInputPrimitive.Control
      className={cn(
        "relative flex w-full justify-between rounded-lg border border-input bg-background bg-clip-padding text-sm shadow-xs ring-ring/24 transition-shadow focus-within:border-ring focus-within:ring-[3px] data-invalid:border-destructive/36 focus-within:data-invalid:border-destructive/64 focus-within:data-invalid:ring-destructive/48 data-disabled:pointer-events-none data-disabled:opacity-64 dark:bg-input/32 dark:data-invalid:ring-destructive/24 [[data-disabled],:focus-within,[data-invalid]]:shadow-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="number-field-group"
      {...props}
    />
  );
}

function NumberFieldDecrement({
  className,
  ...props
}: ComponentProps<typeof NumberInputPrimitive.DecrementTrigger>) {
  return (
    <NumberInputPrimitive.DecrementTrigger
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-s-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent",
        className,
      )}
      data-slot="number-field-decrement"
      {...props}
    >
      <MinusIcon />
    </NumberInputPrimitive.DecrementTrigger>
  );
}

function NumberFieldIncrement({
  className,
  ...props
}: ComponentProps<typeof NumberInputPrimitive.IncrementTrigger>) {
  return (
    <NumberInputPrimitive.IncrementTrigger
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center justify-center rounded-e-[calc(var(--radius-lg)-1px)] in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent",
        className,
      )}
      data-slot="number-field-increment"
      {...props}
    >
      <PlusIcon />
    </NumberInputPrimitive.IncrementTrigger>
  );
}

function NumberFieldInput({
  className,
  ...props
}: ComponentProps<typeof NumberInputPrimitive.Input>) {
  return (
    <NumberInputPrimitive.Input
      className={cn(
        "w-full min-w-0 flex-1 bg-transparent in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] px-[calc(--spacing(3)-1px)] in-data-[size=lg]:py-[calc(--spacing(2)-1px)] in-data-[size=sm]:py-[calc(--spacing(1)-1px)] py-[calc(--spacing(1.5)-1px)] text-center tabular-nums outline-none",
        className,
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

function NumberFieldScrubArea({
  className,
  label,
  ...props
}: ComponentProps<typeof NumberInputPrimitive.Scrubber> & {
  label: string;
}) {
  const context = React.useContext(NumberFieldContext);

  if (!context) {
    throw new Error(
      "NumberFieldScrubArea must be used within a NumberField component for accessibility.",
    );
  }

  return (
    <NumberInputPrimitive.Scrubber
      className={cn("flex cursor-ew-resize", className)}
      data-slot="number-field-scrub-area"
      {...props}
    >
      <Label className="cursor-ew-resize" htmlFor={context.fieldId}>
        {label}
      </Label>
    </NumberInputPrimitive.Scrubber>
  );
}

export {
  NumberField,
  NumberFieldScrubArea,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldGroup,
  NumberFieldInput,
};
