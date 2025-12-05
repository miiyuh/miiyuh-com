'use client'

import * as React from 'react'
import { Separator as BaseSeparator } from '@base-ui-components/react'
import { cn } from '@/lib/utils'

interface SeparatorProps extends React.ComponentProps<typeof BaseSeparator> {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={cn(
        'shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-auto w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
