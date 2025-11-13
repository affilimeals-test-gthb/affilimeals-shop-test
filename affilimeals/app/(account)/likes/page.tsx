import { createClient } from '@/lib/supabaseServer'
export default async function Likes(){
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) return <div>Bitte <a className="underline" href="/anmelden">anmelden</a>.</div>
  const { data: profile } = await supabase.from('profiles').select('id,consent_likes').eq('id', user.id).single()
  if(!profile?.consent_likes) return <div>Aktiviere zuerst das Like‑Opt‑In in deinen Einstellungen.</div>
  const { data: likes } = await supabase.from('likes').select('product_id, created_at').eq('user_id', profile.id)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Deine Likes</h1>
      <pre className="text-sm bg-gray-50 p-3 rounded-2xl">{JSON.stringify(likes,null,2)}</pre>
    </div>
  )
}
