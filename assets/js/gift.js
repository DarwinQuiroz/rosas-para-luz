gsap.registerPlugin(CustomEase, EasePack, CustomWiggle);

jQuery(function ($) {
  const snowContainer = $('<div id="snow-container"></div>').prependTo("body");

  function createSnowflake() {
    const flake = $('<div class="snowflake"></div>');

    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.7 + 0.3;

    const startX = Math.random() * window.innerWidth;

    flake.css({
      width: size + "px",
      height: size + "px",
      left: startX,
      top: "-10px",
      opacity: opacity,
    });

    snowContainer.append(flake);

    gsap.to(flake, {
      y: window.innerHeight + 20,
      x: (Math.random() - 0.5) * 50,
      rotation: Math.random() * 360,
      duration: Math.random() * 3 + 4,
      ease: "none",
      onComplete: () => flake.remove(),
    });
  }

  setInterval(createSnowflake, 50);

  let flowerInterval;
  const letterContainer = $("#letterContainer");
  const gift = $("g.surprise-gift");
  const fallingContainer = $('<div id="falling-container"></div>').appendTo(
    "body"
  );

  const surpriseElements = ["❤️", "🎄", "✨", "🎁", "❄️"];

  $("[data-origin]").each(function () {
    gsap.set($(this).get(0), { transformOrigin: $(this).attr("data-origin") });
  });

  CustomWiggle.create("giftShake", { wiggles: 60, timingEase: "expo.out" });

  let openGiftTL = gsap.timeline({
    paused: true,
    onComplete: showLetterAndStartSurprise,
  });

  openGiftTL.to(gift, {
    rotation: 2.5,
    duration: 2,
    ease: "giftShake",
    onStart: () => $(".bg").removeClass("gift-open"),
  });
  openGiftTL.to(gift.find(".lid"), {
    yPercent: -70,
    rotation: -5,
    duration: 0.25,
    delay: -0.15,
    ease: "back.out(4)",
    onStart: () => $(".bg").addClass("gift-open"),
  });
  openGiftTL.to(gift.find(".lid-cast-shadow"), {
    scaleY: 2,
    opacity: 0,
    duration: 0.25,
    delay: -0.4,
    ease: "expo.in",
  });

  gift.on("click", function () {
    if (!openGiftTL.isActive()) {
      openGiftTL.play(0);
    }
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Enter") {
      gift.trigger("click");
    }
  });

  function showLetterAndStartSurprise() {
    letterContainer.fadeIn(500);
    flowerInterval = setInterval(dropSurpriseElements, 100);
  }

  function dropSurpriseElements() {
    const piece = $('<div class="flower-piece"></div>');
    const emoji =
      surpriseElements[Math.floor(Math.random() * surpriseElements.length)];
    piece.html(emoji);

    const startX = Math.random() * window.innerWidth;
    const startSize = Math.random() * 20 + 15;

    piece.css({
      left: startX,
      top: "-50px",
      fontSize: startSize + "px",
      textShadow: "0 0 5px rgba(255,255,255,0.3)",
      zIndex: 101,
    });

    fallingContainer.append(piece);

    const duration = Math.random() * 4 + 4;
    const endY = window.innerHeight + 50;
    const driftX = (Math.random() - 0.5) * 300;

    gsap.to(piece, {
      y: endY,
      x: `+=${driftX}`,
      rotation: Math.random() * 360,
      duration: duration,
      ease: "none",
      onComplete: () => piece.remove(),
    });
  }

  $("#letterImage").on("click", function () {
    letterContainer.fadeOut(500);
    clearInterval(flowerInterval);

    let closeGiftTL = gsap.timeline({ delay: 0.5 });
    closeGiftTL.to(gift.find(".lid"), {
      yPercent: 0,
      rotation: 0,
      duration: 0.5,
      ease: "bounce.out",
    });
    closeGiftTL.to(gift.find(".lid-cast-shadow"), {
      scaleY: 1,
      opacity: 0.2,
      duration: 0.5,
      delay: -0.5,
      ease: "bounce.out",
    });
    closeGiftTL.to(gift, {
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      delay: -0.2,
    });
  });
});
