import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { getSessionProfile } from '@/lib/auth'

export async function POST(req:NextRequest){
  const admin = createAdminClient()
  const { user, profile } = await getSessionProfile()
  if(!user || profile?.role!=='creator') return new NextResponse('Unauthorized', { status:401 })

  let product_id: number | null = null
  if(req.headers.get('content-type')?.includes('application/x-www-form-urlencoded')){
    const fd = await req.formData(); product_id = Number(fd.get('product_id'))
  } else { const body = await req.json(); product_id = Number(body.product_id) }

  const code = randomBytes(3).toString('hex').toUpperCase()
  const { error } = await admin.from('affiliate_codes').insert({ code, creator_id: profile!.id, product_id })
  if(error) return new NextResponse(error.message, { status:400 })
  return NextResponse.json({ code, url: `${process.env.NEXT_PUBLIC_BASE_URL}/a/${code}` })
}
