let currentplayer = " ";
const currPlayerX = "X";
const currPlayerO = "O";

const xbutton = document.querySelector("#playerX");
const obutton = document.querySelector("#playerO");

const choices = document.querySelector(".choices");
const winnerDisplay = document.querySelector("#winner");

const board = ["", "", "", "", "", "", "", "", ""];

const cellmap = {
    "r1c1": 0,
    "r1c2": 1,
    "r1c3": 2,
    "r2c1": 3,
    "r2c2": 4,
    "r2c3": 5,
    "r3c1": 6,
    "r3c2": 7,
    "r3c3": 8
};

const winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

let gameStarted = false;

// to clear the board and reset the game state
const button = document.querySelector("#reset");

// Get all the cells in the game board
const cells = document.querySelectorAll(".cell");

choices.addEventListener("click", (event) => {

    if (event.target.id === "playerX") {
        currentplayer = currPlayerX;

    } else if (event.target.id === "playerO") {
        currentplayer = currPlayerO;

    } else {
        return;
    }

    gameStarted = true;
    winnerDisplay.innerText = `${currentplayer}'s turn`;
});

button.addEventListener("click", () => {
    resetGame();
});

const resetGame = () => {

    // Clear the board
    cells.forEach((cell) => {
        cell.innerText = "";
    });

    // Reset the game state
    board.fill("");
    gameStarted = false;
    winnerDisplay.innerText = "Choose your symbol to start";
    currentplayer = " ";
};

// check for a win
const checkWin = () => {

    for (let pattern of winConditions) {

        if (
            board[pattern[0]] === currentplayer &&
            board[pattern[1]] === currentplayer &&
            board[pattern[2]] === currentplayer
        ) {
            return true;
        }
    }

    return false;
};

// switch players
const switchPlayers = () => {

    if (currentplayer === currPlayerX) {
        currentplayer = currPlayerO;

    } else {
        currentplayer = currPlayerX;
    }

    winnerDisplay.innerText = `${currentplayer}'s turn`;
};

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        // stop if player has not selected a symbol
        if (!gameStarted) {
            return;
        }

        // stop if cell is already filled
        if (cell.innerText !== "") {
            return;
        }

        // display current player's symbol
        cell.innerText = currentplayer;

        // update board array
        const cellId = cell.id;
        board[cellmap[cellId]] = currentplayer;

        // check winner
        if (checkWin()) {

            winnerDisplay.innerText =
            `${currentplayer} wins!`;

            gameStarted = false;

            return;
        }

        // check for draw
        if (!board.includes("")) {

            winnerDisplay.innerText =
            "It's a draw!";

            gameStarted = false;

            return;
        }

        // switch turns
        switchPlayers();
    });
});