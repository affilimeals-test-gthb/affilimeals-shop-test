'use client'
import { useState } from 'react'
const groups = {
  Sammlungen:['Alle','Influencer','Marken','Küchen','Trends','Exklusive Gerichte','Loyalty Rewards'],
  Sortieren:['Preis ↑','Preis ↓','Max. Bewertung'],
  Makros:['Proteine','Carbs','Fette','Kcal'],
  Allergene:['Gluten','Nüsse','Laktose','Soja']
}
export default function Filters(){
  const [state,setState]=useState<Record<string,string>>({})
  return (
    <div className="grid md:grid-cols-4 gap-3">
      {Object.entries(groups).map(([k,vals])=> (
        <div key={k} className="border rounded-2xl p-3">
          <div className="font-bold mb-2">{k}</div>
          <div className="flex flex-wrap gap-2">
            {vals.map(v=> (
              <button key={v} onClick={()=>setState(s=>({...s,[k]:v}))} className={`px-3 py-1 rounded-2xl border text-xs ${state[k]===v?'bg-brand text-white':'bg-white'}`}>{v}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
