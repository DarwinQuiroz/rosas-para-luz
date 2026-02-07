function abrirPeriodico() {
  document.getElementById("pantalla-carta").style.display = "none";
  document.getElementById("periodico-contenido").style.display = "block";
  const v = document.getElementById("miVideo");
  v.muted = false;
  v.play();
}

const palabrasOcultas = ["AMOR", "VIDA", "TUYO", "SIEMPRE"];
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const tamaño = 8;

function generarContenidoSopa() {
  let html = "";
  for (let i = 0; i < tamaño * tamaño; i++) {
    html += `<span>${letras.charAt(Math.floor(Math.random() * letras.length))}</span>`;
  }
  return html;
}

document.getElementById("mini-sopa").innerHTML = generarContenidoSopa();

function jugarSopa() {
  Swal.fire({
    title: "Sopa de Letras",
    html: `<div class="container">
        <p class="subtitle">Encuentra las palabras:</p>

        <div class="words-to-find">
            <div class="word-list" id="wordList"></div>
        </div>

        <div class="grid-container" id="grid"></div>

        <div class="progress" id="progress">Palabras encontradas: 0/5</div>

        <div class="success-message" id="successMessage">
            🎉 ¡Felicidades! ¡Has encontrado todas las palabras! 🎉
        </div>

        <div class="button-container">
            <button class="reset-button" onclick="resetGame()"><i class="fa-solid fa-arrows-rotate"></i> Nuevo</button>
            <button class="hint-button" onclick="showHint()"><i class="fa-regular fa-lightbulb"></i> Pista</button>
        </div>
    </div>`,
    // confirmButtonText: "¡Lo logré!",
    confirmButtonColor: "#8b0000",
    background:
      "#fdf6e3 url(https://www.transparenttextures.com/patterns/parchment.png)",
    customClass: {
      popup: "swal-sopa-container",
    },
  });

  initGame();
}

function mostrarAlerta() {
  Swal.fire({
    title: "¡URGENTE!",
    text: "¿Aceptas seguir escribiendo esta historia conmigo?",
    icon: "heart",
    iconColor: "#8b0000",
    showCancelButton: true,
    confirmButtonText: "¡Sí, mil veces sí!",
    cancelButtonText: "¡Obvio!",
    background:
      "#fdf6e3 url(https://www.transparenttextures.com/patterns/parchment.png)",
    backdrop: `rgba(139, 0, 0, 0.3)`,
  });
}

function respuestaAmor(tipo) {
  let msg =
    tipo === "mucho"
      ? "¡Yo te amo mucho más!"
      : tipo === "infinito"
        ? "¡Algo que nunca terminará!"
        : "¡Y mañana será aún mejor!";
  Swal.fire({
    title: "❤️",
    text: msg,
    confirmButtonColor: "#8b0000",
    background:
      "#fdf6e3 url(https://www.transparenttextures.com/patterns/parchment.png)",
  });
}