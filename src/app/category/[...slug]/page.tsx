'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { getProductsByGenderAndCategory, Product } from "@/lib/api";
import { addToCart } from "@/lib/cartApi";

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
    tshirts: "Пудволк",
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

  const handleAddToCart = async (product: Product) => {
    const defaultSize = product.sizes?.[0]?.sizeLabel || "S";
    const defaultColor = product.colors?.[0] || "#000000";

    try {
      await addToCart(product.id, 1, defaultSize, defaultColor);
      console.log(`${product.name} сагсанд нэмэгдлээ`);
    } catch (err: any) {
      console.error("Сагсанд нэмэхэд алдаа гарлаа", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (products.length === 0) return <p className="p-4">No products found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {genderDisplay} {categoryDisplay && `/ ${categoryDisplay}`}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-md shadow-sm hover:shadow-lg transition"
          >
            <div className="relative w-full h-72">
              {product.images[0] && (
                <Image
                  src={`http://173.212.216.102:5000${product.images[0]}`}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
                />
              )}
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
              <p className="text-gray-500">{product.price}₮</p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 p-2 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
