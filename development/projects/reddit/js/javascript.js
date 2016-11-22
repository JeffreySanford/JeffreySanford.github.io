/*global window */
(function () {
    'use strict';

    function getArticles(queryLength) {
        var json = "https://www.reddit.com/r/Angular2/.json?limit=" + (queryLength);
        var req = new XMLHttpRequest();
        var articles;

        req.onreadystatechange = function (evt) {

            if (req.readyState === 4 && req.status === 200) {

                var res = JSON.parse(req.responseText);
                articles = res.data.children;
                createContent(articles, queryLength);

            } else if (req.status === 404) {
                console.error("ASYNC threw an error");
                console.log(evt);
            }
        };

        req.open('GET', json, true);
        req.send(null);
    }

    function createRow(i) {
        var newRow, rowName = 0;
        var cardsSection = document.getElementById("content-wrapper");

        newRow = document.createElement("div");
        rowName = "row" + i + "-";

        newRow.id = rowName;
        newRow.className = "row flex-cards";

        cardsSection.appendChild(newRow);
    }

    function createContent(articles, queryLength) {

        var node = {};
        var columns, rowName, newRow, cardTitle, title,
                titleArchorText, line, author, br, comments, width;
        var i = 1;

        /*  weird solution for griding different cards -- fix this  */

        if (window.innerWidth > 0) {
            width = window.innerWidth;
        } else {
            width = screen.width;
        }

        if (width < 730) {
            columns = 1;
        } else if (width < 1070 && width > 730) {
            columns = 2;
        } else if (width < 1450 && width > 1070) {
            columns = 3;
        } else if (width < 1750 && width > 1450) {
            columns = 4;
        } else {
            columns = 5;
        }

        /*  end weird solution  */

        createRow(i);
        rowName = "row" + i + "-";

        for (i = 1; i < queryLength; i += 1) {

            cardTitle = rowName + "card" + i;
            title = cardTitle + "Title";
            author = cardTitle + "Author";
            comments = cardTitle + "Comments";

            newRow = document.getElementById(rowName);
            node = document.createElement("div");
            node.className = "card card-block card-style flex-card shadow";
            node.id = cardTitle;

            title = document.createElement('a');
            titleArchorText = document.createTextNode(articles[i - 1].data.title);
            title.setAttribute('href', articles[i - 1].data.url);
            title.appendChild(titleArchorText);
            br = document.createElement("br");
            node.appendChild(title);
            node.appendChild(br);

            line = document.createElement("hr");
            node.appendChild(line);

            author = document.createTextNode("Submitted by " + articles[i - 1].data.author);
            br = document.createElement("br");
            node.appendChild(author);
            node.appendChild(br);

            comments = document.createTextNode(articles[i - 1].data.num_comments + " comments");
            br = document.createElement("br");
            node.appendChild(comments);
            node.appendChild(br);

            newRow.appendChild(node);

            if (i % columns === 0) {
                createRow(i / columns + 1);
                rowName = "row" + (i / columns + 1) + "-";
            }

        }  // end data loop
    }

    function init(querySelector) {

        var contentWrapper = document.getElementById("content-wrapper");

        while (contentWrapper.firstChild) {
            contentWrapper.removeChild(contentWrapper.firstChild);
        }

        getArticles(querySelector);
    }

    window.onload = function () {

        var queryLength = document.getElementById("query-range-selector").value;
        document.getElementById("query-range").innerHTML = queryLength - 1;

        document.getElementById("newerPosts").addEventListener("click", function () {
            queryLength = document.getElementById("query-range-selector").value;
            init(queryLength);
        });

        document.getElementById("query-range-selector").onchange = function () {
            queryLength = document.getElementById("query-range-selector").value;
            document.getElementById("query-range").innerHTML = queryLength - 1;
            init(queryLength);
        };

        init(queryLength);
    };
}());
