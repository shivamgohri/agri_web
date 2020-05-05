var userLatitude;
var userLongitude;
var locationAllowed = false;
var api_key = "592f3e7d18b32b29308b281721d204fc";
var data;


// var data = {
// "coord":{"lon":76,"lat":30},
// "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],
// "base":"stations",
// "main":{"temp":302.6,"feels_like":301.97,"temp_min":302.6,"temp_max":302.6,"pressure":1004,"humidity":33,"sea_level":1004,"grnd_level":979},
// "wind":{"speed":1.56,"deg":34},
// "clouds":{"all":0},
// "dt":1588707507,
// "sys":{"country":"IN","sunrise":1588723731,"sunset":1588772179},
// "timezone":19800,     OFFSET IN SECONDS
// "id":1272517,
// "name":"Dirba",      CITY NAME
// "cod":200} ;




$( document ).ready(function() {
    getLocation();
});


function getWeather(userLatitude, userLongitude, api_key){

  // var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + userLatitude + "&lon=" + userLongitude + "&appid=" + api_key;
  // console.log(url);
  //
  // var weatherRequest = $.getJSON(url, function(json){
  //   data = json;
  //   console.log(data);
  // });

  $.when(weatherRequest).then(function(){

    var weather_icon_code = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + weather_icon_code + ".png";
    $('#weather_icon').attr('src', iconurl);

    var city_name = data.name;
    var city_id = data.id;
    var offset = data.timezone;

    var country_name = data.sys.country;

    if(country_name=="IN"){
      country_name = "India";
    }

    var cloud_percentage = data.clouds.all + " %";
    var sunrise_unix = data.sys.sunrise;
    var sunset_unix = data.sys.sunset;
    var current_unix = data.dt;

    var min_temp = Math.trunc(data.main.temp_min - 273.15) + " degree Celcius";
    var max_temp = Math.trunc(data.main.temp_max - 273.15) + " degree Celcius";
    var current_temp = Math.trunc(data.main.feels_like - 273.15) + " degree Celcius";

    var pressure = data.main.pressure + " hPa";
    var humidity = data.main.humidity + " %";

    var ap_seaLevel = data.main.sea_level + " hPa";
    var ap_grndLevel = data.main.grnd_level + " hPa";

    var wind = data.wind.speed + " metres/second : " + data.wind.deg + " degrees";

    var weather_title = data.weather[0].main;
    var weather_desciption = data.weather[0].description;

    var sunrise_time = getTime(sunrise_unix);
    var sunset_time = getTime(sunset_unix);

    var current_date = getDate(current_unix);
    var current_time = getTime(current_unix);
    var current_day = getDay(current_unix);

    $("#weather_report").html( "City Name: " + city_name +"<br>" +
                               "City id: " + city_id +"<br>" +
                               "Offset: " + offset +"<br>" +
                               "Country Name: " + country_name +"<br>" +
                               "Cloud Percentage: " + cloud_percentage +"<br>" +
                               "Minimum Temperature: " + min_temp +"<br>" +
                               "Maximum Temperature: " + max_temp +"<br>" +
                               "Current Temperature: " + current_temp +"<br>" +
                               "Pressure: " + pressure +"<br>" +
                               "Humidity: " + humidity +"<br>" +
                               "Atmospheric Pressure at Sea Level: " + ap_seaLevel +"<br>" +
                               "Atmospheric Pressure at Ground Level: " + ap_grndLevel +"<br>" +
                               "Wind: " + wind +"<br>" +
                               "Weather Title: " + weather_title +"<br>" +
                               "Weather Description: " + weather_desciption +"<br>" +
                               "Sunrise Time: " + sunrise_time +"<br>" +
                               "Sunset Time: " + sunset_time +"<br>" +
                               "Current Date: " + current_date +"<br>" +
                               "Current Time: " + current_time +"<br>" +
                               "Current Day: " + current_day +"<br>" +
                               "END" );

  });

}



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    checkLocationPermission();
  } else {
    alert("We can't get your location :(" + "\n" + "Try getting weather data using your Latitude and Longitude or by city name!");
  }
}

function checkLocationPermission(){
  navigator.geolocation.watchPosition(function(position) {
    //allowed
  },
  function(error) {
    if (error.code == error.PERMISSION_DENIED)
      alert("Allow Location to get Weather Data!");
      getLocation();
  });
}

function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;

  userLatitude = Math.trunc(userLatitude);
  userLongitude = Math.trunc(userLongitude);

  console.log("User location received!");

  // console.log(userLatitude);
  // console.log(userLongitude);

  getWeather(userLatitude, userLongitude, api_key);
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getTime(timestamp){

  var readable = new Date( timestamp*1000 );
  var h = addZero( readable.getHours());
  var m = addZero( readable.getMinutes());
  var s = addZero( readable.getSeconds());
  var time = h + ":" + m + ":" + s;

  return time;
}


function getDate(timestamp){

  var todate=addZero(new Date(timestamp*1000).getDate());
  var tomonth=addZero(new Date(timestamp*1000).getMonth()+1);
  var toyear=new Date(timestamp*1000).getFullYear();
  var original_date=todate+'/'+tomonth+'/'+toyear;

  return original_date;
}

function getDay(timestamp){

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var d = new Date(timestamp*1000);

  var day = weekday[d.getDay()];

  return day;
}
