'use client'
export default function Quantity({ value, onChange, className }: { value: number, onChange:(n:number)=>void, className?: string }){
return (
<div className={`inline-flex items-center gap-2 border border-gray-200 rounded-xl px-2 ${className||''}`}>
<button className="px-2 py-1" onClick={()=>onChange(Math.max(1, value-1))}>-</button>
<span className="w-6 text-center">{value}</span>
<button className="px-2 py-1" onClick={()=>onChange(value+1)}>+</button>
</div>
)
}