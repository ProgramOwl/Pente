var canvas = document.getElementById('our_canvas'),
	ctx = canvas.getContext('2d'),
	Height = canvas.height,
	Width = canvas.width;
var bs = 19, bss = 20,
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

//Timer
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

//done
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
function PlaceExistingTokens(){
		for(var y = 0; y < bss; y++){
			for(var x = 0; x < bss; x++){
				if(boardStateArray[y][x]!==0){
					PlaceToken(x,y,boardStateArray[y][x]);
				}
			}
		}
	}
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
			boardStateArray[y-1][x-1] = (isPlayer1Turn)? 1: 2;
			PlaceToken(x,y,boardStateArray[y-1][x-1]);
			//game state check
			Turnswap();
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
	isPlayer1Turn = !isPlayer1Turn;
    TurnLabel();
	ClockActive.restartTiming();
}

function TurnLabel(){
	var name = isPlayer1Turn? player1Name: player2Name;
	//check name
	document.getElementById('current_player').innerHTML = name + " Turn";
}

function GameOver(){
	var name = isPlayer1Turn? player1Name: player2Name;
	document.getElementById('current_player').innerHTML = name + " is the winner!";
	
ClockActive.stopTiming();
	
}

//done
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
//empty
function saveGame(){
	//write to file
	//names, PvC, captures, Array
}
//done
function NewGame(vars){
    //set player 1 & 2's names, change computer bool
	isPlayerVsComputer = (vars.c) ? vars.c === "t" : true;
	player1Name = (vars.p1) ? vars.p1 : "Player 1";
	player2Name = (vars.p2) ? vars.p2 : (isPlayerVsComputer) ? "Computer" : "Player 2";
	console.log(isPlayerVsComputer,player1Name,player2Name);
	
    TurnLabel();
	
	canvas = document.getElementById('our_canvas');
	ctx = canvas.getContext('2d');
	Height = canvas.height,
	Width = canvas.width,
	bs = (vars.bs)?parseInt(vars.bs): bs, 
	bss = bs+1;
	
	CreateGameBoard();
	CreateBoardArray();
	
	canvas.addEventListener('mousedown', function(evt) {
		MouseClickValidation(canvas, evt);
	});
	Turnswap();
}
//work-on
function loadGame(){
	var vars = {};
	//read
	
	isPlayerVsComputer = (vars.c) ? vars.c === "t" : true;
	player1Name = (vars.p1) ? vars.p1 : "Player 1";
	player2Name = (vars.p2) ? vars.p2 : (isPlayerVsComputer) ? "Computer" : "Player 2";
	console.log(isPlayerVsComputer, player1Name, player2Name);
    
	TurnLabel();
	
	canvas = document.getElementById('our_canvas');
	ctx = canvas.getContext('2d');
	Height = canvas.height,
	Width = canvas.width,
	boardStateArray = {},
	
	bs = (vars.bs)?parseInt(vars.bs): bs,
	bss = bs+1,
	CreateGameBoard();
	PlaceExistingTokens();
}

//check for file existance
//Just need to add file name
function SetUpGame() {
	ClockActive = new Clock();
	var vars = {},
        parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (n, key, value) {
			value = ConvertLinkToName(value);
            vars[key] = value;
        });
	if (vars.state && vars.state !== 'new') {
		if (vars.state === 'load') {
			canvas.addEventListener('mousedown', function(evt) {
				MouseClickValidation(canvas, evt);
			});		
		}
		
ClockActive.startTiming();
		loadGame();		
	} else {
		
ClockActive.startTiming();
		NewGame(vars);	
	}
}

window.addEventListener("onload", SetUpGame());
