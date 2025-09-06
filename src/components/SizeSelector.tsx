'use client'
export default function SizeSelector({ sizes, value, onChange }:{ sizes:string[]; value?:string; onChange:(s:string)=>void; }){
return (
<div className="flex flex-wrap gap-2">
{sizes.map(s => (
<button key={s} onClick={()=>onChange(s)} className={`badge ${value===s? 'bg-black text-white border-black' : ''}`}>{s}</button>
))}
</div>
)
}