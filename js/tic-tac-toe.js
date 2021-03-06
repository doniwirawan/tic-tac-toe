/**
 * 
 * DOM Declaration Here
 * 
 * 
 */
const modal = document.querySelector('#modal');
const changeBg = document.querySelector('#changeBg');

/**
 * Tic Tac Toe
 *
 * A Tic Tac Toe game in HTML/JavaScript/CSS.
 *
 * No dependencies - Uses Vanilla JS
 *
 * @author: Vasanth Krishnamoorthy
 */
var N_SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 120);
      cell.setAttribute('width', 120);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == N_SIZE - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

/**
 * New game
 */
function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

/**
 * Check if a win or not
 */
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
    // winning condition: turn == N_SIZE
    if (items.length == N_SIZE) {
      return true;
    }
  }
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}
/**
 * 
 * showing modal when player win or draw
 */
function showModal(innerText) {

  modal.style.display = 'block';

  modal.innerHTML = `
      <div class="modal-head">
        <h1>${innerText}</h1>
      </div>
      <button class="close-btn">Close</button>
  `;
  document.querySelector('.close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // after 3s the modal will automatically disappear
  setTimeout(() => {
    modal.style.display = 'none';
  }, 3000);
}





/**
 * Sets clicked square and also updates the turn.
 */
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    showModal(`Player ${turn} Win`);
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    showModal('Draw')
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn;
  }
}

init();

/**
 * 
 * Change Background Function
 * 
 * Unsplash API to get pictures
 * 
 */
function changeBackground() {
  fetch('https://api.unsplash.com/photos/random?client_id=gfXzHUZJnwnsObUFyB0hxiOMXrt_nA4V7UyjpCrRK6w')
    .then(response => response.json())
    .then(data => {
      console.log(data.urls.regular);
      const bgEl = document.querySelector('body');
      bgEl.style.backgroundImage = `url('${data.urls.regular}')`;
    })
}

/**
 * 
 * When the Change Background button clicked
 * 
 */
changeBg.addEventListener('click', changeBackground);