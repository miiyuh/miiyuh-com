'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

interface ToolbarProps extends ComponentPropsWithoutRef<'div'> {
  orientation?: 'horizontal' | 'vertical'
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex gap-2 rounded-xl border bg-card bg-clip-padding p-1 text-card-foreground",
          orientation === 'vertical' && "flex-col",
          className,
        )}
        data-slot="toolbar"
        data-orientation={orientation}
        role="toolbar"
        ref={ref}
        {...props}
      />
    )
  },
)
Toolbar.displayName = 'Toolbar'

const ToolbarButton = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, type = 'button', ...props }, ref) => {
    return (
      <button
        className={cn(className)}
        data-slot="toolbar-button"
        type={type}
        ref={ref}
        {...props}
      />
    )
  },
)
ToolbarButton.displayName = 'ToolbarButton'

const ToolbarLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(
  ({ className, ...props }, ref) => {
    return (
      <a
        className={cn(className)}
        data-slot="toolbar-link"
        ref={ref}
        {...props}
      />
    )
  },
)
ToolbarLink.displayName = 'ToolbarLink'

const ToolbarInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(className)}
        data-slot="toolbar-input"
        ref={ref}
        {...props}
      />
    )
  },
)
ToolbarInput.displayName = 'ToolbarInput'

const ToolbarGroup = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center gap-1", className)}
        data-slot="toolbar-group"
        role="group"
        ref={ref}
        {...props}
      />
    )
  },
)
ToolbarGroup.displayName = 'ToolbarGroup'

interface ToolbarSeparatorProps extends ComponentPropsWithoutRef<'div'> {
  orientation?: 'horizontal' | 'vertical'
}

const ToolbarSeparator = forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, orientation = 'vertical', ...props }, ref) => {
    return (
      <div
        className={cn(
          "shrink-0 bg-border",
          orientation === 'horizontal' && "my-0.5 h-px w-full",
          orientation === 'vertical' && "mx-1.5 w-px self-stretch",
          className,
        )}
        data-slot="toolbar-separator"
        data-orientation={orientation}
        role="separator"
        ref={ref}
        {...props}
      />
    )
  },
)
ToolbarSeparator.displayName = 'ToolbarSeparator'

export {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarButton,
  ToolbarLink,
  ToolbarInput,
}
