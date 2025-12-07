'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

const Breadcrumb = forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(
  (props, ref) => {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" ref={ref} {...props} />
  },
)
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        className={cn(
          'flex flex-wrap items-center gap-1.5 wrap-break-word text-white/60 text-sm sm:gap-2.5',
          className,
        )}
        data-slot="breadcrumb-list"
        ref={ref}
        {...props}
      />
    )
  },
)
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => {
    return (
      <li
        className={cn('inline-flex items-center gap-1.5', className)}
        data-slot="breadcrumb-item"
        ref={ref}
        {...props}
      />
    )
  },
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  asChild?: boolean
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        className={cn('transition-colors hover:text-white', className)}
        data-slot="breadcrumb-link"
        ref={ref}
        {...props}
      />
    )
  },
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        aria-current="page"
        aria-disabled="true"
        className={cn('font-normal text-white', className)}
        data-slot="breadcrumb-page"
        role="link"
        ref={ref}
        {...props}
      />
    )
  },
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        aria-hidden="true"
        className={cn('opacity-72 [&>svg]:size-4', className)}
        data-slot="breadcrumb-separator"
        role="presentation"
        ref={ref}
        {...props}
      >
        {children ?? <ChevronRight />}
      </li>
    )
  },
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        aria-hidden="true"
        className={className}
        data-slot="breadcrumb-ellipsis"
        role="presentation"
        ref={ref}
        {...props}
      >
        <MoreHorizontal className="size-4" />
        <span className="sr-only">More</span>
      </span>
    )
  },
)
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
