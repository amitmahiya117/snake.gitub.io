document.addEventListener("DOMContentLoaded", () => {
    const grid = 20; // Grid size in pixels
    const snakeSpeed = 200; // Snake movement speed in milliseconds

    const gameContainer = document.querySelector(".game-container");
    const snakeElement = document.getElementById("snake");
    const foodElement = document.getElementById("food");

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = "right";
    let changingDirection = false;

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
        clearInterval(gameLoop);
        alert("Game Over! Press OK to restart.");
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        changingDirection = false;
        updateFoodPosition();
        gameLoop = setInterval(updateGame, snakeSpeed);
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

    function updateGame() {
        if (changingDirection) return;
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
            updateFoodPosition();
        } else {
            snake.pop();
        }

        snakeElement.style.left = `${newHead.x * grid}px`;
        snakeElement.style.top = `${newHead.y * grid}px`;

        checkCollision();
        changingDirection = false;
    }

    document.addEventListener("keydown", (event) => {
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
    });

    updateFoodPosition();
    const gameLoop = setInterval(updateGame, snakeSpeed);
});
