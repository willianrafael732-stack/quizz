(() => {
  const byId = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  const TYPES = [
    {id:'basico', group:'Base', icon:'🧭', title:'Base para concursos', desc:'Português, matemática, lógica e informática para construir a base.', examples:['nível médio','nível técnico','nível superior'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']},
    {id:'administrativo', group:'Administração', icon:'🗂️', title:'Administrativo', desc:'Cargos administrativos em órgãos públicos, autarquias, fundações e universidades.', examples:['agente administrativo','técnico','analista'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'fiscal', group:'Fiscal e controle', icon:'🧾', title:'Fiscal e Tributária', desc:'Carreiras de arrecadação, fiscalização e administração tributária.', examples:['Receita Federal','SEFAZ','ISS'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'controle', group:'Fiscal e controle', icon:'🔎', title:'Controle e Auditoria', desc:'Controle interno, externo, auditoria e fiscalização de contas públicas.', examples:['TCU','CGU','TCE','CGM'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'tribunais', group:'Justiça', icon:'⚖️', title:'Tribunais e Judiciário', desc:'Carreiras de apoio e área judiciária em tribunais.', examples:['STF','STJ','TRF','TRT','TRE','TJ'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'mp', group:'Justiça', icon:'📜', title:'Ministério Público', desc:'Técnico, analista e carreiras do Ministério Público.', examples:['MPU','MPF','MPE'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'defensoria', group:'Justiça', icon:'🛡️', title:'Defensorias Públicas', desc:'Técnico, analista e carreiras de apoio das defensorias.', examples:['DPU','DPE'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'procuradorias', group:'Justiça', icon:'📚', title:'Procuradorias e Advocacia Pública', desc:'Carreiras jurídicas e de apoio em órgãos de representação judicial.', examples:['AGU','PGE','PGM'], subjects:['Português','Raciocínio Lógico','Direito Constitucional','Direito Administrativo']},
    {id:'legislativo', group:'Poderes', icon:'🏛️', title:'Legislativo', desc:'Câmaras, Senado, assembleias legislativas e câmaras municipais.', examples:['Câmara','Senado','ALE','Câmara Municipal'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'policial', group:'Segurança', icon:'👮', title:'Policial', desc:'Carreiras policiais de investigação, patrulhamento, perícia e apoio.', examples:['PF','PRF','Polícia Civil'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'seguranca', group:'Segurança', icon:'🚔', title:'Segurança Pública', desc:'Guardas, polícia legislativa, segurança institucional e funções correlatas.', examples:['Guarda Municipal','Polícia Legislativa'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'bombeiros', group:'Segurança', icon:'🚒', title:'Bombeiros', desc:'Soldados, oficiais e áreas técnicas dos Corpos de Bombeiros.', examples:['CBM','oficial','soldado'], subjects:['Português','Matemática','Raciocínio Lógico','Física','Química']},
    {id:'pm', group:'Segurança', icon:'🎖️', title:'Polícia Militar', desc:'Ingresso em carreiras de praças, oficiais, saúde e especialidades.', examples:['soldado','oficial','saúde'], subjects:['Português','Matemática','Raciocínio Lógico','História','Geografia']},
    {id:'penitenciario', group:'Segurança', icon:'🔒', title:'Sistema Penitenciário', desc:'Polícia penal, agente penitenciário e apoio do sistema prisional.', examples:['Polícia Penal','agente','técnico'], subjects:['Português','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'forcas-armadas', group:'Militar', icon:'🎖️', title:'Forças Armadas', desc:'Carreiras de oficiais, praças e áreas técnicas militares.', examples:['Exército','Marinha','Aeronáutica'], subjects:['Português','Matemática','História','Geografia','Física']},
    {id:'escolas-militares', group:'Militar', icon:'🏫', title:'Escolas Militares', desc:'Seleções de formação militar e engenharia.', examples:['EsPCEx','ESA','AFA','EEAr','Escola Naval','IME','ITA'], subjects:['Português','Matemática','História','Geografia','Física','Química']},
    {id:'marinha-mercante', group:'Militar', icon:'🚢', title:'Marinha Mercante', desc:'Processos seletivos para formação de oficiais da Marinha Mercante.', examples:['EFOMM'], subjects:['Português','Matemática','Física','Inglês']},
    {id:'diplomacia', group:'Carreiras especiais', icon:'🌎', title:'Diplomacia', desc:'Carreira diplomática e preparação para o CACD.', examples:['Instituto Rio Branco','CACD'], subjects:['Português','História','Geografia','Inglês']},
    {id:'bancario', group:'Empresas públicas', icon:'🏦', title:'Bancários Públicos', desc:'Bancos públicos e instituições financeiras controladas pelo Estado.', examples:['Banco do Brasil','Caixa','BNDES'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']},
    {id:'estatais', group:'Empresas públicas', icon:'🏢', title:'Estatais', desc:'Empresas públicas e sociedades de economia mista em diversas áreas.', examples:['Petrobras','Transpetro','Correios'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']},
    {id:'energia', group:'Empresas públicas', icon:'⚡', title:'Energia', desc:'Carreiras técnicas, operacionais e de engenharia no setor energético público.', examples:['energia elétrica','petróleo e gás'], subjects:['Português','Matemática','Física','Química','Informática']},
    {id:'saude', group:'Serviços públicos', icon:'🩺', title:'Saúde Pública', desc:'Hospitais, secretarias de saúde e redes públicas.', examples:['médico','enfermeiro','técnico','farmacêutico'], subjects:['Português','Biologia','Química','Informática']},
    {id:'educacao', group:'Serviços públicos', icon:'👩‍🏫', title:'Educação', desc:'Professores, pedagogos, técnicos educacionais e secretarias.', examples:['professor','pedagogo','técnico'], subjects:['Português','Matemática','História','Geografia','Filosofia','Sociologia']},
    {id:'ti', group:'Técnica e tecnologia', icon:'💻', title:'Tecnologia da Informação', desc:'Desenvolvimento, dados, segurança, suporte, redes e infraestrutura.', examples:['analista de TI','desenvolvedor','dados','segurança'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']},
    {id:'engenharia', group:'Técnica e tecnologia', icon:'🏗️', title:'Engenharia e Infraestrutura', desc:'Engenharia civil, elétrica, mecânica, ambiental e produção.', examples:['DNIT','prefeituras','estatais'], subjects:['Português','Matemática','Física','Química','Informática']},
    {id:'ambiental', group:'Técnica e tecnologia', icon:'🌳', title:'Ambiental', desc:'Fiscalização, conservação, gestão ambiental e recursos naturais.', examples:['Ibama','ICMBio','órgãos estaduais'], subjects:['Português','Biologia','Geografia','Química']},
    {id:'agrario', group:'Técnica e tecnologia', icon:'🌾', title:'Agrário e Agropecuário', desc:'Agronomia, veterinária e fiscalização agropecuária.', examples:['MAPA','secretarias de agricultura'], subjects:['Português','Biologia','Química','Geografia']},
    {id:'pesquisa', group:'Ciência e dados', icon:'🔬', title:'Pesquisa e Ciência', desc:'Pesquisadores, tecnologistas e técnicos em institutos públicos.', examples:['Fiocruz','Inmetro','institutos de pesquisa'], subjects:['Português','Matemática','Biologia','Física','Química']},
    {id:'estatistica', group:'Ciência e dados', icon:'📊', title:'Estatística e Pesquisas', desc:'Coleta, análise, recenseamento e produção de dados oficiais.', examples:['IBGE','estatístico','agente de pesquisa'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Geografia']},
    {id:'previdencia', group:'Administração', icon:'👴', title:'Previdência e Assistência', desc:'Carreiras previdenciárias, serviço social e atendimento ao cidadão.', examples:['INSS','assistência social'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'agencias', group:'Administração', icon:'📡', title:'Agências Reguladoras', desc:'Especialistas, técnicos e analistas de regulação.', examples:['Anatel','Anvisa','ANEEL','ANP','ANTT','ANA'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'conselhos', group:'Administração', icon:'🪪', title:'Conselhos Profissionais', desc:'Assistentes, fiscais e analistas em conselhos de classe.', examples:['CREA','CRM','CRC','CRP','CRF'], subjects:['Português','Raciocínio Lógico','Informática','Direito Administrativo']},
    {id:'municipal', group:'Esfera', icon:'🏙️', title:'Concursos Municipais', desc:'Prefeituras, câmaras, autarquias e serviços municipais.', examples:['Prefeituras','Câmaras Municipais'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']},
    {id:'estadual', group:'Esfera', icon:'🗺️', title:'Concursos Estaduais', desc:'Secretarias, autarquias, universidades e empresas estaduais.', examples:['governos estaduais','autarquias'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'federal', group:'Esfera', icon:'🇧🇷', title:'Concursos Federais', desc:'Ministérios, autarquias, fundações e órgãos da União.', examples:['ministérios','autarquias federais'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'cnu', group:'Carreiras especiais', icon:'🇧🇷', title:'CPNU / CNU', desc:'Concurso Público Nacional Unificado, organizado por blocos temáticos.', examples:['blocos temáticos','órgãos federais'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Constitucional','Direito Administrativo']},
    {id:'pss', group:'Administração', icon:'⏳', title:'Processo Seletivo Simplificado', desc:'Seleções temporárias da União, estados e municípios.', examples:['contrato temporário','PSS'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']},
    {id:'cartorios', group:'Justiça', icon:'📑', title:'Cartórios', desc:'Concursos públicos para delegações de notas e registros.', examples:['notas','registro civil','registro de imóveis'], subjects:['Português','Direito Constitucional','Direito Administrativo']},
    {id:'universidades', group:'Serviços públicos', icon:'🎓', title:'Universidades e Institutos Federais', desc:'Técnico-administrativos, docentes e funções de apoio em instituições públicas.', examples:['universidades federais','IFs','CEFETs'], subjects:['Português','Matemática','Raciocínio Lógico','Informática','Direito Administrativo']},
    {id:'saneamento', group:'Empresas públicas', icon:'💧', title:'Saneamento e Serviços Urbanos', desc:'Água, esgoto, resíduos, manutenção e serviços urbanos públicos.', examples:['companhias de saneamento','serviços municipais'], subjects:['Português','Matemática','Física','Química','Informática']},
    {id:'logistica', group:'Empresas públicas', icon:'📦', title:'Logística e Correios', desc:'Operação, distribuição, transporte e atendimento em empresas públicas.', examples:['Correios','logística pública'], subjects:['Português','Matemática','Raciocínio Lógico','Informática']}
  ];

  const OTHER_PUBLIC_EXAMS = [
    {icon:'🎓', title:'ENEM', desc:'Exame Nacional do Ensino Médio.', action:'vestibular'},
    {icon:'🎓', title:'Vestibulares de universidades públicas', desc:'FUVEST, UNESP, UNICAMP, UERJ e outros processos seletivos.', action:'vestibular'},
    {icon:'🔄', title:'Vestibular seriado', desc:'Avaliações em etapas durante o ensino médio, como PAS e sistemas equivalentes.', action:'vestibular'},
    {icon:'🏫', title:'Institutos Federais', desc:'Seleções para ensino médio técnico, subsequente e graduação.', action:'vestibular'},
    {icon:'🏫', title:'Escolas técnicas públicas', desc:'Processos seletivos de Etecs, Cefets e redes estaduais.', action:'vestibular'},
    {icon:'📖', title:'Encceja', desc:'Exame para certificação do ensino fundamental e médio.', action:'vestibular'},
    {icon:'👩‍🏫', title:'PND – Prova Nacional Docente', desc:'Avaliação usada em processos de seleção de professores.', action:'public', subjects:['Português','Matemática','História','Geografia','Filosofia','Sociologia']},
    {icon:'🎓', title:'Enade', desc:'Avaliação nacional de cursos da educação superior.', action:'vestibular'},
    {icon:'🩺', title:'Enamed', desc:'Avaliação nacional da formação médica.', action:'public', subjects:['Biologia','Química','Português']},
    {icon:'🩺', title:'Revalida', desc:'Exame para revalidação de diplomas médicos obtidos no exterior.', action:'public', subjects:['Biologia','Química','Português']},
    {icon:'🏥', title:'Residência Médica', desc:'Processos seletivos de ingresso em programas de residência.', action:'public', subjects:['Biologia','Química','Português']},
    {icon:'🏥', title:'ENARE', desc:'Exame Nacional de Residência para programas de saúde.', action:'public', subjects:['Biologia','Química','Português']},
    {icon:'🧑‍⚕️', title:'Residência Multiprofissional e Uniprofissional', desc:'Seleções em enfermagem, psicologia, farmácia, fisioterapia e outras áreas.', action:'public', subjects:['Biologia','Química','Português']},
    {icon:'📝', title:'Celpe-Bras', desc:'Exame de proficiência em língua portuguesa.', action:'public', subjects:['Português']},
    {icon:'📊', title:'Saeb', desc:'Sistema de Avaliação da Educação Básica.', action:'vestibular'},
    {icon:'⚖️', title:'Exames profissionais', desc:'Exames como OAB e Exame de Suficiência, conforme a profissão.', action:'public', subjects:['Português','Direito Constitucional','Direito Administrativo']},
    {icon:'🎓', title:'Mestrado e Doutorado público', desc:'Seleções acadêmicas de universidades e institutos públicos.', action:'vestibular'},
    {icon:'🎓', title:'Transferência e vagas remanescentes', desc:'Processos de ingresso e transferência em instituições públicas.', action:'vestibular'},
    {icon:'🏫', title:'Colégios Militares e de Aplicação', desc:'Processos seletivos escolares quando a instituição adota prova.', action:'vestibular'}
  ];

  const BANKS = [
    {id:'CEBRASPE', name:'Cebraspe', url:'https://www.cebraspe.org.br/concursos/', tags:['federal','tribunais','fiscal','controle','policial','agencias','cnu'], note:'Concursos federais, tribunais, segurança, agências, controle e outras seleções.'},
    {id:'FGV', name:'FGV Conhecimento', url:'https://conhecimento.fgv.br/concursos', tags:['federal','tribunais','fiscal','controle','legislativo','administrativo'], note:'Concursos, exames nacionais, tribunais, fiscos e órgãos públicos.'},
    {id:'FCC', name:'Fundação Carlos Chagas', url:'https://www.concursosfcc.com.br/', tags:['tribunais','fiscal','administrativo','estadual','mp','defensoria'], note:'Tradicional em tribunais, fiscos, defensorias, ministérios públicos e órgãos estaduais.'},
    {id:'VUNESP', name:'Vunesp', url:'https://www.vunesp.com.br/', tags:['estadual','municipal','policial','educacao','administrativo','universidades'], note:'Concursos estaduais e municipais, especialmente em São Paulo.'},
    {id:'CESGRANRIO', name:'Fundação Cesgranrio', url:'https://www.cesgranrio.org.br/concursos/', tags:['bancario','federal','engenharia','estatais','energia','logistica'], note:'Bancos, estatais, energia, seleções nacionais e grandes concursos.'},
    {id:'IBFC', name:'IBFC', url:'https://concursos.ibfc.org.br/index/todos/', tags:['estadual','policial','saude','administrativo','universidades'], note:'Concursos e processos seletivos de diferentes níveis e áreas.'},
    {id:'AOCP', name:'Instituto AOCP', url:'https://institutoaocp.org.br/', tags:['estadual','saude','educacao','policial','administrativo','penitenciario'], note:'Secretarias, segurança pública, saúde, educação e outros órgãos.'},
    {id:'QUADRIX', name:'Instituto Quadrix', url:'https://quadrix.org.br/index/todos/', tags:['conselhos','municipal','administrativo','estadual'], note:'Forte presença em conselhos profissionais e órgãos públicos.'},
    {id:'IDECAN', name:'IDECAN', url:'https://portal.concursos.idecan.org.br/', tags:['estadual','municipal','policial','educacao','administrativo','universidades'], note:'Concursos públicos, universidades, segurança e seleções municipais e estaduais.'},
    {id:'IADES', name:'IADES', url:'https://www.iades.com.br/', tags:['estadual','municipal','administrativo','saude','conselhos'], note:'Concursos e processos seletivos em várias áreas do serviço público.'},
    {id:'IBADE', name:'IBADE', url:'https://ibade.org.br/', tags:['estadual','municipal','policial','saude','administrativo'], note:'Concursos públicos e processos seletivos, com seleções anteriores.'},
    {id:'CONSULPLAN', name:'Consulplan', url:'https://www.consulplan.net/', tags:['municipal','estadual','educacao','saude','administrativo','conselhos'], note:'Concursos abertos, em andamento, novos e encerrados.'},
    {id:'FUNDATEC', name:'Fundatec', url:'https://www.fundatec.org.br/portal/concursos/', tags:['municipal','estadual','educacao','saude','administrativo','universidades'], note:'Concursos e seleções, com forte atuação no Sul do Brasil.'},
    {id:'FUNDEP', name:'Fundep', url:'https://www.gestaodeconcursos.com.br/', tags:['estadual','municipal','universidades','saude','administrativo'], note:'Concursos e seleções de universidades, governos e órgãos públicos.'},
    {id:'FUMARC', name:'Fumarc', url:'https://www.fumarc.com.br/concursos/', tags:['estadual','municipal','administrativo','educacao'], note:'Concursos e processos seletivos, principalmente em Minas Gerais.'},
    {id:'NC-UFPR', name:'NC/UFPR', url:'https://servicos.nc.ufpr.br/PortalNC/Concursos/', tags:['universidades','estadual','municipal','educacao'], note:'Concursos e processos seletivos organizados pelo Núcleo de Concursos da UFPR.'},
    {id:'COMPERVE', name:'Comperve/UFRN', url:'https://comperve.ufrn.br/', tags:['universidades','estadual','municipal','educacao'], note:'Concursos, seleções e processos da UFRN e de instituições parceiras.'},
    {id:'LEGALLE', name:'Legalle Concursos', url:'https://legalleconcursos.com.br/', tags:['municipal','estadual','educacao','saude','administrativo'], note:'Concursos municipais e estaduais em diferentes áreas.'},
    {id:'OBJETIVA', name:'Objetiva Concursos', url:'https://www.objetivas.com.br/', tags:['municipal','estadual','educacao','saude','administrativo'], note:'Concursos e processos seletivos, com presença forte no Sul.'},
    {id:'AVANCA-SP', name:'Avança SP', url:'https://www.avancasp.org.br/', tags:['municipal','estadual','educacao','saude','administrativo'], note:'Concursos municipais, autarquias e processos seletivos em São Paulo e outros estados.'},
    {id:'INSTITUTO-MAIS', name:'Instituto Mais', url:'https://www.institutomais.org.br/', tags:['municipal','estadual','administrativo','educacao'], note:'Concursos e processos seletivos de órgãos municipais e estaduais.'},
    {id:'ACCESS', name:'Instituto Access', url:'https://concursos.access.org.br/', tags:['municipal','estadual','administrativo','educacao','saude'], note:'Concursos e seleções públicas em várias regiões e áreas.'},
    {id:'COSEAC', name:'Coseac/UFF', url:'https://www.coseac.uff.br/concursos/', tags:['universidades','municipal','estadual','administrativo'], note:'Concursos, seleções e processos organizados pela UFF.'},
    {id:'UFG', name:'Instituto Verbena/UFG', url:'https://institutoverbena.ufg.br/', tags:['universidades','municipal','estadual','educacao','saude'], note:'Concursos e seleções de órgãos públicos e instituições de ensino.'}
  ];

  // Expõe o catálogo para outras áreas do site (como o Acervo por ano).
  window.PUBLIC_EXAM_CATALOG = { types: TYPES, banks: BANKS, otherExams: OTHER_PUBLIC_EXAMS };

  const GROUPS = ['Todas', ...new Set(TYPES.map(t => t.group))];

  function selectedYearText(){
    const y = byId('publicYearFilter')?.value || 'todos';
    return y === 'todos' ? 'Todos os anos' : y === 'antes1990' ? 'Antes de 1990' : `Ano ${y}`;
  }

  function typeSearchText(t){
    return `${t.title} ${t.desc} ${t.group} ${(t.examples||[]).join(' ')}`.toLowerCase();
  }

  function renderTypes(){
    const grid = byId('publicTypeGrid'); if(!grid) return;
    const term = (byId('publicTypeSearch')?.value || '').trim().toLowerCase();
    const group = byId('publicGroupFilter')?.value || 'Todas';
    const list = TYPES.filter(t => {
      if(group !== 'Todas' && t.group !== group) return false;
      if(term && !typeSearchText(t).includes(term)) return false;
      return true;
    });
    if(byId('publicTypeCount')) byId('publicTypeCount').textContent = `${list.length} de ${TYPES.length} tipos`;
    grid.innerHTML = list.length ? list.map(t => `<button class="public-type-card" data-type="${t.id}">
      <div class="public-type-head"><span class="public-type-icon">${t.icon}</span><span class="public-type-group">${esc(t.group)}</span></div>
      <strong>${esc(t.title)}</strong><small>${esc(t.desc)}</small>
      <div class="public-type-examples">${(t.examples||[]).slice(0,3).map(e=>`<span>${esc(e)}</span>`).join('')}</div>
      <b>Treinar este tema →</b>
    </button>`).join('') : '<div class="feed-empty"><strong>Nenhum tipo encontrado</strong><p>Tente outro termo ou selecione “Todas as áreas”.</p></div>';
    grid.querySelectorAll('[data-type]').forEach(btn => btn.addEventListener('click', () => {
      const t = TYPES.find(x => x.id === btn.dataset.type); if(!t) return;
      if(typeof window.startPublicThemeTraining === 'function') window.startPublicThemeTraining(t.title, t.subjects);
    }));
  }

  function renderOtherPublicExams(){
    const grid = byId('otherPublicExamGrid'); if(!grid) return;
    grid.innerHTML = OTHER_PUBLIC_EXAMS.map((x, i) => `<button class="other-public-card" data-other-index="${i}">
      <span>${x.icon}</span><strong>${esc(x.title)}</strong><small>${esc(x.desc)}</small><b>Usar no estudo →</b>
    </button>`).join('');
    grid.querySelectorAll('[data-other-index]').forEach(btn => btn.addEventListener('click', () => {
      const item = OTHER_PUBLIC_EXAMS[Number(btn.dataset.otherIndex)]; if(!item) return;
      if(item.action === 'public' && typeof window.startPublicThemeTraining === 'function') {
        window.startPublicThemeTraining(item.title, item.subjects || ['Português','Matemática','Raciocínio Lógico','Informática']);
      } else {
        const card = document.querySelector('.mode-card[data-mode="vestibular"]');
        if(card) card.click();
        byId('filters')?.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }));
  }

  function fillFilters(){
    const bank = byId('publicBankFilter');
    if(bank) bank.innerHTML = '<option value="todas">Todas as bancas</option>' + BANKS.map(b => `<option value="${b.id}">${esc(b.name)}</option>`).join('');
    const year = byId('publicYearFilter');
    if(year){
      let opts = '<option value="todos">Todos os anos</option>';
      for(let y = 2026; y >= 1990; y--) opts += `<option value="${y}">${y}</option>`;
      opts += '<option value="antes1990">Antes de 1990</option>';
      year.innerHTML = opts;
    }
    const group = byId('publicGroupFilter');
    if(group) group.innerHTML = GROUPS.map(g => `<option value="${esc(g)}">${g === 'Todas' ? 'Todas as áreas' : esc(g)}</option>`).join('');
  }

  function renderBanks(){
    const grid = byId('publicBankGrid'); if(!grid) return;
    const bank = byId('publicBankFilter')?.value || 'todas';
    const term = (byId('publicSearch')?.value || '').trim().toLowerCase();
    const list = BANKS.filter(b => {
      if(bank !== 'todas' && b.id !== bank) return false;
      const typeNames = b.tags.map(tag => TYPES.find(t => t.id === tag)?.title || tag).join(' ');
      if(term && !`${b.name} ${b.id} ${b.tags.join(' ')} ${typeNames} ${b.note}`.toLowerCase().includes(term)) return false;
      return true;
    });
    if(byId('publicBankCount')) byId('publicBankCount').textContent = `${BANKS.length} bancas catalogadas`;
    grid.innerHTML = list.length ? list.map(b => `<article class="public-bank-card">
      <div class="public-bank-top"><span>${esc(b.id)}</span><b>${esc(selectedYearText())}</b></div>
      <h4>${esc(b.name)}</h4><p>${esc(b.note)}</p>
      <div class="public-bank-tags">${b.tags.slice(0,5).map(t => `<span>${esc(TYPES.find(x=>x.id===t)?.title || t)}</span>`).join('')}</div>
      <a href="${esc(b.url)}" target="_blank" rel="noopener noreferrer">Abrir portal da organizadora <span>↗</span></a>
    </article>`).join('') : '<div class="feed-empty"><strong>Nenhuma banca encontrada</strong><p>Tente limpar a pesquisa.</p></div>';
  }

  function quickGoal(mode){
    if(mode === 'materia'){ byId('filters')?.scrollIntoView({behavior:'smooth', block:'start'}); return; }
    if(mode === 'edital'){ byId('editalArchiveSection')?.scrollIntoView({behavior:'smooth', block:'start'}); return; }
    const card = document.querySelector(`.mode-card[data-mode="${mode}"]`);
    if(card) card.click();
    byId('filters')?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  document.addEventListener('DOMContentLoaded', () => {
    fillFilters(); renderTypes(); renderBanks(); renderOtherPublicExams();
    byId('publicTypeSearch')?.addEventListener('input', renderTypes);
    byId('publicGroupFilter')?.addEventListener('change', renderTypes);
    byId('publicBankFilter')?.addEventListener('change', renderBanks);
    byId('publicYearFilter')?.addEventListener('change', renderBanks);
    byId('publicSearch')?.addEventListener('input', renderBanks);
    byId('btnPublicStarter')?.addEventListener('click', () => window.startPublicThemeTraining?.('Base para concursos',['Português','Matemática','Raciocínio Lógico','Informática']));
    document.querySelectorAll('[data-quick-mode]').forEach(b => b.addEventListener('click', () => quickGoal(b.dataset.quickMode)));
  });
})();
