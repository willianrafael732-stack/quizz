'use strict';

const MIND_MAPS = {
  'Português': {
    center:'Português para Concursos',
    branches:[
      ['Gramática',['Concordância','Regência','Crase','Colocação pronominal']],
      ['Sintaxe',['Sujeito e predicado','Termos da oração','Orações subordinadas','Vozes verbais']],
      ['Texto',['Coesão','Coerência','Inferência','Conectivos']],
      ['Pontuação',['Vírgula','Dois-pontos','Travessão','Pontuação e sentido']]
    ]
  },
  'Matemática': {
    center:'Matemática para Concursos',
    branches:[
      ['Aritmética',['Razão e proporção','Porcentagem','Regra de três','Frações']],
      ['Álgebra',['Equações','Sistemas','Produtos notáveis','Funções']],
      ['Financeira',['Juros simples','Juros compostos','Descontos','Taxas']],
      ['Dados',['Média','Probabilidade','Leitura de gráficos','Estatística básica']]
    ]
  },
  'Raciocínio Lógico': {
    center:'Raciocínio Lógico',
    branches:[
      ['Proposições',['Conectivos','Tabela-verdade','Negação','Equivalência']],
      ['Argumentação',['Premissas','Conclusão','Validade','Silogismos']],
      ['Conjuntos',['Inclusão','Interseção','União','Diagramas']],
      ['Sequências',['Padrões numéricos','Recorrência','Contagem','Problemas lógicos']]
    ]
  },
  'Informática': {
    center:'Informática para Concursos',
    branches:[
      ['Segurança',['Phishing','Malware','Backup','Autenticação']],
      ['Redes',['TCP/IP','DNS','HTTP/HTTPS','Endereçamento']],
      ['Sistemas',['Windows','Arquivos','Atalhos','Permissões']],
      ['Produtividade',['Planilhas','Editor de texto','Nuvem','Banco de dados']]
    ]
  },
  'Direito Constitucional': {
    center:'Direito Constitucional',
    branches:[
      ['Fundamentos',['Princípios fundamentais','Estado Democrático de Direito','Separação dos Poderes','Federação']],
      ['Direitos',['Direitos e garantias','Remédios constitucionais','Direitos sociais','Nacionalidade']],
      ['Administração',['Art. 37','Concurso público','Princípios expressos','Agentes públicos']],
      ['Organização',['União','Estados','Municípios','Poderes']]
    ]
  },
  'Direito Administrativo': {
    center:'Direito Administrativo',
    branches:[
      ['Atos',['Elementos','Atributos','Anulação','Revogação']],
      ['Poderes',['Hierárquico','Disciplinar','Regulamentar','Polícia']],
      ['Estrutura',['Centralização','Descentralização','Concentração','Desconcentração']],
      ['Controle',['Autotutela','Responsabilidade estatal','Serviços públicos','Motivação']]
    ]
  },
  'Administração Pública': {
    center:'Administração Pública',
    branches:[
      ['Planejamento',['Missão','Visão','Objetivos','Indicadores']],
      ['Gestão',['Processos','Projetos','PDCA','Riscos']],
      ['Resultados',['Eficiência','Eficácia','Efetividade','Valor público']],
      ['Governança',['Direcionamento','Monitoramento','Transparência','Prestação de contas']]
    ]
  },
  'Ética no Serviço Público': {
    center:'Ética no Serviço Público',
    branches:[
      ['Decreto 1.171/94',['Regras deontológicas','Deveres fundamentais','Vedações','Censura ética']],
      ['Decreto 6.029/07',['Sistema de Gestão','CEP e comissões','Rede de Ética','Apuração ética']],
      ['Garantias',['Contraditório','Ampla defesa','Reserva dos autos','Proteção à imagem']],
      ['No INSS',['Atendimento digno','Impessoalidade','Transparência','Interesse público']]
    ]
  }
};

function normalizeMapSubject(subject){
  if(MIND_MAPS[subject]) return subject;
  if(['História','Geografia','Filosofia','Sociologia'].includes(subject)) return 'Administração Pública';
  if(['Biologia','Física','Química'].includes(subject)) return 'Matemática';
  return 'Português';
}

function ensureMindMapDialog(){
  let dialog=document.querySelector('#mindMapDialog');
  if(dialog) return dialog;
  dialog=document.createElement('dialog');
  dialog.id='mindMapDialog';
  dialog.className='mind-map-dialog';
  document.body.append(dialog);
  return dialog;
}

function openMindMap(questionOrSubject){
  const subject=typeof questionOrSubject==='string' ? questionOrSubject : (questionOrSubject?.subject || 'Português');
  const key=normalizeMapSubject(subject);
  const map=MIND_MAPS[key];
  const dialog=ensureMindMapDialog();
  dialog.innerHTML=`
    <section class="mind-map-shell">
      <header class="mind-map-head">
        <div><span class="mind-map-kicker">RECAPITULAÇÃO SEM GABARITO</span><h2>Mapa mental · ${escapeStudy(map.center)}</h2><p>Use para revisar conceitos antes de responder. O mapa não mostra a alternativa correta da questão.</p></div>
        <button type="button" class="mind-map-close" aria-label="Fechar mapa mental">✕</button>
      </header>
      <div class="mind-map-canvas">
        <div class="mind-map-center">${escapeStudy(map.center)}</div>
        <div class="mind-map-branches">${map.branches.map(([title,items])=>`<article class="mind-map-branch"><strong>${escapeStudy(title)}</strong>${items.map(i=>`<span>${escapeStudy(i)}</span>`).join('')}</article>`).join('')}</div>
      </div>
      <footer class="mind-map-foot">Dica: tente explicar cada ramo com suas próprias palavras antes de voltar à questão.</footer>
    </section>`;
  dialog.querySelector('.mind-map-close').onclick=()=>dialog.close();
  dialog.addEventListener('click',ev=>{if(ev.target===dialog)dialog.close();},{once:true});
  dialog.showModal();
}

function escapeStudy(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

function pdfSafeText(value){
  return String(value??'').replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/\u2013|\u2014/g,'-').replace(/\u2022/g,'-');
}
function wrapPdfText(text,max=88){
  const words=pdfSafeText(text).split(/\s+/);const out=[];let line='';
  for(const w of words){const next=line?line+' '+w:w;if(next.length>max&&line){out.push(line);line=w;}else line=next;}
  if(line)out.push(line);return out;
}
function cp1252Bytes(str){
  const map={'€':128,'‚':130,'ƒ':131,'„':132,'…':133,'†':134,'‡':135,'ˆ':136,'‰':137,'Š':138,'‹':139,'Œ':140,'Ž':142,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151,'˜':152,'™':153,'š':154,'›':155,'œ':156,'ž':158,'Ÿ':159};
  const bytes=[];for(const ch of str){const code=ch.charCodeAt(0);if(code<=255)bytes.push(code);else if(map[ch]!=null)bytes.push(map[ch]);else bytes.push(63);}return new Uint8Array(bytes);
}
function pdfEscape(str){return pdfSafeText(str).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');}

function buildSimplePdf(lines,title='Resultado do Simulado'){
  const pages=[];for(let i=0;i<lines.length;i+=43)pages.push(lines.slice(i,i+43));
  const objects=[];const add=o=>{objects.push(o);return objects.length;};
  const catalog=add('');const pagesObj=add('');const font=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const pageIds=[];
  for(const pageLines of pages){
    let stream=`BT\n/F1 11 Tf\n50 800 Td\n14 TL\n`;
    pageLines.forEach((line,idx)=>{if(idx)stream+='T*\n';stream+=`(${pdfEscape(line)}) Tj\n`;});
    stream+='ET';
    const streamBytes=cp1252Bytes(stream);
    const content=add({prefix:`<< /Length ${streamBytes.length} >>\nstream\n`,bytes:streamBytes,suffix:'\nendstream'});
    const page=add(`<< /Type /Page /Parent ${pagesObj} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${content} 0 R >>`);
    pageIds.push(page);
  }
  objects[catalog-1]=`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`;
  objects[pagesObj-1]=`<< /Type /Pages /Kids [${pageIds.map(id=>`${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;
  const chunks=[cp1252Bytes('%PDF-1.4\n%DA\n')];let offset=chunks[0].length;const offsets=[0];
  objects.forEach((obj,i)=>{offsets.push(offset);const head=cp1252Bytes(`${i+1} 0 obj\n`),tail=cp1252Bytes('\nendobj\n');chunks.push(head);offset+=head.length;if(typeof obj==='string'){const b=cp1252Bytes(obj);chunks.push(b);offset+=b.length;}else{const p=cp1252Bytes(obj.prefix),s=cp1252Bytes(obj.suffix);chunks.push(p,obj.bytes,s);offset+=p.length+obj.bytes.length+s.length;}chunks.push(tail);offset+=tail.length;});
  const xrefOffset=offset;let xref=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;for(let i=1;i<=objects.length;i++)xref+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';xref+=`trailer\n<< /Size ${objects.length+1} /Root ${catalog} 0 R /Info << /Title (${pdfEscape(title)}) >> >>\nstartxref\n${xrefOffset}\n%%EOF`;
  chunks.push(cp1252Bytes(xref));return new Blob(chunks,{type:'application/pdf'});
}

function downloadExamPdf(exam){
  if(!exam||!exam.done) return;
  const n=exam.questions.length;const correct=exam.questions.filter((q,i)=>exam.answers[i]===q.answer).length;const blank=exam.answers.filter(a=>a===null).length;const minutes=Math.max(1,Math.ceil((exam.finished-exam.started)/60000));
  const lines=['DESAFIO APROVACAO - RESULTADO DO SIMULADO','',`Desempenho: ${Math.round(correct/n*100)}%`,`Acertos: ${correct} | Erros: ${n-correct-blank} | Em branco: ${blank}`,`Tempo: ${minutes} min`,'','GABARITO COMENTADO',''];
  exam.questions.forEach((q,i)=>{const a=exam.answers[i];const label=a===null?'Em branco':a===q.answer?'Correta':'Incorreta';const optionText=idx=>idx==null||idx<0?'Em branco':q.options[idx]||'Em branco';lines.push(...wrapPdfText(`${i+1}. ${q.subject} - ${label}`),...wrapPdfText(q.q),...wrapPdfText(`Sua resposta: ${optionText(a)}`),...wrapPdfText(`Gabarito: ${optionText(q.answer)}`),...wrapPdfText(`Comentario: ${q.explanation||''}`),'');});
  const blob=buildSimplePdf(lines);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`desafio-aprovacao-resultado-${new Date().toISOString().slice(0,10)}.pdf`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
