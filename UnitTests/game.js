//Timer
function UnitTestClock(){
	//creates a clock item
}

//Game Board 
function UnitTestCreateBoardArray(){
	//generates an initial board game array of all 0 and places the first move as a black on center
}

//Players
function UnitTestMouseClickValidation(){//canvas, event
	//gets the mouses current position on the canvas, checks if it is a valid move, if so then it calls ValidTurn(x, y)
}
function UnitTestComputerTurn(){
	//generates a random point and does so untill it finds a valid one, then is calls ValidTurn(x, y)
}

//Switching player
function UnitTestTurnSwap(){
	//resets the clock, swaps players and calls TurnLabel
}

function UnitTestTurnLabel(){//name
	//updates the current turn label text, returns name factor
	//checks if name ends in s such as to properly position ' 
	//Ex.console.log("Sam's" === TurnLabel("Sam"));	
	//Ex.console.log("Owls'" === TurnLabel("Owls"));

}


function UnitTestGameOver(){
	//sets gameOver to true and displays winner
	//check that gameOver is true and that the winner is right, based upon isPlayer1Turn
}

//Checking game conditions
function UnitTestCaptures(){//x, y
	//sets gameOver to true and displays winner
	//(check array after)
}
function UnitTestInARowCount(){//x, y
	//returns Array , i.e. rowAmounts
}
function UnitTestFiveOrMoreInARow(){//rowAmounts
	//returns boolean, and calls GameOver
	//(check game over)
}
function UnitTestFourInARow(){//x,y, rowAmounts
	//returns boolean
} 
function UnitTestThreeInARow(){//x,y, rowAmounts
	//returns boolean
}

//(make documented manual test):
function UnitTestCreateGameBoard(){
	//draws the board, background square and axis lines
}
//Tokens
function UnitTestPlaceExistingTokens(){
	//does just that on the already existing canvas by reading the current boardStateArray
}
function UnitTestPlaceToken(){//x, y, color
	//just places a token on the graph at the given x, y, and selects the token style based on the color value, 1=black, anything else = white
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
