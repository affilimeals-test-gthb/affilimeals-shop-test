'use client'
import { createClientBrowser } from '@/lib/supabaseClient'
import { useState } from 'react'
export default function Login(){
  const [email,setEmail]=useState('')
  const [sent,setSent]=useState(false)
  async function onSubmit(e:any){ e.preventDefault();
    const supabase = createClientBrowser();
    const { error } = await supabase.auth.signInWithOtp({ email })
    if(!error) setSent(true)
  }
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Anmelden</h1>
      {sent? <div>Check deine E‑Mails für den Magic Link.</div> : (
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="E‑Mail" className="w-full border p-3 rounded-2xl"/>
          <button className="w-full bg-brand text-white rounded-2xl py-3">Magic Link senden</button>
        </form>
      )}
    </div>
  )
}
