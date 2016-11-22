(function () {
    "use strict";

    /*
     Setup an array of the pages to be tested.  These webpage need to be on the same server
     right now.  If not, setup  Cross-Origin Resource Sharing (CORS) to access securely across
     other servers.
     */

    var base = "../../site/";
    var testingPagesArray = [
        base + 'page-one.html',
        base + 'page-two.html',
        base + 'page-three.html',
        base + 'page-four.html',
        base + 'page-error.html'
    ];

    var displayWebPages = document.getElementById("displayWebPagesHere");
    var displayJS = document.getElementById("displayJSFilesHere");

    function sampleErrorCreation() {
        var errorsArray = [
            {
                "index": 1,
                "html_file": "page-zero.html",
                "JS_file": "javascript-zero.js",
                "Error": "Unexpected Weirdness"
            }
        ];
        for (var errors = 0; errors < errorsArray.length; errors++) {
            displayErrorsHere.createElement("tr");
            displayErrorsHere.createElement("td").innerHTML = errorsArray[errors];

            var headerContent = ['Item','HTML File','Javascript File', 'Error Message'];
            var headerData = [errors.index, errors.html, errors.js, errors.message];
            var table = document.createElement('table'),
                header = table.createTHead(),
                row,
                cell;

            table.border = 1;
            table.style.borderCollapse="collapse";

            // construct header
            row = header.insertRow(0);
            var i = 0,
                len = headerContent.length;
            for (i; i < len; i++) {
                cell = row.insertCell(i);
                cell.innerHTML = headerContent[i];
            }

            // add table element to the dom tree
            var wrapper = document.getElementById('displayErrorsHere');
            wrapper.appendChild(table);
        }
    }

    function scriptError(page) {
        console.log ("This error is thrown when an IFrame cannot be loaded.");
        displayErrorsHere.innerHTML += (page + " has produced an error.");
    }

    function iFrame(page) {
        console.log("iFrame fired with the varilable " + page);
    // draws the iFrame on the page

        var iframe = document.createElement('iframe');
        iframe.src = page;
        iframe.id = "webPage" + individualPage;
        iframe.onerror = scriptError(page);
        console.log("iFrame ID is: " + iframe.id);
        // replace myIFrame with your iFrame id
        // replace myIFrameElemId with your iFrame's element id
        // you can work on document.frames['myIFrame'].document like you are working on
        // normal document object in JS

        // window.frames['myIFrame'].document.getElementById('myIFrameElemId')
        // var iFrameElement = window.frames[iframe.id].document.getElementById('title');
        // displayJS.innerHTML += iFrameElement;


        displayWebPages.appendChild(iframe);
    }

    function drawPage() {
        var individualPage = 0;

        for (individualPage; individualPage < testingPagesArray.length; individualPage++) {
            /*
             create an array for the websites
             using this loop, fill the array with the URL from testingPagesArray[] creating an object

             iFrameCreation(testingPagesArray(individualPage))

             webpageArray = [  // the model
             {
             url:        http://local/site/page-one.html,
             title:      Webpage One,
             scripts:    {javascript-one.js, javascript-one-plus.js},
             onerror:    webpageError();

             }
             ];

             when it returns, test with:

             console.log(webpageArray.title);
             */
            console.log("Loop count: " + individualPage);
            setTimeout(function() {console.log("Waiting...")}, 3000);
            console.log("Webpage: " + testingPagesArray[individualPage]);

            var page = testingPagesArray[individualPage];
            iFrame(page);
        }
    }
}
}


    window.onload = function () {

})();
