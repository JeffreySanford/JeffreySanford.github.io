/* getall function for connecting to MongoDB database */

function getAll() {
        var MongoClient = require('mongodb').MongoClient;
        var recordObject = {};
        var currentRecordsArray = [];
        MongoClient.connect('mongodb://localhost:27017/surveys', function (err, db) {

            if (err) {
                console.error("Could not connect to the database!" + err);
            } else {

                var cursor = db.collection('responses').find();

                cursor.each(function (err, doc) {

        //            assert.equal(err, null);

                    if (doc !== null) {
                        // pull the individual record from the response
                        recordObject.name = doc.name;
                        recordObject.email = doc.email;
                        recordObject.comments = doc.comments;

                        // add another record to the complete current Records
                        currentRecordsArray.push(recordObject);
                        console.log(recordObject);
                        console.log(currentRecordsArray);

                    } else {

                        console.log("end of record set!");
                    } // end if doc null clause
                });  // end cursor loop
            } // end database connect trap
        }); //  collection complete -- render the view with the records
        return currentRecordsArray;
    }