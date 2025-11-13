# Affilimeals Webshop (Next.js + Supabase + Stripe)

## Schnellstart (ohne Terminal, via Vercel Upload)
1. Lade diesen Ordner als ZIP hoch: Vercel → Add New Project → **Upload**.
2. Trage in **Settings → Environment Variables** ein:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET (später, wenn Webhook eingerichtet)
   - NEXT_PUBLIC_BASE_URL (deine Vercel-URL)
   - APP_BRAND_COLOR = #792D8E
3. In Supabase: SQL Editor → `sql/schema.sql`, dann `sql/policies.sql`, dann `sql/seed.sql` ausführen.
4. Deploy klicken.

## Lokal (optional, für Entwickler)
- `npm i` oder `pnpm i`
- `.env` aus `.env.example` füllen
- `pnpm dev` → http://localhost:3000

Stripe Webhook lokal:
```
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
