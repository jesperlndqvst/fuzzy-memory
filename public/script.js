'use strict';

const cardsData = [
    { image: "./img/ape.svg", key: "Ape", level: 1},
    { image: "./img/bear.svg", key: "Bear", level: 1},
    { image: "./img/cow.svg", key: "Cow", level: 1},
    { image: "./img/dog.svg", key: "Dog", level: 1},
    { image: "./img/donkey.svg", key: "Donkey", level: 2},
    { image: "./img/panda.svg", key: "Panda", level: 2},
    { image: "./img/penguin.svg", key: "Penguin", level: 3},
    { image: "./img/fox.svg", key: "Fox", level: 3}
];

const memoryGame = document.querySelector(".memory-game");
const overlayEl = document.querySelector('.overlay');
const overlayButtons = document.querySelectorAll('button');
const endGameDiv = document.querySelector('.end-game');
const endGameButton = endGameDiv.querySelector('button');
const pEl = document.querySelector('p');
const spanEl = pEl.querySelector('span');
let counter = 0;
let cardsLevel = [];

// Filters the array accourding to choosen level

const chooseLevel = () => {
    overlayEl.style.display = 'flex';
    overlayButtons.forEach(button => {
        button.addEventListener('click', () => {
            overlayEl.style.display = 'none';
            let level = button.dataset.level;
            cardsLevel = cardsData.filter(element => element.level <= level);
            cardsLevel = cardsLevel.flatMap(el => [el, el]);
            init();
        })
    });
}

// Shuffles the cards
const shuffleCards = () => {
    return cardsLevel.sort(() => 0.5 - Math.random());
}

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
    cardsLevel.forEach(item => {
        const element = createCard(item.image, item.key, item.alt);
        memoryGame.appendChild(stringToHTML(element));
    });
};

// Makes the cards flip
const gameStart = () => {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockGame = false;
    let firstCard, secondCard;

    const flipCard = (event) => {

        if (!lockGame) {
            event.currentTarget.classList.add('flip');
        }

        // Checks if card has been flipped
        if (!hasFlippedCard && !lockGame) {
            hasFlippedCard = true;
            firstCard = event.currentTarget;
        } else if (hasFlippedCard && !lockGame) {
            hasFlippedCard = false;
            secondCard = event.currentTarget;
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
        }, 1000);
    }

    // Removes the flip classes and turns the cards back
    const turnBackCards = () => {
        lockGame = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockGame = false;
        }, 1000);
    }

    // Checks if game is finished
    const checkCount = () => {
        counter++;
        spanEl.textContent = counter;
        if (counter === cardsLevel.length / 2) {
            endGameButton.classList.add('animate');
        }
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
    endGameButton.addEventListener('click', restart);
}

// Restarts the game
const restart = () => {
    console.log('restared')
    while (memoryGame.firstChild) {
        memoryGame.removeChild(memoryGame.firstChild);
      }
    counter = 0;
    spanEl.textContent = counter;
    chooseLevel();
}

// Initial function
const init = () => {
    shuffleCards();
    generateCards();
    gameStart();
};

// Initialise
chooseLevel();
