/* ============================================================
   Nuestra pequeña cafetería — lógica de la escena
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const scene = $("#scene");
  const intro = $("#intro");
  const quote = $("#introQuote");
  const hint = $("#hint");
  const soundBtn = $("#soundBtn");
  const surpriseBtn = $("#surpriseBtn");
  const music = $("#bgMusic");

  const TOTAL = 6;
  let quoteTimers = [];
  /* orden en que se van desbloqueando los objetos */
  const ORDER = ["libro", "chocolate", "taza", "rosa", "foto", "galleta"];
  const visited = new Set();
  let celebrated = false;
  let muted = false;
  let pendingUnlock = null;

  /* ---------- Lluvia y estrellas en la ventana ---------- */

  function buildRain(count) {
    const rain = $("#rain");
    for (let i = 0; i < count; i++) {
      const d = document.createElement("span");
      d.className = "drop";
      d.style.left = Math.random() * 100 + "%";
      d.style.height = 10 + Math.random() * 9 + "px";
      d.style.opacity = (0.3 + Math.random() * 0.45).toFixed(2);
      d.style.animationDuration = (0.7 + Math.random() * 0.7).toFixed(2) + "s";
      d.style.animationDelay = (Math.random() * 2).toFixed(2) + "s";
      rain.appendChild(d);
    }
  }

  function buildStars(count) {
    const stars = $("#stars");
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "star";
      const size = 1 + Math.random() * 1.6;
      s.style.width = s.style.height = size.toFixed(1) + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDuration = (2 + Math.random() * 3).toFixed(2) + "s";
      s.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
      stars.appendChild(s);
    }
  }

  /* ---------- Sonido: lluvia + cafetera (Web Audio) + música ---------- */

  let audioCtx = null;
  let rainGain = null;

  function noiseBuffer(ctx) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function startAmbience() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = noiseBuffer(audioCtx);

      // lluvia constante: ruido filtrado grave
      const rainSrc = audioCtx.createBufferSource();
      rainSrc.buffer = buffer;
      rainSrc.loop = true;
      const lowpass = audioCtx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 850;
      rainGain = audioCtx.createGain();
      rainGain.gain.value = 0.09;
      rainSrc.connect(lowpass).connect(rainGain).connect(audioCtx.destination);
      rainSrc.start();

      // cafetera: un soplido de vapor al entrar
      const steamSrc = audioCtx.createBufferSource();
      steamSrc.buffer = buffer;
      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = 2600;
      bandpass.Q.value = 0.8;
      const steamGain = audioCtx.createGain();
      const t = audioCtx.currentTime;
      steamGain.gain.setValueAtTime(0, t);
      steamGain.gain.linearRampToValueAtTime(0.14, t + 0.9);
      steamGain.gain.linearRampToValueAtTime(0, t + 3);
      steamSrc.connect(bandpass).connect(steamGain).connect(audioCtx.destination);
      steamSrc.start(t);
      steamSrc.stop(t + 3.2);
    } catch (e) {
      /* sin Web Audio, la música sola acompaña */
    }
  }

  function setAmbience(musicVol, rainVol) {
    music.volume = musicVol;
    if (rainGain && audioCtx) {
      rainGain.gain.linearRampToValueAtTime(rainVol, audioCtx.currentTime + 2.5);
    }
  }

  function toggleSound() {
    muted = !muted;
    if (muted) {
      music.pause();
      if (audioCtx) audioCtx.suspend();
    } else {
      music.play().catch(() => {});
      if (audioCtx) audioCtx.resume();
    }
    $("i", soundBtn).className = muted
      ? "fa-solid fa-volume-xmark"
      : "fa-solid fa-volume-high";
  }

  /* ---------- Entrada a la escena ---------- */

  function enter() {
    intro.classList.add("hide");
    soundBtn.hidden = false;

    music.volume = 0.32;
    music.play().catch(() => {});
    startAmbience();

    scene.classList.add("in");

    quoteTimers.push(setTimeout(() => quote.classList.add("show"), 2200));
    quoteTimers.push(setTimeout(() => quote.classList.remove("show"), 9500));
    setTimeout(() => hint.classList.add("show"), 10200);
    setTimeout(() => hint.classList.remove("show"), 17000);
  }

  /* ---------- Progreso ---------- */

  function mark(name) {
    if (visited.has(name)) return;
    visited.add(name);
    const dot = $('.progress span[data-p="' + name + '"]');
    if (dot) dot.classList.add("lit");
  }

  function maybeCelebrate() {
    if (celebrated || visited.size < TOTAL) return;
    celebrated = true;
    scene.classList.add("dim");
    setAmbience(0.16, 0.05);
    setTimeout(() => surpriseBtn.classList.add("show"), 1600);
  }

  /* ---------- Escenarios ---------- */

  function openStage(name) {
    hint.classList.remove("show");
    /* la frase inicial no debe quedar sobre el escenario abierto */
    quoteTimers.forEach(clearTimeout);
    quoteTimers = [];
    quote.classList.remove("show");
    const stage = $('.stage[data-stage="' + name + '"]');
    if (stage) stage.classList.add("open");
  }

  function closeStage(stage) {
    stage.classList.remove("open");
    /* el objeto recién desbloqueado saluda al volver a la mesa */
    if (pendingUnlock) {
      const btn = pendingUnlock;
      pendingUnlock = null;
      btn.classList.add("unlock");
      setTimeout(() => btn.classList.remove("unlock"), 1000);
    }
    maybeCelebrate();
  }

  $$(".obj").forEach((btn) => {
    btn.addEventListener("click", () => openStage(btn.dataset.obj));
  });

  $$(".stage").forEach((stage) => {
    $(".stage-close", stage).addEventListener("click", () => closeStage(stage));
    stage.addEventListener("click", (e) => {
      if (e.target === stage) closeStage(stage);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = $(".stage.open");
    if (open) closeStage(open);
  });

  function markObjectDone(name) {
    mark(name);
    const btn = $('.obj[data-obj="' + name + '"]');
    if (btn) btn.classList.add("done");

    /* habilitar el siguiente objeto de la cadena */
    const next = ORDER[ORDER.indexOf(name) + 1];
    if (next) {
      const nextBtn = $('.obj[data-obj="' + next + '"]');
      if (nextBtn && nextBtn.disabled) {
        nextBtn.disabled = false;
        pendingUnlock = nextBtn;
      }
    }
  }

  /* Chocolate: se abre, aparece la nota y suben corazones */
  const choco = $("#choco");
  choco.addEventListener("click", () => {
    if (choco.classList.contains("open")) return;
    choco.classList.add("open");
    choco.closest(".stage").classList.add("acted");
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const h = document.createElement("span");
        h.className = "float-heart";
        h.textContent = "♥";
        h.style.fontSize = 14 + Math.random() * 16 + "px";
        h.style.setProperty("--hx", (Math.random() * 120 - 60).toFixed(0) + "px");
        choco.appendChild(h);
        setTimeout(() => h.remove(), 2800);
      }, 700 + i * 420);
    }
    markObjectDone("chocolate");
  });

  /* Taza: sale vapor y el mensaje se escribe en él */
  const cupScene = $("#cupScene");
  cupScene.addEventListener("click", () => {
    if (cupScene.classList.contains("touched")) return;
    cupScene.classList.add("touched");
    cupScene.closest(".stage").classList.add("acted");
    markObjectDone("taza");
  });

  /* Libro: hojas que se pasan como un libro real.
     La hoja que gira se mantiene por encima de todas hasta terminar
     el giro; si no, la página siguiente se lee antes de tiempo. */
  const sheets = $$(".sheet");
  const turning = new Set();
  let turnZ = 40;

  function updateSheetZ() {
    sheets.forEach((s, i) => {
      if (turning.has(s)) return;
      s.style.zIndex = s.classList.contains("flipped") ? i + 1 : 20 - i;
    });
  }
  updateSheetZ();

  function settleSheet(sheet) {
    if (turning.delete(sheet)) {
      sheet.classList.remove("turning");
      updateSheetZ();
    }
  }

  sheets.forEach((sheet, i) => {
    sheet.addEventListener("click", () => {
      const flipped = sheet.classList.contains("flipped");
      if (!flipped) {
        if (i > 0 && !sheets[i - 1].classList.contains("flipped")) return;
        sheet.classList.add("flipped");
        sheet.closest(".stage").classList.add("acted");
        markObjectDone("libro");
      } else {
        if (i < sheets.length - 1 && sheets[i + 1].classList.contains("flipped")) return;
        sheet.classList.remove("flipped");
      }
      turning.add(sheet);
      sheet.classList.add("turning");
      sheet.style.zIndex = ++turnZ;
      setTimeout(() => settleSheet(sheet), 1250);
    });

    sheet.addEventListener("transitionend", (e) => {
      if (e.target === sheet && e.propertyName === "transform") settleSheet(sheet);
    });
  });

  /* Rosa: gira, cae un pétalo y el pétalo trae un mensaje */
  const roseScene = $("#roseScene");
  const roseWrap = $("#roseWrap");
  roseWrap.addEventListener("click", () => {
    if (roseScene.classList.contains("spun")) return;
    roseScene.classList.add("spun");
    roseScene.closest(".stage").classList.add("acted");
    setTimeout(() => $("#petalNote").classList.add("show"), 3800);
    markObjectDone("rosa");
  });

  /* Fotografía: se toma y se gira */
  const polaroid = $("#polaroid");
  polaroid.addEventListener("click", () => {
    polaroid.classList.toggle("flipped");
    polaroid.closest(".stage").classList.add("acted");
    markObjectDone("foto");
  });

  /* Galleta: se rompe y aparece la fortuna */
  const cookie = $("#cookie");
  const cookieScene = $("#cookieScene");
  cookie.addEventListener("click", () => {
    if (cookie.classList.contains("cracked")) return;
    cookie.classList.add("cracked");
    cookieScene.classList.add("cracked");
    cookieScene.closest(".stage").classList.add("acted");
    for (let i = 0; i < 9; i++) {
      const c = document.createElement("span");
      c.className = "crumb";
      c.style.setProperty("--cx", (Math.random() * 160 - 80).toFixed(0) + "px");
      c.style.setProperty("--cy", (40 + Math.random() * 70).toFixed(0) + "px");
      c.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s";
      cookie.appendChild(c);
      setTimeout(() => c.remove(), 1600);
    }
    markObjectDone("galleta");
  });

  /* ---------- Última sorpresa ---------- */

  surpriseBtn.addEventListener("click", () => {
    surpriseBtn.classList.remove("show");
    $(".progress").style.opacity = "0";
    scene.classList.add("final");
    setAmbience(0.22, 0.02);
    setTimeout(() => $("#finalText").classList.add("show"), 1800);
    setTimeout(() => $("#continuarBtn").classList.add("visible"), 11000);
  });

  /* ---------- Continuar hacia buenas noches ---------- */

  $("#continuarBtn").addEventListener("click", () => {
    $("#continuarBtn").classList.remove("visible");
    $("#finalText").classList.remove("show");
    transicionA(
      "buenas-noches.html",
      "La lluvia se detuvo… y alguien dejó el cielo encendido para ti."
    );
  });

  /* ---------- Init ---------- */

  buildRain(42);
  buildStars(110);

  $("#enterBtn").addEventListener("click", enter);
  soundBtn.addEventListener("click", toggleSound);
})();
