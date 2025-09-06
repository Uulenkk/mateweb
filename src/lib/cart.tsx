'use client'
import { createContext, useContext, useMemo, useState } from 'react'
import type { Product } from '@/data/products'


type CartItem = { product: Product; size?: string; color?: string; quantity: number }


type CartState = {
items: CartItem[]
addItem: (input: CartItem) => void
removeItem: (index:number) => void
updateQty: (index:number, qty:number) => void
clear: () => void
total: number
}


const CartCtx = createContext<CartState | null>(null)


export function CartProvider({ children }:{ children: React.ReactNode }){
const [items, setItems] = useState<CartItem[]>([])


const api: CartState = useMemo(()=>({
items,
addItem: (input) => setItems(prev => {
// ижил загвар+өнгө+размер бол тоо нэмнэ
const idx = prev.findIndex(it => it.product.id===input.product.id && it.size===input.size && it.color===input.color)
if (idx>-1) {
const copy = [...prev]
copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + input.quantity }
return copy
}
return [...prev, input]
}),
removeItem: (index) => setItems(prev => prev.filter((_,i)=>i!==index)),
updateQty: (index, qty) => setItems(prev => prev.map((it,i)=> i===index? { ...it, quantity: Math.max(1, qty) } : it)),
clear: () => setItems([]),
get total(){ return items.reduce((s,it)=> s + it.product.price * it.quantity, 0) }
}), [items])


return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
}


export const useCart = () => {
const ctx = useContext(CartCtx)
if (!ctx) throw new Error('useCart must be used inside CartProvider')
return ctx
}