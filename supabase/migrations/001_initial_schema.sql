create extension if not exists "uuid-ossp";

create table if not exists public.wedding_config (
  id uuid primary key default uuid_generate_v4(),
  partner_1_name text not null,
  partner_2_name text not null,
  wedding_date timestamptz not null,
  venue_name text,
  venue_address text,
  venue_maps_url text,
  rsvp_deadline timestamptz not null,
  welcome_message text,
  dress_code text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.program_items (
  id uuid primary key default uuid_generate_v4(),
  config_id uuid not null references public.wedding_config(id) on delete cascade,
  time_label text not null,
  title text not null,
  description text,
  icon text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.faq_items (
  id uuid primary key default uuid_generate_v4(),
  config_id uuid not null references public.wedding_config(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rsvps (
  id uuid primary key default uuid_generate_v4(),
  config_id uuid not null references public.wedding_config(id) on delete cascade,
  guest_name text not null check (char_length(guest_name) between 2 and 200),
  guest_email text,
  is_attending boolean not null,
  plus_one boolean default false,
  plus_one_name text,
  total_guests integer default 1 check (total_guests between 1 and 10),
  menu_choice text check (menu_choice in ('meat', 'fish', 'vegetarian', 'vegan') or menu_choice is null),
  plus_one_menu text check (plus_one_menu in ('meat', 'fish', 'vegetarian', 'vegan') or plus_one_menu is null),
  dietary_notes text,
  message text,
  ip_address text,
  user_agent text,
  honeypot text,
  submitted_at timestamptz not null default timezone('utc', now()),
  constraint plus_one_name_required check (
    plus_one is not true or coalesce(char_length(trim(plus_one_name)), 0) > 0
  )
);

create index if not exists idx_wedding_config_is_active
  on public.wedding_config(is_active);

create index if not exists idx_program_items_config_sort
  on public.program_items(config_id, sort_order);

create index if not exists idx_faq_items_config_sort
  on public.faq_items(config_id, sort_order);

create index if not exists idx_rsvps_config_submitted
  on public.rsvps(config_id, submitted_at desc);

create index if not exists idx_rsvps_email
  on public.rsvps(guest_email);

create index if not exists idx_rsvps_attending
  on public.rsvps(config_id, is_attending);
