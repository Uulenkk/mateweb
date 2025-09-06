export const categories = [
  "Men",
  "Women",
  "Kids",
];

export type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  sizes?: { sizeLabel: string }[];
  colors?: string[];
};