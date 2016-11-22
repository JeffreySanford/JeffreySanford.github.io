/*global $,d3*/
/*jslint white: true */
(function () {
'use strict';

    //helper functions
    /*
    $.fn.fadeOutAndRemove = function (speed) {
        $(this).fadeOut(speed, function () {
            $(this).remove();
        });
    };
    */

    function initBarChart(bardata) {

        //var bardata = [];
        //var bardata = [20, 30, 45, 15, 20, 30, 45, 15, 20, 30, 45, 15];

        var bardata = [];
        var i;

        for (i = 1; i < 30; i += 1 ) {
            bardata.push(Math.round(Math.random() * 30));
        }    
/*
    bardata.sort(function compareNumbers(a,b){
        return a - b;
    });
 */
        var margin = { top: 30, right: 30, bottom: 40, left:50 }

        var height = 300 - margin.top - margin.bottom,
            width = 400 - margin.left - margin.right;

        var tempColor;

        var colors = d3.scale.linear()
        .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
        .range(['#B58929','#C61C6F', '#268BD2', '#85992C'])

        var yScale = d3.scale.linear()
                .domain([0, d3.max(bardata)])
                .range([0, height]);

        var xScale = d3.scale.ordinal()
                .domain(d3.range(0, bardata.length))
                .rangeBands([0, width], 0.2)

        var tooltip = d3.select('#occupationChart svg').append('div')
                .style('position', 'relative')
                .style('padding', '0 10px')
                .style('background', 'black')
                .style('opacity', 0)

        var myChart = d3.select('#occupationChart').append('svg')
            .style('background', '#E7E0CB')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
            .selectAll('rect').data(bardata)
            .enter().append('rect')
                .style('fill', function(d,i) {
                    return colors(i);
                })
                .attr('width', xScale.rangeBand())
                .attr('x', function(d,i) {
                    return xScale(i);
                })
                .attr('height', 0)
                .attr('y', height)

            .on('mouseover', function(d) {

                tooltip.transition()
                    .style('opacity', .9)

                tooltip.html(d)
                    .style('left', (d3.event.pageX - 35) + 'px')
                    .style('top',  (d3.event.pageY - 30) + 'px')


                tempColor = this.style.fill;
                d3.select(this)
                    .style('opacity', .5)
                    .style('fill', 'yellow')
            })

            .on('mouseout', function(d) {
                d3.select(this)
                    .style('opacity', 1)
                    .style('fill', tempColor)
            })

        myChart.transition()
            .attr('height', function(d) {
                return yScale(d);
            })
            .attr('y', function(d) {
                return height - yScale(d);
            })
            .delay(function(d, i) {
                return i * 20;
            })
            .duration(2000)
            .ease('elastic')

        var vGuideScale = d3.scale.linear()
            .domain([0, d3.max(bardata)])
            .range([height, 0])

        var vAxis = d3.svg.axis()
            .scale(vGuideScale)
            .orient('left')
            .ticks(10)

        var vGuide = d3.select('#occupationChart svg').append('g')
            vAxis(vGuide)
            vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
            vGuide.selectAll('path')
                .style({ fill: 'none', stroke: "#000"})
            vGuide.selectAll('line')
                .style({ stroke: "#000"})

        var hAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickValues(xScale.domain().filter(function(d, i) {
                return !(i % (bardata.length/5));
            }))

        var hGuide = d3.select('#occupationChart svg').append('g')
            hAxis(hGuide)
            hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
            hGuide.selectAll('path')
                .style({ fill: 'none', stroke: "#000"})
            hGuide.selectAll('line')
                .style({ stroke: "#000"})
    }

    function initPieChart(piedata) {

        var WIDTH = 300,
        HEIGHT = 400,
        RADIUS = 200;

        var colors = d3.scale.category20();

        /*  These are some great preset colors that are included in d3, 
        reference the online information at:  (not at but interesting)
        http://bl.ocks.org/aaizemberg/78bd3dade9593896a59d */

        var pie = d3.layout.pie()
            .value(function (d) {
                return parseInt(d.responses);
            });

        var arc = d3.svg.arc()
                .outerRadius(RADIUS);

        var myChart = d3.select('#occupationChart svg')
            .attr('width', WIDTH)
            .attr('height', HEIGHT)
            .append('g')
                .attr('transform', 'translate('+(WIDTH-RADIUS)+','+(HEIGHT-RADIUS)+')')
                .selectAll('path').data(pie(piedata))
                /*  Notice here that we are not feeding in the piedata as normally would be fed into the chart but rather the 'processed data' that has processed the values of the data. */
                .enter().append('g')
                    .attr('class', 'slice');

        var slices = d3.selectAll('g.slice')
            .append('path')
            .attr('fill', function (d, i) {
                return colors(i);
            })
            .attr('d', arc);

        var text = d3.selectAll('g.slice')
            .append('text')
            .text(function (d, i) {
                    return d.data.occupation;
            })
            .attr("text-anchor", function(d) { return angle(d) < 0 ? "start" : "end"; })
            .attr('fill', 'white')
            .attr('font-size', "10px")
            .attr("angle", function(d) { return angle(d); })
            .attr('transform', function (d) {
                d.innerRadius = 0;
                d.outerRadius = RADIUS;
                //return 'translate('+ arc.centroid(d)+')';
                return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
            });

            // Computes the angle of an arc, converting from radians to degrees.
            function angle(d) {
                var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                    return a > 90 ? a - 180 : a;
            }
        }
    
    function occupations(data) {
        /**
         * Implement these code changes to process the data files.  d3.sjon should be processsing datas and string
         * perfectly.  Refer tot he API doc on d3.json to process the variable data.  Have you tried pusing the exisitng
         * dataset?
         */
  
        //$('#projectFourImage').fadeOutAndRemove(2000);
        
        // create the SVG        

        //initPieChart(data);
        initBarChart(data);
        //addEventListener("click", addActivityItem, false);
    }

    function initLineChart() {

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var xScale = d3.time.scale()
            .range([0, width]);

        var yScale = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.receive_date);
            })
            .y(function(d) {
                return y(d.responses);
            });

        var svg = d3.select("#firstMonthChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.json("data/firstmonth.json", function(error, json) {
            if (error) {
                return console.warn(error);
            }
            var data = json.responses;

            data.forEach(function(d) {
                d.receive_date = new Date(d.receive_date);
                d.responses = +d.responses;
            });

            console.log(data);
            var xScale = d3.scale.linear()
                .domain([0, d3.max(data, function(d) { return d.receive_date.length - 1; })])
                .range([0, width]);
    //        xScale.domain(d3.extent(data, function(d) { return d.recieve_date; }));
            var yScale = d3.scale.linear()
                .domain([d3.min(data, function(d) {
                        return d3.min(d.reponses);
                    }), d3.max(data, function(d) {
                        return d3.max(d.reponses);
                    })
                ])
                .range([height, 0]);
            //yScale.domain(d3.extent(data, function(d) { return d.responses; }));

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Responses");

              svg.append("path")
                .data(data, function(d) {
                    return d.responses; })
                  .attr("class", "line")
                  .attr("d", line);
        });
    }

    function initLineChart2() {
        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
            height = 300 - margin.top - margin.bottom,
            width = 400 - margin.left - margin.right;

        // Parse the date / time
        var parseDate = d3.time.format("%d-%b-%y").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes
        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        // Define the line
        var valueline = d3.svg.line()
            .x(function(d) { 
                return x(d.receive_date); 
            })
            .y(function(d) { 
                return y(d.reponses); 
            }
        );
            
        // Adds the svg canvas
        var svg = d3.select("#firstMonthChart")
            .append("svg")
                .style('background', '#E7E0CB')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.json("data/firstmonth.json", function(error, json) {
            if (error) {
                return console.warn(error);
            }
            var data = json.responses;

            data.forEach(function(d) {
                d.receive_date = new Date(d.receive_date);
                d.responses = +d.responses;
            });

            console.log(data);

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) {
                return d.date;
            }));
            y.domain([0, d3.max(data, function(d) {
                return d.close;
            })]);

            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));

            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

        });
    }

    function firstMonth(data) {
    //  area chart : http://bl.ocks.org/mohamed-ali/ed4772df6dca7a48f678

        //$('#projectThreeImage').fadeOutAndRemove(2000);
        
        initLineChart2(data);

    }

    function top5Counties(data) {

        //$('#projectTwoImage').fadeOutAndRemove(2000);
        
        $.each(data, function(index, value) {
            $("#top5Table").append('<tr><td>' + data[index].country +' </td><td>' + data[index].responses + '</td></tr>');
        });
    }

    function totals(data) {
        var width, height;
        var count = parseInt(data);

        console.log(count);
        var objData = [{name: "one", value: count}];

        //turn off the image
        //$('#projectOneImage').fadeOutAndRemove(2000);
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

                    console.log("fired project 1");
                    totals(data.count);

                } else if (index === 1) {

                    console.log("fired project 2");
                    top5Counties(data.countries);

                } else if (index === 2) {

                    console.log("fired project 3");
                    firstMonth(data.responses);

                } else if (index === 3) {

                    data.occupations.forEach(function (d) {
                        d.responses = +d.responses;
                    });
                    console.log("fired project 4");
                    occupations(data);
                }
            });
        });
    }

    $(document).ready(function () {
        console.log("ready!");
        init();
    });
}());