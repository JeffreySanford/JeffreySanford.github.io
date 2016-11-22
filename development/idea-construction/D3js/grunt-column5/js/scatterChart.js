(function IFEE() {
    'use strict';
    console.log("scatterChart.js linked");
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

    //KPI Color
    //  The Key Performance Indicator (KPI) would
    //  identify the wauld indicate instead of
    //  quantiative indicators.
    function salesKPI (d) {
        if (d >= 250) {
            return "#33cc66";
        } else if (d < 250) {
            return "#666666";
        }
    }

    function showMinMax(ds, col, val, type) {
        var max = d3.max(ds, function (d) { return d[col]; });
        var min = d3.max(ds, function (d) { return d[col]; });

        if (type == 'minmax' && (val == max || val == min )) {
            return val;
        } else {
            if (type == 'all') { 
                return val;
            }
        }
    }
    // create the SVG
    var svg = d3.select("#scatterChartExample")
        .append("svg")
        .attr({
            width: w,
            height: h
        });

    // add the dots
    var dots =svg.selectAll("circle")
    .data(objMonthlySales)
    .enter()
    .append("circle")
    .attr({
        cx: function (d) { return d.month * 3; },
        cy: function (d) { return h - d.sales; },
        r: 5,
        "fill": function (d) { return salesKPI(d.sales); }
    });

    //add labels
    var labels = svg. selectAll("text")
    .data(objMonthlySales)
    .enter()
    .append("text")
    .text(function (d) { return showMinMax(objMonthlySales,
        'sales', d.sales, 'minmax'); 
    })
    .attr({
        x: function (d) { return (d.month * 3) - 25; },
        y: function (d) { return h - d.sales; },
        "font-size": "14px",
        "font-family": "san-serif",
        "fill": "#666666",
        "text-anchor": "start"

    })

}());