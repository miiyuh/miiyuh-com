'use client'

import { Combobox as ComboboxPrimitive, useListCollection } from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { ChevronsUpDownIcon, XIcon, CheckIcon } from 'lucide-react'
import * as React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

// Re-export useListCollection for convenience
export { useListCollection }

const ComboboxContext = React.createContext<{
  multiple: boolean
}>({
  multiple: false,
})

interface ComboboxRootProps<T> extends ComponentProps<typeof ComboboxPrimitive.Root<T>> {}

function Combobox<T>(props: ComboboxRootProps<T>) {
  return (
    <ComboboxContext.Provider value={{ multiple: !!props.multiple }}>
      <ComboboxPrimitive.Root<T> {...props} />
    </ComboboxContext.Provider>
  )
}

interface ComboboxControlProps extends ComponentProps<typeof ComboboxPrimitive.Control> {
  showTrigger?: boolean
  showClear?: boolean
  size?: 'sm' | 'default' | 'lg'
}

function ComboboxControl({
  className,
  showTrigger = true,
  showClear = false,
  size = 'default',
  children,
  ...props
}: ComboboxControlProps) {
  return (
    <ComboboxPrimitive.Control
      className={cn('relative w-full', className)}
      data-slot="combobox-control"
      {...props}
    >
      {children}
      {showTrigger && (
        <ComboboxTrigger
          className={cn(
            "-translate-y-1/2 absolute top-1/2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-72 outline-none transition-opacity hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
            size === 'sm' ? 'end-0' : 'end-0.5',
            showClear && 'hidden',
          )}
        >
          <ChevronsUpDownIcon />
        </ComboboxTrigger>
      )}
      {showClear && (
        <ComboboxClearTrigger
          className={cn(
            "-translate-y-1/2 absolute top-1/2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-72 outline-none transition-opacity hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
            size === 'sm' ? 'end-0' : 'end-0.5',
          )}
        >
          <XIcon />
        </ComboboxClearTrigger>
      )}
    </ComboboxPrimitive.Control>
  )
}

interface ComboboxInputProps extends Omit<ComponentProps<typeof ComboboxPrimitive.Input>, 'size'> {
  size?: 'sm' | 'default' | 'lg'
}

function ComboboxInput({
  className,
  size = 'default',
  ...props
}: ComboboxInputProps) {
  return (
    <ComboboxPrimitive.Input
      className={cn(
        "w-full min-w-0 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-base text-white outline-none ring-amber-400/30 transition-all placeholder:text-white/40 focus:border-white/20 focus:bg-white/8 focus:ring-2 sm:text-sm",
        size === 'sm' && "px-2.5 py-1",
        size === 'lg' && "py-2.5",
        className,
      )}
      data-slot="combobox-input"
      {...props}
    />
  )
}

function ComboboxTrigger({
  className,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  return (
    <ComboboxPrimitive.Trigger
      className={className}
      data-slot="combobox-trigger"
      {...props}
    />
  )
}

function ComboboxClearTrigger({
  className,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.ClearTrigger>) {
  return (
    <ComboboxPrimitive.ClearTrigger
      className={className}
      data-slot="combobox-clear"
      {...props}
    />
  )
}

interface ComboboxContentProps extends ComponentProps<typeof ComboboxPrimitive.Content> {}

function ComboboxContent({
  className,
  children,
  ...props
}: ComboboxContentProps) {
  return (
    <Portal>
      <ComboboxPrimitive.Positioner className="z-50">
        <ComboboxPrimitive.Content
          className={cn(
            "relative flex max-h-[min(var(--available-height),23rem)] w-(--reference-width) min-w-32 origin-(--transform-origin) flex-col overflow-hidden rounded-xl border border-white/12 bg-[#0a0e18]/95 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className,
          )}
          data-slot="combobox-content"
          {...props}
        >
          {children}
        </ComboboxPrimitive.Content>
      </ComboboxPrimitive.Positioner>
    </Portal>
  )
}

// Alias for backwards compatibility
const ComboboxPopup = ComboboxContent

interface ComboboxItemProps extends ComponentProps<typeof ComboboxPrimitive.Item> {}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxItemProps) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-white/90 outline-none transition-colors data-highlighted:bg-white/8 data-highlighted:text-white data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      data-slot="combobox-item"
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
      <ComboboxPrimitive.ItemText className="pl-6">{children}</ComboboxPrimitive.ItemText>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxItemGroup({
  className,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.ItemGroup>) {
  return (
    <ComboboxPrimitive.ItemGroup
      className={cn("overflow-hidden p-1", className)}
      data-slot="combobox-group"
      {...props}
    />
  )
}

function ComboboxItemGroupLabel({
  className,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>) {
  return (
    <ComboboxPrimitive.ItemGroupLabel
      className={cn(
        "px-2.5 py-1.5 font-medium text-white/50 text-xs",
        className,
      )}
      data-slot="combobox-group-label"
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComponentProps<typeof ComboboxPrimitive.Label>) {
  return (
    <ComboboxPrimitive.Label
      className={cn("font-medium text-sm", className)}
      data-slot="combobox-label"
      {...props}
    />
  )
}

// Legacy exports for compatibility
const ComboboxGroup = ComboboxItemGroup
const ComboboxGroupLabel = ComboboxItemGroupLabel
const ComboboxList = ({ children, className, ...props }: ComponentProps<'div'>) => (
  <div className={cn("overflow-y-auto", className)} {...props}>{children}</div>
)

export {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxPopup,
  ComboboxItem,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxLabel,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxList,
}
