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
        ? "¡Nuestro amor es eterno!"
        : "¡Y mañana será aún mejor!";
  Swal.fire({
    title: "❤️",
    text: msg,
    confirmButtonColor: "#8b0000",
    background:
      "#fdf6e3 url(https://www.transparenttextures.com/patterns/parchment.png)",
  });
}

function setupMusicControls() {
  const music = document.getElementById("backgroundMusic");
  const musicBtn = document.getElementById("musicBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");

  if (!music || !musicBtn) {
    console.error("Music or control elements not found");
    return;
  }

  music.load();
  music.currentTime = 0;
  music
    .play()
    .then(() => {
      console.log("Autoplay successful at:", music.currentTime);
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    })
    .catch((error) => {
      console.warn("Autoplay blocked:", error.message);
    });

  function toggleMusic() {
    if (music.paused) {
      music
        .play()
        .then(() => {
          console.log("Music playing at:", music.currentTime);
          playIcon.style.display = "none";
          pauseIcon.style.display = "block";
        })
        .catch((error) => {
          console.error("Error playing audio:", error.message);
        });
    } else {
      music.pause();
      console.log("Music paused at:", music.currentTime);
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    }
  }

  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  music.addEventListener("loadeddata", () => console.log("Audio data loaded"));
  music.addEventListener("error", (e) =>
    console.error("Audio error:", e.message),
  );
  music.addEventListener("play", () => console.log("Music play event"));
  music.addEventListener("pause", () => console.log("Music pause event"));
}

setupMusicControls();