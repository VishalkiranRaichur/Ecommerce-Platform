// Product data loading - now uses Neon database via API
// Falls back to JSON file if database is unavailable

import productsData from './products.json'

// Try to fetch products from database API, fallback to JSON
async function fetchProductsFromAPI() {
  try {
    // For server-side rendering, use internal API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store' // Always fetch fresh data
    })
    
    if (response.ok) {
      const products = await response.json()
      return products
    }
  } catch (error) {
    console.error('Error fetching products from API:', error)
  }
  
  // Fallback to JSON file
  return productsData || []
}

// For server components (Next.js App Router)
export async function getProducts() {
  if (typeof window === 'undefined') {
    // Server-side: try API first, fallback to JSON
    try {
      const products = await fetchProductsFromAPI()
      if (products && products.length > 0) {
        return products
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  
  return productsData || []
}

// For client components - use API
export async function fetchProductsClient() {
  return await fetchProductsFromAPI()
}

// Legacy support - fallback to JSON for immediate rendering
export const products = productsData || []

export const categories = ['All', 'Blouses', 'Festive', 'Bridal', 'New Arrivals']

// Helper functions that work with products array
export const getProductBySlug = (slug, productsArray = products) => {
  return productsArray.find((product) => product.slug === slug)
}

export const getFeaturedProducts = (productsArray = products) => {
  return productsArray.filter((product) => product.featured)
}

export const getProductsByCategory = (category, productsArray = products) => {
  if (category === 'All') return productsArray
  return productsArray.filter((product) => product.category === category)
}

export const getSimilarProducts = (currentProductId, limit = 4, productsArray = products) => {
  const currentProduct = productsArray.find((p) => p.id === currentProductId)
  if (!currentProduct) return []

  return productsArray
    .filter((p) => p.id !== currentProductId && p.category === currentProduct.category)
    .slice(0, limit)
}

export const getProductById = (id, productsArray = products) => {
  return productsArray.find((product) => product.id === parseInt(id))
}
