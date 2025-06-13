// Script to add initial blog categories
import { sanity } from '../lib/sanity'

const categories = [
  {
    _type: 'category',
    title: 'Attack on Titan',
    slug: {
      _type: 'slug',
      current: 'attack-on-titan'
    },
    description: 'My thoughts and analyses of Attack on Titan characters, plot, and themes',
    color: '#dc2626'
  },
  {
    _type: 'category',
    title: 'Photography',
    slug: {
      _type: 'slug',
      current: 'photography'
    },
    description: 'Stories behind my photos and photography techniques',
    color: '#2563eb'
  },
  {
    _type: 'category',
    title: 'Coding',
    slug: {
      _type: 'slug',
      current: 'coding'
    },
    description: 'My learning journey in programming and development',
    color: '#16a34a'
  },
  {
    _type: 'category',
    title: 'Personal',
    slug: {
      _type: 'slug',
      current: 'personal'
    },
    description: 'Personal reflections and life experiences',
    color: '#9333ea'
  }
]

async function createCategories() {
  try {
    console.log('Creating initial categories...')
      for (const category of categories) {
      await sanity.create(category)
      console.log(`Created category: ${category.title}`)
    }
    
    console.log('✅ All categories created successfully!')
  } catch (error) {
    console.error('Error creating categories:', error)
  }
}

createCategories()
