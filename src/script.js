/**
 * Point culture :
 * Dans ce jeu, un mot équivaut à 5 caractères (espaces inclus).
 * La précision est le pourcentage de caractères corrects sur le total tapés.
 */

// Variables d'état pour le chronométrage et la progression
let startTime = null, previousEndTime = null; // Timers pour le calcul de vitesse
let currentWordIndex = 0; // Index du mot actuel
const wordsToType = []; // Liste des mots à taper

// Références aux éléments HTML
const modeSelect = document.getElementById("mode"); // Sélecteur de difficulté
const wordDisplay = document.getElementById("word-display"); // Zone d'affichage des mots
const inputField = document.getElementById("input-field"); // Champ de saisie utilisateur
const results = document.getElementById("results"); // Affichage des résultats

// Liste des mots par difficulté
const words = {
    easy: ["apple", "banana", "grape", "orange", "cherry"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception"]
};

// Génère un mot aléatoire selon la difficulté choisie
const getRandomWord = (mode) => {
    const wordList = words[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// Initialise le test avec un nombre de mots donné (50 par défaut)
const startTest = (wordCount = 50) => {
    wordsToType.length = 0;
    wordDisplay.innerHTML = "";
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;

    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }

    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        if (index === 0) span.style.color = "red";
        wordDisplay.appendChild(span);
    });

    inputField.value = "";
    results.textContent = "";
};

// Démarre le timer au premier appui utilisateur
const startTimer = () => {
    if (!startTime) startTime = Date.now();
};

// Calcule les statistiques en temps réel
const getCurrentStats = () => {
    const elapsedTime = (Date.now() - previousEndTime) / 1000;
    const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 60);
    const accuracy = (wordsToType[currentWordIndex].length / inputField.value.length) * 100;
    return { wpm: wpm.toFixed(2), accuracy: accuracy.toFixed(2) };
};

// Gère le passage au mot suivant
const updateWord = (event) => {
    if (event.key === " ") {
        if (inputField.value.trim() === wordsToType[currentWordIndex]) {
            if (!previousEndTime) previousEndTime = startTime;

            const { wpm, accuracy } = getCurrentStats();
            results.textContent = `WPM: ${wpm}, Précision: ${accuracy}%`;

            currentWordIndex++;
            previousEndTime = Date.now();
            highlightNextWord();

            inputField.value = "";
            event.preventDefault();
        }
    }
};

// Met en évidence le mot actuel
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;
    if (currentWordIndex < wordElements.length) {
        if (currentWordIndex > 0) {
            wordElements[currentWordIndex - 1].style.color = "black";
        }
        wordElements[currentWordIndex].style.color = "red";
    }
};

// Événements
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});
modeSelect.addEventListener("change", () => startTest());
startTest();
