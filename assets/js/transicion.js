/* ============================================================
   Transición compartida entre las escenas del universo
   Uso: transicionA("escena-cafeteria", "Una frase para el camino…")
        — si el destino no es una escena ("escena-…"), navega de
          verdad (usado solo para volver a index.html al final).
   ============================================================ */

(function () {
  "use strict";

  const velo = document.createElement("div");
  velo.className = "velo-transicion";
  velo.setAttribute("aria-hidden", "true");

  const frase = document.createElement("p");
  frase.className = "velo-frase";
  velo.appendChild(frase);

  const estrellas = document.createElement("div");
  estrellas.className = "velo-estrellas";
  estrellas.innerHTML = "<span></span><span></span><span></span>";
  velo.appendChild(estrellas);

  if (document.body) {
    document.body.appendChild(velo);
  } else {
    document.addEventListener("DOMContentLoaded", () =>
      document.body.appendChild(velo)
    );
  }

  // Al entrar a cada escena se registra la visita (salvo el jardín, que ya
  // se registra al cargar la página).
  const PAGINA_POR_ESCENA = {
    "escena-cafeteria": "Cafeteria",
    "escena-noche": "BuenasNoches",
  };

  // Detiene el ambiente sonoro (WebAudio) de la escena que se abandona,
  // para que no siga sonando encima de la siguiente.
  const DETENER_POR_ESCENA = {
    "escena-jardin": "detenerEscenaJardin",
    "escena-noche": "detenerEscenaNoche",
  };

  let enCamino = false;

  window.transicionA = function (destino, texto, espera) {
    if (enCamino) return;
    enCamino = true;

    frase.textContent = texto || "";
    requestAnimationFrame(() => velo.classList.add("activo"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tiempo = reduce ? 600 : espera || 3400;

    setTimeout(() => {
      const esEscena = destino.indexOf("escena-") === 0;

      if (!esEscena) {
        window.location.href = destino;
        return;
      }

      const actual = document.querySelector(".escena-seccion:not([hidden])");
      if (actual) {
        const detenerFn = DETENER_POR_ESCENA[actual.id];
        if (detenerFn && typeof window[detenerFn] === "function") {
          window[detenerFn]();
        }
        actual.hidden = true;
      }

      const siguiente = document.getElementById(destino);
      if (siguiente) siguiente.hidden = false;

      const pagina = PAGINA_POR_ESCENA[destino];
      const _urlParams = new URLSearchParams(window.location.search);
      const _fromDashboard = _urlParams.get('redirect') === 'dashboard';
      if (pagina && !_fromDashboard && typeof window.agregarDatos === "function") {
        window.agregarDatos(pagina);
      }

      window.scrollTo(0, 0);

      setTimeout(() => {
        velo.classList.remove("activo");
        enCamino = false;
      }, 400);
    }, tiempo);
  };

  // Si se vuelve con el botón atrás (bfcache), retirar el velo.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      velo.classList.remove("activo");
      enCamino = false;
    }
  });
})();
