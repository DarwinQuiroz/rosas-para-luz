/* ============================================================
   El jardín donde florece mi amor — lógica
   ============================================================ */

(function () {
  "use strict";

  // ---------- Datos ----------

  const FLORES = [
    {
      id: "admiracion",
      titulo: "Admiración",
      msg: "Admiro la pasión con la que haces cada cosa.",
      x: 9,
      y: 15,
      fs: 1.0,
      dorada: false,
    },
    {
      id: "dulzura",
      titulo: "Dulzura",
      msg: "Tu forma de tratar a las personas dice mucho de tu corazón.",
      x: 24,
      y: 5,
      fs: 1.18,
      dorada: false,
    },
    {
      id: "sorpresa-chocolate",
      titulo: "Flor dorada",
      msg: "Un chocolate para la persona más dulce de este jardín.",
      x: 38,
      y: 13,
      fs: 0.85,
      dorada: true,
      arte: "chocolate",
    },
    {
      id: "sonrisa",
      titulo: "Sonrisa",
      msg: "Tu sonrisa tiene un efecto que todavía no logro explicar.",
      x: 52,
      y: 17,
      fs: 0.95,
      dorada: false,
    },
    {
      id: "inteligencia",
      titulo: "Inteligencia",
      msg: "Hay algo muy bonito en la manera en que piensas.",
      x: 66,
      y: 6,
      fs: 1.12,
      dorada: false,
    },
    {
      id: "carino",
      titulo: "Cariño",
      msg: "Gracias por ser exactamente como eres.",
      x: 80,
      y: 16,
      fs: 0.98,
      dorada: false,
    },
    {
      id: "sorpresa-rosa",
      titulo: "Flor dorada",
      msg: "Una rosa eterna: como lo que siento por ti, no se marchita.",
      x: 92,
      y: 6,
      fs: 1.02,
      dorada: true,
      arte: "rosa",
    },
  ];

  const MSG_COLIBRI =
    "Lo lograste… Como este colibrí, mis pensamientos siempre encuentran el camino hacia ti.";

  const ARTE = {
    chocolate: `
      <svg viewBox="0 0 130 90" aria-hidden="true">
        <g transform="rotate(-6 65 45)">
          <rect x="15" y="22" width="100" height="50" rx="6" fill="#a63d2e" />
          <rect x="15" y="22" width="36" height="50" rx="6" fill="#d9d0c0" />
          <rect x="20" y="28" width="11" height="11" rx="2" fill="#4a2a12" />
          <rect x="34" y="28" width="11" height="11" rx="2" fill="#4a2a12" />
          <rect x="20" y="43" width="11" height="11" rx="2" fill="#4a2a12" />
          <rect x="34" y="43" width="11" height="11" rx="2" fill="#4a2a12" />
          <rect x="60" y="22" width="14" height="50" fill="#d4af37" opacity="0.85" />
        </g>
      </svg>`,
    rosa: `
      <svg viewBox="0 0 100 130" aria-hidden="true">
        <path d="M50 62 C46 90 54 112 50 126" stroke="#3f5c32" stroke-width="4"
          fill="none" stroke-linecap="round" />
        <path d="M49 92 C38 82 24 82 17 92 C25 102 40 100 49 92Z" fill="#4c6b3c" />
        <ellipse cx="34" cy="38" rx="15" ry="12" transform="rotate(-24 34 38)" fill="#701f2b" />
        <ellipse cx="66" cy="38" rx="15" ry="12" transform="rotate(24 66 38)" fill="#8f303d" />
        <ellipse cx="50" cy="46" rx="16" ry="11" fill="#7e2734" />
        <ellipse cx="42" cy="28" rx="11" ry="14" transform="rotate(-12 42 28)" fill="#a63a48" />
        <ellipse cx="58" cy="28" rx="11" ry="14" transform="rotate(12 58 28)" fill="#b44a56" />
        <circle cx="50" cy="34" r="11" fill="#c25b64" />
        <path d="M50 26 c-6 1 -10 6 -8 11 c2 5 7 6 11 4 c3 -2 4 -7 1 -10"
          stroke="#7e2734" stroke-width="1.8" fill="none" stroke-linecap="round" />
      </svg>`,
    colibri: `
      <svg viewBox="0 0 130 90" aria-hidden="true">
        <path d="M4 40 L44 46 L8 52 Z" fill="#38222e" />
        <ellipse cx="66" cy="50" rx="26" ry="15" fill="#2f7d6d" />
        <path d="M88 50 C104 40 118 38 126 42 L96 58 Z" fill="#1f5a4e" />
        <circle cx="46" cy="41" r="13" fill="#37917d" />
        <path d="M40 49 C46 56 56 58 62 55 C56 48 48 45 40 49Z" fill="#e56a92" />
        <circle cx="42" cy="37" r="2.4" fill="#1c1017" />
        <path d="M60 46 C70 12 96 8 106 18 C98 34 80 46 62 52 Z" fill="#8fd0b8" opacity="0.92" />
      </svg>`,
  };

  // ---------- Elementos ----------

  const $ = (id) => document.getElementById(id);

  const intro = $("intro");
  const enterBtn = $("enterBtn");
  const soundBtn = $("soundBtn");
  const floresBox = $("flores");
  const miniBox = $("miniFlores");
  const particulasBox = $("particulas");
  const hojitasBox = $("hojitas");
  const pasto = $("pasto");
  const colibri = $("colibri");
  const mensajeCentro = $("mensajeCentro");
  const hint = $("hint");
  const overlay = $("tarjetaOverlay");
  const tarjetaEyebrow = $("tarjetaEyebrow");
  const tarjetaArte = $("tarjetaArte");
  const tarjetaMsg = $("tarjetaMsg");
  const progreso = $("progreso");
  const petalosBar = $("petalosBar");
  const progresoTxt = $("progresoTxt");
  const finalText = $("finalText");
  const continuarBtn = $("continuarBtn");

  const descubiertas = new Set();
  let jardinCompleto = false;
  let cerrarTimer = null;
  let colibriTimer = null;
  let colibriAtrapado = false;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ---------- Construcción de la escena ----------

  function florSVG() {
    let petalos = "";
    for (let i = 0; i < 6; i++) {
      petalos +=
        '<g transform="rotate(' +
        i * 60 +
        ' 60 62)">' +
        '<ellipse class="petalo" cx="60" cy="36" rx="14" ry="27" /></g>';
    }
    return (
      '<svg viewBox="0 0 120 240" aria-hidden="true">' +
      '<path class="tallo" d="M60 232 C54 190 66 150 60 96" />' +
      '<path class="hoja" d="M60 178 C44 163 22 165 14 178 C26 191 47 189 60 178Z" />' +
      '<path class="hoja" d="M60 146 C76 131 98 133 106 146 C94 159 73 157 60 146Z" />' +
      '<g class="corola">' +
      petalos +
      '<circle class="centro" cx="60" cy="62" r="12" /></g></svg>'
    );
  }

  function crearFlores() {
    FLORES.forEach((f, i) => {
      const btn = document.createElement("button");
      btn.className = "flor" + (f.dorada ? " dorada" : "");
      btn.style.left = f.x + "%";
      btn.style.bottom = f.y + "%";
      btn.style.setProperty("--fs", f.fs);
      btn.style.setProperty("--md", "-" + (i * 0.7).toFixed(1) + "s");
      btn.style.zIndex = 20 + Math.round(30 - f.y);
      btn.setAttribute("aria-label", "Flor: " + f.titulo);
      btn.innerHTML = florSVG();
      btn.addEventListener("click", () => abrirFlor(f, btn));
      floresBox.appendChild(btn);
    });
  }

  function crearProgreso() {
    FLORES.forEach((f) => {
      const dot = document.createElement("span");
      dot.className = "petalo-dot" + (f.dorada ? " es-oro" : "");
      dot.dataset.flor = f.id;
      petalosBar.appendChild(dot);
    });
  }

  function crearParticulas() {
    const n = reduceMotion ? 0 : 26;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = "particula";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = 35 + Math.random() * 55 + "%";
      const s = 3 + Math.random() * 4;
      p.style.width = s + "px";
      p.style.height = s + "px";
      p.style.animationDuration = (5 + Math.random() * 7).toFixed(1) + "s";
      p.style.animationDelay = (-Math.random() * 8).toFixed(1) + "s";
      particulasBox.appendChild(p);
    }
  }

  function crearHojitas() {
    const n = reduceMotion ? 0 : 6;
    for (let i = 0; i < n; i++) {
      const h = document.createElement("span");
      h.className = "hojita";
      h.style.top = 8 + Math.random() * 50 + "%";
      h.style.animationDuration = (16 + Math.random() * 18).toFixed(1) + "s";
      h.style.animationDelay = (-Math.random() * 30).toFixed(1) + "s";
      hojitasBox.appendChild(h);
    }
  }

  function crearPasto() {
    let d = "M0 90 ";
    let x = -10;
    while (x < 1450) {
      const w = 16 + Math.random() * 22;
      const alto = 20 + Math.random() * 48;
      const lado = (Math.random() - 0.5) * 10;
      d +=
        "L" +
        (x + w / 2 + lado).toFixed(1) +
        " " +
        (90 - alto).toFixed(1) +
        " L" +
        (x + w).toFixed(1) +
        " 90 ";
      x += w * 0.62;
    }
    d += "Z";
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    pasto.appendChild(path);
  }

  // ---------- Sonido (WebAudio: brisa, pájaros, campanitas) ----------

  let audio = null;
  let muted = false;

  function initAudio() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      if (ctx.resume) ctx.resume();
      const master = ctx.createGain();
      master.gain.value = 0.55;
      master.connect(ctx.destination);

      // brisa: ruido filtrado con un vaivén lento
      const len = ctx.sampleRate * 2;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const ruido = ctx.createBufferSource();
      ruido.buffer = buf;
      ruido.loop = true;
      const filtro = ctx.createBiquadFilter();
      filtro.type = "lowpass";
      filtro.frequency.value = 380;
      filtro.Q.value = 0.7;
      const brisa = ctx.createGain();
      brisa.gain.value = 0.045;
      ruido.connect(filtro);
      filtro.connect(brisa);
      brisa.connect(master);
      ruido.start();

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 160;
      lfo.connect(lfoGain);
      lfoGain.connect(filtro.frequency);
      lfo.start();

      audio = { ctx, master };
      programarPajaro();
    } catch (e) {
      audio = null;
    }
  }

  function pajaro() {
    if (!audio || muted) return;
    const { ctx, master } = audio;
    const n = 3 + Math.floor(Math.random() * 3);
    let t = ctx.currentTime + 0.05;
    for (let i = 0; i < n; i++) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = 2300 + Math.random() * 1500;
      o.frequency.setValueAtTime(f, t);
      o.frequency.exponentialRampToValueAtTime(
        f * (0.6 + Math.random() * 0.3),
        t + 0.07,
      );
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.045, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.1);
      t += 0.12 + Math.random() * 0.12;
    }
  }

  function programarPajaro() {
    setTimeout(
      () => {
        pajaro();
        programarPajaro();
      },
      3500 + Math.random() * 6500,
    );
  }

  function nota(freq, cuando, dur, vol) {
    const { ctx, master } = audio;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, cuando);
    g.gain.exponentialRampToValueAtTime(vol, cuando + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, cuando + dur);
    o.connect(g);
    g.connect(master);
    o.start(cuando);
    o.stop(cuando + dur + 0.05);
  }

  const ESCALA = [392, 440, 523.25, 587.33, 659.25, 698.46, 783.99];

  function campanitaFlor(indice) {
    if (!audio || muted) return;
    const t = audio.ctx.currentTime + 0.02;
    nota(ESCALA[indice % ESCALA.length], t, 1.4, 0.09);
    nota(ESCALA[indice % ESCALA.length] * 2, t + 0.06, 1.0, 0.035);
  }

  function arpegio(notas, vol) {
    if (!audio || muted) return;
    let t = audio.ctx.currentTime + 0.02;
    notas.forEach((f) => {
      nota(f, t, 1.6, vol || 0.08);
      t += 0.14;
    });
  }

  // ---------- Tarjeta ----------

  function mostrarTarjeta(eyebrow, msg, arteKey, alCerrar) {
    clearTimeout(cerrarTimer);
    tarjetaEyebrow.textContent = eyebrow;
    tarjetaMsg.textContent = msg;
    if (arteKey && ARTE[arteKey]) {
      tarjetaArte.innerHTML = ARTE[arteKey];
      tarjetaArte.classList.add("visible");
    } else {
      tarjetaArte.innerHTML = "";
      tarjetaArte.classList.remove("visible");
    }
    overlay.classList.add("abierta");

    const cerrar = () => {
      overlay.classList.remove("abierta");
      overlay.removeEventListener("click", cerrar);
      clearTimeout(cerrarTimer);
      if (alCerrar) setTimeout(alCerrar, 500);
    };
    overlay.addEventListener("click", cerrar);
    cerrarTimer = setTimeout(cerrar, 6500);
  }

  // ---------- Interacción con flores ----------

  function abrirFlor(f, btn) {
    if (overlay.classList.contains("abierta")) return;

    const primeraVez = !descubiertas.has(f.id);
    btn.classList.add("abierta");
    mensajeCentro.classList.add("apagada");

    if (primeraVez) {
      descubiertas.add(f.id);
      const dot = petalosBar.querySelector('[data-flor="' + f.id + '"]');
      if (dot) {
        dot.classList.add("lleno");
        if (f.dorada) dot.classList.add("oro");
      }
      actualizarProgreso();
    }

    if (f.dorada) {
      arpegio([523.25, 659.25, 783.99, 1046.5], 0.07);
    } else {
      campanitaFlor(FLORES.indexOf(f));
    }

    const eyebrow = f.dorada ? "✦ Flor dorada ✦" : f.titulo;
    setTimeout(() => {
      mostrarTarjeta(eyebrow, f.msg, f.arte, () => {
        if (!jardinCompleto && descubiertas.size === FLORES.length) {
          jardinCompleto = true;
          setTimeout(florecerJardin, 500);
        }
      });
    }, 650);
  }

  function actualizarProgreso() {
    progresoTxt.textContent =
      descubiertas.size + " / " + FLORES.length + " flores";
  }

  // ---------- Final: lluvia de pétalos y florecimiento ----------

  function lluviaPetalos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      const p = document.createElement("span");
      p.className = "petalo-lluvia";
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDuration = (4.5 + Math.random() * 5).toFixed(1) + "s";
      p.style.animationDelay = (Math.random() * 3.5).toFixed(1) + "s";
      if (Math.random() < 0.2) {
        p.style.background = "linear-gradient(140deg, #ffefb8, #f2c14e)";
      }
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 14000);
    }
  }

  function florecerJardin() {
    lluviaPetalos(reduceMotion ? 12 : 60);
    arpegio([392, 523.25, 659.25, 783.99, 1046.5, 1318.5], 0.06);

    const clases = ["", "blanca", "oro", "", "blanca", ""];
    for (let i = 0; i < 24; i++) {
      const m = document.createElement("div");
      m.className = ("mini-flor " + clases[i % clases.length]).trim();
      m.style.left = 2 + Math.random() * 96 + "%";
      m.style.bottom = 1 + Math.random() * 22 + "%";
      m.style.width = 18 + Math.random() * 26 + "px";
      m.style.zIndex = 15;
      m.innerHTML = florSVG();
      m.querySelectorAll(".petalo").forEach(
        (pt) => (pt.style.transform = "scale(1)"),
      );
      miniBox.appendChild(m);
      setTimeout(() => m.classList.add("brota"), 300 + i * 140);
    }

    hint.textContent = "El jardín floreció ♥";
    hint.classList.add("visible");
    setTimeout(() => finalText.classList.add("visible"), 1200);
    setTimeout(() => {
      hint.classList.remove("visible");
      progreso.hidden = true;
      continuarBtn.classList.add("visible");
    }, 6500);
  }

  // ---------- Continuar hacia la cafetería ----------

  continuarBtn.addEventListener("click", () => {
    arpegio([523.25, 659.25, 783.99], 0.06);
    continuarBtn.classList.remove("visible");
    transicionA(
      "coffee-shop.html",
      "Empieza a llover… pero conozco un lugar calientito donde seguir esta historia.",
    );
  });

  // ---------- Colibrí ----------

  function programarColibri() {
    clearTimeout(colibriTimer);
    colibriTimer = setTimeout(vueloColibri, 12000 + Math.random() * 14000);
  }

  function vueloColibri() {
    colibriAtrapado = false;
    colibri.hidden = false;
    colibri.style.top = 10 + Math.random() * 28 + "%";
    colibri.classList.remove("volando", "atrapado");
    void colibri.offsetWidth; // reinicia la animación
    colibri.classList.add("volando");

    const fin = () => {
      colibri.classList.remove("volando");
      colibri.removeEventListener("animationend", fin);
      if (!colibriAtrapado) programarColibri();
    };
    colibri.addEventListener("animationend", fin);
  }

  colibri.addEventListener("click", () => {
    if (colibriAtrapado || overlay.classList.contains("abierta")) return;
    colibriAtrapado = true;
    colibri.classList.add("atrapado");
    arpegio([880, 1108.7, 1318.5], 0.05);
    setTimeout(() => {
      mostrarTarjeta("Mensaje secreto", MSG_COLIBRI, "colibri", () => {
        colibri.classList.remove("volando", "atrapado");
        programarColibri();
      });
    }, 350);
  });

  // ---------- Sonido: silenciar ----------

  soundBtn.addEventListener("click", () => {
    muted = !muted;
    if (audio) {
      audio.master.gain.linearRampToValueAtTime(
        muted ? 0.0001 : 0.55,
        audio.ctx.currentTime + 0.3,
      );
    }
    soundBtn.innerHTML = muted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  });

  // ---------- Entrada ----------

  enterBtn.addEventListener("click", () => {
    intro.classList.add("oculta");
    initAudio();
    soundBtn.hidden = false;
    progreso.hidden = false;

    setTimeout(() => mensajeCentro.classList.add("visible"), 800);
    setTimeout(() => hint.classList.add("visible"), 7000);
    programarColibri();
  });

  // ---------- Init ----------

  crearFlores();
  crearProgreso();
  crearParticulas();
  crearHojitas();
  crearPasto();
})();
