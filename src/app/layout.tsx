import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cart'

export const metadata: Metadata = {
  title: 'ZONDO — Хувцасны дэлгүүр',
  description: 'Зөвхөн фронтенд демо eCommerce',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body>
        <CartProvider>
          <Navbar /> {/* Login/Register button-ууд энд байх ёстой */}
          <main className="min-h-[70vh] container py-8">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
