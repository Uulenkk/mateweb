'use client'
import { useCart } from '@/lib/cart'
import Price from '@/components/Price'


export default function CheckoutPage(){
const { total, clear } = useCart()
return (
<div className="max-w-md mx-auto card p-6 space-y-4">
<h1 className="text-2xl font-semibold">Төлбөр (демо)</h1>
<p className="text-gray-600">Энд та жинхэнэ төлбөрийн системээ (QPay гэх мэт) нэгтгэнэ. Одоогоор зөвхөн демо.</p>
<div className="flex justify-between"><span>Нийт төлөх дүн</span><Price amount={total} /></div>
<button className="btn btn-primary w-full" onClick={clear}>Захиалга баталгаажууллаа</button>
</div>
)
}