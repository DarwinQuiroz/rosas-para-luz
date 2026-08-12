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
const visitasRef = db.ref("visitas");

// Obtener la IP pública del visitante
async function obtenerIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error al detectar IP:", error);
    return "No disponible";
  }
}

// Detectar navegador
function detectarNavegador() {
  const ua = navigator.userAgent;

  if (ua.indexOf("Firefox") > -1) return "Firefox";
  if (ua.indexOf("Chrome") > -1) return "Chrome";
  if (ua.indexOf("Safari") > -1) return "Safari";
  if (ua.indexOf("Edge") > -1) return "Edge";
  if (ua.indexOf("Opera") > -1) return "Opera";
  if (ua.indexOf("Trident") > -1) return "Internet Explorer";

  return "Desconocido";
}

// Registrar la visita a una página en Firebase
// La fecha no se calcula en el cliente (el reloj/zona horaria del
// visitante puede estar mal); el dashboard la formatea a partir de
// "timestamp", que Firebase asigna en el servidor.
async function registrarVisita(pagina) {
  if (window.location.hostname.includes("localhost")) return;

  const ip = await obtenerIP();

  if (ip === "No disponible") return;

  try {
    await visitasRef.push({
      ip: ip,
      pagina: pagina,
      navegador: detectarNavegador(),
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  } catch (error) {
    console.error("Error al guardar la visita:", error);
  }
}
