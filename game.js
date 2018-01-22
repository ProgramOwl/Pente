var canvas = document.getElementById('our_canvas'),
	ctx = canvas.getContext('2d'),
	Height = canvas.height,
	Width = canvas.width;
var bs = 19, bss = 20,
	turnTwo = true,
	ClockActive, gameOver= false,
	isPlayerVsComputer = false,
	player1Name = "Player 1",
	player1Captures = 0,
	player2Name = "Player 2",
	player2Captures = 0,
	isPlayer1Turn = true,
	boardStateArray;// = [[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   
					   //[0,0,0,0,0, 0,0,0,0, 1, 0,0,0,0, 0,0,0,0,0],
					   
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   //[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0]];

//Timer//done
function Clock(){
    //console.log("Clock called");
    var clockInt;
    var cl = document.getElementById("turn_clock");
    var countSec = 0;
    function countTimer(){ 
        countSec++;
        cl.innerHTML =('Time Left: ' + (21-countSec) + ' secs');
        if(countSec> 20){
			Turnswap();
        //cl.innerHTML =('Timer: Timed Out');
        }
    }
    this.startTiming= function(){
        //console.log("Clock start called");
        clockInt = setInterval(countTimer, 1000);
    }
	this.restartTiming= function(){
        //console.log("Clock start called");
        clearInterval(clockInt);
		countSec=0;
        clockInt = setInterval(countTimer, 1000);
    }
    this.stopTiming= function(){
        clearInterval(clockInt);
        console.log(countSec);
        document.getElementById("turn_clock").innerHTML =('Time Left: none');
        countSec=0;
    }
};

//board//done
function CreateBoardArray(){
	boardStateArray = [bs];
	for(var y=0; y<bss; y++){
		boardStateArray[y] = [bs];
		for(var x=0; x<bss; x++){
			boardStateArray[y][x]=0;
		}
	}
	boardStateArray[(bss/2)-1][(bss/2)-1] = 1;
	PlaceToken(bss/2,bss/2,1);
}
function CreateGameBoard(){
		ctx.rect(canvas.width/bss, canvas.height/bss, canvas.width-(canvas.width/(bss/2)), canvas.height-(canvas.height/(bss/2)));
		ctx.fillStyle = '#CD8646';
      ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#46444C";
		
	var x = (Width/bss),
		y = (Height/bss);
	//vertical lines	
    ctx.beginPath();
    ctx.moveTo(x, y);
	for(var i = 0; i< bs; i++){
    	ctx.moveTo(x, y);
		ctx.lineTo(x, Height-(Height/bss));
		x = x + (Width/bss);
	}
    ctx.closePath();
    ctx.stroke();

	x = (Width/bss);
	y = (Height/bss);
	//horizontal lines	
    ctx.beginPath();
    ctx.moveTo(x, y);
	for(var i = 0; i< bs; i++){
    	ctx.moveTo(x, y);
		ctx.lineTo(Width-(Width/bss), y);
		y = y + (Height/bss);
	}
    ctx.closePath();
    ctx.stroke();
}
//Tokens//done
function PlaceExistingTokens(){
		for(var y = 0; y < bss; y++){
			for(var x = 0; x < bss; x++){
				if(boardStateArray[y][x]!==0){
					PlaceToken(x,y,boardStateArray[y][x]);
				}
			}
		}
	}
//mouse click//done
function MouseClickValidation(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);  
	x = Math.floor(((x/Width)*bss)+0.5);
	y = Math.floor(((y/Height)*bss)+0.5);
	console.log("x: " + x + " y: " + y);
	if(x > 0 && y > 0 && x < bss && y < bss){
		//check if array at index is == 0
		if(boardStateArray[y-1][x-1]===0){
			if(turnTwo && player1Turn){
				if(y<((bss/2)-3) || y>((bss/2)+3)||((y>((bss/2)-3)&&y<((bss/2)+3))&&(x<((bss/2)-3)||x>((bss/2)+3)))){
					boardStateArray[y-1][x-1] = (isPlayer1Turn)? 1: 2;
					PlaceToken(x,y,boardStateArray[y-1][x-1]);
					//game state check
					RunChecks(x-1, y-1);
					
					Turnswap();
					turnTwo=false;
				}
			} else {
				boardStateArray[y-1][x-1] = (isPlayer1Turn)? 1: 2;
				PlaceToken(x,y,boardStateArray[y-1][x-1]);
				//game state check
				RunChecks(x, y);

				Turnswap();	
			}
		}
	}
}

function PlaceToken(xAxis,yAxis,color){
	//x,y are center, tokens range out Math.floor((Width/20)*(2/3));
	//Set [y][x] to corresponding color value
	//then check state conditions
	var canvas = document.getElementById('our_canvas');
	var context = canvas.getContext('2d');
	var axisX = Math.floor((Width/bss)*xAxis),
		axisY = Math.floor((Height/bss)*yAxis),
		r = Math.floor((((Width<=Height?Width:Height)/bss)/2)-0.5),
		grd;
	
      context.beginPath();
      context.arc(axisX,  axisY, r, 0, 2 * Math.PI, false);
      context.closePath();

	if (color === 1) { // black token
		grd = context.createRadialGradient(Math.floor(axisX + r/5), Math.floor(axisY + r/5), r, axisX, axisY, Math.floor(r*1.6));
		grd.addColorStop(0, '#222');
		grd.addColorStop(1, '#FFF');		
	} else { // white token
		var grd = context.createRadialGradient( Math.floor(axisX - r/5),  Math.floor(axisY - r/5), r,  axisX,  axisY, Math.floor(r*1.6));
		grd.addColorStop(0, '#FFF');
		grd.addColorStop(1, '#000');
	}
	context.fillStyle = grd;
	context.fill();
}

//work-on
function Turnswap(){
	//if not gameover
	if(!gameOver){
		isPlayer1Turn = !isPlayer1Turn;
		TurnLabel();
		ClockActive.restartTiming();
	}
}
function TurnLabel(){
	var name = isPlayer1Turn? player1Name: player2Name;
	var tempS=name;
	tempS = tempS.replace(/\s{1,}/g, '');
	var lastChar = tempS.substr(tempS.length -1);
	if(lastChar ==='s' || lastChar ==='S'){
		name = name+"'";
	} else{
		name = name+"'s";
	}
	document.getElementById('current_player').innerHTML = name + " Turn";
}
//work-on
function GameOver(){
	//game over
	var name = isPlayer1Turn? player1Name: player2Name;
	document.getElementById('current_player').innerHTML = name + " is the winner!";
	ClockActive.stopTiming();
	
}
function GameOver(playerName){
	//game over
	document.getElementById('current_player').innerHTML = playerName + " is the winner!";
	ClockActive.stopTiming();
}

//checks
function RunChecks(x, y){
	Captures(x, y);
	var rowAmounts = InARowCount(x, y);
	var keepChecking = true;
	keepChecking = FiveInARow(rowAmounts);
	//set text box to empty
	if(keepChecking){
		keepChecking = FourInARow(x,y, rowAmounts);
		if(keepChecking){
			ThreeInARow(x,y, rowAmounts);
		}
	}
}
//add board clear
function Captures(x, y){ //Captures Logic
	var spotVal = boardStateArray[y][x];
	if (x+3<bss && boardStateArray[y][x+1] !== spotVal && array[y][x+2] !== spotVal && array[y][x+3] === spotVal){
		//valid
		boardStateArray[y][x+1] = 0;
		boardStateArray[y][x+2] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if ((x+3<bss &&y+3<bss)&& array[y+1][x+1] !== spotVal  && array[y+2][x+2] !== spotVal && array[y+3][x+3] === spotVal){
		//valid
		boardStateArray[y+1][x+1] = 0;
		boardStateArray[y+2][x+2] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if (y+3<bss && boardStateArray[y+1][x] !== spotVal && boardStateArray[y+2][x] !== spotVal && boardStateArray[y+3][x] == spotVal){
		//valid
		boardStateArray[y+1][x] = 0;
		boardStateArray[y+2][x] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if ((x-3>-1 &&y+3<bss)&& boardStateArray[y+1][x-1] !== spotVal && boardStateArray[y+2][x-2] !== spotVal && boardStateArray[y+3][x-3] === spotVal){
		//valid
		boardStateArray[y+1][x-1] = 0;
		boardStateArray[y+2][x-2] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if (x-3>-1 && boardStateArray[y][x-1] !== spotVal && boardStateArray[y][x-2] !== spotVal && boardStateArray[y][x-3] === spotVal){
		//valid
		boardStateArray[y][x-1] = 0;
		boardStateArray[y][x-2] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if ((x-3>-1 &&y-3>-1)&& boardStateArray[y-1][x-1] !== spotVal && boardStateArray[y-2][x-2] !== spotVal && boardStateArray[y-3][x-3] === spotVal){
		//valid
		boardStateArray[y-1][x-1] = 0;
		boardStateArray[y-2][x-2] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if (y-3>-1 && boardStateArray[y-1][x] !== spotVal && boardStateArray[y-2][x] !== spotVal && boardStateArray[y-3][x] === spotVal){
		//valid
		boardStateArray[y-1][x] = 0;
		boardStateArray[y-2][x] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	if ((x+3<bss &&y-3>-1)&& boardStateArray[y-1][x+1] !== spotVal && boardStateArray[y-2][x+2] !== spotVal && boardStateArray[y-3][x+3] === spotVal){
		//valid
		boardStateArray[y-1][x+1] = 0;
		boardStateArray[y-2][x+2] = 0;
		if(spotVal === 1){
			player1Captures=player1Captures+2;
		}
		if(spotVal === 2){
			player2Captures=player2Captures+2;
		}
	}
	//clear canvas
	canvas.clearRect(0, 0, canvas.width, canvas.height);
	//refill board
	CreateGameBoard();
	PlaceExistingTokens();
	
	//game over
	if(player1Capture >= 10){
		GameOver(player1Name);
	}else if(player2Capture >= 10){
		GameOver(player2Name);
	}
}

function InARowCount(x, y){
	//Five in a row
	var amountOnRow = [[0,0,0], [0,0,0], [0,0,0], [0,0,0]];
	//horizontal
	var count = 1;
	while(count<5){
		if(x+count<bss && array[y][x+count] === array[y][x]){
			amountOnRow[0][0]+=1;
			count+=1;
		} else {
			amountOnRow[0][1] = count-1;
			count=6;
		}
	}
	count = 1;
	while(count<5){
		if(x-count>-1 && array[y][x-count] === array[y][x]){
			amountOnRow[0][0]+=1;
			count+=1;
		} else {
			amountOnRow[0][2] = count-1;
			count=6;
		}
	}
	//vertical
	count = 1;
	while(count<5){
		if(y+count<bss && array[y+count][x] === array[y][x]){
			amountOnRow[1][0]+=1;
			count+=1;
		} else {
			amountOnRow[1][1] = count-1;
			count=6;
		}
	}
	count = 1;
	while(count<5){
		if(y-count>-1 && array[y-count][x] === array[y][x]){
			amountOnRow[1][0]+=1;
			count+=1;
		} else {
			amountOnRow[1][2] = count-1;
			count=6;
		}
	}
	//Diagonal up
	count = 1;
	while(count<5){
		if((x+count<bss &&y-count>-1) && array[y-count][x+count] === array[y][x]){
			amountOnRow[2][0]+=1;
			count+=1;
		} else {
			amountOnRow[2][1] = count-1;
			count=6;
		}
	}
	count = 1;
	while(count<5){
		if((x-count>-1 && y+count<bss) && array[y+count][x-count] === array[y][x]){
			amountOnRow[2][0]+=1;
			count+=1;
		} else {
			amountOnRow[2][2] = count-1;
			count=6;
		}
	}
	//Diagonal down
	count = 1;
	while(count<5){
		if((y+count<bss &&x-count>-1) && array[y+count][x-count] ===array[y][x]){
			amountOnRow[3][0]+=1;
			count+=1;
		} else {
			amountOnRow[3][1] = count-1;
			count=6;
		}
	}
	count = 1;
	while(count<5){
		if((y-count>-1 && x+count<bss) && array[y-count][x+count] ===array[y][x]){
			amountOnRow[3][0]+=1;
			count+=1;
		} else {
			amountOnRow[3][2] = count-1;
			count=6;
		}
	}
	return amountOnRow;
}

function FiveInARow(amountOnRow){
	if(amountOnRow[0]===5||amountOnRow[1]===5||amountOnRow[2]===5||amountOnRow[3]===5){
		GameOver();
		return false;
	} else {
		return true;
	}
}
//finish etiquette logic
function FourInARow(x, y, amountOnRow){
	if(amountOnRow[0]==4){
		//check to left and right
	}else if(amountOnRow[1]==4){
	}else if(amountOnRow[2]==4){
	}else if(amountOnRow[3]==4){
	}
}
function ThreeInARow(x, y, amountOnRow){
	if(amountOnRow[0]==3){

	}else if(amountOnRow[1]==3){
	}else if(amountOnRow[2]==3){
	}else if(amountOnRow[3]==3){
	}
}

//Conversions//done
function ConvertLinkToName(link) {
	//It returns the symbol from the hex value preceded by a %.
	var tempS = "";
	tempS = link.replace(/[+]{1,}/g, ' ');
	link = tempS.replace(/([%][0-9a-z][0-9a-z])/gi, function (n) {
		return String.fromCharCode(parseInt(n.substring(1), 16));
    });
	//console.log(link);
	return link;
}
function ConvertNameToLink(name) {
	//It returns the symbols hex value preceded by a %.
	var tempS = "";
	// /[^a-z\d\s]/gi or /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.@\/]/gi
	tempS = name.replace(/[^a-z\d\s]/gi, function (n) {
		//return String.fromCharCode(parseInt(n.substring(1), 16));
		return "%" + ((n.charCodeAt(0)).toString(16));
    });
	name = tempS.replace(/\s{1,}/g, '+');
	//console.log(name);
	return name;
}

//make functional//check that read and write to file work
function SaveGame(){
	var filePath = "pente.txt";
	SaveGame(filePath);
}
function SaveGame(filePath){
	//pause/stop clock
	//ClockActive.stopTiming();
	//import System.IO;
	//write to file
	var file = new File(filePath);//new File([""],txtFile);

	file.open("w"); // open file with write access
	transferToUrl
	file.writeln("&player1Name:"+tourl(player1Name));
	file.writeln("&player2Name:"+tourl(player2Name));
	file.writeln("&isPlayer1Turn:"+isPlayer1Turn);
	file.writeln("&isPlayerVsComputer:"+isPlayerVsComputer);
	file.writeln("&player1Captures:"+player1Captures);
	file.writeln("&player2Captures:"+player2Captures);
	file.writeln("&turn2:"+turn2);
	file.writeln("&bs:"+bs);
	file.writeln("&gameOver:"+gameOver);
	file.writeln("&boardStateArray:"+boardStateArray);
	file.close();
	/*
	import System.IO;
	import System;  // Used for getting the date

	function Start () {
		// Create an instance of StreamWriter to write text to a file.
		sw = new StreamWriter("TestFile.txt");
		// Add some text to the file.
		sw.Write("This is the ");
		sw.WriteLine("header for the file.");
		sw.WriteLine("-------------------");
		// Arbitrary objects can also be written to the file.
		sw.Write("The date is: ");
		sw.WriteLine(DateTime.Now);
		sw.Close();
	}
	*/
	//when they return restart timer
	//ClockActive.startTiming();
}
//done
function NewGame(vars){
    //set player 1 & 2's names, change computer bool
	isPlayerVsComputer = (vars.c) ? vars.c === "t" : true;
	player1Name = (vars.p1) ? vars.p1 : "Player 1";
	player2Name = (vars.p2) ? vars.p2 : (isPlayerVsComputer) ? "Computer" : "Player 2";
	console.log(isPlayerVsComputer,player1Name,player2Name);
	
    TurnLabel();
	
	bs = (vars.bs)?parseInt(vars.bs): bs, 
	bss = bs+1;
	
	CreateGameBoard();
	CreateBoardArray();
	
	canvas.addEventListener('mousedown', function(evt) {
		MouseClickValidation(canvas, evt);
	});
	ClockActive.startTiming();
	Turnswap();
}
//work-on
function ReadFromFile(filePath){
	/// read from file
//function ReadFile(filepathIncludingFileName : String) {
 //   sr = new File.OpenText(filepathIncludingFileName);
//var filePath = "pente.txt";
var file = new  File.OpenText(filePath);

file.open("r"); // open file with read access
var str = "";
while (!file.eof) {
	// read each line of text
	str += file.readln() + "\n";
}
file.close();
var vars = {}, count=0
        parts = str.replace(/[&]+([^=&]+)=([^&]*)/gi, function (n, key, value) {
	if(count<2){
value = ConvertLinkToName(value);
count = count+1;
}
            vars[key] = value;
        });
/*
try {
        // Create an instance of StreamReader to read from a file.
        sr = new StreamReader("TestFile.txt");
        // Read and display lines from the file until the end of the file is reached.
        line = sr.ReadLine();
        while (line != null) {
            print(line);
            line = sr.ReadLine();
        }
        sr.Close();
    }
    catch (e) {
        // Let the user know what went wrong.
        print("The file could not be read:");
        print(e.Message);
    }
*/
//vars = str.split('!');
//transferFromUrl
return vars;
}
function LoadGame(filePath){
	var vars = ReadFromFile(filePath);
	//read file
	
	isPlayerVsComputer = vars.isPlayerVsComputer === "true";
	player1Name = vars.player1Name;
	player2Name = vars.player2Name;
	console.log(isPlayerVsComputer, player1Name, player2Name);
	turnTwo = vars.turnTwo;
	gameOver = vars.gameOver === "true";
	isPlayer1Turn = vars.isPlayer1Turn === "true";
	
	boardStateArray = vars.boardStateArray;
	
	bs = (vars.bs)?parseInt(vars.bs): bs;
	bss = bs+1;
	CreateGameBoard();
	PlaceExistingTokens();
	
    if(gameOver){
		GameOver(isPlayer1Turn?player1Name:player2Name);
	} else {
		TurnLabel();
		ClockActive.startTiming();
		canvas.addEventListener('mousedown', function(evt) {
				MouseClickValidation(canvas, evt);
			});	
	}
}

//check for file existance
//Just need to add file name

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
	if (vars.state && vars.state === 'load') {
		LoadGame(vars.fileName);		
	} else {
		NewGame(vars);	
	}
}

window.addEventListener("onload", SetUpGame());
