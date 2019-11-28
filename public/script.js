'use strict';

const cardsData = [
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
        </div>
    `;
};

// Makes the card element into pairs and render them to the DOM
const generateCards = () => {
    for (let i = 0; i < 2; i++) {
        cardsData.forEach(item => {
            const element = createCard(item.image, item.key, item.alt);
            memoryGame.appendChild(stringToHTML(element));
        });
    }
};

// Makes the cards flip
const flipCards = () => {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let firstCard, secondCard;

    const flipCard = function () {
        this.classList.add('flip');

        // Checks if card has been flipped
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;
            checkCards();
        }

    }

    // Checks if there is a match
    const checkCards = () => {
        if (firstCard.dataset.key === secondCard.dataset.key) {
            console.log('Its a match');
        } else {
            turnBackCards();
        }
    }

    // Removes the flip classes and turns the cards back
    const turnBackCards = () => {
        setTimeout(() => {
            console.log('Fail');
            secondCard.classList.remove('flip');
            firstCard.classList.remove('flip');
        }, 1500);
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
}


// Initial function
const init = () => {
    generateCards();
    flipCards();
};

// Initialise 
init();





