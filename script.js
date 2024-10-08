let score = 0;
let attempts = 0;
let level = 1;
let currentQuestion = {};
let questionCount = 0;
const questionsPerLevel = 10;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    let num1, num2;

    if (level === 1) {
        num1 = getRandomNumber(1, 5);
        num2 = getRandomNumber(1, 5);
    } else if (level === 2) {
        num1 = getRandomNumber(6, 11);
        num2 = getRandomNumber(1, 12);
    } else {
        num1 = getRandomNumber(7, 9);
        num2 = getRandomNumber(1, 12);
    }

    currentQuestion = {
        num1: num1,
        num2: num2,
        correctAnswer: num1 * num2
    };

    document.getElementById('question').innerText = `What is ${num1} x ${num2}?`;
}

function submitAnswer() {
    let userAnswer = document.getElementById('answer').value;

    if (userAnswer === '' || isNaN(userAnswer)) {
        alert('Please enter a valid number');
        return;
    }

    if (parseInt(userAnswer) === currentQuestion.correctAnswer) {
        score++;
        questionCount++;
        playSound('correct');
        document.getElementById('feedback').innerText = 'Correct!';

        if (questionCount === questionsPerLevel) {
            triggerConfetti();
            setTimeout(() => {
                stopConfetti();
                if (level === 3) {
                    alert("Congratulations! You've completed the quiz.");
                    restartQuiz();
                } else {
                    level++;
                    alert(`Great! You've completed Level ${level - 1}. Moving to Level ${level}.`);
                    questionCount = 0;
                    generateQuestion();
                }
            }, 2000);
        } else {
            generateQuestion();
        }
    } else {
        attempts++;
        playSound('wrong');
        document.getElementById('feedback').innerText = `Incorrect! The correct answer was ${currentQuestion.correctAnswer}.`;
    }

    updateScore();
    document.getElementById('answer').value = '';
}

function updateScore() {
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('attemptsValue').innerText = attempts;
    document.getElementById('levelValue').innerText = level;
}

function playSound(type) {
    const sound = document.getElementById(type === 'correct' ? 'correctSound' : 'wrongSound');
    sound.play().catch(error => console.log("Audio failed to play:", error));
}

function triggerConfetti() {
    const confettiSound = document.getElementById('confettiSound');
    confettiSound.play().catch(error => console.log("Confetti sound failed to play:", error));
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function stopConfetti() {
    confetti.reset();
    const confettiSound = document.getElementById('confettiSound');
    confettiSound.pause();  // Stop confetti sound
    confettiSound.currentTime = 0;  // Reset sound to the beginning
}

function startQuiz() {
    score = 0;
    attempts = 0;
    level = 1;
    questionCount = 0;
    updateScore();
    generateQuestion();
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
}

function restartQuiz() {
    score = 0;
    attempts = 0;
    level = 1;
    questionCount = 0;
    document.getElementById('feedback').innerText = '';
    document.getElementById('welcomeScreen').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
}
