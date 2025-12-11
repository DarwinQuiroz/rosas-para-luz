const mensaje = `En esta Navidad quiero agradecerte por iluminar mi vida como 
las luces del árbol, por hacerme sentir amado cada día y por regalarme 
la magia más bonita: tu sonrisa. 🎄💖`;

let i = 0;
const speed = 45;

function typeWriter() {
  if (i < mensaje.length) {
    document.getElementById("mensaje").innerHTML += mensaje.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

/* Accion del botón de regalo */
document.getElementById("giftBtn").addEventListener("click", () => {
  alert("🎁✨ Pronto tendrás una sorpresa especial…");
});
