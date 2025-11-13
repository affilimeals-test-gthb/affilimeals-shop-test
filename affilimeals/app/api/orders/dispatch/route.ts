import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, sendSlack, sendWhatsApp, sendPOSLightspeed } from '@/lib/dispatch'
export async function POST(req:NextRequest){
  const { order, restaurant } = await req.json()
  const summary = `Neue Bestellung #${order.id}: ${order.items.length} Artikel, ${(order.amount_cents/100).toFixed(2)}€`
  if(restaurant?.email) await sendEmail(restaurant.email,'Neue Bestellung',summary)
  if(restaurant?.whatsapp) await sendWhatsApp(restaurant.whatsapp, summary)
  if(restaurant?.slack_webhook) await sendSlack(restaurant.slack_webhook, summary)
  if(restaurant?.pos_provider==='lightspeed') await sendPOSLightspeed(order)
  return NextResponse.json({ ok:true })
}
