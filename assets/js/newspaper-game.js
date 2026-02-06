// Banco de palabras románticas
const WORD_BANK = [
  // Palabras cortas (4-5 letras)
  "AMOR",
  "VIDA",
  "TUYO",
  "BESOS",
  "ALMA",
  "FELIZ",
  "LUNA",
  "MIEL",
  "RISA",
  "DULCE",
  "CIELO",
  "BELLO",
  "UNICO",

  // Palabras medianas (6-7 letras)
  "SIEMPRE",
  "JUNTOS",
  "TESORO",
  "ABRAZO",
  "CARIÑO",
  "TERNURA",
  "MAGIA",
  "REGALO",
  "SONRISA",
  "MIRADA",
  "PARAISO",
  "ALEGRIA",
  "FORTUNA",
  "ESTRELLA",
  "DESTINO",
  "ENCANTO",
  "AMANECER",

  // Palabras largas (8 letras)
  "CORAZON",
  "PASION",
  "ILUSION",
  "ROMANCE",
];

const GRID_SIZE = 8;
const WORDS_PER_GAME = 5; // Número de palabras por juego

let WORDS = []; // Palabras actuales del juego
let grid = [];
let wordPositions = {};
let isSelecting = false;
let selectedCells = [];
let foundWords = new Set();
let startCell = null;

// Seleccionar palabras aleatorias del banco
function selectRandomWords() {
  // Filtrar palabras que quepan en el grid
  const validWords = WORD_BANK.filter((word) => word.length <= GRID_SIZE);

  // Mezclar el array
  const shuffled = [...validWords].sort(() => Math.random() - 0.5);

  // Seleccionar palabras variadas (intentar incluir diferentes longitudes)
  const selected = [];
  const shortWords = shuffled.filter((w) => w.length <= 5);
  const mediumWords = shuffled.filter((w) => w.length >= 6 && w.length <= 7);
  const longWords = shuffled.filter((w) => w.length === 8);

  // Intentar mezcla balanceada
  if (shortWords.length > 0) selected.push(...shortWords.slice(0, 2));
  if (mediumWords.length > 0) selected.push(...mediumWords.slice(0, 2));
  if (longWords.length > 0) selected.push(longWords[0]);

  // Si no hay suficientes, completar con cualquier palabra
  while (selected.length < WORDS_PER_GAME && shuffled.length > 0) {
    const word = shuffled.pop();
    if (!selected.includes(word)) {
      selected.push(word);
    }
  }

  WORDS = selected.slice(0, WORDS_PER_GAME);
}

// Direcciones posibles: horizontal, vertical, diagonal (8 direcciones)
const DIRECTIONS = [
  { dx: 0, dy: 1 }, // Horizontal derecha
  { dx: 0, dy: -1 }, // Horizontal izquierda
  { dx: 1, dy: 0 }, // Vertical abajo
  { dx: -1, dy: 0 }, // Vertical arriba
  { dx: 1, dy: 1 }, // Diagonal abajo-derecha
  { dx: -1, dy: -1 }, // Diagonal arriba-izquierda
  { dx: 1, dy: -1 }, // Diagonal abajo-izquierda
  { dx: -1, dy: 1 }, // Diagonal arriba-derecha
];

// Generar sopa de letras
function generateWordSearch() {
  // Inicializar grid vacío
  grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));
  wordPositions = {};

  // Ordenar palabras por longitud (más largas primero)
  const sortedWords = [...WORDS].sort((a, b) => b.length - a.length);

  // Colocar cada palabra
  for (let word of sortedWords) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction =
        DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const startRow = Math.floor(Math.random() * GRID_SIZE);
      const startCol = Math.floor(Math.random() * GRID_SIZE);

      if (canPlaceWord(word, startRow, startCol, direction)) {
        placeWord(word, startRow, startCol, direction);
        placed = true;
      }
      attempts++;
    }

    if (!placed) {
      console.warn(`No se pudo colocar la palabra: ${word}`);
    }
  }

  // Rellenar espacios vacíos con letras aleatorias
  fillEmptySpaces();
}

// Verificar si se puede colocar una palabra
function canPlaceWord(word, startRow, startCol, direction) {
  for (let i = 0; i < word.length; i++) {
    const row = startRow + direction.dx * i;
    const col = startCol + direction.dy * i;

    // Verificar límites
    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) {
      return false;
    }

    // Verificar si la celda está vacía o tiene la misma letra
    if (grid[row][col] !== "" && grid[row][col] !== word[i]) {
      return false;
    }
  }
  return true;
}

// Colocar palabra en el grid
function placeWord(word, startRow, startCol, direction) {
  const positions = [];

  for (let i = 0; i < word.length; i++) {
    const row = startRow + direction.dx * i;
    const col = startCol + direction.dy * i;
    grid[row][col] = word[i];
    positions.push({ row, col });
  }

  wordPositions[word] = positions;
}

// Rellenar espacios vacíos
function fillEmptySpaces() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}

// Inicializar el juego
function initGame() {
  selectRandomWords();
  generateWordSearch();
  createGrid();
  createWordList();
  updateProgress();
  showDifficulty();
}

// Mostrar indicador de dificultad
function showDifficulty() {
  const avgLength =
    WORDS.reduce((sum, word) => sum + word.length, 0) / WORDS.length;
  const indicator = document.getElementById("difficultyIndicator");

  let difficulty = "";
  let stars = "";

  if (avgLength <= 5) {
    difficulty = "Fácil";
    stars = "⭐";
  } else if (avgLength <= 6.5) {
    difficulty = "Medio";
    stars = "⭐⭐";
  } else {
    difficulty = "Difícil";
    stars = "⭐⭐⭐";
  }

  indicator.innerHTML = `Dificultad: <span class="difficulty-stars">${stars}</span> ${difficulty}`;
}

// Crear la cuadrícula
function createGrid() {
  const gridContainer = document.getElementById("grid");
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 45px)`;

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = grid[i][j];
      cell.dataset.row = i;
      cell.dataset.col = j;

      // Event listeners
      cell.addEventListener("mousedown", handleMouseDown);
      cell.addEventListener("mouseenter", handleMouseEnter);
      cell.addEventListener("mouseup", handleMouseUp);

      // Touch events para móviles
      cell.addEventListener("touchstart", handleTouchStart);
      cell.addEventListener("touchmove", handleTouchMove);
      cell.addEventListener("touchend", handleTouchEnd);

      gridContainer.appendChild(cell);
    }
  }
}

// Crear lista de palabras
function createWordList() {
  const wordList = document.getElementById("wordList");
  wordList.innerHTML = "";

  WORDS.forEach((word) => {
    const wordItem = document.createElement("span");
    wordItem.className = "word-item";
    wordItem.textContent = word;
    wordItem.dataset.word = word;
    wordList.appendChild(wordItem);
  });
}

// Manejadores de eventos del mouse
function handleMouseDown(e) {
  isSelecting = true;
  startCell = e.target;
  selectedCells = [e.target];
  e.target.classList.add("selecting");
}

function handleMouseEnter(e) {
  if (!isSelecting) return;

  const cell = e.target;
  if (!cell.classList.contains("cell")) return;

  // Verificar si está en línea recta con la celda inicial
  if (isInLine(startCell, cell) && !selectedCells.includes(cell)) {
    // Agregar todas las celdas en el camino
    const cellsInPath = getCellsInPath(startCell, cell);
    cellsInPath.forEach((c) => {
      if (!selectedCells.includes(c)) {
        selectedCells.push(c);
        c.classList.add("selecting");
      }
    });
  }
}

function handleMouseUp() {
  if (!isSelecting) return;

  checkWord();
  clearSelection();
  isSelecting = false;
  startCell = null;
}

// Manejadores de eventos touch
function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const cell = document.elementFromPoint(touch.clientX, touch.clientY);
  if (cell && cell.classList.contains("cell")) {
    handleMouseDown({ target: cell });
  }
}

function handleTouchMove(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const cell = document.elementFromPoint(touch.clientX, touch.clientY);
  if (cell && cell.classList.contains("cell")) {
    handleMouseEnter({ target: cell });
  }
}

function handleTouchEnd(e) {
  e.preventDefault();
  handleMouseUp();
}

// Verificar si dos celdas están en línea
function isInLine(cell1, cell2) {
  const row1 = parseInt(cell1.dataset.row);
  const col1 = parseInt(cell1.dataset.col);
  const row2 = parseInt(cell2.dataset.row);
  const col2 = parseInt(cell2.dataset.col);

  // Horizontal
  if (row1 === row2) return true;
  // Vertical
  if (col1 === col2) return true;
  // Diagonal
  if (Math.abs(row1 - row2) === Math.abs(col1 - col2)) return true;

  return false;
}

// Obtener todas las celdas en el camino
function getCellsInPath(cell1, cell2) {
  const row1 = parseInt(cell1.dataset.row);
  const col1 = parseInt(cell1.dataset.col);
  const row2 = parseInt(cell2.dataset.row);
  const col2 = parseInt(cell2.dataset.col);

  const cells = [];
  const rowStep = row1 === row2 ? 0 : row2 > row1 ? 1 : -1;
  const colStep = col1 === col2 ? 0 : col2 > col1 ? 1 : -1;

  let currentRow = row1;
  let currentCol = col1;

  while (currentRow !== row2 || currentCol !== col2) {
    const cell = document.querySelector(
      `[data-row="${currentRow}"][data-col="${currentCol}"]`,
    );
    if (cell) cells.push(cell);

    currentRow += rowStep;
    currentCol += colStep;
  }

  const lastCell = document.querySelector(
    `[data-row="${row2}"][data-col="${col2}"]`,
  );
  if (lastCell) cells.push(lastCell);

  return cells;
}

// Verificar si se encontró una palabra
function checkWord() {
  if (selectedCells.length < 2) return;

  const selectedWord = selectedCells.map((cell) => cell.textContent).join("");
  const selectedWordReverse = selectedWord.split("").reverse().join("");

  // Obtener posiciones de las celdas seleccionadas
  const selectedPositions = selectedCells.map((cell) => ({
    row: parseInt(cell.dataset.row),
    col: parseInt(cell.dataset.col),
  }));

  // Verificar cada palabra
  WORDS.forEach((word) => {
    if (foundWords.has(word)) return;

    // Verificar si el texto coincide
    const matches = selectedWord === word || selectedWordReverse === word;

    if (matches) {
      // Verificar si las posiciones coinciden con las de la palabra
      const wordPos = wordPositions[word];
      if (wordPos && positionsMatch(selectedPositions, wordPos)) {
        foundWords.add(word);
        markWordAsFound(word);

        // Marcar las celdas como encontradas permanentemente
        selectedCells.forEach((cell) => {
          cell.classList.remove("selecting");
          cell.classList.add("found");
        });

        // Actualizar progreso
        updateProgress();

        // Verificar si se encontraron todas las palabras
        if (foundWords.size === WORDS.length) {
          setTimeout(() => {
            document.getElementById("successMessage").style.display = "block";
          }, 500);
        }
      }
    }
  });
}

// Verificar si dos conjuntos de posiciones coinciden
function positionsMatch(positions1, positions2) {
  if (positions1.length !== positions2.length) return false;

  // Verificar en orden normal
  let matchForward = positions1.every(
    (pos, i) => pos.row === positions2[i].row && pos.col === positions2[i].col,
  );

  // Verificar en orden inverso
  let matchReverse = positions1.every(
    (pos, i) =>
      pos.row === positions2[positions2.length - 1 - i].row &&
      pos.col === positions2[positions2.length - 1 - i].col,
  );

  return matchForward || matchReverse;
}

// Marcar palabra como encontrada
function markWordAsFound(word) {
  const wordItem = document.querySelector(`[data-word="${word}"]`);
  if (wordItem) {
    wordItem.classList.add("found");
  }
}

// Limpiar selección
function clearSelection() {
  selectedCells.forEach((cell) => {
    if (!cell.classList.contains("found")) {
      cell.classList.remove("selecting");
    }
  });
  selectedCells = [];
}

// Reiniciar juego
function resetGame() {
  foundWords.clear();
  document.getElementById("successMessage").style.display = "none";
  selectedCells = [];
  isSelecting = false;
  startCell = null;

  // Seleccionar nuevas palabras aleatorias
  selectRandomWords();

  // Generar nueva sopa de letras
  generateWordSearch();
  createGrid();
  createWordList();
  updateProgress();
  showDifficulty();
}

// Actualizar progreso
function updateProgress() {
  const progress = document.getElementById("progress");
  progress.textContent = `Palabras encontradas: ${foundWords.size}/${WORDS.length}`;
}

// Mostrar pista
function showHint() {
  // Encontrar una palabra que no se ha encontrado aún
  const remainingWords = WORDS.filter((word) => !foundWords.has(word));

  if (remainingWords.length === 0) {
    alert("¡Ya encontraste todas las palabras!");
    return;
  }

  // Seleccionar palabra aleatoria
  const randomWord =
    remainingWords[Math.floor(Math.random() * remainingWords.length)];
  const positions = wordPositions[randomWord];

  if (!positions || positions.length === 0) {
    alert("No se pudo mostrar la pista");
    return;
  }

  // Mostrar la primera letra de la palabra
  const firstPos = positions[0];
  const cell = document.querySelector(
    `[data-row="${firstPos.row}"][data-col="${firstPos.col}"]`,
  );

  if (cell) {
    // Limpiar hints anteriores
    document
      .querySelectorAll(".cell.hint")
      .forEach((c) => c.classList.remove("hint"));

    // Agregar hint a la primera letra
    cell.classList.add("hint");

    // Remover hint después de 3 segundos
    setTimeout(() => {
      cell.classList.remove("hint");
    }, 3000);

    alert(
      `💡 Pista: Busca la palabra "${randomWord}" - la primera letra está marcada con color naranja`,
    );
  }
}

// Prevenir selección de texto
document.addEventListener("selectstart", (e) => {
  if (e.target.classList.contains("cell")) {
    e.preventDefault();
  }
});
