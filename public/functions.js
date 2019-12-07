// Filters the array accourding to choosen level
const updateLevel = (event) => {
    overlayEl.style.display = 'none';
    level = event.currentTarget.dataset.level;
    if (level === 3) {
        hardMode = true;
    }
    cardsLevel = cardsData.filter(element => element.level <= level);
    cardsLevel = cardsLevel.flatMap(el => [el, el]);
    spanEl2.textContent = cardsLevel.length / 2;
    overlayButtons.forEach(button => {
        button.removeEventListener('click', updateLevel);
    });
    init();
}

// Updates the game board
const chooseLevel = () => {
    overlayEl.style.display = 'flex';
    overlayButtons.forEach(button => {
        button.addEventListener('click', updateLevel);
    });
}

// Shuffles the cards
const shuffleCards = () => {
    cardsLevel.sort(() => 0.5 - Math.random());
}

// Creates an HTML element from string
const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
};

// Create card template with a template literal
const createCard = (icon, key) => {
    return `<div class="memory-card" data-key="${key}">
        <img class="front-face" src="${icon}"/>
        <img class="back-face" src="img/back-face.svg"/>
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
    cards.forEach(card => {
        if (cardsLevel.length === 30) {
            card.classList.add('hard');
        } else {
            card.classList.remove('hard');
        }
    })
    let hasFlippedCard = false;
    let lockGame = false;
    let firstCard, secondCard;

    const setClickLimit = () => {

        if (level == 1) {
            clickLimit = 32;
        } else if (level == 2) {
            clickLimit = 70;
        } else if (level == 3) {
            clickLimit = 54;
        }
        spanClickEl2.textContent = clickLimit;
    }

    setClickLimit();

    const flipCard = (event) => {

        const checkClicks = () => {

            if (lockGame !== true) {
                clickCounter++;
                spanClickEl.textContent = clickCounter;

                if (counter < cardsLevel.length / 2 && clickCounter === clickLimit) {
                    cards.forEach(card => card.removeEventListener('click', flipCard));
                    endGameButton.classList.add('animate');
                    h1El.innerHTML = 'YOU LOST!&#129326;';
                }
            }
        }

        checkClicks();

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
        checkCount();
        setTimeout(() => {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
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
            h1El.innerHTML = 'YOU WIN!&#128526;';
            endGameButton.classList.add('animate');
        }
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
    endGameButton.addEventListener('click', restart);
}

// Restarts the game
const restart = () => {
    while (memoryGame.firstChild) {
        memoryGame.removeChild(memoryGame.firstChild);
    }
    counter = 0;
    clickCounter = 0;
    spanEl.textContent = counter;
    spanClickEl.textContent = clickCounter;
    endGameButton.classList.remove('animate');
    h1El.innerHTML = 'Fuzzy <span>Memory</span>';
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
