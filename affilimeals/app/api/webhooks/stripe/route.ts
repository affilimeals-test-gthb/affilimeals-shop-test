import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { sendEmail, sendSlack, sendWhatsApp, sendPOSLightspeed } from '@/lib/dispatch'

export async function POST(req:NextRequest){
  const sig = req.headers.get('stripe-signature')!
  const buf = await req.arrayBuffer()
  let event
  try { event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, process.env.STRIPE_WEBHOOK_SECRET!) } catch(err:any){
    return new NextResponse(`Webhook Error: ${err.message}`, { status:400 })
  }

  if(event.type==='checkout.session.completed'){
    const session:any = event.data.object
    const admin = createAdminClient()

    const line = await stripe.checkout.sessions.listLineItems(session.id)
    const items = line.data.map(li=>({
      title: li.description,
      qty: li.quantity||1,
      price_cents: li.amount_total/(li.quantity||1),
    }))

    let creator_id: string | null = null
    const affiliate_code = session.metadata?.affiliate_code
    if(affiliate_code){
      const { data: ac } = await admin.from('affiliate_codes').select('creator_id').eq('code', affiliate_code).single()
      creator_id = ac?.creator_id || null
    }

    const amount_cents = Math.round(session.amount_total || 0)
    const { data: order } = await admin.from('orders').insert({
      user_id: null,
      restaurant_id: null,
      amount_cents,
      currency: session.currency,
      status: 'paid',
      stripe_pi: session.payment_intent as string,
      affiliate_code,
      creator_id
    }).select('*').single()

    const platform = Math.round(amount_cents * 0.20)
    const creator  = Math.round(amount_cents * 0.10)
    const rest     = amount_cents - platform - creator
    await admin.from('payouts').insert({ order_id: order!.id, creator_amount_cents: creator, restaurant_amount_cents: rest, platform_amount_cents: platform })

    // Dispatch ist optional, da kein Restaurant zugeordnet ist (Demo)
  }

  return NextResponse.json({ received:true })
}
