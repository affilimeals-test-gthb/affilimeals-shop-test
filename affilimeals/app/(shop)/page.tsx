import ProductCard from '@/components/ProductCard'
import TrustBadges from '@/components/TrustBadges'
import Filters from '@/components/Filters'
import Link from 'next/link'
import { createClient } from '@/lib/supabaseServer'

export default async function Home(){
  const supabase = createClient()
  const { data: products } = await supabase
    .from('products')
    .select('id,slug,title,description,images,price_cents,created_by, rating, rating_count')
    .eq('approved', true)
    .order('id', { ascending:false })
    .limit(9)

  const withHandles = await Promise.all((products||[]).map(async (p:any)=>{
    const { data: profile } = await supabase.from('profiles').select('instagram_handle').eq('id', p.created_by).single()
    return { ...p, creator_handle: profile?.instagram_handle || 'creator' }
  }))

  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Bestelle <span className="text-brand">Creator‑Meals</span> von lokalen Restaurants</h1>
          <p className="mt-3 text-gray-600">Affilimeals bringt Influencer‑Rezepte zu dir nach Hause. Sicheres Payment, schneller Versand, volle Transparenz.</p>
          <div className="mt-4 flex gap-3">
            <Link href="/bestseller" className="px-4 py-3 rounded-2xl bg-brand text-white">Bestseller</Link>
            <Link href="/trends" className="px-4 py-3 rounded-2xl border">Virale Food Trends</Link>
          </div>
          <TrustBadges/>
        </div>
        <div className="rounded-2xl overflow-hidden border aspect-video">
          <video src="/hero.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover"/>
        </div>
      </section>

      <Filters/>

      <section>
        <h2 className="text-2xl font-bold mb-4">Empfohlen für dich</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {withHandles.map((p:any)=> <ProductCard key={p.id} p={p}/>) }
        </div>
      </section>
    </div>
  )
}
