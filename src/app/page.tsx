'use client'

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { getAllProducts } from "@/lib/api"; 
interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  sizes: { sizeLabel: string; measurements: string }[];
  images: string[];
}

interface Category {
  name: string;
  slug: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();
      setProducts(data);

      
      const uniqueCategories = Array.from(
        new Set(data.map((p: Product) => p.category))
      ).map((cat) => ({ name: cat, slug: cat.toLowerCase() }));

      setCategories(uniqueCategories);
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Шинэ загваруудыг<br />өглөө бүр таньд.
          </h1>
          <p className="text-gray-600">
            Өдөр тутмын тав тух + минимал стиль. Эрэгтэй/Эмэгтэй коллекцоосоо сонгоорой.
          </p>
          <div className="flex gap-3">
            <Link href="/category/women" className="btn btn-primary">Эмэгтэй</Link>
            <Link href="/category/men" className="btn btn-outline">Эрэгтэй</Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1520975954732-35dd22f9a98f"
            alt="hero"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Шинэ бүтээгдэхүүн</h2>
          <div className="flex gap-2">
            {categories.map((c) => (
              <Link key={c.slug} className="badge" href={`/category/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
