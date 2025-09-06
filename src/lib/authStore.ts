import { create } from "zustand";
import { loginUser, registerUser, getProfile } from "./api";

// 1️⃣ Define the store interface
interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (loginInput: string, password: string) => Promise<void>;
  register: (data: any) => Promise<boolean | void>;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

// 2️⃣ Create the store
export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,

  login: async (loginInput, password) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser(loginInput, password);
      if (res.token) {
        // save token & user in localStorage
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res));
        set({ user: res, loading: false });
      } else {
        set({ error: res.message || "Login failed", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "Network error", loading: false });
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await registerUser(data);
      if (res.userId) return true;
      set({ error: res.message || "Register failed", loading: false });
    } catch (err: any) {
      set({ error: err.message || "Network error", loading: false });
    } finally {
      set({ loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      const res = await getProfile(); // res = { message, user }
      if (res.user) {
        set({ user: res.user }); // save the nested user
        localStorage.setItem("user", JSON.stringify(res.user));
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  },
  

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
