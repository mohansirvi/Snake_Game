var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = Math.floor(window.innerWidth / 32) * 32 - 32;
canvas.height = Math.floor(window.innerHeight / 32) * 32;
const MAX_HEIGHT = canvas.height / 32;
const MAX_WIDTH = canvas.width / 32;
const box = 32;

//loading images and audio files
const foodImg = new Image();
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const right = new Audio();
const left = new Audio();

foodImg.src = "food.png";
dead.src = "dead.mp3";
eat.src = "eat.mp3";
up.src = "up.mp3";
down.src = "down.mp3";
right.src = "right.mp3";
left.src = "left.mp3";

let score = 0;
let dir;

//create the snake
let snake = [];
snake[0] = {
    x: Math.floor(MAX_WIDTH / 2) * box,
    y: Math.floor(MAX_HEIGHT / 2) * box
};

//create the food
let food = {
    x: Math.floor(Math.random() * (MAX_WIDTH)) * box,
    y: Math.floor(Math.random() * (MAX_HEIGHT)) * box
};

//draw everything on the canvas
var p = 10;

function drawBoard() {
    for (let i = 32; i < MAX_WIDTH * box; i += 32) {
        ctx.moveTo(i, MAX_HEIGHT * box);
        ctx.lineTo(i, 0);
    }
    for (let i = 32; i < MAX_HEIGHT * box; i += 32) {
        ctx.moveTo(0, i);
        ctx.lineTo(MAX_WIDTH * box, i);
    }


    ctx.strokeStyle = "gray";
    ctx.stroke();
}


function draw() {

    canvas.width = Math.floor(window.innerWidth / 32) * 32 - 32;
    canvas.height = Math.floor(window.innerHeight / 32) * 32;
    drawBoard();

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#33ff00" : "#66cc33";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;
    if (dir == "up") snakeY -= box;
    else if (dir == "down") snakeY += box;
    else if (dir == "right") snakeX += box;
    else if (dir == "left") snakeX -= box;


    if (snakeX == food.x && snakeY == food.y) {
		if(score==0){
			score++;
		}
		else if(score%10==0){
			score+=101;
		}else{
            score++;
		}
        eat.play();
        food = {
            x: Math.floor(Math.random() * (MAX_WIDTH)) * box,
            y: Math.floor(Math.random() * (MAX_HEIGHT)) * box
        };
    } else {
        snake.pop();
    }

    if (snakeX < 0 || snakeX >= MAX_WIDTH * box || snakeY < 0 || snakeY >= MAX_HEIGHT * box) {
        clearInterval(game);
        ctx.fillStyle = "red";
        ctx.font = "230px Changa one";
        ctx.fillText("GAME OVER!", 25, Math.floor(MAX_HEIGHT / 2) * box);
        dead.play();
    }
    for (let i = 0; i < snake.length; i++) {
        if ((snake[i].x == snakeX && snake[i].y == snakeY)) {
            clearInterval(game);
            ctx.fillStyle = "red";
            ctx.font = "230px Changa one";
            ctx.fillText("GAME OVER!", 25, Math.floor(MAX_HEIGHT / 2) * box);
            dead.play();
        }
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText("SCORE: " + score, 2 * box, 1.6 * box);

}

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.code;

    if (key == "Escape") {
        clearInterval(game);
        ctx.fillStyle = "red";
        ctx.font = "230px Changa one";
        ctx.fillText("GAME OVER!", 25, Math.floor(MAX_HEIGHT / 2) * box);
        dead.play();
    } else if (key == "ArrowUp" && dir != "down") {
        dir = "up";
        up.play();
    } else if (key == "ArrowDown" && dir != "up") {
        dir = "down";
        down.play();
    } else if (key == "ArrowLeft" && dir != "right") {
        dir = "left";
        left.play();
    } else if (key == "ArrowRight" && dir != "left") {
        dir = "right";
        right.play();
    }
}
let game = setInterval(draw, 100);

