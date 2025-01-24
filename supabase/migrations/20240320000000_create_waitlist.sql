create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  message text,
  status text not null default 'pending',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create index for email searches
create index if not exists waitlist_email_idx on public.waitlist (email);

-- Add row level security
alter table public.waitlist enable row level security;

-- Create policies
create policy "Enable read access for authenticated users" on public.waitlist
  for select using (auth.role() = 'authenticated');

create policy "Enable insert access for all users" on public.waitlist
  for insert with check (true);