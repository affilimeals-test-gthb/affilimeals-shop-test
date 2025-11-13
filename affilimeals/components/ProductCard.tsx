import Link from 'next/link'
import SaveListButton from './SaveListButton'
import { IGHeader, IGSocialBar } from './IGElements'
export default function ProductCard({p}:{p:any}){
  return (
    <div className="border rounded-2xl overflow-hidden">
      <div className="p-3"><IGHeader handle={p.creator_handle||'creator'} verified/></div>
      <Link href={`/produkt/${p.slug}`}>
        <img src={p.images?.[0]||'/placeholder.jpg'} alt={p.title} className="w-full aspect-[4/3] object-cover"/>
      </Link>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{p.title}</h3>
          <div className="font-bold">{(p.price_cents/100).toFixed(2)} €</div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <Link href={`/produkt/${p.slug}`} className="px-3 py-2 rounded-2xl bg-brand text-white text-sm">Schnell in den Warenkorb</Link>
          <SaveListButton productId={p.id}/>
        </div>
        <IGSocialBar/>
      </div>
    </div>
  )
}
