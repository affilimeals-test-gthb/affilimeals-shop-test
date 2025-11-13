export function IGHeader({handle, verified}:{handle:string, verified?:boolean}){
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-bold">@{handle}</span>
      {verified && <span className="text-xs">✔️</span>}
      <span className="text-gray-500">• folgt dir</span>
    </div>
  )
}
export function IGSocialBar(){
  return (
    <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
      <div>Gefällt <b>xy</b> und <b>100</b> weiteren Personen</div>
      <div className="flex gap-3">
        <button>💬 Kommentieren</button>
        <button>💾 Speichern</button>
        <button>📤 Teilen</button>
      </div>
    </div>
  )
}
