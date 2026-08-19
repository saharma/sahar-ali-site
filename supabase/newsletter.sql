create table if not exists public.newsletter_signups (
  id bigint generated always as identity primary key,
  email text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_signups_email_key unique (email)
);

alter table public.newsletter_signups enable row level security;
