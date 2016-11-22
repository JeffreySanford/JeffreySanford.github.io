(function IFEE() {
    'use strict';

    // Express requires
    var express = require('express');
    var bodyParser = require('body-parser');

    // Express deinitions
    var app = express();
    var routes = require('./routes');

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');  // not required if default views

    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/img'));
    app.use(express.static(__dirname + '/css'));
    app.use(express.static(__dirname + '/js'));
    app.use(express.static(__dirname + '/data'));


    app.get('/', routes.index);
    app.post('/success', routes.success);
    app.get('/reports', routes.reports);
    app.get('/landing', routes.index);
    app.get('*', routes.index);

    /* Local server functions */
    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log('Listening at http://localhost:' + port);

}());