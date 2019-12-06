'use strict';

const cardsData = [
    { image: "./img/ape.svg", key: "Ape", level: 1 },
    { image: "./img/bear.svg", key: "Bear", level: 1 },
    { image: "./img/cow.svg", key: "Cow", level: 1 },
    { image: "./img/dog.svg", key: "Dog", level: 1 },
    { image: "./img/donkey.svg", key: "Donkey", level: 2 },
    { image: "./img/panda.svg", key: "Panda", level: 2 },
    { image: "./img/penguin.svg", key: "Penguin", level: 3 },
    { image: "./img/fox.svg", key: "Fox", level: 3 }
];

const memoryGame = document.querySelector(".memory-game");
const overlayEl = document.querySelector('.overlay');
const overlayButtons = overlayEl.querySelectorAll('button');
const endGameDiv = document.querySelector('.end-game');
const endGameButton = endGameDiv.querySelector('button');
const pEl = document.querySelector('p');
const spanEl = pEl.querySelector('.first-number');
const spanEl2 = pEl.querySelector('.second-number');
let counter = 0;
let cardsLevel = [];



