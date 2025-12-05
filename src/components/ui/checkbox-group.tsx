'use client'

import { Checkbox } from '@ark-ui/react/checkbox'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

interface CheckboxGroupProps extends ComponentPropsWithoutRef<'div'> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('flex flex-col items-start gap-3', className)}
        role="group"
        data-slot="checkbox-group"
        ref={ref}
        {...props}
      />
    )
  },
)
CheckboxGroup.displayName = 'CheckboxGroup'

export { CheckboxGroup }
