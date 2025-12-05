'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

interface MeterProps extends ComponentPropsWithoutRef<'div'> {
  value?: number
  min?: number
  max?: number
  children?: React.ReactNode
}

const Meter = forwardRef<HTMLDivElement, MeterProps>(
  ({ className, value = 0, min = 0, max = 100, children, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100

    return (
      <div
        className={cn('flex w-full flex-col gap-2', className)}
        data-slot="meter"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        ref={ref}
        {...props}
      >
        {children ? (
          children
        ) : (
          <MeterTrack>
            <MeterIndicator style={{ width: `${percentage}%` }} />
          </MeterTrack>
        )}
      </div>
    )
  },
)
Meter.displayName = 'Meter'

interface MeterLabelProps extends ComponentPropsWithoutRef<'span'> {}

const MeterLabel = forwardRef<HTMLSpanElement, MeterLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn('font-medium text-sm', className)}
        data-slot="meter-label"
        ref={ref}
        {...props}
      />
    )
  },
)
MeterLabel.displayName = 'MeterLabel'

interface MeterTrackProps extends ComponentPropsWithoutRef<'div'> {}

const MeterTrack = forwardRef<HTMLDivElement, MeterTrackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('block h-2 w-full overflow-hidden rounded-full bg-input', className)}
        data-slot="meter-track"
        ref={ref}
        {...props}
      />
    )
  },
)
MeterTrack.displayName = 'MeterTrack'

interface MeterIndicatorProps extends ComponentPropsWithoutRef<'div'> {}

const MeterIndicator = forwardRef<HTMLDivElement, MeterIndicatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('h-full bg-primary transition-all duration-500', className)}
        data-slot="meter-indicator"
        ref={ref}
        {...props}
      />
    )
  },
)
MeterIndicator.displayName = 'MeterIndicator'

interface MeterValueProps extends ComponentPropsWithoutRef<'span'> {}

const MeterValue = forwardRef<HTMLSpanElement, MeterValueProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn('text-sm tabular-nums', className)}
        data-slot="meter-value"
        ref={ref}
        {...props}
      />
    )
  },
)
MeterValue.displayName = 'MeterValue'

export { Meter, MeterLabel, MeterTrack, MeterIndicator, MeterValue }
