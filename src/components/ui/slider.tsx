"use client";

import { Slider as SliderPrimitive } from "@ark-ui/react/slider";
import type { ComponentProps } from "react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);

  return (
    <SliderPrimitive.Root
      className="data-[orientation=horizontal]:w-full"
      defaultValue={defaultValue}
      max={max}
      min={min}
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className={cn(
          "flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",
          className,
        )}
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="relative grow select-none overflow-hidden rounded-full bg-white/12 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5"
          data-slot="slider-track"
        >
          <SliderPrimitive.Range
            className="select-none rounded-full bg-linear-to-r from-amber-400 via-yellow-500 to-orange-500"
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              className="block size-4 shrink-0 select-none rounded-full border border-white/70 bg-white shadow-sm outline-none transition-shadow focus-visible:ring-[3px] focus-visible:ring-amber-400/50 data-dragging:ring-[3px] data-dragging:ring-amber-400/60"
              data-slot="slider-thumb"
              index={index}
              key={String(index)}
            >
              <SliderPrimitive.HiddenInput />
            </SliderPrimitive.Thumb>
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

function SliderValue({
  className,
  ...props
}: ComponentProps<typeof SliderPrimitive.ValueText>) {
  return (
    <SliderPrimitive.ValueText
      className={cn("flex justify-end text-sm", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { Slider, SliderValue };
