'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants, type Button } from '@/components/ui/button'

const Pagination = forwardRef<HTMLElement, ComponentPropsWithoutRef<'nav'>>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        aria-label="pagination"
        className={cn('mx-auto flex w-full justify-center', className)}
        data-slot="pagination"
        ref={ref}
        {...props}
      />
    )
  },
)
Pagination.displayName = 'Pagination'

const PaginationContent = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<'ul'>>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={cn('flex flex-row items-center gap-1', className)}
        data-slot="pagination-content"
        ref={ref}
        {...props}
      />
    )
  },
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  (props, ref) => {
    return <li data-slot="pagination-item" ref={ref} {...props} />
  },
)
PaginationItem.displayName = 'PaginationItem'

interface PaginationLinkProps extends ComponentPropsWithoutRef<'a'> {
  isActive?: boolean
  size?: ComponentPropsWithoutRef<typeof Button>['size']
  asChild?: boolean
}

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = 'icon', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          buttonVariants({
            size,
            variant: isActive ? 'outline' : 'ghost',
          }),
          className,
        )}
        data-active={isActive}
        data-slot="pagination-link"
        ref={ref}
        {...props}
      />
    )
  },
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <PaginationLink
        aria-label="Go to previous page"
        className={cn('max-sm:aspect-square max-sm:p-0', className)}
        size="default"
        ref={ref}
        {...props}
      >
        <ChevronLeftIcon className="sm:-ms-1" />
        <span className="max-sm:hidden">Previous</span>
      </PaginationLink>
    )
  },
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <PaginationLink
        aria-label="Go to next page"
        className={cn('max-sm:aspect-square max-sm:p-0', className)}
        size="default"
        ref={ref}
        {...props}
      >
        <span className="max-sm:hidden">Next</span>
        <ChevronRightIcon className="sm:-me-1" />
      </PaginationLink>
    )
  },
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        aria-hidden
        className={cn('flex min-w-7 justify-center', className)}
        data-slot="pagination-ellipsis"
        ref={ref}
        {...props}
      >
        <MoreHorizontalIcon className="size-4" />
        <span className="sr-only">More pages</span>
      </span>
    )
  },
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
