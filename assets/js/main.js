

var infoWindow, map,places;
var markers = [];
var autocomplete;
var hostnameRegexp = new RegExp('^https?://.+?/');
var night_club_icon = "assets/images/night_club_icon.png"
var bar_icon = "assets/images/bar_icons.png"
var restaurant_icon = "assets/images/restaurant_icon.png"
var accomodation_icon = "assets/images/accomodation_icon.png"



function changeHeight(){
  document.getElementById("background-image-container").style.height = "100%";
}

// Display a warning message if the input field is blank.
function warningMessageOnInput() {
    $("#enter-city").html("");
    const location = $("#search-places").val();
    
    if (!location) {
        $("#enter-city").html(`<h3 class = "enter-input">Please enter a Location!</h3>`);
        
    }
    
    return;
}

// When the (Search) button is clicked if the input field is blank display warning message !
function warningMessageOnButtonClick() {
    let location = $("#search-places").val();
    if (!location) {
      document.getElementById("results").style.display = "none"
        $("#enter-city").html(`<h3 class = "enter-input">Please enter an Input!</h3>`);
        $("#map").removeClass("map")
        
        
    } else if (location) {
      document.getElementById("results").style.display = "inline-table"
        $("#map").addClass("map")
        
    }
    return;
    
}
// A button displayed on the map, when the button is triggered the Geolocation will be enabled.
function showLocation(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('button');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to show location';
    controlUI.style.height = '40px'
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = '<i class="fa fa-map-marker">';
    controlUI.appendChild(controlText);

    // Click event that will trigger the Geolocation!
    controlUI.addEventListener('click', function() {
      
        infoWindow = new google.maps.InfoWindow(document.getElementById("map"))
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                infoWindow.setPosition(pos);
                infoWindow.setContent('Your Location is Here');
                infoWindow.open(map);
                map.setCenter(pos);
                search()
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

    });

}

// Error handling for Geolocation.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function initMap() {
  
        //Night Mode set to default!
        const styledMapType = new google.maps.StyledMapType(
            [{
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#242f3e"
                    }]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#746855"
                    }]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#242f3e"
                    }]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#d59563"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#d59563"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#263c3f"
                    }]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#6b9a76"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#38414e"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#212a37"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#9ca5b3"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#746855"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#1f2835"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#f3d19c"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#2f3948"
                    }]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#d59563"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#17263c"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#515c6d"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "color": "#17263c"
                    }]
                }
            ], { name: 'Night Mode' });
            
        // Map.
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map'
                ]
            },
            scrollwheel:true
        });
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new showLocation(centerControlDiv, map);
        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

      
    


    const geocoder = new google.maps.Geocoder();
    const input = document.getElementById("search-places");
    autocomplete = new google.maps.places.Autocomplete(input);
    places = new google.maps.places.PlacesService(map);
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
      });

    // Converts addresses like (street address, city, town etc ) into geographic coordinates (like latitude and longitude).
    
    const address = document.getElementById('search-places').value;
    
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.fitBounds(results[0].geometry.viewport);
            search(geocoder) 
        } else if (!address) {
            $("#enter-city").html(`<h3 class = "enter-input">Please enter an Input!</h3>`);

        }
         else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
})


}

function search() {
  const inputSelectGroop = document.getElementById("input-select-group").value;
  if (inputSelectGroop == 3){
    var search = {
      bounds: map.getBounds(),
      types: ['lodging']
    };
}
else if (inputSelectGroop == 1){
  var search = {
    bounds: map.getBounds(),
    types: ['restaurant']
  };
}
else if (inputSelectGroop == 2 ){
  var search = {
    bounds: map.getBounds(),
    types: ['bar']
  };
}
else if (inputSelectGroop == 4){
  var search = {
    bounds: map.getBounds(),
    types: ["night_club"]
  };
}
else {
  
  if (inputSelectGroop == "Choose..."){ 
    $("#enter-city").html(`<h3 class = "enter-input">Please enter a Accomodation!</h3>`);
    $("#map").removeClass("map")
    document.getElementById("background-image-container").style.height = "100vh";
    document.getElementById("results").style.display = "none"
    
  }
  

}

    places.nearbySearch(search, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearResults();
        clearMarkers();
        // Create a marker for each place found
        for (var i = 0; i < results.length; i++) {
          // Use marker animation to drop the icons incrementally on the map.
          
            markers[i] = new google.maps.Marker({
              position: results[i].geometry.location,
              animation: google.maps.Animation.DROP,
              icon:null
            });
            // If the user clicks on a marker, show the details of that place
          // in an info window.
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], 'click', showInfoWindow);
          setTimeout(dropMarker(i), i * 100);
          addResult(results[i], i);
          
            if (inputSelectGroop == 3){
              markers[i].icon = accomodation_icon
            }
            else if (inputSelectGroop == 1){
              markers[i].icon = restaurant_icon
            }
            else if (inputSelectGroop == 2) {
              markers[i].icon = bar_icon
            }
            else {
              if(inputSelectGroop == 4){
                markers[i].icon = night_club_icon
              }
            }
          
          
          
        }
      }

      
    });
    
  }
  
  


  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
  }

  function dropMarker(i) {
    return function() {
      markers[i].setMap(map);
    };
  }
  function addResult(result, i) {
    
    var results = document.getElementById('results');
    

    var div = document.createElement('div');
    div.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    div.onclick = function() {
      google.maps.event.trigger(markers[i], 'click');
      
    };
    
    var iconTd = document.createElement('div');
    var nameTd = document.createElement('div');
    var icon = document.createElement('img');
    const inputSelectGroop = document.getElementById("input-select-group").value;
    if (inputSelectGroop == 3){
      icon.src = accomodation_icon
    }
    else if (inputSelectGroop == 1){
      icon.src = restaurant_icon
    }
    else if (inputSelectGroop == 2) {
     icon.src = bar_icon
    }
    
     else {if(inputSelectGroop == 4){
        icon.src = night_club_icon
      }
    }
    div.setAttribute("class","listContainer")
    div.setAttribute("class","listContainer")
    div.setAttribute("id","listContainer")
    div.setAttribute("idName","listContainer")
    nameTd.setAttribute("class","locationNameContainer")
    nameTd.setAttribute("className","locationNameContainer")
    iconTd.setAttribute("class","placeContainer")
    iconTd.setAttribute("className","placeContainer")
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    div.appendChild(iconTd);
    div.appendChild(nameTd);
    results.appendChild(div);
    
  }

  function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
      results.removeChild(results.childNodes[0]);
    }
  }
// Get the place details for a hotel. Show the information in an info window,
      // anchored on the marker that the user selected.
      function showInfoWindow() {
        var marker = this;
        places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              buildIWContent(place);
            });
      }

      function buildIWContent(place) {
        document.getElementById('iw-icon').innerHTML = '<img class="place_icon" ' +
            'src="' + place.icon + '"/>';
        document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
            '">' + place.name + '</a></b>';
        document.getElementById('iw-address').textContent = place.vicinity;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
              place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }

        // Assign a five-star rating to the place, using a black star ('&#10029;')
        // to indicate the rating the place has earned, and a white star ('&#10025;')
        // for the rating points not achieved.
        if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              ratingHtml += '&#10025;';
            } else {
              ratingHtml += '&#10029;';
            }
          document.getElementById('iw-rating-row').style.display = '';
          document.getElementById('iw-rating').innerHTML = ratingHtml;
          }
        } else {
          document.getElementById('iw-rating-row').style.display = 'none';
        }

        // The regexp isolates the first part of the URL (domain plus subdomain)
        // to give a short URL for displaying in the info window.
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        } else {
          document.getElementById('iw-website-row').style.display = 'none';
        }
      }



//Pressing Enter will trigger the Search Button.
function triggerSearchOnEnter(){
const input = document.getElementById("search-places");
input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("button").click();
    }
});
}



$(document).ready(warningMessageOnInput)
$(document).ready(triggerSearchOnEnter)
$(document).ready(initMap)

