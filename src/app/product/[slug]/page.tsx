'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProductById, Product } from "@/lib/api";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProduct = async () => {
    if (!params.slug) return;
    const id = Number(params.slug);
    if (isNaN(id)) return;

    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error('Product fetch failed:', err);
    } finally {
      setLoading(false); // ← энд нэмэх
    }
  };

  fetchProduct();
}, [params.slug]); // ← params.slug-г ашиглана, params.id биш


  if (loading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4">Product not found</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="font-semibold text-lg">Price: ${product.price}</p>

      {/* Images carousel */}
      <div className="flex gap-2 overflow-x-auto py-2">
        {product.images.map((img, i) => (
          <div key={i} className="relative w-64 h-64 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={`http://173.212.216.102:5000${img}`}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div>
          <h3 className="font-semibold">Sizes:</h3>
          <ul className="list-disc list-inside">
            {product.sizes.map((s: { id: Key | null | undefined; sizeLabel: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <li key={s.id}>{s.sizeLabel}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
