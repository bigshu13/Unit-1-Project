//8x8 column row board
// I need 12 pieces different color to put on each side of the board.
// I want the pieces to set on the black spaces of the board. 
// I need the pieces to take out the opposite color pieces when they cross over. 
// need to put a rule to turn the checkers piece into a king piece when it reaches to the otherside of the board.
// an img of a king crown should pop up on the piece that makes it to the otherside.
// change moving rules for king pieces so they can move multiple spaces and move backwards. 
// make sure normal pieces move one space at a time diagonally.
// when pieces get taken i want them to move to trash area on side of the board. 
// need to have play again button when game is over.
// need to add win condtion when all pieces are taken.
// need to add "i quit" button when player gives up.
// need to make sure pieces can jump multiple opponent pieces if needed.
// make sure pieces cant go to red boxes. 

/*-----Constants----*/
const COLORS = {
    '0' : 'black',
    '-1' : 'red',
    '1' : 'white',
    '2' : 'blue'
};
// board representation on backend. Got idea from https://levelup.gitconnected.com/creating-a-board-game-checkers-with-javascript-ecd562f985c2
const boardRep = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null, 
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null ,null ,null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];


/*----State Variables--- */
let turn = true; // this is going to be 1 or 2
//let board  // 2D array of 8 arrays with 8 values inside
let winner  // this will be set to null, 1, 2 or 'T'(tie)
let whiteScore = 12; // these will keep score of the amount of pieces left.
let blueScore = 12; // when it equals 0 it shows winner
let playerPieces;

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false, 
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return boardRep.indexOf(parsed);
};
/*---cached elements---- */
const turnEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('.myButton');
const seppukuBtn = document.getElementById('iQuit');
let whitePieces = document.querySelectorAll('.whitePiece');
let bluePieces = document.querySelectorAll('.bluePiece');
//const cells = boardRep;
/*----event listeners-----*/
playAgainBtn.addEventListener("click", () => {
alert('i am working')
});

document.getElementById('iQuit').addEventListener("click", () => {
    alert('still aint working');
});
/*---functions---- */
//gives pieces an event listener when clicked
function givePiecesEventListeners () {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < bluePieces.length; i++) {
            bluePieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}
 //holds how many pieces are left for player
function getPlayerPieces () {
    if (turn) {
        playerPieces = whitePieces;
    } else {
        playerPieces = bluePieces;
    }
        removeCellOnClick();
        resetBorder();
}
//loops through board then removes click when i click on another piece      
function removeCellOnClick () {
    let cells = document.getElementById('board')
    for(i = 0; i < cells.length; i++) {
        cells.removeAttribute('onClick');
    }
}
//reset color border of piece when not selected
function resetBorder () {
    for(i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "3px solid yellow";
    }
        resetSelectedPieceProperties();
        getSelectedPieces();
}

function resetSelectedPieceProperties () {
    selectedPiece.pieceId = -1;
    selectedPiece.indexOfBoardPiece = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}
//gets Id and index of board cell its on
function getSelectedPieces() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}
//checks if the selected piece is a king or not
function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains('king')) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}
//checks which spaces piece can move too
function getAvailableSpaces() {
    let cells = boardRep
    if(boardRep[selectedPiece.indexOfBoardPiece - 7] === null &&
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains('translucent') !== true) {
        selectedPiece.minusseventhSpace = true;
    }
    if(boardRep[selectedPiece.indexOfBoardPiece - 9] === null &&
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains('translucent') !== true) {
        selectedPiece.minusninthSpace = true;
    }
    if(boardRep[selectedPiece.indexOfBoardPiece + 7] === null &&
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains('translucent') !== true) {
        selectedPiece.seventhSpace = true;
    }
    if(boardRep[selectedPiece.indexOfBoardPiece + 9] === null &&
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains('translucent') !== true) {
        selectedPiece.seventhSpace = true;        
    }
    checkAvailableJumpSpaces();
}
//checks if pieces can make jumps
function checkAvailableJumpSpaces(){
    if (turn) {
        if (boardRep[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('translucent') !== true &&
            boardRep[selectedPiece.indexOfBoardPiece + 7] >= 12) {
                selectedPiece.fourteenthSpace = true;
            }
    } else {
        if (boardRep[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains('translucent') !== true &&
            boardRep[selectedPiece.indexOfBoardPiece + 7] < 12 && boardRep[selectedPiece.indexOfBoardPiece + 7] !== null) {
                selectedPiece.fourteenthSpace = true;}
    }
}
//restricts movement of king piece
function checkPieceConditions (){
    if(selectedPiece.isKing) {
        givePieceBorder();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinthSpace = false;
            selectedPiece.minusfourteenthSpace = false;
            selectedPiece.minuseighteenthSpace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninthSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        givePieceBorder();
    }
}
//gives piece a gree highlight when selected
//givePieceBorder() {
  //  if (selectedPiece.seventhSpace || selectedPiece.ninthSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace||
    //    selectedPiece.minusSeventhSpace || selectedPiece.minusNinthSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSpace) {
      //      document.getElementById(selectedPiece.pieceId).style.border = "3px solid green";
        //    giveCellsOnClick();
        //} else {
          //  return;
        //}
    //}
//gives cells a onClick attribute
function giveCellsOnClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute('onClick', 'makeMove(7)');
    }
    if (selectedPiece.ninthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute('onClick', 'makeMove(9)');
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute('onClick', 'makeMove(14)');
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute('onClick', 'makeMove(18)');
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute('onClick', 'makeMove(-7)');
    }
    if (selectedPiece.minusNinthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute('onClick', 'makeMove(-9)');
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute('onClick', 'makeMove(-14)');
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute('onClick', 'makeMove(-18)');
    }
}

function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if(selectedPiece.isKing) {
        cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = "whitePiece king" id = "${selectedPiece.pieceId}"></p>`;
        whitePieces = document.querySelectorAll('p');
        } else {
            cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = "whitePiece" id = "${selectedPiece.pieceId}"></p>`;
            whitePieces = document.querySelectorAll('p');   
        }
        } else {
            if(selectedPiece.isKing) {
                cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = "bluePiece king" id = "${selectedPiece.pieceId}"></p>`;
                bluePieces = document.querySelectorAll('p');
      } else {
        cells[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class = "bluePiece" id = "${selectedPiece.pieceId}"></p>`;
        bluePieces = document.querySelectorAll('p'); 
      }
    }
}

   // let indexOfPiece = selectedPiece.indexOfBoardPiece
    //if(number === 14 || number === -14 || number === 18 || number === -18) {
      //  changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    //} else {
      //  changeData(indexOfPiece, indexOfPiece + number);
    //}
//changes the board states data on the backend
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    boardRep[indexOfBoardPiece] = null;
    boardRep[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        boardRep[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            cells[removePiece].innerHTML = "";
            whiteScore--
        }
        if (turn === false && selectedPiece.pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            blueScore--
        }
    }
    resetSelectedPieceProperties();
    removeCellOnClick();
    removeEventListener();
}
//removes onclick event listener for pieces
function removeEventListener() {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].removeEventListener("click", getPlayerPieces);
        }
     }  else {
        for (let i = 0; i < bluePieces.length; i++) {
           bluePieces[i].removeEventListener("click", getPlayerPieces);
         }
    }
    checkForWin();
}
//Checks who won by counting the player score
function checkForWin () {
    if (whiteScore === 0) {
        for (let i = 0; i < whiteTurnText.length; i++) {
        whiteTurnText.style.color = "black";
        whiteTurnText.textContent = "White WINS!";
    }
} else if (blueScore === 0) {
        for (let i = 0; i < blueTurnText.length; i++) {
        blueTurnText.style.color = "black";
        blueTurnText.textContent = "Blue WINS!";
    }
}    
    changePlayer();
    }
//suppose to switch players turn
function changePlayer() {
    if (turn) {
        turn = false;
        for(let i = 0; i < whiteTurnText.length; i++) {
            whiteTurnText[i].style.color = "lightgrey";
            blueTurnText[i].style.color = "black"
        }
    } else {
        turn = true;
        for(let i = 0; i < blueTurnText.length; i++) {
            blueTurnText[i].style.color = "lightgrey";
            whiteTurnText[i].style.color = "black"
        }
    }
    givePiecesEventListeners();
}
function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}
givePiecesEventListeners();
