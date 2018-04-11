$(window).on("load", function() {

// load first location API then load weather API which calls for default celsius temperature
  $('#temperature').html("Temperature is loading, please wait...");
  $.get("https://freegeoip.net/json/").then(function(data){
    getLocation(data);
    getWeather();
  })

  $('#btn-fahrenheit').on('click', function() {
    getTemperatureF();
  })
  
  $('#btn-celsius').on('click', function() {
    getTemperatureC();
  })
}) // end of window load 

// variables for geolocation API
var latitude = "";
var longitude = "";

// get and store user location, write out country and optionally city as location
function getLocation(data) {
  latitude = data.latitude;
  longitude = data.longitude;
  if (data.city) {
    $('#location').html('Location: ' + data.city + ", " + data.country_name);
  } else { 
    $('#location').html('Location: ' + data.country_name); 
  }
}

// variables for the API accessing weather
var api = "e27b961dbfbc322298be717e3e5e429a";
var temperatureC = "";

// ask for the temperature and weather of the location and write it out with the appropriate icon
// API credit is stored in footer
function getWeather() {
  $.getJSON("https://api.darksky.net/forecast/" + api + "/" + latitude + "," + longitude + "?units=si&callback=?", function(response) {
    temperatureC = parseFloat(response.currently.temperature);
    $('#weather').html("Weather: " + response.currently.summary);
    
    // change the weather icon according to the conditions 
    var skycons = new Skycons({"color": "black"});
    skycons.set("icon",response.currently.icon);
    
    // play icon animation
    skycons.play();
  }).then(getTemperatureC)
}

// write out temperature in unit celsius
var getTemperatureC = function () {
  var unitnode = " &deg;C";
  $('#temperature').html(temperatureC + " " + unitnode);
}

// write out temperature in unit fahrenheit
var getTemperatureF = function () {
  var unitnode = " &deg;F";
  $('#temperature').html(((temperatureC * 9/5) + 32).toFixed(2) + " " + unitnode);
}