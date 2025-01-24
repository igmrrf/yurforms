create or replace function batch_upsert_form_data(records jsonb)
returns void as $$
begin
  with new_records as (
    select
      r->>'user_id' as user_id,
      r->>'field_type' as field_type,
      r->>'field_value' as field_value,
      (r->>'last_used')::timestamp with time zone as last_used,
      (r->>'frequency')::integer as frequency,
      (r->>'contexts')::text[] as contexts,
      (r->>'updated_at')::timestamp with time zone as updated_at
    from jsonb_array_elements(records) as r
  )
  insert into user_form_data (
    user_id,
    field_type,
    field_value,
    last_used,
    frequency,
    contexts,
    updated_at
  )
  select * from new_records
  on conflict (user_id, field_type, field_value)
  do update set
    last_used = excluded.last_used,
    frequency = greatest(user_form_data.frequency, excluded.frequency),
    contexts = array(select distinct unnest(user_form_data.contexts || excluded.contexts)),
    updated_at = excluded.updated_at
  where excluded.updated_at > user_form_data.updated_at;
end;
$$ language plpgsql;