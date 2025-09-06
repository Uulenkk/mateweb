export default function Price({ amount, className }:{ amount:number; className?:string }){
const currency = new Intl.NumberFormat('mn-MN', { style: 'currency', currency: 'MNT', maximumFractionDigits: 0 }).format(amount)
return <div className={`font-semibold ${className||''}`}>{currency}</div>
}