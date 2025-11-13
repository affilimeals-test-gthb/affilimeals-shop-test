import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { getSessionProfile } from '@/lib/auth'

export async function POST(req:NextRequest){
  const { user, profile } = await getSessionProfile()
  if(!user) return new NextResponse('Unauthorized', { status:401 })
  if(!profile?.consent_likes) return new NextResponse('Likes disabled (opt-in missing)', { status:403 })
  const contentType = req.headers.get('content-type')||''
  const product_id = contentType.includes('application/x-www-form-urlencoded') ? Number((await req.formData()).get('product_id')) : (await req.json()).product_id
  const admin = createAdminClient()
  await admin.from('likes').upsert({ user_id: profile!.id, product_id })
  return NextResponse.json({ ok:true })
}
