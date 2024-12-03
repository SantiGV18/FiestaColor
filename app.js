const SOUNDS = [
    'sonidos/button-4.mp3',
    'sonidos/button-8.mp3',
    'sonidos/button-13.mp3',
    'sonidos/button-30.mp3',
    'sonidos/button-8.mp3'
];

const DEFAULT_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const DANCE_FLOOR_SQUARES = 30;
const INACTIVITY_TIMEOUT = 10000; // 10 segundos

let colorVotes = {};
let inactivityTimer;

function initializeApp() {
    createColorPalette();
    createDanceFloor();
    resetInactivityTimer();
}

function createColorPalette() {
    const palette = document.getElementById('color-palette');
    palette.innerHTML = '';
    DEFAULT_COLORS.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-button';
        button.style.backgroundColor = color;
        button.onclick = () => selectColor(color);
        palette.appendChild(button);
    });
}

function createDanceFloor() {
    const danceFloor = document.getElementById('dance-floor');
    danceFloor.innerHTML = '';
    for (let i = 0; i < DANCE_FLOOR_SQUARES; i++) {
        const square = document.createElement('div');
        square.className = 'dance-square';
        danceFloor.appendChild(square);
    };
}

function selectColor(color) {
    const title = document.getElementById('party-title');
    title.style.color = color;

    const danceSquares = document.querySelectorAll('.dance-square');
    danceSquares.forEach(square => {
        square.style.backgroundColor = color;
    });

    playRandomSound();
    updateColorVotes(color);
    resetInactivityTimer();
}

function playRandomSound() {
    const audio = document.getElementById('color-sound');
    audio.src = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
    audio.play();
}


function addNewColor() {
    const colorPicker = document.getElementById('new-color-picker');
    const newColor = colorPicker.value;

    const palette = document.getElementById('color-palette');
    const button = document.createElement('button');
    button.className = 'color-button';
    button.style.backgroundColor = newColor;
    button.onclick = () => selectColor(newColor);
    palette.appendChild(button);
    playRandomSound(); 
}

function updateColorVotes(color) {
    colorVotes[color] = (colorVotes[color] || 0) + 1;
    displayColorVotes();
}

function displayColorVotes() {
    const votesElement = document.getElementById('color-votes');
    const mostPopularElement = document.getElementById('most-popular-color');
    
    votesElement.innerHTML = Object.entries(colorVotes)
        .map(([color, votes]) => `<div style="color:${color}">Color ${color}: ${votes} votos</div>`)
        .join('');

    const mostPopularColor = Object.entries(colorVotes)
        .reduce((a, b) => b[1] > a[1] ? b : a, ['', 0])[0];

    if (mostPopularColor) {
        mostPopularElement.textContent = `Color más popular: ${mostPopularColor}`;
    }
}

function resetDanceFloor() {
    createDanceFloor(); // Restablece la pista de baile
    createColorPalette(); // Restaura los colores por defecto
    document.getElementById('party-title').style.color = 'black'; // Restablece el título a negro
    colorVotes = {}; // Reinicia el conteo de votos
    displayColorVotes(); // Actualiza el conteo de votos en pantalla
    playRandomSound(); 
}


function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(resetDanceFloor, INACTIVITY_TIMEOUT);
}

// Initialize the app
initializeApp();
