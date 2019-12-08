'use strict';

const cardsData = [
    { image: "./img/ape.svg", key: 1, level: 1 },
    { image: "./img/bear.svg", key: 2, level: 1 },
    { image: "./img/cow.svg", key: 3, level: 1 },
    { image: "./img/dog.svg", key: 4, level: 1 },
    { image: "./img/donkey.svg", key: 5, level: 1 },
    { image: "./img/panda.svg", key: 6, level: 1 },
    { image: "./img/penguin.svg", key: 7, level: 1 },
    { image: "./img/fox.svg", key: 8, level: 1 },
    { image: "./img/cat.svg", key: 9, level: 2 },
    { image: "./img/whale.svg", key: 10, level: 2 },
    { image: "./img/bat.svg", key: 11, level: 3 },
    { image: "./img/eagle.svg", key: 12, level: 3 },
    { image: "./img/elephant.svg", key: 13, level: 3 },
    { image: "./img/rabbit.svg", key: 14, level: 3 },
    { image: "./img/dolphin.svg", key: 15, level: 3 },
];

const memoryGame = document.querySelector(".memory-game");
const overlayEl = document.querySelector('.overlay');
const h1El = document.querySelector('h1');
const overlayButtons = overlayEl.querySelectorAll('button');
const endGameDiv = document.querySelector('.end-game');
const endGameButton = endGameDiv.querySelector('button');
const pEl = document.querySelector('.pairs');
const spanEl = pEl.querySelector('.first-number');
const spanEl2 = pEl.querySelector('.second-number');
const clicks = document.querySelector('.clicks');
const spanClickEl = clicks.querySelector('.first-click');
const spanClickEl2 = clicks.querySelector('.second-click');

let counter = 0;
let clickCounter = 0;
let cardsLevel = [];
let level, clickLimit;




