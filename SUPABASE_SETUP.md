# Supabase — banco do Desafio Aprovação

**Projeto de destino:** https://supabase.com/dashboard/project/kahgwfoqjgdoddkhvgoy

Este repositório contém o banco de questões e simulados em JavaScript. O Supabase pode armazenar os dados online, mas **o site ainda não foi alterado para autenticar ou sincronizar dados automaticamente**.

## Criar estrutura do PostgreSQL

1. Abra o projeto no Supabase e vá em **SQL Editor**.
2. Cole e execute o conteúdo de [supabase/migrations/20261013_desafio_aprovacao.sql](supabase/migrations/20261013_desafio_aprovacao.sql).
3. Em **Table Editor**, confirme a presença de da_exams, da_questions, da_profiles, da_sessions, da_attempts e da_question_history.

A migração não remove tabelas nem apaga registros. As regras RLS protegem o histórico de cada conta. O catálogo público é a view **da_question_catalog**, que **não expõe o gabarito**. O gabarito é retornado após resposta por meio da função **da_submit_answer**, disponível só para usuários autenticados. O login é gerenciado pelo Supabase Auth.

## Importar o banco atual de questões

Use **Node.js 18 ou superior** no terminal, na raiz do repositório. Crie variáveis de ambiente de maneira segura (não as grave no Git):

- \`SUPABASE_URL=https://kahgwfoqjgdoddkhvgoy.supabase.co\`
- \`SUPABASE_SERVICE_ROLE_KEY\`: chave secreta da seção **Project Settings → API Keys**. Nunca publique ou insira no HTML.

Execute \`node scripts/import-questions.mjs\`.

O script lê os sete arquivos JavaScript de perguntas usados no site, cria provas encontradas e faz **upsert** das questões por \`source_key\`: rodar duas vezes não duplica os registros. Questões adaptadas de provas são identificadas como **adaptadas**, não reproduções oficiais. Os 32 itens de Ética do INSS são tratados como conteúdo autoral de edital, conforme o README principal.

## Integração com o site

Para acessar o catálogo com uma chave pública (publishable/anon), consulte \`da_question_catalog\`. Não leia a tabela \`da_questions\` diretamente. Use Supabase Auth para login; usuários autenticados podem criar sessões e chamar a função RPC \`da_submit_answer\` para registrar e corrigir respostas. Use \`da_question_history\` para não repetir questões entre dispositivos.

O front-end atual usa \`localStorage\` e os arquivos JavaScript antigos. Ele permanece funcionando como antes; a migração do front-end e a transferência de históricos locais devem ser etapas separadas, para não quebrar a versão publicada.

**Segurança:** nunca use \`service_role\` no navegador; apenas em scripts executados localmente/servidor. Execute a migração somente após conferir se o projeto Supabase é o destino correto.
