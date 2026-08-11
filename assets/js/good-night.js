/* ============================================================
   Buenas noches, Luz — lógica
   ============================================================ */

(function () {
  "use strict";

  // ---------- Datos ----------

  const MENSAJE_PRINCIPAL =
    "Buenas noches, mi hermosa Luz. Espero que cuando cierres los ojos, todo lo bonito que mereces te encuentre primero. Y si algún sueño decide visitarte, ojalá lleve un pedacito de nosotros.";

  const MENSAJE_FINAL =
    "Gracias por recorrer cada rincón de este pequeño universo que preparé para ti. Ojalá, cuando termine esta noche, recuerdes que siempre habrá alguien deseándote los sueños más bonitos.";

  const MENSAJE_DESPEDIDA =
    "Buenas noches, mi hermosa Luz. Que descanses y que mañana te reciba con la misma luz que tú llevas a los demás.";

  const MSG_LUNA = "La luna me pidió que cuidara de tus sueños.";
  const MSG_BUHO = "Los mejores sueños empiezan con una sonrisa.";
  const MSG_VENTANA = "Que descanses, mi persona favorita.";
  const MSG_DESEO = "Pide un deseo. Yo ya pedí el mío.";
  const MSG_FUGAZ =
    "Dicen que las estrellas cumplen deseos. La mía ya lo hizo cuando llegaste.";
  const MSG_FLORES = "El jardín entero también te desea dulces sueños.";

  const ESTRELLAS_MSG = [
    { x: 8, y: 22, msg: "Gracias por alegrar mis días." },
    { x: 20, y: 48, msg: "Hoy también pensé en ti." },
    { x: 33, y: 14, msg: "Espero que hayas sonreído mucho." },
    { x: 46, y: 38, msg: "Tu risa es mi sonido favorito." },
    { x: 60, y: 18, msg: "Contigo hasta la noche se siente tibia." },
    { x: 72, y: 52, msg: "Eres mi último pensamiento antes de dormir." },
    { x: 88, y: 40, msg: "Que sueñes tan bonito como eres tú." },
  ];

  const FLOR_POS = [
    { x: 7, fs: 0.9, c: 0 },
    { x: 24, fs: 1.1, c: 1 },
    { x: 45, fs: 0.85, c: 2 },
    { x: 66, fs: 1.05, c: 3 },
    { x: 86, fs: 0.95, c: 0 },
  ];

  const TIEMPO_FINAL = 90000; // ms hasta la secuencia final

  // ---------- Elementos ----------

  const raiz = document.getElementById("escena-noche");
  const $ = (id) => raiz.querySelector("#noc-" + id);

  const intro = $("intro");
  const enterBtn = $("enterBtn");
  const soundBtn = $("soundBtn");
  const escena = $("escena");
  const estrellasBox = $("estrellas");
  const fugacesBox = $("fugaces");
  const luna = $("luna");
  const lunaSombra = $("lunaSombra");
  const ventana = $("ventana");
  const mensajeVapor = $("mensajeVapor");
  const buho = $("buho");
  const buhoHuu = $("buhoHuu");
  const floresBox = $("flores");
  const petalosBox = $("petalos");
  const particulasBox = $("particulas");
  const mensajePrincipal = $("mensajePrincipal");
  const cartel = $("cartel");
  const final = $("final");
  const finalTexto = $("finalTexto");
  const btnBeso = $("btnBeso");
  const despedida = $("despedida");
  const despedidaLuna = $("despedidaLuna");
  const corazon = $("corazon");
  const despedidaTexto = $("despedidaTexto");
  const btnFin = $("btnFin");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const esMovil = window.matchMedia("(max-width: 640px)").matches;

  const floresTocadas = new Set();
  let comenzado = false;
  let faseFinal = false;
  let terminado = false;
  let cartelTimer = null;

  const rnd = (min, max) => min + Math.random() * (max - min);

  // ---------- Ciclo lunar ----------

  // 8 fases: llena → menguantes → nueva → crecientes
  const FASES_LUNA = [96, 62, 38, 18, 4, -18, -38, -62];
  let faseLunaIdx = 0;
  let faseLunaTimer = null;

  function aplicarFaseLunar() {
    try {
      faseLunaIdx = parseInt(localStorage.getItem("bnVisitas") || "0", 10) || 0;
      localStorage.setItem("bnVisitas", String(faseLunaIdx + 1));
    } catch (e) {
      /* almacenamiento no disponible */
    }
    faseLunaIdx = faseLunaIdx % FASES_LUNA.length;
    lunaSombra.style.setProperty("--fase", FASES_LUNA[faseLunaIdx] + "%");
  }

  function programarFaseLunar() {
    faseLunaTimer = setInterval(() => {
      if (faseFinal || terminado) return;
      faseLunaIdx = (faseLunaIdx + 1) % FASES_LUNA.length;
      lunaSombra.style.setProperty("--fase", FASES_LUNA[faseLunaIdx] + "%");
    }, 18000);
  }

  // ---------- Construcción del cielo ----------

  function crearEstrellas() {
    const total = esMovil ? 60 : 100;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
      const e = document.createElement("span");
      e.className = "estrella";
      const tam = rnd(1, 2.6);
      e.style.width = tam + "px";
      e.style.height = tam + "px";
      e.style.left = rnd(0, 100) + "%";
      e.style.top = rnd(0, 100) + "%";
      e.style.setProperty("--base", rnd(0.3, 0.95).toFixed(2));
      e.style.setProperty("--dur", rnd(2.6, 6.5).toFixed(2) + "s");
      e.style.setProperty("--delay", rnd(0, 6).toFixed(2) + "s");
      frag.appendChild(e);
    }

    ESTRELLAS_MSG.forEach((datos, i) => {
      const b = document.createElement("button");
      b.className = "estrella-btn";
      b.type = "button";
      b.style.left = datos.x + "%";
      b.style.top = datos.y + "%";
      b.style.setProperty("--dur", rnd(2.8, 4.2).toFixed(2) + "s");
      b.style.setProperty("--delay", (i * 0.45).toFixed(2) + "s");
      b.setAttribute("aria-label", "Una estrella con un mensaje");
      b.innerHTML = '<span class="nucleo" aria-hidden="true"></span>';
      b.addEventListener("click", () => {
        b.classList.add("leida");
        mostrarCartel(datos.msg);
        audio.destello();
      });
      frag.appendChild(b);
    });

    estrellasBox.appendChild(frag);
  }

  function crearParticulas() {
    if (reduceMotion) return;
    const tonos = ["#f7b267", "#ffc8dd", "#ffd6a5"];
    const total = esMovil ? 7 : 10;
    for (let i = 0; i < total; i++) {
      const p = document.createElement("span");
      p.className = "particula";
      p.style.left = rnd(3, 97) + "%";
      p.style.setProperty("--tono", tonos[i % tonos.length]);
      p.style.setProperty("--tam", rnd(3, 6).toFixed(1) + "px");
      p.style.setProperty("--dur", rnd(17, 30).toFixed(1) + "s");
      p.style.setProperty("--delay", rnd(0, 24).toFixed(1) + "s");
      particulasBox.appendChild(p);
    }
  }

  function crearFlores() {
    const petaloSVG = (() => {
      let petalos = "";
      for (let i = 0; i < 6; i++) {
        petalos += `<ellipse cx="30" cy="15" rx="8" ry="13" fill="currentColor"
          transform="rotate(${i * 60} 30 30)" />`;
      }
      return `<svg viewBox="0 0 60 60" aria-hidden="true">${petalos}
        <circle cx="30" cy="30" r="7.5" fill="#f5c76a" /></svg>`;
    })();

    FLOR_POS.forEach((datos, i) => {
      const f = document.createElement("button");
      f.className = "flor flor-c" + datos.c;
      f.type = "button";
      f.dataset.color = String(datos.c);
      f.style.left = datos.x + "%";
      f.style.setProperty("--fs", datos.fs);
      f.style.setProperty("--dur", rnd(5, 7.5).toFixed(2) + "s");
      f.style.setProperty("--delay", (-i * 1.3).toFixed(2) + "s");
      f.setAttribute("aria-label", "Una flor del jardín");
      f.innerHTML =
        petaloSVG + '<span class="flor-tallo" aria-hidden="true"></span>';
      f.addEventListener("click", () => tocarFlor(f));
      floresBox.appendChild(f);
    });
  }

  // ---------- Cartel de mensajes ----------

  function mostrarCartel(texto, duracion = 6000) {
    clearTimeout(cartelTimer);
    cartel.textContent = texto;
    cartel.classList.add("visible");
    cartelTimer = setTimeout(
      () => cartel.classList.remove("visible"),
      duracion,
    );
  }

  // ---------- Mensaje principal (letra por letra) ----------

  function escribir(nodo, texto, velocidad, alTerminar) {
    nodo.textContent = "";
    if (reduceMotion) {
      nodo.textContent = texto;
      if (alTerminar) alTerminar();
      return;
    }
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");
    const textoNodo = document.createTextNode("");
    nodo.appendChild(textoNodo);
    nodo.appendChild(caret);

    let i = 0;
    const tick = () => {
      if (i < texto.length) {
        textoNodo.textContent += texto[i++];
        setTimeout(tick, velocidad + (texto[i - 1] === "." ? 320 : 0));
      } else {
        caret.remove();
        if (alTerminar) alTerminar();
      }
    };
    setTimeout(tick, 400);
  }

  // ---------- Interacción: luna ----------

  luna.addEventListener("click", () => {
    luna.classList.add("sonrie");
    mostrarCartel(MSG_LUNA);
    audio.destello();
    setTimeout(() => luna.classList.remove("sonrie"), 7000);
  });

  // ---------- Interacción: búho ----------

  buho.addEventListener("click", () => {
    audio.buho();
    buhoHuu.classList.add("visible");
    setTimeout(() => {
      buhoHuu.classList.remove("visible");
      mostrarCartel(MSG_BUHO);
    }, 1400);
  });

  // ---------- Interacción: ventana ----------

  let ventanaAbierta = false;

  ventana.addEventListener("click", () => {
    if (ventanaAbierta) return;
    ventanaAbierta = true;
    ventana.classList.add("abierta");
    setTimeout(() => {
      mensajeVapor.textContent = MSG_VENTANA;
      mensajeVapor.classList.add("visible");
    }, 2600);
  });

  // ---------- Interacción: flores ----------

  function tocarFlor(f) {
    const siguiente = (parseInt(f.dataset.color, 10) + 1) % 5;
    f.classList.remove("flor-c0", "flor-c1", "flor-c2", "flor-c3", "flor-c4");
    f.classList.add("flor-c" + siguiente, "tocada");
    f.dataset.color = String(siguiente);
    audio.destello(true);

    if (!floresTocadas.has(f)) {
      floresTocadas.add(f);
      if (floresTocadas.size === FLOR_POS.length) {
        lluviaDePetalos(reduceMotion ? 10 : 46);
        mostrarCartel(MSG_FLORES);
      }
    }
  }

  // ---------- Pétalos ----------

  function soltarPetalo(rapido) {
    const p = document.createElement("span");
    p.className = "petalo";
    const tonos = ["#ffc8dd", "#ffd6a5", "#f7b267", "#f3a9c4"];
    p.style.left = rnd(2, 98) + "%";
    p.style.setProperty("--tono", tonos[Math.floor(rnd(0, tonos.length))]);
    p.style.setProperty("--vx", rnd(-70, 70).toFixed(0) + "px");
    p.style.setProperty(
      "--dur",
      rnd(rapido ? 5 : 8, rapido ? 9 : 13).toFixed(1) + "s",
    );
    p.style.setProperty("--delay", rnd(0, rapido ? 2.5 : 1).toFixed(1) + "s");
    petalosBox.appendChild(p);
    setTimeout(() => p.remove(), 17000);
  }

  function lluviaDePetalos(cantidad) {
    for (let i = 0; i < cantidad; i++) soltarPetalo(true);
  }

  function brisaDePetalos() {
    if (terminado) return;
    if (!reduceMotion) {
      const cuantos = Math.floor(rnd(2, 5));
      for (let i = 0; i < cuantos; i++) soltarPetalo(false);
    }
    setTimeout(brisaDePetalos, rnd(11000, 24000));
  }

  // ---------- Estrellas fugaces ----------

  function lanzarFugaz() {
    const wrap = document.createElement("span");
    wrap.className = "fugaz-hit decorativa";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<span class="fugaz" aria-hidden="true"></span>';

    const desdeIzq = Math.random() < 0.5;
    const x0 = desdeIzq ? rnd(5, 30) : rnd(70, 95);
    const y0 = rnd(6, 34);
    const dx = (desdeIzq ? 1 : -1) * rnd(30, 46); // vw
    const dy = rnd(14, 24); // vh
    const dur = reduceMotion ? 0 : rnd(1.7, 2.3);

    wrap.style.left = x0 + "%";
    wrap.style.top = y0 + "%";
    wrap.style.setProperty("--vuelo", dur + "s");
    const angulo =
      (Math.atan2(-dy * window.innerHeight, -dx * window.innerWidth) * 180) /
      Math.PI;
    wrap
      .querySelector(".fugaz")
      .style.setProperty("--cola", angulo.toFixed(0) + "deg");

    fugacesBox.appendChild(wrap);

    if (reduceMotion) {
      // Sin vuelo: aparece unos segundos y se desvanece.
      setTimeout(() => {
        wrap.style.opacity = "0";
        setTimeout(() => wrap.remove(), 600);
      }, 2600);
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrap.style.transform = `translate(${dx}vw, ${dy}vh)`;
      });
    });
    setTimeout(() => {
      wrap.style.opacity = "0";
      setTimeout(() => wrap.remove(), 600);
    }, dur * 1000);
  }

  // ---------- Estrellas fugaces automáticas ----------
  // Una sola, sola al entrar, con su mensaje; después, grupos cada 10s con
  // una frase distinta cada vez, hasta que arranca la secuencia final.

  const FRASES_FUGACES = [
    MSG_DESEO,
    "Cada estrella que cruza el cielo lleva un pensamiento hacia ti.",
    "Si pudiera bajarte una estrella, elegiría la más brillante.",
    "El cielo entero se puso de acuerdo para brillar solo para ti esta noche.",
    "Con cada estrella que cae, pienso una vez más en ti.",
  ];
  let fraseFugazIdx = 0;

  function grupoFugaces() {
    if (terminado) return;
    const total = reduceMotion ? 4 : 11;
    for (let i = 0; i < total; i++) {
      setTimeout(lanzarFugaz, i * 220);
    }
    mostrarCartel(FRASES_FUGACES[fraseFugazIdx % FRASES_FUGACES.length], 8500);
    fraseFugazIdx++;
    audio.destello();
  }

  function programarFugaces() {
    // La primera estrella, sola, apenas empieza la noche.
    setTimeout(() => {
      if (terminado) return;
      lanzarFugaz();
      mostrarCartel(MSG_FUGAZ, 7000);
      audio.destello();
    }, 12000);

    // De ahí en más, grupos automáticos cada 10 segundos.
    setTimeout(() => {
      if (terminado) return;
      grupoFugaces();
      setInterval(() => {
        if (!terminado && !document.hidden) grupoFugaces();
      }, 10000);
    }, 20000);
  }

  // ---------- Secuencia final ----------

  function iniciarFinal() {
    if (faseFinal || terminado) return;
    faseFinal = true;

    // La cámara se acerca a la luna y baja la iluminación.
    const rLuna = luna.getBoundingClientRect();
    const cx = ((rLuna.left + rLuna.width / 2) / window.innerWidth) * 100;
    const cy = ((rLuna.top + rLuna.height / 2) / window.innerHeight) * 100;
    escena.style.transformOrigin = cx + "% " + cy + "%";
    document.body.classList.add("anochecer");
    audio.calmar();

    setTimeout(() => {
      final.hidden = false;
      escribir(finalTexto, MENSAJE_FINAL, 52, () => {
        btnBeso.hidden = false;
        requestAnimationFrame(() => btnBeso.classList.add("visible"));
      });
    }, 4000);
  }

  // ---------- Despedida ----------

  btnBeso.addEventListener("click", () => {
    if (terminado) return;
    terminado = true;
    final.hidden = true;
    despedida.hidden = false;
    audio.despedida();

    // La luna tenue sigue visible en la despedida.
    const rLuna = luna.getBoundingClientRect();
    const lunaX = rLuna.left + rLuna.width / 2;
    const lunaY = rLuna.top + rLuna.height / 2;
    despedidaLuna.style.left = lunaX - 60 + "px";
    despedidaLuna.style.top = lunaY - 60 + "px";

    requestAnimationFrame(() => {
      despedida.classList.add("activa");
      // El corazón asciende hacia la luna.
      const desdeX = window.innerWidth / 2;
      const desdeY = window.innerHeight * 0.84;
      const dx = lunaX - desdeX;
      const dy = lunaY - desdeY;
      setTimeout(
        () => {
          corazon.style.transform = `translate(${dx}px, ${dy}px) scale(0.35)`;
          corazon.style.opacity = "0";
        },
        reduceMotion ? 100 : 1200,
      );
    });

    setTimeout(
      () => despedidaTexto.classList.add("visible"),
      reduceMotion ? 800 : 6500,
    );
    setTimeout(() => {
      despedidaTexto.textContent = MENSAJE_DESPEDIDA;
    }, 100);

    // Cierre del viaje: un último botón para volver al comienzo.
    setTimeout(
      () => {
        btnFin.hidden = false;
        requestAnimationFrame(() => btnFin.classList.add("visible"));
      },
      reduceMotion ? 2500 : 13000,
    );
  });

  btnFin.addEventListener("click", () => {
    transicionA(
      "index.html",
      "Gracias por recorrer este pequeño universo. Que sueñes bonito ♥",
    );
  });

  // ---------- Audio ambiente (sintetizado) ----------

  const audio = (function () {
    let ctx = null;
    let master = null;
    let musicaGain = null;
    let melodiaCada = [3500, 6500];
    let muted = false;
    let activo = false;

    function crearRuido() {
      const dur = 2;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const datos = buffer.getChannelData(0);
      for (let i = 0; i < datos.length; i++) datos[i] = Math.random() * 2 - 1;
      return buffer;
    }

    function iniciar() {
      if (activo) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        ctx = new Ctx();
        if (ctx.resume) ctx.resume();
        activo = true;

        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);

        const ruido = crearRuido();

        // Lluvia ligera: ruido filtrado grave.
        const lluvia = ctx.createBufferSource();
        lluvia.buffer = ruido;
        lluvia.loop = true;
        const fLluvia = ctx.createBiquadFilter();
        fLluvia.type = "lowpass";
        fLluvia.frequency.value = 850;
        const gLluvia = ctx.createGain();
        gLluvia.gain.value = 0.04;
        lluvia.connect(fLluvia).connect(gLluvia).connect(master);
        lluvia.start();

        // Brisa: ruido en banda media con vaivén lento.
        const brisa = ctx.createBufferSource();
        brisa.buffer = ruido;
        brisa.loop = true;
        const fBrisa = ctx.createBiquadFilter();
        fBrisa.type = "bandpass";
        fBrisa.frequency.value = 330;
        fBrisa.Q.value = 0.7;
        const gBrisa = ctx.createGain();
        gBrisa.gain.value = 0.03;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.06;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.018;
        lfo.connect(lfoGain).connect(gBrisa.gain);
        lfo.start();
        brisa.connect(fBrisa).connect(gBrisa).connect(master);
        brisa.start();

        // Grillos.
        programarGrillo();

        // Música: colchón de acordes + pequeñas notas de caja musical.
        musicaGain = ctx.createGain();
        musicaGain.gain.value = 1;
        musicaGain.connect(master);
        programarAcorde(0);
        programarMelodia();
      } catch (e) {
        /* sin audio */
      }
    }

    function programarGrillo() {
      if (!activo) return;
      const t = ctx.currentTime + 0.05;
      const base = 4100 + Math.random() * 500;
      const pulsos = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < pulsos; i++) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = base;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t + i * 0.075);
        g.gain.linearRampToValueAtTime(0.012, t + i * 0.075 + 0.012);
        g.gain.linearRampToValueAtTime(0, t + i * 0.075 + 0.04);
        osc.connect(g).connect(master);
        osc.start(t + i * 0.075);
        osc.stop(t + i * 0.075 + 0.05);
      }
      setTimeout(programarGrillo, 1300 + Math.random() * 2600);
    }

    const ACORDES = [
      [220.0, 277.18, 329.63], // A - C#m
      [174.61, 220.0, 261.63], // F - A - C
      [196.0, 246.94, 293.66], // G - B - D
      [164.81, 220.0, 246.94], // E - A - B
    ];

    function programarAcorde(i) {
      if (!activo) return;
      const t = ctx.currentTime + 0.1;
      ACORDES[i % ACORDES.length].forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.02, t + 2.8);
        g.gain.setValueAtTime(0.02, t + 5.4);
        g.gain.linearRampToValueAtTime(0, t + 9);
        osc.connect(g).connect(musicaGain);
        osc.start(t);
        osc.stop(t + 9.2);
      });
      setTimeout(() => programarAcorde(i + 1), 8600);
    }

    const NOTAS = [440.0, 493.88, 554.37, 659.25, 739.99, 880.0];

    function programarMelodia() {
      if (!activo) return;
      const t = ctx.currentTime + 0.05;
      const f = NOTAS[Math.floor(Math.random() * NOTAS.length)];
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0004, t + 1.6);
      const eco = ctx.createDelay();
      eco.delayTime.value = 0.42;
      const ecoGain = ctx.createGain();
      ecoGain.gain.value = 0.28;
      osc.connect(g);
      g.connect(musicaGain);
      g.connect(eco);
      eco.connect(ecoGain).connect(musicaGain);
      ecoGain.connect(eco);
      osc.start(t);
      osc.stop(t + 1.7);
      setTimeout(
        programarMelodia,
        melodiaCada[0] + Math.random() * (melodiaCada[1] - melodiaCada[0]),
      );
    }

    function buhoCanta() {
      if (!activo) return;
      const t = ctx.currentTime + 0.05;
      [
        { t0: 0, dur: 0.2, f0: 420, f1: 360 },
        { t0: 0.34, dur: 0.42, f0: 400, f1: 310 },
      ].forEach((n) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.f0, t + n.t0);
        osc.frequency.linearRampToValueAtTime(n.f1, t + n.t0 + n.dur);
        const filtro = ctx.createBiquadFilter();
        filtro.type = "lowpass";
        filtro.frequency.value = 750;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t + n.t0);
        g.gain.linearRampToValueAtTime(0.14, t + n.t0 + 0.05);
        g.gain.linearRampToValueAtTime(0, t + n.t0 + n.dur);
        osc.connect(filtro).connect(g).connect(master);
        osc.start(t + n.t0);
        osc.stop(t + n.t0 + n.dur + 0.05);
      });
    }

    function destello(suave) {
      if (!activo) return;
      const t = ctx.currentTime + 0.02;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = suave ? 1174.66 : 1567.98;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(suave ? 0.03 : 0.045, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0004, t + 0.9);
      osc.connect(g).connect(master);
      osc.start(t);
      osc.stop(t + 1);
    }

    function calmar() {
      if (!activo) return;
      melodiaCada = [7000, 11000];
      musicaGain.gain.setTargetAtTime(0.55, ctx.currentTime, 4);
    }

    function despedidaSonido() {
      if (!activo) return;
      const t = ctx.currentTime + 0.1;

      // Viento suave.
      const viento = ctx.createBufferSource();
      viento.buffer = crearRuido();
      viento.loop = true;
      const fViento = ctx.createBiquadFilter();
      fViento.type = "bandpass";
      fViento.frequency.value = 420;
      fViento.Q.value = 0.5;
      const gViento = ctx.createGain();
      gViento.gain.setValueAtTime(0, t);
      gViento.gain.linearRampToValueAtTime(0.07, t + 2.5);
      gViento.gain.linearRampToValueAtTime(0, t + 8);
      viento.connect(fViento).connect(gViento).connect(master);
      viento.start(t);
      viento.stop(t + 8.2);

      // Campanillas.
      const campanas = [1318.51, 1567.98, 1760.0, 2093.0, 2637.02];
      for (let i = 0; i < 7; i++) {
        const f = campanas[Math.floor(Math.random() * campanas.length)];
        const t0 = t + 0.6 + i * 0.55 + Math.random() * 0.2;
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.05, t0 + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0004, t0 + 1.8);
        osc.connect(g).connect(master);
        osc.start(t0);
        osc.stop(t0 + 2);
      }
    }

    function alternarSilencio() {
      if (!activo) return muted;
      muted = !muted;
      master.gain.setTargetAtTime(muted ? 0 : 0.5, ctx.currentTime, 0.15);
      return muted;
    }

    function detenerAudio() {
      if (!activo) return;
      activo = false;
      try {
        ctx.close();
      } catch (e) {}
    }

    document.addEventListener("visibilitychange", () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else if (!muted) ctx.resume();
    });

    return {
      iniciar,
      buho: buhoCanta,
      destello,
      calmar,
      despedida: despedidaSonido,
      alternarSilencio,
      detener: detenerAudio,
    };
  })();

  soundBtn.addEventListener("click", () => {
    const silenciado = audio.alternarSilencio();
    soundBtn.innerHTML = silenciado
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
    soundBtn.setAttribute(
      "aria-label",
      silenciado ? "Activar el sonido" : "Silenciar el sonido",
    );
  });

  // ---------- Entrada ----------

  enterBtn.addEventListener("click", () => {
    if (comenzado) return;
    comenzado = true;
    intro.classList.add("oculta");
    audio.iniciar();
    soundBtn.hidden = false;

    setTimeout(() => {
      escribir(mensajePrincipal, MENSAJE_PRINCIPAL, 48, () => {
        setTimeout(() => mensajePrincipal.classList.add("desvanecido"), 9000);
      });
    }, 1600);

    programarFugaces();
    programarFaseLunar();
    setTimeout(brisaDePetalos, 8000);
    setTimeout(iniciarFinal, TIEMPO_FINAL);
  });

  // ---------- Salir de la escena ----------

  function detener() {
    terminado = true;
    clearTimeout(cartelTimer);
    clearInterval(faseLunaTimer);
    audio.detener();
  }

  window.detenerEscenaNoche = detener;

  // ---------- Inicio ----------

  aplicarFaseLunar();
  crearEstrellas();
  crearParticulas();
  crearFlores();
})();
