(function IFEE() {
    'use strict';
    var express = require('express');
    var app = express();
    var routes = require('./routes');

    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/images'));
    app.use(express.static(__dirname + '/stylesheets'));
    app.use(express.static(__dirname + '/javascript'));
    
    app.set('view engine', 'ejs');
    app.set('views', __dirname+'/views'); //  Should not be required -- troublehsooting emplate issue on heroku
    app.set('data', __dirname+'/data'); //  this is the directory I will keep the local json files in.

    app.get('/', routes.index);
    app.get('/user:id', routes.user);
    app.get('/about', routes.about);
    app.get('/products', routes.products);
    app.get('/products:id', routes.products.product);

    app.get('*', function fail(req, res) {
        res.send('bad route found.');
    });


    var server = app.listen(process.env.PORT || 3000, function listenFunct() {
        console.log('Server on port 3000');
    });
}());