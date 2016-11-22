(function IFEE() {
    'use strict';
    var express = require('express');
    var app = express();
    var routes = require('./routes');

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');  // not required if default views

    app.get('/', routes.index);
    app.get('/about', routes.about);

    app.get('*', function fail(req, res) {
        res.send('bad route found.');
    });

    var server = app.listen(3000, function listenFunct() {
        console.log('Server on port 3000');
    });
}());