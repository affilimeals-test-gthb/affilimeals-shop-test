'use client'
import { useEffect, useState } from 'react'

export default function Cart(){
  const [items,setItems]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const local = localStorage.getItem('affilimeals_cart')
    setItems(local? JSON.parse(local): [])
    setLoading(false)
  },[])
  useEffect(()=>{ if(!loading) localStorage.setItem('affilimeals_cart', JSON.stringify(items)) },[items,loading])
  const total = items.reduce((a,b)=>a+b.price_cents*b.qty,0)
  async function checkout(){
    const affiliate = document.cookie.split('; ').find(c=>c.startsWith('affiliate='))?.split('=')[1]
    const res = await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items, affiliate_code: affiliate})})
    const {url} = await res.json(); window.location.href=url
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Warenkorb</h1>
      {items.length===0 && <div>Dein Warenkorb ist leer.</div>}
      <div className="space-y-3">
        {items.map((it,i)=>(
          <div key={i} className="border rounded-2xl p-3 flex justify-between items-center">
            <div>
              <div className="font-bold">{it.title}</div>
              <div className="text-sm text-gray-600">{(it.price_cents/100).toFixed(2)} €</div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min={1} value={it.qty} onChange={e=>{
                const v=Math.max(1,parseInt(e.target.value||'1')); setItems(arr=>arr.map((x,idx)=> idx===i?{...x,qty:v}:x))
              }} className="w-16 border rounded-2xl p-2 text-center"/>
              <button onClick={()=> setItems(arr=> arr.filter((_,idx)=>idx!==i))} className="text-sm">Entfernen</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xl font-bold">Summe: {(total/100).toFixed(2)} €</div>
        <button disabled={!items.length} onClick={checkout} className="px-4 py-3 rounded-2xl bg-brand text-white disabled:opacity-50">Zur Kasse</button>
      </div>
    </div>
  )
}
