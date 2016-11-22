/*  Source Page:    https://developers.google.com/chart/interactive/docs/gallery/geochart
    Tutorial:       http://help.skuidify.com/m/supercharge-your-ui/l/300051-visualizations-geocharts
 */
google.load("visualization", "1", {packages:["geochart"]});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Articles'],
        ['Iran', 10],
        ['Mexico', 15],
        ['Iraq', 30],
        ['Canada', 2],
        ['France', 5],    
        ['Russia', 5],
        ['Iceland', 0],
        ['Geenland', 0]
    ]);
    var options = {};
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);
}