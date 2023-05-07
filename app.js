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
]


/*----State Variables--- */
let turn = true; // this is going to be 1 or 2
let board  // 2D array of 8 arrays with 8 values inside
let winner  // this will be set to null, 1, 2 or 'T'(tie)
let whiteScore = 12; // these will keep score of the amount of pieces left.
let blueScore = 12; // when it equals 0 it shows winner
let playerPieces;

/*---cached elements---- */
const turnEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const seppukuBtn = document.querySelector('button');
let whitePieces = document.querySelectorAll('p')
let bluePieces = document.querySelectorAll('p')

/*---functions---- */
// init();

// function init() {
   // for(i = 0; i < 64; i++) {
      // const box = document.createElement('div');
    //   el.div = divClass === "odd" || "even";
  //  }
//}

 
       

