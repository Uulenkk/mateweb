export default function Footer(){
return (
<footer className="mt-16 border-t border-gray-100">
<div className="container py-8 text-sm text-gray-500 flex items-center justify-between">
<p>© {new Date().getFullYear()} ZONDO</p>
<p>Minimal & clean eCommerce UI</p>
</div>
</footer>
)
}