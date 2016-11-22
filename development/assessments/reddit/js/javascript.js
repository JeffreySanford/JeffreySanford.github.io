/*global window */
(function () {
    'use strict';

    function getArticles() {
        var url = "http://www.reddit.com/r/business/new/.json";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';

        xhr.onload = function (articles) {

            articles = xhr.response.data.children;

            function displayFourArticles(articles) {
                var author, title, comments, i, cardTitle;

                for (i = 1; i < 5; i += 1) {

                    cardTitle = "card";
                    cardTitle += i;

                    title = cardTitle + "Title";
                    document.getElementById(title).innerHTML = articles[i - 1].data.title;

                    author = cardTitle + "Author";
                    document.getElementById(author).innerHTML = "Submitted by " + articles[i - 1].data.author;

                    comments = cardTitle + "Comments";
                    document.getElementById(comments).innerHTML = +articles[i - 1].data.num_comments + " comments";

                }
            }

            displayFourArticles(articles);
        };

        xhr.onerror = function () {
            console.error("Error detected");
        };

        xhr.send();

    }

    function init() {
        var articles = [];
        getArticles(articles);
    }

    window.onload = function () {
        init();
        document.getElementById("newerPosts").addEventListener("click", function () {
            window.alert("not implimented");
        });
        document.getElementById("olderPosts").addEventListener("click", function () {
            window.alert("not implimented");
        });
    };
}());