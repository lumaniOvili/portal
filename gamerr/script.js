document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: '2 + 2', answer: 4 },
        { question: '5 - 3', answer: 2 },
        { question: '3 * 3', answer: 9 },
        { question: '10 / 2', answer: 5 }
    ];
    let currentQuestionIndex = 0;
    let attempts = 0;
    let timer;
    let stickmanTimer;
    let questionTimer;

    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const stickman = document.getElementById('stickman');
    const numberButtons = document.querySelectorAll('.num-button');
    const gameOverElement = document.getElementById('game-over');
    const dingSound = document.getElementById('ding-sound');
    const buzzSound = document.getElementById('buzz-sound');

    let stickmanPos = { top: 50, left: 50 };

    function displayQuestion() {
        questionElement.textContent = questions[currentQuestionIndex].question;
    }

    function showFeedback(message, color) {
        feedbackElement.textContent = message;
        feedbackElement.style.color = color;
        feedbackElement.style.display = 'flex';
        setTimeout(() => {
            feedbackElement.style.display = 'none';
        }, 1000);
    }

    function moveStickman() {
        // Randomly move the stickman in the game area
        const direction = Math.random() > 0.5 ? 1 : -1;
        const axis = Math.random() > 0.5 ? 'top' : 'left';
        stickmanPos[axis] += direction * (5 + Math.random() * 5); // Increase speed and add randomness

        // Constrain the stickman's position within boundaries
        stickmanPos.top = Math.min(Math.max(stickmanPos.top, 0), 95);  // Adjusting for the height of the stickman
        stickmanPos.left = Math.min(Math.max(stickmanPos.left, 0), 95); // Adjusting for the width of the stickman

        stickman.style.top = `${stickmanPos.top}%`;
        stickman.style.left = `${stickmanPos.left}%`;

        // Check if the stickman is out of bounds
        if (stickmanPos.top <= 0 || stickmanPos.top >= 95 || stickmanPos.left <= 0 || stickmanPos.left >= 95) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(timer);
        clearInterval(stickmanTimer);
        clearTimeout(questionTimer);
        stickman.textContent = '💀';
        gameOverElement.style.display = 'flex';
        buzzSound.play();
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === questions[currentQuestionIndex].answer) {
            showFeedback('✔', 'green');
            dingSound.play();
            currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
            displayQuestion();
            clearTimeout(questionTimer);
            questionTimer = setTimeout(checkAnswer, 5000); // Reset the 5-second timer
        } else {
            showFeedback('✘', 'red');
            buzzSound.play();
            attempts++;
            if (attempts === 3) {
                endGame();
            }
        }
        answerInput.value = '';
    }

    function startGame() {
        displayQuestion();
        stickman.textContent = '🙂';
        stickmanPos = { top: 50, left: 50 };
        stickman.style.top = '50%';
        stickman.style.left = '50%';
        gameOverElement.style.display = 'none';

        // Start the stickman movement
        stickmanTimer = setInterval(moveStickman, 500); // Increase movement speed

        // Start the timer for answering questions
        timer = setTimeout(endGame, 30000); // 30 seconds for the whole game

        // Start the timer for each question
        questionTimer = setTimeout(checkAnswer, 5000); // 5 seconds for each question
    }

    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            answerInput.value += button.textContent;
        });
    });

    startGame();
});
