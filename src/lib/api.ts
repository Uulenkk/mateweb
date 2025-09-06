import { ReactNode } from "react";

const API_URL = "http://173.212.216.102:5000/api"; 

function getHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}


export async function loginUser(loginInput: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ loginInput, password }),
  });
  return res.json();
}


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



export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: getHeaders(token),
  });
  return res.json();
}



export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    headers: getHeaders(),
  });
  return res.json();
}



export async function getProducts() {
  const res = await fetch(`${API_URL}/products`, {
    headers: getHeaders(),
  });
  return res.json();
}

export interface Product {
  description: ReactNode;
  sizes: any;
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[]; // <- энд server-аас ирсэн зургуудын path
}


export async function getAllProducts(query?: any) {
  const q = query ? '?' + new URLSearchParams(query).toString() : '';
  const res = await fetch(`${API_URL}/products${q}`);
  return res.json();
}

// lib/api.ts
export async function getProductById(id: number) {
  const res = await fetch(`http://173.212.216.102:5000/api/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}


export async function createProduct(formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }, 
    body: formData,
  });
  return res.json();
}


export async function updateProduct(id: number, formData: FormData, token: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}


export async function deleteProduct(id: number, token: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  return res.json();
}


export async function getSimilarProducts(category: string, excludeId: number, userId: number) {
  const res = await fetch(
    `${API_URL}/products/similar?category=${category}&exclude=${excludeId}&userId=${userId}`,
    { headers: getHeaders() }
  );
  return res.json();
}

export async function getProductsByGender(gender: string) {
  // URLSearchParams will automatically encode special characters
  const query = new URLSearchParams({ gender });

  const res = await fetch(`${API_URL}/products/products/byCategory?${query.toString()}`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}