'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.slug) return;
      const id = Number(params.slug); 
      if (isNaN(id)) return;

      const data = await getProductById(id);
      setProduct(data);
    };

    fetchProduct();
  }, [params.slug]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>
        Sizes: {product.sizes?.map((s: any) => s.sizeLabel).join(", ")}
      </p>
    </div>
  );
}
