create table if not exists public.collab_enquiries (
  id bigint generated always as identity primary key,
  name text not null,
  brand text,
  email text not null,
  collab_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.collab_enquiries enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.collab_enquiries to service_role;
