(function IFEE() {
    'use strict';

    var express = require('express');
    var routes = require('./routes');
    var bodyParser = require('body-parser');
    var form = require('express-form');
    var field = form.field;

    var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/img'));
    app.use(express.static(__dirname + '/css'));
    app.use(express.static(__dirname + '/js'));

    app.set('view engine', 'ejs');

    //Setting up Mongdo DB
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');

    var url = 'mongodb://heroku:NkL6X5rbM0meZE93wn5hHEE1yc5KDZnsffmOYObWmuBfBDnuDfWsbrs1zGk9DZKuoRw1KcGaf4zxOQ7j7EBVnA@candidate.62.mongolayer.com:10177,candidate.61.mongolayer.com:10488/app45648657';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to mongodb server.");
    db.close();
    });

    app.get('/', routes.index);
    app.post('/form', function (req, res) {
        var realName = req.body.realName;
        var email = req.body.email;
        var inlineRadioReadability = req.body.inlineRadioReadbilty;
        var inlineRadioUsability = req.body.inlineRadioUsability;
        var inlineRadioFunctionality = req.body.inlineRadioFunctionality;
        var commentText = req.body.commentText;

        /* Sanity Checking */
        console.log ("Real Name is currently set to: " + realName);
        console.log ("Email is currently set to: " + email);
        console.log ("Readability: " + inlineRadioReadability);
        console.log ("Usability: " + inlineRadioUsability);
        console.log ("Functionality: " + inlineRadioFunctionality);
        console.log('Comment Text: ' + commentText);
        console.dir(req.body);
    });

    app.listen(8080);
}());