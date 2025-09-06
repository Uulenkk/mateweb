'use client'
import { useState } from 'react'
import Link from 'next/link'

const CategoriesDropdown = () => {
  const [open, setOpen] = useState(false)

  const categories = [
    { name: 'Women', href: '/category/women' },
    { name: 'Men', href: '/category/men' },
  ]

  return (
    <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="flex flex-col justify-center items-center w-10 h-10 bg-white rounded hover:bg-gray-100 p-1"
  >
    {/* 3 black lines */}
    <span className="block w-6 h-0.5 bg-black mb-1"></span>
    <span className="block w-6 h-0.5 bg-black mb-1"></span>
    <span className="block w-6 h-0.5 bg-black"></span>
  </button>

  {open && (
    <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
      {categories.map(cat => (
        <Link
          key={cat.name}
          href={cat.href}
          className="block px-4 py-2 hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )}
</div>

  )
}

export default CategoriesDropdown
