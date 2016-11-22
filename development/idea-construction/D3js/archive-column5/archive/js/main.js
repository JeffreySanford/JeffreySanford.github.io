(function () {
    'use strict';

    function prepareTop5Countries(data) {
        
    }
    
    /**
    * D3 Simple line chart function
    */

    function prepareMonthChart(data) {
        
    }
    
    function prepareOccupationsChart(data) {
    
        var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    
        d3.select("occupations-response").selectAll("div")
            .data(dataset)
            .enter()
            .append("div")
            .attr("class", "bar")
            .style("height", function(d) {
                var barHeight = d * 5;
                return barHeight + "px";
        });
    
    }
    /**
     * This is the stub that will display the data returned from the asyncronous data call
     * @params currentObj The current obj returned
     */

    function displayData(response) {

        var currentObj = JSON.parse(response);

        if (Object.keys(currentObj)[0] === "count") {
            var count = currentObj.count;
            //console.log("record present:  " + currentObj.length);
            document.getElementById("totals-response").innerHTML = "Count is : " + count;

        } else if (Object.keys(currentObj)[0] === "responses") {

            //console.log("record present:  " + currentObj.length);

            document.getElementById("months-response").innerHTML = '<svg id="visualisation" width="100" height="100" s"></svg>';
            prepareMonthChart(currentObj);
            console.log("months triggered");

        } else if (Object.keys(currentObj)[0] === "occupations") {

            console.log("occupations triggered");
            //console.log("record present:  " + currentObj.occupations.length);
            document.getElementById("occupations-response").innerHTML += "";
            prepareOccupationsChart(currentObj);

        } else if (Object.keys(currentObj)[0] === "countries") {

            console.log("countries triggered");
            //console.log("record present:  " + currentObj.countries.length);
        }
        return;
    }
    /**
     * ASYNC Javascript function to be used as the stub.
     * @param url
     */
    function loadJSON(url) {

        //console.log("url is " + url);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (xhttp.readyState === 4 && xhttp.status === 200) {
                if (xhttp.responseText) {

                    //console.log("response text" + xhttp.responseText);
                    displayData(xhttp.response);

                }
            }
        };

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function init() {
        var jsonFiles;
        jsonFiles = ['data/count.json', 'data/firstmonth.json', 'data/top5.json', 'data/occupations.json'];
        var url, i;
    
        for (i = 0; i < jsonFiles.length; i += 1) {
            url = jsonFiles[i];
            loadJSON(url);
        }
    }
    
    // A $( document ).ready() block.
    $( document ).ready(function() {
        console.log( "ready!" );
        init();
    });
}());
