import Image from 'next/image'
import Link from 'next/link'
import Badge from './Badge'

export default function ProductCard({ product }) {
  const mainImage = product.images && product.images.length > 0 
    ? `/products/${product.images[0]}` 
    : '/placeholder-product.jpg'

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="card overflow-hidden group cursor-pointer h-full flex flex-col">
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{product.category}</Badge>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <div className="mt-auto">
            <p className="text-xl font-semibold text-primary-600">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
