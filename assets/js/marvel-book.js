!(function () {
  const e = document.getElementById("stars"),
    t = document.getElementById("hearts"),
    n = document.getElementById("book"),
    a = document.getElementById("scene");
  let o = !1;
  function s() {
    const e = innerWidth,
      t = innerHeight;
    o = t > e;
  }
  addEventListener("resize", s), addEventListener("orientationchange", s), s();
  for (let t = 0; t < 120; t++) {
    const t = document.createElement("div");
    (t.className = "star"),
      (t.style.left = 100 * Math.random() + "%"),
      (t.style.top = 100 * Math.random() + "%");
    const n = 2 * Math.random() + 1;
    (t.style.width = n + "px"),
      (t.style.height = n + "px"),
      (t.style.animationDuration = 5 * Math.random() + 3 + "s"),
      (t.style.animationDelay = 10 * Math.random() + "s"),
      e.appendChild(t);
  }
  setInterval(function () {
    const e = document.createElement("div");
    (e.className = "shooting-star"),
      (e.style.height = 2 * Math.random() + 1 + "px");
    const t = 1e3 + 3e3 * Math.random();
    o
      ? ((e.style.top = 100 * Math.random() + "%"),
        (e.style.left = "110vw"),
        e.animate(
          [
            { transform: "translateX(0)", opacity: 1 },
            { transform: "translateX(-130vw)", opacity: 0 },
          ],
          { duration: t, easing: "linear" }
        ))
      : ((e.style.top = 100 * Math.random() + "%"),
        (e.style.left = "-150px"),
        e.animate(
          [
            { transform: "translateX(0)", opacity: 1 },
            { transform: "translateX(130vw)", opacity: 0 },
          ],
          { duration: t, easing: "linear" }
        )),
      document.body.appendChild(e),
      setTimeout(() => e.remove(), t);
  }, 600),
    setInterval(() => {
      const e = document.createElement("span");
      (e.textContent = ["❤️", "💗", "💖", "💕"][Math.floor(4 * Math.random())]),
        e.style.setProperty("--dur", 3 * Math.random() + 3 + "s"),
        (e.style.left = 100 * Math.random() + "%"),
        (e.style.fontSize = 1.5 * Math.random() + 1.2 + "rem"),
        t.appendChild(e),
        setTimeout(() => e.remove(), 7e3);
    }, 900);
  const r = Math.ceil(3) + 1,
    i = {},
    d = {};
  function c(e) {
    for (const t in i)
      +t !== e && (i[t].pause(), d[t] && (d[t].textContent = "▶️"));
  }
  const l = (e) => {
    const t = document.createElement("div");
    (t.className = "page"),
      1 === e
        ? (t.style.background =
            "url('./assets/marvelbook/images/dcstringe.png') center/cover no-repeat")
        : 2 === e
        ? (t.style.background =
            "url('./assets/marvelbook/images/capitan.png') center/cover no-repeat")
        : 3 === e
        ? (t.style.background =
            "url('./assets/marvelbook/images/tor.png') center/cover no-repeat")
        : 4 === e
        ? (t.style.background =
            "url('./assets/marvelbook/images/lokii.png') center/cover no-repeat")
        : 5 === e
        ? (t.style.background =
            "url('./assets/marvelbook/images/spider.png') center/cover no-repeat")
        : 6 === e &&
          (t.style.background =
            "url('./assets/marvelbook/images/iroman.png') center/cover no-repeat"),
      (t.innerHTML = `<div class="folio">${e}</div>`);
    const n = document.createElement("audio");
    (n.src =
      {
        1: "./assets/marvelbook/sounds/stringe.mp3",
        2: "./assets/marvelbook/sounds/capitan.mp3",
        3: "./assets/marvelbook/sounds/thor.mp3",
        4: "./assets/marvelbook/sounds/loki.mp3",
        5: "./assets/marvelbook/sounds/spiderman.mp3",
        6: "./assets/marvelbook/sounds/ironman.mp3",
      }[e] || ""),
      (n.preload = "none"),
      (n.controls = !1),
      (n.style.display = "none"),
      t.appendChild(n);
    const a = document.createElement("button");
    (a.textContent = "▶️"),
      (a.className = "audio-btn"),
      (a.style.position = "absolute"),
      (a.style.top = "20px"),
      (a.style.right = "20px"),
      (a.style.padding = "10px 16px"),
      (a.style.fontSize = "1.2rem"),
      (a.style.background = "transparent"),
      (a.style.border = "2px solid white"),
      (a.style.borderRadius = "8px"),
      (a.style.color = "white"),
      (a.style.cursor = "pointer"),
      (a.style.zIndex = "10"),
      (a.style.pointerEvents = "auto");
    const o = (e) => {
      e.stopPropagation(), e.stopImmediatePropagation();
    };
    return (
      a.addEventListener("pointerdown", o),
      a.addEventListener("mousedown", o),
      a.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault(), o(e);
        },
        { passive: !1 }
      ),
      a.addEventListener("click", (t) => {
        t.stopPropagation(),
          n.paused
            ? (c(e),
              n
                .play()
                .then(() => (a.textContent = "⏸️"))
                .catch((e) => console.warn("Bloqueado:", e)))
            : (n.pause(), (a.textContent = "▶️"));
      }),
      a.addEventListener(
        "touchend",
        (t) => {
          t.preventDefault(),
            t.stopPropagation(),
            n.paused
              ? (c(e),
                n
                  .play()
                  .then(() => (a.textContent = "⏸️"))
                  .catch((e) => console.warn("Bloqueado:", e)))
              : (n.pause(), (a.textContent = "▶️"));
        },
        { passive: !1 }
      ),
      (i[e] = n),
      (d[e] = a),
      t.appendChild(a),
      t
    );
  };
  document.addEventListener(
    "touchstart",
    () => {
      for (const e in i) i[e].load();
    },
    { once: !0 }
  );
  const p = () => {
      const e = document.createElement("div");
      (e.className = "cover"),
        (e.style.position = "absolute"),
        (e.style.inset = "0"),
        (e.style.background =
          "url('./assets/marvelbook/images/portadaa.png') center/cover no-repeat"),
        (e.style.color = "#fff"),
        (e.style.textAlign = "center"),
        (e.style.textShadow = "0 3px 8px rgba(0,0,0,.9)"),
        (e.style.display = "flex"),
        (e.style.flexDirection = "column"),
        (e.style.justifyContent = "center"),
        (e.style.borderRadius = "14px");
      const t = document.createElement("div");
      return (
        (t.style.position = "absolute"),
        (t.style.left = "0"),
        (t.style.top = "0"),
        (t.style.bottom = "0"),
        (t.style.width = "50px"),
        (t.style.borderTopLeftRadius = "14px"),
        (t.style.borderBottomLeftRadius = "14px"),
        e.appendChild(t),
        e
      );
    },
    m = () => {
      const e = document.createElement("div");
      (e.className = "cover cover-back"),
        (e.style.position = "absolute"),
        (e.style.inset = "0"),
        (e.style.background =
          "url('./assets/marvelbook/images/atras.png') center/cover no-repeat"),
        (e.style.textAlign = "center"),
        (e.style.color = "#fff"),
        (e.style.textShadow = "0 3px 8px rgba(0,0,0,.9)"),
        (e.style.display = "flex"),
        (e.style.flexDirection = "column"),
        (e.style.justifyContent = "center"),
        (e.style.borderRadius = "14px"),
        (e.innerHTML = "");
      const t = document.createElement("div");
      return (
        (t.style.position = "absolute"),
        (t.style.right = "0"),
        (t.style.top = "0"),
        (t.style.bottom = "0"),
        (t.style.width = "30px"),
        (t.style.borderTopRightRadius = "14px"),
        (t.style.borderBottomRightRadius = "14px"),
        e.appendChild(t),
        e
      );
    },
    u = [];
  for (let e = 0; e < r; e++) {
    const t = document.createElement("div");
    (t.className = "sheet"),
      (t.dataset.i = e),
      (t._a = 0),
      (t._t = 0),
      (t._v = 0),
      (t.style.zIndex = 4e3 - e);
    const a = document.createElement("div");
    a.className = "face right";
    const o = document.createElement("div");
    o.className = "face left";
    const s = document.createElement("div");
    s.className = "inner";
    const i = document.createElement("div");
    if (((i.className = "inner"), 0 === e))
      s.appendChild(p()), i.appendChild(l(1));
    else if (e === r - 1) s.appendChild(l(6)), i.appendChild(m());
    else {
      const t = 2 * e,
        n = 2 * e + 1;
      t <= 6 && s.appendChild(l(t)), n <= 6 && i.appendChild(l(n));
    }
    a.appendChild(s), o.appendChild(i);
    const d = document.createElement("div");
    d.className = "curl-overlay";
    const c = document.createElement("div");
    c.className = "curl-overlay";
    const h = document.createElement("div");
    h.className = "specular";
    const y = document.createElement("div");
    y.className = "specular";
    const g = document.createElement("div");
    g.className = "edge-spec";
    const v = document.createElement("div");
    (v.className = "edge-spec"),
      s.appendChild(d),
      s.appendChild(h),
      s.appendChild(g),
      i.appendChild(c),
      i.appendChild(y),
      i.appendChild(v),
      t.appendChild(a),
      t.appendChild(o);
    const f = document.createElement("div");
    (f.className = "shadow"),
      t.appendChild(f),
      (t._shadow = f),
      (t._curlR = d),
      (t._curlL = c),
      (t._specR = h),
      (t._specL = y),
      (t._edgeR = g),
      (t._edgeL = v),
      t.addEventListener("pointerdown", b),
      t.addEventListener("touchstart", b),
      n.appendChild(t),
      u.push(t);
  }
  let h = 0;
  const y = 1 / 60;
  let g = !1;
  function v() {
    g = !0;
    let e = !1;
    for (const t of u) {
      const n = t._t - t._a;
      (t._v += (14 * n - 5 * t._v) * y),
        (t._a += t._v * y),
        t._a < 0 && ((t._a = 0), (t._v = 0)),
        t._a > Math.PI && ((t._a = Math.PI), (t._v = 0));
      const a = (180 * -t._a) / Math.PI;
      t.style.transform = `rotateY(${a}deg)`;
      const o = t._a / Math.PI;
      if (o > 0 && o < 1) {
        const e = o < 0.5 ? 0.55 * o : 0.55 * (1 - o),
          n = 60 + 90 * o;
        (t._shadow.style.background = `radial-gradient(120% 100% at ${
          100 * o
        }% 50%,rgba(0,0,0,${e}) 0%,rgba(0,0,0,${
          0.5 * e
        }) ${n}%,transparent 100%)`),
          (t._shadow.style.opacity = e > 0.01 ? 1 : 0);
      } else t._shadow.style.opacity = 0;
      const s = (180 * t._a) / Math.PI;
      (t.style.zIndex = s < 90 ? 4e3 - +t.dataset.i : +t.dataset.i + 6e3),
        Math.abs(n) > 0.001 && (e = !0);
    }
    e ? requestAnimationFrame(v) : (g = !1);
  }
  function f() {
    const e = window.innerWidth,
      a = window.innerHeight,
      o = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--book-w")
      ),
      s = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--book-h")
      );
    let r, i;
    a > e
      ? ((i = 90),
        t.classList.add("horizontal"),
        (r = Math.min((e - 32) / s, (a - 32) / o)))
      : ((i = 0),
        t.classList.remove("horizontal"),
        (r = Math.min((e - 32) / o, (a - 32) / s)));
    let d = 0,
      c = 0;
    0 === i
      ? (0 === h && (d = (-o / 4) * r), h === u.length && (d = (o / 4) * r))
      : (0 === h && (c = (-o / 4) * r), h === u.length && (c = (o / 4) * r)),
      (n.style.transition = "transform 0.9s cubic-bezier(.25,1.5,.5,1)"),
      (n.style.transform = `translate(calc(-50% + ${d}px), calc(-50% + ${c}px)) rotate(${i}deg) scale(${r})`);
  }
  let x = null;
  function E(e) {
    return e.touches && e.touches.length
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
  }
  function b(e) {
    const t = E(e),
      n = e.currentTarget,
      a = +n.dataset.i;
    (a !== h && a !== h - 1) ||
      ((x = { s: n, i: a, sx: t.x, sy: t.y, sa: n._a }),
      (n.style.zIndex = 8e3),
      e.type.startsWith("pointer") && n.setPointerCapture(e.pointerId),
      document.addEventListener("pointermove", C),
      document.addEventListener("pointerup", M, { once: !0 }),
      document.addEventListener("touchmove", C, { passive: !1 }),
      document.addEventListener("touchend", M, { once: !0 }));
  }
  function C(e) {
    if (!x) return;
    e.cancelable && e.preventDefault();
    const t = E(e),
      { s: o, sx: s, sy: r, sa: i } = x;
    let d, c;
    90 === (n.style.transform.includes("90deg") ? 90 : 0)
      ? ((d = t.y - r), (c = 0.5 * a.clientHeight))
      : ((d = t.x - s), (c = 0.5 * a.clientWidth));
    let l = i - (d / c) * Math.PI;
    l < 0 && (l = 0), l > Math.PI && (l = Math.PI), (o._t = l), g || v();
  }
  function M() {
    if (!x) return;
    const { s: e, i: t } = x;
    (x = null),
      document.removeEventListener("pointermove", C),
      document.removeEventListener("touchmove", C);
    const n = e._a >= Math.PI / 2;
    (e._t = n ? Math.PI : 0),
      (h = n ? Math.max(h, t + 1) : Math.min(h, t)),
      g || v(),
      f();
  }
  addEventListener("resize", f),
    addEventListener("orientationchange", f),
    addEventListener("load", () => {
      f(), setTimeout(() => n.classList.add("ready"), 100);
    });
})();
