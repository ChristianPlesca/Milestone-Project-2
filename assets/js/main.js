

var infoWindow, map,places;
var markers = [];
var autocomplete;
var hostnameRegexp = new RegExp('^https?://.+?/');
var night_club_icon = "assets/images/night_club_icon.png"
var bar_icon = "assets/images/bar_icons.png"
var restaurant_icon = "assets/images/restaurant_icon.png"
var accomodation_icon = "assets/images/accomodation_icon.png"

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
  const location = $("#search-places").val();
  $("#enter-city").html("");
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
       
        
    });
   
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    
    

    infoWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-content')
    });
    
    places = new google.maps.places.PlacesService(map);
    autocomplete = new google.maps.places.Autocomplete((
      document.getElementById('search-places')));
      
  
    let geocoder = new google.maps.Geocoder();
    document.getElementById('button').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  })
}

// Converts addresses like (street address, city, town etc ) into geographic coordinates (like latitude and longitude).
function geocodeAddress(geocoder) {
  const address = document.getElementById('search-places').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      map.fitBounds(results[0].geometry.viewport);
      
      search()
    } else {
      $("#enter-city").html(`<h3 class = "enter-input">Please enter an Valid Location!</h3>`);
      $("#map").removeClass("map")
      document.getElementById("background-image-container").style.height = "100vh"
    }
  });
}

// Sets the image background container to Height 100%
function changeHeight(){
  document.getElementById("background-image-container").style.height = "100%";
}

  

function search() {
  // Get data from the desired location. 
  const inputSelectGroop = document.getElementById("input-select-group").value;
  if (inputSelectGroop == 3){
    var search = {
      bounds: map.getBounds(),
      types: ['lodging'],
      
    };
}
else if (inputSelectGroop == 1){
  var search = {
    bounds: map.getBounds(),
    types: ['restaurant'],
    
  };
}
else if (inputSelectGroop == 2 ){
  var search = {
    bounds: map.getBounds(),
    types: ['bar'],
    
  };
}
else if (inputSelectGroop == 4){
  var search = {
    bounds: map.getBounds(),
    types: ["night_club"]
  };
}

  
 else { if(inputSelectGroop == "Choose..."){
  $("#enter-city").html("");
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
          // Set icons for markers on the map 
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
  function addResult(result, i,) {
   
    // Add results (image of the place,rating ,name etc) to the individual div 
    const results = document.getElementById('results');
    let div = document.createElement('div');
    // On click trigger the marker on the map with an info window about the place 
    div.onclick = function() {
      google.maps.event.trigger(markers[i], 'click');
      // Scroll top, show info of the place that was selected 
      $("html, body").animate({ scrollTop : 232 }, "fast");
    };
    
    let iconContainer = document.createElement('div');
    let nameContainer = document.createElement('div');
    let icon = document.createElement('img');
    let photo = result.photos[0].getUrl({'maxWidth' : 550,'maxHeight' : 500})
    
    let name = document.createTextNode(result.name);
    icon.setAttribute('src',photo );
    results.setAttribute("class","results")
    results.setAttribute("className", "results")
    div.setAttribute("class","listContainer")
    div.setAttribute("className","listContainer")
    div.setAttribute("id","listContainer")
    div.setAttribute("idName","listContainer")
    nameContainer.setAttribute("class","locationNameContainer")
    nameContainer.setAttribute("className","locationNameContainer")
    iconContainer.setAttribute("class","placeContainer")
    iconContainer.setAttribute("className","placeContainer")
    iconContainer.setAttribute("id","placeContainer")
    iconContainer.setAttribute("idName","placeContainer")
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    
    
    iconContainer.appendChild(icon);
    nameContainer.appendChild(name);
    div.appendChild(iconContainer); 
    div.appendChild(nameContainer);
    results.appendChild(div);
  
  }

  
  

  function clearResults() {
    const results = document.getElementById('results');
    while (results.childNodes[0]) {
      results.removeChild(results.childNodes[0]);
    }
  }
// Get the place details for a place. Show the information in an info window,
      // anchored on the marker that the user selected.
      function showInfoWindow() {
        
        let marker = this;
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
        document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
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



$(document).ready(warningMessageOnInput)
$(document).ready(triggerSearchOnEnter)





