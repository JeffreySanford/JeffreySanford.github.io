function counter() {
	var e = document.getElementById("pageSeconds");
	e.innerHTML = ++n; 
}

window.onload = function() {
	setTimeout(beginAnimate, 5000);
	setInterval(counter, 1000);
	setInterval(changeImage(), 5000);
};