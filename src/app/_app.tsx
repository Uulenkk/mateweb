'use client'
import { useState } from 'react'
import { register } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const res = await register({ name, email, password })
    if (res.id) {
      alert("Амжилттай бүртгэгдлээ, одоо нэвтэрнэ үү.")
      router.push('/login')
    } else {
      alert(res.message || "Register failed")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Бүртгүүлэх</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" value={name} onChange={e=>setName(e.target.value)}
          placeholder="Нэр" className="w-full border px-3 py-2 rounded" />
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
          placeholder="Имэйл" className="w-full border px-3 py-2 rounded" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
          placeholder="Нууц үг" className="w-full border px-3 py-2 rounded" />
        <button type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Бүртгүүлэх</button>
      </form>
    </div>
  )
}
