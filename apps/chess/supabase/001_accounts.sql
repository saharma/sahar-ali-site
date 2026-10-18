begin;
create table if not exists public.chess_progress (
 user_id uuid primary key references auth.users(id) on delete cascade,
 progress jsonb not null check(jsonb_typeof(progress)='object' and octet_length(progress::text)<=2000000),
 updated_at timestamptz not null default now()
);
alter table public.chess_progress enable row level security;
revoke all on public.chess_progress from anon,authenticated;
grant select,insert,update on public.chess_progress to authenticated;
create policy "Read own chess progress" on public.chess_progress for select to authenticated using(user_id=auth.uid());
create policy "Create own chess progress" on public.chess_progress for insert to authenticated with check(user_id=auth.uid());
create policy "Update own chess progress" on public.chess_progress for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
commit;
