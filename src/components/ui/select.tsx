"use client";

import { Portal } from "@ark-ui/react/portal";
import { Select as SelectPrimitive, createListCollection } from "@ark-ui/react/select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default" | "lg";
}) {
  return (
    <SelectPrimitive.Control>
      <SelectPrimitive.Trigger
        className={cn(
          "relative inline-flex w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg border border-input bg-background bg-clip-padding px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] data-placeholder-shown:text-muted-foreground text-base/5 shadow-xs outline-none ring-ring/24 transition-shadow pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:border-ring focus-visible:ring-[3px] data-invalid:border-destructive/36 focus-visible:data-invalid:border-destructive/64 focus-visible:data-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:text-sm dark:bg-input/32 dark:data-invalid:ring-destructive/24 [[data-disabled],:focus-visible,[data-invalid],[data-state=open]]:shadow-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:opacity-72",
          size === "sm" &&
            "gap-1.5 px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1)-1px)]",
          size === "lg" && "py-[calc(--spacing(2)-1px)]",
          className,
        )}
        data-slot="select-trigger"
        {...props}
      >
        {children}
        <SelectPrimitive.Indicator data-slot="select-icon">
          <ChevronsUpDownIcon className="-me-1 size-4 opacity-72" />
        </SelectPrimitive.Indicator>
      </SelectPrimitive.Trigger>
    </SelectPrimitive.Control>
  );
}

function SelectValue({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ValueText>) {
  return (
    <SelectPrimitive.ValueText
      className={cn("flex-1 truncate", className)}
      data-slot="select-value"
      {...props}
    />
  );
}

function SelectPopup({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <Portal>
      <SelectPrimitive.Positioner
        className="z-50 select-none"
        data-slot="select-positioner"
      >
        <SelectPrimitive.Content
          className={cn(
            "origin-(--transform-origin) transition-[scale,opacity] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
            "relative block h-full rounded-lg border bg-popover bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-lg dark:bg-clip-border",
            className,
          )}
          data-slot="select-popup"
          {...props}
        >
          <div
            className={cn(
              "max-h-(--available-height) min-w-(--reference-width) overflow-y-auto p-1",
            )}
            data-slot="select-list"
          >
            {children}
          </div>
        </SelectPrimitive.Content>
      </SelectPrimitive.Positioner>
    </Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-1">
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="col-start-2 min-w-0">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-2 my-1 h-px bg-border", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

function SelectGroup(props: ComponentProps<typeof SelectPrimitive.ItemGroup>) {
  return <SelectPrimitive.ItemGroup data-slot="select-group" {...props} />;
}

function SelectGroupLabel(
  props: ComponentProps<typeof SelectPrimitive.ItemGroupLabel>
) {
  return (
    <SelectPrimitive.ItemGroupLabel
      className="px-2 py-1.5 font-medium text-muted-foreground text-xs"
      data-slot="select-group-label"
      {...props}
    />
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectPopup as SelectContent,
  SelectItem,
  SelectSeparator,
  SelectGroup,
  SelectGroupLabel,
  createListCollection,
};
