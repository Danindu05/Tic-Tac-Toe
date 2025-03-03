const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restart-button');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function handleCellClick(event) {
    const cellIndex = parseInt(event.target.dataset.cellIndex);

    if (board[cellIndex] !== "" || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add(currentPlayer === "X" ? "playerX" : "playerO");

    if (checkWin()) {
        endGame(false);
    } else if (isBoardFull()) {
        endGame(true);
    } else {
        
        if(gameActive) {
            currentPlayer = "O";  
            boardElement.classList.add("disabled"); 
            setTimeout(aiTurn, 500); 
        }

    }
}


function aiTurn() {
    let bestMove = findBestMove();

    if (bestMove !== -1 && gameActive) {
        board[bestMove] = currentPlayer;
        cells[bestMove].innerText = currentPlayer;
        cells[bestMove].classList.add("playerO"); 


        if (checkWin()) {
            endGame(false);
        } else if (isBoardFull()) {
            endGame(true);
        } else {
            currentPlayer = "X";
        }
    }
     boardElement.classList.remove("disabled");  
}


function findBestMove() {
     
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === "O" && board[b] === "O" && board[c] === "") return c;
        if (board[a] === "O" && board[c] === "O" && board[b] === "") return b;
        if (board[b] === "O" && board[c] === "O" && board[a] === "") return a;
    }

   
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === "X" && board[b] === "X" && board[c] === "") return c;
        if (board[a] === "X" && board[c] === "X" && board[b] === "") return b;
        if (board[b] === "X" && board[c] === "X" && board[a] === "") return a;
    }
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            return i;
        }
    }
    return -1;
}


function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}


function isBoardFull() {
    return !board.includes("");
}


function endGame(draw) {
    gameActive = false;
    if (draw) {
        messageText.innerText = "It's a draw!";
    } else {
        messageText.innerText = `Player ${currentPlayer} wins!`; 
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    messageText.innerText = "";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("playerX", "playerO"); 
    });
     boardElement.classList.remove("disabled");
}


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);