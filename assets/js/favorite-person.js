let typewriterTimeout = null;

function typeLine(lineElement, text, speed = 20, onDone) {
  const textSpan = lineElement.querySelector(".text");
  const cursor = lineElement.querySelector(".cursor");
  const typewriterContainer = document.getElementById("typewriterText");
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
  typewriterText.innerHTML = "";

  const letterContent = `Me detuve a admirarte mientras tú sonreías, y vaya que tienes una sonrisa preciosa, puedo decir que le agregas luz a los días oscuros, que hace feliz a mis ojos cada vez que te miran, que contagias de alegría un día aburrido. Me encanta cuando te admiro, por que soy fan de los atardeceres, pero más de tu sonrisa.`;

  const texts = letterContent.split("\\n").filter((line) => line.trim() !== "");

  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  texts.forEach(() => {
    const line = document.createElement("span");
    line.classList.add("line");
    line.innerHTML = '<span class="text"></span><span class="cursor"></span>';
    typewriterText.appendChild(line);
    typewriterText.appendChild(document.createElement("br"));
  });

  const lines = typewriterText.querySelectorAll(".line");

  overlay.classList.add("show");

  function typeNextLine(index) {
    if (index < lines.length && index < texts.length) {
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

  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }

  typewriterText.innerHTML = "";

  overlay.classList.remove("show");
});

window.onclick = function (event) {
  const overlay = document.getElementById("letterOverlay");
  if (event.target === overlay) {
    const typewriterText = document.getElementById("typewriterText");

    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }

    typewriterText.innerHTML = "";

    overlay.classList.remove("show");
  }
};

const slideElements = document.querySelectorAll(".carousel .image-container");
// const prevButton = document.getElementById("prev-slide");
// const nextButton = document.getElementById("next-slide");

let currentSlide = 0;
const totalSlides = slideElements.length;

function showSlide(index) {
  if (index >= totalSlides) {
    index = 0;
  } else if (index < 0) {
    index = totalSlides - 1;
  }

  slideElements[currentSlide].classList.remove("active");
  slideElements[currentSlide].style.transform = "translateX(-100%)";

  currentSlide = index;
  slideElements[currentSlide].classList.add("active");
  slideElements[currentSlide].style.transform = "translateX(0)";
}

if (totalSlides > 0) {
  // prevButton.addEventListener("click", () => {
  //   showSlide(currentSlide - 1);
  // });

  // nextButton.addEventListener("click", () => {
  //   showSlide(currentSlide + 1);
  // });

  slideElements[0].classList.add("active");

  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

const countdownDate = new Date("2025-05-03").getTime();
if (!isNaN(countdownDate)) {
  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = now - countdownDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }, 1000);
} else {
  document.getElementById("days").textContent = "00";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";
}

const decorationsContainer = document.getElementById("decorations-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
  decorationsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

function createStarHeart() {
  const points = [];
  const numStars = 80;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const scaleFactor = isMobile ? 0.6 : 1;

  for (let i = 0; i < numStars; i++) {
    const t = (i / numStars) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    points.push({ x: x * 16 * scaleFactor, y: y * 12 * scaleFactor });
  }

  points.forEach((point, index) => {
    setTimeout(() => {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.position = "absolute";
      star.style.left = `calc(50vw + ${point.x}px)`;
      star.style.top = `calc(50vh + ${point.y}px)`;
      star.style.background = "linear-gradient(45deg, #ff0000, #cc0000)";
      star.style.width = isMobile ? "25px" : "35px";
      star.style.height = isMobile ? "25px" : "35px";
      star.style.clipPath =
        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
      star.style.boxShadow = "0 0 12px rgba(255, 0, 0, 0.9)";
      decorationsContainer.appendChild(star);
      setTimeout(() => star.remove(), 10000);
    }, index * 50);
  });
}

function createFirework() {
  const firework = document.createElement("div");
  firework.classList.add("firework");
  const hue = Math.random() * 360;
  firework.style.setProperty("--c", `hsl(${hue}, 100%, 55%)`);
  firework.style.left = `${Math.random() * 80 + 10}vw`;
  decorationsContainer.appendChild(firework);

  const trailInterval = setInterval(() => {
    const trail = document.createElement("div");
    trail.classList.add("firework-particle", "trail");
    trail.style.left = firework.style.left;
    trail.style.top = firework.style.top;
    trail.style.setProperty("--c", `hsl(${hue}, 100%, 65%)`);
    trail.style.width = `${Math.random() * 4 + 4}px`;
    trail.style.height = `${Math.random() * 8 + 6}px`;
    trail.style.opacity = "5.9";
    trail.style.transform = `rotate(${Math.random() * 360}deg)`;
    decorationsContainer.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
  }, 20);

  setTimeout(() => {
    clearInterval(trailInterval);
    firework.style.display = "none";

    const explosionType = Math.random();
    let particleCount, radius, pattern;
    if (explosionType < 0.4) {
      particleCount = Math.floor(Math.random() * 60 + 80);
      radius = Math.random() * 200 + 150;
      pattern = "circular";
    } else if (explosionType < 0.7) {
      particleCount = Math.floor(Math.random() * 40 + 60);
      radius = Math.random() * 180 + 120;
      pattern = "star";
    } else {
      particleCount = Math.floor(Math.random() * 50 + 70);
      radius = Math.random() * 160 + 100;
      pattern = "ring";
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("firework-particle");
      particle.style.left = firework.style.left;
      particle.style.top = "20vh";
      const particleHue = hue + (Math.random() * 20 - 10);
      const neonColor = `hsl(${particleHue}, 100%, 55%)`;
      particle.style.background = neonColor;
      particle.style.boxShadow = `
                        0 0 6px ${neonColor},
                        0 0 12px ${neonColor},
                        0 0 20px ${neonColor}`;
      particle.style.filter = "brightness(1.4) contrast(1.2)";

      particle.style.width = `${Math.random() * 6 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.opacity = "5.9";
      particle.style.filter = "blur(0.3px)";

      let angle, distance;
      if (pattern === "star") {
        const starPoints = 5;
        angle =
          (i % starPoints) * (360 / starPoints) + (Math.random() * 20 - 10);
        distance = radius * (Math.floor(i / starPoints) % 2 === 0 ? 1 : 0.5);
      } else if (pattern == "ring") {
        angle = (i / particleCount) * 360;
        distance = radius * (1 + Math.random() * 0.1);
      } else {
        angle = Math.random() * 360;
        distance = radius * Math.sqrt(Math.random());
      }

      const vx = Math.cos((angle * Math.PI) / 180) * distance;
      const vy = Math.sin((angle * Math.PI) / 180) * distance + 50;
      particle.style.setProperty("--px", `${vx}px`);
      particle.style.setProperty("--py", `${vy}px`);
      particle.style.animationDelay = `${Math.random() * 0.4}s`;
      decorationsContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);

      if (Math.random() < 0.3) {
        const sparkleInterval = setInterval(() => {
          const sparkle = document.createElement("div");
          sparkle.classList.add("firework-particle", "sparkle");
          sparkle.style.left = particle.style.left;
          sparkle.style.top = particle.style.top;
          sparkle.style.background = `hsl(${particleHue}, 80%, 90%)`;
          sparkle.style.width = "3px";
          sparkle.style.height = "3px";
          sparkle.style.opacity = "0.6";
          sparkle.style.filter = "blur(1px)";
          decorationsContainer.appendChild(sparkle);
          setTimeout(() => sparkle.remove(), 400);
        }, 50);
        setTimeout(() => clearInterval(sparkleInterval), 800);
      }
    }

    if (Math.random() < 0.4) {
      setTimeout(() => {
        const secondaryCount = Math.floor(Math.random() * 30 + 40);
        for (let i = 0; i < secondaryCount; i++) {
          const particle = document.createElement("div");
          particle.classList.add("firework-particle");
          particle.style.left = firework.style.left;
          particle.style.top = "25vh";
          const particleHue = hue + (Math.random() * 30 - 15);
          particle.style.background = `hsl(${particleHue}, 80%, ${
            Math.random() * 15 + 65
          }%)`;
          particle.style.width = `${Math.random() * 5 + 3}px`;
          particle.style.height = particle.style.width;
          particle.style.opacity = "0.8";
          particle.style.boxShadow = `0 0 6px hsl(${particleHue}, 80%, 85%)`;
          const angle = Math.random() * 360;
          const distance = Math.random() * 100 + 50;
          particle.style.setProperty(
            "--px",
            `${Math.cos((angle * Math.PI) / 180) * distance}px`
          );
          particle.style.setProperty(
            "--py",
            `${Math.sin((angle * Math.PI) / 180) * distance}px`
          );
          particle.style.animationDelay = `${Math.random() * 0.2}s`;
          decorationsContainer.appendChild(particle);
          setTimeout(() => particle.remove(), 1200);
        }
      }, 300);
    }

    setTimeout(() => firework.remove(), 1500);
  }, 1500);
}

function createLoveLetter() {
  const letter = document.createElement("div");
  letter.classList.add("love-letter");
  const messages = [
    "\u2764\ufe0f Mi hermosa Luz",
    "\u2764\ufe0f Mi lugar favorito",
    "\ud83d\udc8c Mi calma y mi tormenta",
    "\ud83e\udd70 Te amo",
  ];
  letter.textContent = messages[Math.floor(Math.random() * messages.length)];
  letter.style.left = `${Math.random() * 100}vw`;
  letter.style.animationDuration = `${Math.random() * 6 + 6}s`;
  decorationsContainer.appendChild(letter);
  setTimeout(() => letter.remove(), 12000);
}

document.getElementById("heart-rain-btn").addEventListener("click", () => {
  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 100);
  }
});

document
  .getElementById("star-heart-btn")
  .addEventListener("click", createStarHeart);

document.getElementById("fireworks-btn").addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(createFirework, i * 300);
  }
});

document.getElementById("love-letters-btn").addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    setTimeout(createLoveLetter, i * 200);
  }
});

function setupMusicControls() {
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

  // Attempt autoplay
  music.load();
  music.currentTime = 0;
  music
    .play()
    .then(() => {
      // console.log("Autoplay successful at:", music.currentTime);
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline-block";
    })
    .catch((error) => {
      console.warn("Autoplay blocked:", error.message);
    });

  function toggleMusic() {
    if (music.paused) {
      music
        .play()
        .then(() => {
          // console.log("Music playing at:", music.currentTime);
          playIcon.style.display = "none";
          pauseIcon.style.display = "inline-block";
        })
        .catch((error) => {
          console.error("Error playing audio:", error.message);
        });
    } else {
      music.pause();
      // console.log("Music paused at:", music.currentTime);
      playIcon.style.display = "inline-block";
      pauseIcon.style.display = "none";
    }
  }

  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMusic();
    if (!volumeControl.classList.contains("visible")) {
      // volumeControl.classList.add("visible");
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
    // console.log("Volume set to:", music.volume);
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

  // music.addEventListener("loadeddata", () => console.log("Audio data loaded"));
  music.addEventListener("error", (e) =>
    console.error("Audio error:", e.message)
  );
  // music.addEventListener("play", () => console.log("Music play event"));
  // music.addEventListener("pause", () => console.log("Music pause event"));
}

// Initialize music controls when the page loads
setupMusicControls();
