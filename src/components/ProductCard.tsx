'use client'
import Image from 'next/image'
import Link from 'next/link'
import Price from './Price'
import { Product } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {product.category === 'women' ? 'Эмэгтэй' : 'Эрэгтэй'}
        </div>
        <div className="font-semibold mt-1 text-gray-900 dark:text-gray-100">
          {product.title}
        </div>
        <Price amount={product.price} className="mt-2" />
      </div>
    </Link>
  )
}
