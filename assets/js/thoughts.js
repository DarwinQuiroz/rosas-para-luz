
const audioPlayer = document.getElementById("music-sound");
const playButton = document.getElementById("playButton");

document.addEventListener('DOMContentLoaded', () => {
    let musicStarted = false;

    const startMusic = () => {
        if (!musicStarted) {
            audioPlayer.play().catch(e => {
                playButton.style.display = "block";
                setTimeout(() => {
                    playButton.style.opacity = "1";
                }, 50);
            });
            musicStarted = true;
        }
    };

    window.addEventListener('scroll', () => {
        startMusic();
    });

    document.addEventListener('click', () => {
        startMusic();
    });

    playButton.addEventListener("click", () => {
        audioPlayer.play().then(() => {
            setTimeout(() => {
                playButton.style.display = "none";
            }, 1500);
        }).catch((err) => {
            console.log("No se pudo reproducir el audio: " + err.message);
    });
    });

    const createHeart = (x, y) => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.opacity = '0.9';
        heart.style.animation = `heart-fly ${Math.random() * 3 + 2}s linear forwards`;

        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @keyframes heart-fly {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
                    100% { transform: translate(-50%, -150%) scale(0.5); opacity: 0; }
                }
            </style>`
        );

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    };

    const createHeartExplosion = (x, y) => {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                createHeart(x + offsetX, y + offsetY);
            }, i * 50);
        }
    };

    document.addEventListener('click', (e) => {
        createHeartExplosion(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        Array.from(e.touches).forEach(touch => {
            createHeartExplosion(touch.clientX, touch.clientY);
        });
    });

    const secciones = document.querySelectorAll('.seccion');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.1 });

    secciones.forEach(seccion => observer.observe(seccion));

    const crearPetalos = () => {
        const colores = ['#ff9bb8', '#e75480', '#c9a0dc', '#ffd6e8'];
        const contenedor = document.querySelector('.flotantes');

        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const petalo = document.createElement('div');
                petalo.classList.add('petalo');
                petalo.innerHTML = '❀';
                petalo.style.left = `${Math.random() * 100}vw`;
                petalo.style.color = colores[Math.floor(Math.random() * colores.length)];
                petalo.style.fontSize = `${Math.random() * 1 + 1}rem`;
                petalo.style.animationDuration = `${Math.random() * 3 + 5}s`;
                contenedor.appendChild(petalo);
                setTimeout(() => petalo.remove(), 8000);
            }, i * 500);
        }
    }

    crearPetalos();
    setInterval(crearPetalos, 6000);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            audioPlayer.pause();
        } else if (audioPlayer.paused) {
            audioPlayer.play();
        }
    });
});
    