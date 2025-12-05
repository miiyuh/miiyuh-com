"use client";

import { Field as FieldPrimitive } from "@ark-ui/react/field";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Field({
  className,
  ...props
}: ComponentProps<typeof FieldPrimitive.Root>) {
  return (
    <FieldPrimitive.Root
      className={cn("flex flex-col items-start gap-2", className)}
      data-slot="field"
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Label
      className={cn("inline-flex items-center gap-2 text-sm/4", className)}
      data-slot="field-label"
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof FieldPrimitive.HelperText>) {
  return (
    <FieldPrimitive.HelperText
      className={cn("text-muted-foreground text-xs", className)}
      data-slot="field-description"
      {...props}
    />
  );
}

function FieldError({
  className,
  ...props
}: ComponentProps<typeof FieldPrimitive.ErrorText>) {
  return (
    <FieldPrimitive.ErrorText
      className={cn("text-destructive-foreground text-xs", className)}
      data-slot="field-error"
      {...props}
    />
  );
}

const FieldInput = FieldPrimitive.Input;

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldInput,
  FieldInput as FieldControl,
};
