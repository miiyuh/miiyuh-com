import { allLocaleRoutePaths } from '../../lib/locale'

type HookDoc = Record<string, unknown> | undefined | null

// Revalidates the doc's paths (and the previous doc's, so renamed slugs don't
// stay cached at their old URL) in every locale, plus any unstable_cache tags.
export function revalidateCollectionHooks(
  getPaths: (doc: HookDoc) => string[],
  options: { tags?: string[] } = {},
) {
  const hook = async ({ doc, previousDoc }: { doc?: HookDoc; previousDoc?: HookDoc }) => {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      const paths = new Set([...getPaths(doc), ...(previousDoc ? getPaths(previousDoc) : [])])
      for (const path of [...paths].flatMap(allLocaleRoutePaths)) {
        revalidatePath(path)
      }
      options.tags?.forEach((tag) => revalidateTag(tag, 'max'))
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
      for (const path of paths.flatMap(allLocaleRoutePaths)) {
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
