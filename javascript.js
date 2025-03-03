const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = [];
let gameBoard = Array(9).fill(null);
let currentPlayer = "X";

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleMove(event) {
    let index = event.target.dataset.index;
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("taken");
        if (checkWinner(currentPlayer)) {
            message.textContent = currentPlayer === "X" ? "Por bhaji darbh! 🎉 You Win!" : "Computer Wins!";
            disableBoard();
            return;
        }
        if (gameBoard.every(cell => cell)) {
            message.textContent = "It's a Draw!";
            return;
        }
        currentPlayer = "O";
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = gameBoard.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    cells[randomIndex].classList.add("taken");
    if (checkWinner("O")) {
        message.textContent = "Computer Wins!";
        disableBoard();
    } else {
        currentPlayer = "X";
    }
}

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => gameBoard[index] === player)
    );
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener("click", handleMove));
}

createBoard();
