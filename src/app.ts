import { questions } from './questions';
import { trackAnswer, getPercentages, getInterpretation, getDominant, type Score } from './scoring';
import './style.css';

type ScreenName = 'welcome' | 'question' | 'results';

interface AppState {
  screen: ScreenName;
  questionIndex: number;
  score: Score;
}

const state: AppState = {
  screen: 'welcome',
  questionIndex: 0,
  score: { ru: 0, shi: 0, dao: 0 },
};

const appEl = document.querySelector<HTMLDivElement>('#app')!;

/* ── dot progress (shared across question screens) ── */
const dotProgress = document.createElement('div');
dotProgress.className = 'dot-progress';
document.body.appendChild(dotProgress);

function renderDots(): void {
  const dots = Array.from({ length: questions.length }, (_, i) => {
    let cls = 'dot-progress__dot';
    if (i < state.questionIndex) cls += ' done';
    if (i === state.questionIndex) cls += ' current';
    return `<span class="${cls}"></span>`;
  }).join('');
  dotProgress.innerHTML = dots;
}

/* ── screen management ── */
function showScreen(name: ScreenName): void {
  state.screen = name;

  /* manage dot progress */
  if (name === 'question') {
    dotProgress.classList.add('visible');
    renderDots();
  } else {
    dotProgress.classList.remove('visible');
  }

  const container = document.createElement('div');
  container.className = `screen`;

  switch (name) {
    case 'welcome':
      container.classList.add('welcome');
      container.innerHTML = buildWelcome();
      container.querySelector('.welcome__btn')?.addEventListener('click', () => {
        resetState();
        showScreen('question');
      });
      break;
    case 'question':
      container.classList.add('question-screen');
      container.innerHTML = buildQuestion();
      container.querySelectorAll('.choice-card').forEach((card) => {
        card.addEventListener('click', () => handleChoice(card));
      });
      break;
    case 'results':
      container.classList.add('results');
      container.innerHTML = buildResults();
      container.querySelector('.results__restart')?.addEventListener('click', () => {
        resetState();
        showScreen('welcome');
      });
      setTimeout(() => animateResults(container), 300);
      break;
  }

  /* crossfade transition */
  const current = appEl.querySelector('.screen.active');
  if (current) {
    current.classList.remove('active');
    setTimeout(() => {
      current.remove();
      appEl.appendChild(container);
      requestAnimationFrame(() => container.classList.add('active'));
    }, 200);
  } else {
    appEl.appendChild(container);
    requestAnimationFrame(() => container.classList.add('active'));
  }
}

function resetState(): void {
  state.questionIndex = 0;
  state.score = { ru: 0, shi: 0, dao: 0 };
}

/* ═══════════════════════════════════════
   SCREEN BUILDERS
   ═══════════════════════════════════════ */

function buildWelcome(): string {
  return `
    <div class="welcome__circle in d1"></div>
    <div class="welcome__traditions in d2">儒 · 释 · 道</div>
    <h1 class="welcome__title in d3">你是哪一家</h1>
    <p class="welcome__description in d4">
      十五道情境选择，探寻你内心的哲学倾向。没有正确答案——只有最像你的那一个。
    </p>
    <button class="welcome__btn in d5">开始探索</button>
  `;
}

function buildQuestion(): string {
  const q = questions[state.questionIndex];

  const choices = q.choices.map((c) => `
    <button class="choice-card" data-tradition="${c.tradition}">
      <span>${c.text}</span>
    </button>
  `).join('');

  return `
    <span class="question-screen__step in">${state.questionIndex + 1} / ${questions.length}</span>
    <p class="question-screen__scenario in d1">${q.scenario}</p>
    <div class="question-screen__choices">
      ${choices}
    </div>
  `;
}

function handleChoice(card: Element): void {
  const tradition = card.getAttribute('data-tradition') as 'ru' | 'shi' | 'dao';
  if (!tradition) return;

  /* disable further clicks */
  document.querySelectorAll<HTMLElement>('.choice-card').forEach((c) => {
    c.style.pointerEvents = 'none';
  });

  trackAnswer(tradition, state.score);
  card.classList.add('selected');

  setTimeout(() => {
    state.questionIndex++;
    if (state.questionIndex >= questions.length) {
      showScreen('results');
    } else {
      showScreen('question');
    }
  }, 350);
}

function buildResults(): string {
  const dom = getDominant(state.score);
  const pct = getPercentages(state.score);
  const interp = getInterpretation(dom, pct);
  const names = { ru: '儒家', shi: '佛家', dao: '道家' };

  const dimensionItems = (['ru', 'shi', 'dao'] as const).map((key) => `
    <div class="dimension-item dimension-item--${key} in d${key === 'ru' ? '4' : key === 'shi' ? '5' : '6'}">
      <span class="dimension-item__name">${names[key]}</span>
      <span class="dimension-item__track">
        <span class="dimension-item__fill" style="width: 0%"></span>
      </span>
      <span class="dimension-item__value">${pct[key]}%</span>
    </div>
  `).join('');

  return `
    <span class="results__label in d1">你的倾向</span>
    <div class="results__dominant in d2">${names[dom]}</div>

    <!-- venn diagram -->
    <div class="venn in d3" id="venn">
      <div class="venn__circle venn__circle--ru"></div>
      <div class="venn__circle venn__circle--shi"></div>
      <div class="venn__circle venn__circle--dao"></div>
      <span class="venn__label venn__label--ru"><span class="venn__pct">${pct.ru}%</span>${names.ru}</span>
      <span class="venn__label venn__label--shi"><span class="venn__pct">${pct.shi}%</span>${names.shi}</span>
      <span class="venn__label venn__label--dao"><span class="venn__pct">${pct.dao}%</span>${names.dao}</span>
    </div>

    <!-- thin bars -->
    <div class="dimension-list">
      ${dimensionItems}
    </div>

    <div class="results__divider in d6"></div>
    <div class="results__interpretation in d7">${interp}</div>
    <button class="results__restart in d8">重新探索</button>
  `;
}

function animateResults(container: HTMLElement): void {
  /* venn circles */
  const venn = container.querySelector<HTMLElement>('.venn');
  if (venn) venn.classList.add('is-active');

  /* dimension fills */
  container.querySelectorAll<HTMLElement>('.dimension-item').forEach((item) => {
    const fill = item.querySelector<HTMLElement>('.dimension-item__fill');
    if (fill) {
      const value = item.querySelector<HTMLElement>('.dimension-item__value');
      if (value) fill.style.width = value.textContent || '0%';
    }
  });
}

/* ── init ── */
showScreen('welcome');
