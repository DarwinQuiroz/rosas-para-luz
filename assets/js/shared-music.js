/* ============================================================
   Música compartida por las 3 escenas del universo.
   Al ser una sola página, el elemento <audio> nunca se destruye:
   suena de corrido del jardín a la cafetería y a buenas noches.
   Solo se reinicia si se recarga la página.
   ============================================================ */

(function () {
  "use strict";

  const audio = document.getElementById("musica");

  function musicBtn() {
    return document.getElementById("musicBtn");
  }

  function mostrarBotonMusica() {
    const btn = musicBtn();
    if (btn) btn.hidden = false;
  }

  function ocultarBotonMusica() {
    const btn = musicBtn();
    if (btn) btn.hidden = true;
  }

  audio.addEventListener("play", ocultarBotonMusica);

  window.playSharedMusic = function () {
    audio.play().catch(() => {
      // Autoplay bloqueado por el navegador: mostrar botón para que
      // la persona inicie la música manualmente.
      mostrarBotonMusica();
    });
  };

  window.pauseSharedMusic = function () {
    audio.pause();
  };

  window.toggleSharedMusic = function () {
    if (audio.paused) {
      window.playSharedMusic();
    } else {
      window.pauseSharedMusic();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    // El primer "Entrar" arranca la música; los siguientes ya la
    // encuentran sonando, pero volver a llamar play() es inofensivo.
    document
      .querySelectorAll("#gdn-enterBtn, #caf-enterBtn, #noc-enterBtn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          window.playSharedMusic();
        });
      });

    // El botón de sonido de cada escena también controla la música.
    document.querySelectorAll(".sound-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.toggleSharedMusic();
      });
    });

    // Botón que solo aparece si el autoplay fue bloqueado.
    const btnMusica = musicBtn();
    if (btnMusica) {
      btnMusica.addEventListener("click", () => {
        window.playSharedMusic();
      });
    }
  });
})();
