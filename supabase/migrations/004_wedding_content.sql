create table if not exists public.wedding_content (
  config_id uuid primary key references public.wedding_config(id) on delete cascade,
  fragen jsonb,
  texte jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_wedding_content_updated
  on public.wedding_content(updated_at desc);

alter table public.wedding_content enable row level security;

drop policy if exists wedding_content_public_read on public.wedding_content;
create policy wedding_content_public_read on public.wedding_content
  for select using (true);

drop policy if exists wedding_content_admin_write on public.wedding_content;
create policy wedding_content_admin_write on public.wedding_content
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
