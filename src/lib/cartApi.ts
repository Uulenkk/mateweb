const API_URL = "http://173.212.216.102:5000/api";

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  size: string;
  color: string;
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
  };
}

// Helper: get headers with token
function getHeaders() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Get all cart items for the logged-in user
export async function getCartItems(): Promise<CartItem[]> {
  const res = await fetch(`${API_URL}/cart`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load cart");
  return res.json();
}

// Add a product to cart
export async function addToCart(
  productId: number,
  quantity: number,
  size: string,
  color: string
): Promise<CartItem> {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ productId, quantity, size, color }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

// Remove an item completely from cart
export async function removeFromCart(
  productId: number,
  size?: string,
  color?: string
): Promise<void> {
  const res = await fetch(`${API_URL}/cart`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ productId, size, color }),
  });
  if (!res.ok) throw new Error("Failed to remove item from cart");
}

// Increase quantity of a cart item
export async function increaseCartItem(
  productId: number,
  size: string,
  color: string
): Promise<void> {
  const res = await fetch(`${API_URL}/cart/increase`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ productId, size, color }),
  });
  if (!res.ok) throw new Error("Failed to increase quantity");
}

// Decrease quantity of a cart item
export async function decreaseCartItem(
  productId: number,
  size: string,
  color: string
): Promise<void> {
  const res = await fetch(`${API_URL}/cart/decrease`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ productId, size, color }),
  });
  if (!res.ok) throw new Error("Failed to decrease quantity");
}
