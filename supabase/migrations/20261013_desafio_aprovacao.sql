-- Desafio Aprovação: estrutura para Supabase PostgreSQL
-- Projeto de destino previsto: kahgwfoqjgdoddkhvgoy
-- Não apaga tabelas, usuários ou respostas existentes.

create table if not exists public.da_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.da_exams (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  exam_type text not null default 'outro'
    check (exam_type in ('vestibular', 'concurso', 'outro')),
  edition_year integer check (edition_year between 1900 and 2200),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.da_questions (
  id uuid primary key default gen_random_uuid(),
  source_key text not null unique,
  exam_id uuid references public.da_exams(id) on delete set null,
  subject text not null,
  difficulty text not null default 'medio'
    check (difficulty in ('facil', 'medio', 'dificil')),
  statement text not null,
  options jsonb not null
    check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) >= 2),
  answer_index integer not null check (answer_index >= 0),
  explanation text,
  variants jsonb not null default '[]'::jsonb
    check (jsonb_typeof(variants) = 'array'),
  origin text not null default 'autoral'
    check (origin in ('autoral', 'adaptada', 'edital', 'oficial')),
  bank text,
  source_url text,
  source_year integer,
  source_question text,
  metadata jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  constraint da_question_answer_range check (answer_index < jsonb_array_length(options))
);

create index if not exists da_questions_filters_idx
  on public.da_questions (subject, difficulty, origin, is_published);
create index if not exists da_questions_exam_idx
  on public.da_questions (exam_id);
create index if not exists da_questions_bank_year_idx
  on public.da_questions (bank, source_year);

create table if not exists public.da_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exam_id uuid references public.da_exams(id) on delete set null,
  mode text not null default 'classico',
  started_at timestamptz not null default now(),
  finished_at timestamptz
);
create index if not exists da_sessions_user_idx
  on public.da_sessions (user_id, started_at desc);

create table if not exists public.da_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.da_questions(id) on delete cascade,
  session_id uuid references public.da_sessions(id) on delete set null,
  selected_index integer not null check (selected_index >= 0),
  is_correct boolean not null,
  answered_at timestamptz not null default now()
);
create index if not exists da_attempts_user_date_idx
  on public.da_attempts (user_id, answered_at desc);
create index if not exists da_attempts_question_idx
  on public.da_attempts (question_id);

create table if not exists public.da_question_history (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.da_questions(id) on delete cascade,
  shown_count integer not null default 1 check (shown_count >= 1),
  last_seen_at timestamptz not null default now(),
  primary key (user_id, question_id)
);
create index if not exists da_question_history_seen_idx
  on public.da_question_history (user_id, last_seen_at desc);

-- A tabela completa contém gabaritos e fica fechada para clientes.
-- A view fornece somente perguntas publicadas, sem gabarito.
create or replace view public.da_question_catalog as
select
  id, source_key, exam_id, subject, difficulty, statement, options,
  variants, origin, bank, source_url, source_year, source_question, metadata
from public.da_questions
where is_published = true;

alter table public.da_profiles enable row level security;
alter table public.da_exams enable row level security;
alter table public.da_questions enable row level security;
alter table public.da_sessions enable row level security;
alter table public.da_attempts enable row level security;
alter table public.da_question_history enable row level security;

-- Apenas o dono acessa seus dados; perguntas completas não possuem policy de leitura.
drop policy if exists da_profiles_select on public.da_profiles;
create policy da_profiles_select on public.da_profiles
  for select to authenticated using ((select auth.uid()) = id);
drop policy if exists da_profiles_insert on public.da_profiles;
create policy da_profiles_insert on public.da_profiles
  for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists da_profiles_update on public.da_profiles;
create policy da_profiles_update on public.da_profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists da_exams_read on public.da_exams;
create policy da_exams_read on public.da_exams
  for select to anon, authenticated using (is_active = true);

drop policy if exists da_sessions_select on public.da_sessions;
create policy da_sessions_select on public.da_sessions
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists da_sessions_insert on public.da_sessions;
create policy da_sessions_insert on public.da_sessions
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists da_sessions_update on public.da_sessions;
create policy da_sessions_update on public.da_sessions
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists da_attempts_select on public.da_attempts;
create policy da_attempts_select on public.da_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists da_history_select on public.da_question_history;
create policy da_history_select on public.da_question_history
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists da_history_insert on public.da_question_history;
create policy da_history_insert on public.da_question_history
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists da_history_update on public.da_question_history;
create policy da_history_update on public.da_question_history
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
drop policy if exists da_history_delete on public.da_question_history;
create policy da_history_delete on public.da_question_history
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Em ambientes de prática, a resposta correta só é liberada pela função abaixo.
create or replace function public.da_submit_answer(
  p_question_id uuid,
  p_selected_index integer,
  p_session_id uuid default null
)
returns table (
  attempt_id uuid,
  is_correct boolean,
  correct_index integer,
  explanation text
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_question public.da_questions%rowtype;
  v_attempt uuid;
  v_is_correct boolean;
begin
  if v_user is null then
    raise exception 'Autenticacao obrigatoria';
  end if;

  select * into v_question
    from public.da_questions
    where id = p_question_id and is_published = true;

  if not found then
    raise exception 'Questao indisponivel';
  end if;
  if p_selected_index is null
     or p_selected_index < 0
     or p_selected_index >= jsonb_array_length(v_question.options) then
    raise exception 'Alternativa invalida';
  end if;
  if p_session_id is not null and not exists (
    select 1 from public.da_sessions
    where id = p_session_id and user_id = v_user and finished_at is null
  ) then
    raise exception 'Sessao indisponivel';
  end if;

  v_is_correct := (p_selected_index = v_question.answer_index);

  insert into public.da_attempts (user_id, question_id, session_id, selected_index, is_correct)
    values (v_user, p_question_id, p_session_id, p_selected_index, v_is_correct)
    returning id into v_attempt;

  return query select
    v_attempt, v_is_correct, v_question.answer_index, v_question.explanation;
end;
$$;

-- Cria o perfil quando uma conta Supabase Auth é registrada.
create or replace function public.da_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.da_profiles (id, display_name)
    values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', 'Estudante'))
    on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists da_on_auth_user_created on auth.users;
create trigger da_on_auth_user_created
  after insert on auth.users
  for each row execute function public.da_handle_new_user();

-- Ajusta os privilégios concedidos pelo schema public padrão do Supabase.
revoke all on public.da_questions from anon, authenticated;
revoke all on public.da_attempts from anon, authenticated;
revoke all on public.da_profiles from anon, authenticated;
revoke all on public.da_exams from anon, authenticated;
revoke all on public.da_sessions from anon, authenticated;
revoke all on public.da_question_history from anon, authenticated;
revoke all on public.da_question_catalog from anon, authenticated;

grant select on public.da_exams to anon, authenticated;
grant select on public.da_question_catalog to anon, authenticated;
grant select, insert, update on public.da_profiles to authenticated;
grant select, insert, update on public.da_sessions to authenticated;
grant select on public.da_attempts to authenticated;
grant select, insert, update, delete on public.da_question_history to authenticated;

revoke all on function public.da_submit_answer(uuid, integer, uuid) from public, anon;
grant execute on function public.da_submit_answer(uuid, integer, uuid) to authenticated;
revoke all on function public.da_handle_new_user() from public, anon, authenticated;
