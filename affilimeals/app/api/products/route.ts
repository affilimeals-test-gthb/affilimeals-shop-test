import { NextRequest, NextResponse } from 'next/server'
import { productSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabaseAdmin'
import slugify from 'slugify'

export async function POST(req:NextRequest){
  const admin = createAdminClient()
  const contentType = req.headers.get('content-type')||''
  const payload = contentType.includes('application/x-www-form-urlencoded') ? Object.fromEntries((await req.formData()).entries()) : await req.json()
  const parse = productSchema.safeParse(payload)
  if(!parse.success) return NextResponse.json({ errors: parse.error.format() }, { status:400 })
  const body = parse.data
  const slug = slugify(body.title, { lower:true, strict:true }) + '-' + Math.random().toString(36).slice(2,6)
  const allergens = body.allergens? body.allergens.split(',').map((s:string)=>s.trim()) : []
  const { error } = await admin.from('products').insert({
    slug, title: body.title, description: body.description, price_cents: body.price_cents,
    allergens, approved:false
  })
  if(error) return new NextResponse(error.message, { status:400 })
  return NextResponse.json({ ok:true, status:'pending_approval', slug })
}

export async function PUT(req:NextRequest){
  const admin = createAdminClient()
  const { product_id, approved } = await req.json()
  const { error } = await admin.from('products').update({ approved: !!approved }).eq('id', product_id)
  if(error) return new NextResponse(error.message, { status:400 })
  return NextResponse.json({ ok:true })
}
