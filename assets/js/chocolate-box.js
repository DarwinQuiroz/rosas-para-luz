// Datos de chocolates desde PHP
const chocolatesData = [
  {
    name: "Trufa de Chocolate",
    title: "Eres mi dulzura",
    message:
      "Cada momento contigo es tan dulce como este chocolate. Te amo con todo mi corazón.",
    image: "",
  },
  {
    name: "Chocolate Blanco",
    title: "Mi amor puro",
    message:
      "Como el chocolate blanco, mi amor por ti es puro y sincero. Eres lo mejor de mi vida.",
    image: "",
  },
  {
    name: "Chocolate con Leche",
    title: "Juntos siempre",
    message:
      "Como el chocolate con leche, somos la combinacion perfecta. Contigo todo es mejor.",
    image: "",
  },
  {
    name: "Trufa Especial",
    title: "Eres especial",
    message:
      "Tan especial como una trufa, asi eres tú para mí. Gracias por existir en mi vida.",
    image: "",
  },
];

// Mapeo de posiciones a indices
const positionMap = {
  "top-left": 0,
  "top-right": 1,
  "bottom-left": 2,
  "bottom-right": 3,
};

const container = document.querySelector(".particles");
const symbols = ["💗", "🌸", "✨", "💖"];

function createParticle() {
  const particle = document.createElement("span");
  particle.classList.add("particle");
  particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.fontSize = Math.random() * 10 + 12 + "px";
  particle.style.animationDuration = Math.random() * 5 + 6 + "s";

  container.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 12000);
}

// Genera partículas lentamente
setInterval(createParticle, 700);

function showHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "❤️";
  heart.style.left = "50%";
  heart.style.top = "50%";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
}

// Pre-cargar imagenes cuando la pagina carga
function preloadImages() {
  chocolatesData.forEach((choco, index) => {
    if (choco.image && choco.image.trim() !== "") {
      const img = new Image();
      img.src = choco.image;
      console.log(`Imagen pre-cargada ${index}: ${choco.image}`);
    }
  });
}

// Llamar pre-carga cuando la pagina carga
$(document).ready(function () {
  preloadImages();
});

function showLoveMessage(chocolateId) {
  const index = positionMap[chocolateId];
  const choco = chocolatesData[index];

  if (choco) {
    $("#modalTitle").text(choco.title || "Te amo");
    // Convertir saltos de linea a <br> y escapar HTML
    const message = (choco.message || "Eres lo mejor de mi vida.")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
    $("#modalText").html(message);

    if (choco.image && choco.image.trim() !== "") {
      $("#modalImage").attr("src", choco.image).addClass("has-image");
    } else {
      $("#modalImage").removeClass("has-image").attr("src", "");
    }

    $("#loveModal").addClass("active");
  }
}

function closeModal() {
  $("#loveModal").removeClass("active");
}

// Cerrar modal al hacer click fuera
$("#loveModal").on("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

$(document).ready(function () {
  function adjustLabelPosition(label) {
    const originalLeft = window.getComputedStyle(label).left;

    label.style.display = "block";
    label.style.whiteSpace = "normal";
    label.style.overflowWrap = "break-word";
    label.style.maxWidth = "180px";

    let labelRect = label.getBoundingClientRect();
    let currentLeft = parseFloat(window.getComputedStyle(label).left);
    let newLeft = currentLeft;

    if (labelRect.left < 0) {
      newLeft -= labelRect.left - 10;
    }

    if (labelRect.right > window.innerWidth) {
      newLeft -= labelRect.right - window.innerWidth + 10;
    }

    label.style.left = newLeft + "px";

    return { originalLeft };
  }

  function restoreLabelPosition(label, originals) {
    label.style.left = originals.originalLeft;
    label.style.whiteSpace = originals.originalWhiteSpace;
    label.style.overflowWrap = originals.originalOverflowWrap;
    label.style.maxWidth = originals.originalMaxWidth;
    label.style.display = "none";
  }

  // Mostrar nombres al pasar el mouse
  $("#top-right")
    .on("mouseenter", function () {
      const label = $("#label-top-right")[0];
      this.originals = adjustLabelPosition(label);
    })
    .on("mouseout", function () {
      const label = $("#label-top-right")[0];
      restoreLabelPosition(label, this.originals);
    });

  $("#bottom-left")
    .on("mouseenter", function () {
      const label = $("#label-bottom-left")[0];
      this.originals = adjustLabelPosition(label);
    })
    .on("mouseout", function () {
      const label = $("#label-bottom-left")[0];
      restoreLabelPosition(label, this.originals);
    });

  $("#bottom-right")
    .on("mouseenter", function () {
      const label = $("#label-bottom-right")[0];
      this.originals = adjustLabelPosition(label);
    })
    .on("mouseout", function () {
      const label = $("#label-bottom-right")[0];
      restoreLabelPosition(label, this.originals);
    });

  $("#top-left")
    .on("mouseenter", function () {
      const label = $("#label-top-left")[0];
      this.originals = adjustLabelPosition(label);
    })
    .on("mouseout", function () {
      const label = $("#label-top-left")[0];
      restoreLabelPosition(label, this.originals);
    });

  // Mostrar mensaje de amor al hacer click
  $("#top-left").on("click", function () {
    showLoveMessage("top-left");
  });
  $("#top-right").on("click", function () {
    showLoveMessage("top-right");
  });
  $("#bottom-left").on("click", function () {
    showLoveMessage("bottom-left");
  });
  $("#bottom-right").on("click", function () {
    showLoveMessage("bottom-right");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const fullscreenManager = {
    toggleBtn: document.getElementById("toggle-fullscreen"),
    iconElement: document.getElementById("fullscreen-icon"),
    isFullscreen: function () {
      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    },
    updateIcon: function () {
      if (!this.iconElement) return;
      if (this.isFullscreen()) {
        this.iconElement.classList.remove("fa-expand");
        this.iconElement.classList.add("fa-compress");
      } else {
        this.iconElement.classList.remove("fa-compress");
        this.iconElement.classList.add("fa-expand");
      }
    },
    toggle: function () {
      if (!this.isFullscreen()) {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    },
    init: function () {
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener("click", () => this.toggle());
        document.addEventListener("fullscreenchange", () => this.updateIcon());
        document.addEventListener("webkitfullscreenchange", () =>
          this.updateIcon()
        );
        document.addEventListener("mozfullscreenchange", () =>
          this.updateIcon()
        );
        document.addEventListener("MSFullscreenChange", () =>
          this.updateIcon()
        );
      }
    },
  };
  fullscreenManager.init();
});
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
    console.error("Audio error:", e.message)
  );
  music.addEventListener("play", () => console.log("Music play event"));
  music.addEventListener("pause", () => console.log("Music pause event"));
}

// Initialize music controls
setupMusicControls();
