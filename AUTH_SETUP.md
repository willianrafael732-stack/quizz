# Login do Desafio Aprovação (Supabase)

Projeto: https://supabase.com/dashboard/project/kahgwfoqjgdoddkhvgoy

A página `index.html` oferece **e-mail/senha**, **Google** e **modo visitante** (sem conta). O acesso e a sessão são gerenciados pelo Supabase Auth, nunca por senhas no localStorage. A sessão do Supabase persiste no navegador. A tabela `da_user_progress` (com RLS) recebe estatísticas, histórico de respostas e rotação do quiz para cada usuário autenticado. O progresso do visitante é preservado separadamente e recuperado quando ele sai da conta. A sincronização ocorre após alterações, com atraso curto. As demais ferramentas independentes do site podem continuar usando armazenamento local.

## O que já foi instalado
- Front-end: `auth.js`, `auth.css` e botão **Entrar** no topo da página.
- Banco: migração `da_user_progress_auth_sync` aplicada ao projeto em 13/10/2026.
- Chave: apenas a **publishable key** no cliente. Nunca coloque secret ou service_role no GitHub.

## Para liberar login Google (etapa do dono da conta Google)
1. Acesse https://console.cloud.google.com/auth/clients e crie cliente OAuth **Aplicativo da Web**.
2. Em **Authorized JavaScript origins**, adicione o domínio real onde o GitHub/Netlify está publicado.
3. Em **Authorized redirect URIs**, adicione exatamente `https://kahgwfoqjgdoddkhvgoy.supabase.co/auth/v1/callback`.
4. No Supabase, abra https://supabase.com/dashboard/project/kahgwfoqjgdoddkhvgoy/auth/providers e configure o provedor **Google** com o **Client ID** e **Client Secret** obtidos no Google Cloud.
5. Em https://supabase.com/dashboard/project/kahgwfoqjgdoddkhvgoy/auth/url-configuration, coloque o endereço público do site em **Site URL** e **Redirect URLs**. Adicione `http://localhost:8000/**` apenas para desenvolvimento.

O provedor de e-mail/senha normalmente está habilitado por padrão, mas revise **Authentication → Providers → Email**. Se a confirmação de e-mail estiver ligada, o usuário deve confirmar o link recebido.

**Importante:** alterações deste repositório GitHub não atualizam automaticamente o domínio `chatgpt.site` salvo se houver um deploy configurado com este repositório.

Referências: https://supabase.com/docs/guides/auth/social-login/auth-google e https://supabase.com/docs/guides/auth/redirect-urls
