// src/data/products.ts

export const categories = [
  "Men",
  "Women",
  "Kids",
];

export const products = [
  {
    id: 1,
    name: "T-shirt",
    category: "Men",
    price: 25,
    sizes: [
      { sizeLabel: "S", measurements: "Chest 90cm" },
      { sizeLabel: "M", measurements: "Chest 95cm" },
    ],
    colors: ["Red", "Blue"],
    images: ["/images/tshirt1.jpg", "/images/tshirt2.jpg"],
    description: "Comfortable cotton t-shirt",
    type: "Casual",
    gender: "Male",
    material: "Cotton",
  },
  {
    id: 2,
    name: "Dress",
    category: "Women",
    price: 50,
    sizes: [
      { sizeLabel: "S", measurements: "Bust 85cm" },
      { sizeLabel: "M", measurements: "Bust 90cm" },
    ],
    colors: ["Black", "White"],
    images: ["/images/dress1.jpg", "/images/dress2.jpg"],
    description: "Elegant summer dress",
    type: "Casual",
    gender: "Female",
    material: "Silk",
  },
];
