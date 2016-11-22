/*jsl:import https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js*/
/*global $, d3*/

(function () {
'use strict';

    //helper functions

    $.fn.fadeOutAndRemove = function (speed) {
        $(this).fadeOut(speed, function () {
            $(this).remove();
        });
    };
    
    function initBarChart(barData) {

    barData = [
        {x: 1, y: 5}, 
        {x: 20, y: 20}, 
        {x: 40, y: 10}, 
        {x: 60, y: 40}, 
        {x: 80, y: 5}, 
        {x: 100, y: 60
    }];

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('style', 'border: 1px solid black');
        svg.setAttribute('width', '300');
        svg.setAttribute('height', '300');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        document.getElementById("occupationChart").appendChild(svg);
        
        // Append the chat to the SVG
        
        var vis = d3.select('#occupationChart svg'),
        WIDTH = 300,
        HEIGHT = 300,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(barData, function(d) {
            return d.x;
        }),
        d3.max(barData, function (d) {
            return d.x;
        })
        ]),
    
        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(barData, function(d) {
            return d.y;
        }),
        d3.max(barData, function (d) {
            return d.y;
        })
        ]),
    
        xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(5)
            .tickSubdivide(true),
    
        yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(5)
            .orient("left")
            .tickSubdivide(true);
        
        vis.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
            .call(xAxis);
        
        vis.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
            .call(yAxis);
    
        
        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, d3.max(barData, function(d) {
            return d.y;
        })]);
    
        xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function(d) {
            return d.x;
        }));    
    
        vis.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr('x', function(d) { // sets the x position of the bar
                return xRange(d.x);
            })
            .attr('y', function(d) { // sets the y position of the bar
                return yRange(d.y);
            })
            .attr('width', xRange.rangeBand()) // sets the width of bar
            .attr('height', function(d) {      // sets the height of bar
                return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
            })
            .attr('fill', 'grey');   // fills the bar with grey color
  
      }
    
    function occupations(data) {
/**
 * Implement these code changes to process the data files.  d3.sjon should be processsing datas and string
 * perfectly.  Refer tot he API doc on d3.json to process the variable data.  Have you tried pusing the exisitng
 * dataset?
 */
  
        $('#projectFourImage').fadeOutAndRemove(2000);

        console.log(JSON.stringify(data));
        
        // create the SVG        

        initBarChart(data);                
    }

    function initLineChart(lineData) {
        
        lineData = [{x: 1, y: 5},{x: 20, y: 20},{x: 40, y: 10}, {x: 60, y: 40}, {x: 80, y: 5}, {x: 100, y: 60}];
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('style', 'border: 1px solid black');
        svg.setAttribute('width', '300');
        svg.setAttribute('height', '300');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        document.getElementById("firstMonthChart").appendChild(svg);
    
        var vis = d3.select('#firstMonthChart svg'),
        WIDTH = 300,
        HEIGHT = 300,
        MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },
        xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
            return d.x;
        }), d3.max(lineData, function(d) {
            return d.x;
        })]),
        yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
            return d.y;
        }), d3.max(lineData, function(d) {
            return d.y;
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
            
        var lineFunc = d3.svg.line()
        .x(function(d) {
            return xRange(d.x);
         })
        .y(function(d) {
            return yRange(d.y);
         })
        .interpolate('linear');
        
        vis.append('svg:path')
            .attr('d', lineFunc(lineData))
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

    }

    function firstMonth(data) {
    //  area chart : http://bl.ocks.org/mohamed-ali/ed4772df6dca7a48f678

        console.log(JSON.stringify(data));

        $('#projectThreeImage').fadeOutAndRemove(2000);
        
        initLineChart(data);

    }

    function top5Counties(data) {
        var i;

        console.log(JSON.stringify(data));

        $('#projectTwoImage').fadeOutAndRemove(2000);
        
        $.each(data, function(index, value) {
            $("#top5Table").append('<tr><td>'+data[index].country+'</td><td>'+data[index].responses+'</td></tr>');
        });
    }

    function totals(data) {
        var width, height;
        var count = parseInt(data);

        console.log(JSON.stringify(data));
        console.log(count);
        var objData = [{name: "one", value: count}];

        //turn off the image
        $('#projectOneImage').fadeOutAndRemove(2000);
        //add the SVG target

        var margin = {top: 20, right: 20, bottom: 20, left: 20};
        width = 200 - margin.left - margin.right;
        height = width - margin.top - margin.bottom;

        var chart = d3.select("#projectOne")
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("center-block", true)
            .append("g")
            .attr("transform", "translate(" + ((width / 2) + margin.left) + "," + ((height / 2) + margin.top) + ")");

        var radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#3399FF", "#5DAEF8", "#86C3FA", "#ADD6FB", "#D6EBFD"]);

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - 20);

        var pie = d3.layout.pie()
            .sort(null)
            .startAngle(1.1 * Math.PI)
            .endAngle(3.1 * Math.PI)
            .value(function (d) {
                return d.value;
            });

        var g = chart.selectAll(".arc")
            .data(pie(objData))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .transition()
            .ease("exp")
            .duration(2000)
            .attrTween("d", tweenPie);

        //Add the SVG Text Element to the svgContainer
        var x, y;
        var text = chart.selectAll("text")
            .data(objData)
            .enter().append("text")
            .text(count)
            .attr("font-family", "sans-serif")
            .attr("font-size", "40px")
            .attr("font-weight", "strong")
            .attr("fill", "black")
            .attr("x", "-20")
            .attr("y", "10");

        function tweenPie(b) {
            var i = d3.interpolate({startAngle: 1.1 * Math.PI, endAngle: 1.1 * Math.PI}, b);
            return function (t) {
                return arc(i(t));
            };
        }
    }

    function init() {
        
        var data;   
        
        /* for this sample don't place the data object into the global name space.  It seemed 
        to work fine, but the idea of four data objects crashing into each other is a terriffy 
        prospect.  Better to pass it independently though the function, explicity defining the 
        object.  On a normal basic with one one dataset, it seems to be good practive to allow 
        it into the global namespace however.
        */
        
        console.log("init fired");
        var index;

        var links = ['data/count.json', 'data/top5.json', 'data/firstmonth.json', 'data/occupations.json'];

        $.each(links, function (index, value) {
            console.log(index + ": " + value);
            var url = value;
            console.log(url);

            d3.json(url, function (error, json) {
                if (error) {
                    return console.warn(error);
                }

                data = json;

                if (index === 0) {

                    console.log("fired index 1");
                    totals(data.count);

                } else if (index === 1) {

                    console.log("fired index 2");
                    top5Counties(data.countries);

                } else if (index === 2) {

                    console.log("fired index 3");
                    firstMonth(data.responses);

                } else if (index === 3) {

                    console.log("fired index 4");
                    occupations(data.occupations);

                }
            });
        });
    }

    $(document).ready(function () {
        console.log("ready!");
        init();
    });
}());