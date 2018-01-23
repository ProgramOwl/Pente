//Checks
function ValidNameTest() {
	console.log("false: ",isNameValid());
	console.log("false: ",isNameValid(""));
	console.log("false: ",isNameValid("	"));
	console.log("false: ",isNameValid("      	  	"));
	console.log("true: ",isNameValid("Sam"));
	console.log("true: ",isNameValid("	Owl George"));
	console.log("true: ",isNameValid("27389&#*@ 4843"));
	console.log("true: ",isNameValid(" Hi! "));
}
function ValidNameToLinkTest() {
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
	
