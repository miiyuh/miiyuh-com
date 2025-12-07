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
          "relative inline-flex w-full min-w-36 select-none items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/4 backdrop-blur-md px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/5 text-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] outline-none ring-amber-300/30 transition-all pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 data-placeholder-shown:text-white/50 focus-visible:border-amber-300/70 focus-visible:ring-[3px] data-invalid:border-red-400/60 focus-visible:data-invalid:border-red-300/60 focus-visible:data-invalid:ring-red-300/40 data-disabled:pointer-events-none data-disabled:opacity-60 sm:text-sm [[data-disabled],:focus-visible,[data-invalid],[data-state=open]]:shadow-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:opacity-80",
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
            "relative block h-full rounded-xl border border-white/12 bg-[#0b0f1a]/95 backdrop-blur-xl text-white shadow-2xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-2px)] before:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]",
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
        "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-md py-1.5 ps-2 pe-4 text-base text-white/90 outline-none transition-colors data-disabled:pointer-events-none data-highlighted:bg-white/10 data-highlighted:text-white data-disabled:opacity-50 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
