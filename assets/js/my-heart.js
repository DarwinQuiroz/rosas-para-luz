const PHRASES = [
  "Mi pensamiento favorito del día. ✨💖",
  "Tu sonrisa ilumina todo. 🌙💖",
  "Amo cómo haces que todo sea mejor. 🏡💖",
  "Solo quiero verte feliz. 🌟💖",
  "La calma que mi alma buscaba. 🎶💖",
  "Tu mirada tiene algo que me atrapa. 💫💖",
  "Eres mi instante favorito del día. 🔥💖",
  "No sé qué tienes, pero lo tienes todo. 💖",
  "Cada latido lleva tu nombre. 💖",
  "Eres mi sueño hecho realidad. 🎨💖",
  "Tu sonrisa es mi perdición. 🗺️💖",
  "Desde que llegaste, nada es igual. ⏰💖",
];

const scene = document.getElementById("scene");
const heartBtn = document.getElementById("heartBtn");
const musicPlayer = document.getElementById("musicPlayer");
const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");

const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");

let isProcessing = false;
let firstClick = true;
let isPlaying = false;

const triggerRelease = (e) => {
  if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") {
    return;
  }
  e.preventDefault();

  if (isProcessing) return;
  isProcessing = true;

  // Start music on first click
  if (firstClick) {
    activateMusic();
    firstClick = false;
  }

  releasePhrase();

  setTimeout(() => {
    isProcessing = false;
  }, 300);
};

const activateMusic = () => {
  musicPlayer.classList.add("active");
  audioPlayer
    .play()
    .then(() => {
      isPlaying = true;
      showPauseIcon();
    })
    .catch((e) => {
      console.log("Error playing audio:", e);
    });
};

const showPlayIcon = () => {
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
};

const showPauseIcon = () => {
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
};

const togglePlayPause = () => {
  if (isPlaying) {
    audioPlayer.pause();
    showPlayIcon();
    isPlaying = false;
  } else {
    audioPlayer
      .play()
      .then(() => {
        showPauseIcon();
        isPlaying = true;
      })
      .catch((e) => {
        console.log("Error playing audio:", e);
      });
  }
};

const updateProgress = () => {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = progress + "%";

    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
  }
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ":" + (secs < 10 ? "0" : "") + secs;
};

const seekAudio = (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const newTime = (clickX / rect.width) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
};

heartBtn.addEventListener("click", triggerRelease);
heartBtn.addEventListener("keydown", triggerRelease);
playPauseBtn.addEventListener("click", togglePlayPause);
progressBar.addEventListener("click", seekAudio);
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("loadedmetadata", updateProgress);

const releasePhrase = () => {
  heartBtn.classList.add("clicked");
  setTimeout(() => heartBtn.classList.remove("clicked"), 700);

  createParticlesBurst();
  createPhrase();
};

const createPhrase = () => {
  const phraseText = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  const el = document.createElement("div");
  el.className = "phrase shooting";
  el.textContent = phraseText;

  const heartRect = heartBtn.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();

  const startX = heartRect.left + heartRect.width / 2 - sceneRect.left;
  const startY = heartRect.top + heartRect.height / 2 - sceneRect.top;

  el.style.left = startX + "px";
  el.style.top = startY + "px";

  const angle = Math.random() * 120 - 150;
  const shootForce = rand(150, 230);
  const shootX = Math.cos((angle * Math.PI) / 180) * shootForce;
  const shootY = Math.sin((angle * Math.PI) / 180) * shootForce;

  const fallDistance = rand(250, 450);
  const horizontalDrift = rand(-120, 120);
  const finalX = shootX + horizontalDrift;
  const finalY = shootY + fallDistance;

  const initialRotation = rand(-20, 20);
  const finalRotation = initialRotation + rand(-40, 40);
  const duration = rand(4.5, 6.5);

  el.style.setProperty("--shoot-x", shootX + "px");
  el.style.setProperty("--shoot-y", shootY + "px");
  el.style.setProperty("--final-x", finalX + "px");
  el.style.setProperty("--final-y", finalY + "px");
  el.style.setProperty("--rotation", initialRotation + "deg");
  el.style.setProperty("--final-rotation", finalRotation + "deg");
  el.style.setProperty("--duration", duration + "s");

  scene.appendChild(el);
  el.addEventListener("animationend", () => el.remove(), { once: true });
};

const createParticlesBurst = () => {
  const heartRect = heartBtn.getBoundingClientRect();
  const sceneRect = scene.getBoundingClientRect();
  const centerX = heartRect.left + heartRect.width / 2 - sceneRect.left;
  const centerY = heartRect.top + heartRect.height / 2 - sceneRect.top;

  const particleCount = rand(10, 15);
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle burst";

    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";

    const angle = Math.random() * 360;
    const distance = rand(50, 90);
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    particle.style.setProperty("--particle-x", x + "px");
    particle.style.setProperty("--particle-y", y + "px");

    scene.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove(), {
      once: true,
    });
  }
};

const rand = (min, max) => {
  return Math.random() * (max - min) + min;
};
