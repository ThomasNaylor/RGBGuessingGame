/*
*   colourGame-JS v1.0
*   Thomas Naylor
*
*
*
*/

// global variables
var numSquares = 9
var colours = generateRandomColours(numSquares);
var squares = document.querySelectorAll('.square');
var colourDisplay = document.getElementById('colourDisplay');
var messageDisplay = document.getElementById('message');
var header = document.getElementById('header-main');
var difficultyBtn = document.getElementsByClassName('difficulty');
var menu = document.querySelector('#menu ul li:hover');
var pickedColour = pickColour();

// setup page with necessary function and listeners to start
function setup() {
  var difficultyBtn = document.getElementsByClassName('difficulty');

  colourDisplay.textContent = pickColour();

  for(var i = 0; i < squares.length; i++) {
    // add initial colours to squares
    squares[i].style.backgroundColor = colours[i];

    // add click listeners to squares
    squares[i].addEventListener('click', function() {
      var clickedColour = this.style.backgroundColor;

      if(clickedColour === pickedColour) {
        updateVisuals();
        changeColours(clickedColour);
      } else {
        this.style = "#FFFFFF";
        messageDisplay.textContent = 'Try Again';
      }
    });
  }

  for(var i = 0; i < difficultyBtn.length; i++) {
    difficultyBtn[i].addEventListener('click', function() {
      switch(this.id) {
        case 'easy':
          numSquares = 3;
          generateRandomSquares(numSquares);
          break;
        case 'medium':
          numSquares = 6;
          generateRandomSquares(numSquares);
          break;
        case 'hard':
          numSquares = 9;
          generateRandomSquares(numSquares);
          break;
        case 'reset':
          generateRandomSquares(numSquares);
          break;
      }
    });
  }
}

function updateVisuals() {
  header.style.backgroundColor = pickedColour;
  messageDisplay.textContent = 'Correct';
  reset.textContent = 'New Colours';
}

// generates amount of squares needed for the difficulty chosen and hides excess squares
function generateRandomSquares(num) {
  colours = generateRandomColours(num);
  colourDisplay.textContent = pickColour();
  messageDisplay.textContent = '';

  for(var i = 0; i < squares.length; i++) {
    if(colours[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colours[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
}

// change all squares colour when correct colour is picked.
function changeColours(colour) {
  for(i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colour;
  }
}

// finds a random colour from the colours array and populates the header with the RGB value for player to find
function pickColour() {
  var random = Math.floor(Math.random() * colours.length);
  pickedColour = colours[random];

  return pickedColour;
}

// pushes amount of colours needed into the colours array
function generateRandomColours(num) {
  var colours = [];

  for (var i = 0; i < num; i++) {
    colours.push(randomColour());
  }

  return colours;
}

// generates random colours for the colours array
function randomColour() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  var rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

  return rgb;
}

// setup window listeners on page load
if(window.addEventListener) {
	window.addEventListener("load", setup, false);
} else if(window.attachEvent) {
	window.attachEvent("onload", setup);
}

/* game over ;) */
