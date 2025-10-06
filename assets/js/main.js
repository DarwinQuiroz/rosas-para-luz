onload = () => {
  document.body.classList.remove("container");

  // setTimeout(() => {
  //   window.scrollTo({
  //     top: document.body.scrollHeight, // posición final de la página
  //     behavior: "smooth", // scroll animado
  //   });
  // }, 8500);
};

const audio = document.getElementById("musica");
const playButton = document.getElementById("playButton");

audio.play().catch(() => {
  playButton.style.display = "block";
  setTimeout(() => {
    playButton.style.opacity = "1";
  }, 50);
});

// Reproducir al hacer clic y lanzar corazones
playButton.addEventListener("click", () => {
  audio
    .play()
    .then(() => {
      // corazones animados
      for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 200);
      }
      setTimeout(() => {
        playButton.style.display = "none";
      }, 1500);
    })
    .catch((err) => {
      alert("No se pudo reproducir el audio: " + err.message);
    });
});

// Efecto de corazones flotantes
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  document.body.appendChild(heart);

  // posición aleatoria cerca del botón
  const x = window.innerWidth - 100 + Math.random() * 50;
  const y = 50 + Math.random() * 20;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  // tamaño aleatorio
  heart.style.fontSize = `${16 + Math.random() * 10}px`;

  // eliminar después de animar
  setTimeout(() => heart.remove(), 2000);
}
