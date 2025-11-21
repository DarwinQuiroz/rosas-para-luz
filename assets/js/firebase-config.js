const firebaseConfig = {
  apiKey: "AIzaSyBD3kKuQ6ZoPMzt5Ewiw8qD9xQ9a9NPymA",
  authDomain: "luz-html.firebaseapp.com",
  projectId: "luz-html",
  storageBucket: "luz-html.firebasestorage.app",
  messagingSenderId: "966256347636",
  appId: "1:966256347636:web:22ca68e77db86011f5d1a1",
  measurementId: "G-4WGPST90BG",
  databaseURL: "https://luz-html-default-rtdb.firebaseio.com/",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Variables globales
let datosRef = db.ref("visitas");
let estadoConectado = false;

firebase
  .database()
  .ref(".info/connected")
  .on("value", (snapshot) => {
    estadoConectado = snapshot.val();
    const statusDiv = document.getElementById("status");

    if (estadoConectado) {
      statusDiv.textContent = "✓ Conectado a Firebase";
      statusDiv.className = "status connected";
    } else {
      statusDiv.textContent = "✗ Desconectado";
      statusDiv.className = "status disconnected";
    }
  });

// Detectar IP
async function detectarIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    document.getElementById("miIP").textContent = data.ip;
    return data.ip;
  } catch (error) {
    console.error("Error al detectar IP:", error);
    document.getElementById("miIP").textContent = "No disponible";
    return "No disponible";
  }
}

// Actualizar fecha y hora en tiempo real
function actualizarFechaHora() {
  const ahora = new Date();
  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const fechaFormato = ahora.toLocaleString("es-ES", opciones);
  document.getElementById("fechaHora").textContent = fechaFormato;
}

// Detectar navegador
function detectarNavegador() {
  const ua = navigator.userAgent;
  let navegador = "Desconocido";

  if (ua.indexOf("Firefox") > -1) navegador = "Firefox";
  else if (ua.indexOf("Chrome") > -1) navegador = "Chrome";
  else if (ua.indexOf("Safari") > -1) navegador = "Safari";
  else if (ua.indexOf("Edge") > -1) navegador = "Edge";
  else if (ua.indexOf("Opera") > -1) navegador = "Opera";
  else if (ua.indexOf("Trident") > -1) navegador = "Internet Explorer";

  return navegador;
}

// Función para agregar datos
function agregarDatos(pagina) {
  const ip = document.getElementById("miIP").textContent;
  const fecha = document.getElementById("fechaHora").textContent;
  const navegador = detectarNavegador();
  const errorDiv = document.getElementById("error");

  // Validar que la IP se haya detectado correctamente
  if (ip === "Detectando..." || ip === "No disponible") {
    mostrarError("Esperando a detectar tu IP...");
    return;
  }

  // Guardar en Firebase
  datosRef
    .push({
      ip: ip,
      fecha: fecha,
      pagina: pagina,
      navegador: navegador,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    })
    .then(() => {
      errorDiv.style.display = "none";
      // Mostrar mensaje de éxito temporal
      const mensajeExito = document.createElement("div");
      mensajeExito.className = "status connected";
      mensajeExito.textContent = "✓ Datos guardados correctamente";
      document
        .querySelector(".container")
        .insertBefore(mensajeExito, errorDiv.nextSibling);
      setTimeout(() => mensajeExito.remove(), 3000);
    })
    .catch((error) => {
      mostrarError("Error al guardar: " + error.message);
    });
}

// Mostrar errores
function mostrarError(mensaje) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = mensaje;
  errorDiv.style.display = "block";
}
