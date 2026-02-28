document.addEventListener("DOMContentLoaded", () => {

/* ================= DARK MODE ================= */

const themeBtn = document.getElementById("themeBtn");

function applyTheme() {
  const isDark = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeBtn) themeBtn.textContent = isDark ? "☀️" : "🌙";
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

/* ================= MENU MOBILE ================= */

const mobileBtn = document.getElementById("mobileBtn");
const menu = document.getElementById("menu");

if (mobileBtn && menu) {
  mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    menu.classList.toggle("active");
  });
}

/* ================= QUIZ (5 BIOMASSA + 5 GEOTÉRMICA) ================= */

const questions = [

  // 🔥 BIOMASSA (5)

  {
    q: "O que é biomassa?",
    a: ["Energia nuclear", "Matéria orgânica usada como combustível", "Energia do vento"],
    c: 1
  },
  {
    q: "Qual é um exemplo de biomassa?",
    a: ["Petróleo", "Urânio", "Bagaço de cana-de-açúcar"],
    c: 2
  },
  {
    q: "Uma vantagem da biomassa é:",
    a: ["Reaproveitar resíduos orgânicos", "Produzir radiação", "Aumentar poluição"],
    c: 0
  },
  {
    q: "A biomassa pode produzir:",
    a: ["Plástico", "Etanol e biogás", "Energia solar"],
    c: 1
  },
  {
    q: "A biomassa ajuda a:",
    a: ["Criar petróleo", "Reduzir lixo orgânico", "Aumentar lixo industrial"],
    c: 1
  },

  // 🌋 GEOTÉRMICA (5)

  {
    q: "Energia geotérmica vem de onde?",
    a: ["Do oceano", "Do vento", "Do interior da Terra"],
    c: 2
  },
  {
    q: "A energia geotérmica utiliza:",
    a: ["Calor subterrâneo", "Carvão mineral", "Luz solar direta"],
    c: 0
  },
  {
    q: "País destaque em energia geotérmica:",
    a: ["Brasil", "Islândia", "Argentina"],
    c: 1
  },
  {
    q: "Uma vantagem da geotérmica é:",
    a: ["Depende do vento", "Funciona 24 horas por dia", "Depende do sol"],
    c: 1
  },
  {
    q: "A energia geotérmica é considerada:",
    a: ["Artificial", "Fóssil", "Limpa e renovável"],
    c: 2
  }

];

let current = 0;
let score = 0;

const qEl = document.getElementById("question");
const aEl = document.getElementById("answers");
const fill = document.getElementById("progressFill");
const nameInput = document.getElementById("nameInput");

/* ================= CARREGAR PERGUNTA ================= */

function loadQuestion() {
  if (!qEl) return;

  const q = questions[current];
  qEl.textContent = q.q;
  aEl.innerHTML = "";

  fill.style.width = `${(current / questions.length) * 100}%`;

  q.a.forEach((txt, i) => {
    const btn = document.createElement("button");
    btn.textContent = txt;
    btn.className = "btn secondary";
    btn.onclick = () => answer(i);
    aEl.appendChild(btn);
  });
}

/* ================= RESPONDER ================= */

function answer(i) {
  const correct = questions[current].c;
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((btn, index) => {
    btn.classList.add("disabled");

    if (index === correct) {
      btn.classList.add("correct");
    }

    if (index === i && i !== correct) {
      btn.classList.add("wrong");
    }
  });

  if (i === correct) score++;

  setTimeout(() => {
    current++;

    if (current < questions.length) {
      loadQuestion();
    } else {
      finishQuiz();
    }
  }, 900);
}

/* ================= FINALIZAR QUIZ ================= */

function finishQuiz() {
  const name = nameInput?.value.trim() || "Aluno";

  saveRanking(name, score);

  alert(`Parabéns ${name}! Você fez ${score}/10 pontos!`);

  window.location.href = "ranking.html";
}

/* ================= SALVAR RANKING ================= */

function saveRanking(name, score) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({ name, score });

  ranking.sort((a, b) => b.score - a.score);

  localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 10)));
}

/* ================= MOSTRAR RANKING ================= */

function showRanking() {
  const list = document.getElementById("rankingList");
  if (!list) return;

  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  list.innerHTML = "";

  if (ranking.length === 0) {
    list.innerHTML = "<li>Nenhum jogador ainda...</li>";
    return;
  }

  ranking.forEach((x, i) => {

    let medal = "";
    if (i === 0) medal = "🥇";
    else if (i === 1) medal = "🥈";
    else if (i === 2) medal = "🥉";

    const li = document.createElement("li");
    li.innerHTML = `${medal} ${i + 1}º ${x.name} — ${x.score} pts`;
    li.style.animation = "fadeUp 0.5s ease forwards";
    li.style.opacity = 0;
    li.style.animationDelay = `${i * 0.1}s`;

    list.appendChild(li);
  });
}

/* ================= LIMPAR RANKING (AGORA FUNCIONA) ================= */

window.resetRanking = function() {
  if (confirm("Tem certeza que deseja limpar o ranking?")) {
    localStorage.removeItem("ranking");
    showRanking();
  }
};

if (qEl) loadQuestion();
if (document.getElementById("rankingList")) showRanking();

/* ================= INIT CARROSSEL ================= */

const cards = document.querySelectorAll(".plant-card");
const carousel = document.querySelector(".carousel");

if (cards.length > 0 && window.innerWidth > 768) {
  updateCarouselCircle();
  startAutoRotate();

  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);
  }
} else {
  stopAutoRotate();
  cards.forEach(card => {
    card.style.transform = "none";
  });
}

createParticles();


});

/* ================= CARROSSEL CIRCULAR 360° ================= */

let currentAngle = 0;
let autoRotate;
const radius = 400;

function updateCarouselCircle() {
  const cards = document.querySelectorAll(".plant-card");
  const total = cards.length;
  const angleStep = 360 / total;

  cards.forEach((card, i) => {
    const angle = angleStep * i + currentAngle;

    card.style.transform = `
      translate(-50%, -50%)
      rotateY(${angle}deg)
      translateZ(${radius}px)
    `;
  });
}

function nextSlide() {
  currentAngle -= 360 / document.querySelectorAll(".plant-card").length;
  updateCarouselCircle();
}

function prevSlide() {
  currentAngle += 360 / document.querySelectorAll(".plant-card").length;
  updateCarouselCircle();
}

/* AUTO ROTATE */
function startAutoRotate() {
  autoRotate = setInterval(() => {
    nextSlide();
  }, 3500);
}

function stopAutoRotate() {
  clearInterval(autoRotate);
}
/* ================= INFORMAÇÕES DAS USINAS ================= */

const plantInfo = [

  {
    title: "Drax Power Station",
    text: "Localizada no Reino Unido, é uma das maiores usinas de biomassa do mundo. Possui capacidade aproximada de 2,6 GW e substituiu o carvão por pellets de madeira."
  },

  {
    title: "Usinas Raízen",
    text: "No Brasil, utilizam bagaço de cana-de-açúcar para gerar bioeletricidade. Aproveitam resíduos agrícolas e ajudam a reduzir impactos ambientais."
  },

  {
    title: "Hellisheiði",
    text: "Uma das maiores usinas geotérmicas do planeta, localizada na Islândia. Produz cerca de 303 MW elétricos e também fornece aquecimento."
  },

  {
    title: "The Geysers",
    text: "Maior complexo geotérmico do mundo, localizado na Califórnia. Utiliza vapor subterrâneo para movimentar turbinas e gerar energia limpa."
  }

];

function showInfo(index) {
  document.getElementById("modalTitle").innerText = plantInfo[index].title;
  document.getElementById("modalText").innerText = plantInfo[index].text;
  document.getElementById("plantModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("plantModal").style.display = "none";
}

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return; // 🔥 impede erro

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = (5 + Math.random() * 10) + "s";
    particle.style.opacity = Math.random();

    container.appendChild(particle);
  }
} 

/* ================= SEGURANÇA MOBILE ================= */

window.addEventListener("resize", () => {

  const cards = document.querySelectorAll(".plant-card");

  if (window.innerWidth <= 768) {

    stopAutoRotate();

    cards.forEach(card => {
      card.style.transform = "none";
    });

  } else {

    updateCarouselCircle();
    startAutoRotate();

  }

});