(function () {
  function r(a) {
    gsap.killTweensOf(a, { opacity: !0 });
    gsap.fromTo(
      a,
      { opacity: 1 },
      { duration: 0.07, opacity: Math.random(), repeat: -1 }
    );
  }
  function t(a) {
    e &&
      ((a = l[d]),
      gsap.set(a, {
        x: gsap.getProperty(".pContainer", "x"),
        y: gsap.getProperty(".pContainer", "y"),
        scale: m(),
      }),
      gsap.timeline().to(a, {
        duration: gsap.utils.random(0.61, 6),
        physics2D: {
          velocity: gsap.utils.random(-23, 23),
          angle: gsap.utils.random(-180, 180),
          gravity: gsap.utils.random(-6, 50),
        },
        scale: 0,
        rotation: gsap.utils.random(-123, 360),
        ease: "power1",
        onStart: r,
        onStartParams: [a],
        onRepeat: function (b) {
          gsap.set(b, { scale: m() });
        },
        onRepeatParams: [a],
      }),
      d++,
      (d = 201 <= d ? 0 : d));
  }
  MorphSVGPlugin.convertToPath("polygon");
  document.querySelector(".pContainer");
  var u = document.querySelector(".mainSVG");
  document.querySelector("#star");
  var c = document.querySelector(".sparkle");
  document.querySelector("#tree");
  var e = !0,
    n =
      "#E8F6F8 #ACE8F8 #F6FBFE #A2CBDC #B74551 #5DBA72 #910B28 #910B28 #446D39".split(
        " "
      ),
    p = ["#star", "#circ", "#cross", "#heart"],
    l = [],
    d = 0;
  gsap.set("svg", { visibility: "visible" });
  gsap.set(c, { transformOrigin: "50% 50%", y: -100 });
  c = function (a) {
    var b = [],
      f = MotionPathPlugin.getRawPath(a)[0];
    f.forEach(function (v, g) {
      var h = {};
      h.x = f[2 * g];
      h.y = f[2 * g + 1];
      g % 2 && b.push(h);
    });
    return b;
  };
  c(".treePath");
  var q = c(".treeBottomPath");
  c = gsap.timeline({ delay: 0, repeat: 0 });
  var k,
    m = gsap.utils.random(0.5, 3, 0.001, !0);
  (function () {
    for (var a = 201, b; -1 < --a; )
      (b = document.querySelector(p[a % p.length]).cloneNode(!0)),
        u.appendChild(b),
        b.setAttribute("fill", n[a % n.length]),
        b.setAttribute("class", "particle"),
        l.push(b),
        gsap.set(b, { x: -100, y: -100, transformOrigin: "50% 50%" });
  })();
  (function () {
    k = gsap.timeline({ onUpdate: t });
    k.to(".pContainer, .sparkle", {
      duration: 6,
      motionPath: { path: ".treePath", autoRotate: !1 },
      ease: "linear",
    })
      .to(".pContainer, .sparkle", {
        duration: 1,
        onStart: function () {
          e = !1;
        },
        x: q[0].x,
        y: q[0].y,
      })
      .to(
        ".pContainer, .sparkle",
        {
          duration: 2,
          onStart: function () {
            e = !0;
          },
          motionPath: { path: ".treeBottomPath", autoRotate: !1 },
          ease: "linear",
        },
        "-=0"
      )
      .from(
        ".treeBottomMask",
        { duration: 2, drawSVG: "0% 0%", stroke: "#FFF", ease: "linear" },
        "-=2"
      );
  })();
  c.from([".treePathMask", ".treePotMask"], {
    drawSVG: "0% 0%",
    stroke: "#FFF",
    stagger: { each: 6 },
    duration: gsap.utils.wrap([6, 1, 2]),
    ease: "linear",
  })
    .from(
      ".treeStar",
      {
        duration: 3,
        scaleY: 0,
        scaleX: 0.15,
        transformOrigin: "50% 50%",
        ease: "elastic(1,0.5)",
      },
      "-=4"
    )
    .to(
      ".sparkle",
      {
        duration: 3,
        opacity: 0,
        ease: "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})",
      },
      "-=0"
    )
    .to(
      ".treeStarOutline",
      {
        duration: 1,
        opacity: 1,
        ease: "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})",
      },
      "+=1"
    );
  c.add(k, 0);
  gsap.globalTimeline.timeScale(1.5);
  k.vars.onComplete = function () {
    gsap.to("foreignObject", { opacity: 1 });
  };
})();

(function () {
  const canvas = document.getElementById("snowCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const numFlakes = window.innerWidth < 600 ? 50 : 100;
  const flakes = [];

  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 0.5,
    });
  }

  function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for (let i = 0; i < numFlakes; i++) {
      const f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnow();

    requestAnimationFrame(drawSnow);
  }

  function moveSnow() {
    for (let i = 0; i < numFlakes; i++) {
      const f = flakes[i];
      f.y += Math.pow(f.d, 2) + 0.5;
      f.x += Math.sin(f.y * 0.05) * 0.5;

      if (f.y > height) {
        flakes[i] = { x: Math.random() * width, y: 0, r: f.r, d: f.d };
      }
    }
  }

  drawSnow();

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  const colors = [
    "#ff0000",
    "#00ff00",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#ffffff",
  ];
  const container = document.getElementById("effectsContainer");

  function createFirework(x, y) {
    if (!container) return;

    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("firework-particle");
      container.appendChild(particle);

      const color = colors[Math.floor(Math.random() * colors.length)];

      gsap.set(particle, {
        x: x,
        y: y,
        backgroundColor: color,
      });

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 80 + 40;

      gsap.to(particle, {
        x: x + Math.cos(angle) * velocity,
        y: y + Math.sin(angle) * velocity,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  }

  setInterval(() => {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * (window.innerHeight / 2);
    createFirework(randomX, randomY);
  }, 2500);

  const loveMessages = [
    "¡Te Amo! ❤️",
    "Preciosa🎄",
    "Mi mejor regalo 🎁",
    "Niña hermosa ✨",
    "¡Besos! 😘",
    "Mi Reina 💖",
  ];

  const divPino = document.getElementById("pino-love");

  window.addEventListener("mousedown", (e) => {
    if (!container) return;

    const randomText =
      loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const text = document.createElement("div");
    text.innerText = randomText;
    text.classList.add("love-text");
    container.appendChild(text);

    text.style.left = e.clientX + "px";
    text.style.top = e.clientY + "px";

    gsap.set(text, { xPercent: -50, yPercent: -50, scale: 0 });

    gsap.to(text, {
      scale: 1.5,
      y: -150,
      opacity: 0,
      duration: 5,
      ease: "power1.out",
      onComplete: () => text.remove(),
    });

    createFirework(e.clientX, e.clientY);
  });
})();
