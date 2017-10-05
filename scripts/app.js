// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  var geoQuakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
    var $resultsDiv = $('div#results');
    initMap();
  //geoQuakes is defined in the variable, so no need to repaste entire url
    $.ajax({
      url: geoQuakes,
      method: 'GET',
      success: showQuakes,
      error: noQuakes
    })
});

var placeMarker = function(earthquake) {
if (earthquake >= 6.0) {
  console.log(earthquake);
  return "images/earthquake.png";
} else  {
  console.log("i'm in wrestler-homewrecker");
  return "images/wrestler-homewrecker.jpg";
}}

function markQuake(position, map, magnitude){
  console.log('Hey there');
  var icon={
    url: placeMarker(magnitude),
    scaledSize: new google.maps.Size(50,50)
  }
  var pin = new google.maps.Marker({
    position: position,
    map: map,
    icon: icon

  });
}

// callback is showQuakes
function showQuakes(quakes) {
  console.log(quakes);
  //to show each quake, you must use a forEach
  //to display properties, use parameterName.properties.title
    //use parameter name, followed by what you are searching for and the next division
    //loop through parameter.whatYouAreLookingFor.Iterator(function)
  quakes.features.forEach(function (quake) {
    console.log(quake.properties.title);
    var p = `<p>${quake.properties.title}</p>`
    $("#results").append(p);
    console.log(quake.geometry.coordinates);
    var c = `<p>${quake.geometry.coordinates}</p>`
    $("#results").append(c);
    var m = quake.properties.mag
    markQuake({lat: quake.geometry.coordinates[1], lng: quake.geometry.coordinates[0]}, map, m);
  });
}

function noQuakes(err) {
  console.log(err);
}

//ajax requests always have the following syntax $.ajax({ infomation placed here})
//ajax requests always have a parameter

  // <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg"></script>


function initMap() {
  console.log("inside initMap");
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 3
  });
}
