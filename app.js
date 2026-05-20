
let currentplayer = " ";
const currPlayerX = "X";
const currPlayerO = "O";

const xbutton = document.querySelector("#playerX");
const obutton = document.querySelector("#playerO");

const choices = document.querySelector(".choices");

choices.addEventListener("click", (event) => {
    if (event.target.id === "playerX") {
        currentplayer = currPlayerX;
    } else {
        currentplayer = currPlayerO;
    }

    gameStarted = true;
});

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
}

let gameStarted = false;
// to clear the board and reset the game state

const button = document.querySelector("#reset");
button.addEventListener("click", () => {
    // Clear the board
    cells.forEach((cell) => {
        cell.innerText = "";
    });
    
    // Reset the game state
    board.fill("");
    gameStarted = false;
    currentplayer = " ";
});

// Get all the cells in the game board 
const cells = document.querySelectorAll(".cell");


//check for a win
const checkWin = () => {

}


//switch players 
const switchPlayers = () => {
    if(currentplayer === currPlayerX){
        currentplayer = currPlayerO;
    } else {
        currentplayer = currPlayerX;
    }
}

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
        checkWin();

        // switch turns
        switchPlayers();
    });
});
