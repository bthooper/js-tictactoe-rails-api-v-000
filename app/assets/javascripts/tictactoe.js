

let turn = 0;
let game_id = 0;

$(document).ready(function() {
  attachListeners();
});

function player() {
  return (turn % 2 === 0) ? `X` : `O`;
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

  // Previous button

  $('button#previous').on('click', function(e) {
    e.preventDefault;
    // 1- grab saved games with ajax
    $.get('/games', (games) => {
      if (games.data.length) {
        games.data.forEach(function(game) {
          $("#games").append(`<button id="gameid-${game.id}">${game.id}</button><br />`);
          $("#gameid-" + game.id).on('click', function(e) {
            e.preventDefault;
            game_id = game.id;
            let turn = game.attributes.state.join('').length;
            let state = game.attributes.state;
            let item = 0;
            for (let y = 0; y < 3; y++) {
              for (let x = 0; x < 3; x++) {
                document.querySelector(`[data-x="${x}"][data-y="${y}"]`).innerHTML = state[item];
                item++;
              }
            }

          });
          
        });
      } else {
        console.log("No game data.");
      }
    });
    // 2- create html button/link for each game
    // 3- add to div#games element

    

  });

  // Save button

  $('button#save').on('click', function(e) {
    e.preventDefault;
    // Save the current game state
    // if the game exists update previous game
    // if it is new, save it

    let state = [];
    console.log(state);

    $('td').text((index, square) => { state.push(square); });
    
    console.log(state);
    game_data = {state: state};
    

    if (game_id !== 0) {
      fetch(`games/${game_id}`, 
        {
        method: 'PATCH',
        body: JSON.stringify({ state: state }),
        headers: { 'Content-Type': 'application/json' }  
      });
    } else {
      fetch('/games', 
        { method: 'POST', 
          body: JSON.stringify({ state: state }), 
          headers: { 'Content-Type': 'application/json',
                      'accept': 'application/json'}
        })
        .then (res => res.json())
        .then(res => {
          game_id = res.data.id;
          $("#games").append(`<button id="gameid-${game_id}">${game_id}</button><br />`);
          $("#gameid-" + game_id).on('click', function(e) {
            e.preventDefault;
            

          });
          
        }
        );
        // function(game) {
        // game_id = game.data.id;
        // $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
        // $("#gameid-" + game.data.id).on('click', () => reloadGame(game.data.id));
      // });
    }



     

  });

  // Clear button

  $('button#clear').on('click', function(e) {
    e.preventDefault;

    alert('All clear!!');

  });


  
}

  

