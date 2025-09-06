'use client'
import { useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, user } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginInput, password);
    if (useAuthStore.getState().user) {
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Нэвтрэх</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="text"
          placeholder="Имэйл эсвэл хэрэглэгчийн нэр"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
