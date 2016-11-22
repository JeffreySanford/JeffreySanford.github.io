(function () {
  "use strict";  
  function getCurrent() {
    var json = "https://api.wunderground.com/api/5d6a74af35558f1c/conditions/q747ce0/q/CO/Denver.json";
    var req = new XMLHttpRequest(); // a new request

    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        var res = JSON.parse(req.responseText);
        currentWeather(res);
      }
    }
    
    req.open("GET", json, true);
    req.send(null);
    return req.responseText;
  }

    function currentWeather(httpResponse) {
      var obj = httpResponse;
      var cur_cond = obj.current_observation;

      var cur_temp    = cur_cond.temp_f,
  /*
            cur_icon    = cur_cond.icon_url, 
            cur_icon    = "https://icons.wxug.com/i/c/f/" + cur_cond.icon + ".gif", 
            The gif is hosted on an unsecure version and throwing errors.  Keeping 
            the area, turning off the icon.
   */
          cur_weather = cur_cond.weather,
          cur_time    = cur_cond.local_time_rfc822,
          cur_city    = cur_cond.display_location.full;
  
      function displayCurInfo () {
        var currentWeather = document.getElementById('current-weather');
        currentWeather.innerHTML ='<p id="current-city">' + cur_city + '</p>';
        currentWeather.innerHTML +='<img id="current-icon" />';
        /*document.getElementById('current-icon').src = cur_icon; */
        currentWeather.innerHTML +='<p id="current-temp">' + cur_temp + '&#176;F</p>';
        currentWeather.innerHTML +='<p id="current-condition">' + cur_weather + '</p>';
        currentWeather.innerHTML +='<p class="clearfix" id="last-updated">Updated at ' + cur_time + '</p>';
      }
      displayCurInfo();
    }
  getCurrent();
  setInterval(getCurrent, 60000);  // Update at data source is 6 time per  hour
}());