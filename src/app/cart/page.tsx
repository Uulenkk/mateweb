'use client'
import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/Price'
import Quantity from '@/components/Quantity'
import { useCart } from '@/lib/cart'


export default function CartPage() {
const { items, removeItem, updateQty, total } = useCart()


if (!items.length) {
return (
<div className="text-center space-y-4">
<h1 className="text-2xl font-semibold">Таны сагс хоосон байна</h1>
<Link className="btn btn-primary" href="/">Дэлгүүр хэсэх</Link>
</div>
)
}


return (
<div className="grid lg:grid-cols-3 gap-8">
<div className="lg:col-span-2 space-y-4">
{items.map((it, i) => (
<div key={i} className="card p-4 grid grid-cols-[96px,1fr,auto] gap-4 items-center">
<div className="relative w-24 h-24 overflow-hidden rounded-xl">
<Image src={it.product.imageUrl} alt={it.product.title} fill className="object-cover" />
</div>
<div>
<div className="font-medium">{it.product.title}</div>
<div className="text-sm text-gray-600">{it.size} · {it.color}</div>
<Quantity value={it.quantity} onChange={(q)=>updateQty(i,q)} className="mt-2" />
</div>
<div className="text-right">
<Price amount={it.product.price * it.quantity} />
<button className="text-sm text-red-600 mt-2" onClick={()=>removeItem(i)}>Устгах</button>
</div>
</div>
))}
</div>
<aside className="card p-4 h-fit space-y-3">
<div className="flex justify-between"><span>Нийт</span><Price amount={total} /></div>
<Link href="/checkout" className="btn btn-primary w-full">Төлбөр төлөх</Link>
</aside>
</div>
)
}