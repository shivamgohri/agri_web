var userName;
var farmer_id;
var key;
var nameData;
var idData;

$(document).ready(function() {
  check();
})

function check(){

  var nameRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/Users.json", function(json){
      nameData = json;
  });

  var idRequest = $.getJSON("https://smart-agriculture-deloitte.firebaseio.com/FarmerID.json", function(json){
      idData = json;
  });

  $.when(nameRequest, idRequest).then(function() {
    userName = nameData[nameData.length-1]
    document.getElementById('logDIV').innerHTML = "Hi, " + userName + "!";
  });

}


function push(){
  if( username==undefined || farmer_id==undefined ){
    alert("Type details!");
  }
  else{
    userName = $("#username").val();
    farmer_id = $("#farmerid").val();

    // firebase.database().ref('Users').push( userName );
    // firebase.database().ref('FarmerID').push( farmer_id );

    $("#username").val('');
    $("#farmerid").val('');
    $("#password").val('');

    check();
    location.href = "home.html";
  }
}

$("#username").change(function() {
  userName = $("#username").val();
});

$("#farmerid").change(function() {
  farmer_id = $("#farmerid").val();
});


$("#loginButton").on("click", function(evt) {
  evt.preventDefault();

  push();

});
