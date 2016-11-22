(function IIFE() {
    "use strict";

    /**
     * This simple application originally was an assement of javascript and utilized a 
     * suplied object to set the data.  The object was oWeather and was formed, in a json 
     * object, like this:
     *
     *     var oWeather = {"cod":"200","message":0.0251,"city":{"id":2643743,"name":"London","coord":{"lon":-0.12574,"lat":51.50853},"country":"GB","population":0,"sys":{"population":0}},"cnt":7,"list":[{"dt":1434020400,"temp":{"day":16.19,"min":13.55,"max":16.19,"night":13.55,"eve":16.19,"morn":16.19},"pressure":1022.91,"humidity":55,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01n"}],"speed":4.81,"deg":76,"clouds":0},{"dt":1434106800,"temp":{"day":19.97,"min":14.79,"max":22.72,"night":16.79,"eve":21.11,"morn":14.79},"pressure":1015.96,"humidity":86,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":5.47,"deg":104,"clouds":92,"rain":7.21},{"dt":1434196800,"temp":{"day":18.36,"min":11.77,"max":18.36,"night":11.77,"eve":13.1,"morn":16.98},"pressure":1010.68,"humidity":88,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":10.07,"deg":232,"clouds":48,"rain":0.76},{"dt":1434283200,"temp":{"day":13.93,"min":7.62,"max":13.93,"night":7.62,"eve":11.36,"morn":11.35},"pressure":1020.3,"humidity":88,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.96,"deg":91,"clouds":100,"rain":2.9},{"dt":1434369600,"temp":{"day":14.68,"min":7.74,"max":14.94,"night":9.68,"eve":14.94,"morn":7.74},"pressure":1030.33,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":2.54,"deg":342,"clouds":25,"rain":1.93},{"dt":1434456000,"temp":{"day":14.69,"min":10.54,"max":16.3,"night":14.33,"eve":16.3,"morn":10.54},"pressure":1025.35,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":6.55,"deg":239,"clouds":58,"rain":0.85},{"dt":1434542400,"temp":{"day":14.6,"min":9.81,"max":14.93,"night":9.81,"eve":14.93,"morn":11.28},"pressure":1029.04,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.55,"deg":340,"clouds":15,"rain":0.4}]};
     *
     * This returned data for a specific time frame from London.  Neat little function to
     * work on for three days to display 7 days worth of data that could be very quickly 
     * checked against known values.
     *
     * Later I added different cities and used 3 hour weather data for the current date plus
     * a certain amount of days.
     *
     * In the future I would like to determine the city with two-way data binding to the openWeather API to provide UI 
     * functionality, returning options on a selection input box and having the user toggle from the "default" -- got 
     * show love for Sn Francisco, to major cities around the world.
     *
     * Phases would be initially 7 major cities that the user could select from.  Later, using two-way data binding, 
     * display all the cities available under the criteria of the users input using ng-filters.
     * 
     */
    

    var url = "http://api.openweathermap.org/data/2.5/forecast?id=5809844&mode=json&units=imperial&APPID=5c9378052f7345e11ae8a17d4de6f439";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var oWeather = JSON.parse(xmlhttp.responseText);
            display(oWeather);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function display(oWeather) {

        var i, len;
        var forecastWeather = document.getElementById("forecastTable");

        function cityHeader() {

            var headerContent = ['Name', 'ID', 'COD', 'Message', 'Longitutde', 'Latitude', 'Country', 'Population', 'SYS POP', 'CNT'];
            var headerData = [oWeather.city.name, oWeather.city.id, oWeather.cod, oWeather.message, oWeather.city.coord.lon, oWeather.city.coord.lat, oWeather.city.country, oWeather.city.population, oWeather.city.sys.population, oWeather.cnt];
            var table = document.createElement('table'),
                header = table.createTHead(),
                row,
                cell;

            table.border = 1;
            table.style.borderCollapse = "collapse";

            // construct header
            /*  Can these two methods be combined? */
            row = header.insertRow(0);
            len = headerContent.length;

            for (i = 0; i < len; i += 1) {
                cell = row.insertCell(i);
                cell.innerHTML = headerContent[i];
            }

            len = headerContent.length;

            row = header.insertRow(1);
            i = 0;

            for (i = 0; i < len; i += 1) {
                cell = row.insertCell(i);
                cell.innerHTML = headerData[i];
            }

            // add table element to the dom tree
            var wrapper = document.getElementById('forecastTable');
            wrapper.appendChild(table);
        } // end cityHeader function

        /* helper function to add a zero to the hours and miniutes if less than 10*/
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function infoHeader() {

            var dayInfo, forDate, readableDate, dayOfWeekNumber, dayOfWeek, date, month, year;
            var h, m, tz, time;
            var weekdays = [];

            var infoHeaderContent = ['Day', 'Date/Time', 'Min', 'Max', 'Pressure', 'Humidity',
                    'ID', 'Icon', 'Weather', 'Description', 'Wind<br>Speed', 'Wind<br>Direction',
                    'Clouds', 'Rain'];

            var table = document.createElement('table'),
                body = table.appendChild(document.createElement('tbody')),
                row,
                cell,
                day,
                dateString;

            var weatherData, weatherImageUrl, weatherImage, headerData;

            table.border = 1;
            table.style.borderCollapse = "collapse";
            row = body.insertRow();
            len = infoHeaderContent.length;

            for (i = 0; i < len; i += 1) {
                cell = row.insertCell(i);
                cell.innerHTML = infoHeaderContent[i];
            }

            var wrapper = document.getElementById('dayTable');
            body = table.appendChild(document.createElement('tbody'));
            wrapper.appendChild(table);

            for (day = 1; day < oWeather.list.length; day += 1) {

                dayInfo = oWeather.list[(day - 1)];
                forDate = dayInfo.dt * 1000;
                weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                readableDate = new Date(forDate);
                dayOfWeekNumber = readableDate.getDay();
                dayOfWeek = weekdays[dayOfWeekNumber];
                date = readableDate.getDate();
                month = readableDate.getMonth() + 1;
                year = readableDate.getFullYear();

                h = addZero(readableDate.getHours());
                m = addZero(readableDate.getMinutes());
                tz = readableDate.getTimezoneOffset() / 60;
                time = h + ":" + m + "<br/> (-" + tz + " UTC)";

                dateString = "(" + month + "-" + date + "-" + year + ")" + "<br />" + time;

                if (dayInfo.rain === null) {
                    dayInfo.rain = "0 (undefined)";
                }

                weatherData = dayInfo.weather[0];
                weatherImageUrl = 'https://openweathermap.org/img/w/' + weatherData.icon + '.png';
                weatherImage = '<img src = "' + weatherImageUrl + '" />';
                headerData = [dayOfWeek, dateString, dayInfo.main.temp_min, dayInfo.main.temp_max,
                        dayInfo.main.pressure, dayInfo.main.humidity, weatherData.id, weatherImage, weatherData.main,
                        weatherData.description, dayInfo.wind.speed, dayInfo.wind.deg, dayInfo.clouds.all,
                        dayInfo.rain["3h"]];

                row = body.insertRow();
                len = infoHeaderContent.length;

                for (i = 0; i < len; i += 1) {
                    cell = row.insertCell(i);
                    if (headerData[i] === undefined) {
                        cell.innerHTML = "none";
                    } else {
                        cell.innerHTML = headerData[i];
                    }
                } // end for length of array loop
            } // end amount of days loop
        } // end function


        forecastWeather.innerHTML = '<h2>7-day Forecast for ' + oWeather.city.name + '</h2>';
        cityHeader();
        forecastWeather.innerHTML += '<br />';
        infoHeader();
    } // end display function
}());