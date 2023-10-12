document.addEventListener("DOMContentLoaded", () => {
    let grid = 20;
    let initialSnakeSpeed = 200;
    let snakeSpeed = initialSnakeSpeed;
    let score = 0;
    let highestScore = 0;
    let isGameRunning = false; // To track if the game is currently running
    let isGameOver = false; // To track if the game is over

    const gameContainer = document.querySelector(".game-container");
    const snakeElement = document.getElementById("snake");
    const foodElement = document.getElementById("food");
    const scoreElement = document.getElementById("score");
    const highestScoreElement = document.getElementById("highest-score");
    const easyButton = document.getElementById("easy");
    const mediumButton = document.getElementById("medium");
    const hardButton = document.getElementById("hard");

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = "right";
    let changingDirection = false;
    let gameLoop;

    function getRandomPosition() {
        return Math.floor(Math.random() * grid);
    }

    function updateFoodPosition() {
        food = {
            x: getRandomPosition(),
            y: getRandomPosition()
        };
        foodElement.style.left = `${food.x * grid}px`;
        foodElement.style.top = `${food.y * grid}px`;
    }

    function endGame() {
        isGameOver = true;
        clearInterval(gameLoop);

        if (score > highestScore) {
            highestScore = score;
            highestScoreElement.textContent = highestScore;
        }

        const playAgain = confirm("Game Over! Play again?");
        if (playAgain) {
            resetGame();
        } else {
            isGameRunning = false;
        }
    }

    function checkCollision() {
        if (
            snake[0].x < 0 ||
            snake[0].x >= grid ||
            snake[0].y < 0 ||
            snake[0].y >= grid
        ) {
            endGame();
        }

        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                endGame();
                break;
            }
        }
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        changingDirection = false;
        score = 0;
        scoreElement.textContent = score;
        updateFoodPosition();
        isGameOver = false;
        snakeSpeed = initialSnakeSpeed;
        startGame();
    }

    function updateGame() {
        if (changingDirection || isGameOver) return;
        changingDirection = true;

        const newHead = { ...snake[0] };

        switch (direction) {
            case "up":
                newHead.y -= 1;
                break;
            case "down":
                newHead.y += 1;
                break;
            case "left":
                newHead.x -= 1;
                break;
            case "right":
                newHead.x += 1;
                break;
        }

        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            updateFoodPosition();
            snakeSpeed -= 10; // Increase game speed when food is eaten
        } else {
            snake.pop();
        }

        snakeElement.style.left = `${newHead.x * grid}px`;
        snakeElement.style.top = `${newHead.y * grid}px`;

        checkCollision();
        changingDirection = false;
    }

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        gameLoop = setInterval(updateGame, snakeSpeed);
    }

    document.addEventListener("keydown", (event) => {
        if (isGameRunning) {
            switch (event.key) {
                case "ArrowUp":
                    if (direction !== "down") direction = "up";
                    break;
                case "ArrowDown":
                    if (direction !== "up") direction = "down";
                    break;
                case "ArrowLeft":
                    if (direction !== "right") direction = "left";
                    break;
                case "ArrowRight":
                    if (direction !== "left") direction = "right";
                    break;
            }
        }
    });

    easyButton.addEventListener("click", () => {
        grid = 20;
        initialSnakeSpeed = 200;
        resetGame();
    });

    mediumButton.addEventListener("click", () => {
        grid = 30;
        initialSnakeSpeed = 150;
        resetGame();
    });

    hardButton.addEventListener("click", () => {
        grid = 40;
        initialSnakeSpeed = 100;
        resetGame();
    });

    startGame();
});
