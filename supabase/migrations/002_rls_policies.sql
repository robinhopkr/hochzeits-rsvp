alter table public.wedding_config enable row level security;
alter table public.program_items enable row level security;
alter table public.faq_items enable row level security;
alter table public.rsvps enable row level security;

drop policy if exists wedding_config_public_read on public.wedding_config;
create policy wedding_config_public_read on public.wedding_config
  for select using (is_active = true);

drop policy if exists wedding_config_admin_write on public.wedding_config;
create policy wedding_config_admin_write on public.wedding_config
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists program_items_public_read on public.program_items;
create policy program_items_public_read on public.program_items
  for select using (true);

drop policy if exists program_items_admin_write on public.program_items;
create policy program_items_admin_write on public.program_items
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists faq_items_public_read on public.faq_items;
create policy faq_items_public_read on public.faq_items
  for select using (true);

drop policy if exists faq_items_admin_write on public.faq_items;
create policy faq_items_admin_write on public.faq_items
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists rsvps_public_insert on public.rsvps;
create policy rsvps_public_insert on public.rsvps
  for insert with check (honeypot is null or honeypot = '');

drop policy if exists rsvps_admin_read on public.rsvps;
create policy rsvps_admin_read on public.rsvps
  for select using (auth.role() = 'authenticated');

drop policy if exists rsvps_admin_modify on public.rsvps;
create policy rsvps_admin_modify on public.rsvps
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists rsvps_admin_delete on public.rsvps;
create policy rsvps_admin_delete on public.rsvps
  for delete using (auth.role() = 'authenticated');
