'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '@/data/products';

type CartItem = {
  product: Product;
  size?: string;
  color?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: number, size?: string, color?: string) => Promise<void>;
  clear: () => Promise<void>;
  total: number;
};

const CartCtx = createContext<CartState | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();

      const mapped: CartItem[] = data.map((item: any) => ({
        product: {
          id: item.productId,
          name: item.name,
          price: item.price,
          images: item.images || [],
        } as Product,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));

      setItems(mapped);
      setTotal(mapped.reduce((s, it) => s + it.product.price * it.quantity, 0));
    } catch (err) {
      console.error('Failed to fetch cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (input: CartItem) => {
    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: input.product.id,
          size: input.size,
          color: input.color,
          quantity: input.quantity,
        }),
      });
      await fetchCart(); // refresh after adding
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const removeItem = async (productId: number, size?: string, color?: string) => {
    try {
      await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, size, color }),
      });
      await fetchCart(); // refresh after removing
    } catch (err) {
      console.error('Failed to remove from cart', err);
    }
  };

  const clear = async () => {
    try {
      await fetch('/api/cart/clear', { method: 'POST' });
      await fetchCart();
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  return (
    <CartCtx.Provider value={{ items, addItem, removeItem, clear, total }}>
      {children}
    </CartCtx.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
