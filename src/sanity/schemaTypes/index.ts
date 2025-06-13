import { type SchemaTypeDefinition } from 'sanity'

import { post } from '../../../sanity/schemas/post'
import { category } from '../../../sanity/schemas/category'
import { tag } from '../../../sanity/schemas/tag'
import { authorType } from './authorType'
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, tag, authorType, blockContentType],
}
