/**
 * ===== WOMEN'S DAY PAGE - INTERACTIVE ANIMATIONS =====
 * Petal rain, sparkle cursor, scroll reveals, typewriter effect
 */

(function () {
  'use strict';

  // ===== PETAL RAIN (Canvas) =====
  const canvas = document.getElementById('wd-petal-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let petals = [];
    const petalColors = [
      'rgba(248,200,220,0.7)',
      'rgba(230,213,245,0.6)',
      'rgba(242,166,192,0.5)',
      'rgba(213,184,232,0.6)',
      'rgba(253,226,204,0.5)',
      'rgba(200,240,224,0.5)'
    ];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Petal {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 12 + 6;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.swingAmplitude = Math.random() * 2;
        this.swingSpeed = Math.random() * 0.02 + 0.01;
        this.time = Math.random() * 100;
      }
      update() {
        this.time += this.swingSpeed;
        this.x += this.speedX + Math.sin(this.time) * this.swingAmplitude;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          this.size / 2, -this.size / 2,
          this.size, this.size / 4,
          0, this.size
        );
        ctx.bezierCurveTo(
          -this.size, this.size / 4,
          -this.size / 2, -this.size / 2,
          0, 0
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Create petals
    const maxPetals = window.innerWidth < 768 ? 25 : 50;
    for (let i = 0; i < maxPetals; i++) {
      const p = new Petal();
      p.y = Math.random() * canvas.height; // Distribute initially
      petals.push(p);
    }

    function animatePetals() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animatePetals);
    }
    animatePetals();
  }

  // ===== SPARKLE CURSOR EFFECT =====
  let sparkleThrottle = 0;
  document.addEventListener('mousemove', function (e) {
    if (Date.now() - sparkleThrottle < 60) return;
    sparkleThrottle = Date.now();

    const sparkle = document.createElement('div');
    sparkle.className = 'wd-sparkle';
    const colors = ['#f8c8dc', '#e6d5f5', '#c8f0e0', '#fde2cc', '#f2a6c0', '#d5b8e8'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.left = e.clientX + (Math.random() * 20 - 10) + 'px';
    sparkle.style.top = e.clientY + (Math.random() * 20 - 10) + 'px';
    sparkle.style.width = Math.random() * 6 + 4 + 'px';
    sparkle.style.height = sparkle.style.width;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });

  // ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animations
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('wd-visible');
        }, delay);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll('.wd-quote-card, .wd-photo-card, .wd-message-card, .wd-reveal').forEach((el, i) => {
    el.dataset.delay = i * 100;
    scrollObserver.observe(el);
  });

  // ===== TYPEWRITER EFFECT =====
  const typewriterEl = document.querySelector('.wd-typewriter');
  if (typewriterEl) {
    const text = typewriterEl.dataset.text || typewriterEl.textContent;
    typewriterEl.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'wd-typewriter-cursor';
    typewriterEl.after(cursor);

    let charIndex = 0;
    function typeChar() {
      if (charIndex < text.length) {
        typewriterEl.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeChar, 50 + Math.random() * 40);
      } else {
        // Keep cursor blinking for a while, then fade out
        setTimeout(() => {
          cursor.style.transition = 'opacity 1s ease';
          cursor.style.opacity = '0';
          setTimeout(() => cursor.remove(), 1000);
        }, 2000);
      }
    }

    // Start typewriter when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(typeChar, 1800);
        heroObserver.disconnect();
      }
    });
    const heroSection = document.querySelector('.wd-hero');
    if (heroSection) heroObserver.observe(heroSection);
  }

  // ===== SMOOTH SCROLL TO SECTIONS =====
  const scrollIndicator = document.querySelector('.wd-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('.wd-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== FLOATING PARTICLES GENERATOR =====
  const particlesContainer = document.querySelector('.wd-particles');
  if (particlesContainer) {
    const particleCount = window.innerWidth < 768 ? 12 : 20;
    const particleColors = ['#f8c8dc', '#e6d5f5', '#c8f0e0', '#fde2cc', '#d5b8e8', '#c8e6f5'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'wd-particle';
      const size = Math.random() * 15 + 5;
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = color;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 15 + 10 + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particlesContainer.appendChild(particle);
    }
  }

  // ===== PHOTO GALLERY: Click to upload (optional interactive feature) =====
  document.querySelectorAll('.wd-photo-placeholder').forEach(placeholder => {
    placeholder.closest('.wd-photo-card')?.addEventListener('click', function () {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const wrapper = this.querySelector('.wd-photo-wrapper');
            const img = document.createElement('img');
            img.src = ev.target.result;
            img.alt = 'Foto de Luz';
            // Remove placeholder
            const ph = wrapper.querySelector('.wd-photo-placeholder');
            if (ph) ph.remove();
            wrapper.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    });
  });

})();
