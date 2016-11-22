(function () {
    "use strict";

    /*
        Setup an array of the pages to be tested.  These webpage need to be on the same server
        right now.  If not, setup  Cross-Origin Resource Sharing (CORS) to access securely across
        other servers.
     */
    var base = "../site/";
    var testingPagesArray = [
        base + 'page-one.html',
        base + 'page-two.html',
        base + 'page-three.html',
        base + 'page-four.html'
    ];

    var displayWebPages = document.getElementById("displayWebPagesHere");
    var displayJS = document.getElementById("displayJSFilesHere");

    function scriptError() {
        console.log ("DANGER WILL ROBINSON! DANGER!  ERROR THROWN!");
    }


    function iFrame() {
    // draws the iFrame on the page

        for (var webPage=0; webPage<testingPagesArray.length; webPage++) {
            var iframe = document.createElement('iframe');
            iframe.src = testingPagesArray[webPage];
            iframe.onError = iframe.onerror = scriptError;
            displayWebPages.appendChild(iframe);
        }
    }

    function consoleLogger () {
        var old = console.log;
        var logger = document.getElementById('displayJS');
        console.log = function (message) {
            if (typeof message == 'object') {
                logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
            } else {
                logger.innerHTML += message + '<br />';
            }
        };
    }

    function webpageObjects() {
    //  request the webpage
        var reqHTML = new  XMLHttpRequest();
        var individualPage = 0;

        for (individualPage; individualPage < testingPagesArray.length; individualPage++) {
            console.log("individual page iteration: " + (individualPage + 1 ));
            /*
                Target the individual webpages using SYNCronous access.  This should probably be
                switched over to ASYNC for proper practice.
             */
            reqHTML.onreadystatechange = function() {
                console.log("Request state response:  " + reqHTML.readyState);  // This will current return 1 and 4, request and success.

                if (reqHTML.readyState === 4 && reqHTML.status === 200) {
                    var webPage = reqHTML.responseText;  //This is returning the entire webpage as an object.

                    // Detect title of Web Page
                    var selectionTitle = /<title\b[^>]*>([\s\S]*?)<\/title>/gm;
                    var webPageTitles;
                    while (webPageTitles = selectionTitle.exec(webPage)) {
                        // full match is in match[0], whereas captured groups are in ...[1], ...[2], etc.
                        console.log("Web Page Title: " + webPageTitles[1]);
                        displayJS.innerHTML += "Web Page Title: " + webPageTitles[1] + "<br />";
                    }

                    // Detect inline Javascript
                    var selectionJS = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
                    var javascriptFiles;
                    while (javascriptFiles = selectionJS.exec(webPage)) {
                        if (javascriptFiles[1] != "" ) {
                            // full match is in match[0], whereas captured groups are in ...[1], ...[2], etc.
                            console.log("inline javascript response: " + javascriptFiles[1]);
                            displayJS.innerHTML += "Inline Javascript File: " + javascriptFiles[1] + "<br />";
                        }
                        console.log ("Javascript files:  " + javascriptFiles[0] + "<br />");
                        displayJS.innerHTML += 'All JS files:' + javascriptFiles[0] + '<br />';
                    }

                    var scripts = document.getElementsByTagName('script');
                    console.log(scripts);
                    
                    for (var i=0; i < scripts.length; i++) {
                        if (scripts[i].src != "http://local.adfender.com/adfender/elemhide.js" && scripts[i].src != "http://localhost:8080/Combination/js/javascript.js" ) {
                            console.log(scripts[i].src);
                            displayJS.innerHTML += scripts[i].src  + "<br />";
                        }
                    }
                }
            };  // onreadystatechange function
        } //end for loop

            /*
              [0] Is the main javascript file and should be over looked perhaps with
              a qualifier if (javascript.src != ".../javascript.js"){  //do }

              [1] In page-two.html, there is inline javascript file, it is returned
              in this object with a src=""

              [2] Normal javascript files will be listed as
              object.src: "../Combination/js/javascript-two.js"
             */

        reqHTML.open("GET", testingPagesArray[individualPage - 1], false);
        reqHTML.send();
    };
    window.onload = function () {
        iFrame ();
        webpageObjects();
        consoleLogger();
    };
}());
