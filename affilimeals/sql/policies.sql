alter table public.products enable row level security;
create policy if not exists "allow read products" on public.products for select using (approved = true);
