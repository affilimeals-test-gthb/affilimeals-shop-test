-- Basic schema (simplified for ZIP)
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text,
  full_name text,
  role text check (role in ('guest','creator','restaurant','admin')) default 'guest',
  instagram_handle text,
  instagram_verified boolean default false,
  consent_likes boolean default false,
  created_at timestamptz default now()
);
create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  name text not null,
  address text,
  city text,
  email text,
  whatsapp text,
  slack_webhook text,
  pos_provider text,
  pos_api_key text,
  created_at timestamptz default now()
);
create table if not exists public.products (
  id bigserial primary key,
  slug text unique,
  title text not null,
  description text,
  price_cents int not null,
  images text[] default array[]::text[],
  kcal int, protein_g int, carbs_g int, fat_g int, weight_g int,
  allergens text[], prep_time_min int,
  approved boolean default false,
  restaurant_id uuid references public.restaurants(id),
  created_by uuid references public.profiles(id),
  is_premium boolean default false,
  created_at timestamptz default now()
);
create table if not exists public.orders (
  id bigserial primary key,
  user_id uuid references public.profiles(id),
  restaurant_id uuid references public.restaurants(id),
  creator_id uuid references public.profiles(id),
  affiliate_code text,
  amount_cents int, currency text default 'eur',
  status text default 'pending',
  stripe_pi text,
  created_at timestamptz default now()
);
create table if not exists public.payouts (
  id bigserial primary key,
  order_id bigint references public.orders(id),
  creator_amount_cents int,
  restaurant_amount_cents int,
  platform_amount_cents int,
  created_at timestamptz default now()
);
create table if not exists public.affiliate_codes (
  id bigserial primary key,
  code text unique not null,
  creator_id uuid references public.profiles(id),
  product_id bigint references public.products(id),
  clicks int default 0,
  conversions int default 0,
  created_at timestamptz default now()
);
create table if not exists public.likes (
  id bigserial primary key,
  user_id uuid references public.profiles(id),
  product_id bigint references public.products(id),
  created_at timestamptz default now(),
  unique (user_id, product_id)
);
