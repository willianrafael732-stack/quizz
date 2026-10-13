#!/usr/bin/env node
// Execute somente no computador/servidor, NUNCA no navegador.
// Node.js 18+; não depende de pacotes npm.
import fs from 'node:fs';
import vm from 'node:vm';

const url = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) || !key) {
  console.error('Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY nas variáveis do terminal.');
  process.exit(1);
}

const files = [
  'questions.js',
  'concurso-mega-bank.js',
  'real-questions.js',
  'extra-real-questions.js',
  'edital-questions.js',
  'more-edital-questions.js',
  'inss-etica-questions.js'
];

const context = vm.createContext({});
for (const file of files) {
  vm.runInContext(fs.readFileSync(new URL('../' + file, import.meta.url), 'utf8'), context, {
    filename: file,
    timeout: 10000
  });
}
const source = JSON.parse(vm.runInContext('JSON.stringify(QUESTION_BANK)', context));

async function upsert(table, rows, conflict) {
  if (!rows.length) return [];
  const endpoint = new URL(url + '/rest/v1/' + table);
  endpoint.searchParams.set('on_conflict', conflict);
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation'
    },
    body: JSON.stringify(rows)
  });
  if (!r.ok) {
    const info = (await r.text()).slice(0, 1000);
    throw new Error(table + ': HTTP ' + r.status + ': ' + info);
  }
  return await r.json();
}

function slug(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function examName(q) {
  if (q.exam) return String(q.exam);
  if (Array.isArray(q.institutions) && q.institutions.length === 1)
    return String(q.institutions[0]);
  return null;
}
const entries = new Map();
for (const q of source) {
  const name = examName(q);
  if (!name) continue;
  const year = Number(q.year || q.programYear) || null;
  const k = slug(name) + (year ? '-' + year : '');
  if (!entries.has(k)) {
    entries.set(k, {
      slug: k, name,
      exam_type: /enem|vestibular|fuvest|unicamp|unesp|ufpr|uel|uem|uece|ufu|fatec/i.test(name)
        ? 'vestibular' : 'concurso',
      edition_year: year
    });
  }
}

const exams = new Map();
for (let i = 0; i < entries.size; i += 100) {
  const batch = [...entries.values()].slice(i, i + 100);
  const results = await upsert('da_exams', batch, 'slug');
  for (const e of results) exams.set(e.slug, e.id);
}

const questions = [];
const ids = new Set();
let skipped = 0;
for (const q of source) {
  const sourceKey = 'quizz:' + String(q.id);
  if (ids.has(sourceKey)) {
    console.warn('ID duplicado ignorado:', sourceKey);
    skipped++; continue;
  }
  ids.add(sourceKey);
  if (!q.q || !Array.isArray(q.options) || q.options.length < 2 ||
      !Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
    console.warn('Questão inválida ignorada:', sourceKey);
    skipped++; continue;
  }
  const name = examName(q);
  const year = Number(q.year || q.programYear) || null;
  const examKey = name ? slug(name) + (year ? '-' + year : '') : null;
  questions.push({
    source_key: sourceKey,
    exam_id: examKey ? (exams.get(examKey) ?? null) : null,
    subject: q.subject || 'Geral',
    difficulty: ['facil','medio','dificil'].includes(q.difficulty) ? q.difficulty : 'medio',
    statement: q.q,
    options: q.options,
    answer_index: q.answer,
    explanation: q.explanation || null,
    variants: Array.isArray(q.variants) ? q.variants : [],
    // realExam marca REFERÊNCIA a prova, mas o texto foi adaptado;
    // não chamar de questão oficial literal.
    origin: q.realExam ? 'adaptada' : q.editalBased ? 'edital' : 'autoral',
    bank: q.bank || null,
    source_url: q.sourceUrl || null,
    source_year: year,
    source_question: q.examQuestion == null ? null : String(q.examQuestion),
    metadata: {
      original_id: q.id,
      exam_label: q.exam || null,
      institutions: q.institutions || [],
      edital_section: q.editalSection || null,
      reference_to_real_exam: Boolean(q.realExam),
      inss_based: Boolean(q.inssBased)
    },
    is_published: true
  });
}
for (let i = 0; i < questions.length; i += 100) {
  const n = Math.min(i + 100, questions.length);
  await upsert('da_questions', questions.slice(i, n), 'source_key');
  console.log('Importadas/atualizadas', n, 'de', questions.length);
}
console.log('Concluído:', questions.length, 'questões,', exams.size, 'provas;', skipped, 'ignoradas.');
