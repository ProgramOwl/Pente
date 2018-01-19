var slider = document.getElementById("slider");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}

//Radio Listeners
function gameTypeChosen() {
	document.getElementById("gameType_PvP").onclick = function () {//make second text box visible	
		document.getElementById("player2").style.display = "block";
	};
	document.getElementById("gameType_PvC").onclick = function () {//make second text box invisible	
		document.getElementById("player2").style.display = "none";
	};
	document.getElementById("player2").style.display = "none";
	if (document.getElementById("gameType_PvP").checked) {
		document.getElementById("player2").style.display = "block";
	}
}

//variables
var name1, name2, isPvP, linkS;

//Checks
function isNameValid(name) {
	var isValid = false,
		regex = /\S/;
	//check name is neither null nor just white space
	if (name) {
		if (regex.test(name)) {
			isValid = true;
		}
	}
	//console.log(name+": "+isValid);
	return isValid;
}

//Conversions
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

//Process
function onSubmit() {
    name1 = document.getElementById("player1Name").value;
    name2 = "Computer";
	isPvP = document.getElementById("gameType_PvP").checked;
    linkAddress = "?c=" + (isPvP ? "f" : "t");
	name1 = (isNameValid(name1)) ? name1 : "Player 1";
	
    if (isPvP) {
	    name2 = document.getElementById("player2Name").value;
		name2 = (isNameValid(name2)) ? name2 : "Player 2";
    }
	
    linkAddress = linkAddress + "&p1=" + ConvertNameToLink(name1) + "&p2=" + ConvertNameToLink(name2);
	window.location = "pente.html" + linkAddress;
	return false;
}

window.addEventListener("onload", gameTypeChosen());