const themeBtn = document.getElementById("themeBtn");

function applyTheme() {
  const isDark = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark", isDark);

  if (themeBtn) {
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  }
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const newTheme =
      localStorage.getItem("theme") === "dark" ? "light" : "dark";

    localStorage.setItem("theme", newTheme);
    applyTheme();
  });
}

applyTheme();

/* MENU MOBILE */
const mobileBtn = document.getElementById("mobileBtn");
const menu = document.getElementById("menu");

if (mobileBtn && menu) {
  mobileBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

/* QUIZ */
const questions = [
  { q: "O que é biomassa?", a: ["Energia do vento", "Matéria orgânica usada como combustível", "Energia nuclear"], c: 1 },
  { q: "Um exemplo de biomassa é:", a: ["Bagaço de cana", "Petróleo", "Urânio"], c: 0 },
  { q: "Energia geotérmica vem:", a: ["Do vento", "Do oceano", "Interior da Terra"], c: 2 },
  { q: "País destaque em geotérmica:", a: ["Brasil", "Islândia", "Egito"], c: 1 },
  { q: "Biomassa ajuda porque:", a: ["Reaproveita resíduos", "Aumenta poluição", "Gasta petróleo"], c: 0 },
  { q: "Geotérmica é considerada:", a: ["Poluente", "Não renovável", "Limpa e renovável"], c: 2 },
  { q: "Vantagem da biomassa:", a: ["Gerar radiação", "Produzir energia e reduzir lixo", "Não serve"], c: 1 },
  { q: "Fonte principal biomassa:", a: ["Matéria orgânica", "Metal", "Plástico"], c: 0 },
  { q: "Geotérmica utiliza:", a: ["Energia solar", "Ondas", "Calor subterrâneo"], c: 2 },
  { q: "Biomassa e geotérmica:", a: ["Aumentam fósseis", "Reduzem impacto ambiental", "Não servem"], c: 1 },
];

let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const aEl = document.getElementById("answers");
const pEl = document.getElementById("progress");
const fill = document.getElementById("progressFill");

function loadQuestion() {
  if (!qEl) return;

  const q = questions[current];
  qEl.textContent = q.q;
  aEl.innerHTML = "";

  pEl.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  fill.style.width = `${(current / questions.length) * 100}%`;

  q.a.forEach((txt, i) => {
    const btn = document.createElement("button");
    btn.textContent = txt;
    btn.className = "btn secondary";
    btn.addEventListener("click", () => answer(i));
    aEl.appendChild(btn);
  });
}

function answer(i) {
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((b) => (b.disabled = true));

  const correct = questions[current].c;

  if (i === correct) {
    score++;
    buttons[i].classList.add("correct");
  } else {
    buttons[i].classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) loadQuestion();
    else finishQuiz();
  }, 850);
}

function finishQuiz() {
  const name = document.getElementById("nameInput")?.value || "Aluno";
  saveRanking(name, score);

  alert(`Parabéns, ${name}! 🎉\nVocê fez ${score}/10 pontos.\nResultado salvo no Ranking!`);

  window.location.href = "ranking.html";
}

/* RANKING */
function saveRanking(name, score) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({ name, score });
  ranking.sort((a, b) => b.score - a.score);

  localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 10)));
}

function showRanking() {
  const list = document.getElementById("rankingList");
  if (!list) return;

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  list.innerHTML =
    ranking.length === 0
      ? "<li>⚠️ Nenhum jogador ainda...</li>"
      : ranking
          .map((x, i) => `<li>🏅 ${i + 1}º ${x.name} — ${x.score} pts</li>`)
          .join("");
}

function resetRanking() {
  localStorage.removeItem("ranking");
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  if (qEl) loadQuestion();
  if (document.getElementById("rankingList")) showRanking();
});

window.resetRanking = resetRanking;
