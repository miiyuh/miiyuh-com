import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

type FormProps = ComponentPropsWithoutRef<'form'>

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        className={cn('flex w-full flex-col gap-4', className)}
        data-slot="form"
        ref={ref}
        {...props}
      />
    )
  },
)
Form.displayName = 'Form'

export { Form }
