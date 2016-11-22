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

    var errorsArray = [
        {
            "index": 1,
            "html_file": "page-zero.html",
            "JS_file": "javascript-zero.js",
            "message": "Unexpected Weirdness"
        },
        {
            "index": 2,
            "html_file": "page-other.html",
            "JS_file": "javascript-other.js",
            "message": "Other Weirdness"
        }
    ];


    var displayErrorsHere = document.getElementById("displayErrorsHere");
    var displayWebPages = document.getElementById("displayWebPagesHere");
    var displayJS = document.getElementById("displayJSFilesHere");

    function sampleErrorCreation() {
//        console.log("The sample error tables has been created");

        /*
            This function creates a sample error array (ErrorsArray) and then creates a table on the html page to display
            those errors.  This will be used to collect the errors and display them on the main testing page.
         */

        var headerContent = ['Item','HTML File','Javascript File','Error Message'];
        var headerData = [errorsArray.index, errorsArray.html_file, errorsArray.JS_file, errorsArray.message];
        var errorsTable = document.createElement('table'),
            header = errorsTable.createTHead(),
            row,
            cell;

        errorsTable.border = 1;
        errorsTable.width = "90%";
        errorsTable.style.borderCollapse="collapse";

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
        wrapper.appendChild(errorsTable);

        for (var errors = 0; errors < errorsArray.length; errors++) {

            var tableData = [errorsArray[errors].index, errorsArray[errors].html_file, errorsArray[errors].JS_file, errorsArray[errors].message];
            var tableBody = errorsTable.appendChild(document.createElement('tBody')),
                row,
                cell;

            // construct data row
            row = tableBody.insertRow(0);
            var i = 0,
                len = tableData.length;
            for (i; i < len; i++) {
                cell = row.insertCell(i);
                cell.innerHTML = tableData[i];
            }

            // add table element to the dom tree
            var wrapper = document.getElementById('displayErrorsHere');
            wrapper.appendChild(errorsTable);
        }
    }

    function scriptError(page) {
        console.error ('This error is thrown when an IFrame cannot be loaded.  Page data ' + page);
        // displayErrorsHere.innerHTML += (page + " has produced an error. <br />");
        var currentIndexNumber = errorsArray.index + 1;
        var current_html_file = page;
        var current_JS_file = "don't know this yet";
        var current_message = "don't know this yet";

        errorsArray.push({"index": currentIndexNumber, "html_file": page, "JS_file": "Don't know this yet", "current_message": "Don't know this yet"});

        sampleErrorCreation();

    }

    function iFrame(page, individualPage) {

//        console.log("iFrame fired with the variable " + page);
        // draws the iFrame on the page

        var iFrame = document.createElement('iframe');
        iFrame.src = page;
        iFrame.id = "iFrame-element-" + individualPage;
        iFrame.className = "views";
        iFrame.sandbox="allow-same-origin allow-forms allow-scripts";
        iFrame.onerror = scriptError(page);
        console.log("iFrame ID is: " + iFrame.id);

        var FrameElements = window.frames[0];
        console.log(FrameElements);

        // http://javascript.info/tutorial/frames-and-iframes

        displayWebPages.appendChild(iFrame);
    }

    function delay(ms) {
        var cur_d = new Date();
        var cur_ticks = cur_d.getTime();
        var ms_passed = 0;
        while(ms_passed < ms) {
            var d = new Date();  // Possible memory leak?
            var ticks = d.getTime();
            ms_passed = ticks - cur_ticks;
            // d = null;  // Prevent memory leak?
        }
    }

    function drawPage() {
        var individualPage = 0;

        for (individualPage; individualPage < testingPagesArray.length; individualPage++) {
  //          console.log("Loop count: " + individualPage);

            var page = testingPagesArray[individualPage];
            iFrame(page, individualPage);
            delay(300);
            console.log("Web page IFrame: " + page + "created." + Date.now() );
        }
    }

    function showHide() {
        //  This is working but isn't too important yet.  Leaving this here for future use.  27Jun2015

        // assign function to onclick property of checkbox
        var hideViews = document.getElementById("showHideViewsCheckBox");
        if (hideViews.checked) {
            // if checked ...
            //change the button to display - views are hidden
//            document.getElementsByClassName('views').style.display = 'none';
            document.getElementById("displayWebPagesHere").style.display = 'none';
        } else {
            // if not checked ...
//            document.getElementsByClassName('views').style.display = 'block';
            document.getElementById("displayWebPagesHere").style.display = 'block';
        }
    }

    window.onload = function () {
        document.getElementById('showHideViewsCheckBox').addEventListener ("click", showHide(), false);
        sampleErrorCreation();
        drawPage();
    }
})();
