// Banco adicional de questões autorais alinhadas aos conteúdos programáticos.
// Cada questão possui 5 formulações para aumentar a variedade sem alterar o gabarito.
const MORE_EDITAL_QUESTIONS = [];

function addMoreEditalQuestion(id, subject, difficulty, q, alt, options, answer, explanation, institutions=['ENEM','FUVEST','UNICAMP','UNESP']){
  const variants = [
    q,
    alt,
    `Em um item de ${subject}, assinale a alternativa correta. ${q}`,
    `Para revisar ${subject} conforme os conteúdos programáticos, responda: ${alt}`,
    `Considere a cobrança típica de ${subject} em vestibulares. ${q}`
  ];
  const item = {
    id:`edital-extra-${id}`,
    subject,
    difficulty,
    q,
    variants,
    options,
    answer,
    explanation,
    editalBased:true,
    institutions,
    editalSection:'Conteúdo programático',
    sourceUrl:(typeof EDITAL_PROGRAM_SOURCES!=='undefined' && EDITAL_PROGRAM_SOURCES[institutions[0]]) ? EDITAL_PROGRAM_SOURCES[institutions[0]].url : '',
    programYear:2026
  };
  MORE_EDITAL_QUESTIONS.push(item);
}

addMoreEditalQuestion(
  "pt-09",
  "Português",
  "medio",
  "Na frase “Chegaram cedo os candidatos”, qual é o sujeito da oração?",
  "Na ordem inversa de “Chegaram cedo os candidatos”, que termo exerce a função de sujeito?",
  ["os candidatos", "cedo", "chegaram", "não há sujeito"],
  0,
  "O verbo “chegaram” concorda com “os candidatos”, que é o sujeito posposto."
);
addMoreEditalQuestion(
  "pt-10",
  "Português",
  "medio",
  "Em “Assisti ao filme ontem”, a regência do verbo “assistir”, no sentido de ver, exige:",
  "No sentido de ver ou presenciar, qual construção segue a regência-padrão do verbo “assistir”?",
  ["a preposição “a” antes do complemento", "objeto direto sem preposição", "a preposição “de” obrigatoriamente", "a preposição “com” obrigatoriamente"],
  0,
  "Na norma-padrão, “assistir” no sentido de ver é transitivo indireto e rege a preposição “a”."
);
addMoreEditalQuestion(
  "pt-11",
  "Português",
  "dificil",
  "Em “Os alunos que estudaram passaram”, a oração “que estudaram”, sem vírgulas, é classificada como:",
  "Qual é a classificação da oração relativa em “Os alunos que estudaram passaram”?",
  ["oração subordinada adjetiva restritiva", "oração subordinada adjetiva explicativa", "oração subordinada substantiva subjetiva", "oração coordenada conclusiva"],
  0,
  "Sem vírgulas, a oração restringe o grupo de alunos aos que estudaram."
);
addMoreEditalQuestion(
  "pt-12",
  "Português",
  "medio",
  "Assinale a frase em que a crase está empregada corretamente.",
  "Qual alternativa apresenta uso correto do acento indicativo de crase?",
  ["Referi-me àquela norma durante a reunião.", "Entreguei o documento à você.", "Começamos à estudar cedo.", "Fui à pé até a escola."],
  0,
  "Em “àquela”, ocorre a fusão da preposição “a” com o “a” inicial do pronome demonstrativo “aquela”."
);
addMoreEditalQuestion(
  "pt-13",
  "Português",
  "medio",
  "Em “Queria sair, mas começou a chover”, a conjunção “mas” introduz uma relação de:",
  "Qual relação semântica é estabelecida por “mas” na frase “Queria sair, mas começou a chover”?",
  ["oposição", "conclusão", "explicação", "finalidade"],
  0,
  "“Mas” é uma conjunção adversativa e introduz oposição ou contraste."
);
addMoreEditalQuestion(
  "pt-14",
  "Português",
  "facil",
  "Na frase “A cidade acordou nervosa”, atribuir à cidade uma ação ou estado humano constitui:",
  "Qual figura de linguagem aparece em “A cidade acordou nervosa”?",
  ["personificação", "eufemismo", "hipérbole", "onomatopeia"],
  0,
  "A personificação atribui características ou ações humanas a seres não humanos ou entidades abstratas."
);
addMoreEditalQuestion(
  "pt-15",
  "Português",
  "medio",
  "Em um texto argumentativo, a tese corresponde principalmente:",
  "Qual é a função da tese em um texto dissertativo-argumentativo?",
  ["ao ponto de vista central defendido pelo autor", "à lista de referências bibliográficas", "à repetição literal do título", "ao conjunto de exemplos sem relação entre si"],
  0,
  "A tese é a ideia central ou posicionamento que o texto procura sustentar com argumentos."
);
addMoreEditalQuestion(
  "pt-16",
  "Português",
  "dificil",
  "Em “Não me avisaram sobre a mudança”, a colocação do pronome “me” antes do verbo ocorre porque:",
  "Por que a próclise é adequada em “Não me avisaram sobre a mudança”?",
  ["a palavra negativa “não” atrai o pronome átono", "todo verbo no passado exige próclise", "o pronome “me” nunca pode vir depois do verbo", "a oração não possui sujeito"],
  0,
  "Palavras negativas, como “não”, são fatores de atração para o pronome oblíquo átono."
);
addMoreEditalQuestion(
  "mat-11",
  "Matemática",
  "medio",
  "Resolva o sistema x + y = 10 e x − y = 2. Qual é o valor de x?",
  "Somando as equações x+y=10 e x−y=2, qual valor se obtém para x?",
  ["6", "4", "5", "8"],
  0,
  "Somando as duas equações: 2x=12, logo x=6."
);
addMoreEditalQuestion(
  "mat-12",
  "Matemática",
  "medio",
  "Se f(x)=2ˣ, qual é o valor de f(5)?",
  "Determine a imagem de 5 pela função exponencial f(x)=2ˣ.",
  ["32", "10", "25", "64"],
  0,
  "f(5)=2⁵=32."
);
addMoreEditalQuestion(
  "mat-13",
  "Matemática",
  "dificil",
  "Qual é o valor de log₁₀(1000)?",
  "Determine o expoente ao qual 10 deve ser elevado para resultar em 1000.",
  ["3", "2", "10", "100"],
  0,
  "Como 10³=1000, log₁₀(1000)=3."
);
addMoreEditalQuestion(
  "mat-14",
  "Matemática",
  "facil",
  "Em um triângulo retângulo, sen 30° vale:",
  "Qual é o valor trigonométrico de sen(30°)?",
  ["1/2", "√3/2", "1", "0"],
  0,
  "O seno de 30° é 1/2."
);
addMoreEditalQuestion(
  "mat-15",
  "Matemática",
  "medio",
  "Uma circunferência tem raio 4 cm. Usando π=3, qual é sua área?",
  "Calcule a área de um círculo de raio 4 cm considerando π=3.",
  ["48 cm²", "24 cm²", "12 cm²", "96 cm²"],
  0,
  "A=πr²=3·4²=3·16=48 cm²."
);
addMoreEditalQuestion(
  "mat-16",
  "Matemática",
  "medio",
  "Um cilindro tem raio da base 2 cm e altura 5 cm. Usando π=3, qual é o volume?",
  "Calcule V=πr²h para r=2 cm, h=5 cm e π=3.",
  ["60 cm³", "30 cm³", "20 cm³", "120 cm³"],
  0,
  "V=3·2²·5=3·4·5=60 cm³."
);
addMoreEditalQuestion(
  "mat-17",
  "Matemática",
  "medio",
  "Uma quantia de R$ 500 aumenta 10% e, depois, aumenta mais 10%. Qual é o valor final?",
  "Aplicando dois reajustes sucessivos de 10% sobre R$ 500, qual valor é obtido?",
  ["R$ 605,00", "R$ 600,00", "R$ 610,00", "R$ 550,00"],
  0,
  "500·1,10·1,10=605. Percentuais sucessivos incidem sobre o valor atualizado."
);
addMoreEditalQuestion(
  "mat-18",
  "Matemática",
  "medio",
  "Os valores 2, 4, 4, 7 e 9 estão em ordem crescente. Qual é a mediana?",
  "Qual é o termo central do conjunto ordenado 2, 4, 4, 7, 9?",
  ["4", "5", "7", "2"],
  0,
  "Com cinco valores, a mediana é o terceiro termo: 4."
);
addMoreEditalQuestion(
  "bio-07",
  "Biologia",
  "medio",
  "A replicação do DNA é chamada de semiconservativa porque cada molécula nova:",
  "O que significa dizer que a duplicação do DNA é semiconservativa?",
  ["possui uma fita antiga e uma fita recém-sintetizada", "é formada apenas por fitas antigas", "é formada apenas por RNA", "perde metade de seus nucleotídeos"],
  0,
  "Cada molécula-filha conserva uma fita da molécula original e apresenta uma fita nova."
);
addMoreEditalQuestion(
  "bio-08",
  "Biologia",
  "medio",
  "Na mitose de uma célula somática diploide, as células-filhas normalmente apresentam:",
  "Qual é o resultado cromossômico típico da mitose em células somáticas?",
  ["o mesmo número de cromossomos da célula-mãe", "metade do número de cromossomos", "o dobro do número de cromossomos", "nenhum cromossomo"],
  0,
  "A mitose mantém, em condições normais, o número cromossômico da célula de origem."
);
addMoreEditalQuestion(
  "bio-09",
  "Biologia",
  "dificil",
  "Em um cruzamento Aa × Aa, qual é a probabilidade de um descendente apresentar genótipo aa?",
  "Considerando segregação mendeliana simples, qual é a chance de aa em Aa × Aa?",
  ["25%", "50%", "75%", "100%"],
  0,
  "O cruzamento produz AA, Aa, Aa e aa em proporção 1:2:1; portanto aa corresponde a 25%."
);
addMoreEditalQuestion(
  "bio-10",
  "Biologia",
  "medio",
  "Ao longo de uma cadeia alimentar, a quantidade de energia disponível tende a:",
  "O que ocorre com a energia transferida entre níveis tróficos sucessivos?",
  ["diminuir a cada nível trófico", "aumentar continuamente", "permanecer sempre igual", "ser criada pelos consumidores"],
  0,
  "Parte da energia é dissipada em processos metabólicos, reduzindo a energia disponível nos níveis seguintes."
);
addMoreEditalQuestion(
  "bio-11",
  "Biologia",
  "dificil",
  "A concentração crescente de certos poluentes persistentes nos níveis mais altos de uma cadeia alimentar é chamada de:",
  "Como se denomina o aumento da concentração de substâncias tóxicas persistentes ao longo dos níveis tróficos?",
  ["biomagnificação", "sucessão ecológica", "fixação biológica", "nitrificação"],
  0,
  "Biomagnificação é o aumento da concentração de certos contaminantes nos níveis tróficos superiores."
);
addMoreEditalQuestion(
  "bio-12",
  "Biologia",
  "medio",
  "Qual hormônio pancreático contribui para reduzir a glicose no sangue ao favorecer sua entrada nas células?",
  "Qual hormônio está diretamente associado à diminuição da glicemia após uma refeição?",
  ["insulina", "adrenalina", "tiroxina", "melatonina"],
  0,
  "A insulina favorece a captação e o armazenamento de glicose, reduzindo a glicemia."
);
addMoreEditalQuestion(
  "bio-13",
  "Biologia",
  "medio",
  "A unidade funcional dos rins responsável por filtração e formação da urina é o:",
  "Qual estrutura microscópica realiza etapas fundamentais da formação da urina nos rins?",
  ["néfron", "alvéolo", "neurônio", "osteócito"],
  0,
  "O néfron é a unidade funcional renal, onde ocorrem filtração, reabsorção e secreção."
);
addMoreEditalQuestion(
  "bio-14",
  "Biologia",
  "medio",
  "Após vacinação, a resposta mais rápida em um contato posterior com o mesmo antígeno relaciona-se principalmente à formação de:",
  "Que componente da imunidade adaptativa favorece uma resposta mais eficiente após nova exposição ao mesmo antígeno?",
  ["células de memória", "hemácias", "plaquetas", "células musculares"],
  0,
  "Linfócitos de memória permanecem no organismo e favorecem resposta secundária mais rápida e intensa."
);
addMoreEditalQuestion(
  "fis-07",
  "Física",
  "medio",
  "Um corpo de massa 2 kg move-se a 3 m/s. Qual é sua energia cinética?",
  "Calcule Ec = mv²/2 para m=2 kg e v=3 m/s.",
  ["9 J", "6 J", "18 J", "3 J"],
  0,
  "Ec=(2·3²)/2=(2·9)/2=9 J."
);
addMoreEditalQuestion(
  "fis-08",
  "Física",
  "medio",
  "Um corpo de 5 kg está a 4 m de altura. Adote g=10 m/s². Qual é sua energia potencial gravitacional?",
  "Calcule Ep=mgh para m=5 kg, h=4 m e g=10 m/s².",
  ["200 J", "50 J", "20 J", "400 J"],
  0,
  "Ep=5·10·4=200 J."
);
addMoreEditalQuestion(
  "fis-09",
  "Física",
  "medio",
  "Um corpo de 4 kg move-se a 5 m/s. Qual é a quantidade de movimento?",
  "Determine p=mv para massa 4 kg e velocidade 5 m/s.",
  ["20 kg·m/s", "9 kg·m/s", "1,25 kg·m/s", "25 kg·m/s"],
  0,
  "p=4·5=20 kg·m/s."
);
addMoreEditalQuestion(
  "fis-10",
  "Física",
  "facil",
  "Um resistor de 6 Ω é submetido a uma tensão de 12 V. Qual corrente o atravessa?",
  "Pela lei de Ohm, calcule I=V/R para V=12 V e R=6 Ω.",
  ["2 A", "6 A", "12 A", "72 A"],
  0,
  "I=12/6=2 A."
);
addMoreEditalQuestion(
  "fis-11",
  "Física",
  "medio",
  "Um aparelho opera com tensão de 120 V e corrente de 2 A. Qual é sua potência elétrica?",
  "Calcule a potência P=VI para V=120 V e I=2 A.",
  ["240 W", "60 W", "122 W", "480 W"],
  0,
  "P=120·2=240 W."
);
addMoreEditalQuestion(
  "fis-12",
  "Física",
  "medio",
  "Uma onda possui frequência de 5 Hz e comprimento de onda de 2 m. Qual é sua velocidade?",
  "Usando v=fλ, determine a velocidade para f=5 Hz e λ=2 m.",
  ["10 m/s", "2,5 m/s", "7 m/s", "20 m/s"],
  0,
  "v=5·2=10 m/s."
);
addMoreEditalQuestion(
  "fis-13",
  "Física",
  "medio",
  "Ao passar do ar para o vidro, a luz muda de velocidade. Qual grandeza permanece constante na refração?",
  "Na refração de uma onda luminosa entre dois meios, qual grandeza não se altera?",
  ["frequência", "velocidade", "comprimento de onda", "índice de refração do meio"],
  0,
  "A frequência é determinada pela fonte e permanece constante na passagem entre meios; velocidade e comprimento de onda podem mudar."
);
addMoreEditalQuestion(
  "fis-14",
  "Física",
  "dificil",
  "Um corpo recebe 2 000 J de calor e sua temperatura aumenta 10 °C. Se sua massa é 2 kg, qual é seu calor específico?",
  "Use Q=mcΔT para Q=2000 J, m=2 kg e ΔT=10 °C. Qual é c?",
  ["100 J/(kg·°C)", "200 J/(kg·°C)", "50 J/(kg·°C)", "1000 J/(kg·°C)"],
  0,
  "c=Q/(mΔT)=2000/(2·10)=100 J/(kg·°C)."
);
addMoreEditalQuestion(
  "qui-07",
  "Química",
  "facil",
  "Considerando H=1 e O=16, qual é a massa molar da água, H₂O?",
  "Qual é a massa molar de H₂O usando massas atômicas H=1 e O=16?",
  ["18 g/mol", "16 g/mol", "17 g/mol", "20 g/mol"],
  0,
  "2·1 + 16 = 18 g/mol."
);
addMoreEditalQuestion(
  "qui-08",
  "Química",
  "medio",
  "Na equação 2 H₂ + O₂ → 2 H₂O, quantos mols de H₂ são necessários para formar 2 mols de H₂O?",
  "Pela proporção estequiométrica de 2 H₂ + O₂ → 2 H₂O, qual quantidade de H₂ produz 2 mols de água?",
  ["2 mol", "1 mol", "4 mol", "0,5 mol"],
  0,
  "Os coeficientes mostram proporção 2:2 entre H₂ e H₂O."
);
addMoreEditalQuestion(
  "qui-09",
  "Química",
  "medio",
  "Qual é o número de oxidação do oxigênio na molécula H₂O?",
  "Em H₂O, qual NOX é atribuído ao oxigênio?",
  ["−2", "+2", "−1", "0"],
  0,
  "Na água, o oxigênio apresenta NOX −2 e cada hidrogênio, +1."
);
addMoreEditalQuestion(
  "qui-10",
  "Química",
  "medio",
  "A ligação predominante no composto NaCl é:",
  "Que tipo de ligação química se forma, de modo simplificado, entre sódio e cloro no NaCl?",
  ["iônica", "covalente apolar", "metálica", "ponte de hidrogênio"],
  0,
  "O sódio tende a perder elétron e o cloro a ganhar, formando íons atraídos eletrostaticamente."
);
addMoreEditalQuestion(
  "qui-11",
  "Química",
  "medio",
  "Entre moléculas de água, a interação intermolecular mais característica é:",
  "Qual força intermolecular explica grande parte das propriedades especiais da água?",
  ["ligação de hidrogênio", "ligação metálica", "ligação iônica entre moléculas", "força nuclear forte"],
  0,
  "As moléculas de água estabelecem ligações de hidrogênio devido à polaridade e à presença de H ligado a O."
);
addMoreEditalQuestion(
  "qui-12",
  "Química",
  "medio",
  "Mantendo a temperatura constante, se o volume de uma quantidade fixa de gás diminui, sua pressão tende a:",
  "Pela relação de Boyle, o que ocorre com a pressão quando o volume de um gás é reduzido a temperatura constante?",
  ["aumentar", "diminuir sempre à metade", "permanecer invariável", "tornar-se zero"],
  0,
  "Para quantidade fixa de gás a temperatura constante, pressão e volume variam inversamente."
);
addMoreEditalQuestion(
  "qui-13",
  "Química",
  "dificil",
  "Em um equilíbrio químico exotérmico, aumentar a temperatura tende a deslocar o equilíbrio para:",
  "Segundo Le Chatelier, em uma reação exotérmica em equilíbrio, o aquecimento favorece qual sentido?",
  ["o sentido endotérmico", "o sentido exotérmico necessariamente", "nenhum sentido em qualquer situação", "a formação obrigatória de catalisador"],
  0,
  "O aumento de temperatura favorece o sentido que consome calor, isto é, o sentido endotérmico."
);
addMoreEditalQuestion(
  "qui-14",
  "Química",
  "facil",
  "O grupo funcional —OH ligado a carbono saturado caracteriza, em geral, a função orgânica:",
  "Qual função orgânica é caracterizada por um grupo hidroxila ligado a carbono saturado?",
  ["álcool", "cetona", "ácido carboxílico", "amida"],
  0,
  "Álcoois apresentam grupo hidroxila —OH ligado a carbono saturado."
);
addMoreEditalQuestion(
  "his-07",
  "História",
  "medio",
  "Na democracia ateniense clássica, a participação política direta era restrita principalmente a:",
  "Quem possuía cidadania política plena na Atenas clássica, de forma geral?",
  ["homens cidadãos livres, conforme os critérios da pólis", "todos os habitantes, sem distinção", "mulheres, estrangeiros e escravizados em igualdade", "apenas sacerdotes estrangeiros"],
  0,
  "A cidadania ateniense era restrita e excluía diversos grupos, como mulheres, estrangeiros e pessoas escravizadas."
);
addMoreEditalQuestion(
  "his-08",
  "História",
  "medio",
  "No feudalismo europeu, a economia era marcada predominantemente por:",
  "Qual característica econômica esteve associada ao feudalismo medieval europeu?",
  ["produção agrária e forte caráter local", "industrialização mecanizada em massa", "predomínio de bolsas de valores globais", "economia baseada em petróleo"],
  0,
  "A economia feudal tinha forte base agrária, produção local e relações de dependência no campo."
);
addMoreEditalQuestion(
  "his-09",
  "História",
  "medio",
  "O Humanismo renascentista valorizou especialmente:",
  "Qual ideia ganhou força com o Humanismo do Renascimento europeu?",
  ["a capacidade humana de investigar e produzir conhecimento", "a rejeição absoluta de toda herança clássica", "o desaparecimento das artes visuais", "a proibição do estudo da natureza"],
  0,
  "O Humanismo valorizou o ser humano, a razão, as artes e o diálogo com a cultura clássica."
);
addMoreEditalQuestion(
  "his-10",
  "História",
  "medio",
  "A Reforma Protestante do século XVI esteve relacionada, entre outros fatores, a críticas:",
  "Entre as causas da Reforma Protestante, destacam-se críticas a:",
  ["práticas e autoridades da Igreja Católica da época", "uso de máquinas a vapor nas fábricas", "independência das colônias americanas", "fim do Império Romano do Ocidente"],
  0,
  "A Reforma envolveu críticas religiosas, políticas e econômicas às práticas e à autoridade da Igreja Católica no período."
);
addMoreEditalQuestion(
  "his-11",
  "História",
  "medio",
  "A Declaração dos Direitos do Homem e do Cidadão, de 1789, está associada diretamente à:",
  "Qual processo histórico produziu a Declaração dos Direitos do Homem e do Cidadão de 1789?",
  ["Revolução Francesa", "Revolução Russa", "Independência do Brasil", "Revolução Industrial japonesa"],
  0,
  "O documento foi aprovado no contexto da Revolução Francesa e expressou princípios de liberdade e igualdade jurídica."
);
addMoreEditalQuestion(
  "his-12",
  "História",
  "dificil",
  "Durante a Primeira República brasileira, o “coronelismo” relacionava-se principalmente:",
  "No Brasil da Primeira República, o coronelismo expressava qual tipo de relação política?",
  ["ao poder local de grandes proprietários e redes de dependência eleitoral", "à eleição direta de imperadores", "à extinção do poder regional", "ao voto secreto plenamente garantido desde o início do período"],
  0,
  "O coronelismo articulava poder econômico local, influência política e controle de redes eleitorais."
);
addMoreEditalQuestion(
  "his-13",
  "História",
  "medio",
  "A Consolidação das Leis do Trabalho (CLT), de 1943, foi criada durante o governo de:",
  "Em qual governo foi instituída a CLT em 1943?",
  ["Getúlio Vargas", "Dom Pedro II", "Jânio Quadros", "Deodoro da Fonseca"],
  0,
  "A CLT foi instituída em 1943 durante o Estado Novo, sob Getúlio Vargas."
);
addMoreEditalQuestion(
  "his-14",
  "História",
  "dificil",
  "O Ato Institucional nº 5, de 1968, durante a ditadura militar brasileira, ampliou:",
  "Qual foi uma consequência política do AI-5, decretado em 1968?",
  ["os poderes repressivos do regime e as restrições a direitos políticos", "a autonomia irrestrita do Congresso Nacional", "a liberdade de imprensa sem censura", "as eleições diretas imediatas para presidente"],
  0,
  "O AI-5 aprofundou o autoritarismo, permitindo medidas como fechamento do Congresso, cassações e suspensão de garantias."
);
addMoreEditalQuestion(
  "geo-07",
  "Geografia",
  "medio",
  "Em um mapa na escala 1:100 000, 1 cm no mapa representa quantos quilômetros no terreno?",
  "Converta a escala 1:100 000: a que distância real corresponde 1 cm no mapa?",
  ["1 km", "10 km", "100 km", "100 m"],
  0,
  "100 000 cm correspondem a 1 000 m, ou 1 km."
);
addMoreEditalQuestion(
  "geo-08",
  "Geografia",
  "medio",
  "Na transição demográfica, a queda da mortalidade antes da queda acentuada da natalidade tende a provocar:",
  "O que costuma ocorrer quando a mortalidade cai, mas a natalidade ainda permanece elevada?",
  ["crescimento acelerado da população", "redução imediata da população total", "saldo natural igual a zero", "desaparecimento das migrações"],
  0,
  "Com muitas pessoas nascendo e menos morrendo, o crescimento vegetativo tende a aumentar."
);
addMoreEditalQuestion(
  "geo-09",
  "Geografia",
  "medio",
  "A formação de uma área urbana contínua entre municípios vizinhos é chamada de:",
  "Quando manchas urbanas de cidades vizinhas se unem fisicamente, ocorre:",
  ["conurbação", "intemperismo", "transumância", "assoreamento"],
  0,
  "Conurbação é a união física de áreas urbanizadas de municípios diferentes."
);
addMoreEditalQuestion(
  "geo-10",
  "Geografia",
  "medio",
  "A agricultura de monocultura voltada à exportação em grandes propriedades é historicamente associada ao modelo de:",
  "Qual termo descreve grandes propriedades com monocultura comercial voltada ao mercado externo?",
  ["plantation", "agricultura itinerante de subsistência", "horticultura urbana", "extrativismo mineral artesanal"],
  0,
  "Plantation é um modelo historicamente ligado a latifúndio, monocultura e produção para exportação."
);
addMoreEditalQuestion(
  "geo-11",
  "Geografia",
  "medio",
  "Uma vantagem das fontes solar e eólica em comparação aos combustíveis fósseis é:",
  "Qual característica diferencia fontes solar e eólica dos combustíveis fósseis?",
  ["são renováveis em escala humana", "não dependem de condições naturais", "não causam qualquer impacto ambiental", "produzem energia apenas durante a noite"],
  0,
  "Sol e vento são fluxos naturais renováveis, embora sua exploração também possa gerar impactos e dependa de condições ambientais."
);
addMoreEditalQuestion(
  "geo-12",
  "Geografia",
  "dificil",
  "Nas cadeias globais de produção, diferentes etapas de fabricação podem ocorrer em países distintos principalmente devido:",
  "Por que uma empresa pode distribuir pesquisa, fabricação de peças e montagem entre vários países?",
  ["à busca por vantagens locacionais, custos e acesso a mercados", "à proibição de comércio internacional", "à inexistência de redes de transporte", "ao fim da divisão internacional do trabalho"],
  0,
  "Empresas distribuem etapas produtivas conforme custos, infraestrutura, qualificação, logística, incentivos e mercados."
);
addMoreEditalQuestion(
  "geo-13",
  "Geografia",
  "medio",
  "A retirada da vegetação de encostas pode aumentar diretamente o risco de:",
  "Qual processo pode ser intensificado pela remoção da cobertura vegetal em terrenos inclinados?",
  ["erosão e movimentos de massa", "formação de geleiras", "redução da gravidade", "expansão de recifes de coral"],
  0,
  "A vegetação protege o solo e ajuda na estabilidade; sua remoção pode favorecer erosão e deslizamentos."
);
addMoreEditalQuestion(
  "geo-14",
  "Geografia",
  "medio",
  "A água de um rio e de seus afluentes escoa para uma mesma área de drenagem chamada de:",
  "Como se denomina a área drenada por um rio principal e seus afluentes?",
  ["bacia hidrográfica", "planície abissal", "dorsal oceânica", "ilha de calor"],
  0,
  "Bacia hidrográfica é a área cujas águas escoam para um mesmo rio principal e sua rede de afluentes."
);
addMoreEditalQuestion(
  "fil-03",
  "Filosofia",
  "medio",
  "O método socrático de diálogo buscava estimular o interlocutor a:",
  "Na filosofia de Sócrates, o uso de perguntas em sequência tinha como objetivo principal:",
  ["examinar criticamente suas próprias ideias", "memorizar respostas sem discussão", "aceitar a autoridade do orador sem questionar", "substituir argumentos por mitos"],
  0,
  "O diálogo socrático buscava revelar contradições e estimular o exame racional das próprias crenças."
);
addMoreEditalQuestion(
  "fil-04",
  "Filosofia",
  "medio",
  "Na filosofia de Platão, o mundo sensível é apresentado como:",
  "Como Platão distingue, de modo geral, o mundo sensível do inteligível?",
  ["um domínio mutável conhecido pelos sentidos", "a realidade perfeita e imutável das Formas", "um espaço sem qualquer relação com conhecimento", "a única fonte de verdade absoluta"],
  0,
  "Para Platão, o mundo sensível é mutável e imperfeito, enquanto o inteligível reúne as Formas."
);
addMoreEditalQuestion(
  "fil-05",
  "Filosofia",
  "medio",
  "Para Aristóteles, a virtude moral está frequentemente associada:",
  "Qual ideia resume a doutrina aristotélica do meio-termo?",
  ["ao equilíbrio entre excessos e faltas, orientado pela razão", "à rejeição de toda prática social", "à busca do prazer imediato como único bem", "à obediência cega a qualquer costume"],
  0,
  "A virtude, em Aristóteles, envolve encontrar o meio adequado entre extremos, conforme a razão e a situação."
);
addMoreEditalQuestion(
  "fil-06",
  "Filosofia",
  "medio",
  "A dúvida metódica de Descartes tinha como finalidade:",
  "Por que Descartes propõe duvidar sistematicamente de crenças e conhecimentos recebidos?",
  ["buscar uma base segura para o conhecimento", "provar que todo conhecimento é impossível", "substituir a razão apenas pela tradição", "eliminar a matemática da filosofia"],
  0,
  "Descartes usa a dúvida como método para encontrar uma certeza que sirva de fundamento ao conhecimento."
);
addMoreEditalQuestion(
  "fil-07",
  "Filosofia",
  "medio",
  "Para o empirismo de David Hume, o conhecimento humano depende fortemente:",
  "Qual fonte de conhecimento é central na filosofia empirista de Hume?",
  ["da experiência e das percepções", "de ideias inatas completas e independentes da experiência", "da revelação política do Estado", "de cálculos sem qualquer contato com a experiência"],
  0,
  "Hume enfatiza impressões e experiências como base das ideias e do conhecimento."
);
addMoreEditalQuestion(
  "fil-08",
  "Filosofia",
  "dificil",
  "Na ética de Kant, agir moralmente envolve principalmente:",
  "Segundo Kant, qual característica torna uma ação moralmente orientada pelo dever?",
  ["agir segundo princípios que possam valer universalmente", "buscar apenas vantagens pessoais imediatas", "obedecer a desejos independentemente da razão", "avaliar somente o resultado financeiro"],
  0,
  "A ética kantiana enfatiza o dever e máximas que possam ser universalizadas racionalmente."
);
addMoreEditalQuestion(
  "fil-09",
  "Filosofia",
  "medio",
  "Em Hobbes, o contrato social é justificado principalmente pela necessidade de:",
  "Qual problema o Estado soberano procura resolver na teoria política de Hobbes?",
  ["evitar a insegurança e o conflito generalizado do estado de natureza", "eliminar toda forma de lei", "garantir que ninguém tenha obrigações", "abolir qualquer autoridade comum"],
  0,
  "Hobbes concebe o pacto como forma de superar a insegurança do estado de natureza por meio de uma autoridade comum."
);
addMoreEditalQuestion(
  "fil-10",
  "Filosofia",
  "medio",
  "Na teoria política de Rousseau, a “vontade geral” está relacionada:",
  "O conceito rousseauniano de vontade geral procura expressar:",
  ["o interesse comum dos cidadãos enquanto corpo político", "a soma automática de todos os desejos individuais", "a vontade particular do governante", "a decisão exclusiva dos grupos economicamente mais fortes"],
  0,
  "A vontade geral se refere ao interesse comum do corpo político, e não simplesmente à soma de interesses particulares."
);
addMoreEditalQuestion(
  "soc-04",
  "Sociologia",
  "medio",
  "Para Émile Durkheim, fatos sociais são maneiras de agir, pensar e sentir que:",
  "Qual característica define um fato social em Durkheim?",
  ["exercem coerção e existem para além do indivíduo", "dependem apenas de escolhas privadas sem influência coletiva", "não possuem qualquer exterioridade", "existem somente em sociedades industriais"],
  0,
  "Durkheim destaca exterioridade, generalidade e poder coercitivo dos fatos sociais."
);
addMoreEditalQuestion(
  "soc-05",
  "Sociologia",
  "medio",
  "Para Max Weber, uma ação é social quando:",
  "Quando uma ação pode ser considerada “ação social” na sociologia de Weber?",
  ["o agente atribui sentido a ela considerando a conduta de outros", "ocorre sem qualquer significado para quem age", "é determinada exclusivamente por fatores biológicos", "não se relaciona de modo algum com outras pessoas"],
  0,
  "Ação social é aquela orientada por um sentido atribuído pelo agente e relacionada à conduta de outros."
);
addMoreEditalQuestion(
  "soc-06",
  "Sociologia",
  "medio",
  "Na análise de Karl Marx, o conflito entre classes sociais está relacionado principalmente:",
  "Qual elemento é central para a compreensão marxista das classes sociais?",
  ["às posições distintas nas relações de produção", "apenas às preferências individuais de consumo", "somente às diferenças de idade", "à ausência de interesses econômicos"],
  0,
  "Marx analisa as classes a partir de suas posições nas relações de produção e dos conflitos decorrentes delas."
);
addMoreEditalQuestion(
  "soc-07",
  "Sociologia",
  "dificil",
  "O conceito de capital cultural, associado a Pierre Bourdieu, ajuda a explicar:",
  "Como o conceito de capital cultural pode ser usado para analisar desigualdades educacionais?",
  ["vantagens ligadas a conhecimentos, hábitos e repertórios socialmente valorizados", "diferenças apenas de força física", "a inexistência de desigualdade entre estudantes", "o valor monetário exato de uma escola"],
  0,
  "Capital cultural envolve disposições, conhecimentos e credenciais que podem ser valorizados por instituições e reproduzir desigualdades."
);
addMoreEditalQuestion(
  "soc-08",
  "Sociologia",
  "facil",
  "O processo pelo qual indivíduos aprendem normas, valores e práticas de uma sociedade é chamado de:",
  "Como se denomina a aprendizagem social de valores, regras e formas de comportamento?",
  ["socialização", "industrialização", "secularização", "urbanização"],
  0,
  "Socialização é o processo de aprendizagem e incorporação de padrões culturais e sociais."
);
addMoreEditalQuestion(
  "soc-09",
  "Sociologia",
  "medio",
  "Julgar outra cultura exclusivamente pelos valores da própria cultura é uma atitude denominada:",
  "Qual conceito descreve a avaliação de outras culturas usando a própria como padrão superior?",
  ["etnocentrismo", "relativismo cultural", "mobilidade social", "anomia"],
  0,
  "Etnocentrismo é tomar a própria cultura como referência central para julgar outras."
);
addMoreEditalQuestion(
  "soc-10",
  "Sociologia",
  "medio",
  "Movimentos sociais atuam, em geral, por meio de ações coletivas que buscam:",
  "Qual característica é comum a muitos movimentos sociais?",
  ["defender demandas, direitos ou mudanças sociais", "eliminar toda participação pública", "impedir qualquer organização coletiva", "substituir todas as instituições por empresas"],
  0,
  "Movimentos sociais mobilizam pessoas em torno de reivindicações, identidades, direitos ou transformações sociais."
);
addMoreEditalQuestion(
  "soc-11",
  "Sociologia",
  "medio",
  "Estratificação social refere-se:",
  "O que a sociologia estuda ao tratar de estratificação social?",
  ["à organização desigual de grupos em posições sociais distintas", "à divisão das células durante a mitose", "ao movimento das placas tectônicas", "à classificação de palavras por sílabas"],
  0,
  "Estratificação social diz respeito à distribuição desigual de recursos, prestígio, poder e oportunidades entre grupos."
);
addMoreEditalQuestion(
  "ing-03",
  "Inglês",
  "facil",
  "Na frase “She is actually very calm”, a palavra “actually” significa:",
  "Qual é o sentido de “actually” em inglês na frase “She is actually very calm”?",
  ["na verdade", "atualmente", "raramente", "amanhã"],
  0,
  "“Actually” significa “na verdade” ou “de fato”; “atualmente” costuma ser “currently”."
);
addMoreEditalQuestion(
  "ing-04",
  "Inglês",
  "medio",
  "Na frase “You must wear a seat belt”, o modal “must” expressa principalmente:",
  "Qual sentido o verbo modal “must” transmite em “You must wear a seat belt”?",
  ["obrigação", "possibilidade remota", "habilidade no passado", "comparação"],
  0,
  "“Must” pode expressar forte obrigação ou necessidade."
);
addMoreEditalQuestion(
  "ing-05",
  "Inglês",
  "medio",
  "Em “I have lived here for five years”, o present perfect indica uma situação que:",
  "Qual interpretação é adequada para “I have lived here for five years”?",
  ["começou no passado e continua relacionada ao presente", "ocorreu apenas em um instante futuro", "aconteceu antes de outra ação no passado sem relação com o presente", "é uma ordem direta"],
  0,
  "O present perfect pode indicar uma situação iniciada no passado e que continua até o presente."
);
addMoreEditalQuestion(
  "ing-06",
  "Inglês",
  "medio",
  "A forma passiva correta de “They built the bridge in 2010” é:",
  "Transforme “They built the bridge in 2010” para a voz passiva.",
  ["The bridge was built in 2010.", "The bridge is build in 2010.", "The bridge built them in 2010.", "They were bridge in 2010."],
  0,
  "No passado simples passivo, usa-se was/were + particípio: “The bridge was built”."
);
addMoreEditalQuestion(
  "ing-07",
  "Inglês",
  "facil",
  "Em “The woman who called me is my teacher”, “who” retoma:",
  "Qual é o antecedente do pronome relativo “who” em “The woman who called me is my teacher”?",
  ["the woman", "my teacher apenas depois do verbo", "called", "me"],
  0,
  "“Who” retoma “the woman” e introduz uma oração relativa."
);
addMoreEditalQuestion(
  "ing-08",
  "Inglês",
  "medio",
  "Em um texto, o conector “however” normalmente introduz ideia de:",
  "Qual relação discursiva é frequentemente marcada por “however”?",
  ["contraste", "causa obrigatória", "adição sem contraste", "sequência cronológica"],
  0,
  "“However” é usado com frequência para introduzir contraste, equivalente a “porém/contudo”."
);
addMoreEditalQuestion(
  "ing-09",
  "Inglês",
  "facil",
  "Complete: “This test is ___ than the previous one.”",
  "Qual forma completa corretamente a comparação em “This test is ___ than the previous one”?",
  ["easier", "easy", "easiest", "more easyly"],
  0,
  "O comparativo de “easy” é “easier”."
);
addMoreEditalQuestion(
  "ing-10",
  "Inglês",
  "medio",
  "Na frase “If it rains, we will stay home”, a estrutura expressa:",
  "Que tipo de condição é apresentada por “If it rains, we will stay home”?",
  ["uma possibilidade futura real ou provável", "uma situação impossível no passado", "um hábito necessariamente permanente", "uma ordem sem condição"],
  0,
  "A primeira condicional é usada para situações futuras possíveis ou prováveis: if + present, will + verbo."
);
addMoreEditalQuestion(
  "lit-03",
  "Literatura",
  "medio",
  "No Romantismo brasileiro, uma característica frequente da primeira geração foi:",
  "Qual traço esteve presente em parte importante da primeira geração romântica brasileira?",
  ["nacionalismo e idealização da natureza e do indígena", "objetividade científica e determinismo biológico", "culto exclusivo à forma parnasiana", "rejeição de temas nacionais"],
  0,
  "A primeira geração romântica brasileira valorizou identidade nacional, natureza e idealização do indígena."
);
addMoreEditalQuestion(
  "lit-04",
  "Literatura",
  "medio",
  "O Realismo brasileiro, associado a Machado de Assis, caracterizou-se por:",
  "Qual característica combina com a prosa realista de Machado de Assis?",
  ["análise crítica das relações sociais e psicológicas", "idealização absoluta dos heróis românticos", "exaltação medieval de cavaleiros", "recusa de ironia e ambiguidade"],
  0,
  "A prosa machadiana frequentemente analisa interesses, contradições sociais e aspectos psicológicos com ironia."
);
addMoreEditalQuestion(
  "lit-05",
  "Literatura",
  "medio",
  "O Naturalismo do século XIX foi influenciado por ideias de:",
  "Qual traço distingue o Naturalismo em relação ao Romantismo?",
  ["determinismo e observação de condicionamentos sociais e biológicos", "idealização amorosa e subjetivismo como regra", "retorno exclusivo a modelos medievais", "abandono de personagens coletivos"],
  0,
  "O Naturalismo incorporou ideias deterministas e procurou observar influências do meio e da hereditariedade."
);
addMoreEditalQuestion(
  "lit-06",
  "Literatura",
  "facil",
  "A Semana de Arte Moderna de 1922 ocorreu em:",
  "Em qual cidade brasileira foi realizada a Semana de Arte Moderna de 1922?",
  ["São Paulo", "Salvador", "Recife", "Belo Horizonte"],
  0,
  "A Semana de Arte Moderna ocorreu no Theatro Municipal de São Paulo, em fevereiro de 1922."
);
addMoreEditalQuestion(
  "lit-07",
  "Literatura",
  "medio",
  "O Barroco é conhecido pelo uso frequente de contrastes como corpo e alma, pecado e perdão. Esse recurso é associado a:",
  "Qual característica estilística é típica do Barroco?",
  ["antíteses e conflitos de ideias", "linguagem exclusivamente objetiva e científica", "recusa de figuras de linguagem", "simplicidade coloquial obrigatória"],
  0,
  "O Barroco explora contrastes, tensões e figuras como antítese e paradoxo."
);
addMoreEditalQuestion(
  "lit-08",
  "Literatura",
  "medio",
  "O Arcadismo valorizou, entre outros princípios:",
  "Qual ideal aparece com frequência na poesia árcade?",
  ["vida simples e aproximação idealizada da natureza", "industrialização urbana como tema exclusivo", "excesso ornamental barroco como regra", "ruptura completa com modelos clássicos"],
  0,
  "O Arcadismo recuperou referências clássicas e valorizou simplicidade e vida pastoril idealizada."
);
addMoreEditalQuestion(
  "lit-09",
  "Literatura",
  "medio",
  "O Parnasianismo brasileiro enfatizou especialmente:",
  "Qual característica é associada ao Parnasianismo?",
  ["rigor formal e trabalho cuidadoso da linguagem poética", "espontaneidade automática sem revisão", "predomínio de manifestos políticos em prosa", "abandono de métrica e forma em todos os poemas"],
  0,
  "O Parnasianismo valorizou elaboração formal, descrição e cuidado com a forma poética."
);
addMoreEditalQuestion(
  "lit-10",
  "Literatura",
  "medio",
  "Na narrativa, um narrador-personagem é aquele que:",
  "O que caracteriza um narrador-personagem?",
  ["participa dos acontecimentos que narra", "conhece necessariamente o pensamento de todos os personagens", "não faz parte da história e sempre narra em terceira pessoa", "aparece apenas em textos dramáticos"],
  0,
  "O narrador-personagem integra a história e relata os acontecimentos a partir de sua participação e perspectiva."
);
addMoreEditalQuestion(
  "red-05",
  "Redação",
  "medio",
  "Em uma redação dissertativo-argumentativa, a introdução deve apresentar com clareza:",
  "Qual elemento é essencial na introdução de um texto dissertativo-argumentativo?",
  ["o tema e o posicionamento central que será desenvolvido", "todos os exemplos e dados possíveis de uma só vez", "apenas uma pergunta sem encaminhamento", "uma lista de referências sem relação com o tema"],
  0,
  "A introdução deve situar o tema e encaminhar a tese ou posição que será desenvolvida."
);
addMoreEditalQuestion(
  "red-06",
  "Redação",
  "medio",
  "Um argumento fortalece a tese quando:",
  "O que torna um argumento pertinente em relação à tese de uma redação?",
  ["apresenta razões ou evidências diretamente relacionadas ao ponto defendido", "repete o tema sem desenvolver nenhuma ideia", "introduz assunto totalmente diferente", "contradiz a tese sem qualquer explicação"],
  0,
  "Argumentos eficazes sustentam a tese com razões, dados, exemplos ou relações explicativas pertinentes."
);
addMoreEditalQuestion(
  "red-07",
  "Redação",
  "medio",
  "O uso de conectivos como “além disso”, “porém” e “portanto” contribui principalmente para:",
  "Qual aspecto textual é favorecido por conectivos que articulam adição, contraste e conclusão?",
  ["coesão e organização lógica das ideias", "substituição completa dos argumentos", "eliminação da necessidade de parágrafos", "uso obrigatório de linguagem informal"],
  0,
  "Conectivos ajudam a explicitar relações entre ideias e contribuem para a coesão textual."
);
addMoreEditalQuestion(
  "red-08",
  "Redação",
  "dificil",
  "Ao apresentar um contra-argumento, o autor pode fortalecer sua tese quando:",
  "Como o contra-argumento pode ser usado estrategicamente em uma redação?",
  ["reconhece uma posição contrária e responde a ela de modo fundamentado", "abandona completamente a tese inicial", "troca o tema por outro sem relação", "evita qualquer justificativa"],
  0,
  "Antecipar uma objeção e respondê-la pode demonstrar domínio do debate e fortalecer a argumentação."
);
addMoreEditalQuestion(
  "red-09",
  "Redação",
  "medio",
  "A unidade de um parágrafo é preservada quando suas frases:",
  "O que contribui para a unidade temática de um parágrafo argumentativo?",
  ["desenvolvem uma ideia central relacionada ao propósito do texto", "tratam de vários assuntos sem conexão", "repetem exatamente a mesma frase", "eliminam todos os conectivos"],
  0,
  "Um bom parágrafo desenvolve uma ideia central com frases relacionadas entre si e ao projeto argumentativo."
);
addMoreEditalQuestion(
  "red-10",
  "Redação",
  "medio",
  "Na conclusão de uma redação argumentativa, é adequado:",
  "Qual função pode ser desempenhada pela conclusão em um texto dissertativo-argumentativo?",
  ["retomar a discussão e fechar o raciocínio de modo coerente", "introduzir um novo tema sem relação com o texto", "copiar integralmente a introdução", "apagar a tese defendida"],
  0,
  "A conclusão deve encerrar o percurso argumentativo, retomando ou desdobrando a tese com coerência."
);
addMoreEditalQuestion(
  "red-11",
  "Redação",
  "dificil",
  "No ENEM, uma proposta de intervenção adequada deve respeitar:",
  "Entre os critérios de uma proposta de intervenção no ENEM, qual é indispensável?",
  ["os direitos humanos", "a defesa de violência contra grupos sociais", "a ausência completa de agente ou ação", "a substituição do tema por assunto diferente"],
  0,
  "A proposta de intervenção deve ser relacionada ao problema discutido e respeitar os direitos humanos."
);
addMoreEditalQuestion(
  "red-12",
  "Redação",
  "medio",
  "Copiar longos trechos dos textos motivadores sem elaboração própria tende a prejudicar a redação porque:",
  "Por que a simples reprodução de trechos dos textos de apoio não substitui a argumentação autoral?",
  ["não demonstra desenvolvimento próprio das ideias", "garante automaticamente maior nota", "elimina a necessidade de tese", "transforma qualquer texto em narrativa"],
  0,
  "Os textos motivadores servem de apoio; a redação precisa desenvolver uma argumentação própria e pertinente."
);

QUESTION_BANK.push(...MORE_EDITAL_QUESTIONS);
