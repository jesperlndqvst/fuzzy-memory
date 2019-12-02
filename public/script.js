'use strict';

let cardsData = [
    { image: "./img/ape.svg", key: "Ape", alt: "Ape" },
    { image: "./img/bear.svg", key: "Bear", alt: "Bear" },
    { image: "./img/cow.svg", key: "Cow", alt: "Cow" },
    { image: "./img/dog.svg", key: "Dog", alt: "Dog" },
    { image: "./img/donkey.svg", key: "Donkey", alt: "Donkey" },
    { image: "./img/panda.svg", key: "Panda", alt: "Panda" },
    { image: "./img/penguin.svg", key: "Penguin", alt: "Penguin" },
    { image: "./img/reindeer.svg", key: "Reindeer", alt: "Reindeer" }
];

const memoryGame = document.querySelector(".memory-game");
const endGameDiv = document.querySelector('.end-game');
const endGameButton = endGameDiv.querySelector('button');

// Duplicate cards into pairs
cardsData = cardsData.flatMap(el => [el, el]);


// Shuffles the cards
const shuffleCards = () => {
    return cardsData.sort(() => 0.5 - Math.random());
}

// Helper function to prevent XSS injections
// Creates an HTML element from string
const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
};

// Create card template with a template literal
const createCard = (icon, key, alt) => {
    return `<div class="memory-card" data-key="${key}">
        <img class="front-face" src="${icon}" alt="${alt}" />
        <img class="back-face" src="img/back-face.svg" alt="Memory Card" />
        </div>`;
};

// Makes the card element into pairs and render them to the DOM
const generateCards = () => {
    cardsData.forEach(item => {
        const element = createCard(item.image, item.key, item.alt);
        memoryGame.appendChild(stringToHTML(element));
    });
};

// Makes the cards flip
const gameStart = () => {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let counter = 0;
    let lockGame = false;
    let firstCard, secondCard;

    const flipCard = function () {
        if (!lockGame) {
            this.classList.add('flip');
        }

        // Checks if card has been flipped
        if (!hasFlippedCard && !lockGame) {
            hasFlippedCard = true;
            firstCard = this;
        } else if (hasFlippedCard && !lockGame) {
            hasFlippedCard = false;
            secondCard = this;
            checkCards();
        }
    }

    // Checks if there is a match
    const checkCards = () => {
        if (firstCard === secondCard) {
            turnBackCards();
        } else if (firstCard.dataset.key === secondCard.dataset.key) {
            removeEvent();
        } else {
            turnBackCards();
        }
    }

    // Removes the eventlistener
    const removeEvent = () => {
        lockGame = true;
        setTimeout(() => {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            checkCount();
            lockGame = false;
        }, 1500);
    }

    // Removes the flip classes and turns the cards back
    const turnBackCards = () => {
        lockGame = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockGame = false;
        }, 1500);
    }

    // Checks if game is finished
    const checkCount = () => {
        counter++;
        if (counter === cardsData.length / 2) {
            endGame();
        }
    }

    // Makes the end-game state visible
    const endGame = () => {
        endGameButton.classList.add('visible');
        endGameButton.addEventListener('click', restart);
    }

    // Restarts the game
    const restart = () => {
        cards.forEach(card => card.parentNode.removeChild(card));
        endGameButton.classList.remove('visible');
        counter = 0;
        init();
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
}

// Initial function
const init = () => {
    shuffleCards();
    generateCards();
    gameStart();
};

// Initialise
init();

