(function (d3) {
    'use strict';

/**
 * D3 Simple line chart function
 */

    function prepareMonthChart(currentObj) {
        console.log("month chart triggered");
        var lineData = currentObj;
        //var x = currentObj.responses.receive_date;
        //var y = currentObj.responses.responses;
        var vis = d3.select('#visualisation'),
            WIDTH = 1000,
            HEIGHT = 500,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            },
            xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
                return d.receive_date;
            }), d3.max(lineData, function (d) {
                return d.receive_date;
            })]),
            yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
                return d.responses;
            }), d3.max(lineData, function (d) {
                return d.responses;
            })]),
            xAxis = d3.svg.axis()
                .scale(xRange)
                .tickSize(5)
                .tickSubdivide(true),
            yAxis = d3.svg.axis()
                .scale(yRange)
                .tickSize(5)
                .orient('left')
                .tickSubdivide(true);

        vis.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
            .call(xAxis);

        vis.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
            .call(yAxis);
    }

    /**
     * This is the stub that will display the data returned from the asyncronous data call
     * @params currentObj The current obj returned
     */

    function displayData(response) {

        var currentObj = JSON.parse(response);

        if (Object.keys(currentObj)[0] === "count") {
            var count = currentObj.count;
            console.log("record present:  " + currentObj.length);
            document.getElementById("totals-response").innerHTML += "Count is : " + count;

        } else if (Object.keys(currentObj)[0] === "responses") {

            console.log("record present:  " + currentObj.responses.length);

            document.getElementById("months-response").innerHTML += '<svg id="visualisation" width="1000" height="500" style="border: 1px solid red;"></svg>';
            prepareMonthChart(currentObj);
            console.log("months triggered");

        } else if (Object.keys(currentObj)[0] === "occupations") {

            console.log("occupations triggered");
            console.log("record present:  " + currentObj.occupations.length);
            document.getElementById("occupations-response").innerHTML += "";

        } else if (Object.keys(currentObj)[0] === "countries") {

            console.log("countries triggered");
            console.log("record present:  " + currentObj.countries.length);
        }
        return;
    }
    /**
     * ASYNC Javascript function to be used as the stub.
     * @param url
     */
    function loadJSON(url) {

        console.log("url is " + url);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (xhttp.readyState === 4 && xhttp.status === 200) {

                console.log("response text" + xhttp.responseText);
                displayData(xhttp.response);
            }
        };

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    var jsonFiles;
    jsonFiles = ['data/count.json', 'data/firstmonth.json', 'data/top5.json', 'data/occupations.json'];
    var url, i;

    for (i = 0; i < jsonFiles.length; i += 1) {
        url = jsonFiles[i];
        loadJSON(url);
    }

}());
