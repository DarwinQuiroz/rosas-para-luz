function createStars() {
  const sky = document.querySelector(".overlay-bg");
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.className = "particle";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animation = `fadeInUp ${Math.random() * 2 + 1}s infinite`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    sky.appendChild(star);
  }
}

createStars();

const carouselContainers = document.querySelectorAll(
  ".carousel .image-container"
);
let currentImage = 0;
let isTransitioning = false;

function showImage(index, direction = "next") {
  if (isTransitioning) return;
  isTransitioning = true;

  const currentContainer = carouselContainers[currentImage];
  const nextContainer = carouselContainers[index];

  carouselContainers.forEach((container) => {
    container.classList.remove("active");
    container.style.opacity = "0";
    container.style.transform =
      direction === "next" ? "translateX(100%)" : "translateX(-100%)";
  });

  nextContainer.classList.add("active");
  nextContainer.style.opacity = "1";
  nextContainer.style.transform = "translateX(0)";

  setTimeout(() => {
    isTransitioning = false;
  }, 800);

  currentImage = index;
}

document.querySelector(".next-btn").addEventListener("click", () => {
  const nextIndex = (currentImage + 1) % carouselContainers.length;
  showImage(nextIndex, "next");
});

document.querySelector(".prev-btn").addEventListener("click", () => {
  const prevIndex =
    (currentImage - 1 + carouselContainers.length) % carouselContainers.length;
  showImage(prevIndex, "prev");
});

setInterval(() => {
  const nextIndex = (currentImage + 1) % carouselContainers.length;
  showImage(nextIndex, "next");
}, 6000);

let typewriterTimeout = null;

function typeLine(lineElement, text, speed = 20, onDone) {
  const textSpan = lineElement.querySelector(".text");
  const cursor = lineElement.querySelector(".cursor");
  const typewriterContainer = document.querySelector(".typewriter-container");
  textSpan.textContent = "";
  lineElement.classList.add("active");
  let index = 0;

  function typeChar() {
    if (index < text.length) {
      textSpan.textContent += text.charAt(index);
      index++;
      // Scroll to the bottom of the typewriter container smoothly
      typewriterContainer.scrollTo({
        top: typewriterContainer.scrollHeight,
        behavior: "smooth",
      });
      typewriterTimeout = setTimeout(typeChar, speed);
    } else {
      cursor.style.display = "none";
      // Ensure final scroll to bottom when line is complete
      typewriterContainer.scrollTo({
        top: typewriterContainer.scrollHeight,
        behavior: "smooth",
      });
      if (onDone) onDone();
    }
  }

  cursor.style.display = "inline-block";
  typeChar();
}

function openLetterModal() {
  const overlay = document.getElementById("letterOverlay");
  const typewriterText = document.getElementById("typewriterText");
  const lines = typewriterText.querySelectorAll(".line");
  const texts = [
    "Mi amor, cada momento contigo es un tesoro. Desde el d\u00eda que te conoc\u00ed, supe que eras mi destino. Gracias por cada risa, cada abrazo, cada sue\u00f1o compartido. Hoy celebramos nuestro amor, y prometo amarte siempre.",
  ].filter((text) => text.trim() !== "");

  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  lines.forEach((line) => {
    const textSpan = line.querySelector(".text");
    const cursor = line.querySelector(".cursor");
    textSpan.textContent = "";
    cursor.style.display = "none";
    line.classList.remove("active");
  });

  overlay.style.display = "flex";

  function typeNextLine(index) {
    if (index < lines.length && index < texts.length && texts[index]) {
      typeLine(lines[index], texts[index], 20, () => {
        typeNextLine(index + 1);
      });
    } else {
      lines.forEach(
        (line) => (line.querySelector(".cursor").style.display = "none")
      );
    }
  }

  typeNextLine(0);
}

document
  .getElementById("openLetterBtn")
  .addEventListener("click", openLetterModal);

document.getElementById("closeLetterBtn").addEventListener("click", () => {
  const overlay = document.getElementById("letterOverlay");
  const typewriterText = document.getElementById("typewriterText");
  const lines = typewriterText.querySelectorAll(".line");

  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  lines.forEach((line) => {
    const textSpan = line.querySelector(".text");
    const cursor = line.querySelector(".cursor");
    textSpan.textContent = "";
    cursor.style.display = "none";
  });

  overlay.style.display = "none";
});

window.onclick = function (event) {
  const overlay = document.getElementById("letterOverlay");
  if (event.target === overlay) {
    const typewriterText = document.getElementById("typewriterText");
    const lines = typewriterText.querySelectorAll(".line");

    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }

    lines.forEach((line) => {
      const textSpan = line.querySelector(".text");
      const cursor = line.querySelector(".cursor");
      textSpan.textContent = "";
      cursor.style.display = "none";
    });

    overlay.style.display = "none";
  }
};

const fadeSections = document.querySelectorAll(".fade-in-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("love-meter")) {
          const meterFill = entry.target.querySelector(".meter-fill");
          setTimeout(() => {
            meterFill.classList.add("active");
          }, 500);
        }
      }
    });
  },
  { threshold: 0.1 }
);

fadeSections.forEach((section) => observer.observe(section));

document.addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.animation = `zoomIn 0.8s ease-out`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

let days = 9;
let hours = 8;
let minutes = 42;
let seconds = 16;
const timeDisplay = document.getElementById("timeDisplay");

function updateTime() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }
  if (hours >= 24) {
    hours = 0;
    days++;
  }
  timeDisplay.textContent = `${days.toString().padStart(3, "0")}:${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

setInterval(updateTime, 1000);

function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  if (!music) {
    console.error("No music element found");
    return;
  }
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

window.onload = function () {
  const music = document.getElementById("backgroundMusic");
  const musicBtn = document.getElementById("musicBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const volumeSlider = document.getElementById("volumeSlider");
  const volumeControl = document.getElementById("volumeControl");

  if (!music || !musicBtn || !volumeSlider || !volumeControl) {
    console.error("Music or control elements not found");
    return;
  }

  music.volume = volumeSlider.value;

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

  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
    if (!volumeControl.classList.contains("visible")) {
      volumeControl.classList.add("visible");
      clearTimeout(hideVolumeTimeout);
      hideVolumeTimeout = setTimeout(
        () => volumeControl.classList.remove("visible"),
        2000
      );
    } else {
      volumeControl.classList.remove("visible");
    }
  });

  let hideVolumeTimeout = null;
  volumeSlider.addEventListener("input", (e) => {
    music.volume = e.target.value;
    console.log("Volume set to:", music.volume);
    clearTimeout(hideVolumeTimeout);
    volumeControl.classList.add("visible");
  });

  volumeSlider.addEventListener("change", () => {
    hideVolumeTimeout = setTimeout(
      () => volumeControl.classList.remove("visible"),
      2000
    );
  });

  volumeControl.addEventListener("mouseenter", () =>
    clearTimeout(hideVolumeTimeout)
  );
  volumeControl.addEventListener("mouseleave", () => {
    hideVolumeTimeout = setTimeout(
      () => volumeControl.classList.remove("visible"),
      2000
    );
  });

  volumeSlider.addEventListener("touchstart", (e) => {
    e.stopPropagation();
    clearTimeout(hideVolumeTimeout);
  });
  volumeSlider.addEventListener("touchend", () => {
    hideVolumeTimeout = setTimeout(
      () => volumeControl.classList.remove("visible"),
      2000
    );
  });

  document.addEventListener("click", (e) => {
    if (!volumeControl.contains(e.target) && !musicBtn.contains(e.target)) {
      volumeControl.classList.remove("visible");
      clearTimeout(hideVolumeTimeout);
    }
  });

  music.addEventListener("loadeddata", () => console.log("Audio data loaded"));
  music.addEventListener("error", (e) =>
    console.error("Audio error:", e.message)
  );
  music.addEventListener("play", () => console.log("Music play event"));
  music.addEventListener("pause", () => console.log("Music pause event"));
};
