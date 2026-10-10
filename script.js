const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const MODE_NAMES = {
  classico:'Modo Clássico', infinito:'Modo Infinito', sobrevivencia:'Sobrevivência',
  contraTempo:'Contra o Tempo', vestibular:'Vestibular', concurso:'Concurso Público', provasReais:'Provas Reais', edital:'Do Edital à Questão', publicoTematico:'Concurso por Área'
};
const VESTIBULAR_SUBJECTS = ['Português','Literatura','Redação','Inglês','Matemática','História','Geografia','Filosofia','Sociologia','Biologia','Física','Química'];
const CONCURSO_SUBJECTS = ['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo','Administração Pública','Ética no Serviço Público'];
const HISTORY_KEY = 'da_recent_question_history_v2';
const VARIANT_KEY = 'da_question_variant_history_v2';
const MAX_HISTORY = 45;
const ANSWER_HISTORY_KEY = 'da_answer_history_v1';
const MAX_ANSWER_HISTORY = 300;
const ANSWER_HISTORY_PAGE = 8;
const THEME_KEY = 'da_theme';

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
  timeLeft:0, timer:null, targetQuestions:10, lastSubjects:[], variantIndex:0, editalInstitution:null, editalYear:null, editalUrl:null, publicSubjects:null, publicThemeLabel:null, statsCommitted:false
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

applySavedTheme();
bindEvents();
refreshHomeStats();
updateBankCount();
updateRecentInfo();
renderAnswerHistory();
updateThemeButton();

function applySavedTheme(){
  try{
    const saved=localStorage.getItem(THEME_KEY);
    if(saved==='dark') document.body.classList.add('dark');
    else if(saved==='light') document.body.classList.remove('dark');
  }catch{}
}
function updateThemeButton(){
  const btn=$('#btnTheme');
  if(btn) btn.textContent=document.body.classList.contains('dark')?'🌙':'☀️';
}

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

function smartBotEnabled(){return document.querySelector('#smartQuestionBot')?.checked!==false;}
function contestContextLabel(){
  if(state.mode==='publicoTematico' && state.publicThemeLabel) return state.publicThemeLabel;
  if(state.mode==='edital' && state.editalInstitution) return state.editalInstitution;
  return 'Concurso Público';
}
function smartQuestionSubjects(){
  const supported=Object.keys(SMART_QUESTION_TEMPLATES);
  if(state.subject!=='todas' && supported.includes(state.subject)) return [state.subject];
  if(state.mode==='publicoTematico' && Array.isArray(state.publicSubjects)){
    const subjects=state.publicSubjects.filter(x=>supported.includes(x));
    if(subjects.length) return subjects;
  }
  if(state.mode==='edital'){
    let edital=QUESTION_BANK.filter(q=>q.editalBased && (!state.editalInstitution || q.institutions?.includes(state.editalInstitution)));
    const subjects=[...new Set(edital.map(q=>q.subject))].filter(x=>supported.includes(x));
    if(subjects.length) return subjects;
  }
  if(state.mode==='concurso' || state.mode==='publicoTematico' || state.mode==='edital') return CONCURSO_SUBJECTS.filter(x=>supported.includes(x));
  return supported.includes(state.subject)?[state.subject]:[];
}
function shuffleSmartOptions(correct,wrong){
  const items=[{text:String(correct),ok:true},...wrong.map(x=>({text:String(x),ok:false}))].sort(()=>Math.random()-.5);
  return {options:items.map(x=>x.text),answer:items.findIndex(x=>x.ok)};
}
function makeSmartQuestion(subject,data){
  const {options,answer}=shuffleSmartOptions(data.correct,data.wrong);
  return {id:`bot-${Date.now()}-${Math.random().toString(36).slice(2,9)}`,subject,difficulty:data.difficulty||'medio',q:data.q,options,answer,explanation:data.explanation,bank:'Gerador inteligente',exam:`Autoral · ${contestContextLabel()}`,_smartBot:true};
}
const SMART_QUESTION_TEMPLATES={
  'Português':()=>{
    const bank=[
      {q:'Assinale a alternativa em que o emprego da crase está de acordo com a norma-padrão.',correct:'O servidor dirigiu-se à repartição antes do expediente.',wrong:['O servidor entregou o relatório à ela.','A reunião ocorrerá daqui à duas horas.','O documento foi enviado à partir de segunda-feira.'],explanation:'Há crase em “à repartição” porque ocorre a fusão da preposição “a” com o artigo feminino “a”.',difficulty:'medio'},
      {q:'Em qual alternativa a concordância verbal está correta segundo a norma-padrão?',correct:'Faltam dois documentos para concluir o processo.',wrong:['Falta dois documentos para concluir o processo.','Houveram muitas solicitações no setor.','Fazem três anos que o sistema foi implantado.'],explanation:'O verbo “faltar” concorda com o sujeito “dois documentos”. Em sentido de existir, “haver” é impessoal; indicando tempo decorrido, “fazer” também é impessoal.',difficulty:'medio'},
      {q:'Assinale a frase em que a pontuação preserva corretamente a estrutura sintática e o sentido.',correct:'Quando o prazo terminou, a comissão encerrou o recebimento.',wrong:['Quando, o prazo terminou a comissão encerrou o recebimento.','A comissão, encerrou o recebimento quando o prazo terminou.','Quando o prazo, terminou a comissão encerrou o recebimento.'],explanation:'A oração adverbial deslocada “Quando o prazo terminou” deve ser separada por vírgula da oração principal.',difficulty:'facil'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Matemática':()=>{
    const kind=rand(0,2);
    if(kind===0){const total=rand(12,40)*10,pct=[10,15,20,25,30][rand(0,4)],ans=total*pct/100;return{q:`Em um concurso, ${pct}% de ${total} candidatos faltaram à prova. Quantos candidatos faltaram?`,correct:ans,wrong:[ans+10,Math.max(0,ans-10),total-ans],explanation:`${pct}% de ${total} = ${pct/100} × ${total} = ${ans}.`,difficulty:'medio'};}
    if(kind===1){const x=rand(3,15),a=rand(2,7),b=rand(2,12),res=a*x+b;return{q:`Resolva a equação ${a}x + ${b} = ${res}.`,correct:x,wrong:[x+1,Math.max(1,x-1),x+3],explanation:`Subtraindo ${b} dos dois lados, temos ${a}x = ${res-b}. Dividindo por ${a}, x = ${x}.`,difficulty:'medio'};}
    const n=rand(4,9),dias=rand(8,18),novo=n+rand(2,6),ans=n*dias/novo;const rounded=Math.round(ans*100)/100;return{q:`Uma equipe de ${n} servidores conclui uma tarefa em ${dias} dias, com produtividade constante. Mantidas as condições, ${novo} servidores levariam aproximadamente quantos dias?`,correct:String(rounded).replace('.',','),wrong:[String(Math.round((rounded+2)*100)/100).replace('.',','),String(Math.max(1,Math.round((rounded-2)*100)/100)).replace('.',','),String(dias).replace('.',',')],explanation:`O trabalho total é constante: ${n} × ${dias} = ${n*dias} servidor-dias. Dividindo por ${novo}, obtemos aproximadamente ${String(rounded).replace('.',',')} dias.`,difficulty:'dificil'};
  },
  'Raciocínio Lógico':()=>{
    const bank=[
      {q:'A negação lógica de “Todos os candidatos entregaram a documentação” é:',correct:'Pelo menos um candidato não entregou a documentação.',wrong:['Nenhum candidato entregou a documentação.','Todos os candidatos deixaram de entregar a documentação.','Pelo menos um candidato entregou a documentação.'],explanation:'A negação de uma proposição universal afirmativa é uma proposição existencial negativa: existe ao menos um elemento que não satisfaz a propriedade.',difficulty:'medio'},
      {q:'A proposição “Se o recurso foi deferido, então o resultado será retificado” é falsa somente quando:',correct:'O recurso foi deferido e o resultado não foi retificado.',wrong:['O recurso não foi deferido e o resultado foi retificado.','O recurso não foi deferido e o resultado não foi retificado.','O recurso foi deferido e o resultado foi retificado.'],explanation:'Uma implicação P → Q é falsa apenas quando P é verdadeira e Q é falsa.',difficulty:'medio'},
      {q:'Considere: “Todo analista é servidor” e “Nenhum servidor temporário é analista”. Qual conclusão é compatível com as premissas?',correct:'Nenhum analista é servidor temporário.',wrong:['Todo servidor é analista.','Todo servidor temporário é analista.','Nenhum servidor é analista.'],explanation:'Se todo analista pertence ao conjunto dos servidores e nenhum temporário pode ser analista, então analistas e servidores temporários não se intersectam.',difficulty:'dificil'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Informática':()=>{
    const bank=[
      {q:'Em segurança da informação, qual prática reduz o impacto de um ataque de ransomware?',correct:'Manter backups periódicos, testados e isolados do ambiente principal.',wrong:['Desativar todas as atualizações do sistema.','Usar a mesma senha em todos os serviços.','Abrir anexos desconhecidos em modo administrador.'],explanation:'Backups testados e isolados permitem restaurar dados mesmo que arquivos do ambiente principal sejam cifrados.',difficulty:'medio'},
      {q:'Qual é a principal função do DNS em uma rede TCP/IP?',correct:'Traduzir nomes de domínio em endereços IP e realizar consultas relacionadas.',wrong:['Criptografar automaticamente todos os arquivos do usuário.','Substituir o roteador na distribuição física da rede.','Executar planilhas em servidores remotos.'],explanation:'O DNS resolve nomes, como um domínio, para endereços IP e outros registros associados.',difficulty:'facil'},
      {q:'Ao receber uma mensagem que imita um banco e pede senha por um link, o comportamento mais seguro é:',correct:'Não acessar o link e verificar a solicitação pelos canais oficiais da instituição.',wrong:['Responder à mensagem com a senha para confirmar a identidade.','Instalar o arquivo anexo para validar a conta.','Encaminhar a mensagem para colegas e pedir que testem o link.'],explanation:'Esse padrão é típico de phishing. A verificação deve ser feita por canal oficial, sem usar o link recebido.',difficulty:'facil'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Direito Constitucional':()=>{
    const bank=[
      {q:'Segundo o caput do art. 37 da Constituição Federal, qual princípio está expressamente previsto para a Administração Pública?',correct:'Impessoalidade.',wrong:['Supremacia administrativa.','Indisponibilidade absoluta.','Autonomia da vontade.'],explanation:'O art. 37, caput, prevê legalidade, impessoalidade, moralidade, publicidade e eficiência.',difficulty:'facil'},
      {q:'O mandado de segurança destina-se, em regra, à proteção de:',correct:'Direito líquido e certo não amparado por habeas corpus ou habeas data.',wrong:['Qualquer interesse econômico sem prova pré-constituída.','Liberdade de locomoção ameaçada por ilegalidade, exclusivamente.','Apenas direitos coletivos de partidos políticos.'],explanation:'A Constituição prevê mandado de segurança para proteger direito líquido e certo não amparado por habeas corpus ou habeas data.',difficulty:'medio'},
      {q:'No sistema constitucional brasileiro, os Poderes da União são:',correct:'Legislativo, Executivo e Judiciário, independentes e harmônicos entre si.',wrong:['Executivo, Moderador e Judiciário.','Legislativo, Ministério Público e Judiciário.','Executivo, Tribunal de Contas e Legislativo.'],explanation:'O art. 2º da Constituição estabelece Legislativo, Executivo e Judiciário, independentes e harmônicos entre si.',difficulty:'facil'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Direito Administrativo':()=>{
    const bank=[
      {q:'Quando a Administração desfaz um ato administrativo por ilegalidade, ocorre:',correct:'Anulação.',wrong:['Revogação por conveniência.','Convalidação obrigatória.','Caducidade legislativa automática.'],explanation:'A anulação decorre de ilegalidade; a revogação está ligada a juízo de conveniência e oportunidade sobre ato válido.',difficulty:'facil'},
      {q:'O poder de polícia administrativa permite à Administração:',correct:'Condicionar ou restringir direitos e atividades em benefício do interesse coletivo, nos limites legais.',wrong:['Criar crimes sem previsão em lei.','Julgar definitivamente qualquer conflito privado.','Ignorar o devido processo em toda sanção administrativa.'],explanation:'O poder de polícia limita ou condiciona direitos e atividades para proteção do interesse público, sempre sujeito à legalidade.',difficulty:'medio'},
      {q:'A distribuição interna de competências dentro da mesma pessoa jurídica administrativa é denominada:',correct:'Desconcentração.',wrong:['Descentralização.','Privatização.','Concessão legislativa.'],explanation:'Desconcentração ocorre dentro da mesma pessoa jurídica; descentralização envolve outra pessoa jurídica ou particular.',difficulty:'medio'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Administração Pública':()=>{
    const bank=[
      {q:'Em gestão pública, eficiência está mais diretamente relacionada a:',correct:'Utilizar recursos de modo adequado para produzir resultados com menor desperdício.',wrong:['Atingir qualquer objetivo, independentemente dos recursos gastos.','Cumprir apenas metas políticas sem indicadores.','Eliminar controles e registros para acelerar processos.'],explanation:'Eficiência relaciona meios e recursos empregados aos produtos ou resultados obtidos, buscando melhor uso dos recursos.',difficulty:'medio'},
      {q:'No ciclo PDCA, a etapa “Check” corresponde principalmente a:',correct:'Verificar resultados e compará-los com o que foi planejado.',wrong:['Executar as ações planejadas.','Definir objetivos e métodos.','Padronizar sem medir resultados.'],explanation:'PDCA: Plan (planejar), Do (executar), Check (verificar) e Act (agir corretivamente/padronizar melhorias).',difficulty:'facil'},
      {q:'Um indicador de efetividade procura medir principalmente:',correct:'O impacto ou mudança produzida pela ação pública na realidade.',wrong:['Somente o custo unitário de cada atividade.','A quantidade de documentos arquivados.','A existência formal de um organograma.'],explanation:'Efetividade está ligada aos impactos e transformações produzidas, e não apenas à execução ou ao uso de recursos.',difficulty:'dificil'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Ética no Serviço Público':()=>{
    const bank=[
      {q:'Diante de um possível conflito entre interesse particular e função pública, a conduta mais compatível com a integridade é:',correct:'Declarar o conflito e adotar as medidas de impedimento ou tratamento previstas nas regras aplicáveis.',wrong:['Ocultar a situação se não houver denúncia.','Usar informação interna para obter vantagem pessoal.','Transferir informalmente a decisão a um amigo sem registro.'],explanation:'Integridade exige transparência sobre conflitos e adoção dos mecanismos de prevenção e tratamento previstos.',difficulty:'medio'},
      {q:'A impessoalidade no serviço público exige que o agente:',correct:'Atue orientado pelo interesse público, sem favorecimentos pessoais indevidos.',wrong:['Priorize parentes quando considerar que são mais confiáveis.','Use a função para promover sua imagem pessoal.','Escolha destinatários de benefícios sem critérios objetivos.'],explanation:'A impessoalidade afasta favorecimentos e perseguições pessoais e orienta a atuação para a finalidade pública.',difficulty:'facil'},
      {q:'Ao lidar com informação funcional protegida por sigilo legal, o servidor deve:',correct:'Restringir o acesso às hipóteses e pessoas autorizadas, observando as normas aplicáveis.',wrong:['Divulgar em grupo privado porque não é publicação oficial.','Compartilhar com colegas sem necessidade funcional.','Publicar após retirar apenas o nome do arquivo.'],explanation:'O dever de sigilo depende da norma e da finalidade; acesso e compartilhamento devem ocorrer somente quando autorizados e necessários.',difficulty:'medio'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'História':()=>{
    const bank=[
      {q:'A Constituição brasileira conhecida como “Constituição Cidadã” foi promulgada em:',correct:'1988.',wrong:['1964.','1977.','1994.'],explanation:'A Constituição da República Federativa do Brasil foi promulgada em 5 de outubro de 1988.',difficulty:'facil'},
      {q:'A Proclamação da República no Brasil ocorreu em:',correct:'1889.',wrong:['1822.','1888.','1930.'],explanation:'A República foi proclamada em 15 de novembro de 1889.',difficulty:'facil'},
      {q:'Entre os efeitos associados à Revolução Industrial, destaca-se:',correct:'A ampliação da produção mecanizada e da urbanização.',wrong:['O desaparecimento imediato das cidades.','A substituição completa do trabalho assalariado pelo servil.','O fim do comércio internacional europeu.'],explanation:'A industrialização ampliou a mecanização, a produção fabril e o crescimento urbano.',difficulty:'medio'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Geografia':()=>{
    const bank=[
      {q:'O deslocamento populacional do campo para as cidades é denominado:',correct:'Êxodo rural.',wrong:['Transumância.','Migração pendular.','Imigração sazonal.'],explanation:'Êxodo rural é a migração do meio rural para o urbano.',difficulty:'facil'},
      {q:'O bioma predominante em grande parte da região Norte do Brasil é:',correct:'Amazônia.',wrong:['Pampa.','Caatinga.','Mata de Araucárias.'],explanation:'A Floresta Amazônica ocupa a maior parte da região Norte.',difficulty:'facil'},
      {q:'A latitude é medida a partir:',correct:'Da Linha do Equador, variando para norte ou sul.',wrong:['Do Meridiano de Greenwich, apenas para leste.','Dos trópicos, sem relação com o Equador.','Do nível médio do mar.'],explanation:'Latitude é a distância angular em relação ao Equador, de 0° a 90° norte ou sul.',difficulty:'medio'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Biologia':()=>{
    const bank=[
      {q:'A organela diretamente associada à maior parte da produção de ATP na respiração celular eucariótica é:',correct:'Mitocôndria.',wrong:['Lisossomo.','Complexo golgiense.','Ribossomo.'],explanation:'A cadeia respiratória e a fosforilação oxidativa ocorrem nas mitocôndrias.',difficulty:'facil'},
      {q:'Na fotossíntese, o carbono incorporado à matéria orgânica provém principalmente de:',correct:'Dióxido de carbono.',wrong:['Oxigênio molecular.','Nitrogênio atmosférico.','Vapor de água.'],explanation:'O CO₂ fornece o carbono fixado no ciclo de Calvin.',difficulty:'medio'},
      {q:'A meiose é importante porque:',correct:'Reduz à metade o número de cromossomos e contribui para a variabilidade genética.',wrong:['Produz duas células geneticamente idênticas em todos os casos.','Duplica permanentemente o número de cromossomos.','Ocorre apenas em células bacterianas.'],explanation:'A meiose forma células haploides e promove variabilidade por recombinação e segregação.',difficulty:'medio'}
    ]; return bank[rand(0,bank.length-1)];
  },
  'Física':()=>{
    const kind=rand(0,2);
    if(kind===0){const m=rand(2,8),a=rand(2,6),f=m*a;return{q:`Um corpo de massa ${m} kg adquire aceleração de ${a} m/s². Desprezando outras forças, qual é a força resultante?`,correct:`${f} N`,wrong:[`${f+a} N`,`${Math.max(1,f-a)} N`,`${m+a} N`],explanation:`Pela segunda lei de Newton, F = m·a = ${m}·${a} = ${f} N.`,difficulty:'medio'};}
    if(kind===1){const d=rand(80,240),t=[2,4,5][rand(0,2)],v=d/t;return{q:`Um veículo percorre ${d} km em ${t} horas, mantendo velocidade média constante. A velocidade média é:`,correct:`${v} km/h`,wrong:[`${v+10} km/h`,`${Math.max(5,v-10)} km/h`,`${d+t} km/h`],explanation:`Velocidade média = distância/tempo = ${d}/${t} = ${v} km/h.`,difficulty:'facil'};}
    const u=rand(6,24),r=[2,3,4,6][rand(0,3)],i=Math.round((u/r)*100)/100;return{q:`Em um resistor de ${r} Ω submetido a ${u} V, qual corrente elétrica circula segundo a lei de Ohm?`,correct:`${String(i).replace('.',',')} A`,wrong:[`${String(i+1).replace('.',',')} A`,`${r*u} A`,`${Math.max(1,u-r)} A`],explanation:`I = U/R = ${u}/${r} = ${String(i).replace('.',',')} A.`,difficulty:'medio'};
  },
  'Química':()=>{
    const bank=[
      {q:'Uma solução com pH 2 é classificada como:',correct:'Ácida.',wrong:['Básica.','Neutra.','Necessariamente salina.'],explanation:'Valores de pH abaixo de 7 indicam caráter ácido, nas condições usuais de referência.',difficulty:'facil'},
      {q:'A partícula subatômica que possui carga elétrica negativa é o:',correct:'Elétron.',wrong:['Próton.','Nêutron.','Núcleo.'],explanation:'Elétrons têm carga negativa; prótons, positiva; nêutrons são eletricamente neutros.',difficulty:'facil'},
      {q:'Elementos de uma mesma família da tabela periódica apresentam, em geral:',correct:'Propriedades químicas semelhantes associadas à configuração da camada de valência.',wrong:['O mesmo número de massa.','A mesma quantidade total de elétrons.','O mesmo número de níveis de energia em todos os períodos.'],explanation:'Elementos de uma mesma família compartilham padrões de elétrons de valência, o que leva a semelhanças químicas.',difficulty:'medio'}
    ]; return bank[rand(0,bank.length-1)];
  }
};
function generateSmartContestQuestion(){
  // No modo INSS 2022, usar somente questões revisadas sobre os dois decretos.
  if(state.mode==='edital' && state.editalInstitution==='INSS') return null;
  const subjects=smartQuestionSubjects(); if(!subjects.length) return null;
  const subject=subjects[rand(0,subjects.length-1)]; const factory=SMART_QUESTION_TEMPLATES[subject]; if(!factory)return null;
  let data=factory();
  if(state.difficulty!=='todas' && data.difficulty!==state.difficulty){
    for(let i=0;i<6&&data.difficulty!==state.difficulty;i++) data=factory();
  }
  const prefix=state.mode==='publicoTematico'&&state.publicThemeLabel?`No contexto de preparação para ${state.publicThemeLabel}, `:'';
  if(prefix && !data.q.startsWith(prefix)) data={...data,q:prefix+lowerFirst(data.q)};
  return makeSmartQuestion(subject,data);
}
function buildSmartContestQuestions(amount){
  if(!smartBotEnabled()) return [];
  const competition=['concurso','publicoTematico','edital'].includes(state.mode) || smartQuestionSubjects().length===1;
  if(!competition) return [];
  const out=[]; for(let i=0;i<amount;i++){const q=generateSmartContestQuestion();if(q)out.push(q);} return out;
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
  const canSmart=smartBotEnabled() && (['concurso','publicoTematico','edital'].includes(state.mode) || smartQuestionSubjects().length===1);
  const smartQ=canSmart ? generateSmartContestQuestion() : null;
  if(!bank.length && !smartQ){ toast('Não há questões nesse filtro.'); showHome(); return; }

  let q;
  const canProcedural=(state.mode==='infinito'||state.mode==='sobrevivencia'||state.mode==='contraTempo') && (state.subject==='todas'||state.subject==='Matemática');
  if(smartQ && (!bank.length || Math.random()<.48)) q=smartQ;
  else if(canProcedural && Math.random()<.18) q=generateMathQuestion();
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
  if(q._procedural || q._smartBot) return {...q, variantNumber:1};
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
    const href=(inst==='INSS' && q.sourceUrl) ? q.sourceUrl : (state.editalUrl || meta?.url || q.sourceUrl);
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
  const mapBtn=$('#btnMindMap'); if(mapBtn) mapBtn.onclick=()=>openMindMap(q);
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
    state.score+=Math.round(base*multiplier); toast(state.streak>=3?`🔥 Combo x${state.streak}!`:'Boa! Resposta certa.');
  } else {
    state.wrong++; state.streak=0; btn.classList.add('wrong'); if(state.mode==='sobrevivencia')state.lives--;
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

window.startInssEthicsTraining = function(){
  window.startEditalTraining?.('INSS',2022,'https://www.gov.br/inss/pt-br/centrais-de-conteudo/legislacao/edital/2022');
};

document.getElementById('btnInssEthics')?.addEventListener('click',()=>window.startInssEthicsTraining());

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
  if(q?._smartBot) return `Gerador inteligente • ${contestContextLabel()}`;
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
function toggleTheme(){document.body.classList.toggle('dark');try{localStorage.setItem(THEME_KEY,document.body.classList.contains('dark')?'dark':'light');}catch{}updateThemeButton();}
function shuffleUnique(arr){const unique=[...new Set(arr.map(String))];let n=1;while(unique.length<4){unique.push(String(Number(arr[0])+n*7));n++;}return unique.sort(()=>Math.random()-.5);}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function lowerFirst(s){return s? s.charAt(0).toLowerCase()+s.slice(1):s;}
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
