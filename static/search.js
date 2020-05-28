var input = document.getElementById("searchInput");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});

var searchQuery;


var availableTags = [
    "Live Data",
    "Weather",
    "Logs",
    "Model",
    "Guides",
    "Log In"];

$(document).ready(function(){
  $("#searchInput").autocomplete({
      minLength: 0,
      delay: 0,
      source: availableTags,
      select: function(event, ui) {
        searchQuery = ui.item.label;
        updateSearch();
      }
  });
});

$(document).ready(function(){
  $("#searchInput").click(function() {
    $("#searchInput").autocomplete( "search", "" );
  })
});

$(document).ready(function(){
    $("#searchInput").on("keyup", function() {

        var value = $(this).val().toLowerCase();

        if(value == "guides" || value == "guide" || value == "help"){
            searchQuery = "Guides";
        }
        else if(value == "logs" || value == "log"){
            searchQuery = "Logs";
        }
        else if(value == "live data" || value == "data" || value == "live"){
            searchQuery = "Live Data";
        }
        else if(value == "home" || value == "model" || value == "predict"){
            searchQuery = "Home";
        }
        else if(value == "log in" || value == "login" || value == "signin" || value == "sign in"){
            searchQuery = "Log In";
        }
        else if(value == "weather data" || value == "weather" || value == "temperature" || value == "live weather"){
            searchQuery = "Weather";
        }
    });
});

function updateSearch(){

    if(searchQuery == "Guides"){
        window.location.href = "/guides"
    }
    else if(searchQuery == "Logs"){
        window.location.href = "/logs";
    }
    else if(searchQuery == "Live Data"){
        window.location.href = "/live";
    }
    else if(searchQuery == "Model"){
        window.location.href = "/home";
    }
    else if(searchQuery == "Log In"){
        window.location.href = "/login";
    }
    else if(searchQuery == "Weather"){
        window.location.href = "/weather";
    }
}
