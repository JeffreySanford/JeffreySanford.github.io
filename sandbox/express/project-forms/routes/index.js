(function IFEE() {
    'use strict';

    exports.index = function pageLanding(req, res) {
        res.render('template/default', {
            title: 'Landing',
            nextPage: 'Admin Reports',
            nextPageUrl: '/reports',
            data: req.body
        });
    };

    exports.success = function pageSuccess(req, res) {
        var fs = require('fs');
        var q = req.body;
        var objSurvey = {};

        if (q.realName === '') {
            q.realName = "None Supplied";
        }
        objSurvey.name = q.realName;

        if (q.email === '') {
            q.email = 'None Supplied';
        }
        objSurvey.email = q.email;

        if (q.read) {
            objSurvey.read = parseInt(q.read);
        } else {
            objSurvey.read = 0;
        }

        if (q.usage) {
            objSurvey.usage = parseInt(q.usage);
        } else {
            objSurvey.usage = 0;
        }

        if (q.funct) {
            objSurvey.funct = parseInt(q.funct);
        } else {
            objSurvey.funct = 0;
        }

        if (q.commentText === '') {
            q.commentText = "no comments were indicated.";
        }
        objSurvey.comment = q.commentText;
        objSurvey.time = new Date();

        /* Create or Append the objSurvey to the Array Survey on the server */
        var arrayData = [];

        fs.access('data/storage.json', fs.R_OK & fs.W_OK, function (err) {
            if (err) {
                /* exists is false -- creating */

                arrayData.push(objSurvey);
                fs.writeFile("data/storage.json", JSON.stringify(arrayData));
            } else {

                /* exists is true -- appending */
                // Read the file
                arrayData = JSON.parse(fs.readFileSync('data/storage.json'));

                //push obj to array
                arrayData.push(objSurvey);
                fs.unlink("data/storage.json");
                fs.writeFile("data/storage.json", JSON.stringify(arrayData));
            }
        });

        /* Render the information to the success view */
        res.render('template/success', {
            title: "Recorded Survey Record",
            nextPage: 'Home',
            nextPageUrl: '/landing',
            surveyData: objSurvey
        }); // end sucessful-submital render
    };  // end app.get route for getPosts

    exports.reports = function pageSuccess(req, res) {
        var fs = require('fs');
        var storageJson = {};
        var data = 'invalid';

        fs.access('data/storage.json', fs.R_OK & fs.W_OK, function (err) {
            if (err) {
                /* exists is false -- creating */
                storageJson = {null: 'null'};
                data = "";
            } else {
                storageJson = JSON.parse(fs.readFileSync('data/storage.json', 'utf8'));
                data = "valid";
            }

            res.render('template/reports', {
                title: "Survey Reports",
                nextPage: 'Landing',
                nextPageUrl: '/landing',
                surveyData: storageJson,
                data: data
            });
        });
    };
}());