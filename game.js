//Variables for Game Board
var canvas = document.getElementById('our_canvas'),
  ctx = canvas.getContext('2d'),
  Height = canvas.height,
  Width = canvas.width;

/*Variables for Gameplay
bs - Board Size
bss - Board Secondary Size (Board Size + 1)
turnTwo - Player Two's turn
ClockActive - Clock Timer boolean to tell if it's on or not
gameOver - Is the game over, true or false.
player1Name - First Player's Name
player1Captures - Amount of captured pairs for each player
player2Name - Second Player's Name
player2Captures - Amount of captured pairs for each player
isPlayer1Turn - Boolean to determine if it is Player 1's turn or not
boardStateArray - Array used for the Game Board's tokens
*/

var bs = 19,
  bss = 20,
  turnTwo = true,
  ClockActive, gameOver = false,
  isPlayerVsComputer = false,
  player1Name = "Player 1",
  player1Captures = 0,
  player2Name = "Player 2",
  player2Captures = 0,
  isPlayer1Turn = true,
  boardStateArray;

//Timer Function.
/*
Places a Timer HTML element at the top, and times each players turn for 20 seconds.
*/
function Clock() {
  var clockInt,
    cl = document.getElementById("turn_clock"),
    countSec = 0;

  function countTimer() {
    countSec = countSec + 1;
    cl.innerHTML = ('Time Left: ' + (21 - countSec) + ' secs');
    if (countSec > 20) {
      Turnswap();
    }
  }
  this.startTiming = function () {
    clockInt = setInterval(countTimer, 1000);
  }
  this.restartTiming = function () {
    clearInterval(clockInt);
    countSec = 0;
    clockInt = setInterval(countTimer, 1000);
  }
  this.stopTiming = function () {
    clearInterval(clockInt);
    document.getElementById("turn_clock").innerHTML = ('Time Left: none');
    countSec = 0;
  }
}

//Creates the Gameboard Array for gameplay, based on selected amount in set up menu
function CreateBoardArray() {
  boardStateArray = [bs];
  for (var y = 0; y < bs; y++) {
    boardStateArray[y] = [bs];
    for (var x = 0; x < bs; x++) {
      boardStateArray[y][x] = 0;
    }
  }
  boardStateArray[(bss / 2) - 1][(bss / 2) - 1] = 1;
  console.log("bs:" + bs + ", bss:" + bss);
  PlaceToken(bss / 2, bss / 2, 1);
  return boardStateArray;
}

//Creates the Gameboard on the HTML Canvas for the player to view
function CreateGameBoard() {
  ctx.rect(canvas.width / bss, canvas.height / bss, canvas.width - (canvas.width / (bss / 2)), canvas.height - (canvas.height / (bss / 2)));
  ctx.fillStyle = '#CD8646';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#46444C";

  var x = (Width / bss),
    y = (Height / bss);

  //vertical lines	
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (var i = 0; i < bs; i++) {
    ctx.moveTo(x, y);
    ctx.lineTo(x, Height - (Height / bss));
    x = x + (Width / bss);
  }
  ctx.closePath();
  ctx.stroke();

  x = (Width / bss);
  y = (Height / bss);

  //horizontal lines	
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (var i = 0; i < bs; i++) {
    ctx.moveTo(x, y);
    ctx.lineTo(Width - (Width / bss), y);
    y = y + (Height / bss);
  }
  ctx.closePath();
  ctx.stroke();
}

//Players
//Validates if a mouse click is legal on the gameboard, leads into letting the player place a token on the game board.
function MouseClickValidation(canvas, event) {
  if (!gameOver) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    x = Math.floor(((x / Width) * bss) + 0.5);
    y = Math.floor(((y / Height) * bss) + 0.5);
    //console.log("x: " + x + " y: " + y);
    if (x > 0 && y > 0 && x < bss && y < bss) {
      //check if array at index is == 0
      if (boardStateArray[y - 1][x - 1] === 0) {
        //console.log("Pass as valid at x: " + x + " y: " + y);
        if (turnTwo && isPlayer1Turn) {
          if (y < ((bss / 2) - 2) || y > ((bss / 2) + 2) || ((y > ((bss / 2) - 2) && y < ((bss / 2) + 2)) && (x < ((bss / 2) - 2) || x > ((bss / 2) + 2)))) {
            turnTwo = false;
            ValidTurn(x, y);
          }
        } else {
          ValidTurn(x, y);
        }
      }
    }
  }
}

//Computer
//Selects a random placement on the board for the Computer Player to place their token.
function ComputerTurn() {
  if (!gameOver) {
    //window.setTimeout(null, 5000);
    var madeValidMove = false;
    var randX, randY;
    do {
      randX = Math.floor(Math.random() * bss) + 1;
      randY = Math.floor(Math.random() * bss) + 1;
      //madeValidMove = CheckValidMove(randX, randY);	
      if (randX > 0 && randY > 0 && randX < bss && randY < bss) {
        //check if array at index is == 0
        if (boardStateArray[randY - 1][randX - 1] === 0) {
          madeValidMove = true;
        }
      }
    } while (!madeValidMove);
    ValidTurn(randX, randY);
    var point = {
      x: randX,
      y: randY
    }
    return point;
  }
}

//Turn Execution, places player piece on the board when a turn is valid.
function ValidTurn(x, y) {
  boardStateArray[y - 1][x - 1] = (isPlayer1Turn) ? 1 : 2;
  PlaceToken(x, y, boardStateArray[y - 1][x - 1]);
  //game state check
  RunChecks(x, y);
  Turnswap();
}

//Places all existing tokens on the board based on board state array values.
function PlaceExistingTokens() {
  for (var y = 0; y < bs; y++) {
    for (var x = 0; x < bs; x++) {
      if (boardStateArray[y][x] !== 0) {
        PlaceToken(x + 1, y + 1, boardStateArray[y][x]);
      }
    }
  }
}

//Placement of the tokens after it is called when a player makes a legal move.
function PlaceToken(xAxis, yAxis, color) {
  //x,y are center, tokens range out Math.floor((Width/20)*(2/3));
  //Set [y][x] to corresponding color value
  //then check state conditions
  var canvas = document.getElementById('our_canvas');
  var context = canvas.getContext('2d');
  var axisX = Math.floor((Width / bss) * xAxis),
    axisY = Math.floor((Height / bss) * yAxis),
    r = Math.floor((((Width <= Height ? Width : Height) / bss) / 2) - 0.5),
    grd;

  context.beginPath();
  context.arc(axisX, axisY, r, 0, 2 * Math.PI, false);
  context.closePath();

  if (color === 1) { // black token
    grd = context.createRadialGradient(Math.floor(axisX + r / 5), Math.floor(axisY + r / 5), r, axisX, axisY, Math.floor(r * 1.6));
    grd.addColorStop(0, '#222');
    grd.addColorStop(1, '#FFF');
  } else if (color === 2) { // white token
    var grd = context.createRadialGradient(Math.floor(axisX - r / 5), Math.floor(axisY - r / 5), r, axisX, axisY, Math.floor(r * 1.6));
    grd.addColorStop(0, '#FFF');
    grd.addColorStop(1, '#000');
  }
  context.fillStyle = grd;
  context.fill();
}

//Switches Player turn while the game is still going
function Turnswap() {
  if (!gameOver) {
    isPlayer1Turn = !isPlayer1Turn;
    TurnLabel(isPlayer1Turn ? player1Name : player2Name);
    ClockActive.restartTiming();
    if (!isPlayer1Turn && isPlayerVsComputer) {
      ComputerTurn();
    }
  }
}

//HTML Element that displays the current player's name
function TurnLabel(name) {
  var names = name + "";
  var tempS = names;
  tempS = tempS.replace(/\s{1,}/g, '');
  var lastChar = tempS.substr(tempS.length - 1);
  if (lastChar === 's' || lastChar === 'S') {
    name = name + "'";
  } else {
    name = name + "'s";
  }
  document.getElementById('current_player').innerHTML = name + " Turn";
  return name;
}

//Game Over function for when win conditions are met in the game.
function GameOver() {
  //game over
  var name = isPlayer1Turn ? player1Name : player2Name;
  gameOver = true;
  document.getElementById('current_player').innerHTML = name + " is the winner!";
  ClockActive.stopTiming();
  //GameOverS(name);

}

//Game State Check Execution
//Checks that the program is actually working
function RunChecks(x, y) {
  //console.log("runchecks with x:"+x+", y:"+y);
  x = x - 1;
  y = y - 1;
  Captures(x, y);
  var rowAmounts = InARowCount(x, y);
  var keepChecking = true;
  keepChecking = !FiveOrMoreInARow(rowAmounts);
  //set text box to empty
  document.getElementById(isPlayer1Turn ? "player1_callouts" : "player2_callouts").innerHTML = "";
  if (keepChecking) {
    keepChecking = !FourInARow(x, y, rowAmounts);
    if (keepChecking) {
      ThreeInARow(x, y, rowAmounts);
    }
  }
}

//Check for captures on a player
function Captures(x, y) { //Captures Logic
  var spotVal = boardStateArray[y][x];
  var enemyVal = (isPlayer1Turn) ? 2 : 1;
  if (x + 3 < bs && boardStateArray[y][x + 1] === enemyVal && boardStateArray[y][x + 2] === enemyVal && boardStateArray[y][x + 3] === spotVal) {
    //valid
    boardStateArray[y][x + 1] = 0;
    boardStateArray[y][x + 2] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if ((x + 3 < bs && y + 3 < bs) && boardStateArray[y + 1][x + 1] === enemyVal && boardStateArray[y + 2][x + 2] === enemyVal && boardStateArray[y + 3][x + 3] === spotVal) {
    //valid
    boardStateArray[y + 1][x + 1] = 0;
    boardStateArray[y + 2][x + 2] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if (y + 3 < bs && boardStateArray[y + 1][x] === enemyVal && boardStateArray[y + 2][x] === enemyVal && boardStateArray[y + 3][x] == spotVal) {
    //valid
    boardStateArray[y + 1][x] = 0;
    boardStateArray[y + 2][x] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if ((x - 3 > -1 && y + 3 < bs) && boardStateArray[y + 1][x - 1] === enemyVal && boardStateArray[y + 2][x - 2] === enemyVal && boardStateArray[y + 3][x - 3] === spotVal) {
    //valid
    boardStateArray[y + 1][x - 1] = 0;
    boardStateArray[y + 2][x - 2] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if (x - 3 > -1 && boardStateArray[y][x - 1] === enemyVal && boardStateArray[y][x - 2] === enemyVal && boardStateArray[y][x - 3] === spotVal) {
    //valid
    boardStateArray[y][x - 1] = 0;
    boardStateArray[y][x - 2] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if ((x - 3 > -1 && y - 3 > -1) && boardStateArray[y - 1][x - 1] === enemyVal && boardStateArray[y - 2][x - 2] === enemyVal && boardStateArray[y - 3][x - 3] === spotVal) {
    //valid
    boardStateArray[y - 1][x - 1] = 0;
    boardStateArray[y - 2][x - 2] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if (y - 3 > -1 && boardStateArray[y - 1][x] === enemyVal && boardStateArray[y - 2][x] === enemyVal && boardStateArray[y - 3][x] === spotVal) {
    //valid
    boardStateArray[y - 1][x] = 0;
    boardStateArray[y - 2][x] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  if ((x + 3 < bs && y - 3 > -1) && boardStateArray[y - 1][x + 1] === enemyVal && boardStateArray[y - 2][x + 2] === enemyVal && boardStateArray[y - 3][x + 3] === spotVal) {
    //valid
    boardStateArray[y - 1][x + 1] = 0;
    boardStateArray[y - 2][x + 2] = 0;
    if (spotVal === 1) {
      player1Captures = player1Captures + 1;
    }
    if (spotVal === 2) {
      player2Captures = player2Captures + 1;
    }
  }
  //Updates capture text
  document.getElementById(isPlayer1Turn ? "player1_captures" : "player2_captures").innerHTML = (isPlayer1Turn ? player1Captures : player2Captures);

  //clear canvas
  //canvas.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, Width, Height);
  //refill board
  CreateGameBoard();
  PlaceExistingTokens();

  //game over
  if ((isPlayer1Turn ? player1Captures : player2Captures) >= 5) {
    GameOver(); //S(player1Name));
  }
}

//Check for Amounts of tokens in a row. With...an algorithm. Via lots of if statements.
function InARowCount(x, y) {
  //Five in a row
  var spotVal = boardStateArray[y][x];
  var amountOnRow = [[1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0]];
  //horizontal
  var count = 1;
  while (count < 5) {
    if (x + count < bs && boardStateArray[y][x + count] === spotVal) {
      amountOnRow[0][0] += 1;
      count += 1;
    } else {
      amountOnRow[0][1] = count - 1;
      count = 6;
    }
  }
  count = 1;
  while (count < 5) {
    if (x - count > -1 && boardStateArray[y][x - count] === spotVal) {
      amountOnRow[0][0] += 1;
      count += 1;
    } else {
      amountOnRow[0][2] = count - 1;
      count = 6;
    }
  }
  //vertical
  count = 1;
  while (count < 5) {
    if (y + count < bs && boardStateArray[y + count][x] === spotVal) {
      amountOnRow[1][0] += 1;
      count += 1;
    } else {
      amountOnRow[1][1] = count - 1;
      count = 6;
    }
  }
  count = 1;
  while (count < 5) {
    if (y - count > -1 && boardStateArray[y - count][x] === spotVal) {
      amountOnRow[1][0] += 1;
      count += 1;
    } else {
      amountOnRow[1][2] = count - 1;
      count = 6;
    }
  }
  //Diagonal up
  count = 1;
  while (count < 5) {
    if ((x + count < bs && y - count > -1) && boardStateArray[y - count][x + count] === spotVal) {
      amountOnRow[2][0] += 1;
      count += 1;
    } else {
      amountOnRow[2][1] = count - 1;
      count = 6;
    }
  }
  count = 1;
  while (count < 5) {
    if ((x - count > -1 && y + count < bs) && boardStateArray[y + count][x - count] === spotVal) {
      amountOnRow[2][0] += 1;
      count += 1;
    } else {
      amountOnRow[2][2] = count - 1;
      count = 6;
    }
  }
  //Diagonal down
  count = 1;
  while (count < 5) {
    if ((y + count < bs && x + count < bs) && boardStateArray[y + count][x + count] === spotVal) {
      amountOnRow[3][0] += 1;
      count += 1;
    } else {
      amountOnRow[3][1] = count - 1;
      count = 6;
    }
  }
  count = 1;
  while (count < 5) {
    if ((y - count > -1 && x - count > -1) && boardStateArray[y - count][x - count] === spotVal) {
      amountOnRow[3][0] += 1;
      count += 1;
    } else {
      amountOnRow[3][2] = count - 1;
      count = 6;
    }
  }
  return amountOnRow;
}

//Checks if there is 5 of one player's tokens in a row or not.
function FiveOrMoreInARow(amountOnRow) {
  if (amountOnRow[0][0] >= 5 || amountOnRow[1][0] >= 5 || amountOnRow[2][0] >= 5 || amountOnRow[3][0] >= 5) {
    GameOver();
    return true;
  } else {
    return false;
  }
}

//Checks if there is 4 of one player's tokens in a row or not, used for Tessera rule
function FourInARow(x, y, amountOnRow) {
  //var enemyVal = isPlayer1Turn?2:1;
  var amount1 = 0,
    amount2 = 0,
    hasATessera = false;
  if (amountOnRow[0][0] === 4) {
    amount1 = amountOnRow[0][1] + 1;
    amount2 = amountOnRow[0][2] + 1;
    if ((x + amount1 < bs && boardStateArray[y][x + amount1] === 0) ||
      (x - amount2 > -1 && boardStateArray[y][x - amount2] === 0) ||
      (x + amount1 === bs && (x - amount2 > -1 && boardStateArray[y][x - amount2] === 0)) ||
      (x - amount2 === -1 && (x + amount1 < bs && boardStateArray[y][x + amount1] === 0))) {
      hasATessera = true;
    }
  } else if (amountOnRow[1][0] === 4) {
    amount1 = amountOnRow[1][1] + 1;
    amount2 = amountOnRow[1][2] + 1;
    if ((y + amount1 < bs && boardStateArray[y + amount1][x] === 0) ||
      (y - amount2 > -1 && boardStateArray[y - amount2][x] === 0) ||
      (y + amount1 === bs && (y - amount2 > -1 && boardStateArray[y - amount2][x] === 0)) ||
      (y - amount2 === -1 && (y + amount1 < bs && boardStateArray[y + amount1][x] === 0))) {
      hasATessera = true;
    }
  } else if (amountOnRow[2][0] === 4) {
    amount1 = amountOnRow[2][1] + 1;
    amount2 = amountOnRow[2][2] + 1;
    if (((y - amount1 > -1 && x + amount1 < bs) && boardStateArray[y - amount1][x + amount1] === 0) ||
      ((y + amount2 < bs && x - amount2 > -1) && boardStateArray[y + amount2][x - amount2] === 0) ||
      ((y - amount1 === -1 && x + amount1 === bs) && ((y + amount2 < bs && x - amount2 > -1) && boardStateArray[y + amount2][x - amount2] === 0)) ||
      ((y + amount2 === bs && x - amount2 === -1) && ((y - amount1 > -1 && x + amount1 < bs) && boardStateArray[y - amount1][x + amount1] === 0))) {
      hasATessera = true;
    }
  } else if (amountOnRow[3][0] === 4) {
    amount1 = amountOnRow[3][1] + 1;
    amount2 = amountOnRow[3][2] + 1;
    if (((y + amount1 < bs && x + amount1 < bs) && boardStateArray[y + amount1][x + amount1] === 0) ||
      ((y - amount2 > -1 && x - amount2 > -1) && boardStateArray[y - amount2][x - amount2] === 0) ||
      ((y + amount1 === bs && x + amount1 === bs) && ((y - amount2 > -1 && x - amount2 > -1) && boardStateArray[y - amount2][x - amount2] === 0)) ||
      ((y - amount2 === -1 && x - amount2 === -1) && ((y + amount1 < bs && x + amount1 < bs) && boardStateArray[y + amount1][x + amount1] === 0))) {
      hasATessera = true;
    }
  }
  if (hasATessera) {
    document.getElementById(isPlayer1Turn ? "player1_callouts" : "player2_callouts").innerHTML = "Tessera";
  }

  return hasATessera;
}

//Checks if there are 3 of one player's tokens in a row, used for a Trie
function ThreeInARow(x, y, amountOnRow) {
  var amount1 = 0,
    amount2 = 0,
    hasATrie = false;
  if (amountOnRow[0][0] === 3) {
    amount1 = amountOnRow[0][1] + 1;
    amount2 = amountOnRow[0][2] + 1;
    if ((x + amount1 < bs && x - amount2 > -1) && (boardStateArray[y][x + amount1] === 0 && boardStateArray[y][x - amount2] === 0)) {
      hasATrie = true;
    }
  } else if (amountOnRow[1][0] === 3) {
    amount1 = amountOnRow[1][1] + 1;
    amount2 = amountOnRow[1][2] + 1;
    if ((y + amount1 < bs && y - amount2 > -1) && (boardStateArray[y + amount1][x] === 0 && boardStateArray[y - amount2][x] === 0)) {
      hasATrie = true;
    }
  } else if (amountOnRow[2][0] === 3) {
    amount1 = amountOnRow[2][1] + 1;
    amount2 = amountOnRow[2][2] + 1;
    if (((x + amount1 < bs && y - amount1 > -1) && boardStateArray[y - amount1][x + amount1] === 0) && ((y + amount2 > -1 && x - amount2 < bs) && boardStateArray[y + amount2][x - amount2] === 0)) {
      hasATrie = true;
    }
  } else if (amountOnRow[3][0] === 3) {
    amount1 = amountOnRow[3][1] + 1;
    amount2 = amountOnRow[3][2] + 1;
    if (((y + amount1 < bs && x + amount1 < bs) && boardStateArray[y + amount1][x + amount1] === 0) && ((y - amount2 > -1 && x - amount2 > -1) && boardStateArray[y - amount2][x - amount2] === 0)) {
      hasATrie = true;
    }
  }

  if (hasATrie) {
    document.getElementById(isPlayer1Turn ? "player1_callouts" : "player2_callouts").innerHTML = "Trie";
  }
  return hasATrie;
}

//Conversions
//Converts the URL link into a string variable
function ConvertLinkToName(link) {
  //It returns the symbol from the hex value preceded by a %.
  var tempS = "";
  tempS = link.replace(/[+]{1,}/g, ' ');
  link = tempS.replace(/([%][0-9a-z][0-9a-z])/gi, function (n) {
    return String.fromCharCode(parseInt(n.substring(1), 16));
  });
  return link;
}

//Converts string variable to a URL link
function ConvertNameToLink(name) {
  //It returns the symbols hex value preceded by a %.
  var tempS = "";
  // /[^a-z\d\s]/gi or /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.@\/]/gi
  tempS = name.replace(/[^a-z\d\s]/gi, function (n) {
    //return String.fromCharCode(parseInt(n.substring(1), 16));
    return "%" + ((n.charCodeAt(0)).toString(16));
  });
  name = tempS.replace(/\s{1,}/g, '+');
  return name;
}

//Game Configuration and Recording
//Writes current game data to a save file
function SaveGame() {
  var fileName = document.getElementById("sGame").value + "";
  if (fileName === "") {
    fileName = "PenteGame";
  }

  //pause/stop clock
  //ClockActive.stopTiming();

  var info = "data:text/plain;charset=utf-8,";
  info = info + ("&player1Name=" + ConvertNameToLink(player1Name));
  info = info + ("&player2Name=" + ConvertNameToLink(player2Name));
  info = info + ("&isPlayer1Turn=" + isPlayer1Turn);
  info = info + ("&isPlayerVsComputer=" + isPlayerVsComputer);
  info = info + ("&player1Captures=" + player1Captures);
  info = info + ("&player2Captures=" + player2Captures);
  info = info + ("&turnTwo=" + turnTwo);
  info = info + ("&bs=" + bs);
  info = info + ("&gameOver=" + gameOver);
  info = info + ("&boardStateArray=" + boardStateArray);

  var link = document.createElement("a");
  link.download = fileName;
  link.href = info;
  link.click();

  //When they return restart timer
  //ClockActive.startTiming();
}

//Reads file data and sends the data through a call to load the game
function ReadFromFile(file) {
  var reader = new FileReader();
  reader.onload = (function (file) {
    return function (e) {
      var str = e.target.result;
      var vars = {},
        count = 0,
        value;
      var parts = str.split("&");
      for (var i = 1; i < parts.length; i++) {
        var bits = parts[i].split("=");
        if (count < 2) {
          bits[1] = ConvertLinkToName(bits[1]);
          count = count + 1;
        }
        vars[bits[0]] = bits[1];
      }
      console.log("vars2 =", vars);
      return LoadGame(vars);
    }
  })(file);
  reader.readAsText(file);
}

//Checks for if a file exists or not
function Onclick_LoadGame() {
  var files = document.getElementById('lGame').files;

  if (!files.length) {
    alert('Please select a file!');
    return;
  } else if (files.length > 1) {
    alert('Please select a single file!');
    return;
  }

  var file = files[0];
  if (file) {
    var vars = ReadFromFile(file);
  }
}

//Loads a game file to update board to save file's properties
function LoadGame(vars) {
  if (vars) {
    ClockActive.stopTiming();

    isPlayerVsComputer = vars.isPlayerVsComputer === "true";
    player1Name = vars.player1Name;
    player2Name = vars.player2Name;
    console.log(isPlayerVsComputer, player1Name, player2Name);
    document.getElementById("player1").innerHTML = player1Name;
    document.getElementById("player2").innerHTML = player2Name;

    turnTwo = vars.turnTwo === "true";
    gameOver = vars.gameOver === "true";
    isPlayer1Turn = vars.isPlayer1Turn === "true";
    console.log(turnTwo, gameOver, isPlayer1Turn);

    player1Captures = parseInt(vars.player1Captures);
    player2Captures = parseInt(vars.player2Captures);
    document.getElementById("player1_captures").innerHTML = player1Captures;
    document.getElementById("player2_captures").innerHTML = player2Captures;

    bs = (vars.bs) ? parseInt(vars.bs) : bs;
    bss = bs + 1;

    var tempBoardArray = vars.boardStateArray.split(",");
    var count = 0;
    boardStateArray = [bs];
    for (var y = 0; y < bs; y++) {
      boardStateArray[y] = [bs];
      for (var x = 0; x < bs; x++) {
        boardStateArray[y][x] = parseInt(tempBoardArray[count]);
        count += 1;
      }
    }

    ctx.clearRect(0, 0, Width, Height);
    CreateGameBoard();
    PlaceExistingTokens();

    if (gameOver) {
      GameOver();
    } else {
      TurnLabel(isPlayer1Turn ? player1Name : player2Name);
      ClockActive.startTiming();
      canvas.addEventListener('mousedown', function (evt) {
        MouseClickValidation(canvas, evt);
      });
    }
  }

}

//Starting a new game
function NewGame(vars) {
  //Sets player 1 & 2's names, changes computer boolean
  isPlayerVsComputer = (vars.c) ? vars.c === "t" : true;
  player1Name = (vars.p1) ? vars.p1 : "Player 1";
  player2Name = (vars.p2) ? vars.p2 : (isPlayerVsComputer) ? "Computer" : "Player 2";
  console.log(isPlayerVsComputer, player1Name, player2Name);
  document.getElementById("player1").innerHTML = player1Name;
  document.getElementById("player2").innerHTML = player2Name;

  TurnLabel();

  bs = (vars.bs) ? parseInt(vars.bs) : bs,
    bss = bs + 1;

  CreateGameBoard();
  CreateBoardArray();

  canvas.addEventListener('mousedown', function (evt) {
    MouseClickValidation(canvas, evt);
  });
  ClockActive.startTiming();
  Turnswap();
}

//Game Page Set Up Function - Sets up the game HTML page to show UI
function SetUpGame() {
  ClockActive = new Clock();
  canvas = document.getElementById('our_canvas');
  ctx = canvas.getContext('2d');
  Height = canvas.height;
  Width = canvas.width;

  var vars = {},
    parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (n, key, value) {
      value = ConvertLinkToName(value);
      vars[key] = value;
    });
  console.log("Vars setup:", vars);
  if (vars.state && vars.state === 'load') {
    LoadGame(vars);
  } else {
    NewGame(vars);
  }
}

window.addEventListener("onload", SetUpGame());
