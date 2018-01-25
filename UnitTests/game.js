//Game Board 
//generates an initial board game array of all 0,
//places the first move piece colored black on the center of the board
function UnitTestCreateBoardArray(){
	var valid = false;
	isPlayerVsComputer = false;
	CreateBoardArray();
	for (var y = 0; y < bs; y++){
		for (var x = 0; x < bs; x++){
			if(boardStateArray[y][x] != 0 && boardStateArray[(bss/2)-1][(bss/2)-1] != 1) {
				valid == false;
			}
			else {
				valid = true;
			}
		}
	}
	if(valid) {
		console.log("Creating Board Array is Valid");
	} else {
		console.log("Creating Board Array is Not Valid");
	}
}
//Players
//gets the mouse's current position on the canvas,
// checks if it is a valid move,
// if move is valid, then call ValidTurn() method
function UnitTestMouseClickValidation(){//canvas, event
	var valid = false;
	turnTwo = false;
	isPlayer1Turn = false;
	var rect = canvas.getBoundingClientRect();
	var x = -2;
	var y = -2; 
	x = Math.floor(((x/Width)*bss)+0.5);
	y = Math.floor(((y/Height)*bss)+0.5);
	if(x > 0 && y > 0 && x < bss && y < bss){
		valid = true;
		if(boardStateArray[y-1][x-1]===0){
			if(turnTwo && isPlayer1Turn){
				if(y<((bss/2)-3) || y>((bss/2)+3)||((y>((bss/2)-3)&&y<((bss/2)+3))&&(x<((bss/2)-3)||x>((bss/2)+3)))){
					turnTwo=false;
					valid = true;
				}
				else {
					valid = false;
				}
			} else {
				valid = true;
			}
		} else {
			valid = false;
		}
	} else {
		valid = false;
	}
	if(valid) {
		console.log("Click Validation is Valid");
	} else {
		console.log("Click Validation is Not Valid");
	}
}
//generates a random point and does so until it finds a valid one,
// then calls the ValidTurn() method
function UnitTestComputerTurn(){
	var valid = false;
	ComputerTurn();
	if(randX > 0 && randY > 0 && randX < bss && randY < bss){
		valid = true;
		if(boardStateArray[randY-1][randX-1]===0){
			valid = true;
		} else {
			valid = false;
		}
	} else {
		valid = false;
	}
	if(valid) {
		console.log("Computer Turn is Valid");
	} else {
		console.log("Computer Turn is Not Valid");
	}
}
//Switches the current player's turn,
//resets the turn clock,
//calls TurnLabel()
function UnitTestTurnSwap(){
	isPlayer1Turn = true;
	var valid = false;
	Turnswap();
	if(isPlayer1Turn == false) {
		valid = true;
	}
	if(valid) {
		console.log("Turn Swap is Valid");
	} else {
		console.log("Turn Swap is Not Valid");
	}
}
//updates the current turn label text, returns name factor
//checks if name ends in s to properly position an apostrophe 
function UnitTestTurnLabel(){
	var valid = false;
	TurnLabel("Krebs");
	if(name == "Krebs'") {
		valid = true;
	} else {
		valid = false;
	}
	if(valid) {
		console.log("Turn Label is Valid");
	} else {
		console.log("Turn Label is Not Valid");
	}
}

//check that gameOver boolean is true and that the winner is the correct winner, based upon isPlayer1Turn boolean
function UnitTestGameOver(){
	player1Name = "Mark";
	isPlayer1Turn = true;
	gameOver = false;
	var valid = true;
	gameOver();
	var endName = document.getElementById('current_player').innerHTML
	if(gameOver) {
		if(endName == "Mark is the winner!") {
			valid = true;
		} else {
			valid = false;
		}
	} else {
		valid = false;
	}
	if(valid) {
		console.log("Game Over is Valid");
	} else {
		console.log("Game Over is Not Valid");
	}
}
//Checking game conditions
//sets gameOver to true and displays winner
	function UnitTestCaptures(){
	isPlayer1Turn = true;
	player1Captures = 10;
	var valid = true;
	Captures(3, 2);
	if(gameOver) {
		valid = true;
	} else {
		valid = false;
	}
	if(valid) {
		console.log("Captures is Valid");
	} else {
		console.log("Captures is Not Valid");
	}
}
//Checks the coordinates passed in,
//Checks for pieces horizontal, vertical, and diagonally up/down 
//returns amount of pieces in a row (total count for all directions) 
function UnitTestInARowCount(){
	var valid = false;
	for(var i = 0; i < 9; i++) {
		boardStateArray[y] = [9];
		for(var j = 0; j < 9; j++) {
			boardStateArray[y][x] = 0;
		}
	}
	boardStateArray[5][5] = 1;
	boardStateArray[5][4] = 1;
	boardStateArray[5][3] = 1;
	InARowCount(5, 4);
	if(amountOnRow[0][0] == 3) {
		valid = true;
	} else {
		valid = false;
	}
	if(valid) {
		console.log("In a Row Count is Valid");
	} else {
		console.log("In a Row Count is Not Valid");
	}
}
//Checks the coordinates passed in,
//Checks for 5 pieces in a row horizontally, vertically, and diagonally up/down  
//returns boolean for whether or not there are 5 pieces in a row,
//calls GameOver()
function UnitTestFiveOrMoreInARow(){
	var valid = false;
	for(var i = 0; i < 9; i++) {
		boardStateArray[y] = [9];
		for(var j = 0; j < 9; j++) {
			boardStateArray[y][x] = 0;
		}
	}
	boardStateArray[5][5] = 1;
	boardStateArray[5][4] = 1;
	boardStateArray[5][3] = 1;
	boardStateArray[5][2] = 1;
	boardStateArray[5][1] = 1;
	InARowCount(5, 3);
	if(FiveOrMoreInARow(amountOnRow)) {
		valid = true;
	} else {
		valid = false;
	}
	if(valid) {
		console.log("5 In a Row Count is Valid");
	} else {
		console.log("5 In a Row Count is Not Valid");
	}
}
//Checks the coordinates passed in,
//Checks for 4 pieces in a row horizontally, vertically, and diagonally up/down,
//returns boolean for whether or not there is a tessera
function UnitTestFourInARow(){
	var valid = false;
	for(var i = 0; i < 9; i++) {
		boardStateArray[y] = [9];
		for(var j = 0; j < 9; j++) {
			boardStateArray[y][x] = 0;
		}
	}
	boardStateArray[5][5] = 1;
	boardStateArray[5][4] = 1;
	boardStateArray[5][3] = 1;
	boardStateArray[5][2] = 1;
	InARowCount(5, 3);
	FourInARow(5, 3, amountOnRow);
	if(hasATessera) {
		valid = true;
	} else {
		valid = false;
	}
	if(valid) {
		console.log("4 In a Row Count is Valid");
	} else {
		console.log("4 In a Row Count is Not Valid");
	}
} 
//Checks the coordinates passed in,
//Checks for 3 pieces in a row horizontally, vertically, and diagonally up/down,
//returns boolean for whether or not there is a trie
function UnitTestThreeInARow(){
	var valid = false;
	for(var i = 0; i < 9; i++) {
		boardStateArray[y] = [9];
		for(var j = 0; j < 9; j++) {
			boardStateArray[y][x] = 0;
		}
	}
	boardStateArray[5][5] = 1;
	boardStateArray[5][4] = 1;
	boardStateArray[5][3] = 1;
	InARowCount(5, 3);
	ThreeInARow(5, 4)
	if(hasATrie) {
		valid = true;
	} else {
		valid = false;
	}
	if(valid) {
		console.log("3 In a Row Count is Valid");
	} else {
		console.log("3 In a Row Count is Not Valid");
	}
}
//(make documented manual test):
function UnitTestCreateGameBoard(){
	//draws the board, background square and axis lines
	//choose size of board array
	//start game
	//count number of boxes and see if the same dimensions
}
//Tokens
function UnitTestPlaceExistingTokens(){
	//does just that on the already existing canvas by reading the current boardStateArray
	//start game
	//place peices where you want
	//save game
	//reset
	//load game
	//make sure peice are in the same place
}
function UnitTestPlaceToken(){//x, y, color
	//just places a token on the graph at the given x, y, and selects the token style based on the color value, 1=black, anything else = white
	//start game
	//click where you want
	//make sure your token appears
	//if first player make sure piece is black
}
//Conversions
function UnitTestConvertNameToLink() {
	console.log("Sam" == ConvertNameToLink("Sam"));
	console.log("Code+Owl" == ConvertNameToLink("Code Owl"));
	console.log("Code+Owl" == ConvertNameToLink("Code	Owl"));
	console.log("Code+Owl" == ConvertNameToLink(" Code Owl"));
	console.log("Code+Owl" == ConvertNameToLink("Code Owl "));
	console.log( "%2d%21%24%25%5e%26%2a%28%29%5f%2b%7c%7e%3d%60%7b%7d%5b%5d%3a%22%3b%27%3c%3e%3f%2c%2e%40%2f" == ConvertNameToLink("-!$%^&*()_+|~=`{}[]:\";'<>?,.@/"));
	console.log("%2d" == ConvertNameToLink("-"));
	console.log("%21" == ConvertNameToLink("!"));
	console.log("%24" == ConvertNameToLink("$"));
	console.log("%25" == ConvertNameToLink("%"));
	console.log("%5e" == ConvertNameToLink("^"));
	console.log("%26" == ConvertNameToLink("&"));
	console.log("%2a" == ConvertNameToLink("*"));
	console.log("%28" == ConvertNameToLink("("));
	console.log("%29" == ConvertNameToLink(")"));
	console.log("%5f" == ConvertNameToLink("_"));
	console.log("%2b" == ConvertNameToLink("+"));
	console.log("%7c" == ConvertNameToLink("|"));
	console.log("%7e" == ConvertNameToLink("~"));
	console.log("%3d" == ConvertNameToLink("="));
	console.log("%60" == ConvertNameToLink("`"));
	console.log("%7b" == ConvertNameToLink("{"));
	console.log("%7d" == ConvertNameToLink("}"));
	console.log("%5b" == ConvertNameToLink("["));
	console.log("%5d" == ConvertNameToLink("]"));
	console.log("%3a" == ConvertNameToLink(":"));
	console.log("%22" == ConvertNameToLink("\""));
	console.log("%3b" == ConvertNameToLink(";"));
	console.log("%27" == ConvertNameToLink("'"));
	console.log("%3c" == ConvertNameToLink("<"));
	console.log("%3e" == ConvertNameToLink(">"));
	console.log("%3f" == ConvertNameToLink("?"));
	console.log("%2c" == ConvertNameToLink(","));
	console.log("%2e" == ConvertNameToLink("."));
	console.log("%40" == ConvertNameToLink("@"));
	console.log("%2f" == ConvertNameToLink("/"));
}
function UnitTestConvertLinkToName() {
	console.log("Sam" == ConvertLinkToName("Sam"));
	console.log("Code Owl" == ConvertLinkToName("Code+Owl"));
	console.log("-!$%^&*()_+|~=`{}[]:\";'<>?,.@/"== ConvertLinkToName("%2d%21%24%25%5e%26%2a%28%29%5f%2b%7c%7e%3d%60%7b%7d%5b%5d%3a%22%3b%27%3c%3e%3f%2c%2e%40%2f"));
	console.log("-" == ConvertLinkToName("%2d"));
	console.log("!" == ConvertLinkToName("%21"));
	console.log("$" == ConvertLinkToName("%24"));
	console.log("%" == ConvertLinkToName("%25"));
	console.log("^" == ConvertLinkToName("%5e"));
	console.log("&" == ConvertLinkToName("%26"));
	console.log("*" == ConvertLinkToName("%2a"));
	console.log("(" == ConvertLinkToName("%28"));
	console.log(")" == ConvertLinkToName("%29"));
	console.log("_" == ConvertLinkToName("%5f"));
	console.log("+" == ConvertLinkToName("%2b"));
	console.log("|" == ConvertLinkToName("%7c"));
	console.log("~" == ConvertLinkToName("%7e"));
	console.log("=" == ConvertLinkToName("%3d"));
	console.log("`" == ConvertLinkToName("%60"));
	console.log("{" == ConvertLinkToName("%7b"));
	console.log("}" == ConvertLinkToName("%7d"));
	console.log("[" == ConvertLinkToName("%5b"));
	console.log("]" == ConvertLinkToName("%5d"));
	console.log(":" == ConvertLinkToName("%3a"));
	console.log("\"" == ConvertLinkToName("%22"));
	console.log(";" == ConvertLinkToName("%3b"));
	console.log("'" == ConvertLinkToName("%27"));
	console.log("<" == ConvertLinkToName("%3c"));
	console.log(">" == ConvertLinkToName("%3e"));
	console.log("?" == ConvertLinkToName("%3f"));
	console.log("," == ConvertLinkToName("%2c"));
	console.log("." == ConvertLinkToName("%2e"));
	console.log("@" == ConvertLinkToName("%40"));
	console.log("/" == ConvertLinkToName("%2f"));
}
