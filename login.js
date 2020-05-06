var userName;
var farmer_id;

$(document).ready(function() {
  check(userName);
})

function check(){
  if(userName!="none"){
    document.getElementById('logDIV').innerHTML = '';
    document.getElementById('logDIV').innerHTML = "Log In";
  }
  else{
    document.getElementById('logDIV').innerHTML = '';
    document.getElementById('logDIV').innerHTML = "Hi, " + userName + "!";
  }
}

$("#loginButton").on("click", function(evt) {
  evt.preventDefault();
  userName = $("#username").val();
  farmer_id = $("#farmerid").val();
  isloggedin = true;
  location.href="home.html";
  check(userName);
});
