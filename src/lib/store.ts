// src/lib/store.ts
import { create } from "zustand";
import { getProductById, getProfile } from "@/lib/api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: string[];
  sizes: { sizeLabel: string; measurements: any }[];
  category?: string;
  gender?: string;
  type?: string;
  material?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface Store {
  token: string | null;
  setToken: (t: string | null) => void;

  user: User | null;
  fetchUser: () => Promise<void>;

  cart: CartItem[];
  addToCart: (productId: number, quantity?: number, size?: string, color?: string) => Promise<void>;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;

  wishlist: Product[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => void;
}

export const useStore = create<Store>((set, get) => ({
  token: null,
  setToken: (t) => set({ token: t }),

  user: null,
  fetchUser: async () => {
    const token = get().token;
    if (!token) return;
    const data = await getProfile(token);
    if (!data || data.message) return; // алдаа шалгах
    set({ user: data });
  },

  cart: [],
  addToCart: async (productId, quantity = 1, size, color) => {
    const product: Product = await getProductById(productId); // backend-аас татаж авах
    const exists = get().cart.find(
      (i) => i.product.id === productId && i.size === size && i.color === color
    );
    if (exists) return; // давхарлаа нэмэхгүй
    set((state) => ({ cart: [...state.cart, { product, quantity, size, color }] }));
  },
  removeFromCart: (productId) =>
    set((state) => ({ cart: state.cart.filter((i) => i.product.id !== productId) })),
  clearCart: () => set({ cart: [] }),

  wishlist: [],
  addToWishlist: async (productId) => {
    const product: Product = await getProductById(productId); // backend-аас татаж авах
    const exists = get().wishlist.find((i) => i.id === productId);
    if (exists) return;
    set((state) => ({ wishlist: [...state.wishlist, product] }));
  },
  removeFromWishlist: (productId) =>
    set((state) => ({ wishlist: state.wishlist.filter((i) => i.id !== productId) })),
}));
