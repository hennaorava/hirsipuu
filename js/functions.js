const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
];

let randomizeWord = '';
let maskedWord = '';
let guessCount = 0; // Seuraa arvontojen määrää

// Syöte- ja output-elementit
const input = document.getElementById('input');
const output = document.getElementById('output');
const guessCountDisplay = document.getElementById('guessCount');

const newGame = () => {
    guessCount = 0; // Nollaa arvausten määrä uudessa pelissä
    const random = Math.floor(Math.random() * words.length); // Oikea satunnaistaminen
    randomizeWord = words[random];
    maskedWord = "*".repeat(randomizeWord.length);
    console.log(randomizeWord); // Virheenkorjauksen vuoksi
    output.innerHTML = maskedWord;
    guessCountDisplay.textContent = guessCount; // Näytä nolla arvausten määrässä
};

const win = () => {
    alert(`Olet arvannut oikein, sana on "${randomizeWord}". Käytit ${guessCount} arvausta.`);
    newGame();
};

const replaceFoundChars = (guess) => {
    for (let i = 0; i < randomizeWord.length; i++) {
        const char = randomizeWord.charAt(i); // Selkeyden vuoksi charAt
        if (char === guess) {
            let newString = maskedWord.split('');
            newString[i] = guess; // Päivitä peitetty sana suoraan
            maskedWord = newString.join('');
        }
    }
    output.innerHTML = maskedWord;
};

newGame();

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Estä lomakkeen lähetys

        const guess = input.value.trim(); // Poista tyhjät merkit
        guessCount++; // Lisää arvontojen lukumäärää
        guessCountDisplay.textContent = guessCount; // Päivitä näytettävä arvontamäärä

        if (guess.toLowerCase() === randomizeWord.toLowerCase()) {
            win();
        } else if (guess.length === 1) {
            replaceFoundChars(guess);
            if (maskedWord.toLowerCase() === randomizeWord.toLowerCase()) {
                win();
            }
        } else {
            alert("Arvasit väärin!");
        }
        input.value = '';
    }
});