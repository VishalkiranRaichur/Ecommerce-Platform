'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getProductBySlug, getSimilarProducts } from '@/data/products'
import Badge from '@/components/Badge'
import ProductCard from '@/components/ProductCard'
import WhatsAppButton from '@/components/WhatsAppButton'
import InstagramButton from '@/components/InstagramButton'

export default function ProductDetailPage({ params }) {
  const router = useRouter()
  const product = getProductBySlug(params.slug)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (!product) {
      router.push('/not-found')
    }
  }, [product, router])

  if (!product) {
    return null
  }

  const images = product.images && product.images.length > 0 
    ? product.images.map(img => `/products/${img}`)
    : ['/placeholder-product.jpg']

  const similarProducts = getSimilarProducts(product.id, 4)

  const formatWhatsAppMessage = () => {
    const productUrl = typeof window !== 'undefined' 
      ? window.location.href 
      : ''
    return `Hi! I'm interested in:\n\n${product.name}\nPrice: ₹${product.price.toLocaleString('en-IN')}\nLink: ${productUrl}`
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary-600' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <Badge variant="primary">{product.category}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="mb-6">
              <p className="text-3xl font-semibold text-primary-600">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <WhatsAppButton
                phoneNumber="+917795855292"
                product={product}
                className="flex-1 justify-center"
              />
              <InstagramButton
                username="sujatha.m798"
                className="flex-1 justify-center"
              />
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Premium quality fabrics and materials</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy returns within 7 days</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fast and secure shipping nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
