-- Segurança adicional para o catálogo: execute após 20261013_desafio_aprovacao.sql.
-- A view da_question_catalog obedece às permissões/RLS do visitante.
alter view public.da_question_catalog set (security_invoker = true);

-- Leitura apenas de questões publicadas.
drop policy if exists da_questions_published_read on public.da_questions;
create policy da_questions_published_read on public.da_questions
  for select to anon, authenticated using (is_published = true);

-- Nunca conceder SELECT na coluna answer_index nem explanation para clientes.
revoke all on public.da_questions from anon, authenticated;
grant select (
  id, source_key, exam_id, subject, difficulty, statement, options,
  variants, origin, bank, source_url, source_year, source_question,
  metadata, is_published
) on public.da_questions to anon, authenticated;
