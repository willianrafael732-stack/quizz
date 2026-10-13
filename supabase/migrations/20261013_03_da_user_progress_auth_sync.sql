-- Login de contas Supabase e sincronização de progresso do Desafio Aprovação
create table if not exists public.da_user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.da_user_progress enable row level security;
revoke all on public.da_user_progress from anon, authenticated;
grant select, insert, update on public.da_user_progress to authenticated;
drop policy if exists da_user_progress_select on public.da_user_progress;
create policy da_user_progress_select on public.da_user_progress
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists da_user_progress_insert on public.da_user_progress;
create policy da_user_progress_insert on public.da_user_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists da_user_progress_update on public.da_user_progress;
create policy da_user_progress_update on public.da_user_progress
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
