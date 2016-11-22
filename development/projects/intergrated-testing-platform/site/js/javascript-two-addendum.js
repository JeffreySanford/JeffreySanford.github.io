(function() {
    var container = document.getElementById("main-content");
    container.innerHTML += "Do something spectacular from the javascript-two-adendum file. <br />";
    container.innerHTML += "now throw an error and this file should not be seen.";
    container.innerHTML += "You hosed something up!!!
}());