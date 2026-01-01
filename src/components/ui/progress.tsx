"use client";

import { Progress as ProgressPrimitive } from "@ark-ui/react/progress";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Progress({
  className,
  children,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn("flex w-full flex-col gap-2", className)}
      data-slot="progress"
      {...props}
    >
      {children ? (
        children
      ) : (
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  );
}

function ProgressLabel({
  className,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Label>) {
  return (
    <ProgressPrimitive.Label
      className={cn("font-medium text-sm", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

function ProgressTrack({
  className,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Track>) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "block h-2 w-full overflow-hidden rounded-full bg-white/12 border border-white/8",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Range>) {
  return (
    <ProgressPrimitive.Range
      className={cn("h-full bg-linear-to-r from-amber-400 to-orange-500 transition-all duration-500 rounded-full", className)}
      data-slot="progress-indicator"
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: ComponentProps<typeof ProgressPrimitive.ValueText>) {
  return (
    <ProgressPrimitive.ValueText
      className={cn("text-sm tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressLabel,
  ProgressTrack,
  ProgressIndicator,
  ProgressValue,
};
