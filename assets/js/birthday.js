// --- Animación de Revelado al Scroll ---
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("active");
    }
  });
});

// Activar el hero al cargar
window.onload = () => {
  document.querySelector("header .reveal").classList.add("active");
  startConfetti();
};

// --- Sistema de Confeti Simple ---
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let confetti = [];

function startConfetti() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10,
      color: `hsl($ {
                        Math.random() * 360
                    }

                    , 70%, 80%)`,
      tilt: Math.random() * 10 - 10,
    });
  }

  renderConfetti();
}

function renderConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((p, i) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();

    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.tilt = Math.sin(p.d) * 15;

    if (p.y > canvas.height) {
      confetti[i] = {
        ...p,
        y: -20,
        x: Math.random() * canvas.width,
      };
    }
  });
  requestAnimationFrame(renderConfetti);
}
