"use client";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage({ params }: any) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts({ category: params.slug });
      setProducts(data);
    };
    fetchProducts();
  }, [params.slug]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
