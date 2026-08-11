/* ============================================================
   Música compartida a través de las páginas
   (jardín → cafetería → buenas noches)
   ============================================================ */

(function () {
  "use strict";

  const MUSIC_FILE = "assets/sound/perfect.mp3";
  let audio = null;

  function esPaginaJardin() {
    return location.pathname.indexOf("garden.html") !== -1;
  }

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

  function initSharedMusic() {
    if (window.__sharedMusic) return;

    audio = new Audio(MUSIC_FILE);
    audio.loop = true;
    audio.volume = 0.32;
    window.__sharedMusic = audio;

    audio.addEventListener("play", ocultarBotonMusica);

    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";
    let isTransitioning = sessionStorage.getItem("isTransitioning") === "true";
    sessionStorage.removeItem("isTransitioning");

    // La canción siempre se reinicia al recargar la página o al volver a
    // entrar al jardín, sin importar de dónde se venga.
    if (isReload || esPaginaJardin()) {
      isTransitioning = false;
    }

    if (isTransitioning) {
      // Restaurar tiempo donde quedó en la página anterior y, recién
      // después, retomar la reproducción (secuencial, sin carrera entre
      // el seek y el play, que era lo que hacía sonar desde 0).
      const savedTime = parseFloat(localStorage.getItem("sharedMusicTime") || "0");
      const isPlaying = localStorage.getItem("sharedMusicPlaying") === "true";

      const retomar = () => {
        try {
          audio.currentTime = savedTime;
        } catch (e) {}
        if (isPlaying) window.playSharedMusic();
      };

      if (audio.readyState >= 1) {
        retomar();
      } else {
        audio.addEventListener("loadedmetadata", retomar, { once: true });
      }
    } else {
      // Entrada nueva al jardín o recarga de página: empezar desde 0
      localStorage.removeItem("sharedMusicTime");
      localStorage.removeItem("sharedMusicPlaying");
    }

    // Guardar estado periódicamente
    setInterval(() => {
      if (!audio.paused) {
        localStorage.setItem("sharedMusicTime", audio.currentTime);
        localStorage.setItem("sharedMusicPlaying", "true");
      }
    }, 1000);

    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("isTransitioning", "true");
      if (audio) {
        localStorage.setItem("sharedMusicTime", audio.currentTime);
        localStorage.setItem(
          "sharedMusicPlaying",
          !audio.paused ? "true" : "false",
        );
      }
    });
  }

  window.playSharedMusic = function () {
    if (!audio) initSharedMusic();
    audio
      .play()
      .then(() => {
        localStorage.setItem("sharedMusicPlaying", "true");
      })
      .catch(() => {
        // Autoplay bloqueado por el navegador: mostrar botón para que
        // la persona inicie la música manualmente.
        mostrarBotonMusica();
      });
  };

  window.pauseSharedMusic = function () {
    if (audio) {
      audio.pause();
      localStorage.setItem("sharedMusicPlaying", "false");
    }
  };

  window.toggleSharedMusic = function () {
    if (!audio) initSharedMusic();
    if (audio.paused) {
      window.playSharedMusic();
    } else {
      window.pauseSharedMusic();
    }
  };

  // Inicializar al cargar
  initSharedMusic();

  // Integración con los botones de la UI
  document.addEventListener("DOMContentLoaded", () => {
    // Al entrar a la experiencia (jardín, cafetería o buenas noches)
    const enterBtn = document.getElementById("enterBtn");
    if (enterBtn) {
      enterBtn.addEventListener("click", () => {
        window.playSharedMusic();
      });
    }

    // Al tocar el botón de sonido global
    const soundBtn = document.getElementById("soundBtn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        window.toggleSharedMusic();
      });
    }

    // Botón que solo aparece si el autoplay fue bloqueado
    const btnMusica = musicBtn();
    if (btnMusica) {
      btnMusica.addEventListener("click", () => {
        window.playSharedMusic();
      });
    }
  });
})();
