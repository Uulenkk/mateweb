import { create } from "zustand";
import { loginUser, registerUser, getProfile } from "./api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // Login
  login: async (loginInput, password) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser( loginInput, password );
      if (res.token) {
        localStorage.setItem("token", res.token);
        set({ user: res, token: res.token, loading: false });
      } else {
        set({ error: res.message || "Login failed", loading: false });
      }
    } catch (err) {
      set({ error: "Network error", loading: false });
    }
  },

  // Register
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await registerUser(data);
      if (res.userId) {
        set({ loading: false });
        return true;
      } else {
        set({ error: res.message || "Register failed", loading: false });
      }
    } catch (err) {
      set({ error: "Network error", loading: false });
    }
  },

  // Fetch profile
  fetchProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await getProfile(token);
      if (res.id) {
        set({ user: res, token });
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
