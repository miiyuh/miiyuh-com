"use client";

import { Accordion as AccordionPrimitive } from "@ark-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b last:border-b-0", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.ItemTrigger>) {
  return (
    <AccordionPrimitive.ItemTrigger
      className={cn(
        "flex flex-1 w-full cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
      <AccordionPrimitive.ItemIndicator>
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 opacity-72 transition-transform duration-200 ease-in-out" />
      </AccordionPrimitive.ItemIndicator>
    </AccordionPrimitive.ItemTrigger>
  );
}

function AccordionPanel({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.ItemContent>) {
  return (
    <AccordionPrimitive.ItemContent
      className="overflow-hidden text-muted-foreground text-sm transition-[height] duration-200 ease-in-out data-[state=closed]:animate-collapse data-[state=open]:animate-expand"
      data-slot="accordion-panel"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.ItemContent>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionPanel as AccordionContent,
};
