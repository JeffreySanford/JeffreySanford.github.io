// Animate Box

var joinCurrentPos;
joinCurrentPos = 0;
var joinIntervalHandle;
joinIntervalHandle = 0;
var n = 0;
var x = 0;



function beginAnimate() {
	// Change the spacer from display: none to display: block
	
	document.getElementById("spacer").style.transition = "2000";
	document.getElementById("spacer").style.display = "block";
	document.getElementById("join").style.position = "absolute";
	document.getElementById("join").style.left = "0px";
	document.getElementById("join").style.top = "100px";
	document.getElementById("join").style.backgroundColor = "white";
	document.getElementById("join").style.boxShadow = "5px 5px 5px grey";
	//  Cause the animateBox function to be called
	intervalHandle = setInterval(animateBox, 20);
}

function animateBox() {
	//	set a new position
	joinCurrentPos +=1;
	document.getElementById("join").style.left = joinCurrentPos + "px";
	document.getElementById("join").style.marginTop = "0px";
	//	checks to make sure that it doesn't float off the screen
	if (joinCurrentPos > (window.innerWidth - 380)) {
		//	clear the intervalHandle
		clearInterval(intervalHandle);
		//reset custom inline style
		document.getElementById("join").style.position = "";
		document.getElementById("join").style.left= "";
		document.getElementById("join").style.top = "";
		// Hide the spacer from display: none to display: block	
		document.getElementById("spacer").style.display = "none";
		//Restyle the join box
		document.getElementById("join").style.marginTop = "20px";
		document.getElementById("join").style.backgroundColor = "";
		document.getElementById("join").style.boxShadow = "";
	}
}
