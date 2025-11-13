import Link from 'next/link'
export default function Navbar(){
  const links = [
    {href:'/anmelden',label:'Anmelden'},
    {href:'/warenkorb',label:'Warenkorb'},
    {href:'/likes',label:'Likes'},
    {href:'/bestseller',label:'Bestseller'},
    {href:'/aktionen',label:'Aktionen'},
    {href:'/trends',label:'Virale Food Trends'},
    {href:'/gerichte',label:'Gerichte'},
    {href:'/mealprep',label:'Mealprep'},
    {href:'/snacks',label:'Snacks'},
    {href:'/getraenke',label:'Getränke'},
    {href:'/creator',label:'Creator'},
    {href:'/marken',label:'Marken'},
    {href:'/entdecke',label:'Entdecke mehr'},
  ]
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 h-16">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Affilimeals" className="h-7"/>
        </Link>
        <div className="hidden md:flex gap-4">
          {links.map(l=> <Link key={l.href} href={l.href} className="text-sm hover:text-brand">{l.label}</Link>)}
        </div>
        <div className="ml-auto flex gap-3">
          <Link href="/anmelden" className="px-3 py-2 rounded-2xl bg-brand text-white text-sm">Account</Link>
          <Link href="/warenkorb" className="px-3 py-2 rounded-2xl border text-sm">Cart</Link>
        </div>
      </div>
    </nav>
  )
}
