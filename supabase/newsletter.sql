create table if not exists public.newsletter_signups (
  id bigint generated always as identity primary key,
  email text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_signups_email_key unique (email)
);

alter table public.newsletter_signups enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant insert on table public.newsletter_signups to anon, authenticated, service_role;

drop policy if exists newsletter_signups_insert on public.newsletter_signups;
create policy newsletter_signups_insert
  on public.newsletter_signups
  for insert
  to anon, authenticated, service_role
  with check (true);
