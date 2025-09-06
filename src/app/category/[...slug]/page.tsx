'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getProductsByGenderAndCategory, Product } from "@/lib/api";

export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const genderMap: Record<string, string> = {
    men: "Эрэгтэй",
    women: "Эмэгтэй",
  };

  const categoryMap: Record<string, string> = {
    shirts: "Цамц",
    pants: "Брюк",
    dresses: "Даашинз",
    shoes: "Гутал",
    jackets: "Жакет",
    jeans: "Жинсэн өмд",
    tops: "Топ",
    skirts: "Юбка",
    tshirts: "Пудволк"
  };

  const [genderDisplay, setGenderDisplay] = useState<string>("");
  const [categoryDisplay, setCategoryDisplay] = useState<string>("");

  useEffect(() => {
    if (!params.slug) return;

    const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
    const genderSlug = slugArray[0] || "";
    const categorySlug = slugArray[1] || "";

    const genderMongolian = genderMap[genderSlug];
    const categoryMongolian = categorySlug ? categoryMap[categorySlug] : undefined;

    if (!genderMongolian) return;

    setGenderDisplay(genderMongolian);
    setCategoryDisplay(categoryMongolian || "");

    setLoading(true);
    setError(null);

    getProductsByGenderAndCategory(genderMongolian, categoryMongolian)
      .then(setProducts)
      .catch((err) => setError(err.message || "Failed to fetch products"))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (products.length === 0) return <p className="p-4">No products found</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold capitalize mb-6">
        {genderDisplay} {categoryDisplay && `/ ${categoryDisplay}`}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 hover:shadow-lg transition">
            <div className="relative w-full h-64">
              {product.images[0] && (
                <Image
                  src={`http://173.212.216.102:5000${product.images[0]}`}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
              )}
            </div>
            <h2 className="font-semibold text-lg mt-2">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
