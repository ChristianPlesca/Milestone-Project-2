let infoWindow, map;
//Google's Autocomplete API.
function searchPlaces() {
    const input = document.getElementById("search-places")
    const autocomplete = new google.maps.places.Autocomplete(input);
}

// Display a warning message if the input field is blank.
function warningMessageOnInput() {
    $("#enter-city").html("");
    const location = $("#search-places").val();

    if (!location) {
        $("#enter-city").html(`<h3 class = "enter-input">Please enter a City!</h3>`);
        return;
    }
}

// When the (Search) button is clicked if the input field is blank display warning message !
function warningMessageOnButtonClick() {
    let location = $("#search-places").val();
    if (!location) {
        $("#enter-city").html(`<h3 class = "enter-input">Please enter an Input!</h3>`);
    } else {
        $("#map").html(
            `<div id = "loader">
          <img src = "assets/images/loader.gif" class = "loader" alt = "Loading..."/>
      </div>`

        );
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
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

    });

}


function initMap() {
    $("#button").click(function() {
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
            }
        });
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new showLocation(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    });


    let geocoder = new google.maps.Geocoder();
    const input = document.getElementById("search-places");

    //Pressing Enter will trigger the Search Button.
    input.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementById("button").click();
        }
    });

    $("#button").on('click', function() {
        geocodeAddress(geocoder, map);
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


// Converts addresses like (street address, city, town etc ) into geographic coordinates (like latitude and longitude).
function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById('search-places').value;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.fitBounds(results[0].geometry.viewport);
        } else if (!address) {
            $("#enter-city").html(`<h3 class = "enter-input">Please enter an Input!</h3>`);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}




$(document).ready(searchPlaces)
$(document).ready(initMap)
$(document).ready(warningMessageOnInput)