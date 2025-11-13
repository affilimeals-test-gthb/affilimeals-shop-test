'use client'
import { useState } from 'react'
export default function SaveListButton({productId}:{productId:number}){
  const [saved,setSaved]=useState(false)
  return <button onClick={()=>setSaved(s=>!s)} className={`px-3 py-2 rounded-2xl border text-sm ${saved?'bg-brand text-white':''}`}>{saved?'Gespeichert':'Speichern'}</button>
}
