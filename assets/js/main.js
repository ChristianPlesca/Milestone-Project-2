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
        $(document).ready(function() {
            var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: {
                    lat: 51.5074,
                    lng: 0.1278,
                }
            })
        })

    }
}

$(document).ready(displayMessage)
$(document).ready(searchPlaces)