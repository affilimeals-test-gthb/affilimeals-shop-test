import { createClient } from '@/lib/supabaseServer'
import OrderBump from '@/components/OrderBump'

export default async function ProductPage({params}:{params:{slug:string}}){
  const supabase = createClient()
  const { data: p } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .eq('approved', true)
    .single()

  if(!p) return <div>Produkt nicht gefunden.</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={p.images?.[0]||'/placeholder.jpg'} className="w-full rounded-2xl border"/>
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <div className="text-xl font-bold mt-2">{(p.price_cents/100).toFixed(2)} €</div>
        <p className="mt-2 text-gray-600">{p.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="border rounded-2xl p-3">Kcal: <b>{p.kcal}</b></div>
          <div className="border rounded-2xl p-3">Protein: <b>{p.protein_g} g</b></div>
          <div className="border rounded-2xl p-3">Carbs: <b>{p.carbs_g} g</b></div>
          <div className="border rounded-2xl p-3">Fette: <b>{p.fat_g} g</b></div>
          <div className="border rounded-2xl p-3">Gewicht: <b>{p.weight_g} g</b></div>
          <div className="border rounded-2xl p-3">Zubereitung: <b>{p.prep_time_min} min</b></div>
        </div>
        {p.allergens?.length>0 && <div className="mt-3 text-sm">Allergene: {p.allergens.join(', ')}</div>}
        <div className="mt-5 flex gap-3">
          <form action="/api/checkout" method="post">
            <input type="hidden" name="items" value={JSON.stringify([{title:p.title, price_cents:p.price_cents, qty:1, product_id:p.id, restaurant_id:p.restaurant_id}])} />
            <button className="px-4 py-3 rounded-2xl bg-brand text-white">In den Warenkorb</button>
          </form>
          <form action="/api/likes" method="post">
            <input type="hidden" name="product_id" value={p.id} />
            <button className="px-4 py-3 rounded-2xl border">Like (Opt‑in)</button>
          </form>
        </div>
        <OrderBump/>
      </div>
    </div>
  )
}
