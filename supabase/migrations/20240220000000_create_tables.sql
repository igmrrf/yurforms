-- Drop existing tables if they exist
drop table if exists field_patterns;
drop table if exists forms;

-- Field patterns table for ML
create table field_patterns (
  id uuid default gen_random_uuid() primary key,
  pattern text not null,
  field_type text not null check (field_type in ('text', 'email', 'phone', 'date', 'number', 'password')),
  confidence float not null default 0.5 check (confidence >= 0 and confidence <= 1),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(pattern, field_type)
);

-- Forms table for storing user form data
create table forms (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  url text not null,
  fields jsonb not null default '[]'::jsonb,
  last_used timestamp with time zone,  -- Add this for tracking form usage
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add cleanup function for low confidence patterns
create or replace function cleanup_low_confidence_patterns()
returns void as $$
begin
  delete from field_patterns
  where confidence < 0.1
  and updated_at < now() - interval '30 days';
end;
$$ language plpgsql;

-- Add index for last_used to help with cleanup of old forms
create index idx_forms_last_used on forms (last_used);

-- Indexes for performance
create index idx_field_patterns_pattern on field_patterns (pattern);
create index idx_forms_user_id on forms (user_id);
create index idx_forms_url on forms (url);

-- Update timestamp trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_field_patterns_updated_at
  before update on field_patterns
  for each row
  execute function update_updated_at_column();

create trigger update_forms_updated_at
  before update on forms
  for each row
  execute function update_updated_at_column();