/* ============================================
   FELIZ CUMPLEAÑOS #23 — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Floating Particles ----------
  createParticles();

  // ---------- Confetti burst on load ----------
  setTimeout(() => launchConfetti(80), 800);

  // ---------- Scroll animations ----------
  initScrollObserver();

  // ---------- Lightbox ----------
  initLightbox();

  // ---------- Wish button ----------
  initWishButton();
});

/* ======= Floating Particles ======= */
function createParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  const colors = [
    '#f8c8dc', '#e6d7f1', '#c8f0e0', '#fdd9b5',
    '#fef3c7', '#bde0fe', '#f9a8c9', '#d8b4fe'
  ];

  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 14 + 6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    container.appendChild(p);
  }
}

/* ======= Confetti ======= */
function launchConfetti(count) {
  const container = document.querySelector('.confetti-container');
  if (!container) return;
  const colors = ['#f8c8dc','#e6d7f1','#c8f0e0','#fdd9b5','#fef3c7','#bde0fe','#f9a8c9','#d8b4fe'];
  const shapes = ['circle', 'square', 'triangle'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 8 + 6;

    piece.style.left = Math.random() * 100 + '%';
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    piece.style.background = color;
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';

    if (shape === 'circle') {
      piece.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
      piece.style.background = 'transparent';
      piece.style.width = '0';
      piece.style.height = '0';
      piece.style.borderLeft = (size / 2) + 'px solid transparent';
      piece.style.borderRight = (size / 2) + 'px solid transparent';
      piece.style.borderBottom = size + 'px solid ' + color;
    }

    container.appendChild(piece);

    // Clean up after animation
    setTimeout(() => piece.remove(), 5000);
  }
}

/* ======= Scroll Observer ======= */
function initScrollObserver() {
  const targets = document.querySelectorAll('.phrase-card, .gallery-item, .message-box');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 120;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  targets.forEach(t => observer.observe(t));
}

/* ======= Lightbox ======= */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ======= Wish Button — Enhanced Interactive Experience ======= */
function initWishButton() {
  const btn = document.querySelector('.wish-btn');
  const overlay = document.getElementById('wishOverlay');
  const closeBtn = document.getElementById('wishOverlayClose');
  if (!btn) return;

  let twinkleStars = [];
  let shootingStarElements = [];

  btn.addEventListener('click', (e) => {
    if (btn.classList.contains('wishing')) return;

    // 1. Ripple effect on button
    createRipple(btn, e);

    // 2. Button glow
    btn.classList.add('wishing');
    setTimeout(() => btn.classList.remove('wishing'), 1200);

    // 3. Confetti bursts
    launchConfetti(120);
    setTimeout(() => launchConfetti(80), 400);
    setTimeout(() => launchConfetti(60), 800);
    setTimeout(() => launchConfetti(100), 1200);

    // 4. Fireworks
    launchFireworks();

    // 5. Floating emojis
    launchFloatingEmojis();

    // 6. Sparkle particles around button
    launchSparkles(btn);

    // 7. Show magical overlay after a short delay
    setTimeout(() => {
      showWishOverlay(overlay);
      twinkleStars = createTwinkleStars();
      shootingStarElements = createShootingStars();
    }, 1500);
  });

  // Close overlay
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeWishOverlay(overlay, twinkleStars, shootingStarElements);
    });
  }

  if (overlay) {
    overlay.querySelector('.wish-overlay-bg').addEventListener('click', () => {
      closeWishOverlay(overlay, twinkleStars, shootingStarElements);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      closeWishOverlay(overlay, twinkleStars, shootingStarElements);
    }
  });
}

/* --- Ripple Effect --- */
function createRipple(btn, e) {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

/* --- Fireworks (Canvas) --- */
function launchFireworks() {
  const canvas = document.createElement('canvas');
  canvas.classList.add('fireworks-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const fireworks = [];
  const particles = [];
  const colors = ['#f8c8dc', '#e6d7f1', '#c8f0e0', '#fdd9b5', '#fef3c7', '#bde0fe', '#f9a8c9', '#d8b4fe', '#ffd700', '#ff6b9d'];

  // Create firework rockets
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      fireworks.push({
        x: Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
        y: canvas.height,
        targetY: Math.random() * canvas.height * 0.4 + 50,
        speed: 4 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        exploded: false
      });
    }, i * 200);
  }

  function explode(fw) {
    const count = 40 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 1.5 + Math.random() * 3;
      particles.push({
        x: fw.x,
        y: fw.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.01 + Math.random() * 0.015,
        size: 2 + Math.random() * 2
      });
    }
  }

  let animFrame;
  function animate() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    // Update fireworks
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const fw = fireworks[i];
      fw.y -= fw.speed;

      // Draw trail
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = fw.color;
      ctx.fill();

      if (fw.y <= fw.targetY) {
        explode(fw);
        fireworks.splice(i, 1);
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // gravity
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    if (fireworks.length > 0 || particles.length > 0) {
      animFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animFrame);
      canvas.remove();
    }
  }

  animate();

  // Auto-cleanup
  setTimeout(() => {
    cancelAnimationFrame(animFrame);
    if (canvas.parentNode) canvas.remove();
  }, 6000);
}

/* --- Floating Emojis --- */
function launchFloatingEmojis() {
  const emojis = ['💖', '🌟', '✨', '🦋', '🌸', '💫', '⭐', '🎀', '💝', '🌷', '🎂', '🎉', '🎊', '💕'];

  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.classList.add('floating-emoji');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.bottom = '-10px';
      emoji.style.fontSize = (1.2 + Math.random() * 1.5) + 'rem';

      const duration = 3 + Math.random() * 3;
      const rotation = (Math.random() - 0.5) * 60;
      emoji.style.setProperty('--duration', duration + 's');
      emoji.style.setProperty('--rot', rotation + 'deg');

      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), duration * 1000);
    }, i * 100);
  }
}

/* --- Sparkle Particles around Button --- */
function launchSparkles(btn) {
  const rect = btn.getBoundingClientRect();
  const colors = ['#ffd700', '#fff6a0', '#ffc83d', '#f8c8dc', '#d8b4fe', '#ff6b9d'];

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.classList.add('wish-sparkle');

      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.width = (3 + Math.random() * 5) + 'px';
      sparkle.style.height = sparkle.style.width;

      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200 - 80;
      sparkle.style.setProperty('--tx', tx + 'px');
      sparkle.style.setProperty('--ty', ty + 'px');

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    }, i * 40);
  }
}

/* --- Wish Overlay --- */
function showWishOverlay(overlay) {
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWishOverlay(overlay, twinkleStars, shootingStarElements) {
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';

  // Clean up stars
  twinkleStars.forEach(star => star.remove());
  shootingStarElements.forEach(star => star.remove());
  twinkleStars.length = 0;
  shootingStarElements.length = 0;
}

/* --- Twinkling Stars for Overlay --- */
function createTwinkleStars() {
  const stars = [];
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.classList.add('twinkle-star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.setProperty('--duration', (1.5 + Math.random() * 2.5) + 's');
    star.style.setProperty('--delay', (Math.random() * 3) + 's');

    const size = 2 + Math.random() * 4;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    document.body.appendChild(star);
    stars.push(star);
  }
  return stars;
}

/* --- Shooting Stars for Overlay --- */
function createShootingStars() {
  const elements = [];
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    star.style.left = Math.random() * 80 + 'vw';
    star.style.top = Math.random() * 40 + 'vh';
    star.style.setProperty('--duration', (0.8 + Math.random() * 0.6) + 's');
    star.style.setProperty('--delay', (i * 1.5 + Math.random()) + 's');
    star.style.setProperty('--angle', (-30 - Math.random() * 20) + 'deg');
    star.style.setProperty('--tx', (200 + Math.random() * 300) + 'px');
    star.style.setProperty('--ty', (100 + Math.random() * 200) + 'px');

    document.body.appendChild(star);
    elements.push(star);

    // Remove after animation
    setTimeout(() => {
      if (star.parentNode) star.remove();
    }, (i * 1.5 + 2) * 1000);
  }
  return elements;
}

