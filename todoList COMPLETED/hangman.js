const words = ["javascript", "hangman", "programming", "computer", "internet"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = new Set();
let hangmanWordElement = document.getElementById('hangmanWord');
let hangmanButtonsElement = document.getElementById('hangmanButtons');

function setupHangman() {
    let wordDisplay = '';
    for (let letter of selectedWord) {
        if (guessedLetters.has(letter)) {
            wordDisplay += letter;
        } else {
            wordDisplay += '_';
        }
    }
    hangmanWordElement.textContent = wordDisplay;
    hangmanButtonsElement.innerHTML = '';
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let letter of alphabet) {
        let button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('hangman-button');
        button.addEventListener('click', () => handleGuess(letter));
        hangmanButtonsElement.appendChild(button);
    }
}

function handleGuess(letter) {
    guessedLetters.add(letter);
    setupHangman();
    if (!selectedWord.includes(letter)) {
        alert('Incorrect guess!');
    }
    if (isWordGuessed()) {
        alert('Congratulations! You won!');
        resetHangman();
    }
}

function isWordGuessed() {
    for (let letter of selectedWord) {
        if (!guessedLetters.has(letter)) {
            return false;
        }
    }
    return true;
}

function resetHangman() {
    guessedLetters.clear();
    selectedWord = words[Math.floor(Math.random() * words.length)];
    setupHangman();
}

setupHangman();
