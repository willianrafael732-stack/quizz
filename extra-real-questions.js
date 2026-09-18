// Questões adicionais adaptadas de provas oficiais de vestibular.
// Os textos foram reescritos de forma resumida para treino, mantendo banca, ano e referência do item.
const EXTRA_REAL_EXAM_QUESTIONS = [
  {
    id:'fuvest2025-v1-20', subject:'Química', difficulty:'medio', realExam:true,
    exam:'Vestibular USP', bank:'FUVEST', year:2025, examQuestion:20,
    sourceUrl:'https://www.fuvest.br/acervo-vestibular-2025',
    q:'Ao comparar os modelos atômicos de Dalton, Thomson, Rutherford e Bohr, qual fenômeno não poderia ser explicado pelo modelo de Dalton, que tratava o átomo como indivisível?',
    variants:[
      'Ao comparar os modelos atômicos de Dalton, Thomson, Rutherford e Bohr, qual fenômeno não poderia ser explicado pelo modelo de Dalton, que tratava o átomo como indivisível?',
      'O modelo atômico de Dalton não previa estrutura interna para o átomo. Qual fenômeno, por depender de alterações no núcleo, fica fora do alcance desse modelo?',
      'Em uma linha histórica dos modelos atômicos, qual fenômeno evidencia uma limitação importante do modelo de Dalton?'
    ],
    options:['A radioatividade.','A dissolução de sal em água.','A mudança de estado físico.','A expansão térmica de um sólido.','A formação de uma mistura homogênea.'],
    answer:0,
    explanation:'A radioatividade envolve transformações relacionadas ao núcleo atômico, estrutura que não fazia parte do modelo indivisível de Dalton.'
  },
  {
    id:'fuvest2025-v1-86', subject:'História', difficulty:'medio', realExam:true,
    exam:'Vestibular USP', bank:'FUVEST', year:2025, examQuestion:86,
    sourceUrl:'https://www.fuvest.br/acervo-vestibular-2025',
    q:'No contexto do Modernismo brasileiro, uma característica marcante da pintura modernista foi:',
    variants:[
      'No contexto do Modernismo brasileiro, uma característica marcante da pintura modernista foi:',
      'A produção modernista brasileira das primeiras décadas do século XX buscou, entre outros aspectos, valorizar:',
      'Qual alternativa melhor resume uma influência importante do Modernismo sobre a pintura brasileira?'
    ],
    options:['A valorização de temas, paisagens e aspectos da cultura brasileira.','A cópia rigorosa de modelos acadêmicos europeus.','O abandono de qualquer referência ao cotidiano nacional.','A exclusão de elementos populares da produção artística.','A substituição da pintura por técnicas exclusivamente fotográficas.'],
    answer:0,
    explanation:'O Modernismo brasileiro valorizou elementos nacionais, paisagens locais e aspectos da cultura do país, rompendo com padrões acadêmicos mais rígidos.'
  },
  {
    id:'fuvest2025-v3-1', subject:'Geografia', difficulty:'medio', realExam:true,
    exam:'Vestibular USP', bank:'FUVEST', year:2025, examQuestion:1,
    sourceUrl:'https://www.fuvest.br/acervo-vestibular-2025',
    q:'Com a redução sazonal da cobertura de gelo no Ártico, novas rotas marítimas podem ganhar importância econômica. Uma vantagem geográfica dessas rotas é:',
    variants:[
      'Com a redução sazonal da cobertura de gelo no Ártico, novas rotas marítimas podem ganhar importância econômica. Uma vantagem geográfica dessas rotas é:',
      'Rotas de navegação pelo Ártico vêm sendo discutidas por causa das mudanças na cobertura de gelo. Por que elas podem interessar ao comércio internacional?',
      'Em termos de logística marítima global, qual benefício pode resultar da abertura de passagens pelo Ártico?'
    ],
    options:['A redução de distâncias entre importantes centros comerciais da Ásia, Europa e América.','A eliminação completa dos riscos climáticos no transporte marítimo.','A substituição imediata de todos os canais artificiais do planeta.','A impossibilidade de passagem pelo Estreito de Bering.','O aumento obrigatório do percurso em relação às rotas tradicionais.'],
    answer:0,
    explanation:'Algumas passagens pelo Ártico podem encurtar trajetos entre grandes mercados, embora continuem sujeitas a limitações ambientais, sazonais e geopolíticas.'
  },
  {
    id:'unesp2025-20', subject:'Português', difficulty:'medio', realExam:true,
    exam:'Vestibular UNESP', bank:'VUNESP', year:2025, examQuestion:20,
    sourceUrl:'https://www.vunesp.com.br/VNSP2404/',
    q:'Em uma análise de coesão textual, qual classe de palavra pode retomar um termo mencionado anteriormente e estabelecer ligação entre orações?',
    variants:[
      'Em uma análise de coesão textual, qual classe de palavra pode retomar um termo mencionado anteriormente e estabelecer ligação entre orações?',
      'Quando a palavra “que” recupera um antecedente já citado e introduz uma oração, ela exerce a função de:',
      'Em uma oração na qual “que” retoma um nome ou pronome anterior, como essa palavra é classificada?'
    ],
    options:['Pronome relativo.','Conjunção conclusiva.','Advérbio de intensidade.','Preposição essencial.','Interjeição.'],
    answer:0,
    explanation:'O pronome relativo retoma um antecedente e, ao mesmo tempo, introduz uma oração subordinada adjetiva.'
  },
  {
    id:'unicamp2025-20', subject:'Português', difficulty:'medio', realExam:true,
    exam:'Vestibular UNICAMP', bank:'COMVEST', year:2025, examQuestion:20,
    sourceUrl:'https://www.comvest.unicamp.br/vestibulares-anteriores/',
    q:'Uma frase explora o verbo “ligar” tanto no sentido de telefonar quanto no de se importar com alguém. Esse efeito de linguagem se baseia em:',
    variants:[
      'Uma frase explora o verbo “ligar” tanto no sentido de telefonar quanto no de se importar com alguém. Esse efeito de linguagem se baseia em:',
      'Quando uma mesma palavra é usada de modo a ativar dois sentidos diferentes no mesmo contexto, qual recurso expressivo está sendo explorado?',
      'O uso simultâneo dos sentidos “telefonar” e “dar importância” para o verbo “ligar” produz um efeito de: '
    ],
    options:['Duplo sentido por polissemia.','Concordância nominal.','Regência verbal obrigatória.','Pleonasmo vicioso.'],
    answer:0,
    explanation:'O efeito nasce da polissemia: uma mesma palavra ativa sentidos distintos, permitindo a leitura de “ligar” como telefonar e como importar-se.'
  },
  {
    id:'unicamp2025-1', subject:'História', difficulty:'dificil', realExam:true,
    exam:'Vestibular UNICAMP', bank:'COMVEST', year:2025, examQuestion:1,
    sourceUrl:'https://www.comvest.unicamp.br/vestibulares-anteriores/',
    q:'No “mito da caverna”, de Platão, a ideia do Bem ocupa posição central. Qual afirmação é compatível com essa concepção filosófica?',
    variants:[
      'No “mito da caverna”, de Platão, a ideia do Bem ocupa posição central. Qual afirmação é compatível com essa concepção filosófica?',
      'Em A República, Platão relaciona a ideia do Bem ao conhecimento e à ação justa. Como essa ideia é apresentada?',
      'Na filosofia platônica apresentada em A República, qual papel é atribuído à ideia do Bem?'
    ],
    options:['É difícil de conhecer, mas orienta a compreensão do justo e do belo e é relevante para boas decisões.','É imediatamente conhecida por todos, sem necessidade de reflexão filosófica.','É apenas uma opinião individual, sem relação com a verdade.','É um conceito dispensável para a vida política e ética.'],
    answer:0,
    explanation:'Na leitura platônica, a ideia do Bem é difícil de alcançar, mas funciona como referência para o conhecimento, a justiça e a condução adequada da vida pública e privada.'
  }
];

QUESTION_BANK.push(...EXTRA_REAL_EXAM_QUESTIONS);
