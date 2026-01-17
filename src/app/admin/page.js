'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Check if already authenticated (simple session check)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      loadProducts()
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem('adminAuth', 'true')
        setIsAuthenticated(true)
        loadProducts()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to load products' }))
        console.error('API Error:', errorData)
        setError('Failed to load products. Please check your database connection.')
        setProducts([])
        return
      }
      
      const data = await response.json()
      
      // Check if data is an array
      if (Array.isArray(data)) {
        setProducts(data)
      } else if (data.error) {
        console.error('API returned error:', data.error)
        setError(data.error)
        setProducts([])
      } else {
        setProducts([])
      }
    } catch (error) {
      console.error('Error loading products:', error)
      setError('Failed to connect to server. Please check your connection and try again.')
      setProducts([])
    }
  }

  const handleSaveProduct = async (product) => {
    setLoading(true)
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      const data = await response.json()

      if (data.success) {
        await loadProducts()
        setEditingProduct(null)
        alert('Product updated successfully!')
      } else {
        alert('Failed to update product: ' + data.error)
      }
    } catch (error) {
      alert('Error updating product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (productId, file) => {
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadResponse.json()

      if (uploadData.success) {
        const product = products.find(p => p.id === productId)
        const updatedImages = [...(product.images || []), uploadData.filename]
        
        await handleSaveProduct({
          ...product,
          images: updatedImages,
        })
      } else {
        alert('Failed to upload image: ' + uploadData.error)
      }
    } catch (error) {
      alert('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async (productId, imageToRemove) => {
    const product = products.find(p => p.id === productId)
    const updatedImages = product.images.filter(img => img !== imageToRemove)
    
    await handleSaveProduct({
      ...product,
      images: updatedImages,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            Admin Panel
          </h1>
          <button
            onClick={() => {
              sessionStorage.removeItem('adminAuth')
              router.push('/')
            }}
            className="btn-secondary text-sm"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-600 mb-4">
            Manage your products: update prices, descriptions, and upload images.
          </p>
          <p className="text-sm text-gray-500">
            Note: Changes are saved to the Neon database and will persist after page refresh.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-red-800 mb-1">Error Loading Products</h3>
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={loadProducts}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {products.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-6">
              {editingProduct?.id === product.id ? (
                <EditProductForm
                  product={product}
                  onSave={handleSaveProduct}
                  onCancel={() => setEditingProduct(null)}
                  loading={loading}
                  onImageUpload={(file) => handleImageUpload(product.id, file)}
                  onRemoveImage={(image) => handleRemoveImage(product.id, image)}
                  uploading={uploading}
                />
              ) : (
                <ProductView
                  product={product}
                  onEdit={() => setEditingProduct(product)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductView({ product, onEdit }) {
  // Handle both regular image paths and data URLs
  const getImageSrc = (image) => {
    if (!image) return null
    // If it's a data URL (starts with "data:"), use it directly
    if (image.startsWith('data:')) return image
    // Otherwise, assume it's a filename in /products/
    return `/products/${image}`
  }

  const mainImage = product.images && product.images.length > 0 
    ? getImageSrc(product.images[0])
    : null

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            width={192}
            height={192}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.featured ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {product.featured ? 'Featured' : product.category}
          </span>
        </div>
        <p className="text-lg font-semibold text-primary-600 mb-2">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Images:</span>
          <span className="text-sm font-medium text-gray-700">{product.images?.length || 0}</span>
        </div>
        <button
          onClick={onEdit}
          className="btn-primary text-sm"
        >
          Edit Product
        </button>
      </div>
    </div>
  )
}

function EditProductForm({ product, onSave, onCancel, loading, onImageUpload, onRemoveImage, uploading }) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    featured: product.featured,
    tags: product.tags?.join(', ') || '',
  })

  // Update form data when product changes
  useEffect(() => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      featured: product.featured,
      tags: product.tags?.join(', ') || '',
    })
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSave({
      id: product.id,
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onImageUpload(file)
      e.target.value = '' // Reset input
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="Blouses">Blouses</option>
            <option value="Festive">Festive</option>
            <option value="Bridal">Bridal</option>
            <option value="New Arrivals">New Arrivals</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="silk, embroidered, elegant"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
            Featured Product
          </label>
        </div>
      </div>

      {/* Image Management */}
      <div className="border-t border-gray-200 pt-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Product Images ({product.images?.length || 0} images)
        </label>
        
        {/* Upload New Image */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-2">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          {uploading && (
            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
          )}
        </div>

        {/* Existing Images */}
        {product.images && product.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.map((image, index) => {
              // Handle both regular image paths and data URLs
              const imageSrc = image.startsWith('data:') ? image : `/products/${image}`
              return (
              <div key={index} className="relative group">
                <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized={image.startsWith('data:')} // Disable optimization for data URLs
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveImage(image)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
