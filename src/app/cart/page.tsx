'use client';

import { useEffect, useState } from 'react';
import {
  getCartItems,
  removeFromCart,
  increaseCartItem,
  decreaseCartItem,
  addToCart,
} from '@/lib/cartApi';

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  size: string;
  color: string;
  name: string;
  price: number;
  images: string[];
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load cart items
  const loadCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCartItems();
      setCartItems(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId: number, size: string, color: string) => {
    try {
      await removeFromCart(productId, size, color);
      loadCart();
    } catch (err: any) {
      setError(err.message || 'Failed to remove item');
    }
  };

  const increaseItem = async (productId: number, size: string, color: string) => {
    try {
      await increaseCartItem(productId, size, color);
      loadCart();
    } catch (err: any) {
      setError(err.message || 'Failed to increase quantity');
    }
  };

  const decreaseItem = async (productId: number, size: string, color: string) => {
    try {
      await decreaseCartItem(productId, size, color);
      loadCart();
    } catch (err: any) {
      setError(err.message || 'Failed to decrease quantity');
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (cartItems.length === 0) return <p>No items in cart.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border p-4 mb-4 rounded flex items-center gap-4"
        >
          <img
            src={`http://173.212.216.102:5000${item.images[0]}`}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg">{item.name}</p>
            <p>{item.price}₮ x {item.quantity}</p>
            <p>Size: {item.size}, Color: {item.color}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => increaseItem(item.productId, item.size, item.color)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                +
              </button>
              <button
                onClick={() => decreaseItem(item.productId, item.size, item.color)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                -
              </button>
              <button
                onClick={() => removeItem(item.productId, item.size, item.color)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
