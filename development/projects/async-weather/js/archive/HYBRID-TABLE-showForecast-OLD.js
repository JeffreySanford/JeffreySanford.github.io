"use strict";

var domContent = document.getElementById("mainContent"),
    oWeather = {"cod":"200","message":0.0251,"city":{"id":2643743,"name":"London","coord":{"lon":-0.12574,"lat":51.50853},"country":"GB","population":0,"sys":{"population":0}},"cnt":7,"list":[{"dt":1434020400,"temp":{"day":16.19,"min":13.55,"max":16.19,"night":13.55,"eve":16.19,"morn":16.19},"pressure":1022.91,"humidity":55,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01n"}],"speed":4.81,"deg":76,"clouds":0},{"dt":1434106800,"temp":{"day":19.97,"min":14.79,"max":22.72,"night":16.79,"eve":21.11,"morn":14.79},"pressure":1015.96,"humidity":86,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":5.47,"deg":104,"clouds":92,"rain":7.21},{"dt":1434196800,"temp":{"day":18.36,"min":11.77,"max":18.36,"night":11.77,"eve":13.1,"morn":16.98},"pressure":1010.68,"humidity":88,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":10.07,"deg":232,"clouds":48,"rain":0.76},{"dt":1434283200,"temp":{"day":13.93,"min":7.62,"max":13.93,"night":7.62,"eve":11.36,"morn":11.35},"pressure":1020.3,"humidity":88,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.96,"deg":91,"clouds":100,"rain":2.9},{"dt":1434369600,"temp":{"day":14.68,"min":7.74,"max":14.94,"night":9.68,"eve":14.94,"morn":7.74},"pressure":1030.33,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.54,"deg":342,"clouds":25,"rain":1.93},{"dt":1434456000,"temp":{"day":14.69,"min":10.54,"max":16.3,"night":14.33,"eve":16.3,"morn":10.54},"pressure":1025.35,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":6.55,"deg":239,"clouds":58,"rain":0.85},{"dt":1434542400,"temp":{"day":14.6,"min":9.81,"max":14.93,"night":9.81,"eve":14.93,"morn":11.28},"pressure":1029.04,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.55,"deg":340,"clouds":15,"rain":0.4}]};
var forecastWeather = document.getElementById("forecastTable");

/*  Inside the city object
    "cod":"200","message":0.0251,"city":{"id":2643743,"name":"London","coord":{"lon":-0.12574,"lat":51.50853},"country":"GB","population":0,"sys":{"population":0}},"cnt":7
 */
 
forecastWeather.innerHTML = '<h2>7-day Forecast for ' + oWeather.city.name + '</h2>';

/*
    <table>
     <thead>
      <tr>
         <th>Month</th>
         <th>Savings</th>
      </tr>
     </thead>
     <tfoot>
      <tr>
         <td>Sum</td>
         <td>$180</td>
      </tr>
     </tfoot>
     <tbody>
      <tr>
         <td>January</td>
         <td>$100</td>
      </tr>
      <tr>
         <td>February</td>
         <td>$80</td>
      </tr>
     </tbody>
    </table>
 */
 
/*
    var headerContent = ['Sum of Dice', 'Total Times Rolled'];
    var table = document.createElement('table'),
        header = table.createTHead(),
        row, 
        cell;
    
    table.border = 1;
    
    // construct header
    row = header.insertRow(0);
    for (var i = 0, len = headerContent.length; i < len; i++) {
        cell = row.insertCell(i);
        cell.innerHTML = headerContent[i];
    }
    
    // construct table content
    for (var i = 0; i < 11; i++) {
        row = table.insertRow(i + 1);
        for (var j = 0, len = headerContent.length; j < len; j++) {
            cell = row.insertCell(j);
            cell.innerHTML = '2';
        }
    }
    
    // add table element to the dom tree
    var wrapper = document.getElementById('wrapper');
    wrapper.appendChild(table);
*/  

var headerContent = ['Name','ID','COD', 'Message', 'Longitutde', 'Latitude', 'Country', 'Population', 'SYS POP', 'CNT'];
var headerData = [oWeather.city.name, oWeather.city.id, oWeather.cod, oWeather.message, oWeather.city.coord.lon, oWeather.city.coord.lat, oWeather.city.country, oWeather.city.population, oWeather.city.sys.population, oWeather.cnt];
var table = document.createElement('table'),
    header = table.createTHead(),
    row, 
    cell;

table.border = 1;

// construct header
row = header.insertRow(0);
for (var i = 0, len = headerContent.length; i < len; i++) {
    cell = row.insertCell(i);
    cell.innerHTML = headerContent[i];
}

row = header.insertRow(oWeather.city.sys.population);
for (var i = 0, len = headerContent.length; i < len; i++) {
    cell = row.insertCell(i);
    cell.innerHTML = headerData[i];
}

// add table element to the dom tree
var wrapper = document.getElementById('forecastTable');
wrapper.appendChild(table);


/*
forecastWeather.innerHTML += "<table border=\"1\">";
forecastWeather.innerHTML += "<tr>7 Day Forecast for " + oWeather.city.name + "</tr>";
/* forecastWeather.innerHTML += "<tr>Maybe something here for the footer</tr>"; */
/*
forecastWeather.innerHTML += "<tbody>";
forecastWeather.innerHTML += "<tr><td>COD</td><td>Message</td></tr>";
forecastWeather.innerHTML += "<tr><td>" + oWeather.cod + "</td><td>" + oWeather.message + "</td></tr>";

/* City Data */

/*
forecastWeather.innerHTML += "<tr><td>id</td><td>name</td></tr>";
forecastWeather.innerHTML += "<tr><td>" + oWeather.city.id + "</td><td>" + oWeather.city.name + "</td></tr>";

/* Location Data */
/*

forecastWeather.innerHTML += "<tr><td>longitude</td><td>latitude</td></tr>";
forecastWeather.innerHTML += "<tr><td>" + oWeather.city.coord.lon + "</td><td>" + oWeather.city.coord.lat + "</td></tr>";

/* Country Data */
/*
forecastWeather.innerHTML += "<tr><td>Country</td><td>Population</td><td>SYS Population</td><td>CNT</td></tr>";
forecastWeather.innerHTML += "<tr><td>" + oWeather.city.country + "</td><td>" + oWeather.city.population + "</td><td>" + oWeather.city.sys.population + "</td><td>" + oWeather.cnt + "</td></tr>";
forecastWeather.innerHTML += "</tbody></table>";
*/

forecastWeather.innerHTML += "<br />";
forecastWeather.innerHTML += "<h2>7 Day Forecast for " + oWeather.city.name + "</h2>";


forecastWeather.innerHTML += "<p>COD: " + oWeather.cod + "</p>";
forecastWeather.innerHTML += "<p>Message: " + oWeather.message + "</p><br />";
forecastWeather.innerHTML += "<p><b>City Data:</b></p>";
forecastWeather.innerHTML += "<p>id: " + oWeather.city.id + "</p>";
forecastWeather.innerHTML += "<p>name: " + oWeather.city.name + "</p><br />";
// "coord":{"lon":-0.12574,"lat":51.50853}
forecastWeather.innerHTML += "<p><b>Location Data:</b></p>";
forecastWeather.innerHTML += "<p>Longitude: " + oWeather.city.coord.lon + "</p>";
forecastWeather.innerHTML += "<p>Latitude: " + oWeather.city.coord.lat + "</p><br />";
// "country":"GB","population":0,"sys":{"population":0}},"cnt":7
forecastWeather.innerHTML += "<p><b>Country Data:</b></p>";
forecastWeather.innerHTML += "<p>Country: " + oWeather.city.country + "</p>";
forecastWeather.innerHTML += "<p>Population: " + oWeather.city.population + "</p>";
forecastWeather.innerHTML += "<p>SYS Population: " + oWeather.city.sys.population + "</p>";
forecastWeather.innerHTML += "<p>CNT: " + oWeather.cnt + "</p>";


for (var day=1; day < 8; ++day) {
    var foreDate = oWeather.list[day -1].dt * 1000;            //Day of the Forecast
    //  var myDate = new Date(1238540400000);
    //  our date              1434020400
    var readableDate = new Date (foreDate);
    forecastWeather.innerHTML += "<br />";
    forecastWeather.innerHTML += "<h3>" + readableDate + "</h3>";
    
    // Inside the day data
    forecastWeather.innerHTML += "<p>" + oWeather.list[day -1].dt + "</p><br />";

    /*  Inside the temperature object  - OMG refactor this!!!
        temp":{"day":16.19,"min":13.55,"max":16.19,"night":13.55,"eve":16.19,"morn":16.19},"pressure":1022.91,"humidity":55
     */
     
    forecastWeather.innerHTML += "<p><b>Temperature Data:</b></p>";
    forecastWeather.innerHTML += "<p>Day Temperature: " + oWeather.list[day -1].temp.day + "</p>";
    forecastWeather.innerHTML += "<p>Minimum Temperature: " + oWeather.list[day -1].temp.min + "</p>";
    forecastWeather.innerHTML += "<p>Maximum Temperature: " + oWeather.list[day -1].temp.max + "</p>";
    forecastWeather.innerHTML += "<p>Night Temperature: " + oWeather.list[day -1].temp.night + "</p>";
    forecastWeather.innerHTML += "<p>Evening Temperature: " + oWeather.list[day -1].temp.eve + "</p>";
    forecastWeather.innerHTML += "<p>Morning Temperature: " + oWeather.list[day -1].temp.morn + "</p>";
    forecastWeather.innerHTML += "<p>Pressure: " + oWeather.list[day -1].pressure + "</p>";
    forecastWeather.innerHTML += "<p>Humidity: " + oWeather.list[day -1].humidity + "</p>";
    forecastWeather.innerHTML += "<br />";

    /* Inside the weather array
       weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}]
     */
    
    forecastWeather.innerHTML += "<p><b>Weather Data:</b></p>";
    forecastWeather.innerHTML += "<p>ID: " + oWeather.list[day -1].weather[0].id + "</p>";  //I don't know what this variable is for
    forecastWeather.innerHTML += "<p>Show a cool Icon: " + oWeather.list[day -1].weather[0].icon + "</p>";
    forecastWeather.innerHTML += "<p>Expected Weather: " + oWeather.list[day -1].weather[0].main + "</p>";
    forecastWeather.innerHTML += "<p>Expected Weather description: " + oWeather.list[day -1].weather[0].description + "</p>";
    forecastWeather.innerHTML += "<br />";
    
    /*  Additional Data
        "speed":7.55,"deg":340,"clouds":15,"rain":0.4"
     */
   forecastWeather.innerHTML += "<p>Speed: " + oWeather.list[day -1].speed + "</p>";
   forecastWeather.innerHTML += "<p>Direction: " + oWeather.list[day -1].deg + "</p>";
   forecastWeather.innerHTML += "<p>Clouds: " + oWeather.list[day -1].clouds + "</p>";
   if (oWeather.list[day -1].rain != null) {
     forecastWeather.innerHTML += "<p>Rain: " + oWeather.list[day -1].rain + "</p>";
   } else {
     forecastWeather.innerHTML += "<p>Rain: " + 0 + "(added for null value)</p>";
   }
}  // End the for loop
  
console.log(oWeather);