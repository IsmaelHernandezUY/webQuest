// script.js
// script.js

const TOTAL_ACTIVITIES = 3;
let completedActivities = parseInt(localStorage.getItem("completedActivities")) || 0;
let totalScore = parseInt(localStorage.getItem("totalScore")) || 0;
let startTime, timerInterval;

// Inicializar progreso y temporizador al cargar la página
window.onload = () => {
    displayProgress();
    displayScore();
    initializeTimer();
};

// Muestra el progreso en porcentaje
function displayProgress() {
    const progressPercentage = ((completedActivities / TOTAL_ACTIVITIES) * 100).toFixed(0);
    document.getElementById("progress").innerText = `Progress: ${progressPercentage}%`;
}

// Muestra la puntuación total
function displayScore() {
    document.getElementById("current-score").innerText = `Total score: ${totalScore}`;
}

// Evalúa las respuestas del usuario y actualiza puntuación y progreso
function evaluateActivity() {
    const answers = {
        "merit-based": "merit",
        "need-based": "need",
        "sports": "sports"
    };

    let score = 0;
    for (const [id, correctAnswer] of Object.entries(answers)) {
        const userAnswer = document.getElementById(id).value.trim().toLowerCase();
        if (userAnswer === correctAnswer) score++;
    }

    alert(`Your score is: ${score} out of 3`);
    totalScore += score;
    completedActivities++;
    saveProgress();
    displayScore();
    displayProgress();
}

// Guarda progreso y puntuación en localStorage
function saveProgress() {
    localStorage.setItem("completedActivities", completedActivities);
    localStorage.setItem("totalScore", totalScore);
}

// Reinicia el progreso, la puntuación y el temporizador
function resetProgress() {
    totalScore = 0;
    completedActivities = 0;
    localStorage.clear();
    displayScore();
    displayProgress();
    alert("Score and progress have been reset.");
}

// Inicia el temporizador y lo actualiza cada segundo
function initializeTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// Actualiza el temporizador en pantalla
function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById("timer").innerText = `Time elapsed: ${minutes} min ${seconds} sec`;
}






const playIconContainer = document.getElementById('play-icon');
const audio = document.getElementById('audio');
let isPlaying = false;

playIconContainer.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIconContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40px" height="40px">
                <path d="M16,8 L56,32 L16,56 Z" fill="#007db5"/> <!-- Icono de play -->
            </svg>`;
    } else {
        audio.play();
        playIconContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40px" height="40px">
                <rect x="16" y="8" width="10" height="48" fill="#007db5"></rect>
                <rect x="38" y="8" width="10" height="48" fill="#007db5"></rect>
            </svg>`;
    }
    isPlaying = !isPlaying;
});
