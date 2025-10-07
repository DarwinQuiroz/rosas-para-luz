// Configuración
const phrases = [
  "Eres la estrella que ilumina mi universo",
  "Cada momento a tu lado es un regalo",
  "Tu sonrisa es mi lugar favorito",
  "Eres mi pensamiento favorito",
  "Contigo hasta el fin del universo",
  "Eres mi sueño hecho realidad",
  "Te amo más que a las estrellas",
];

// Variables
let currentSlide = 0;
let slideInterval;
const totalSlides = phrases.length;
const starsContainer = document.getElementById("stars");
const introScreen = document.getElementById("intro-screen");
const heart = document.getElementById("heart");
const bgMusic = document.getElementById("bg-music");
const progressDots = document.getElementById("progress-dots");
const slides = document.querySelectorAll(".slide");

// Inicialización
function init() {
  createProgressDots();
  preloadImages();
  setEventListeners();
}

// Crear puntos de progreso
function createProgressDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    if (i === 0) dot.classList.add("active");
    progressDots.appendChild(dot);
  }
}

// Precargar imágenes para mejor experiencia
function preloadImages() {
  const images = document.querySelectorAll(".slide img");
  images.forEach((img) => {
    const image = new Image();
    image.src = img.src;
  });
}

// Efecto hacker para el texto
const hackerLetters = "01!@#$%^&*()_+-=[]{}|;:,.<>?/";

function hackerEffect(element, finalText, iterations = 3) {
  let iteration = 0;

  const interval = setInterval(() => {
    element.textContent = element.textContent
      .split("")
      .map((letter, index) => {
        if (index < iteration || letter === " ") {
          return finalText[index];
        }
        return hackerLetters[Math.floor(Math.random() * hackerLetters.length)];
      })
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(interval);
      element.classList.add("complete"); // Añadir clase para el brillo fuerte
    }

    iteration += 1 / iterations;
  }, 30);
}

// Crear estrellas que caen
function createStars() {
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Tamaño aleatorio entre 1px y 3px
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Posición aleatoria
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * -100}px`;

    // Duración de animación aleatoria entre 5s y 15s
    const duration = Math.random() * 10 + 5;
    star.style.animationDuration = `${duration}s`;

    // Retraso aleatorio
    star.style.animationDelay = `${Math.random() * 5}s`;

    starsContainer.appendChild(star);
  }
}

// Cambiar slide
function showSlide(index) {
  // Validar índice
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  currentSlide = index;

  // Ocultar todos los slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Mostrar slide actual
  slides[index].classList.add("active");

  // Actualizar puntos de progreso
  document.querySelectorAll(".dot").forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Remover clase de brillo fuerte de todos los mensajes
  document.querySelectorAll(".hacker-text").forEach((text) => {
    text.classList.remove("complete");
  });

  // Aplicar efecto hacker al mensaje
  const messageElement = document.querySelector(
    `#message${index + 1} .hacker-text`
  );
  hackerEffect(messageElement, phrases[index]);

  // Reiniciar el intervalo
  resetSlideInterval();
}

// Avanzar al siguiente slide
function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

// Retroceder al slide anterior
function prevSlide() {
  showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

// Iniciar presentación
function startPresentation() {
  introScreen.style.opacity = "0";
  setTimeout(() => {
    introScreen.style.display = "none";
  }, 1000);

  createStars();
  showSlide(0);

  // Reproducir música
  bgMusic.volume = 0.3; // Volumen más bajo para mejor experiencia

  // const timeMusic = bgMusic.currentTime;
  // bgMusic.currentTime = timeMusic + 10;

  bgMusic.play().catch((e) => console.log("Autoplay bloqueado:", e));

  // Iniciar intervalo para cambiar slides automáticamente
  resetSlideInterval();
}

// Reiniciar el intervalo de cambio de slides
function resetSlideInterval() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 8000);
}

// Configurar event listeners
function setEventListeners() {
  // Iniciar presentación al hacer clic en el corazón
  heart.addEventListener("click", startPresentation);

  // Permitir clic en cualquier parte para avanzar
  document.addEventListener("click", (e) => {
    if (
      introScreen.style.display === "none" &&
      !e.target.classList.contains("dot")
    ) {
      nextSlide();
    }
  });

  // Navegación por teclado
  document.addEventListener("keydown", (e) => {
    if (introScreen.style.display === "none") {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  // Navegación por puntos
  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      showSlide(index);
    });
  });

  // Ajustar tamaño de imágenes al cargar y al redimensionar
  window.addEventListener("load", adjustImages);
  window.addEventListener("resize", adjustImages);
}

// Ajustar tamaño de imágenes
function adjustImages() {
  const images = document.querySelectorAll(".slide img");
  const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.5, 300);

  images.forEach((img) => {
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
  });
}

// Inicializar la aplicación
init();
