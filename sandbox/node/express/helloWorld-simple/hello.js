(function IFEE() {
    'use strict';
    var http = require('http');
    var myServer = http.createServer(function (request, response) {
        // pass head to client
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<b>Hello</b> World");
        response.end();
    });  //creates server

    myServer.listen(3000);
    console.log("Our server is running at localhost:3000");
}());