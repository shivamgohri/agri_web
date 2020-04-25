var input = document.getElementById("searchInput");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});

var searchQuery;

$(document).ready(function(){
    $("#searchInput").on("keyup", function() {
        
        var value = $(this).val().toLowerCase();
      
        if(value == "guides" || value == "guide" || value == "help"){
            searchQuery = "guides";
        }
        else if(value == "logs" || value == "log"){
            searchQuery = "logs";
        }
        else if(value == "live data" || value == "data" || value == "live"){
            searchQuery = "live data";
        }
        else if(value == "home" || value == "model" || value == "predict"){
            searchQuery = "home";
        }
        else if(value == "log in" || value == "login" || value == "signin" || value == "sign in"){
            searchQuery = "log in";
        }
    });
});

function updateSearch(){ 
    
    if(searchQuery == "guides"){
        location.href="guides.html";
    }
    else if(searchQuery == "logs"){
        location.href="logs.html";
    }
    else if(searchQuery == "live data"){
        location.href="live.html";
    }
    else if(searchQuery == "home"){
        location.href="home.html";
    }
    else if(searchQuery == "log in"){
        location.href="login.html";
    }
}
