import { ReactNode } from "react";

const API_URL = "http://173.212.216.102:5000/api";

// Accept string or null safely
export function getHeaders(token?: string | null) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Login
export async function loginUser(loginInput: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loginInput, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data; // user info and token
}

// Register
export async function registerUser(data: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Registration failed");
  return json;
}

// Get profile
export async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: getHeaders(token),
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

// Categories
export async function getCategories() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/categories`, { headers: getHeaders(token) });
  return res.json();
}

// Products
export async function getProducts() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/products`, { headers: getHeaders(token) });
  return res.json();
}

// Product interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  type: string;
  gender: string;
  material: string;
  images: string[];
  sizes?: { id: number; sizeLabel: string }[];
  colors?: string[]; // ← add this
}


// Get all products with optional query
export async function getAllProducts(query?: any) {
  const q = query ? "?" + new URLSearchParams(query).toString() : "";
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/products${q}`, { headers: getHeaders(token) });
  return res.json();
}

// Get product by id
export async function getProductById(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/products/${id}`, { headers: getHeaders(token) });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Create product
export async function createProduct(formData: FormData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: getHeaders(token),
    body: formData,
  });
  return res.json();
}

// Update product
export async function updateProduct(id: number, formData: FormData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: formData,
  });
  return res.json();
}

// Delete product
export async function deleteProduct(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return res.json();
}

// Get similar products
export async function getSimilarProducts(category: string, excludeId: number, userId: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${API_URL}/products/similar?category=${category}&exclude=${excludeId}&userId=${userId}`,
    { headers: getHeaders(token) }
  );
  return res.json();
}

// Products by gender and category
export async function getProductsByGenderAndCategory(gender: string, category?: string) {
  const token = localStorage.getItem("token");
  const params: Record<string, string> = { gender };
  if (category) params.category = category;

  const query = new URLSearchParams(params);
  const res = await fetch(`${API_URL}/products/products/byCategory?${query.toString()}`, {
    headers: getHeaders(token),
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
