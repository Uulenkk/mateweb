'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useEffect, useState } from 'react'
import CategoriesDropdown from './CategoriesDropdown'
import { getProfile } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)
  const router = useRouter()

  const [user, setUser] = useState<{ name: string; username?: string } | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token")
      if (!token) {
        setUser(null)
        setLoadingUser(false)
        return
      }

      try {
        const data = await getProfile()
        setUser(data.user ?? data)
      } catch {
        setUser(null)
      } finally {
        setLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push('/')
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto h-16 flex items-center justify-between px-4 md:px-0">
        {/* Left: Logo + Categories */}
        <div className="flex items-center gap-4">
          <CategoriesDropdown />
          <Link href="/" className="font-bold text-xl text-black hover:text-gray-700 transition">
            MateStore
          </Link>
        </div>

        {/* Right: Cart + Auth */}
        <nav className="flex items-center gap-6">
          {/* Cart */}
          <Link href="/cart" className="relative text-black font-medium hover:text-gray-700 transition">
            Сагс
            {count > 0 && (
              <span className="absolute -right-3 -top-2 bg-black text-white text-[10px] rounded-full px-1.5 py-0.5">
                {count}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!loadingUser && (
            user ? (
              <div className="flex items-center gap-3">
                <span className="text-black font-medium">Сайн уу, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-white bg-black rounded hover:bg-gray-800 transition"
                >
                  Гарах
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-black hover:text-gray-700 transition">
                  Login
                </Link>
                <Link href="/register" className="text-black hover:text-gray-700 transition">
                  Register
                </Link>
              </div>
            )
          )}
        </nav>
      </div>
    </header>
  )
}
