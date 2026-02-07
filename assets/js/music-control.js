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