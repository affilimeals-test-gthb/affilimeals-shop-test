import { getSessionProfile } from '@/lib/auth'
import { createClient } from '@/lib/supabaseServer'

export default async function Dashboard(){
  const { user, profile } = await getSessionProfile()
  if(!user) return <div>Bitte <a className="underline" href="/anmelden">anmelden</a>.</div>
  const role = profile?.role
  const supabase = createClient()

  if(role==='creator'){
    const { data: codes } = await supabase.from('affiliate_codes').select('code, clicks, conversions, created_at').eq('creator_id', profile!.id)
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Creator Dashboard</h1>
        <section className="border rounded-2xl p-4">
          <h2 className="font-bold mb-3">Affiliate‑Codes</h2>
          <form action="/api/affiliate" method="post" className="flex gap-3">
            <input name="product_id" placeholder="Produkt‑ID" className="border rounded-2xl p-2"/>
            <button className="px-3 py-2 rounded-2xl bg-brand text-white">Code generieren</button>
          </form>
          <ul className="mt-3 space-y-1 text-sm">{(codes||[]).map((c:any)=>(<li key={c.code} className="flex justify-between"><span>{c.code}</span><span>{c.conversions} Conv</span></li>))}</ul>
        </section>
      </div>
    )
  }

  if(role==='restaurant'){
    const { data: orders } = await supabase.from('orders').select('id, amount_cents, status, created_at').eq('restaurant_id', profile!.id).order('created_at', { ascending:false })
    return (
      <div>
        <h1 className="text-2xl font-bold">Restaurant Dashboard</h1>
        <div className="space-y-2 mt-4">
          {(orders||[]).map((o:any)=>(
            <div key={o.id} className="border rounded-2xl p-3 flex justify-between"><span>#{o.id}</span><span>{(o.amount_cents/100).toFixed(2)} €</span><span>{o.status}</span></div>
          ))}
        </div>
      </div>
    )
  }

  const { data: myOrders } = await supabase.from('orders').select('id,amount_cents,status,created_at').eq('user_id', profile!.id).order('created_at',{ascending:false})
  return (
    <div>
      <h1 className="text-2xl font-bold">Deine Bestellungen</h1>
      <div className="mt-4 space-y-2">
        {(myOrders||[]).map((o:any)=>(<div key={o.id} className="border rounded-2xl p-3 flex justify-between"><span>#{o.id}</span><span>{(o.amount_cents/100).toFixed(2)} €</span><span>{o.status}</span></div>))}
      </div>
    </div>
  )
}
