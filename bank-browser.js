(() => {
  const FEED_HISTORY_KEY = 'da_question_feed_history_v1';
  const FEED_VARIANT_KEY = 'da_question_feed_variant_v1';
  const FEED_BATCH = 6;
  let filtered = [];
  let cursor = 0;
  let sessionShown = new Set();

  const byId = id => document.getElementById(id);
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function safeLoad(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  }
  function bankOf(q){
    if(q.editalBased) return 'EDITAL';
    if(!q.realExam) return 'AUTORAL';
    if(q.bank) return q.bank;
    if(q.exam === 'ENEM') return 'INEP';
    if(String(q.exam || '').includes('USP')) return 'FUVEST';
    if(String(q.exam || '').includes('UNESP')) return 'VUNESP';
    if(String(q.exam || '').includes('UNICAMP')) return 'COMVEST';
    return q.exam || 'OUTRA';
  }
  function variantsOf(q){
    const base = Array.isArray(q.variants) && q.variants.length ? q.variants : [q.q];
    if(base.length >= 2) return base;
    return [q.q, `Analise o item de ${q.subject} e assinale a alternativa correta: ${q.q}`];
  }
  function chooseVariant(q){
    const history = safeLoad(FEED_VARIANT_KEY, {});
    const variants = variantsOf(q);
    const last = Number(history[q.id]);
    const choices = variants.map((_,i)=>i).filter(i => i !== last);
    const idx = choices.length ? choices[Math.floor(Math.random()*choices.length)] : 0;
    history[q.id] = idx;
    localStorage.setItem(FEED_VARIANT_KEY, JSON.stringify(history));
    return {text: variants[idx], index: idx};
  }
  function populateFilters(){
    const subjects = [...new Set(QUESTION_BANK.map(q=>q.subject))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
    byId('feedSubjectSelect').innerHTML = '<option value="todas">Todas as disciplinas</option>' + subjects.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('');
    const years = [...new Set(QUESTION_BANK.map(q=>q.realExam&&q.year?q.year:(q.editalBased&&q.programYear?q.programYear:null)).filter(Boolean))].sort((a,b)=>b-a);
    byId('feedYearSelect').innerHTML = '<option value="todos">Todos os anos</option>' + years.map(y=>`<option value="${y}">${y}</option>`).join('');
  }
  function getFiltered(){
    const subject = byId('feedSubjectSelect').value;
    const bank = byId('feedBankSelect').value;
    const year = byId('feedYearSelect').value;
    const difficulty = byId('feedDifficultySelect').value;
    const officialOnly = byId('feedOfficialOnly').checked;
    return QUESTION_BANK.filter(q => {
      if(subject !== 'todas' && q.subject !== subject) return false;
      if(bank !== 'todas' && bankOf(q) !== bank) return false;
      const itemYear=q.realExam?q.year:(q.editalBased?q.programYear:null);
      if(year !== 'todos' && Number(itemYear) !== Number(year)) return false;
      if(difficulty !== 'todas' && q.difficulty !== difficulty) return false;
      if(officialOnly && !q.realExam) return false;
      return true;
    });
  }
  function orderForRotation(list){
    const history = safeLoad(FEED_HISTORY_KEY, []).map(String);
    const recent = new Set(history.slice(-40));
    const unseen = shuffle(list.filter(q=>!recent.has(String(q.id))));
    const seen = shuffle(list.filter(q=>recent.has(String(q.id))));
    return [...unseen, ...seen];
  }
  function applyFilters(forceShuffle=false){
    sessionShown = new Set();
    cursor = 0;
    const list = getFiltered();
    filtered = forceShuffle ? shuffle(list) : orderForRotation(list);
    byId('questionFeed').innerHTML = '';
    byId('feedResultCount').textContent = `${list.length} encontrada${list.length===1?'':'s'}`;
    byId('feedShowingText').textContent = list.length ? 'Mostrando questões sem repetição na lista' : 'Nenhuma questão com esses filtros';
    loadMore();
  }
  function loadMore(){
    const target = byId('questionFeed');
    let added = 0;
    while(cursor < filtered.length && added < FEED_BATCH){
      const q = filtered[cursor++];
      if(sessionShown.has(String(q.id))) continue;
      sessionShown.add(String(q.id));
      target.appendChild(renderCard(q, sessionShown.size));
      rememberShown(q.id);
      added++;
    }
    const btn = byId('btnFeedMore');
    btn.classList.toggle('hidden', cursor >= filtered.length || !filtered.length);
    if(!target.children.length){
      target.innerHTML = '<div class="feed-empty"><strong>Nenhuma questão encontrada.</strong><p>Tente mudar a disciplina, banca, ano ou dificuldade.</p></div>';
    }
  }
  function rememberShown(id){
    const history = safeLoad(FEED_HISTORY_KEY, []);
    history.push(String(id));
    localStorage.setItem(FEED_HISTORY_KEY, JSON.stringify(history.slice(-80)));
  }
  function renderCard(q, position){
    const variant = chooseVariant(q);
    const card = document.createElement('article');
    card.className = 'feed-question-card';
    card.dataset.id = q.id;
    const shuffledOptions = shuffle(q.options.map((text,index)=>({text,index})));
    const bank = bankOf(q);
    const sourceLine = q.editalBased
      ? `Conteúdo de edital/programa • ${(q.institutions||[]).join(' / ')} • referência ${q.programYear||''}`
      : q.realExam
      ? `${bank} • ${q.exam || 'Prova oficial'} • ${q.year || ''}${q.examQuestion ? ` • questão ${q.examQuestion}` : ''}`
      : 'Desafio Aprovação • questão autoral';
    card.innerHTML = `
      <div class="feed-question-top">
        <div><span class="feed-kicker">QUESTÃO ${position} · ${esc(q.subject)}</span><div class="feed-source">${esc(sourceLine)}</div></div>
        <div class="feed-pills"><span>${esc(capitalizeFeed(q.difficulty))}</span>${q.editalBased?'<span class="official">Do edital</span>':q.realExam?'<span class="official">Prova oficial</span>':'<span>Autoral</span>'}</div>
      </div>
      <div class="feed-prompt" data-role="prompt">${esc(variant.text)}</div>
      <div class="feed-options"></div>
      <div class="feed-feedback hidden"><strong></strong><p>${esc(q.explanation || 'Confira o conteúdo cobrado e revise a alternativa correta.')}</p></div>
      <div class="feed-card-actions">
        <button class="feed-link-btn" data-action="variant">↻ Outra forma do enunciado</button>
        ${q.sourceUrl ? `<a class="feed-link-btn" href="${esc(q.sourceUrl)}" target="_blank" rel="noopener">Abrir fonte oficial ↗</a>` : ''}
      </div>`;
    const optWrap = card.querySelector('.feed-options');
    shuffledOptions.forEach((op, i) => {
      const btn = document.createElement('button');
      btn.className = 'feed-option';
      btn.dataset.original = op.index;
      btn.innerHTML = `<span class="feed-letter">${String.fromCharCode(65+i)}</span><span>${esc(op.text)}</span>`;
      btn.addEventListener('click', () => answerFeed(card, q, btn, op.index));
      optWrap.appendChild(btn);
    });
    card.querySelector('[data-action="variant"]').addEventListener('click', () => {
      const v = chooseVariant(q);
      card.querySelector('[data-role="prompt"]').textContent = v.text;
    });
    return card;
  }
  function answerFeed(card, q, clicked, originalIndex){
    if(card.dataset.answered === '1') return;
    card.dataset.answered = '1';
    const options = [...card.querySelectorAll('.feed-option')];
    options.forEach(btn => {
      btn.disabled = true;
      if(Number(btn.dataset.original) === q.answer) btn.classList.add('correct');
    });
    const correct = originalIndex === q.answer;
    if(!correct) clicked.classList.add('wrong');
    const feedback = card.querySelector('.feed-feedback');
    feedback.classList.remove('hidden');
    feedback.classList.toggle('is-correct', correct);
    feedback.classList.toggle('is-wrong', !correct);
    feedback.querySelector('strong').textContent = correct ? 'Resposta correta' : 'Resposta incorreta — veja a correta destacada';
  }
  function capitalizeFeed(s){
    const t = String(s || '');
    return t ? t.charAt(0).toUpperCase()+t.slice(1) : '';
  }
  function resetHistory(){
    localStorage.removeItem(FEED_HISTORY_KEY);
    localStorage.removeItem(FEED_VARIANT_KEY);
    applyFilters(true);
    if(typeof toast === 'function') toast('Histórico da lista limpo.');
  }
  function init(){
    if(!byId('questionFeed')) return;
    populateFilters();
    ['feedSubjectSelect','feedBankSelect','feedYearSelect','feedDifficultySelect','feedOfficialOnly'].forEach(id => {
      byId(id).addEventListener('change', () => applyFilters(false));
    });
    byId('btnFeedApply').addEventListener('click', () => applyFilters(false));
    byId('btnFeedShuffle').addEventListener('click', () => applyFilters(true));
    byId('btnFeedMore').addEventListener('click', loadMore);
    byId('btnFeedResetHistory').addEventListener('click', resetHistory);
    applyFilters(false);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
