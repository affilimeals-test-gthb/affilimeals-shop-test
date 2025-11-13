export default function TrustBadges(){
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-xs">
      <div className="border rounded-2xl p-3">🛡️ Sicheres Payment (Stripe)</div>
      <div className="border rounded-2xl p-3">✅ Verifizierte Creator</div>
      <div className="border rounded-2xl p-3">🍽️ Lokale Partner</div>
      <div className="border rounded-2xl p-3">⚡ Schnelle Lieferung</div>
    </div>
  )
}
