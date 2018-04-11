var myMap;
  var marker1;
  var marker2;
  var marker3;
  var marker4;
  var geoJSON;
  var request;
  var gettingData = false;
  var openWeatherMapKey = "b93f0214e63748be2fedba711c6f1709"
  function initMap() {

    var myStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#a9eeff"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#5cb4c7"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ecff9b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#75e7ff"
        }
      ]
    },
    {
      "featureType": "transit.station.airport",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#c19dff"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#bbe9de"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];

    var mapOptions = {
      center: {
        lat: 28.5728722, 
        lng: -80.6489808
      },
      zoom: 12,
      styles: myStyles
    };
    myMap = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    // Add interaction listeners to make weather requests
    google.maps.event.addListener(myMap, 'idle', checkIfDataRequested);
    // Sets up and populates the info window with details
    myMap.data.addListener('click', function(event) {
      infowindow.setContent(
       "<img src=" + event.feature.getProperty("icon") + ">"
       + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
       + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
       + "<br />" + event.feature.getProperty("weather")
       );
      infowindow.setOptions({
          position:{
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          },
          pixelOffset: {
            width: 0,
            height: -15
          }
        });
      infowindow.open(myMap);
    });

    // marker for kennedy space marker
  marker1 = new google.maps.Marker({
    position: {
      lat: 28.572872, 
      lng: -80.6489808,
    },
    map: myMap,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: 'Kennedy Space Center',
    icon: 'img/satellite.png'
  });
  // marker1.addListener('click', toggleBounce);

  // marker for best landing space
  marker2 = new google.maps.Marker({
    position: {
      lat: 28.614458, 
      lng: -80.694108,
    },
    map: myMap,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: 'img/landing.png'
  });
  marker2.addListener('click', toggleBounce);

  // marker for best landing space
  marker3 = new google.maps.Marker({
    position: {
      lat: 27.652590, 
      lng: -81.350927,
    },
    map: myMap,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: 'img/landing.png'
  });
  marker3.addListener('click', toggleBounce);

  // marker for best landing space
  marker4 = new google.maps.Marker({
    position: {
      lat: 28.488672, 
      lng: -80.572824,
    },
    map: myMap,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: 'img/landing.png'
  });
  marker4.addListener('click', toggleBounce);
  }

function toggleBounce() {

    if (marker2.getAnimation() !== null) {
        marker2.setAnimation(null);
    } else {
        marker2.setAnimation(google.maps.Animation.BOUNCE);
    }

    if (marker3.getAnimation() !== null) {
        marker3.setAnimation(null);
    } else {
        marker3.setAnimation(google.maps.Animation.BOUNCE);
    }

    if (marker4.getAnimation() !== null) {
        marker4.setAnimation(null);
    } else {
        marker4.setAnimation(google.maps.Animation.BOUNCE);
    }
}

  var checkIfDataRequested = function() {
    // Stop extra requests being sent
    while (gettingData === true) {
      request.abort();
      gettingData = false;
    }
    getCoords();
  };
  // Get the coordinates from the Map bounds
  var getCoords = function() {
    var bounds = myMap.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
  };
  // Make the weather request
  var getWeather = function(northLat, eastLng, southLat, westLng) {
    gettingData = true;
    var requestString = "https://api.openweathermap.org/data/2.5/box/city?bbox="
                        + westLng + "," + northLat + "," //left top
                        + eastLng + "," + southLat + "," //right bottom
                        + myMap.getZoom()
                        + "&cluster=yes&format=json"
                        + "&APPID=" + openWeatherMapKey;
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
  };
  // Take the JSON results and proccess them
  var proccessResults = function() {
    console.log(this);
    var results = JSON.parse(this.responseText);
    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
          geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        drawIcons(geoJSON);
    }
  };
  var infowindow = new google.maps.InfoWindow();
  // For each result that comes back, convert the data to geoJSON
  var jsonToGeoJson = function (weatherItem) {
    var feature = {
      type: "Feature",
      properties: {
        city: weatherItem.name,
        weather: weatherItem.weather[0].main,
        temperature: weatherItem.main.temp,
        min: weatherItem.main.temp_min,
        max: weatherItem.main.temp_max,
        humidity: weatherItem.main.humidity,
        pressure: weatherItem.main.pressure,
        windSpeed: weatherItem.wind.speed,
        windDegrees: weatherItem.wind.deg,
        windGust: weatherItem.wind.gust,
        icon: "http://openweathermap.org/img/w/"
              + weatherItem.weather[0].icon  + ".png",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      },
      geometry: {
        type: "Point",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      }
    };
    // Set the custom marker icon
    myMap.data.setStyle(function(feature) {
      return {
        icon: {
          url: feature.getProperty('icon'),
          anchor: new google.maps.Point(25, 25)
        }
      };
    });
    // returns object
    return feature;
  };
  // Add the markers to the map
  var drawIcons = function (weather) {
     myMap.data.addGeoJson(geoJSON);
     // Set the flag to finished
     gettingData = false;
  };
  // Clear data layer and geoJSON
  var resetData = function () {
    geoJSON = {
      type: "FeatureCollection",
      features: []
    };
    myMap.data.forEach(function(feature) {
      myMap.data.remove(feature);
    });
  };
  google.maps.event.addDomListener(window, 'load', initMap);

// --------Begin Openweather API------------
/**
 * Fetch API data
 */
function getAPIdata() {
  
  var url = "https://api.openweathermap.org/data/2.5/forecast";
  var apiKey ="b93f0214e63748be2fedba711c6f1709";
  var city = "florida";

  //Test OWM weaterlayers
  //var weatherLayer = "https://tile.openweathermap.org/map/{clouds_new}/10/5/5.png?appid={b93f0214e63748be2fedba711c6f1709}";

  // construct request
  var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;
  
  // get weather forecast
  fetch(request)

  // parse to JSON format
  .then(function(response) {
    return response.json();
  })
  
  // render weather per day
  .then(function(response) {

    // render weatherCondition
    onAPISucces(response);
  })
  
  // catch error
  .catch(function (error) {
    // onAPIError();
    console.error('Request failed', error);
  });
}

/**
 * Render weather listing
 */
function onAPISucces(response) {

  var weatherList = response.list;
  var weatherBox = document.getElementById('weather');

  for(var i=0; i< weatherList.length; i++){
    //console.log(weatherList[i].main.temp - 273.15);

    var dateTime = new Date(weatherList[i].dt_txt);
    var date = formDate(dateTime);
    var time = formTime(dateTime);
    var temp = Math.floor(weatherList[i].main.temp - 273.15);
    var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

    forecastMessage =  '<div class="forecastMoment">';
    forecastMessage +=   '<div class="date"> '+date+' </div>';
    forecastMessage +=   '<div class="time"> '+ time +' </div>';
    forecastMessage +=   '<div class="temp"> '+temp+'&#176;C </div>';
    forecastMessage +=   '<div class="icon"> <img src="'+iconUrl+'"> </div>';
    forecastMessage += '</div>';

    weatherBox.innerHTML += forecastMessage;
  }
}

/**
 * Error
 */
function updateUIError() {
  var weatherBox = document.getElementById('weather');
  weatherBox.className = 'hidden'; 
}

/**
 * Format date
 */
function formDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return day +'/'+ month;
}

/**
 * Format time
 */
function formTime(date) {
  var hours = date.getHours();
  if(hours<10){
    hours = '0'+hours;
  }
  var minutes = date.getMinutes();
  if(minutes < 10){
    minutes = '0'+ minutes;
  }
  return hours +':'+ minutes;
}

// init data stream
getAPIdata();