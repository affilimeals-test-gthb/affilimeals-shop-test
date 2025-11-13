import Link from 'next/link'
const Col = ({title,links}:{title:string;links:{href:string;label:string}[]})=> (
  <div>
    <h4 className="font-bold mb-3">{title}</h4>
    <ul className="space-y-2 text-sm">
      {links.map(l=> <li key={l.href}><Link href={l.href} className="hover:text-brand">{l.label}</Link></li>)}
    </ul>
  </div>
)
export default function Footer(){
  const now = new Date().getFullYear()
  return (
    <footer className="border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-5 gap-8">
        <Col title="Produkte/ Dienstleistungen" links={[
          {href:'/bestseller',label:'Bestseller'},{href:'/aktionen',label:'Aktionen'},{href:'/trends',label:'Virale Food Trends'},
          {href:'/gerichte',label:'Gerichte'},{href:'/mealprep',label:'Mealprep'},{href:'/snacks',label:'Snacks'},{href:'/getraenke',label:'Getränke'},
          {href:'/exklusiv',label:'Exklusive Gerichte'},{href:'/diy',label:'DIY Rezepte'},{href:'/coaching',label:'Coaching'},{href:'/catering',label:'Premium Catering'},
          {href:'/giftcard',label:'Geschenkkarte kaufen'},{href:'/referral',label:'Freunden empfehlen'},{href:'/loyalty',label:'Loyalty Rewards'}
        ]}/>
        <Col title="B2B" links={[
          {href:'/partner-restaurant',label:'Partner Restaurant werden'},
          {href:'/partner-fmcg',label:'FMCG Partner werden'},
          {href:'/eventcatering',label:'Jetzt Eventcatering buchen'},
          {href:'/creator-werden',label:'Affilimeals Creator werden'},
          {href:'/pitch',label:'Geschäftsidee? Jetzt pitchen!'},
          {href:'/investoren',label:'Investoren'},
          {href:'/ads',label:'Affilimeals Werbepartner werden'}
        ]}/>
        <Col title="Hilfe & Kontakt" links={[
          {href:'/hilfe',label:'Hilfe'},{href:'/kontakt',label:'Kontakt'},{href:'/versand',label:'Versand & Lieferung'},{href:'/ruecksendung',label:'Rücksendung (nicht möglich)'}
        ]}/>
        <Col title="Unternehmen" links={[
          {href:'/about',label:'Über Affilimeals'},{href:'/agb',label:'AGB'},{href:'/cookies',label:'Cookie Einstellungen'},{href:'/privacy',label:'Datenschutzerklärung'},
          {href:'/impressum',label:'Impressum'},{href:'/informationen',label:'Informationen'},{href:'/widerruf',label:'Widerrufsbelehrung'}
        ]}/>
        <Col title="Compliance" links={[
          {href:'/code-of-conduct',label:'Verhaltenskodex'},{href:'/supplier-coc',label:'Verhaltenskodex für Lieferanten und Geschäftspartner'},
          {href:'/whistleblower',label:'Hinweisgebersystem'},{href:'/grundsatzerklaerung',label:'Grundsatzerklärung'},{href:'/barrierefreiheit',label:'Barrierefreiheitserklärung'}
        ]}/>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8 text-sm">
        <div className="flex flex-wrap items-center gap-4 border-t pt-4 justify-between">
          <div className="flex items-center gap-3">
            <span>Zahlungsmethoden:</span>
            <img src="/payments/visa.svg" className="h-5"/> <img src="/payments/mastercard.svg" className="h-5"/>
            <img src="/payments/amex.svg" className="h-5"/> <img src="/payments/unionpay.svg" className="h-5"/>
            <img src="/payments/paypal.svg" className="h-5"/> <img src="/payments/klarna.svg" className="h-5"/>
            <img src="/payments/applepay.svg" className="h-5"/> <img src="/payments/googlepay.svg" className="h-5"/>
          </div>
          <div>🚚 Versand: <span className="inline-block">📦</span></div>
          <div className="flex items-center gap-4">
            <a href="#">Instagram</a><a href="#">YouTube</a><a href="#">TikTok</a><a href="#">LinkedIn</a><a href="#">Pinterest</a><a href="#">WhatsApp</a>
          </div>
        </div>
        <div className="mt-4 text-gray-600">© 2025, Affilimeals • *Alle Preise inkl. gesetzl. MwSt. zzgl. Versandkosten*</div>
        <div className="mt-2 flex gap-4 text-sm"><button>Land einstellen</button><button>Sprache einstellen</button></div>
      </div>
    </footer>
  )
}
