var board = document.getElementById("board");
var snake = [];
var apple = {
    x: 0,
    y: 0
}
var currentDirection = 0;
// directions: 0-up, 1-right, 2-down, 3-left
var score = 0;
var gameOver = false;
var snakeGame = 0;

function includesArr(arr, target) {
    for (var i of arr) {
        if (target[0] == i[0] && target[1] == i[1]) {
            return true;
        }
    }
    return false;
}

// detect keystrokes
document.addEventListener('keydown', function(event) {
    if (gameOver) {
        return;
    }
    switch (event.key) {
        case "w":
            if (currentDirection === 0 || currentDirection === 2) break;
            currentDirection = 0;
            break;
        case "a":
            if (currentDirection === 1 || currentDirection === 3) break;
            currentDirection = 3;
            break;
        case "s":
            if (currentDirection === 0 || currentDirection === 2) break;
            currentDirection = 2;
            break;
        case "d":
            if (currentDirection === 1 || currentDirection === 3) break;
            currentDirection = 1;
            break;
    }
});

function createBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.innerHTML += `<div class="box" id="${i} ${j}"></div>`;
        }
    }
}

function move() {
    // check if head hits apple
    if (snake[0][0] === apple.x && snake[0][1] === apple.y) {
        snake.push(snake[snake.length - 1].slice());
        score++;
        generateApple();
    } else {
        // remove color for tail
        let tail = document.getElementById(`${snake[snake.length - 1][0]} ${snake[snake.length - 1][1]}`);
        tail.style.backgroundColor = "gray";
    }

    // update snake
    for (let i = snake.length - 1; i >= 0; i--) {
        if (i > 0) {
            snake[i][0] = snake[i - 1][0];
            snake[i][1] = snake[i - 1][1];
        } else {
            switch(currentDirection) {
                case 0:
                    snake[i][0] = (snake[i][0] + 7) % 8;
                    break;
                case 1:
                    snake[i][1] = (snake[i][1] + 1) % 8;
                    break;
                case 2:
                    snake[i][0] = (snake[i][0] + 1) % 8;
                    break;
                default:
                    snake[i][1] = (snake[i][1] + 7) % 8;
            }
        }
    }

    // check if head hits body
    if (includesArr(snake.slice(1), snake[0])) {
        gameOver = true;
        return;
    }

    // add color for head
    let head = document.getElementById(`${snake[0][0]} ${snake[0][1]}`);
    head.style.backgroundColor = "royalblue";

    console.log(gameOver);
    if (gameOver) {
        clearInterval(snakeGame);
    }
}

function generateApple() {
    do {
        apple.x = Math.floor(Math.random() * 8);
        apple.y = Math.floor(Math.random() * 8);
    } while (includesArr(snake, [apple.x, apple.y]));
    let block = document.getElementById(`${apple.x} ${apple.y}`);
    block.style.backgroundColor = "red";
}

function game() {
    // reset everything
    board.innerHTML = "";
    snake = []
    game_over = false;

    // generate board
    createBoard();

    // generate starting block and direction
    let startX = Math.floor(Math.random() * 8);
    let startY = Math.floor(Math.random() * 8);
    let startDirection = Math.floor(Math.random() * 4);

    // add block to snake and set direction
    snake.push([startX, startY]);
    let block = document.getElementById(`${snake[0][0]} ${snake[0][1]}`);
    block.style.backgroundColor = "royalblue";
    currentDirection = startDirection;

    // generate first apple
    generateApple();

    // start game
    snakeGame = setInterval(move, 250);
}

game();