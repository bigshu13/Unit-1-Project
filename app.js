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

/*----State Variables--- */
let turn  // this is going to be 1 or 2
let board  // 2D array of 8 arrays with 8 values inside
let winner  // this will be set to null, 1, 2 or 'T'(tie)

/*---cached elements---- */
const turnEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const seppukuBtn = document.querySelector('button');

/*---functions---- */
init();

// function init() {
   // for(i = 0; i < 64; i++) {
      // const box = document.createElement('div');
    //   el.div = divClass === "odd" || "even";
  //  }
//}

  
    
       

