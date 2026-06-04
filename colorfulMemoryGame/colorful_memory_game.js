const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = [];
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

let startbtn;
let gameContainer;
let scoreElement;
let timerElement;

window.addEventListener('DOMContentLoaded', () => {
    startbtn = document.getElementById('startbtn');
    gameContainer = document.getElementById('game-container');
    scoreElement = document.getElementById('score');
    timerElement = document.getElementById('timer');

    startbtn.addEventListener('click', startGame);
    gameContainer.addEventListener('click', handleCardClick);
});

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Generate cards
function generateCards() {
    gameContainer.innerHTML = '';
    for (const color of cards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

// Card click handler
function handleCardClick(event) {
    const card = event.target;

    if (
        !card.classList.contains('card') ||
        card.classList.contains('matched') ||
        selectedCards.includes(card)
    ) {
        return;
    }

    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Match check
function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }

    selectedCards = [];
}

// Timer
function startGameTimer() {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
}

// Start game
function startGame() {
    clearInterval(gameInterval);
    startbtn.disabled = true;

    score = 0;
    timeLeft = 30;
    selectedCards = [];

    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time Left: ${timeLeft}`;

    cards = shuffle([...colors, ...colors]);
    generateCards();
    startGameTimer();
}

// Event listeners (ONLY ONCE)
startbtn.addEventListener('click', startGame);
gameContainer.addEventListener('click', handleCardClick);
        //    startbtn.addEventListener('click', startGame);