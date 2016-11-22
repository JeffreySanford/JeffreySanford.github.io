"use strict";

function infoHeader() {

  //  Draws the header for the information of each day.
  //  We need sub header so that there are catagories
  //  Temperature               Location          Meteorlogical
  //  Min Max day eve etc       

  var infoHeaderContent = ['Day','Day','Min','Max', 'Night', 'Evening', 'Morning', 'Pressure', 'Humidity',
  'ID', 'Icon', 'Expected Weather','Weather Description','Speed', 'Direction',
  'Clouds','Rain'];

  var table = document.createElement('table'),
      body = table.appendChild(document.createElement('tbody')),
      row, 
      cell;
  
  table.border = 1;
  table.style.borderCollapse="collapse";
  
  // construct header
  row = body.insertRow();
  for (var i = 0, len = infoHeaderContent.length; i < len; i++) {
      cell = row.insertCell(i);
      cell.innerHTML = infoHeaderContent[i];
  }
  
  // add  day specific table element to the dom tree
  var wrapper = document.getElementById('dayTable');
  body = table.appendChild(document.createElement('tbody'))
  wrapper.appendChild(table);

  
  for (var day = 1; day < 7; day++) {
  
    var dayInfo = oWeather.list[day];

    /*  *****  Clean this up ****  */

      var foreDate = dayInfo.dt * 1000;
      //Day of the Forecast
      //  var myDate = new Date(1238540400000);
      //  our date              1434020400
      var weekdays= ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      var readableDate = new Date (foreDate);
      console.log("On day " + day + "the JSON date (" + foreDate + " translates as " + readableDate);

      var dayOfWeekNumber = readableDate.getDay();
      var dayOfWeek = weekdays[dayOfWeekNumber];
      var date = readableDate.getDate();
      var month = readableDate.getMonth();
      var year = readableDate.getFullYear();
      var dateString = dayOfWeek + "<br />("+ month + "-" + date + "-" + year + ")";

      /*  ^^^^^  Clean this up ****  */
      
      //  Creating the table for the daily row data

        /*  Exceptions */
  
        if (dayInfo.rain == null) {
          dayInfo.rain = "0 (undefined)";
        }

      var headerData = [dateString, dayInfo.temp.day, dayInfo.temp.min, dayInfo.temp.max,
      dayInfo.temp.night, dayInfo.temp.eve, dayInfo.temp.morn, dayInfo.pressure,
      dayInfo.humidity, dayInfo.weather[0].id,dayInfo.weather[0].icon,
      dayInfo.weather[0].main, dayInfo.weather[0].description, dayInfo.speed,
      dayInfo.deg, dayInfo.clouds, dayInfo.rain];

      row = body.insertRow()
      
      for (var i = 0, len = infoHeaderContent.length; i < len; i++) {
          cell = row.insertCell(i);
          cell.innerHTML = headerData[i];
      }
    }  
}

infoHeader();
