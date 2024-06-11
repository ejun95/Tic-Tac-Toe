// What are the things that I need?
// A game Board
// Either 1 player and 1 computer OR 2 players
// A way to display all this stuff

// Questions I have
// Who keeps track of wins
// How to make the AI
// How to check for wins? Hard code?

// What does the game board do?
// It makes the game board
// It clears the game board
// It sets the current cell to a certain sign
const GameBoard = (() => {
  const board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

  const resetBoard = () => {
    for(let i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  const setCell = (sign, index) => {
    board[index] = sign;
  };

  const getCell = (index) => {
    return board[index];
  };

  const getBoard = () => {
    return board;
  }

  return {resetBoard, setCell, getCell, getBoard};
})();

// What does the player do?
// They have a assigned sign 'X' or 'O'
// They can change a cell on the board -- or is this handled somewhere else?
const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  }

  return {getSign};
};

const DisplayController = (() => {
  // This will show all the UI stuff -- DO LATER --
  // For now we do console stuff
  let row = '';
  const renderBoard = () => {
    let colCount = 0;
    for(let i = 0; i < 9; i++) {    
      row = row + GameBoard.getCell(i) + ' ';
      colCount += 1;
      if(colCount === 3) {
        row = row + '\n';
        colCount = 0;
      }
    }
    console.log(row);
  }

  const resetBoard = () => {
    if(GameController.isGameOver) {
      GameController.reset;
      GameBoard.resetBoard;
    }
  }

  return {renderBoard, resetBoard};
})();

const GameController = (() => {
  // What does the game controller do?
  // check who wins
  // play a round
  // reset a round
  // check if a round is over
  // keeps track of score
  // makes the players
  // check if the game is over

  const playerOne = Player('X');
  const playerTwo = Player('O');
  const playerList =[playerOne, playerTwo];
  const regex = /^[0-9]/;

  //  0 1 2
  //  3 4 5
  //  6 7 8
  const winCombinations = [[0, 3, 6],
                           [0, 1, 2],
                           [0, 4, 8],
                           [3, 4, 5],
                           [6, 7, 8],
                           [1, 4, 7],
                           [2, 5, 8],
                           [2, 4, 6]];

  let currentPlayer = playerList[0];

  const MAX_SCORE = 3;
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let roundCount = 0;
  let gameOver = false;

  let input = '';

  const playRound = () => {
    // If rounds goes 9 and theres no winner, its a draw
    if(roundCount === 9) {
      // Game is a draw so reset the game - no points
      prompt('No more moves, Game is a Draw')
      GameBoard.resetBoard();
      reset();
    }
    while(roundCount < 9) {
      // Ask user to choose a cell
      input = prompt(currentPlayer.getSign() + ' player, where do you want to place 0-8');
      while(GameBoard.getCell(input) !== '_' || parseFloat(input) > 8 || parseFloat(input) < 0 || !(regex.test(input))) {
        input = prompt('cell already taken OR input is invalid');
      }

      // user gave correct input, now change cell to 'X' or 'O'
      GameBoard.getCell()
      GameBoard.setCell(currentPlayer.getSign(), parseFloat(input));
      DisplayController.renderBoard();

      if(isGameOver()) {
        prompt('Player' + getCurrentPlayer().getSign() + ' wins!')
        addScoreToWinner();
        GameBoard.resetBoard();
        restartRound();
        gameOver = false;
      }
      changePlayerTurn();
      roundCount++;
    }   
  }

  const checkRoundWin = () => {
    // How to match the win combinations with
    // I can store the players chosen cells in an array
    // loop through the array

    // Is there a array method that can do this?
    // the some method will return true and stops if the function finds one element in
    // the array that fulfills the requirements so...
    // In the function of the some method, I need to go through each element and find
    // exact matches of the win combinations present in the board
    // basically get the current player, go through the board and find the current
    // player sign and see if any of those positions exactly match any of the
    // win conditions then return true
    gameOver = winCombinations.some((combination) => combination.every((cell) => { return GameBoard.getCell(cell) === getCurrentPlayer().getSign();
    }));
  }

  const changePlayerTurn = () => {
    if(roundCount % 2 == 0) {
      currentPlayer = playerList[1];
    } else {
      currentPlayer = playerList[0];
    }
  }

  const addScoreToWinner = () => {
    currentPlayer === playerList[0] ? playerOneScore++ : playerTwoScore++; 
  }

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const isGameOver = () => {
    return gameOver;
  }

  const reset = () => {
    // What do we need to reset?
    // The board -- maybe this is for display controller?
    // the round count
    // change game over to false
    // The score when a player wins the game
    roundCount = 0;
    playerOneScore == 0;
    playerTwoScore == 0;
    gameOver = false;
  }

  const restartRound = () => {
    // Different from reset since we dont reset the scores
    roundCount = 0;
    gameOver = false;
  }

  return {playRound, changePlayerTurn, getCurrentPlayer, checkRoundWin, isGameOver, restartRound, reset}

})();

GameController.playRound();
