// Questões adaptadas a partir de itens de provas oficiais.
// Os enunciados foram reescritos para treino. O campo examQuestion indica o item oficial de referência.
const REAL_EXAM_QUESTIONS = [
  {
    id:'enem2025-6', subject:'Português', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:6,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma crônica compara a escrita à mão com recursos digitais e conclui que novas formas de escrever não eliminam necessariamente as anteriores. Qual ideia resume essa conclusão?',
    variants:[
      'Uma crônica compara a escrita à mão com recursos digitais e conclui que novas formas de escrever não eliminam necessariamente as anteriores. Qual ideia resume essa conclusão?',
      'Ao refletir sobre caligrafia, teclado e telas, uma autora observa que diferentes formas de escrita continuam presentes no cotidiano. Que conclusão se destaca?',
      'Em um texto sobre a passagem do papel para o ambiente digital, a autora percebe permanências e mudanças. Qual afirmação melhor traduz essa visão?'
    ],
    options:['As tecnologias de escrita coexistem com práticas já estabelecidas.','Toda tecnologia nova torna a anterior inútil.','A escrita manual deixou de ter função social.','Os recursos digitais só existem por necessidade profissional.'], answer:0,
    explanation:'A ideia central é de coexistência: práticas digitais se somam a formas anteriores de escrita, em vez de simplesmente substituí-las.'
  },
  {
    id:'enem2025-8', subject:'Português', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:8,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma crônica relata experiências pessoais da autora com sua caligrafia e, a partir delas, desenvolve uma reflexão sobre modos de escrever. Que característica do gênero aparece com mais força?',
    variants:[
      'Uma crônica relata experiências pessoais da autora com sua caligrafia e, a partir delas, desenvolve uma reflexão sobre modos de escrever. Que característica do gênero aparece com mais força?',
      'Ao transformar situações do próprio cotidiano em reflexão sobre a escrita, o texto assume uma característica típica da crônica. Qual?',
      'O texto usa lembranças e fatos pessoais como ponto de partida para refletir sobre um tema cotidiano. Isso caracteriza a crônica pela:'
    ],
    options:['abordagem de fatos pessoais em perspectiva reflexiva.','exposição científica de tecnologias de escrita.','narração histórica rigidamente cronológica.','defesa de uma tese jurídica sobre comunicação.'], answer:0,
    explanation:'A crônica frequentemente parte do cotidiano e de experiências pessoais para construir uma reflexão mais ampla.'
  },
  {
    id:'enem2025-9', subject:'Português', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:9,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Em uma crônica sobre bilhetes, aparecem recados, anotações e mensagens em diferentes situações do dia a dia. O que essa variedade evidencia sobre o gênero bilhete?',
    variants:[
      'Em uma crônica sobre bilhetes, aparecem recados, anotações e mensagens em diferentes situações do dia a dia. O que essa variedade evidencia sobre o gênero bilhete?',
      'Uma autora menciona bilhetes usados em contextos afetivos, domésticos e profissionais. Qual aspecto do gênero ela destaca?',
      'Ao citar diferentes situações em que se escrevem bilhetes, o texto chama atenção para qual característica desse gênero?'
    ],
    options:['A diversidade de usos no cotidiano.','A obrigatoriedade de linguagem formal.','A proibição de mensagens curtas.','O uso exclusivo em ambientes profissionais.'], answer:0,
    explanation:'Os exemplos apontam para a flexibilidade do bilhete e para seus diferentes usos em situações cotidianas.'
  },
  {
    id:'enem2025-10', subject:'Português', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:10,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Um texto contrasta a letra manuscrita, que carrega marcas pessoais, com a escrita produzida em dispositivos digitais. Qual recurso visual exemplifica melhor a variedade da escrita digital?',
    variants:[
      'Um texto contrasta a letra manuscrita, que carrega marcas pessoais, com a escrita produzida em dispositivos digitais. Qual recurso visual exemplifica melhor a variedade da escrita digital?',
      'Na comparação entre escrita de próprio punho e escrita no computador, que elemento mostra a multiplicidade visual disponível no meio digital?',
      'Se a caligrafia distingue a escrita manual, qual característica do ambiente digital pode variar a aparência das letras de modo semelhante?'
    ],
    options:['A diversidade de fontes tipográficas.','A presença obrigatória de imagens.','O tamanho físico da tela.','A velocidade da conexão com a internet.'], answer:0,
    explanation:'No ambiente digital, diferentes fontes tipográficas alteram a aparência gráfica da escrita.'
  },
  {
    id:'enem2025-91', subject:'Física', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:91,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma mariposa próxima de uma lâmpada recebe energia térmica mesmo sem contato direto com o ar aquecido. Qual processo de transferência de calor pode ocorrer sem depender de um fluido?',
    variants:[
      'Uma mariposa próxima de uma lâmpada recebe energia térmica mesmo sem contato direto com o ar aquecido. Qual processo de transferência de calor pode ocorrer sem depender de um fluido?',
      'O calor de uma lâmpada pode alcançar um inseto por um mecanismo que se propaga mesmo no vácuo. Qual é esse mecanismo?',
      'Entre os processos de transferência de energia térmica, qual não exige a presença de matéria entre a fonte quente e o corpo aquecido?'
    ],
    options:['Irradiação.','Convecção.','Refração.','Condução exclusivamente em líquidos.'], answer:0,
    explanation:'A irradiação transfere energia por ondas eletromagnéticas e não exige meio material.'
  },
  {
    id:'enem2025-92', subject:'Biologia', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:92,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Certos sapos obtêm substâncias tóxicas a partir de presas consumidas na natureza. Em cativeiro, sem essas presas, os animais deixam de apresentar a mesma toxicidade. Qual fator explica isso?',
    variants:[
      'Certos sapos obtêm substâncias tóxicas a partir de presas consumidas na natureza. Em cativeiro, sem essas presas, os animais deixam de apresentar a mesma toxicidade. Qual fator explica isso?',
      'Um anfíbio torna-se menos tóxico quando criado em cativeiro porque sua toxina depende de componentes obtidos na dieta natural. O que mudou?',
      'Se a toxicidade de um sapo depende de substâncias presentes nos organismos que ele come, por que indivíduos de cativeiro podem não ser tóxicos?'
    ],
    options:['Pela ausência da alimentação natural que fornece os compostos.','Por uma mutação obrigatória ocorrida no cativeiro.','Porque a umidade elimina permanentemente os genes de toxinas.','Porque o animal perde a capacidade de se alimentar.'], answer:0,
    explanation:'A toxina é adquirida por meio da dieta; sem as presas que fornecem os compostos, a toxicidade diminui.'
  },
  {
    id:'enem2025-93', subject:'Biologia', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:93,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Em uma vacina tradicional, o antígeno apresentado ao organismo contribui para a proteção contra o vírus principalmente porque:',
    variants:[
      'Em uma vacina tradicional, o antígeno apresentado ao organismo contribui para a proteção contra o vírus principalmente porque:',
      'Qual é a função imunológica central do antígeno usado em uma vacina?',
      'Ao entrar em contato com um antígeno vacinal, o sistema imune pode construir proteção futura por qual mecanismo?'
    ],
    options:['estimula a produção de moléculas de defesa capazes de neutralizar o agente.','mata diretamente todos os vírus por contato físico.','substitui os leucócitos por proteínas artificiais.','impede qualquer resposta do sistema imunológico.'], answer:0,
    explanation:'O antígeno estimula uma resposta imune específica, incluindo a produção de anticorpos/proteínas neutralizadoras.'
  },
  {
    id:'enem2025-94', subject:'Biologia', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:94,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma gramínea exótica, muito competitiva, espalha-se rapidamente pelo Cerrado e ocupa áreas antes usadas por plantas locais. A longo prazo, qual consequência ecológica é mais provável?',
    variants:[
      'Uma gramínea exótica, muito competitiva, espalha-se rapidamente pelo Cerrado e ocupa áreas antes usadas por plantas locais. A longo prazo, qual consequência ecológica é mais provável?',
      'A introdução de uma espécie vegetal invasora e agressiva no Cerrado tende a provocar qual efeito sobre a comunidade nativa?',
      'Quando uma espécie exótica compete intensamente com plantas do Cerrado e se espalha por grandes áreas, qual impacto pode ocorrer?'
    ],
    options:['Redução da diversidade de espécies nativas.','Aumento garantido de todos os nichos ecológicos.','Eliminação completa das queimadas naturais.','Formação automática de novas nascentes.'], answer:0,
    explanation:'Espécies invasoras podem competir por recursos e reduzir populações de espécies nativas, diminuindo a biodiversidade local.'
  },
  {
    id:'enem2025-95', subject:'Geografia', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:95,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Um lagarto adaptado a ambiente desértico apresenta mecanismos de sobrevivência relacionados à escassez de alimento. Em qual bioma brasileiro seria mais provável encontrar condições ambientais semelhantes?',
    variants:[
      'Um lagarto adaptado a ambiente desértico apresenta mecanismos de sobrevivência relacionados à escassez de alimento. Em qual bioma brasileiro seria mais provável encontrar condições ambientais semelhantes?',
      'Considerando semelhanças ambientais, qual bioma brasileiro oferece condições mais próximas de regiões semiáridas para espécies adaptadas à seca?',
      'Uma espécie de réptil adaptada à aridez teria maior chance de encontrar ambiente semelhante no Brasil em qual bioma?'
    ],
    options:['Caatinga.','Pantanal.','Pampa.','Mata Atlântica.'], answer:0,
    explanation:'A Caatinga é marcada por clima semiárido e longos períodos de seca, favorecendo adaptações à aridez.'
  },
  {
    id:'enem2025-96', subject:'Química', difficulty:'facil', realExam:true, exam:'ENEM', year:2025, examQuestion:96,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma água passa por processo de purificação que remove os sais dissolvidos e é usada em laboratórios, baterias e processos industriais. Como essa água é chamada?',
    variants:[
      'Uma água passa por processo de purificação que remove os sais dissolvidos e é usada em laboratórios, baterias e processos industriais. Como essa água é chamada?',
      'Qual nome recebe a água obtida por um processo que elimina a maior parte dos sais dissolvidos, sendo comum em laboratório?',
      'Em aplicações químicas, usa-se uma água purificada com baixíssimo teor de íons dissolvidos. Entre as opções, qual é a denominação adequada?'
    ],
    options:['Água destilada.','Água dura.','Água sanitária.','Água oxigenada.'], answer:0,
    explanation:'A destilação separa a água de grande parte dos sais dissolvidos, produzindo água destilada.'
  },
  {
    id:'enem2025-97', subject:'Física', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:97,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'O efeito de “olhos vermelhos” em fotografias com flash é mais comum em ambientes escuros. O que acontece com a pupila nessas condições?',
    variants:[
      'O efeito de “olhos vermelhos” em fotografias com flash é mais comum em ambientes escuros. O que acontece com a pupila nessas condições?',
      'Por que o flash tem maior chance de produzir olhos vermelhos à noite, considerando a resposta da pupila à pouca luz?',
      'Em baixa iluminação, qual alteração da pupila facilita a entrada de mais luz no olho e favorece o efeito de olhos vermelhos em fotos?'
    ],
    options:['Ela fica dilatada, permitindo que mais luz chegue à retina.','Ela fica contraída, bloqueando completamente a luz.','Ela muda de cor para refletir o flash.','Ela deixa de controlar a entrada de luz.'], answer:0,
    explanation:'No escuro, a pupila se dilata. Assim, mais luz do flash entra no olho e pode ser refletida pela região vascularizada.'
  },
  {
    id:'enem2025-99', subject:'Biologia', difficulty:'dificil', realExam:true, exam:'ENEM', year:2025, examQuestion:99,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma doença impede a degradação intracelular de colesterol esterificado e triglicerídeos, levando ao acúmulo dessas substâncias. Qual organela está mais diretamente ligada a esse tipo de digestão celular?',
    variants:[
      'Uma doença impede a degradação intracelular de colesterol esterificado e triglicerídeos, levando ao acúmulo dessas substâncias. Qual organela está mais diretamente ligada a esse tipo de digestão celular?',
      'Se uma célula perde a capacidade de degradar determinadas moléculas por enzimas digestivas internas, qual organela é a principal suspeita de falha?',
      'O acúmulo de lipídios não degradados pode indicar deficiência de enzimas presentes em qual estrutura celular responsável pela digestão intracelular?'
    ],
    options:['Lisossomos.','Ribossomos.','Mitocôndrias.','Centríolos.'], answer:0,
    explanation:'Lisossomos contêm enzimas hidrolíticas responsáveis pela digestão intracelular de várias moléculas.'
  },
  {
    id:'enem2025-100', subject:'Geografia', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:100,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Entre ações de mitigação climática, qual delas contribui diretamente para retirar dióxido de carbono que já está presente na atmosfera?',
    variants:[
      'Entre ações de mitigação climática, qual delas contribui diretamente para retirar dióxido de carbono que já está presente na atmosfera?',
      'Qual medida, além de evitar novas emissões, atua como sumidouro e ajuda a reduzir CO₂ atmosférico?',
      'Para diminuir a concentração de CO₂ já existente no ar, qual ação amplia a captura biológica desse gás?'
    ],
    options:['Ampliar o plantio e a recuperação de árvores.','Substituir lâmpadas por modelos mais potentes.','Aumentar o uso de combustíveis fósseis.','Retirar vegetação para expandir áreas urbanas.'], answer:0,
    explanation:'Árvores capturam CO₂ durante a fotossíntese e armazenam carbono em sua biomassa.'
  },
  {
    id:'enem2025-136', subject:'Matemática', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:136,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma ciclovia circular tem raio de 1 km. Considere π = 3. Cada policial protege até 200 m da ciclovia para cada lado de sua posição. Qual é o número mínimo de policiais para cobrir toda a pista?',
    variants:[
      'Uma ciclovia circular tem raio de 1 km. Considere π = 3. Cada policial protege até 200 m da ciclovia para cada lado de sua posição. Qual é o número mínimo de policiais para cobrir toda a pista?',
      'O contorno de uma lagoa circular de raio 1 km possui uma ciclovia. Com π = 3, um agente cobre 400 m de extensão total ao redor de sua posição. Quantos agentes são necessários para cobrir todo o percurso?',
      'Uma pista circular mede 2·3·1 km de comprimento. Se cada policial cobre um arco total de 400 m, qual é a quantidade mínima necessária para proteção completa?'
    ],
    options:['15.','8.','30.','60.'], answer:0,
    explanation:'O comprimento é 2·3·1 = 6 km = 6 000 m. Cada policial cobre 400 m, então 6 000 ÷ 400 = 15.'
  },
  {
    id:'enem2025-152', subject:'Matemática', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:152,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma fábrica produz 720 tijolos por dia com 3 funcionários trabalhando 6 horas cada. Mantendo a mesma produtividade por pessoa e por hora, quantos tijolos serão produzidos com 5 funcionários trabalhando 9 horas?',
    variants:[
      'Uma fábrica produz 720 tijolos por dia com 3 funcionários trabalhando 6 horas cada. Mantendo a mesma produtividade por pessoa e por hora, quantos tijolos serão produzidos com 5 funcionários trabalhando 9 horas?',
      'Se 18 horas-trabalhador geram 720 unidades, quantas unidades serão produzidas por 45 horas-trabalhador com a mesma produtividade?',
      'Três trabalhadores, em jornadas de 6 horas, fabricam 720 unidades. A equipe passa a 5 pessoas com 9 horas diárias. Qual passa a ser a produção diária?'
    ],
    options:['1 800.','1 200.','1 080.','2 520.'], answer:0,
    explanation:'A produtividade é 720 ÷ (3·6) = 40 tijolos por hora-trabalhador. Depois: 5·9·40 = 1 800.'
  },
  {
    id:'enem2025-162', subject:'Matemática', difficulty:'dificil', realExam:true, exam:'ENEM', year:2025, examQuestion:162,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Dez casais formam um grupo com 20 pessoas. Serão escolhidos presidente, secretário e tesoureiro, com no máximo uma pessoa de cada casal na diretoria. Quantas diretorias ordenadas podem ser formadas?',
    variants:[
      'Dez casais formam um grupo com 20 pessoas. Serão escolhidos presidente, secretário e tesoureiro, com no máximo uma pessoa de cada casal na diretoria. Quantas diretorias ordenadas podem ser formadas?',
      'Há 20 pessoas organizadas em 10 casais. Para três cargos distintos, não pode haver duas pessoas do mesmo casal. Quantas escolhas possíveis existem?',
      'Uma diretoria tem três funções diferentes e será escolhida entre 10 casais. Depois de escolher uma pessoa, seu par fica impedido de ocupar outro cargo. Qual é o número de diretorias?'
    ],
    options:['5 760.','6 840.','720.','2 880.'], answer:0,
    explanation:'Há 20 escolhas para o primeiro cargo, 18 para o segundo e 16 para o terceiro: 20·18·16 = 5 760.'
  },
  {
    id:'enem2025-165', subject:'Matemática', difficulty:'dificil', realExam:true, exam:'ENEM', year:2025, examQuestion:165,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Um estacionamento tem 120 vagas ocupadas. A manutenção custa R$ 14.240,00 por mês e o seguro, antes de R$ 36,00 por veículo, aumenta 20%. Para obter lucro mensal de R$ 10.000,00, qual deve ser a nova mensalidade por vaga?',
    variants:[
      'Um estacionamento tem 120 vagas ocupadas. A manutenção custa R$ 14.240,00 por mês e o seguro, antes de R$ 36,00 por veículo, aumenta 20%. Para obter lucro mensal de R$ 10.000,00, qual deve ser a nova mensalidade por vaga?',
      'Com 120 clientes, custo fixo de R$ 14.240,00 e seguro reajustado de R$ 36,00 em 20%, qual mensalidade gera R$ 10.000,00 de lucro mensal?',
      'Após reajuste de 20% no seguro de R$ 36,00 por veículo, um estacionamento de 120 vagas quer cobrir R$ 14.240,00 de manutenção e ainda lucrar R$ 10.000,00. Quanto cobrar por vaga?'
    ],
    options:['R$ 245,20.','R$ 226,09.','R$ 268,93.','R$ 285,60.'], answer:0,
    explanation:'Seguro novo: 36·1,20 = 43,20. Despesa total: 14.240 + 120·43,20 = 19.424. Com lucro: 29.424. Dividindo por 120, resulta em R$ 245,20.'
  },
  {
    id:'enem2025-166', subject:'Matemática', difficulty:'facil', realExam:true, exam:'ENEM', year:2025, examQuestion:166,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Um pote contém 20 000 cm³ de sorvete. Cada taça recebe uma porção de 250 mL. Quantas taças completas podem ser servidas?',
    variants:[
      'Um pote contém 20 000 cm³ de sorvete. Cada taça recebe uma porção de 250 mL. Quantas taças completas podem ser servidas?',
      'Sabendo que 1 cm³ = 1 mL, um recipiente de 20 000 cm³ serve porções de 250 mL. Quantas porções cabem nele?',
      'Um volume de 20 litros de sorvete será dividido em taças de 250 mL. Quantas taças podem ser preenchidas?'
    ],
    options:['80.','50.','8.','800.'], answer:0,
    explanation:'20 000 cm³ = 20 000 mL. Então 20 000 ÷ 250 = 80 taças.'
  },
  {
    id:'enem2025-170', subject:'Física', difficulty:'medio', realExam:true, exam:'ENEM', year:2025, examQuestion:170,
    sourceUrl:'https://riep.inep.gov.br/items/ca4bcb51-f523-495b-8b49-704c0f155ba8',
    q:'Uma grandeza é definida como a intensidade luminosa, medida em candela (cd), dividida pelo quadrado da distância, medida em metro. Qual é a unidade dessa grandeza?',
    variants:[
      'Uma grandeza é definida como a intensidade luminosa, medida em candela (cd), dividida pelo quadrado da distância, medida em metro. Qual é a unidade dessa grandeza?',
      'Se L = I/d², com I em candela e d em metro, qual unidade resulta para L?',
      'Ao dividir uma intensidade luminosa em cd pelo quadrado de uma distância em m, qual unidade dimensional é obtida?'
    ],
    options:['cd/m².','m²/cd.','cd/m.','m/cd.'], answer:0,
    explanation:'Pela definição L = I/d², a unidade é candela por metro quadrado: cd/m².'
  }
];

// Soma as questões adaptadas ao banco principal.
QUESTION_BANK.push(...REAL_EXAM_QUESTIONS);
