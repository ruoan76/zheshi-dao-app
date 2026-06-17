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

/* ── progress bar ── */
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

/* ── helpers ── */
function showScreen(name: ScreenName): void {
  state.screen = name;
  const container = document.createElement('div');
  container.className = `screen ${name}`;

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
      setTimeout(() => animateResultBars(container), 200);
      break;
  }

  /* fade transition */
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

function updateProgress(): void {
  const pct = ((state.questionIndex) / questions.length) * 100;
  progressBar.style.width = `${pct}%`;
}

/* ── screen builders ── */
function buildWelcome(): string {
  return `
    <div class="welcome__divider fade-up delay-1"></div>
    <h1 class="welcome__title fade-up delay-2">你是哪一家</h1>
    <div class="welcome__divider fade-up delay-1"></div>
    <p class="welcome__description fade-up delay-3">
      通过十五道情境选择，<br>探寻你内心深处的儒·释·道倾向
    </p>
    <button class="welcome__btn fade-up delay-4">开始探索</button>
  `;
}

function buildQuestion(): string {
  const q = questions[state.questionIndex];
  const step = `${state.questionIndex + 1} / ${questions.length}`;
  const letters = ['A', 'B', 'C'];

  const choices = q.choices.map((c, i) => `
    <button class="choice-card" data-tradition="${c.tradition}">
      <span class="choice-card__letter">${letters[i]}</span>
      <span class="choice-card__text">${c.text}</span>
    </button>
  `).join('');

  return `
    <span class="question-screen__step fade-up">${step}</span>
    <p class="question-screen__scenario fade-up delay-1">${q.scenario}</p>
    <div class="question-screen__choices">
      ${choices}
    </div>
  `;
}

function handleChoice(card: Element): void {
  const tradition = card.getAttribute('data-tradition') as 'ru' | 'shi' | 'dao';
  if (!tradition) return;

  trackAnswer(tradition, state.score);
  card.classList.add('selected');

  setTimeout(() => {
    state.questionIndex++;
    updateProgress();
    if (state.questionIndex >= questions.length) {
      showScreen('results');
    } else {
      showScreen('question');
    }
  }, 250);
}

function buildResults(): string {
  const dom = getDominant(state.score);
  const pct = getPercentages(state.score);
  const interp = getInterpretation(dom, pct);

  const names = { ru: '儒家', shi: '佛家', dao: '道家' };

  const dimensions = (['ru', 'shi', 'dao'] as const).map((key) => {
    const label = key === dom ? `${names[key]} · 主导` : names[key];
    return `
      <div class="dimension dimension--${key} fade-up delay-${key === 'ru' ? '2' : key === 'shi' ? '3' : '4'}" data-pct="${pct[key]}">
        <div class="dimension__header">
          <span class="dimension__name">${label}</span>
          <span class="dimension__value">${pct[key]}%</span>
        </div>
        <div class="dimension__track">
          <div class="dimension__fill" style="width: 0%"></div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <h2 class="results__title fade-up delay-1">你的倾向</h2>
    <div class="results__dimensions">
      ${dimensions}
    </div>
    <div class="results__interpretation fade-up delay-5">${interp}</div>
    <button class="results__restart fade-up delay-6">重新探索</button>
  `;
}

function animateResultBars(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.dimension').forEach((dim) => {
    const pct = dim.getAttribute('data-pct');
    const fill = dim.querySelector<HTMLElement>('.dimension__fill');
    if (fill && pct) {
      fill.style.width = `${pct}%`;
    }
  });
}

/* ── init ── */
showScreen('welcome');
