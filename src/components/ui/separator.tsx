'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SeparatorProps extends React.ComponentProps<'div'> {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'shrink-0 bg-white/12',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-auto w-px',
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
