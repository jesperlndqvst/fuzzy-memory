'use strict';


const cards = [
    { image: "./img/ape.svg", alt: "Ape" },
    { image: "./img/bear.svg", alt: "Bear" },
    { image: "./img/cow.svg", alt: "Cow" },
    { image: "./img/dog.svg", alt: "Dog" },
    { image: "./img/donkey.svg", alt: "Donkey" },
    { image: "./img/panda.svg", alt: "Panda" },
    { image: "./img/penguin.svg", alt: "Penguin" },
    { image: "./img/reindeer.svg", alt: "Reindeer" }
];

const memoryGame = document.querySelector(".memory-game");

// Helper function to prevent XSS injections
// Creates an HTML element from string
const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
};

// Create ingredient template with a template literal
const createCard = (icon, alt) => {
    return `<div class="memory-card">
        <img class="front-face" src="${icon}" alt="${alt}" />
        <img class="back-face" src="img/back-face.svg" alt="Memory Card" />
        </div>
    `;
};

// Render the ingredient element to the DOM
const generateCards = () => {
    cards.forEach(item => {
        const element = createCard(item.image, item.alt);
        memoryGame.appendChild(stringToHTML(element));
    });
};


// Initial function
const init = () => {
    generateCards();
    

  };
  
  // Initialise 
  init();
  


