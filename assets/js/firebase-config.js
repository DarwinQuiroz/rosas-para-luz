const firebaseConfig = {
  apiKey: "AIzaSyBD3kKuQ6ZoPMzt5Ewiw8qD9xQ9a9NPymA",
  authDomain: "luz-html.firebaseapp.com",
  projectId: "luz-html",
  storageBucket: "luz-html.firebasestorage.app",
  messagingSenderId: "966256347636",
  appId: "1:966256347636:web:22ca68e77db86011f5d1a1",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Variables globales
let datosRef = db.ref("usuarios");
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

function agregarDatos() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const errorDiv = document.getElementById("error");

  // Validar
  if (!nombre || !email) {
    mostrarError("Por favor completa todos los campos");
    return;
  }

  if (!validarEmail(email)) {
    mostrarError("Por favor ingresa un email válido");
    return;
  }

  // Guardar en Firebase
  datosRef
    .push({
      nombre: nombre,
      email: email,
      fechaCreacion: new Date().toLocaleString("es-ES"),
    })
    .then(() => {
      // Limpiar formulario
      document.getElementById("nombre").value = "";
      document.getElementById("email").value = "";
      errorDiv.style.display = "none";
    })
    .catch((error) => {
      mostrarError("Error al guardar: " + error.message);
    });
}
