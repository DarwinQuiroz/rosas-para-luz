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
  // Si falla, mostrar el botón
  playButton.style.display = "block";
});

// Cuando el usuario hace clic, reproducir manualmente
playButton.addEventListener("click", () => {
  audio
    .play()
    .then(() => {
      playButton.style.display = "none";
    })
    .catch((err) => {
      alert("No se pudo reproducir el audio: " + err.message);
    });
});
