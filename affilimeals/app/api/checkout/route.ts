import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req:NextRequest){
  const contentType = req.headers.get('content-type')||''
  let payload:any = {}
  if(contentType.includes('application/json')) payload = await req.json()
  else if(contentType.includes('application/x-www-form-urlencoded')){
    const form = await req.formData();
    payload.items = JSON.parse(String(form.get('items')||'[]'))
  }
  const { items = [], affiliate_code } = payload
  const line_items = items.map((it:any)=>({
    price_data:{ currency:'eur', product_data:{ name:it.title, metadata:{ product_id:String(it.product_id), restaurant_id:String(it.restaurant_id) } }, unit_amount:it.price_cents },
    quantity:it.qty
  }))
  const session = await stripe.checkout.sessions.create({
    mode:'payment',
    line_items,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/warenkorb?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/warenkorb?canceled=1`,
    metadata:{ affiliate_code: affiliate_code || '' }
  })
  return NextResponse.json({ url: session.url })
}
