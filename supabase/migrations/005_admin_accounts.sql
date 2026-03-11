create table if not exists public.couple_accounts (
  id uuid primary key default uuid_generate_v4(),
  wedding_source text not null check (wedding_source in ('modern', 'legacy')),
  wedding_source_id text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (wedding_source, wedding_source_id)
);

create index if not exists idx_couple_accounts_wedding
  on public.couple_accounts(wedding_source, wedding_source_id);

create table if not exists public.planner_accounts (
  id uuid primary key default uuid_generate_v4(),
  customer_number text not null unique,
  display_name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.planner_wedding_access (
  planner_account_id uuid not null references public.planner_accounts(id) on delete cascade,
  wedding_source text not null check (wedding_source in ('modern', 'legacy')),
  wedding_source_id text not null,
  linked_via_customer_number text,
  linked_at timestamptz not null default timezone('utc', now()),
  primary key (planner_account_id, wedding_source, wedding_source_id)
);

create index if not exists idx_planner_wedding_access_wedding
  on public.planner_wedding_access(wedding_source, wedding_source_id);

alter table public.couple_accounts enable row level security;
alter table public.planner_accounts enable row level security;
alter table public.planner_wedding_access enable row level security;
