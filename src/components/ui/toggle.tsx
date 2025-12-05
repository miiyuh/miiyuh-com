"use client";

import { Toggle as TogglePrimitive } from "@ark-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-sm outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:pointer-events-none data-disabled:opacity-64 data-pressed:bg-accent data-pressed:text-accent-foreground data-pressed:transition-none dark:data-pressed:bg-input/80 dark:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-8 min-w-8 px-[calc(--spacing(2)-1px)]",
        lg: "h-9 min-w-9 px-[calc(--spacing(2.5)-1px)]",
        sm: "h-7 min-w-7 px-[calc(--spacing(1.5)-1px)]",
      },
      variant: {
        default: "border-transparent",
        outline:
          "border-border bg-clip-padding shadow-xs dark:bg-input/32 dark:hover:bg-input/64 [&:is([data-disabled],:active,[data-pressed])]:shadow-none",
      },
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
