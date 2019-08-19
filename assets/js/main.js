//Google's Autocomplete API.
function searchPlaces() {
    var input = document.getElementById("search-places")
    var autocomplete = new google.maps.places.Autocomplete(input);
}

// Display a warning message if the input field is blank.
function displayMessage() {
    $("#enter-city").html("");
    var location = $("#search-places").val();
    var places = $("#inputGroupSelect01").val();
    if (!location) {
        $("#enter-city").html(`<h3 class = "enter-input">Please enter a City!</h3>`);
        return;
    }

}
// When the (Search) button is clicked if the input field is blank display warning message otherwise display the Map.
function displayMap() {
    var map, infoWindow;
    var location = $("#search-places").val();
    if (!location) {
        $("#enter-city").html(`<h3 class = "enter-input">Please enter an Input!</h3>`);
    } else {
        $("#map").addClass("map")
        $("#map").html(
            `<div id = "loader">
          <img src = "assets/images/loader.gif" class = "loader" alt = "Loading..."/>
      </div>`
        );
        // Google Maps loaded centered in London.
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: {
                lat: 51.5074,
                lng: 0.1278,
            }
        })

    }
    // Geolocation on the map .
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}


// Error handling for Geolocation.
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



$(document).ready(displayMessage)
$(document).ready(searchPlaces)