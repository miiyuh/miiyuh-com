"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@ark-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { type toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  orientation = "horizontal",
  children,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        "flex w-fit *:focus-visible:z-10",
        orientation === "horizontal"
          ? "*:pointer-coarse:after:min-w-auto"
          : "*:pointer-coarse:after:min-h-auto",
        variant === "default"
          ? "gap-0.5"
          : orientation === "horizontal"
            ? "*:not-first:before:-start-[0.5px] *:not-last:before:-end-[0.5px] *:not-first:rounded-s-none *:not-last:rounded-e-none *:not-first:border-s-0 *:not-last:border-e-0 *:not-first:before:rounded-s-none *:not-last:before:rounded-e-none"
            : "*:not-first:before:-top-[0.5px] *:not-last:before:-bottom-[0.5px] flex-col *:not-first:rounded-t-none *:not-last:rounded-b-none *:not-first:border-t-0 *:not-last:border-b-0 *:not-last:before:hidden *:not-first:before:rounded-t-none *:not-last:before:rounded-b-none dark:*:last:before:hidden dark:*:first:before:block",
        className,
      )}
      data-size={size}
      data-slot="toggle-group"
      data-variant={variant}
      orientation={orientation}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ size, variant }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function Toggle({
  className,
  children,
  variant,
  size,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  const resolvedVariant = context.variant || variant;
  const resolvedSize = context.size || size;

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-sm outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:pointer-events-none data-disabled:opacity-64 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:transition-none dark:data-[state=on]:bg-input/80 dark:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        resolvedSize === "default" && "h-8 min-w-8 px-[calc(--spacing(2)-1px)]",
        resolvedSize === "lg" && "h-9 min-w-9 px-[calc(--spacing(2.5)-1px)]",
        resolvedSize === "sm" && "h-7 min-w-7 px-[calc(--spacing(1.5)-1px)]",
        resolvedVariant === "default" && "border-transparent",
        resolvedVariant === "outline" &&
          "border-border bg-clip-padding shadow-xs dark:bg-input/32 dark:hover:bg-input/64 [[data-disabled],:active,[data-state=on]]:shadow-none",
        className,
      )}
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

function ToggleGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: {
  className?: string;
} & React.ComponentProps<typeof Separator>) {
  return (
    <Separator className={className} orientation={orientation} {...props} />
  );
}

export { ToggleGroup, Toggle, Toggle as ToggleGroupItem, ToggleGroupSeparator };
