/* ==========================================================================
   Flores Amarillas para Ti — datos de contenido
   Separado de la lógica para poder personalizarlo fácilmente.
   ========================================================================== */

const YF_DATA = {
  name: "Luz",

  bouquet: [
    { id: "b1", message: "Esta es por tu sonrisa." },
    {
      id: "b2",
      message:
        "Esta es por esos pequeños detalles que quizá tú no notas, pero yo sí.",
    },
    {
      id: "b3",
      message: "Esta es por convertir momentos normales en recuerdos bonitos.",
    },
    {
      id: "b4",
      message:
        "Esta es por todas esas veces en las que lograste alegrar un día sin siquiera intentarlo.",
    },
    {
      id: "b5",
      message:
        "Esta simplemente es porque sí. Porque también mereces flores sin necesitar una razón.",
    },
  ],

  reasons: [
    {
      id: 1,
      type: "sunflower",
      message:
        "Tienes una forma muy tuya de convertir pequeños momentos en recuerdos bonitos.",
    },
    { id: 2, type: "daisy", message: "Me gusta cómo te emocionas por cosas pequeñas." },
    {
      id: 3,
      type: "daisy",
      message: "Tu risa tiene un sonido que se queda dando vueltas en mi cabeza.",
    },
    {
      id: 4,
      type: "special",
      message:
        "Aquel día que no dijimos casi nada, pero se sintió como una conversación completa.",
    },
    { id: 5, type: "sunflower", message: "Contigo hasta el silencio se siente cómodo." },
    {
      id: 6,
      type: "daisy",
      message: "Me gusta que te tomes en serio las cosas que te importan.",
    },
    {
      id: 7,
      type: "daisy",
      message:
        "Esa manía tuya de preguntar “¿estás bien?” como si de verdad importara la respuesta. Y sí importa.",
    },
    {
      id: 8,
      type: "special",
      message:
        "El recuerdo de esa tarde que se hizo corta porque estábamos hablando de todo y de nada.",
    },
    {
      id: 9,
      type: "daisy",
      message: "Tu forma de cuidar a las personas sin hacer ruido por ello.",
    },
    {
      id: 10,
      type: "sunflower",
      message: "Haces que las cosas simples se sientan importantes, solo por estar ahí.",
    },
    {
      id: 11,
      type: "daisy",
      message: "Esa costumbre tuya de recordar detalles que yo mismo olvido.",
    },
    {
      id: 12,
      type: "golden",
      hidden: true,
      message:
        "Y esta razón es simplemente... que existes, y de alguna manera eso hace que todo tenga un poquito más de sentido.",
    },
  ],

  memories: [
    {
      date: "14 · 02",
      icon: "🌼",
      caption: "El día que sonreíste sin razón aparente.",
      story:
        "A veces los mejores recuerdos no capturan un evento grande: capturan justo ese segundo en el que fuiste completamente tú.",
    },
    {
      date: "03 · 05",
      icon: "🌻",
      caption: "Esa tarde que se hizo eterna sin darnos cuenta.",
      story:
        "El tiempo pasó distinto ese día. No sé si fue el lugar o la compañía, pero no quise que terminara.",
    },
    {
      date: "21 · 09",
      icon: "🌸",
      caption: "Un mensaje random que me sacó una sonrisa tonta.",
      story:
        "No hacen falta grandes gestos. A veces basta un mensaje que llega justo cuando se necesita.",
    },
    {
      date: "—",
      icon: "🌿",
      caption: "Este que estamos guardando ahora mismo.",
      story:
        "Todavía no sé cómo se va a ver este recuerdo, pero ya sé que quiero guardarlo.",
    },
  ],

  letter: [
    "Tal vez podría haberte regalado simplemente un ramo de flores amarillas...",
    "Pero quería regalarte algo que no se marchitara después de unos días.",
    "Un pequeño lugar al que pudieras volver cuando quisieras recordar lo especial que eres.",
    "Así que decidí plantar algo diferente.",
    "Un jardín hecho de recuerdos, palabras y todas esas pequeñas razones que me hacen pensar en ti.",
  ],

  plantPhrases: [
    "Para los días en los que necesites recordar cuánto vales.",
    "Para cuando necesites una razón para sonreír.",
    "Para recordar que alguien piensa en ti.",
    "Para esos días en los que necesitas un poquito de luz.",
    "Para todos los momentos bonitos que todavía faltan por vivir.",
  ],

  easterEggs: {
    heroFlower: "Creo que esta flor te gustó bastante. 🌼",
    goldenFlower: "Las cosas especiales no siempre son las más fáciles de encontrar.",
    butterflyFound: "🦋 Encontraste algo.",
    butterflyMessage:
      "Quizá algunas cosas bonitas no están hechas para quedarse quietas, sino para acompañarte un momento.",
    gardenComplete:
      "Has encontrado cada rincón de este jardín. Gracias por quedarte a mirar tan de cerca. 🌻",
  },
};

/* ==========================================================================
   Estado persistente
   ========================================================================== */

const YF_STORAGE_KEY = "yf_state_v1";

function yfLoadState() {
  try {
    const raw = localStorage.getItem(YF_STORAGE_KEY);
    if (!raw) throw new Error("empty");
    const parsed = JSON.parse(raw);
    return {
      discoveredReasons: parsed.discoveredReasons || [],
      plantedCount: parsed.plantedCount || 0,
      secrets: parsed.secrets || { golden: false, butterfly: false },
      reducedMotion: !!parsed.reducedMotion,
      heroClicks: parsed.heroClicks || 0,
      heroEggShown: !!parsed.heroEggShown,
      gardenCompleteShown: !!parsed.gardenCompleteShown,
    };
  } catch (e) {
    return {
      discoveredReasons: [],
      plantedCount: 0,
      secrets: { golden: false, butterfly: false },
      reducedMotion: false,
      heroClicks: 0,
      heroEggShown: false,
      gardenCompleteShown: false,
    };
  }
}

function yfSaveState() {
  try {
    localStorage.setItem(YF_STORAGE_KEY, JSON.stringify(yfState));
  } catch (e) {
    /* localStorage no disponible: la experiencia sigue funcionando sin persistencia */
  }
}

const yfState = yfLoadState();

/* ==========================================================================
   Utilidades
   ========================================================================== */

function yfPrefersReducedMotion() {
  return (
    yfState.reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function yfIsFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function flowerSVG(petalCount, opts) {
  const rx = opts && opts.rx ? opts.rx : 11;
  const ry = opts && opts.ry ? opts.ry : 24;
  const core = opts && opts.core ? opts.core : 13;
  let petals = "";
  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i;
    const transform = angle === 0 ? "" : ` transform="rotate(${angle} 50 50)"`;
    petals += `<ellipse cx="50" cy="${50 - ry}" rx="${rx}" ry="${ry}" class="petal"${transform}></ellipse>`;
  }
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g class="petals">${petals}</g><circle cx="50" cy="50" r="${core}" class="core"></circle></svg>`;
}

const YF_FLOWER_TYPES = {
  sunflower: { petals: 10, rx: 8, ry: 26, core: 12 },
  daisy: { petals: 6, rx: 10, ry: 22, core: 10 },
  special: { petals: 8, rx: 9, ry: 24, core: 11 },
  golden: { petals: 6, rx: 10, ry: 22, core: 10 },
};

function typedFlowerSVG(type) {
  const cfg = YF_FLOWER_TYPES[type] || YF_FLOWER_TYPES.daisy;
  return flowerSVG(cfg.petals, cfg);
}

let yfToastTimer = null;
function showToast(message, duration) {
  const toast = document.getElementById("yfToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(yfToastTimer);
  yfToastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, duration || 4200);
}

/* ==========================================================================
   Inicio
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMotionToggle();
  initMusic();
  initPetalsField();
  initScrollReveal();
  initProgressIndicator();
  initHeroFlower();
  initBouquet();
  initReasonsGarden();
  initMemories();
  initLetter();
  initPlantGarden();
  initFinalFlower();
  initButterflies();
  initCursorPetals();
});

/* ---------- Accesibilidad: reducir movimiento ---------- */

function initMotionToggle() {
  const btn = document.getElementById("motionButton");
  if (!btn) return;

  function apply() {
    document.body.classList.toggle("reduced-motion", yfState.reducedMotion);
    btn.setAttribute("aria-pressed", String(yfState.reducedMotion));
    btn.classList.toggle("is-active", yfState.reducedMotion);
  }

  apply();

  btn.addEventListener("click", () => {
    yfState.reducedMotion = !yfState.reducedMotion;
    yfSaveState();
    apply();
  });
}

/* ---------- Música (solo tras interacción) ---------- */

function initMusic() {
  const audio = document.getElementById("musica");
  const btn = document.getElementById("playButton");
  const slider = document.getElementById("volumeSlider");
  if (!audio || !btn) return;

  audio.volume = slider ? parseFloat(slider.value) : 0.5;

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      btn.setAttribute("aria-pressed", "true");
      btn.querySelector("i").className = "fa-solid fa-volume-high";
    } else {
      audio.pause();
      btn.setAttribute("aria-pressed", "false");
      btn.querySelector("i").className = "fa-solid fa-music";
    }
  });

  if (slider) {
    slider.addEventListener("input", () => {
      audio.volume = parseFloat(slider.value);
    });
  }
}

/* ---------- Pétalos cayendo ---------- */

function initPetalsField() {
  const field = document.getElementById("petalsField");
  if (!field) return;

  const MAX_PETALS = yfIsFinePointer() ? 16 : 8;

  function spawnPetal() {
    if (yfPrefersReducedMotion()) return;
    if (field.childElementCount >= MAX_PETALS) return;
    if (document.hidden) return;

    const petal = document.createElement("div");
    petal.className = "petal-particle";

    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const drift = (Math.random() - 0.5) * 160;
    const size = 10 + Math.random() * 8;

    petal.style.left = `${left}vw`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.setProperty("--drift", `${drift}px`);

    petal.addEventListener("animationend", () => petal.remove());
    field.appendChild(petal);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(spawnPetal, i * 500);
  }

  setInterval(spawnPetal, 1500);
}

function burstPetals(x, y, count) {
  if (yfPrefersReducedMotion()) return;
  const field = document.getElementById("petalsField");
  if (!field) return;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal-burst";

    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const bx = Math.cos(angle) * distance;
    const by = Math.sin(angle) * distance - 20;

    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;
    petal.style.setProperty("--bx", `${bx}px`);
    petal.style.setProperty("--by", `${by}px`);

    petal.addEventListener("animationend", () => petal.remove());
    field.appendChild(petal);
  }
}

/* ---------- Revelado al hacer scroll ---------- */

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Indicador de progreso (tallo → flor) ---------- */

function initProgressIndicator() {
  const fill = document.getElementById("progressFill");
  const flower = document.getElementById("progressFlower");
  if (!fill || !flower) return;

  let ticking = false;

  function update() {
    ticking = false;
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;

    const isHorizontal = window.matchMedia("(max-width: 860px)").matches;
    if (isHorizontal) {
      fill.style.width = `${pct}%`;
      fill.style.height = "";
    } else {
      fill.style.height = `${pct}%`;
      fill.style.width = "";
    }
    flower.classList.toggle("is-full", pct >= 99);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}

/* ---------- 1. Flor del hero ---------- */

function initHeroFlower() {
  const flower = document.getElementById("heroFlower");
  const startBtn = document.getElementById("heroStartBtn");

  function trigger() {
    if (!flower) return;
    flower.classList.remove("is-bumped");
    void flower.offsetWidth;
    flower.classList.add("is-bumped");

    const rect = flower.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top + rect.height / 2, 6);

    yfState.heroClicks += 1;
    if (yfState.heroClicks >= 5 && !yfState.heroEggShown) {
      yfState.heroEggShown = true;
      showToast(YF_DATA.easterEggs.heroFlower);
    }
    yfSaveState();
  }

  if (flower) {
    flower.addEventListener("click", trigger);
    flower.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  }

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      trigger();
      document.getElementById("regalo").scrollIntoView({ behavior: "smooth" });
    });
  }
}

/* ---------- 2. Ramo interactivo ---------- */

function initBouquet() {
  const field = document.getElementById("bouquetField");
  const outro = document.getElementById("bouquetOutro");
  if (!field) return;

  let opened = 0;

  YF_DATA.bouquet.forEach((item) => {
    const wrap = document.createElement("div");
    wrap.className = "bouquet-flower";
    wrap.innerHTML = `
      <button class="bouquet-flower__btn" data-id="${item.id}" aria-label="Tocar flor">
        ${flowerSVG(6, { rx: 11, ry: 24, core: 13 })}
      </button>
      <p class="bouquet-flower__msg"></p>
    `;
    const btn = wrap.querySelector(".bouquet-flower__btn");
    const msg = wrap.querySelector(".bouquet-flower__msg");

    btn.addEventListener("click", () => {
      if (wrap.classList.contains("is-open")) return;
      wrap.classList.add("is-open");
      msg.textContent = item.message;

      const rect = btn.getBoundingClientRect();
      burstPetals(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);

      opened += 1;
      if (opened === YF_DATA.bouquet.length && outro) {
        outro.hidden = false;
        outro.classList.add("reveal");
        requestAnimationFrame(() => outro.classList.add("in-view"));
      }
    });

    field.appendChild(wrap);
  });
}

/* ---------- 3. Jardín de razones ---------- */

function initReasonsGarden() {
  const garden = document.getElementById("reasonsGarden");
  const countEl = document.getElementById("reasonsCount");
  const totalEl = document.getElementById("reasonsTotal");
  const modal = document.getElementById("reasonModal");
  if (!garden || !modal) return;

  const icon = document.getElementById("reasonModalIcon");
  const label = document.getElementById("reasonModalLabel");
  const title = document.getElementById("reasonModalTitle");
  const text = document.getElementById("reasonModalText");
  const saveBtn = document.getElementById("reasonModalSave");
  const closeBtn = document.getElementById("reasonModalClose");

  let currentReason = null;
  let lastFocused = null;

  if (totalEl) totalEl.textContent = YF_DATA.reasons.length;

  function updateCount() {
    if (countEl) countEl.textContent = yfState.discoveredReasons.length;

    if (
      yfState.discoveredReasons.length === YF_DATA.reasons.length &&
      !yfState.gardenCompleteShown
    ) {
      yfState.gardenCompleteShown = true;
      yfSaveState();
      showToast(YF_DATA.easterEggs.gardenComplete, 5200);
      const rect = garden.getBoundingClientRect();
      burstPetals(rect.left + rect.width / 2, rect.top + 40, 24);
    }
  }

  function openModal(reason, flowerEl) {
    currentReason = reason;
    lastFocused = flowerEl;
    icon.innerHTML = typedFlowerSVG(reason.type);
    icon.classList.toggle("yf-modal__icon--golden", !!reason.hidden);
    label.textContent = reason.hidden ? "Flor especial" : `Razón #${String(reason.id).padStart(2, "0")}`;
    title.textContent = reason.hidden ? "Encontraste una flor especial." : "";
    text.textContent = reason.hidden
      ? "Algunas de las cosas más bonitas aparecen cuando decides mirar un poquito más.\n\n" + reason.message
      : reason.message;
    title.style.display = title.textContent ? "" : "none";

    const discovered = yfState.discoveredReasons.includes(reason.id);
    saveBtn.hidden = discovered;

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-visible"));
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    setTimeout(() => {
      modal.hidden = true;
      if (lastFocused) lastFocused.focus();
    }, 250);
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  saveBtn.addEventListener("click", () => {
    if (!currentReason) return;
    if (!yfState.discoveredReasons.includes(currentReason.id)) {
      yfState.discoveredReasons.push(currentReason.id);
      yfSaveState();
      updateCount();

      if (currentReason.hidden && !yfState.secrets.golden) {
        yfState.secrets.golden = true;
        yfSaveState();
        setTimeout(() => showToast(YF_DATA.easterEggs.goldenFlower, 5000), 350);
      }
    }
    saveBtn.hidden = true;
    const flowerEl = garden.querySelector(`[data-reason-id="${currentReason.id}"]`);
    if (flowerEl) flowerEl.classList.add("is-discovered");
  });

  YF_DATA.reasons.forEach((reason) => {
    const btn = document.createElement("button");
    btn.className = "reason-flower" + (reason.hidden ? " reason-flower--golden" : "");
    btn.dataset.reasonId = reason.id;
    btn.setAttribute("aria-label", reason.hidden ? "Flor escondida" : `Flor, razón número ${reason.id}`);
    btn.classList.add(`reason-flower--${reason.type}`);
    btn.innerHTML = typedFlowerSVG(reason.type);

    if (yfState.discoveredReasons.includes(reason.id)) {
      btn.classList.add("is-discovered");
    }

    btn.addEventListener("click", () => openModal(reason, btn));
    garden.appendChild(btn);
  });

  updateCount();
}

/* ---------- 4. Recuerdos ---------- */

function initMemories() {
  const track = document.getElementById("memoriesTimeline");
  const modal = document.getElementById("memoryModal");
  if (!track || !modal) return;

  const photo = document.getElementById("memoryModalPhoto");
  const dateEl = document.getElementById("memoryModalDate");
  const titleEl = document.getElementById("memoryModalTitle");
  const textEl = document.getElementById("memoryModalText");
  const closeBtn = document.getElementById("memoryModalClose");
  let lastFocused = null;

  function openModal(memory, cardEl) {
    lastFocused = cardEl;
    photo.textContent = memory.icon;
    dateEl.textContent = memory.date;
    titleEl.textContent = memory.caption;
    textEl.textContent = memory.story;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-visible"));
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    setTimeout(() => {
      modal.hidden = true;
      if (lastFocused) lastFocused.focus();
    }, 250);
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  YF_DATA.memories.forEach((memory, index) => {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.style.setProperty("--tilt", `${index % 2 === 0 ? -4 : 4}deg`);
    card.innerHTML = `
      <span class="memory-card__photo">${memory.icon}</span>
      <span class="memory-card__date">${memory.date}</span>
      <span class="memory-card__caption">${memory.caption}</span>
    `;
    card.addEventListener("click", () => openModal(memory, card));
    track.appendChild(card);
  });
}

/* ---------- 5. Carta ---------- */

function initLetter() {
  const card = document.getElementById("letterCard");
  const textEl = document.getElementById("letterText");
  if (!card || !textEl) return;

  YF_DATA.letter.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    textEl.appendChild(p);
  });

  const paragraphs = Array.from(textEl.querySelectorAll("p"));
  let index = 0;
  let started = false;
  let timer = null;

  function revealNext() {
    if (index >= paragraphs.length) return;
    paragraphs[index].classList.add("is-shown");
    index += 1;
    if (index < paragraphs.length) {
      timer = setTimeout(revealNext, 1400);
    }
  }

  function start() {
    if (started) return;
    started = true;
    revealNext();
  }

  function skipAll() {
    clearTimeout(timer);
    paragraphs.forEach((p) => p.classList.add("is-shown"));
    index = paragraphs.length;
  }

  card.addEventListener("click", (e) => {
    e.preventDefault();
    if (!started) {
      start();
    } else {
      skipAll();
    }
  });

  if (!("IntersectionObserver" in window)) {
    start();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          start();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(card);
}

/* ---------- 6. Plantar el jardín ---------- */

function initPlantGarden() {
  const btn = document.getElementById("plantBtn");
  const field = document.getElementById("plantField");
  const countEl = document.getElementById("plantCount");
  const outro = document.getElementById("plantOutro");
  const section = document.getElementById("planta");
  if (!btn || !field) return;

  const MAX_VISIBLE = 20;

  function applyThresholds(count) {
    field.classList.toggle("has-leaves", count >= 3);
    field.classList.toggle("has-lights", count >= 5);
    field.classList.toggle("has-butterflies", count >= 7);
    field.classList.toggle("golden-field", count >= 10);
    if (section) section.classList.toggle("is-golden-field", count >= 10);

    if (count >= 7 && field.querySelectorAll(".plant-butterfly-deco").length < 2) {
      for (let i = field.querySelectorAll(".plant-butterfly-deco").length; i < 2; i++) {
        const deco = document.createElement("span");
        deco.className = "plant-butterfly-deco";
        deco.style.left = `${20 + i * 45}%`;
        deco.style.animationDelay = `${i * 0.3}s`;
        deco.textContent = "🦋";
        field.appendChild(deco);
      }
    }

    if (count >= 10 && outro && outro.hidden) {
      outro.hidden = false;
      outro.classList.add("reveal");
      requestAnimationFrame(() => outro.classList.add("in-view"));
    }
  }

  function addFlower(animated) {
    if (field.querySelectorAll(".plant-flower").length >= MAX_VISIBLE) return;
    const flower = document.createElement("div");
    flower.className = "plant-flower";
    if (!animated || yfPrefersReducedMotion()) {
      flower.style.animation = "none";
    }
    flower.innerHTML = flowerSVG(6, { rx: 9, ry: 20, core: 10 });
    field.insertBefore(flower, field.querySelector(".plant-butterfly-deco") || null);
  }

  for (let i = 0; i < Math.min(yfState.plantedCount, MAX_VISIBLE); i++) {
    addFlower(false);
  }
  if (countEl) countEl.textContent = yfState.plantedCount;
  applyThresholds(yfState.plantedCount);

  btn.addEventListener("click", () => {
    yfState.plantedCount += 1;
    yfSaveState();
    addFlower(true);
    if (countEl) countEl.textContent = yfState.plantedCount;
    applyThresholds(yfState.plantedCount);

    const phrase =
      YF_DATA.plantPhrases[(yfState.plantedCount - 1) % YF_DATA.plantPhrases.length];
    showToast(phrase);

    const rect = btn.getBoundingClientRect();
    burstPetals(rect.left + rect.width / 2, rect.top, 5);
  });
}

/* ---------- 7. Última flor ---------- */

function initFinalFlower() {
  const btn = document.getElementById("finalFlowerBtn");
  const flower = document.getElementById("finalFlower");
  const message = document.getElementById("finalMessage");
  const section = document.getElementById("ultima-flor");
  const audio = document.getElementById("musica");
  if (!btn || !flower || !message) return;

  let triggered = false;

  btn.addEventListener("click", () => {
    if (triggered) return;
    triggered = true;
    btn.disabled = true;

    if (section) section.classList.add("is-sunset-transition");

    flower.classList.add("is-active");

    let particleTimer = null;
    if (!yfPrefersReducedMotion()) {
      particleTimer = setInterval(() => {
        const rect = flower.getBoundingClientRect();
        burstPetals(
          rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
          rect.top + (Math.random() - 0.5) * 100,
          3
        );
      }, 400);
      setTimeout(() => clearInterval(particleTimer), 4200);
    }

    if (audio && !audio.paused) {
      const targetVolume = Math.min(1, audio.volume + 0.15);
      audio.volume = targetVolume;
      const slider = document.getElementById("volumeSlider");
      if (slider) slider.value = targetVolume;
    }

    setTimeout(() => {
      message.hidden = false;
      const lines = Array.from(message.querySelectorAll("p"));
      lines.forEach((line, i) => {
        setTimeout(() => line.classList.add("is-shown"), i * 1100);
      });
    }, 3400);
  });
}

/* ---------- Mariposa interactiva ---------- */

function initButterflies() {
  const layer = document.getElementById("butterflyLayer");
  if (!layer) return;

  let scrolledPastHero = false;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > window.innerHeight * 0.6) scrolledPastHero = true;
    },
    { passive: true }
  );

  function spawnButterfly() {
    if (yfPrefersReducedMotion() || document.hidden || !scrolledPastHero) return;
    if (layer.childElementCount > 0) return;

    const butterfly = document.createElement("button");
    butterfly.className = "yf-butterfly";
    butterfly.setAttribute("aria-label", "Mariposa, tócala");
    butterfly.textContent = "🦋";

    const startY = 15 + Math.random() * 60;
    const midY = startY - 10 + Math.random() * 20;
    const endY = startY - 15 + Math.random() * 30;
    const duration = 9 + Math.random() * 4;

    butterfly.style.setProperty("--bfx0", "-40px");
    butterfly.style.setProperty("--bfy0", `${startY}vh`);
    butterfly.style.setProperty("--bfx1", "50vw");
    butterfly.style.setProperty("--bfy1", `${midY}vh`);
    butterfly.style.setProperty("--bfx2", "110vw");
    butterfly.style.setProperty("--bfy2", `${endY}vh`);
    butterfly.style.top = "0";
    butterfly.style.left = "0";
    butterfly.style.animationDuration = `0.6s, ${duration}s`;
    butterfly.style.animationTimingFunction = "ease-in-out, linear";

    butterfly.addEventListener("animationend", (e) => {
      if (e.animationName === "yf-butterfly-fly") butterfly.remove();
    });

    butterfly.addEventListener("click", () => {
      butterfly.remove();
      showToast(YF_DATA.easterEggs.butterflyFound, 2400);
      if (!yfState.secrets.butterfly) {
        yfState.secrets.butterfly = true;
        yfSaveState();
        setTimeout(() => showToast(YF_DATA.easterEggs.butterflyMessage, 5000), 2600);
      }
    });

    layer.appendChild(butterfly);
  }

  setTimeout(spawnButterfly, 6000);
  setInterval(spawnButterfly, 22000);
}

/* ---------- Cursor interactivo (solo desktop, puntero fino) ---------- */

function initCursorPetals() {
  if (!yfIsFinePointer()) return;

  let lastSpawn = 0;
  document.addEventListener("mousemove", (e) => {
    if (yfPrefersReducedMotion()) return;
    const now = Date.now();
    if (now - lastSpawn < 900) return;
    if (Math.random() > 0.08) return;
    lastSpawn = now;
    burstPetals(e.clientX, e.clientY, 1);
  });
}
