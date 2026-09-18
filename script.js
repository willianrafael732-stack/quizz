const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const MODE_NAMES = {
  classico:'Modo Clássico', infinito:'Modo Infinito', sobrevivencia:'Sobrevivência',
  contraTempo:'Contra o Tempo', vestibular:'Vestibular', concurso:'Concurso Público', provasReais:'Provas Reais', edital:'Do Edital à Questão', publicoTematico:'Concurso por Área'
};
const VESTIBULAR_SUBJECTS = ['Português','Literatura','Redação','Inglês','Matemática','História','Geografia','Filosofia','Sociologia','Biologia','Física','Química'];
const CONCURSO_SUBJECTS = ['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo'];
const HISTORY_KEY = 'da_recent_question_history_v2';
const VARIANT_KEY = 'da_question_variant_history_v2';
const MAX_HISTORY = 45;
const ANSWER_HISTORY_KEY = 'da_answer_history_v1';
const MAX_ANSWER_HISTORY = 300;
const ANSWER_HISTORY_PAGE = 8;

// Segunda formulação, semanticamente equivalente, para cada questão-base.
const QUESTION_ALT_TEXT = {
  1:'Entre as alternativas, identifique a única palavra grafada corretamente segundo a ortografia-padrão.',
  2:'Na oração “Os candidatos chegaram cedo”, qual termo funciona como núcleo do sujeito?',
  3:'Marque a frase em que o emprego do acento indicativo de crase está correto.',
  4:'Na construção “Embora estivesse cansado, continuou estudando”, qual relação de sentido é introduzida por “embora”?',
  5:'Qual alternativa apresenta concordância verbal adequada à norma-padrão da língua portuguesa?',
  6:'Na oração “Precisa-se de servidores”, qual é a função exercida pela palavra “se”?',
  7:'Assinale a alternativa formada por um advérbio.',
  8:'Em qual frase a colocação do pronome oblíquo respeita a norma-padrão?',
  20:'Calcule 15% de 200 e assinale o resultado correto.',
  21:'Na equação 3x + 6 = 21, qual é o valor de x?',
  22:'Um produto custa R$ 250,00 e recebe 12% de desconto. Quanto será pago após o desconto?',
  23:'Um serviço é concluído por 6 trabalhadores em 15 dias. Com produtividade constante, em quantos dias 10 trabalhadores fariam o mesmo serviço?',
  24:'Cinco valores, 6, 8, 10, 12 e x, têm média 10. Determine x.',
  25:'Aplicando R$ 1.000,00 a juros simples de 2% ao mês durante 5 meses, qual será o total de juros?',
  26:'Efetue o produto 2³ × 2⁴.',
  27:'Qual das frações apresentadas é equivalente ao número decimal 0,75?',
  40:'Observe o padrão numérico 2, 4, 8, 16. Qual é o próximo termo?',
  41:'Sabendo que todo analista é servidor e que alguns servidores são professores, qual afirmação é necessariamente verdadeira?',
  42:'Qual sentença representa corretamente a negação de “Todos os candidatos foram aprovados”?',
  43:'Em que única situação a implicação “Se estudo, então passo” assume valor lógico falso?',
  44:'Na sequência 1, 1, 2, 3, 5, 8, qual número deve aparecer em seguida?',
  45:'Considere P verdadeira e Q falsa. Qual é o valor lógico da conjunção P ∧ Q?',
  60:'Qual peça do computador executa instruções e realiza o processamento principal dos dados?',
  61:'Para navegar em páginas web com conexão protegida por TLS, qual protocolo é normalmente utilizado?',
  62:'No contexto de segurança digital, qual definição descreve corretamente phishing?',
  63:'Qual combinação de teclas do Windows abre diretamente o Gerenciador de Tarefas?',
  64:'Em qual camada do modelo OSI o protocolo IP é classificado?',
  65:'Entre os tipos de memória abaixo, qual é volátil e perde os dados quando o equipamento é desligado?',
  66:'Qual alternativa apresenta uma função típica do serviço DNS?',
  67:'Em um banco de dados relacional, qual é a finalidade fundamental de uma chave primária?',
  80:'De acordo com a Constituição Federal, quais são os três Poderes da União, independentes e harmônicos entre si?',
  81:'Qual remédio constitucional é usado para proteger direito líquido e certo que não seja amparado por habeas corpus ou habeas data?',
  82:'Em qual das situações apresentadas o voto é facultativo no Brasil?',
  83:'Quanto à organização político-territorial, qual forma de Estado é adotada pelo Brasil?',
  84:'Qual garantia constitucional sustenta, em regra, que ninguém seja considerado culpado antes do trânsito em julgado de condenação penal?',
  100:'Entre os princípios listados, qual aparece expressamente no caput do art. 37 da Constituição Federal?',
  101:'Como se denomina o poder-dever da Administração de revisar seus próprios atos?',
  102:'Qual atributo do ato administrativo permite, em hipóteses admitidas, a execução direta sem ordem judicial prévia?',
  103:'A Administração Pública decide anular um ato. Qual fundamento caracteriza essa anulação?',
  104:'Qual das alternativas corresponde a um dos objetivos da licitação pública?',
  120:'Em que ano ocorreu a proclamação da Independência do Brasil?',
  121:'A Lei Áurea, responsável pela abolição jurídica da escravidão no Brasil, foi assinada em qual ano?',
  122:'Qual país foi o principal berço da primeira Revolução Industrial?',
  123:'Quem chegou ao poder no Brasil em consequência do movimento político de 1930?',
  124:'Em que ano foi promulgada a Constituição brasileira chamada de “Constituição Cidadã”?',
  140:'Qual país possui a maior extensão territorial da América do Sul?',
  141:'Qual bioma ocupa a maior parte da região Norte brasileira?',
  142:'Como é chamado o deslocamento populacional do campo para as cidades?',
  143:'Em qual camada da atmosfera acontece a maior parte dos fenômenos meteorológicos?',
  144:'Qual linha imaginária de latitude 0° separa os hemisférios Norte e Sul?',
  160:'Qual organela celular está fortemente associada à respiração celular e à produção de ATP em células eucarióticas?',
  161:'Qual molécula guarda a informação genética na maioria dos seres vivos?',
  162:'Durante a fotossíntese, qual gás é absorvido principalmente para a fixação de carbono?',
  163:'Qual processo de divisão celular reduz pela metade o número de cromossomos?',
  164:'Qual sistema corporal distribui pelo organismo substâncias como oxigênio, nutrientes e hormônios?',
  180:'Qual é a unidade de medida de força no Sistema Internacional?',
  181:'Um automóvel percorre 120 km em 2 horas. Mantida a média, qual é a velocidade média do percurso?',
  182:'No SI, o watt é unidade de qual grandeza física?',
  183:'Um corpo de 2 kg adquire aceleração de 3 m/s². Qual força resultante atua sobre ele pela segunda lei de Newton?',
  184:'Aplicando a lei de Ohm a um circuito de 12 V e 4 Ω, qual é a corrente elétrica?',
  200:'Que símbolo representa o elemento químico oxigênio?',
  201:'Como deve ser classificada uma solução cujo pH é igual a 2?',
  202:'Qual partícula subatômica apresenta carga elétrica negativa?',
  203:'Elementos situados na mesma família da tabela periódica tendem a compartilhar qual característica?',
  204:'Qual é a fórmula molecular correta da água?'
};

const SUBJECT_INTROS = {
  'Português':'Em uma questão de Língua Portuguesa,', 'Matemática':'Em um item de cálculo,',
  'Raciocínio Lógico':'Em um exercício de raciocínio lógico,', 'Informática':'Em uma prova de conhecimentos de informática,',
  'Direito Constitucional':'Considerando conhecimentos de Direito Constitucional,', 'Direito Administrativo':'Considerando conhecimentos de Direito Administrativo,',
  'História':'Em uma questão de História,', 'Geografia':'Em uma questão de Geografia,', 'Biologia':'Em uma questão de Biologia,',
  'Física':'Em uma questão de Física,', 'Química':'Em uma questão de Química,'
};

const state = {
  mode:'classico', difficulty:'todas', subject:'todas', source:'todas', score:0, correct:0, wrong:0, streak:0, bestStreak:0,
  lives:3, answered:0, current:null, sessionIds:new Set(), locked:false, fifty:2, skips:2,
  timeLeft:0, timer:null, sound:true, targetQuestions:10, lastSubjects:[], variantIndex:0, editalInstitution:null, editalYear:null, editalUrl:null, publicSubjects:null, publicThemeLabel:null, statsCommitted:false
};

function safeNumber(value){
  const n=Number(value);
  return Number.isFinite(n) && n>=0 ? n : 0;
}
function loadStats(){
  let raw={};
  try{ raw=JSON.parse(localStorage.getItem('da_stats') || '{}') || {}; }catch{ raw={}; }
  return {
    best:safeNumber(raw.best), xp:safeNumber(raw.xp), played:safeNumber(raw.played),
    daily:safeNumber(raw.daily), dailyDate:typeof raw.dailyDate==='string'?raw.dailyDate:'',
    bestStreak:safeNumber(raw.bestStreak)
  };
}
const stats = loadStats();
const todayKey = new Date().toLocaleDateString('en-CA');
if(stats.dailyDate !== todayKey){ stats.daily=0; stats.dailyDate=todayKey; saveStats(); }

function loadRecentHistory(){
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]').filter(x => x !== null && x !== undefined); }
  catch { return []; }
}
function saveRecentHistory(items){ localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(-MAX_HISTORY))); }
function loadVariantHistory(){
  try { return JSON.parse(localStorage.getItem(VARIANT_KEY) || '{}'); }
  catch { return {}; }
}
function saveVariantHistory(map){ localStorage.setItem(VARIANT_KEY, JSON.stringify(map)); }

function loadAnswerHistory(){
  try{
    const items=JSON.parse(localStorage.getItem(ANSWER_HISTORY_KEY) || '[]');
    return Array.isArray(items)?items:[];
  }catch{ return []; }
}
function saveAnswerHistory(){
  answerHistory=answerHistory.slice(0,MAX_ANSWER_HISTORY);
  localStorage.setItem(ANSWER_HISTORY_KEY,JSON.stringify(answerHistory));
}

let recentHistory = loadRecentHistory();
let variantHistory = loadVariantHistory();
let answerHistory = loadAnswerHistory();
let historyVisible = ANSWER_HISTORY_PAGE;

bindEvents();
refreshHomeStats();
updateBankCount();
updateRecentInfo();
renderAnswerHistory();

function bindEvents(){
  $$('.mode-card').forEach(card => card.addEventListener('click', () => {
    $$('.mode-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected'); state.mode=card.dataset.mode;
    state.publicSubjects=null; state.publicThemeLabel=null;
    if(state.mode==='vestibular' || state.mode==='concurso' || state.mode==='provasReais' || state.mode==='edital') $('#subjectSelect').value='todas';
    if(state.mode==='provasReais') $('#sourceSelect').value='oficiais';
    if(state.mode==='edital'){ $('#sourceSelect').value='editais'; state.editalInstitution=null; state.editalYear=null; state.editalUrl=null; }
    else { state.editalInstitution=null; state.editalYear=null; state.editalUrl=null; }
    state.subject=$('#subjectSelect').value;
    state.source=$('#sourceSelect').value;
    updateBankCount();
  }));
  $$('#difficultyGroup button').forEach(btn => btn.addEventListener('click', () => {
    $$('#difficultyGroup button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); state.difficulty=btn.dataset.difficulty; updateBankCount();
  }));
  $('#subjectSelect').addEventListener('change', e => { state.subject=e.target.value; updateBankCount(); });
  $('#questionAmount').addEventListener('change', updateBankCount);
  $('#btnStart').addEventListener('click', startGame);
  $('#sourceSelect').addEventListener('change',()=>{state.source=$('#sourceSelect').value;updateBankCount();});
  $('#btnStartTop').addEventListener('click', ()=>$('#quickStart')?.scrollIntoView({behavior:'smooth',block:'start'}));
  $('#btnNext').addEventListener('click', nextQuestion);
  $('#btnSkip').addEventListener('click', skipQuestion);
  $('#btnFifty').addEventListener('click', useFifty);
  $('#btnQuit').addEventListener('click', ()=>finishGame(true));
  $('#btnPlayAgain').addEventListener('click', startGame);
  $('#btnHome').addEventListener('click', showHome);
  $('#btnSound').addEventListener('click', toggleSound);
  $('#btnTheme').addEventListener('click', toggleTheme);
  $('#btnClearHistory').addEventListener('click', clearRotationHistory);
  $('#btnResetXp')?.addEventListener('click', resetXp);
  $('#btnResetProgress')?.addEventListener('click', resetProgress);
  $('#btnClearAnswerHistory')?.addEventListener('click', clearAnswerHistory);
  $('#answerHistoryFilter')?.addEventListener('change',()=>{historyVisible=ANSWER_HISTORY_PAGE;renderAnswerHistory();});
  $('#btnHistoryMore')?.addEventListener('click',()=>{historyVisible+=ANSWER_HISTORY_PAGE;renderAnswerHistory();});
  $('#quickSearch').addEventListener('input', handleQuickSearch);
  $$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.nav-item').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
    if(btn.dataset.view){ showHome(); window.scrollTo({top:0,behavior:'smooth'}); }
    if(btn.dataset.scroll){ showHome(); setTimeout(()=>$('#'+btn.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'}),30); }
  }));
}

function handleQuickSearch(e){
  const term=normalize(e.target.value.trim());
  if(!term) return;
  const options=[...$('#subjectSelect').options].slice(1);
  const match=options.find(o=>normalize(o.textContent).includes(term));
  if(match){ $('#subjectSelect').value=match.value; state.subject=match.value; updateBankCount(); }
}

function startGame(){
  if(document.querySelector('#examFormat')?.checked){ startExam(); return; }
  clearInterval(state.timer);
  Object.assign(state,{score:0,correct:0,wrong:0,streak:0,bestStreak:0,lives:3,answered:0,current:null,sessionIds:new Set(),locked:false,fifty:2,skips:2,timeLeft:0,lastSubjects:[],statsCommitted:false});
  state.subject=$('#subjectSelect').value;
  state.source=$('#sourceSelect').value;
  state.targetQuestions=Number($('#questionAmount').value)||10;
  if(['infinito','sobrevivencia','contraTempo'].includes(state.mode)) state.targetQuestions=Infinity;
  if(state.mode==='contraTempo') state.timeLeft=60;
  if(state.mode==='vestibular' || state.mode==='concurso' || state.mode==='provasReais' || state.mode==='edital') state.targetQuestions=Number($('#questionAmount').value)||15;

  $('#gameModeLabel').textContent=MODE_NAMES[state.mode];
  $('#gameSubjectLabel').textContent=state.mode==='provasReais' ? 'Questões adaptadas de provas oficiais' : state.mode==='edital' ? (state.editalInstitution ? `${state.editalInstitution}${state.editalYear ? ' '+state.editalYear : ''} • treino por conteúdo do edital` : 'Conteúdos programáticos dos editais') : state.mode==='publicoTematico' ? (state.publicThemeLabel || 'Treino temático de concurso') : (state.subject==='todas'?'Matérias variadas':state.subject);
  $('#livesHud').classList.toggle('hidden',state.mode!=='sobrevivencia');
  $('#timerHud').classList.toggle('hidden',state.mode!=='contraTempo');
  $('#fiftyCount').textContent=state.fifty; $('#skipCount').textContent=state.skips;
  showScreen('gameScreen'); updateHud();
  if(state.mode==='contraTempo') startTimer();
  nextQuestion();
}

function filteredBank(){
  let list=QUESTION_BANK.slice();
  if(state.mode==='vestibular') list=list.filter(q=>VESTIBULAR_SUBJECTS.includes(q.subject));
  else if(state.mode==='concurso') list=list.filter(q=>CONCURSO_SUBJECTS.includes(q.subject) && !q.realExam && !q.editalBased);
  else if(state.mode==='provasReais') list=list.filter(q=>q.realExam);
  else if(state.mode==='publicoTematico') list=list.filter(q=>!q.realExam && !q.editalBased && (!state.publicSubjects || state.publicSubjects.includes(q.subject)));
  else if(state.mode==='edital') {
    list=list.filter(q=>q.editalBased);
    if(state.editalInstitution) list=list.filter(q=>Array.isArray(q.institutions) && q.institutions.includes(state.editalInstitution));
  }
  else if(state.subject!=='todas') list=list.filter(q=>q.subject===state.subject);

  if(state.mode!=='provasReais' && state.mode!=='edital'){
    if(state.source==='autorais') list=list.filter(q=>!q.realExam && !q.editalBased);
    else if(state.source==='oficiais') list=list.filter(q=>q.realExam);
    else if(state.source==='editais') list=list.filter(q=>q.editalBased);
    else if(state.source==='editalENEM') list=list.filter(q=>q.editalBased && q.institutions?.includes('ENEM'));
    else if(state.source==='editalFUVEST') list=list.filter(q=>q.editalBased && q.institutions?.includes('FUVEST'));
    else if(state.source==='editalUNESP') list=list.filter(q=>q.editalBased && q.institutions?.includes('UNESP'));
    else if(state.source==='editalUNICAMP') list=list.filter(q=>q.editalBased && q.institutions?.includes('UNICAMP')); 
    else if(state.source==='enem2025') list=list.filter(q=>q.realExam && q.exam==='ENEM' && q.year===2025);
    else if(state.source==='fuvest2025') list=list.filter(q=>q.realExam && (q.bank==='FUVEST' || q.exam==='FUVEST' || q.exam==='Vestibular USP') && q.year===2025);
    else if(state.source==='unesp2025') list=list.filter(q=>q.realExam && (q.bank==='VUNESP' || q.exam==='VUNESP' || q.exam==='Vestibular UNESP') && q.year===2025);
    else if(state.source==='unicamp2025') list=list.filter(q=>q.realExam && (q.bank==='COMVEST' || q.exam==='COMVEST' || q.exam==='Vestibular UNICAMP') && q.year===2025);
  }
  if(state.subject!=='todas' && (state.mode==='vestibular'||state.mode==='provasReais'||state.mode==='edital')) list=list.filter(q=>q.subject===state.subject);
  if(state.difficulty!=='todas') list=list.filter(q=>q.difficulty===state.difficulty);
  return list;
}

function chooseQuestion(bank){
  // 1) Não repete na mesma rodada enquanto houver questões disponíveis.
  let pool=bank.filter(q=>!state.sessionIds.has(String(q.id)));
  if(!pool.length){ state.sessionIds.clear(); pool=bank.slice(); }

  // 2) Evita o histórico salvo entre partidas. Se ficar restritivo demais, libera primeiro as mais antigas.
  const recentWindow=Math.min(24, Math.max(6, Math.floor(bank.length*.65)));
  const blocked=new Set(recentHistory.slice(-recentWindow).map(String));
  let fresh=pool.filter(q=>!blocked.has(String(q.id)));
  if(fresh.length) pool=fresh;
  else {
    const age=new Map(); recentHistory.forEach((id,i)=>age.set(String(id),i));
    pool.sort((a,b)=>(age.get(String(a.id))??-1)-(age.get(String(b.id))??-1));
    pool=pool.slice(0,Math.max(1,Math.ceil(pool.length/3)));
  }

  // 3) Quando há várias matérias, evita repetir a mesma matéria em sequência.
  const last=state.lastSubjects[state.lastSubjects.length-1];
  const before=state.lastSubjects[state.lastSubjects.length-2];
  const diverse=pool.filter(q=>q.subject!==last && q.subject!==before);
  if(diverse.length>=2) pool=diverse;
  else {
    const noImmediate=pool.filter(q=>q.subject!==last);
    if(noImmediate.length) pool=noImmediate;
  }
  return pool[Math.floor(Math.random()*pool.length)];
}

function nextQuestion(){
  if(!['infinito','sobrevivencia','contraTempo'].includes(state.mode) && state.answered>=state.targetQuestions){ finishGame(); return; }
  if(state.mode==='sobrevivencia' && state.lives<=0){ finishGame(); return; }
  state.locked=false; $('#btnNext').classList.add('hidden'); $('#explanationBox').classList.add('hidden'); $('#optionsContainer').innerHTML='';

  const bank=filteredBank();
  if(!bank.length){ toast('Não há questões nesse filtro.'); showHome(); return; }

  let q;
  const canProcedural=(state.mode==='infinito'||state.mode==='sobrevivencia'||state.mode==='contraTempo') && (state.subject==='todas'||state.subject==='Matemática');
  if(canProcedural && Math.random()<.18) q=generateMathQuestion();
  else q=chooseQuestion(bank);

  if(!q){ toast('Não foi possível selecionar uma questão.'); return; }
  if(!String(q.id).startsWith('g')){
    state.sessionIds.add(String(q.id));
    recentHistory.push(String(q.id)); saveRecentHistory(recentHistory);
    state.lastSubjects.push(q.subject); state.lastSubjects=state.lastSubjects.slice(-3);
  }

  state.current=prepareVariant(q);
  renderQuestion(state.current);
  updateRecentInfo();
}

function prepareVariant(q){
  if(q._procedural) return {...q, variantNumber:1};
  const variants=Array.isArray(q.variants) && q.variants.length>=2 ? q.variants : [
    q.q,
    QUESTION_ALT_TEXT[q.id] || `Responda corretamente ao seguinte item de ${q.subject}: ${q.q}`,
    `${SUBJECT_INTROS[q.subject] || 'Em um item de prova,'} ${lowerFirst(QUESTION_ALT_TEXT[q.id] || q.q)}`
  ];
  let last=Number(variantHistory[q.id]);
  let available=variants.map((_,i)=>i).filter(v=>v!==last);
  const chosen=available[Math.floor(Math.random()*available.length)];
  variantHistory[q.id]=chosen; saveVariantHistory(variantHistory);
  return {...q,q:variants[chosen],variantNumber:chosen+1};
}

function renderQuestion(q){
  if(q._ans) q.answer=q.options.indexOf(q._ans);
  $('#questionSubject').textContent=q.subject;
  $('#questionDifficulty').textContent=capitalize(q.difficulty);
  $('#variantBadge').textContent=`Variação ${q.variantNumber||1}`;
  $('#questionText').textContent=q.q;
  $('#questionCounter').textContent=`Questão ${state.answered+1}`;
  const sourceText=$('#questionSourceText');
  const sourceLink=$('#officialSourceLink');
  if(q.editalBased){
    const inst=state.editalInstitution || (q.institutions && q.institutions[0]) || 'Vestibular';
    const meta=(typeof EDITAL_PROGRAM_SOURCES!=='undefined' && EDITAL_PROGRAM_SOURCES[inst]) ? EDITAL_PROGRAM_SOURCES[inst] : null;
    sourceText.textContent=`${inst} • ${q.editalSection || 'Conteúdo programático'} • questão autoral baseada em documento oficial`;
    const href=state.editalUrl || meta?.url || q.sourceUrl;
    if(href){ sourceLink.href=href; sourceLink.classList.remove('hidden'); } else sourceLink.classList.add('hidden');
  } else if(q.realExam){
    const bank=q.bank || (q.exam==='ENEM'?'INEP':q.exam);
    sourceText.textContent=`${bank} • ${q.exam || 'Prova oficial'} • ${q.year || ''}${q.examQuestion ? ` • questão ${q.examQuestion}` : ''}`;
    if(q.sourceUrl){ sourceLink.href=q.sourceUrl; sourceLink.classList.remove('hidden'); } else sourceLink.classList.add('hidden');
  } else {
    sourceText.textContent='Questão autoral • Desafio Aprovação';
    sourceLink.classList.add('hidden');
  }
  $('#rotationStatus').textContent=q._procedural?'questão gerada na hora':q.editalBased?(state.editalYear && state.editalYear!==2026?`treino da banca • edital histórico ${state.editalYear}`:'conteúdo do edital • rotação ativa'):'rotação anti-repetição ativa';
  const progress=Number.isFinite(state.targetQuestions)?Math.min(100,(state.answered/state.targetQuestions)*100):((state.answered%10)*10);
  $('#questionProgressFill').style.width=progress+'%';

  const shuffled=q.options.map((text,index)=>({text,index})).sort(()=>Math.random()-.5);
  shuffled.forEach((op,i)=>{
    const btn=document.createElement('button'); btn.className='option-btn'; btn.dataset.original=op.index;
    btn.innerHTML=`<span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(op.text)}</span>`;
    btn.addEventListener('click',()=>answerQuestion(btn,op.index)); $('#optionsContainer').appendChild(btn);
  });
  updateHud();
}

function answerQuestion(btn,selected){
  if(state.locked) return;
  state.locked=true; state.answered++; stats.daily++; stats.dailyDate=todayKey;
  const correct=selected===state.current.answer;
  const buttons=$$('.option-btn');
  buttons.forEach(b=>{ b.disabled=true; if(Number(b.dataset.original)===state.current.answer)b.classList.add('correct'); });
  if(correct){
    state.correct++; state.streak++; state.bestStreak=Math.max(state.bestStreak,state.streak);
    const multiplier=1+Math.min(1.5,Math.floor(state.streak/3)*.25);
    const base=state.current.difficulty==='dificil'?150:state.current.difficulty==='medio'?110:80;
    state.score+=Math.round(base*multiplier); beep(700,.08); toast(state.streak>=3?`🔥 Combo x${state.streak}!`:'Boa! Resposta certa.');
  } else {
    state.wrong++; state.streak=0; btn.classList.add('wrong'); beep(180,.12); if(state.mode==='sobrevivencia')state.lives--;
  }
  recordAnswerHistory(selected,correct);
  $('#explanationText').textContent=state.current.explanation;
  $('#explanationTitle').textContent=correct?'Resposta correta':'Revisão da questão';
  $('#explanationBox').classList.remove('hidden'); updateHud(); saveStats(); refreshHomeStats();

  if(state.mode==='contraTempo') setTimeout(()=>{if(state.timeLeft>0)nextQuestion();},650);
  else if(state.mode==='sobrevivencia'&&state.lives<=0)setTimeout(()=>finishGame(),900);
  else if(Number.isFinite(state.targetQuestions)&&state.answered>=state.targetQuestions)$('#btnNext').textContent='Ver resultado →';
  else $('#btnNext').textContent='Próxima questão →';
  $('#btnNext').classList.toggle('hidden',state.mode==='contraTempo');
}

function useFifty(){
  if(state.locked||state.fifty<=0)return;
  const wrong=$$('.option-btn').filter(b=>Number(b.dataset.original)!==state.current.answer&&!b.classList.contains('removed'));
  wrong.sort(()=>Math.random()-.5).slice(0,2).forEach(b=>b.classList.add('removed'));
  state.fifty--; $('#fiftyCount').textContent=state.fifty; if(!state.fifty)$('#btnFifty').disabled=true; toast('Duas alternativas removidas.');
}
function skipQuestion(){
  if(state.locked||state.skips<=0)return;
  state.skips--; $('#skipCount').textContent=state.skips; if(!state.skips)$('#btnSkip').disabled=true; toast('Questão pulada sem penalidade.'); nextQuestion();
}
function startTimer(){
  $('#timerValue').textContent=state.timeLeft+'s';
  state.timer=setInterval(()=>{state.timeLeft--;$('#timerValue').textContent=state.timeLeft+'s';if(state.timeLeft<=0){clearInterval(state.timer);finishGame();}},1000);
}
function finishGame(quit=false){
  clearInterval(state.timer); if(quit&&state.answered===0){showHome();return;}
  const total=state.correct+state.wrong,acc=total?Math.round(state.correct/total*100):0;
  if(!state.statsCommitted){
    stats.played+=1;
    stats.xp+=Math.max(0,Math.floor(state.score/10));
    stats.best=Math.max(stats.best,state.score);
    stats.bestStreak=Math.max(stats.bestStreak||0,state.bestStreak||0);
    state.statsCommitted=true;
    saveStats();
  }
  refreshHomeStats();
  $('#finalScore').textContent=state.score;$('#finalCorrect').textContent=state.correct;$('#finalWrong').textContent=state.wrong;$('#finalAccuracy').textContent=acc+'%';$('#finalBestStreak').textContent=state.bestStreak;
  $('#resultTitle').textContent=acc>=80?'Excelente desempenho!':acc>=60?'Bom trabalho!':acc>=40?'Você está evoluindo!':'Revise os pontos fracos e tente novamente!';
  $('#resultSubtitle').textContent=quit?'Treino encerrado antes do fim.':'Treino concluído. O histórico de rotação foi mantido para a próxima partida.';
  $('#resultIcon').textContent=acc>=80?'🏆':acc>=60?'🎯':acc>=40?'📚':'💪'; showScreen('resultScreen');
}
function updateHud(){
  $('#scoreValue').textContent=state.score;$('#streakValue').textContent=state.streak;$('#livesValue').textContent=state.lives;
  $('#correctValue').textContent=state.correct;$('#wrongValue').textContent=state.wrong;$('#topStreak').textContent=Math.max(stats.bestStreak||0,state.bestStreak||0);
  const total=state.correct+state.wrong,acc=total?Math.round(state.correct/total*100):0;
  $('#accuracyValue').textContent=acc+'%';$('#performanceRing').style.background=`conic-gradient(var(--primary) ${acc*3.6}deg, var(--surface-2) 0)`;
  $('#comboFill').style.width=Math.min(100,(state.streak%4)*25)+'%';
  $('#comboMessage').textContent=state.streak>=6?'Sequência excelente! O bônus está alto.':state.streak>=3?'Combo ativo! Continue acertando.':'Acerte 3 seguidas para ganhar bônus.';
  $('#btnFifty').disabled=state.fifty<=0;$('#btnSkip').disabled=state.skips<=0;
}

function generateMathQuestion(){
  const kind=Math.floor(Math.random()*4),id='g'+Date.now()+Math.random();
  if(kind===0){const a=rand(5,30),b=rand(2,9),ans=a*b;return makeProcedural(id,'facil',`Calcule ${a} × ${b}.`,ans,[ans+b,Math.max(1,ans-b),ans+a],`${a} × ${b} = ${ans}.`);}
  if(kind===1){const pct=[10,20,25,30,40,50][rand(0,5)],base=rand(4,20)*10,ans=base*pct/100;return makeProcedural(id,'medio',`Qual é o valor correspondente a ${pct}% de ${base}?`,ans,[ans+10,Math.max(0,ans-10),ans*2],`${pct}% de ${base} = ${pct/100} × ${base} = ${ans}.`);}
  if(kind===2){const x=rand(2,14),a=rand(2,8),c=rand(1,12),total=a*x+c;return makeProcedural(id,'medio',`Resolva a equação ${a}x + ${c} = ${total}.`,x,[x+1,Math.max(1,x-1),x+3],`${a}x = ${total-c}; portanto, x = ${x}.`);}
  const a=rand(10,40),b=rand(10,40),c=rand(10,40),ans=Math.round((a+b+c)/3*100)/100;
  return makeProcedural(id,'dificil',`Determine a média aritmética de ${a}, ${b} e ${c}.`,String(ans).replace('.',','),[String(ans+2).replace('.',','),String(Math.max(0,ans-2)).replace('.',','),String(ans+4).replace('.',',')],`(${a} + ${b} + ${c}) ÷ 3 = ${String(ans).replace('.',',')}.`);
}
function makeProcedural(id,difficulty,q,ans,wrong,explanation){
  const correct=String(ans),options=shuffleUnique([correct,...wrong.map(String)]);return{id,subject:'Matemática',difficulty,q,options,answer:options.indexOf(correct),explanation,_ans:correct,_procedural:true,variantNumber:1};
}


window.startPublicThemeTraining = function(label, subjects){
  clearInterval(state.timer);
  state.mode='publicoTematico';
  state.publicThemeLabel=label||'Concurso público';
  state.publicSubjects=Array.isArray(subjects)&&subjects.length?subjects:null;
  state.editalInstitution=null; state.editalYear=null; state.editalUrl=null;
  $$('.mode-card').forEach(c=>c.classList.remove('selected'));
  if($('#subjectSelect')) $('#subjectSelect').value='todas';
  if($('#sourceSelect')) $('#sourceSelect').value='autorais';
  state.subject='todas'; state.source='autorais';
  startGame();
};

window.startEditalTraining = function(institution, year, url){
  clearInterval(state.timer);
  state.mode='edital'; state.editalInstitution=institution; state.editalYear=Number(year)||null; state.editalUrl=url||null;
  $$('.mode-card').forEach(c=>c.classList.toggle('selected',c.dataset.mode==='edital'));
  if($('#subjectSelect')) $('#subjectSelect').value='todas';
  if($('#sourceSelect')) $('#sourceSelect').value='editais';
  state.subject='todas'; state.source='editais';
  startGame();
};

function updateBankCount(){
  const old={subject:state.subject,difficulty:state.difficulty,source:state.source};
  state.subject=$('#subjectSelect')?.value||state.subject;
  state.source=$('#sourceSelect')?.value||state.source;
  state.difficulty=$('#difficultyGroup button.active')?.dataset.difficulty||state.difficulty;
  const count=filteredBank().length;
  const current=filteredBank(); const realCount=current.filter(q=>q.realExam).length; const editalCount=current.filter(q=>q.editalBased).length;
  $('#bankCount').textContent=`${count} questões-base${realCount?` • ${realCount} de prova oficial`:''}${editalCount?` • ${editalCount} do edital`:''}`;
  state.subject=old.subject; state.difficulty=old.difficulty; state.source=old.source;
}
function questionSourceLabel(q){
  if(q?.editalBased) return `${state.editalInstitution || q.institutions?.[0] || 'Edital'} • conteúdo programático`;
  if(q?.realExam) return `${q.bank || q.exam || 'Prova oficial'}${q.year ? ' • '+q.year : ''}`;
  return 'Desafio Aprovação';
}
function recordAnswerHistory(selected,correct){
  const q=state.current;
  if(!q) return;
  const selectedText=selected===null ? 'Em branco' : (q.options?.[selected] ?? 'Alternativa não registrada');
  const correctText=q.options?.[q.answer] ?? 'Gabarito não registrado';
  answerHistory.unshift({
    uid:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    questionId:String(q.id ?? ''), at:new Date().toISOString(), subject:q.subject || 'Geral',
    difficulty:q.difficulty || 'medio', question:q.q || '', selected:selectedText, correctAnswer:correctText,
    correct:Boolean(correct), explanation:q.explanation || '', mode:MODE_NAMES[state.mode] || state.mode,
    source:questionSourceLabel(q)
  });
  saveAnswerHistory();
  renderAnswerHistory();
}
function formatHistoryDate(iso){
  const d=new Date(iso); if(Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'});
}
function renderAnswerHistory(){
  const listEl=$('#answerHistoryList'); if(!listEl) return;
  const filter=$('#answerHistoryFilter')?.value || 'todos';
  const total=answerHistory.length, correct=answerHistory.filter(x=>x.correct).length, wrong=total-correct;
  const acc=total?Math.round(correct/total*100):0;
  if($('#historyTotal')) $('#historyTotal').textContent=total;
  if($('#historyCorrect')) $('#historyCorrect').textContent=correct;
  if($('#historyWrong')) $('#historyWrong').textContent=wrong;
  if($('#historyAccuracy')) $('#historyAccuracy').textContent=acc+'%';
  let filtered=answerHistory;
  if(filter==='acertos') filtered=answerHistory.filter(x=>x.correct);
  if(filter==='erros') filtered=answerHistory.filter(x=>!x.correct);
  const visible=filtered.slice(0,historyVisible);
  if(!visible.length){
    listEl.innerHTML=`<div class="history-empty">${total?'Nenhuma resposta encontrada nesse filtro.':'Responda uma questão para começar seu histórico.'}</div>`;
  }else{
    listEl.innerHTML=visible.map(item=>{
      const status=item.correct?'Acertou':'Errou';
      const statusClass=item.correct?'history-correct':'history-wrong';
      const correction=item.correct?'':`<div class="history-answer correction"><span>Gabarito</span><strong>${escapeHtml(item.correctAnswer||'')}</strong></div>`;
      const explanation=item.explanation?`<div class="history-explanation"><span>Explicação</span><p>${escapeHtml(item.explanation)}</p></div>`:'';
      return `<details class="history-item ${statusClass}"><summary><div class="history-status">${item.correct?'✓':'×'}</div><div class="history-summary-text"><div class="history-meta"><span>${escapeHtml(item.subject||'Geral')}</span><span>${escapeHtml(item.mode||'Treino')}</span><span>${escapeHtml(formatHistoryDate(item.at))}</span></div><strong>${escapeHtml(item.question||'Questão')}</strong></div><span class="history-result-pill">${status}</span></summary><div class="history-detail"><div class="history-source">${escapeHtml(item.source||'')}</div><div class="history-answer"><span>Sua resposta</span><strong>${escapeHtml(item.selected||'')}</strong></div>${correction}${explanation}</div></details>`;
    }).join('');
  }
  const more=$('#btnHistoryMore');
  if(more){ more.classList.toggle('hidden',filtered.length<=historyVisible); more.textContent=`Mostrar mais (${Math.max(0,filtered.length-historyVisible)})`; }
}
function clearAnswerHistory(){
  if(!answerHistory.length){toast('O histórico de respostas já está vazio.');return;}
  if(!confirm('Apagar todo o histórico de respostas deste navegador?')) return;
  answerHistory=[];historyVisible=ANSWER_HISTORY_PAGE;saveAnswerHistory();renderAnswerHistory();toast('Histórico de respostas apagado.');
}
function resetXp(){
  if(!confirm('Resetar o XP acumulado para 0? O histórico de respostas será mantido.')) return;
  stats.xp=0;saveStats();refreshHomeStats();toast('XP resetado para 0.');
}
function resetProgress(){
  if(!confirm('Resetar XP, recorde, partidas, combo e meta diária? O histórico de respostas e a rotação das perguntas serão mantidos.')) return;
  stats.best=0;stats.xp=0;stats.played=0;stats.daily=0;stats.bestStreak=0;stats.dailyDate=todayKey;
  saveStats();refreshHomeStats();updateHud();toast('Desempenho reiniciado.');
}
function updateRecentInfo(){
  const n=Math.min(recentHistory.length,MAX_HISTORY); const el=$('#recentInfo'); if(!el)return;
  el.textContent=n?`${n} aparições recentes salvas. O jogo prioriza outras questões antes de reutilizá-las.`:'Nenhuma questão registrada ainda. O histórico começa quando você iniciar um treino.';
}
function clearRotationHistory(){ recentHistory=[];variantHistory={};saveRecentHistory([]);saveVariantHistory({});updateRecentInfo();toast('Histórico de rotação limpo.'); }
function refreshHomeStats(){
  if($('#homeBest')) $('#homeBest').textContent=Math.floor(stats.best||0);
  if($('#homeXp')) $('#homeXp').textContent=Math.floor(stats.xp||0);
  if($('#homePlayed')) $('#homePlayed').textContent=Math.floor(stats.played||0);
  if($('#dashboardXp')) $('#dashboardXp').textContent=`${Math.floor(stats.xp||0)} XP`;
  if($('#sideXpValue')) $('#sideXpValue').textContent=`${Math.floor(stats.xp||0)} XP`;
  if($('#sidePlayedValue')) $('#sidePlayedValue').textContent=`${Math.floor(stats.played||0)} partidas concluídas`;
  if($('#topStreak')) $('#topStreak').textContent=Math.max(stats.bestStreak||0,state.bestStreak||0);
  const daily=Math.min(Math.floor(stats.daily||0),20);
  if($('#dailyCount')) $('#dailyCount').textContent=`${daily} / 20`;
  if($('#dailyProgress')) $('#dailyProgress').style.width=(daily/20*100)+'%';
  if($('#sidebarDaily')) $('#sidebarDaily').textContent=`${daily} de 20`;
  if($('#sidebarDailyFill')) $('#sidebarDailyFill').style.width=(daily/20*100)+'%';
}
function showScreen(id){$$('.screen').forEach(s=>s.classList.remove('active'));$('#'+id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
function showHome(){clearInterval(state.timer);showScreen('homeScreen');refreshHomeStats();updateRecentInfo();renderAnswerHistory();}
function saveStats(){localStorage.setItem('da_stats',JSON.stringify(stats));}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1900);}
function toggleTheme(){document.body.classList.toggle('dark');$('#btnTheme').textContent=document.body.classList.contains('dark')?'🌙':'☀️';}
function toggleSound(){state.sound=!state.sound;$('#btnSound').textContent=state.sound?'🔊':'🔇';}
function beep(freq,duration){if(!state.sound)return;try{const ctx=new(window.AudioContext||window.webkitAudioContext)(),o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=freq;g.gain.value=.035;o.start();o.stop(ctx.currentTime+duration);}catch(e){}}
function shuffleUnique(arr){const unique=[...new Set(arr.map(String))];let n=1;while(unique.length<4){unique.push(String(Number(arr[0])+n*7));n++;}return unique.sort(()=>Math.random()-.5);}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function lowerFirst(s){return s? s.charAt(0).toLowerCase()+s.slice(1):s;}
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
