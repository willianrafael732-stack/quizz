
/* Login por e-mail/senha ou Google usando Supabase Auth. Nunca use secret/service_role aqui. */
(() => {
  'use strict';
  const API_URL = 'https://kahgwfoqjgdoddkhvgoy.supabase.co';
  const PUBLISHABLE_KEY = 'sb_publishable_rmiIzrq131KieQrPMOoakw_xa6CCsAX';
  const GUEST_BACKUP = 'da_guest_progress_v1';
  const byId = (id) => document.getElementById(id);
  const overlay = byId('daAuthOverlay');
  const form = byId('daAuthForm');
  const message = byId('daAuthMessage');
  const accountButton = byId('btnAccount');
  let client = null;
  let user = null;
  let hydrated = false;
  let mode = 'signin';
  let pendingTimer = null;
  let saving = Promise.resolve();

  function setMessage(text, kind = 'info') {
    if (!message) return;
    message.textContent = text || '';
    message.dataset.kind = kind;
  }
  function setBusy(busy) {
    for (const el of [byId('daAuthSubmit'), byId('daAuthGoogle')]) if (el) el.disabled = busy;
  }
  function openModal() {
    if (!overlay) return;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    setMessage('');
    byId('daAuthClose')?.focus();
  }
  function closeModal() {
    if (!overlay) return;
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
    accountButton?.focus();
  }
  function updateMode(next) {
    mode = next === 'signup' ? 'signup' : 'signin';
    byId('daNameRow').hidden = mode !== 'signup';
    byId('daAuthName').required = mode === 'signup';
    byId('daAuthPassword').autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
    byId('daAuthSubmit').textContent = mode === 'signup' ? 'Criar minha conta' : 'Entrar com e-mail';
    byId('daTabSignin').setAttribute('aria-selected', String(mode === 'signin'));
    byId('daTabSignup').setAttribute('aria-selected', String(mode === 'signup'));
    setMessage('');
  }
  function displayName(u) {
    return u?.user_metadata?.full_name || u?.user_metadata?.name || u?.email?.split('@')[0] || 'Estudante';
  }
  function renderAccount() {
    if (!accountButton) return;
    accountButton.textContent = user ? '👤 ' + displayName(user) : '👤 Entrar';
    accountButton.title = user ? 'Minha conta' : 'Entrar ou criar conta';
    byId('daAuthFormArea').hidden = Boolean(user);
    byId('daAuthProfileArea').hidden = !user;
    byId('daAuthProfileName').textContent = user ? displayName(user) : '';
    byId('daAuthProfileEmail').textContent = user?.email || '';
  }
  function currentSnapshot() {
    return window.DAStudy?.snapshot?.() || {};
  }
  function backupGuest() {
    if (!localStorage.getItem(GUEST_BACKUP)) {
      localStorage.setItem(GUEST_BACKUP, JSON.stringify(currentSnapshot()));
    }
  }
  function restoreGuest() {
    let backup = null;
    try { backup = JSON.parse(localStorage.getItem(GUEST_BACKUP) || 'null'); } catch {}
    localStorage.removeItem(GUEST_BACKUP);
    window.DAStudy?.restore?.(backup || {stats:{},recentHistory:[],variantHistory:{},answerHistory:[]});
  }
  async function loadAccount(nextUser) {
    if (!nextUser || !client) return;
    if (user?.id === nextUser.id && hydrated) { renderAccount(); return; }
    if (user?.id && user.id !== nextUser.id) {
      hydrated = false;
      clearTimeout(pendingTimer);
      restoreGuest();
    }
    user = nextUser;
    hydrated = false;
    renderAccount();
    backupGuest();
    const { data, error } = await client.from('da_user_progress')
      .select('data').eq('user_id', nextUser.id).maybeSingle();
    if (user?.id !== nextUser.id) return;
    if (error) {
      setMessage('Conta conectada, mas não foi possível carregar o progresso online. Seus dados locais foram mantidos.', 'error');
      return;
    }
    if (data?.data && typeof data.data === 'object') {
      window.DAStudy?.restore?.(data.data);
    } else {
      const { error: insertError } = await client.from('da_user_progress').upsert(
        {user_id: nextUser.id, data: currentSnapshot(), updated_at: new Date().toISOString()},
        {onConflict: 'user_id'}
      );
      if (insertError) {
        setMessage('Conta conectada, mas o progresso ainda não está sincronizado.', 'error');
        return;
      }
    }
    hydrated = true;
    closeModal();
  }
  function clearAccount() {
    if (!user) return;
    user = null;
    hydrated = false;
    clearTimeout(pendingTimer);
    restoreGuest();
    renderAccount();
  }
  function queueSync() {
    if (!client || !user || !hydrated) return;
    clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      const signedUser = user;
      const payload = currentSnapshot();
      saving = saving.catch(() => {}).then(async () => {
        if (!signedUser || user?.id !== signedUser.id || !hydrated) return;
        const { error } = await client.from('da_user_progress').upsert(
          {user_id: signedUser.id, data: payload, updated_at: new Date().toISOString()},
          {onConflict: 'user_id'}
        );
        if (error) console.warn('Não foi possível sincronizar o progresso:', error.message);
      });
    }, 950);
  }
  window.DAAuth = {queueSync};

  accountButton?.addEventListener('click', openModal);
  byId('daAuthClose')?.addEventListener('click', closeModal);
  byId('daAuthGuest')?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (event) => { if (event.target === overlay) closeModal(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) closeModal();
  });
  byId('daTabSignin')?.addEventListener('click', () => updateMode('signin'));
  byId('daTabSignup')?.addEventListener('click', () => updateMode('signup'));

  if (!window.supabase?.createClient) {
    accountButton?.addEventListener('click', () => setMessage('A conexão de autenticação não carregou. Verifique sua internet e recarregue a página.', 'error'));
    renderAccount();
    return;
  }
  client = window.supabase.createClient(API_URL, PUBLISHABLE_KEY, {
    auth: {persistSession: true, autoRefreshToken: true, detectSessionInUrl: true}
  });
  renderAccount();

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    setMessage('');
    const email = byId('daAuthEmail').value.trim();
    const password = byId('daAuthPassword').value;
    if (password.length < 6) { setMessage('A senha precisa ter pelo menos 6 caracteres.', 'error'); return; }
    setBusy(true);
    try {
      const result = mode === 'signup'
        ? await client.auth.signUp({
            email, password,
            options: {
              data: {full_name: byId('daAuthName').value.trim() || email.split('@')[0]},
              emailRedirectTo: window.location.origin + window.location.pathname
            }
          })
        : await client.auth.signInWithPassword({email, password});
      if (result.error) throw result.error;
      if (mode === 'signup' && !result.data.session) {
        setMessage('Conta solicitada! Verifique seu e-mail e clique no link de confirmação para entrar.', 'success');
      } else {
        setMessage('Login realizado! Carregando seu perfil...', 'success');
        if (result.data.user) await loadAccount(result.data.user);
      }
    } catch (error) {
      setMessage(/Invalid login credentials/i.test(error.message)
        ? 'E-mail ou senha incorretos.' : (error.message || 'Falha ao acessar a conta.'), 'error');
    } finally {
      setBusy(false);
    }
  });

  byId('daAuthGoogle')?.addEventListener('click', async () => {
    setBusy(true);
    setMessage('Redirecionando para o Google...');
    try {
      backupGuest();
      const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {redirectTo: window.location.origin + window.location.pathname}
      });
      if (error) throw error;
    } catch (error) {
      setMessage('Não foi possível iniciar o login Google: ' + error.message, 'error');
      setBusy(false);
    }
  });

  byId('daAuthReset')?.addEventListener('click', async () => {
    const email = byId('daAuthEmail').value.trim();
    if (!email) { setMessage('Preencha seu e-mail para recuperar a senha.', 'error'); return; }
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    setMessage(error ? error.message : 'Se o endereço estiver cadastrado, você receberá um e-mail para recuperar a senha.', error ? 'error' : 'success');
  });

  byId('daAuthSignout')?.addEventListener('click', async () => {
    setBusy(true);
    const { error } = await client.auth.signOut();
    if (error) { setMessage(error.message, 'error'); setBusy(false); return; }
    clearAccount();
    closeModal();
    setBusy(false);
  });

  client.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      clearAccount();
    } else if (event === 'SIGNED_IN' && session?.user) {
      // Não faça queries Supabase dentro do callback síncrono de Auth.
      setTimeout(() => { loadAccount(session.user).catch(console.warn); }, 0);
    }
  });
  client.auth.getUser().then(({data, error}) => {
    if (!error && data.user) loadAccount(data.user).catch(console.warn);
  }).catch(console.warn);
})();
