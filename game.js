const start = document.querySelector('#start');
const game = document.querySelector('#game');
let time = document.querySelector('#time');
let result = document.querySelector('#result');
let timeH1 = document.querySelector('#time-header');
let resultH1 = document.querySelector('#result-header');
let inputTime = document.querySelector('#game-time');
let score = 0;

let isGameActive = false;
inputTime.addEventListener('change', () => {
    time.innerText = inputTime.value;
    resultH1.classList.add('hide');
    timeH1.classList.remove('hide');
})
const startGame = () => {
    isGameActive = true;
    start.classList.add('hide');
    game.style.backgroundColor = "white";
    score = 0;
    inputTime.setAttribute('disabled', true);
    time.innerText= inputTime.value;
    timeH1.classList.remove('hide');
    resultH1.classList.add('hide');
    let interval = setInterval(function () {
        let currentTime = Number(time.innerText);
        if (currentTime <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.innerText = (currentTime - 0.1).toFixed(1);
        }
    }, 100)
    renderBox();
}
function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
}
const renderBox = () => {
    game.innerHTML = "";
    let randomSize = getRandom(30, 100);
    let maxDelta = 300 - randomSize;
    let div = document.createElement('div');
    div.style.width = `${randomSize}px`;
    div.style.height = `${randomSize}px`;
    div.style.position = 'absolute';
    div.style.backgroundColor = 'black';
    div.style.top = `${getRandom(0, maxDelta)}px`;
    div.style.left = `${getRandom(0, maxDelta)}px`;
    div.style.cursor = 'pointer';
    div.classList.add('box');
    game.append(div);
}

const gameBoxClick = (event) => {
    if (!isGameActive) {
        return;
    }
    if (event.target.classList.contains('box')) {
        score++;
        renderBox();
        console.log(score);
    }
}
const endGame = () => {
    isGameActive = false;
    game.innerHTML = '';
    start.classList.remove('hide');
    game.style.backgroundColor = "#ccc";
    result.innerText = score.toString();
    inputTime.removeAttribute('disabled');
    timeH1.classList.add('hide');
    resultH1.classList.remove('hide');
}

start.addEventListener('click', startGame);

game.addEventListener('click', gameBoxClick);

