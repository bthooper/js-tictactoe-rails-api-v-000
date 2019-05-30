// Code your JavaScript / jQuery solution here

var turn = 0;

$(document).ready(function() {
  attachListeners();
});

function player() {
  return (turn % 2 === 0) ? "X" : "O";
}

function updateState (element) {
  letter = player();
  $(element).text(letter);
}

function setMessage(text) {
  $("#message").text(text);
}

function checkWinner() {
  const WIN_STATES = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
  let win = false;
  let board = {};

  $("td").text((index, square) => board[index] = square);


  WIN_STATES.some(function(combo) {
    if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      win = true;
    }
  });
 return win;
}

function doTurn(square) {
  updateState(square); 
  turn++;
  if (checkWinner()) {
    turn = 0;
    $('td').empty();
  } else if (turn === 9) {
    setMessage("Tie game.");
    turn = 0;
    $('td').empty();
  }
}

function attachListeners() {
  $('td').on('click', function() {
    if (this.innerHTML === '' && !checkWinner()) {
    doTurn(this);
    }
  });

  $('button#previous').on('click', function(e) {
    e.preventDefault;
    alert("You are in the previous button action");
    // 1- grab saved games with ajax
    $.get('/games', (games) => {
      if (games.data.length) {
        console.log("Game Data: " + games.data);
      } else {
        console.log("No game data.");
      }
    });
    // 2- create html button/link for each game
    // 3- add to div#games element

    

  });

  $('button#save').on('click', function(e) {
    e.preventDefault;
    // Save the current game state
    // if the game exists update previous game
    // if it is new, save it
    


    alert("At the save...");
  });


  
}

  

