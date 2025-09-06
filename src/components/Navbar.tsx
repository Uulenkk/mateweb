'use client'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useStore } from '@/lib/store'
import CategoriesDropdown from './CategoriesDropdown'

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)

  const user = useStore(state => state.user)

  return (
    <header className="border-b border-gray-100">
  <div className="container h-16 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <CategoriesDropdown /> {/* hamburger icon */}
      <Link href="/" className="font-semibold text-lg">MateStore</Link>
    </div>

    <nav className="flex items-center gap-5 text-sm">
      <Link href="/cart" className="relative">
        Сагс
        {count > 0 && (
          <span className="absolute -right-3 -top-2 bg-black text-white text-[10px] rounded-full px-1.5 py-0.5">{count}</span>
        )}
      </Link>

      {user ? (
        <span>Сайн уу, {user.name}</span>
      ) : (
        <>
          <Link href="/login" className="text-blue-600">Login</Link>
          <Link href="/register" className="text-blue-600">Register</Link>
        </>
      )}
    </nav>
  </div>
</header>

  )
}
