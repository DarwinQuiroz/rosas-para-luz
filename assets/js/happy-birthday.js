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

/* ======= Wish Button ======= */
function initWishButton() {
  const btn = document.querySelector('.wish-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    launchConfetti(120);

    // Multiple bursts
    setTimeout(() => launchConfetti(60), 600);
    setTimeout(() => launchConfetti(40), 1200);

    // Animate the button
    btn.style.transform = 'scale(1.15)';
    setTimeout(() => btn.style.transform = '', 300);
  });
}
