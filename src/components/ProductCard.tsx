'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="block rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full aspect-[4/5]">
        {product.images[0] && (
          <Image
            src={`http://173.212.216.102:5000${product.images[0]}`} // server-ийн full path
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-2">
        <h3 className="font-semibold">{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </Link>
  );
}
