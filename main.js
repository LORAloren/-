import './style.css';

const quizzes = [
  {
    id: 'pdd',
    title: 'Знаток ПДД',
    subtitle: 'Дорожные знатоки',
    description: 'Интерактивная игра о дорожных знаках, транспорте и безопасном поведении на дороге.',
    category: 'Безопасность',
    icon: '🚦',
    art: 'pdd',
    url: '/quizzes/znatok-pdd.html'
  },
  {
    id: 'cartoons',
    title: 'Знаток советских мультфильмов',
    subtitle: 'В гостях у любимых мультфильмов',
    description: 'Игровые задания по советским мультфильмам с интерактивными карточками и сертификатом.',
    category: 'Мультфильмы',
    icon: '🎬',
    art: 'cartoons',
    url: '/quizzes/znatok-multfilmov.html'
  }
];

const app = document.querySelector('#app');
let activeQuiz = null;

function renderCatalog() {
  activeQuiz = null;
  document.body.classList.remove('playing');
  app.innerHTML = `
    <header class="top">
      <div class="brand-icon" aria-hidden="true">⭐</div>
      <div class="brand-copy">
        <div class="eyebrow">ИНТЕРАКТИВНЫЕ ИГРЫ ДЛЯ ДОШКОЛЬНИКОВ</div>
        <h1>Викторины РППС В ДОО</h1>
        <p>Учимся, играя!</p>
      </div>
    </header>
    <main class="catalog">
      <section class="intro">
        <div>
          <span class="pill">Каталог викторин</span>
          <h2>Выбери игру и отправляйся навстречу новым знаниям!</h2>
          <p>Открой карточку, чтобы начать викторину. Каждая игра запускается в отдельном игровом окне.</p>
        </div>
        <div class="hero-art" aria-hidden="true">🌟📚🌟</div>
      </section>
      <div class="section-title">
        <h2>Доступные викторины</h2>
        <span class="count">${quizzes.length} игры</span>
      </div>
      <section class="quiz-grid">
        ${quizzes.map(q => `
          <article class="quiz-card">
            <div class="quiz-art ${q.art}" aria-hidden="true"><span>${q.icon}</span></div>
            <div class="quiz-info">
              <span class="pill">${q.category}</span>
              <h3>${q.title}</h3>
              <p>${q.description}</p>
              <button class="primary start" data-id="${q.id}">Открыть викторину <span aria-hidden="true">→</span></button>
            </div>
          </article>
        `).join('')}
      </section>
      <footer>Викторины РППС В ДОО · Игровые материалы для дошкольного образования</footer>
    </main>`;
  app.querySelectorAll('.start').forEach(button => {
    button.addEventListener('click', () => openQuiz(button.dataset.id));
  });
}

function openQuiz(id) {
  activeQuiz = quizzes.find(q => q.id === id);
  if (!activeQuiz) return;
  document.body.classList.add('playing');
  app.innerHTML = `
    <div class="game-shell">
      <div class="game-toolbar">
        <button class="back-button" id="backToCatalog"><span aria-hidden="true">←</span> Все викторины</button>
        <div class="game-label">${activeQuiz.title}</div>
        <button class="close-button" id="closeGame" aria-label="Закрыть викторину" title="Вернуться в каталог">✕</button>
      </div>
      <iframe class="game-frame" title="${activeQuiz.title}" src="${activeQuiz.url}" allow="fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>`;
  document.querySelector('#backToCatalog').addEventListener('click', renderCatalog);
  document.querySelector('#closeGame').addEventListener('click', renderCatalog);
}

renderCatalog();
