/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import { notFound } from 'next/navigation'

type Args = {
  params?: Promise<{
    segments: string[]
  }>
}

export default async function NotFound({ params }: Args) {
  notFound()
}
