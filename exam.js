'use strict';
let activeExam=null;
const examDialog=document.createElement('dialog');
examDialog.id='examDialog';
examDialog.setAttribute('aria-labelledby','examHeading');
document.body.append(examDialog);
const examEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function examShuffle(items){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function startExam(){
  if(activeExam&&!activeExam.done){examDialog.showModal();return;}
  state.subject=document.querySelector('#subjectSelect').value;
  state.source=document.querySelector('#sourceSelect').value;
  const seen=new Set();
  const bank=filteredBank().filter(q=>{const key=q.q.trim();if(seen.has(key)||!Array.isArray(q.options)||!Number.isInteger(q.answer)||!q.options[q.answer])return false;seen.add(key);return true;});
  if(!bank.length){toast('Não há questões para esses filtros. Escolha outra matéria ou fonte.');return;}
  const amount=Number(document.querySelector('#questionAmount').value)||10;
  const questions=examShuffle(bank).slice(0,amount).map(q=>({...q,display:examShuffle(q.options.map((text,index)=>({text,index})))}));
  clearInterval(state.timer);
  activeExam={questions,answers:Array(questions.length).fill(null),flags:new Set(),index:0,started:Date.now(),done:false,requested:amount};
  examDialog.showModal();renderExam();
}
function renderExam(){
  const e=activeExam;if(!e)return;
  const count=e.answers.filter(x=>x!==null).length;
  examDialog.innerHTML=`<header class="exam-top"><div><h1 id="examHeading">Desafio Aprovação · Simulado</h1><p>${e.done?'Prova finalizada':'Gabarito disponível após a entrega'}</p></div><button class="exam-close" id="examClose">${e.done?'Voltar ao início':'Pausar e voltar'}</button></header><div class="exam-layout"><main class="exam-paper" id="examPaper"></main><aside class="exam-aside" aria-label="Cartão de respostas"><strong>Cartão de respostas</strong><p id="examProgress">${count} de ${e.questions.length} respondidas</p><div class="exam-nav">${e.questions.map((q,i)=>`<button data-question="${i}" class="${e.answers[i]!==null?'answered':''} ${e.flags.has(i)?'flagged':''}" aria-label="Questão ${i+1}, ${e.answers[i]===null?'em branco':'respondida'}${e.flags.has(i)?', marcada para revisão':''}" aria-current="${i===e.index}">${i+1}</button>`).join('')}</div><p class="exam-meta">Roxo: respondida<br>• Marcada para revisar</p>${e.requested>e.questions.length?`<p class="exam-meta">Encontramos ${e.questions.length} questões diferentes para os filtros escolhidos.</p>`:''}${e.done?'':'<button class="exam-primary" id="examFinish">Revisar e entregar</button>'}</aside></div>`;
  document.querySelector('#examClose').onclick=()=>examDialog.close();
  examDialog.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{e.index=Number(b.dataset.question);if(e.done){document.querySelector('#review-'+e.index)?.scrollIntoView({behavior:'smooth'});document.querySelector('#review-'+e.index).open=true;}else renderExam();});
  if(e.done){renderExamResults();return;}
  const q=e.questions[e.index];
  document.querySelector('#examPaper').innerHTML=`<div class="exam-meta">QUESTÃO ${String(e.index+1).padStart(2,'0')} / ${e.questions.length} · ${examEscape(q.subject)}</div><h2 tabindex="-1" id="examQuestion">${examEscape(q.q)}</h2><fieldset><legend>Assinale uma alternativa.</legend>${q.display.map((o,i)=>`<label class="exam-option"><input type="radio" name="examAnswer" value="${o.index}" ${e.answers[e.index]===o.index?'checked':''}><span><strong>${String.fromCharCode(65+i)})</strong> ${examEscape(o.text)}</span></label>`).join('')}</fieldset><div class="exam-actions"><button id="examClear">Limpar resposta</button><button id="examFlag" aria-pressed="${e.flags.has(e.index)}">${e.flags.has(e.index)?'Desmarcar revisão':'Marcar para revisar'}</button></div><div class="exam-actions"><button id="examPrevious" ${e.index===0?'disabled':''}>Anterior</button><button class="exam-primary" id="examNext">${e.index===e.questions.length-1?'Revisar e entregar':'Próxima questão'}</button></div><section class="exam-alert" id="examConfirm" hidden aria-live="polite"></section>`;
  examDialog.querySelectorAll('[name=examAnswer]').forEach(input=>input.onchange=()=>{e.answers[e.index]=Number(input.value);const nav=examDialog.querySelector(`[data-question="${e.index}"]`);nav.classList.add('answered');nav.setAttribute('aria-label',`Questão ${e.index+1}, respondida`);document.querySelector('#examProgress').textContent=`${e.answers.filter(x=>x!==null).length} de ${e.questions.length} respondidas`;document.querySelector('#examConfirm').hidden=true;});
  document.querySelector('#examClear').onclick=()=>{e.answers[e.index]=null;renderExam();};
  document.querySelector('#examFlag').onclick=()=>{e.flags.has(e.index)?e.flags.delete(e.index):e.flags.add(e.index);renderExam();};
  document.querySelector('#examPrevious').onclick=()=>{if(e.index>0){e.index--;renderExam();}};
  document.querySelector('#examNext').onclick=()=>{if(e.index<e.questions.length-1){e.index++;renderExam();}else confirmExam();};
  document.querySelector('#examFinish').onclick=confirmExam;
  document.querySelector('#examQuestion').focus({preventScroll:true});
}
function confirmExam(){
  const e=activeExam, blank=e.answers.filter(x=>x===null).length;
  const panel=document.querySelector('#examConfirm');panel.hidden=false;
  panel.innerHTML=`<strong>Entregar a prova?</strong><p>${blank?`${blank} questão(ões) em branco. `:'Todas as questões foram respondidas. '}${e.flags.size?`${e.flags.size} marcada(s) para revisão. `:''}Após entregar, não será possível alterar as respostas.</p><button class="exam-primary" id="examSubmit">Confirmar entrega</button>`;
  document.querySelector('#examSubmit').onclick=submitExam;
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function submitExam(){
  const e=activeExam;if(!e||e.done)return;e.done=true;e.finished=Date.now();
  const correct=e.questions.filter((q,i)=>e.answers[i]===q.answer).length;
  const previousCurrent=state.current,previousMode=state.mode;
  try{
    state.mode='Simulado de prova';
    e.questions.forEach((q,i)=>{state.current=q;recordAnswerHistory(e.answers[i],e.answers[i]===q.answer);});
    stats.played++;stats.daily+=e.answers.filter(a=>a!==null).length;stats.dailyDate=todayKey;stats.xp+=correct*10;saveStats();refreshHomeStats();
  }catch{e.storageFailed=true;}finally{state.current=previousCurrent;state.mode=previousMode;}
  renderExam();examDialog.scrollTop=0;
}
function renderExamResults(){
  const e=activeExam,n=e.questions.length,correct=e.questions.filter((q,i)=>e.answers[i]===q.answer).length,blank=e.answers.filter(a=>a===null).length;
  const minutes=Math.max(1,Math.ceil((e.finished-e.started)/60000));
  document.querySelector('#examPaper').innerHTML=`<div class="exam-meta">RESULTADO DO SIMULADO</div><h2>Confira seu desempenho</h2><div class="exam-result">${Math.round(correct/n*100)}%</div><p>${correct} acertos · ${n-correct-blank} erros · ${blank} em branco<br>Tempo decorrido: ${minutes} min (inclui pausas)</p><p class="exam-meta">${e.storageFailed?'Não foi possível salvar o histórico neste navegador.':'Respostas registradas no histórico deste navegador.'}</p><h2>Gabarito comentado</h2>${e.questions.map((q,i)=>{const a=e.answers[i];const label=a===null?'Em branco':a===q.answer?'Correta':'Incorreta';const choice=index=>{const p=q.display.findIndex(o=>o.index===index);return p<0?'Em branco':String.fromCharCode(65+p)+') '+q.options[index];};return `<details class="exam-review" id="review-${i}"><summary><span class="${a===q.answer?'exam-correct':'exam-wrong'}">${String(i+1).padStart(2,'0')} · ${label}</span> — ${examEscape(q.subject)}</summary><p>${examEscape(q.q)}</p><p><strong>Sua resposta:</strong> ${examEscape(choice(a))}</p><p><strong>Gabarito:</strong> ${examEscape(choice(q.answer))}</p><p>${examEscape(q.explanation||'')}</p></details>`;}).join('')}`;
}
document.querySelector('#examFormat').addEventListener('change',event=>{document.querySelector('#btnStart').textContent=event.target.checked?'Começar simulado':'Iniciar treino personalizado';});
