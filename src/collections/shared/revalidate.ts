export function revalidateCollectionHooks(
  getPaths: (doc: Record<string, unknown> | undefined | null) => string[]
) {
  const hook = async ({ doc }: { doc?: Record<string, unknown> | null }) => {
    try {
      const { revalidatePath } = await import('next/cache')
      const paths = getPaths(doc)
      for (const path of paths) {
        revalidatePath(path)
      }
    } catch {
      // Ignore revalidation errors in non-Next contexts
    }
  }

  return {
    afterChange: [hook],
    afterDelete: [hook],
  }
}

export function revalidateGlobalHooks(...paths: string[]) {
  const hook = async () => {
    try {
      const { revalidatePath } = await import('next/cache')
      for (const path of paths) {
        revalidatePath(path)
      }
    } catch {
      // Ignore revalidation errors in non-Next contexts
    }
  }

  return {
    afterChange: [hook],
  }
}
