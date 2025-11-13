insert into public.profiles (email, full_name, role, instagram_handle, instagram_verified, consent_likes)
values
  ('demo@kunde.de','Max Mustermann','guest','maxpower',true,true),
  ('creator@affilimeals.com','FoodCreator','creator','fitlena',true,true),
  ('chef@localbistro.de','Local Bistro','restaurant','localbistro',false,false)
on conflict do nothing;

insert into public.restaurants (user_id,name,address,city,email)
select id,'Local Bistro','Musterstraße 12','Berlin','chef@localbistro.de' from public.profiles where email='chef@localbistro.de'
on conflict do nothing;

insert into public.products (slug,title,description,price_cents,restaurant_id,created_by,approved,kcal,protein_g,carbs_g,fat_g,weight_g,allergens,prep_time_min,images)
select 'protein-bowl','Protein Bowl','Frische Chicken-Bowl mit High-Protein-Makros',1299,r.id,c.id,true,520,38,48,12,450,ARRAY['Gluten','Soja'],10,ARRAY['/placeholder.jpg']
from public.restaurants r, public.profiles c
where c.email='creator@affilimeals.com'
on conflict do nothing;
