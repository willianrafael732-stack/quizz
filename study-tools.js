'use strict';
// Implementação de compatibilidade para o repositório GitHub.
// O arquivo original do pacote está preservado no ZIP de 10/10/2026.
const STUDY_TOPICS = {
  'Português': ['Gramática', 'Concordância', 'Regência', 'Crase', 'Interpretação de texto', 'Pontuação'],
  'Matemática': ['Aritmética', 'Frações', 'Porcentagem', 'Regra de três', 'Equações', 'Estatística'],
  'Raciocínio Lógico': ['Proposições', 'Conectivos', 'Negação', 'Conjuntos', 'Sequências'],
  'Informática': ['Segurança', 'Redes', 'Windows', 'Internet', 'Planilhas'],
  'Direito Constitucional': ['Princípios fundamentais', 'Direitos e garantias', 'Organização do Estado', 'Artigo 37'],
  'Direito Administrativo': ['Atos', 'Poderes', 'Serviços públicos', 'Controle da Administração'],
  'Administração Pública': ['Planejamento', 'Gestão', 'Governança', 'Indicadores'],
  'Ética no Serviço Público': ['Decreto 1.171/1994', 'Decreto 6.029/2007', 'Deveres', 'Vedações', 'Comissões de ética']
};
const MIND_MAPS = Object.fromEntries(Object.entries(STUDY_TOPICS).map(([name,topics])=>[name,{center:name,branches:[['O que revisar',topics]]}]));
function escapeStudy(value){
  return String(value==null?'':value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function openMindMap(questionOrSubject){
  const subject=typeof questionOrSubject==='string'?questionOrSubject:(questionOrSubject&&questionOrSubject.subject)||'Português';
  const map=MIND_MAPS[subject]||MIND_MAPS['Português'];
  let dialog=document.querySelector('#mindMapDialog');
  if(!dialog){dialog=document.createElement('dialog');dialog.id='mindMapDialog';dialog.className='mind-map-dialog';document.body.appendChild(dialog);}
  dialog.innerHTML=`<section class="mind-map-shell"><header class="mind-map-head"><div><span class="mind-map-kicker">REVISÃO SEM GABARITO</span><h2>Mapa mental · ${escapeStudy(map.center)}</h2><p>Relembre os conceitos antes de responder.</p></div><button class="mind-map-close" type="button">Fechar</button></header><div class="mind-map-canvas"><div class="mind-map-center">${escapeStudy(map.center)}</div><div class="mind-map-branches">${map.branches.map(([title,topics])=>`<article class="mind-map-branch"><strong>${escapeStudy(title)}</strong>${topics.map(t=>`<span>${escapeStudy(t)}</span>`).join('')}</article>`).join('')}</div></div></section>`;
  dialog.querySelector('.mind-map-close').onclick=()=>dialog.close();
  dialog.onclick=e=>{if(e.target===dialog)dialog.close();};
  if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
}
function downloadExamPdf(exam){
  if(!exam||!exam.done)return;
  const pop=window.open('','_blank');
  if(!pop){alert('Permita a janela de impressão para salvar o resultado em PDF.');return;}
  const count=exam.questions.length;
  const correct=exam.questions.filter((q,i)=>exam.answers[i]===q.answer).length;
  const safe=escapeStudy;
  const text=exam.questions.map((q,i)=>{
    const chosen=exam.answers[i];
    const answer=chosen==null?'Em branco':q.options[chosen]||'Em branco';
    return `<article><h3>${i+1}. ${safe(q.subject||'Questão')}</h3><p>${safe(q.q||'')}</p><p><b>Sua resposta:</b> ${safe(answer)}</p><p><b>Gabarito:</b> ${safe(q.options[q.answer]||'')}</p><p><b>Comentário:</b> ${safe(q.explanation||'')}</p></article>`;
  }).join('');
  pop.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Resultado do Simulado</title><style>body{font:15px Arial,sans-serif;color:#222;margin:32px;line-height:1.5}article{padding:12px 0;border-bottom:1px solid #ddd;break-inside:avoid}h1{font-size:22px}h3{font-size:16px}button{margin:12px 0;padding:8px 14px}@media print{button{display:none}}</style></head><body><h1>Desafio Aprovação — Resultado do Simulado</h1><p>Acertos: ${correct} de ${count} · Aproveitamento: ${count?Math.round(100*correct/count):0}%</p><button onclick="print()">Imprimir ou salvar em PDF</button>${text}</body></html>`);
  pop.document.close();
  pop.focus();
}
