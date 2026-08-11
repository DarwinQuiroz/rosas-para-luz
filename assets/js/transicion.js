/* ============================================================
   Transición compartida entre páginas de la experiencia
   Uso: transicionA("siguiente.html", "Una frase para el camino…")
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

  let enCamino = false;

  window.transicionA = function (url, texto, espera) {
    if (enCamino) return;
    enCamino = true;

    sessionStorage.setItem("isTransitioning", "true");
    frase.textContent = texto || "";
    requestAnimationFrame(() => velo.classList.add("activo"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(
      () => {
        window.location.href = url;
      },
      reduce ? 600 : espera || 3400
    );
  };

  // Si se vuelve con el botón atrás (bfcache), retirar el velo.
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      velo.classList.remove("activo");
      enCamino = false;
    }
  });
})();
