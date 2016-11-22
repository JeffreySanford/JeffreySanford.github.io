(function IFEE() {
    'use strict';
    console.log("linechart.js linked");
    var w = 500;
    var h = 300;

    var objMonthlySales = [
        {"month": 10, "sales": 200},
        {"month": 20, "sales": 140},
        {"month": 30, "sales": 200},
        {"month": 40, "sales": 160},
        {"month": 50, "sales": 150},
        {"month": 60, "sales": 170},
        {"month": 70, "sales": 90},
        {"month": 80, "sales": 60},
        {"month": 90, "sales": 30},
        {"month": 100, "sales": 70}
    ];

    var lineFunction = d3.svg.line()
        .x(function (d) { return d.month * 3; })
        .y(function (d) { return h - d.sales; })
        .interpolate("linear");

    var svg = d3.select("#lineChartExample")
        .append("svg")
        .attr({
            width: w,
            height: h
        });

    var dataVis = svg.append("path")
        .attr({
            d: lineFunction(objMonthlySales),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none"
        });

    var labels = svg.selectAll("text")
        .data(objMonthlySales)
        .enter()
        .append("text")
        .text(function (d) { return d.sales; })
        .attr({
            x: function (d) { return d.month * 3 - 25; },
            y: function (d) { return h - d.sales; },
            "font-size": "14px",
            "font-family": "san-serif",
            "fill": "#666666", 
            "text-anchor": "start",
            "dy": ".35em", //line height
            "font-weight": function (d, i) {
                if (i ==0 || (objMonthlySales.length - 1)) {
                    return "bold";
                } else {
                    return "normal";
                }
            }   
        });


}());