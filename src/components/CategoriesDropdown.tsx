'use client'
import { useState } from 'react'
import Link from 'next/link'

const CategoriesDropdown = () => {
  const [open, setOpen] = useState(false)
  const [activeGender, setActiveGender] = useState<string | null>(null)

  const categories = [
    {
      name: 'Эмэгтэй',
      slug: 'women',
      subcategories: [
        { name: 'Цамц', slug: 'shirts' },
        { name: 'Даашинз', slug: 'dress' },
        { name: 'Гутал', slug: 'shoes' },
        { name: 'Юпек', slug: 'skirt' },
        { name: 'Жинсэн өмд', slug: 'jeans' },
        { name: 'Пудволк', slug: 't-shirt' },
        { name: 'top', slug: 'tops' },
      ],
    },
    {
      name: 'Эрэгтэй',
      slug: 'men',
      subcategories: [
        { name: 'Цамц', slug: 'shirts' },
        { name: 'Жакет', slug: 'jackets' },
        { name: 'Гутал', slug: 'shoes' },
        { name: 'Жинсэн өмд', slug: 'jeans' },
      ],
    },
  ]

  const toggleSubcategories = (genderName: string) => {
    setActiveGender(activeGender === genderName ? null : genderName)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center w-10 h-10 bg-white rounded hover:bg-gray-100 p-1"
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                {/* Gender link */}
                <Link
                  href={`/category/${cat.slug}`}
                  className="font-bold"
                  onClick={() => {
                    setOpen(false)
                    setActiveGender(null)
                  }}
                >
                  {cat.name}
                </Link>

                {/* Arrow toggle */}
                {cat.subcategories.length > 0 && (
                  <button
                    onClick={() => toggleSubcategories(cat.name)}
                    className="ml-2 text-gray-600 hover:text-black"
                  >
                    {activeGender === cat.name ? '▲' : '▼'}
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {activeGender === cat.name && (
                <div className="pl-6">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/category/${cat.slug}/${sub.slug}`}
                      className="block px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setOpen(false)
                        setActiveGender(null)
                      }}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoriesDropdown
