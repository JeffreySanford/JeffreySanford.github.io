// Math Functions

function setNumOneValue(){
	var numOne = document.getElementById("firstNumber").value;
	if (numOne) {
		document.getElementById('firstNumber').style.border = '2px solid green';
		console.log(numOne);
		return numOne;
	} else {
		// no number set for number one
		document.getElementById('firstNumber').style.border = '2px solid red';
		document.getElementById("firstNumber").focus();
		console.log ('Number One is not set');
	}
}

function setNumTwoValue(){
	var numTwo = document.getElementById("secondNumber").value;
	if (numTwo) {
		document.getElementById('secondNumber').style.border = '2px solid green';
		console.log(numTwo);
		return numTwo;
	} else {
		// Number Two is not set
		document.getElementById('secondNumber').style.border = '2px solid red';
		document.getElementById("secondNumber").focus();
		console.log ('Number Two is not set');
	}
}

function addNumbers() {
	console.log("clicked");
	var numOne = setNumOneValue();
	var numTwo = setNumTwoValue();
	console.log('Numbers are: ' + numOne + 'and ' + numTwo +'.');
	var sum =  (parseFloat(numOne)+parseFloat(numTwo));
	console.log('Sum is: ' + sum);
	document.getElementById("sum").innerHTML = sum;
}


function subtractNumbers() {
	console.log("clicked");
	var numOne = setNumOneValue();
	var numTwo = setNumTwoValue();
	console.log('Numbers are: ' + numOne + 'and ' + numTwo +'.');
	var sum =  (parseFloat(numOne)-parseFloat(numTwo));
	console.log('Sum is: ' + sum);
	document.getElementById("sum").innerHTML = sum;
}

function multiplyNumbers() {
	console.log("clicked");
	var numOne = setNumOneValue();
	var numTwo = setNumTwoValue();
	console.log('Numbers are: ' + numOne + 'and ' + numTwo +'.');
	var sum =  (parseFloat(numOne)*parseFloat(numTwo));
	console.log('Sum is: ' + sum);
	document.getElementById("sum").innerHTML = sum;
}

function divideNumbers() {
	console.log("clicked");
	var numOne = setNumOneValue();
	var numTwo = setNumTwoValue();
	console.log('Numbers are: ' + numOne + 'and ' + numTwo +'.');
	var sum =  (parseFloat(numOne)/parseFloat(numTwo));
	console.log('Sum is: ' + sum);
	document.getElementById("sum").innerHTML = sum;
}