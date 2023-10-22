//https://www.codebrainer.com/blog/tic-tac-toe-javascript-game and GLMike


document.addEventListener('DOMContentLoaded', (event) => { //sets up event listener that waits for the HTML document to fully load before executing the code inside the function.

    var tilePositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //declares an array `tilePositions` and initializes it with numbers from 0 to 8. This array represents the game tiles.
    var gametiles = document.getElementById("board").children; //gets all child elements of the HTML element with the id "board". These elements represent the tiles of the game board.

    let displayText = document.getElementById("status"); //gets the HTML element with the id "status". This element will be used to display the game status
    let newGame = document.querySelector(".btn"); //gets the HTML element with the class "btn". This is new game button for the game.

    let win = false; //This variable will be used to track if there's a winner in the game.
    
    let move = 1; //declares a variable `move` and initializes it to `1`. This variable will be used to track whose move it is.
    

    for (let i = 0; i < gametiles.length; i++) { //iterates over each tile in the game board and sets up event listeners for mouseover, mouseout, and click events.
        const element = gametiles[i];
        element.setAttribute("class", "square"); //sets the class attribute to square

        //`mouseover` event adds the "hover" class to a tile when the mouse pointer is over it
        element.addEventListener("mouseover", function() {
            element.classList.add("hover");
        });

        //`mouseout` event removes the "hover" class from a tile when the mouse pointer leaves it
        element.addEventListener("mouseout", function() {
            element.classList.remove("hover");
        });

        //`click` event checks if a tile is empty and if there's no winner yet before making a move
        element.addEventListener("click", function() {
            if (!element.textContent && win == false) {
                //If it's player X's move (i.e., if `move` is odd), it sets the tile's text content to "X", adds the "X" class to it, updates `tilePositions`, and updates the game status.
                if (move % 2 == 1) {
                    element.textContent = "X";
                    element.classList.add("square", "X");
                    tilePositions[i] = "X";
                    displayText.textContent = ('It\'s "O\'s" move.');

                // If it's player O's move (i.e., if `move` is even), it sets the tile's text content to "O", adds the "O" class to it, updates `tilePositions`, and updates the game status.
                } else {
                    element.textContent = "O";
                    element.classList.add("square", "O");
                    tilePositions[i] = "O";
                    displayText.textContent = ('It\'s "X\'s" move.');
                }
                //After each move, it checks if there's a winner and increments `move`.
                win = isWinner(displayText, tilePositions);
                move = move + 1;
            }

        });
        //The newGame button's click event clears all tiles, resets all variables to their initial states, and sets `win` to false.
        newGame.addEventListener("click", function() {
            element.classList.remove("O");
            element.classList.remove("X");
            element.textContent = "";
            tilePositions = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //Without this you can only press one tile and it will show the previous winner status
            displayText.textContent = ('Move your mouse over a square and click to play an X or an O.'); //to indicate that the game has reset
            move = 1; //to set move back to X
            win = false; //new game means no winners
        });
    }

});
//checks if there's a winning combination in `tilePositions`. If there is, it updates the game status and returns true; otherwise, it returns false.
function isWinner(displayText, tilePositions) {
    let winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [1, 4, 7],
        [0, 3, 6], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winPos.length; i++) {
        let winLine = winPos[i];
        let pos1 = winLine[0];
        let pos2 = winLine[1];
        let pos3 = winLine[2];

        if (tilePositions[pos1] == tilePositions[pos2] && tilePositions[pos1] == tilePositions[pos3]) { //statement that checks if the elements at three different positions in the tilePositions are the same
            displayText.textContent = ('Congratulations! ' + tilePositions[pos1] + ' is the winner!');
            return true;
        }
    }
    return false;
}