var Height = 600,
	Width = 600,
	isPlayerVsComputer = false,
	player1Name = "Player 1",
	player2Name = "Player 2",
	boardStateArray = [[0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   
					   [0,0,0,0,0, 0,0,0,0, 1, 0,0,0,0, 0,0,0,0,0],
					   
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0],
					   [0,0,0,0,0, 0,0,0,0, 0, 0,0,0,0, 0,0,0,0,0]];

function CreateGameBoard(){
	
	if (document.getElementById('our_canvas')) {
	var canvas = document.getElementById('our_canvas');
	var ctx = canvas.getContext('2d');
	canvas.addEventListener('mousedown', function(evt) {MouseClickValidation(canvas, evt);});
	
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#DDD";
		
	var x = (Width/20),
		y = (Height/20);
	//vertical lines	
    ctx.beginPath();
    ctx.moveTo(x, y);
	for(var i = 0; i< 19; i++){
    	ctx.moveTo(x, y);
		ctx.lineTo(x, Height-(Height/20));
		x = x + (Width/20);
	}
    ctx.closePath();
    ctx.stroke();

	x = (Width/20);
	y = (Height/20);
	//horizontal lines	
    ctx.beginPath();
    ctx.moveTo(x, y);
	for(var i = 0; i< 19; i++){
    	ctx.moveTo(x, y);
		ctx.lineTo(Width-(Width/20), y);
		y = y + (Height/20);
	}
    ctx.closePath();
    ctx.stroke();
	}
	
}
function MouseClickValidation(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);  
	x = Math.floor(((x/Width)*20)+0.5);
	y = Math.floor(((y/Height)*20)+0.5);
	console.log("x: " + x + " y: " + y);
	if(x>0&&y>0&&x<20&&y<20){
		//call next step
		//check if array at index is == 0
	}
}

function PlaceToken(xAxis,yAxis){
	//x,y are center, tokens range out Math.floor((Width/20)*(2/3));
	//Set [y][x] to corresponding color value
	//then check state conditions
}


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
function SetUpGame() {
    //set player 1 & 2's names, change computer bool
	var vars = {},
        parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (n, key, value) {
			value = ConvertLinkToName(value);
            vars[key] = value;
        });
	//console.log("var: ", vars);
	isPlayerVsComputer = (vars.c) ? vars.c === "t" : true;
	player1Name = (vars.p1) ? vars.p1 : "Player 1";
	player2Name = (vars.p2) ? vars.p2 : (isPlayerVsComputer) ? "Computer" : "Player 2";
	console.log(isPlayerVsComputer,player1Name,player2Name);
    document.getElementById('current_player').innerHTML = player1Name + "'s Turn";
	CreateGameBoard();
}

window.addEventListener("onload", SetUpGame());
