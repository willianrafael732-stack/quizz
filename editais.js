(() => {
  const byId = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const years = (start, end) => Array.from({length: end - start + 1}, (_, i) => end - i);

  function enemUrl(year){
    return `https://www.gov.br/inep/pt-br/centrais-de-conteudo/legislacao/enem/${year}`;
  }

  function fuvestUrl(year){
    if(year === 2027) return 'https://www.fuvest.br/vestibular-da-usp/';
    return `https://www.fuvest.br/acervo-vestibular-${year}/`;
  }

  function unicampUrl(year){
    if(year === 2027) return 'https://www.comvest.unicamp.br/ingresso-2027/vestibular-2027/';
    if(year >= 2021) return `https://www.comvest.unicamp.br/vestibular-${year}/`;
    if(year === 2020) return 'https://www2.comvest.unicamp.br/vestibulares-anteriores/ingresso-2020/';
    if(year === 2019) return 'https://www2.comvest.unicamp.br/vestibulares-anteriores/ingresso-2019/';
    if(year >= 1998) return `https://www2.comvest.unicamp.br/vestibulares-anteriores/vestibular-${year}/`;
    const oldMap = {1997:'01',1996:'02',1995:'03',1994:'04',1993:'05',1992:'06',1991:'07',1990:'08',1989:'09'};
    return `https://www2.comvest.unicamp.br/vestibulares-anteriores/vestibular-1997-${oldMap[year]}/`;
  }

  function unespUrl(year){
    const direct = {
      2027: 'https://www.vunesp.com.br/VNSP2514',
      2025: 'https://www.vunesp.com.br/VNSP2404',
      2024: 'https://www.vunesp.com.br/VNSP2303'
    };
    return direct[year] || 'https://www.vunesp.com.br/institucional/estatisticavestibular';
  }

  const vestibularRecords = [
    ...years(2009, 2026).map(year => ({type:'edition', institution:'ENEM', bank:'INEP', year, title:`ENEM ${year}`, kind:'Editais e legislação', url:enemUrl(year), direct:true, note:'Página anual da legislação do Enem no portal do Inep.'})),
    ...years(1977, 2027).map(year => ({type:'edition', institution:'FUVEST', bank:'FUVEST', year, title:`FUVEST ${year}`, kind: year === 2027 ? 'Resolução e guias' : 'Manual / resolução / documentos', url:fuvestUrl(year), direct:true, note: year === 2027 ? 'Página oficial da edição atual, com resolução e guias.' : 'Acervo oficial da FUVEST para esta edição.'})),
    ...years(2018, 2027).map(year => ({type:'edition', institution:'UNESP', bank:'VUNESP', year, title:`UNESP ${year}`, kind:'Editais e documentos', url:unespUrl(year), direct:[2024,2025,2027].includes(year), note:[2024,2025,2027].includes(year) ? 'Página oficial desta edição na Vunesp.' : 'O acervo da Vunesp reúne esta edição; selecione o ano na página oficial.'})),
    ...years(1989, 2027).map(year => ({type:'edition', institution:'UNICAMP', bank:'COMVEST', year, title:`UNICAMP ${year}`, kind:'Edital / resolução / manual', url:unicampUrl(year), direct:true, note: year <= 2020 ? 'Página histórica da Comvest para esta edição.' : 'Página oficial da Comvest para esta edição.'}))
  ].sort((a,b) => b.year-a.year || a.institution.localeCompare(b.institution));

  const catalog = window.PUBLIC_EXAM_CATALOG || {types:[], banks:[]};
  const publicTypes = (catalog.types || []).map(t => ({
    type:'public-type', institution:'CONCURSOS', bank:'CONCURSO PÚBLICO', year:null,
    title:t.title, kind:`${t.group} • área de concurso`, note:t.desc,
    typeId:t.id, examples:t.examples || [], subjects:t.subjects || []
  }));
  const publicBanks = (catalog.banks || []).map(b => ({
    type:'public-bank', institution:'CONCURSOS', bank:b.id, year:null,
    title:b.name, kind:'Banca organizadora • acervo de concursos', note:b.note,
    bankId:b.id, url:b.url, tags:b.tags || []
  }));

  const allRecords = [...vestibularRecords, ...publicTypes, ...publicBanks];
  const ranges = {
    ENEM: '2009–2026', FUVEST: '1977–2027', UNESP: '2018–2027', UNICAMP: '1989–2027'
  };

  let limit = 24;
  let filtered = [...allRecords];

  function publicYear(){
    const v = byId('editalYear')?.value || 'todos';
    return v === 'todos' ? null : Number(v);
  }

  function selectedPublicYearLabel(){
    const y = publicYear();
    return y ? `BUSCA ${y}` : 'TODOS OS ANOS';
  }

  function fillInstitution(){
    const select = byId('editalInstitution');
    if(!select) return;
    select.innerHTML = `
      <option value="todas">Todas as provas e concursos</option>
      <optgroup label="Vestibulares e exames">
        <option value="ENEM">ENEM / INEP</option>
        <option value="FUVEST">FUVEST / USP</option>
        <option value="UNESP">UNESP / VUNESP</option>
        <option value="UNICAMP">UNICAMP / COMVEST</option>
      </optgroup>
      <optgroup label="Concursos públicos">
        <option value="CONCURSOS">Todos os concursos públicos</option>
        <option value="CONCURSO-TIPOS">Áreas e carreiras de concurso</option>
        <option value="CONCURSO-BANCAS">Bancas organizadoras</option>
      </optgroup>`;
  }

  function fillYears(){
    const select = byId('editalYear');
    if(!select) return;
    const uniqueYears = [...new Set(vestibularRecords.map(r=>r.year))].sort((a,b)=>b-a);
    select.innerHTML = '<option value="todos">Todos os anos</option>' + uniqueYears.map(y=>`<option value="${y}">${y}</option>`).join('');
  }

  function summary(){
    const el=byId('editalSummary');
    if(!el) return;
    const configs=[
      {value:'ENEM', bank:'INEP', name:'ENEM', range:'2009–2026', count:'18 edições'},
      {value:'FUVEST', bank:'USP', name:'FUVEST', range:'1977–2027', count:'51 edições'},
      {value:'UNESP', bank:'VUNESP', name:'UNESP', range:'2018–2027', count:'10 edições'},
      {value:'UNICAMP', bank:'COMVEST', name:'UNICAMP', range:'1989–2027', count:'39 edições'},
      {value:'CONCURSOS', bank:'CONCURSOS', name:'CONCURSOS PÚBLICOS', range:'Áreas + bancas', count:`${publicTypes.length} tipos • ${publicBanks.length} bancas`}
    ];
    el.innerHTML=configs.map(c=>`<button class="edital-summary-card${c.value==='CONCURSOS'?' public-summary-card':''}" data-inst="${c.value}"><span>${c.bank}</span><strong>${c.name}</strong><b>${c.range}</b><small>${c.count} catalogados</small></button>`).join('');
    el.querySelectorAll('[data-inst]').forEach(btn=>btn.addEventListener('click',()=>{
      byId('editalInstitution').value=btn.dataset.inst;
      limit=24; render();
      byId('editalGrid')?.scrollIntoView({behavior:'smooth', block:'start'});
    }));
  }

  function matchesInstitution(r, value){
    if(value === 'todas') return true;
    if(value === 'CONCURSOS') return r.institution === 'CONCURSOS';
    if(value === 'CONCURSO-TIPOS') return r.type === 'public-type';
    if(value === 'CONCURSO-BANCAS') return r.type === 'public-bank';
    return r.institution === value;
  }

  function applyFilter(){
    const institution=byId('editalInstitution')?.value || 'todas';
    const year=byId('editalYear')?.value || 'todos';
    const term=(byId('editalSearch')?.value || '').trim().toLowerCase();
    filtered=allRecords.filter(r=>{
      if(!matchesInstitution(r, institution)) return false;
      if(year!=='todos' && r.type === 'edition' && String(r.year)!==year) return false;
      if(term){
        const hay=`${r.institution} ${r.bank} ${r.year || ''} ${r.title} ${r.kind} ${r.note} ${(r.examples||[]).join(' ')} ${(r.tags||[]).join(' ')}`.toLowerCase();
        if(!hay.includes(term)) return false;
      }
      return true;
    });

    // Quando um ano é selecionado, os concursos continuam aparecendo como atalhos de busca
    // naquele ano, sem afirmar que toda banca realizou prova em todos os anos.
    filtered.sort((a,b)=>{
      if(a.type==='edition' && b.type==='edition') return b.year-a.year || a.institution.localeCompare(b.institution);
      if(a.type==='edition') return -1;
      if(b.type==='edition') return 1;
      if(a.type!==b.type) return a.type==='public-type' ? -1 : 1;
      return a.title.localeCompare(b.title,'pt-BR');
    });
  }

  function editionCard(r){
    return `<article class="edital-card">
      <div class="edital-card-top"><span class="edital-bank">${esc(r.bank)}</span><span class="edital-year">${r.year}</span></div>
      <h3>${esc(r.title)}</h3><p class="edital-kind">${esc(r.kind)}</p><small>${esc(r.note)}</small>
      <div class="edital-card-actions">
        <a href="${esc(r.url)}" target="_blank" rel="noopener">${r.direct ? 'Abrir documentos oficiais' : 'Abrir acervo oficial'} <span>↗</span></a>
        <button class="edital-train-btn" data-edital-inst="${esc(r.institution)}" data-edital-year="${r.year}" data-url="${encodeURIComponent(r.url)}">Treinar este edital →</button>
      </div>
    </article>`;
  }

  function publicTypeCard(r){
    return `<article class="edital-card public-archive-card">
      <div class="edital-card-top"><span class="edital-bank">CONCURSO</span><span class="edital-year">${selectedPublicYearLabel()}</span></div>
      <h3>${esc(r.title)}</h3><p class="edital-kind">${esc(r.kind)}</p><small>${esc(r.note)}</small>
      <div class="public-archive-tags">${(r.examples||[]).slice(0,4).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
      <div class="edital-card-actions">
        <button class="edital-train-btn" data-public-type="${esc(r.typeId)}">Treinar este concurso →</button>
        <button class="edital-link-btn" data-open-banks="1">Ver bancas catalogadas ↓</button>
      </div>
    </article>`;
  }

  function subjectsFromBank(r){
    const ids = new Set(r.tags || []);
    const list = publicTypes.filter(t => ids.has(t.typeId)).flatMap(t => t.subjects || []);
    return [...new Set(list)].slice(0,8);
  }

  function publicBankCard(r){
    const year = publicYear();
    const yearText = year ? `Use o portal da banca para localizar provas, editais e gabaritos de ${year}.` : 'Use o portal oficial para localizar provas, editais, gabaritos e concursos anteriores.';
    return `<article class="edital-card public-archive-card bank-archive-card">
      <div class="edital-card-top"><span class="edital-bank">${esc(r.bank)}</span><span class="edital-year">${selectedPublicYearLabel()}</span></div>
      <h3>${esc(r.title)}</h3><p class="edital-kind">${esc(r.kind)}</p><small>${esc(r.note)} ${esc(yearText)}</small>
      <div class="public-archive-tags">${(r.tags||[]).slice(0,5).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
      <div class="edital-card-actions">
        <a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Abrir portal oficial da banca <span>↗</span></a>
        <button class="edital-train-btn" data-public-bank="${esc(r.bankId)}">Treinar perfil da banca →</button>
      </div>
    </article>`;
  }

  function card(r){
    if(r.type === 'public-type') return publicTypeCard(r);
    if(r.type === 'public-bank') return publicBankCard(r);
    return editionCard(r);
  }

  function bindCards(){
    const grid=byId('editalGrid'); if(!grid) return;
    grid.querySelectorAll('[data-edital-inst]').forEach(btn=>btn.addEventListener('click',()=>{
      window.startEditalTraining?.(btn.dataset.editalInst, Number(btn.dataset.editalYear), decodeURIComponent(btn.dataset.url||''));
    }));
    grid.querySelectorAll('[data-public-type]').forEach(btn=>btn.addEventListener('click',()=>{
      const t=(catalog.types||[]).find(x=>x.id===btn.dataset.publicType);
      if(t) window.startPublicThemeTraining?.(t.title,t.subjects||[]);
    }));
    grid.querySelectorAll('[data-public-bank]').forEach(btn=>btn.addEventListener('click',()=>{
      const b=(catalog.banks||[]).find(x=>x.id===btn.dataset.publicBank);
      if(!b) return;
      const fake={tags:b.tags||[]};
      const subjects=subjectsFromBank(fake);
      window.startPublicThemeTraining?.(`Banca ${b.name}`,subjects.length?subjects:['Português','Matemática','Raciocínio Lógico','Informática']);
    }));
    grid.querySelectorAll('[data-open-banks]').forEach(btn=>btn.addEventListener('click',()=>{
      byId('editalInstitution').value='CONCURSO-BANCAS'; limit=24; render();
      byId('editalGrid')?.scrollIntoView({behavior:'smooth',block:'start'});
    }));
  }

  function render(){
    if(!byId('editalGrid')) return;
    applyFilter();
    const visible=filtered.slice(0,limit);
    byId('editalGrid').innerHTML=visible.length ? visible.map(card).join('') : '<div class="feed-empty"><strong>Nenhum item encontrado</strong><p>Altere a prova, o ano ou a pesquisa.</p></div>';
    bindCards();

    byId('editalTotal').textContent=`${allRecords.length} itens catalogados`;
    byId('editalShowing').textContent=`Mostrando ${visible.length} de ${filtered.length}`;

    const inst=byId('editalInstitution').value;
    if(inst === 'CONCURSOS' || inst === 'CONCURSO-TIPOS' || inst === 'CONCURSO-BANCAS'){
      const y=publicYear();
      byId('editalRangeNote').innerHTML=`<strong>Concursos públicos:</strong> ${publicTypes.length} áreas e ${publicBanks.length} bancas catalogadas.${y?` O ano ${y} será usado como referência ao consultar os acervos das bancas.`:' Escolha um ano se quiser direcionar a busca nos portais oficiais.'}`;
    } else if(inst==='todas') {
      byId('editalRangeNote').innerHTML=`<strong>Acervo:</strong> ENEM ${ranges.ENEM} • FUVEST ${ranges.FUVEST} • UNESP ${ranges.UNESP} • UNICAMP ${ranges.UNICAMP} • ${publicTypes.length} áreas de concurso • ${publicBanks.length} bancas`;
    } else {
      byId('editalRangeNote').innerHTML = `<strong>${inst}:</strong> anos catalogados ${ranges[inst]}.`;
    }

    const more=byId('btnEditalMore');
    more.style.display=visible.length < filtered.length ? '' : 'none';
    more.textContent = (inst==='CONCURSOS' || inst==='CONCURSO-TIPOS' || inst==='CONCURSO-BANCAS') ? 'Carregar mais concursos' : 'Carregar mais itens';
  }

  function reset(){
    byId('editalInstitution').value='todas';
    byId('editalYear').value='todos';
    byId('editalSearch').value='';
    limit=24; render();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    if(!byId('editalGrid')) return;
    fillInstitution(); fillYears(); summary(); render();
    byId('editalInstitution').addEventListener('change',()=>{limit=24;render();});
    byId('editalYear').addEventListener('change',()=>{limit=24;render();});
    byId('editalSearch').addEventListener('input',()=>{limit=24;render();});
    byId('btnEditalReset').addEventListener('click',reset);
    byId('btnEditalMore').addEventListener('click',()=>{limit+=24;render();});
  });
})();
