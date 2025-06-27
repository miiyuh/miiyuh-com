// Enhanced gallery utilities for PayloadCMS integration
export interface CategoryGalleryData {
  category: string
  year?: string
  images: Array<{
    src: string
    title?: string
    description?: string
  }>
  total: number
  source: 'payloadcms' | 'fallback'
}

export const loadCategoryGallery = async (
  category: string,
  year?: string,
  featured?: boolean
): Promise<CategoryGalleryData> => {
  try {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (featured) params.append('featured', 'true')
    
    const url = `/api/gallery-frontend/${category}${params.toString() ? `?${params.toString()}` : ''}`
    
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'public, max-age=300'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch category gallery`)
    }
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error('API returned unsuccessful response')
    }
    
    return {
      category: result.category,
      year: result.year,
      images: result.data,
      total: result.total,
      source: result.source
    }
  } catch (error) {
    console.error(`❌ Error loading ${category} gallery:`, error)
    return {
      category,
      year,
      images: [],
      total: 0,
      source: 'fallback'
    }
  }
}

// Helper to get all available categories and years
export const getGalleryMetadata = async () => {
  try {
    const response = await fetch('/api/gallery-frontend/metadata', {
      headers: {
        'Cache-Control': 'public, max-age=600' // 10 minutes cache for metadata
      }
    })
    
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('❌ Error loading gallery metadata:', error)
  }
  
  // Fallback metadata
  return {
    categories: ['photography', 'artwork', 'digital-art'],
    years: [2022, 2023, 2024, 2025],
    subcategories: ['2025 japan trip', 'Attack on Titan', 'Genshin Impact']
  }
}
