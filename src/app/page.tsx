'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, Product } from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((p) => (
        <Link key={p.id} href={`/product/${p.id}`} className="group block rounded-xl shadow hover:shadow-lg overflow-hidden">
          <div className="relative w-full h-64">
            {p.images[0] && (
              <Image
                src={`http://173.212.216.102:5000${p.images[0]}`}
                alt={p.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-gray-600">${p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
