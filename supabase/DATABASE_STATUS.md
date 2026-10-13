# Estado do banco Supabase — Desafio Aprovação

**Projeto:** https://supabase.com/dashboard/project/kahgwfoqjgdoddkhvgoy

**Configuração realizada em 13/10/2026.**

Estrutura PostgreSQL criada e validada:

- `da_profiles` — usuários.
- `da_exams` — provas.
- `da_questions` — questões completas (gabarito protegido).
- `da_sessions` — simulados.
- `da_attempts` — respostas.
- `da_question_history` — prevenção de repetição.

**Resultado da importação da versão do repositório nessa data:** 372 questões de IDs únicos e respostas válidas; 9 cadastros de provas. Classificação: 145 autorais, 202 criadas com base em editais, 25 adaptadas de questões de provas. A classificação "adaptada" não significa transcrição oficial literal.

**Testes realizados:** catálogo público `da_question_catalog` retornou 372 questões usando permissões do papel `anon`; `anon` não tem acesso de leitura às colunas `answer_index` e `explanation`; função de correção `da_submit_answer` é acessível apenas a usuários autenticados. RLS habilitado nas seis tabelas.

**Atenção:** o site HTML ainda utiliza as perguntas JavaScript e salva progresso no `localStorage`. O banco está pronto e populado, mas a aplicação web ainda não foi alterada para fazer login e salvar/sincronizar o progresso no Supabase. As futuras alterações de perguntas no GitHub também não são importadas automaticamente; para sincronizá-las, execute novamente o script de importação documentado em `SUPABASE_SETUP.md`.

**Aviso de segurança:** o advisor do Supabase ainda aponta a função `public.da_submit_answer` como `SECURITY DEFINER` executável por usuários autenticados. Isso é intencional para corrigir respostas sem revelar o gabarito; a função verifica o usuário com `auth.uid()` e restringe a sessão ao seu dono. Faça revisão adicional antes de disponibilizar um ambiente de provas valendo nota.
