var firstWords = ['Who', 'do', 'you', 'think', 'pays', 'for', 'this', 'site', '?????'];
var answers = ['Santa Claus', 'John Galt', 'The Free Masons', 'The Illuminati', 'Gold sales from Nibiru'];
var secondWords = ['Please', 'consider donating', 'today', 'http:clickable.donate.link', 'Thanks', 'You will now be directed to the website'];
var targetContentFirst = document.getElementById("targetContentFirst");
var targetContentAnswers = document.getElementById("targetContentAnswers");
var targetContentSecond = document.getElementById("targetContentSecond");


function sleep(milliseconds) {
  var wait = 0;
  var start = new Date().getTime();
  for (wait; wait < 1e7; wait++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function showFirstWords() {
  var i = 0;
  for (i; i < firstWords.length; i++) {
    sleep(1000);
    targetContentFirst.innerHTML += " " + firstWords[i];
    console.log('Item ' + i + ' is currently set to ' + firstWords[i]);
  }
}

function showAnswers() {
  var i = 0;
  for (i; i < answers.length; i++) {
    sleep(500);
    targetContentAnswers.innerHTML = " " + answers[i];
    console.log('Item ' + i + ' is currently set to ' + answers[i]);
  }
}

function showSecondWords() {
  var i = 0;
  for (i; i < secondWords.length; i++) {
    sleep(250);
    targetContentSecond.innerHTML = " " + secondWords[i];
    console.log('Item ' + i + ' is currently set to ' + secondWords[i]);
  }
}

function display() {
  // x functionality when window loads
  targetContentFirst.innerHTML = "";
  showFirstWords();
  console.log("do something after first");
  sleep(5000);
  showAnswers();
  sleep(5000);
  showSecondWords();
}

document.getElementById("continueButton").onclick = function () {
 // location.href = "index.html";
  console.log("buton clicked");
};

/*
window.onload = function () {
  display;
};
 */