begin;
insert into auth.users(id) values('989cfe80-a210-4fbb-9822-189a3aa9cb11'),('989cfe80-a210-4fbb-9822-189a3aa9cb12');
insert into public.chess_progress(user_id,progress) values('989cfe80-a210-4fbb-9822-189a3aa9cb12','{"version":1}');
set local role authenticated;
select set_config('request.jwt.claim.sub','989cfe80-a210-4fbb-9822-189a3aa9cb11',true);
do $$ begin
 if exists(select 1 from public.chess_progress) then raise exception 'Other account visible';end if;
 insert into public.chess_progress(user_id,progress) values('989cfe80-a210-4fbb-9822-189a3aa9cb11','{"version":1}');
 if (select count(*) from public.chess_progress)<>1 then raise exception 'Own progress not visible';end if;
 begin
  insert into public.chess_progress(user_id,progress) values('989cfe80-a210-4fbb-9822-189a3aa9cb12','{}') on conflict(user_id) do update set progress=excluded.progress;
  raise exception 'Other account writable';
 exception when insufficient_privilege then null;
 end;
end $$;
rollback;
select 'PASS: own progress works; other accounts blocked; test data rolled back' as result;
