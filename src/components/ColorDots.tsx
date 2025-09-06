'use client'
const palette: Record<string,string> = {
'хар':'#000000','цагаан':'#ffffff','саарал':'#9ca3af','хөх':'#1d4ed8','ногоон':'#16a34a','улаан':'#dc2626'
}
export default function ColorDots({ colors, value, onChange }:{ colors:string[]; value?:string; onChange:(c:string)=>void; }){
return (
<div className="flex items-center gap-2">
{colors.map(c => (
<button key={c} aria-label={c} onClick={()=>onChange(c)} className={`w-7 h-7 rounded-full border ${value===c?'ring-2 ring-black':''}`} style={{ background: palette[c] || '#e5e7eb' }} />
))}
</div>
)
}