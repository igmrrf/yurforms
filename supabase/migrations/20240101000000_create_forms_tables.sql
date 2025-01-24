-- User form data table
create table user_form_data (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null,
  field_type text not null,
  field_value text not null,
  last_used timestamp with time zone default now(),
  frequency integer default 1,
  contexts text[],
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Form field patterns table
create table field_patterns (
  id uuid default uuid_generate_v4() primary key,
  field_type text not null,
  pattern text not null,
  confidence float default 1.0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Field feedback table
create table field_feedback (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  original_type text not null,
  corrected_type text not null,
  field_label text not null,
  field_variants text[],
  context_url text,
  form_id text,
  accuracy_score float,
  timestamp timestamp with time zone default now()
);

-- Sync status table
create table sync_status (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  last_sync timestamp with time zone default now(),
  device_id text not null,
  status text not null,
  unique(user_id, device_id)
);

-- Create indexes
create index idx_user_form_data_user_id on user_form_data(user_id);
create index idx_user_form_data_field_type on user_form_data(field_type);
create index idx_field_patterns_type on field_patterns(field_type);
create index idx_field_feedback_user on field_feedback(user_id);
create index idx_sync_status_user on sync_status(user_id);