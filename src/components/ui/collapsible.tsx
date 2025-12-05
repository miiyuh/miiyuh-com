"use client";

import { Collapsible as CollapsiblePrimitive } from "@ark-ui/react/collapsible";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Collapsible(
  props: ComponentProps<typeof CollapsiblePrimitive.Root>
) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn("cursor-pointer", className)}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsiblePanel({
  className,
  ...props
}: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      className={cn(
        "h-(--height) overflow-hidden transition-[height] duration-200 data-[state=closed]:h-0",
        className,
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
  CollapsiblePanel as CollapsibleContent,
};
