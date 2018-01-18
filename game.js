var Height = 20 * 14,
	Width = 20 * 14,
	isPlayerVsComputer = false,
	player1Name = "Player 1",
	player2Name = "Player 2";

function CreateGameBoard(){
	
	if (document.getElementById('our_canvas')) {
	var canvas = document.getElementById('our_canvas');
	var ctx = canvas.getContext('2d');
	
	var x = 5,
		y = 5;
	//vertical lines	
    ctx.beginPath();
    ctx.moveTo(	x+5, y);
	for(var i = 0; i< 20; i++){
		ctx.lineTo(x+5, (Height-y));
		x = x + 14;
		ctx.moveTo(x, y);
	}
    ctx.closePath();
    ctx.stroke();

	x = 5;
	y = 5;
	//horizontal lines	
    ctx.beginPath();
    ctx.moveTo(	x, y+5);
	for(var i = 0; i< 20; i++){
		ctx.lineTo((Width-x), y+5);
		y = y + 14;
		ctx.moveTo(x, y);
	}
    ctx.closePath();
    ctx.stroke();
	}
}
function MouseClickValidation(){
	
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
    document.getElementById('lblTurn').innerHTML = player1Name + "'s Turn";
    //document.getElementById('btnEndTurn').disabled = true;
}

SetUpGame();
