var userEmail;
var userPassword;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    userEmail = user.email;
    $("#loggedin").toast('show');
    document.getElementById('logDIV').innerHTML = "Hi, " + userEmail + "!";

  } else {
    // No user is signed in.
    $("#login").toast('show');
    document.getElementById('logDIV').innerHTML = "Log-In";
  }
});


$("#loginButton").on("click", function(evt) {
  evt.preventDefault();

  var email = $("#email_field").val();
  var password = $("#password_field").val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    document.getElementById('login_status').innerHTML = "<font color='red'>" + errorMessage + "</font>" ;
    // ...
  });
});

$("#logoutButton").on("click", function(evt) {
  $("#email_field").val('');
  $("#password_field").val('');
  firebase.auth().signOut();
});


function showsignup(){
  document.getElementById('signup_div').style.display = "flex";
  document.getElementById('login_div').style.display = "none";
  document.getElementById('wrapper_div').style.display = "none";
  document.getElementById('forgot_div').style.display = "none";
  document.getElementById('logDIV').innerHTML = "Sign-Up";
  document.getElementById('signup_status').innerHTML = "";
}


function showlogin(){
  document.getElementById('signup_div').style.display = "none";
  document.getElementById('login_div').style.display = "none";
  document.getElementById('wrapper_div').style.display = "flex";
  document.getElementById('forgot_div').style.display = "none";
  document.getElementById('login_status').innerHTML = "";
  document.getElementById('logDIV').innerHTML = "Log-In";
}

function showforgot(){
  document.getElementById('signup_div').style.display = "none";
  document.getElementById('login_div').style.display = "none";
  document.getElementById('wrapper_div').style.display = "none";
  document.getElementById('forgot_div').style.display = "flex";
  document.getElementById('logDIV').innerHTML = "Forgot";
}


function show(){
  var email = $("#email_field_signup").val();
  var password = $("#password_field_signup").val();

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('signup_status').innerHTML = "<font color='red'>" + errorMessage + "</font>" ;
    // ...
  });
}


$("#reset").on("click", function(evt) {
  evt.preventDefault();

  var emailAddress = $("#forgot_id").val();

  firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
    document.getElementById('forgot_status').innerHTML = "<font color='green'> Email Sent! ";
    $("#emailSend").toast('show');
    showlogin();
  }).catch(function(error) {
    document.getElementById('forgot_status').innerHTML = "<font color='red'> Email not Sent! Try Again!";
  });
});



















// var userName;
// var farmer_id;
// var key;
// var nameData;
// var idData;
//
// $(document).ready(function() {
// })
//
//
// function push(){
//   if( username==undefined || farmer_id==undefined ){
//     alert("Type details!");
//   }
//   else{
//     userName = $("#username").val();
//     farmer_id = $("#farmerid").val();
//
//     // firebase.database().ref('Users').push( userName );
//     // firebase.database().ref('FarmerID').push( farmer_id );
//
//     $("#username").val('');
//     $("#farmerid").val('');
//     $("#password").val('');
//
//     check();
//     location.href = "home.html";
//   }
// }
//
// $("#username").change(function() {
//   userName = $("#username").val();
// });
//
// $("#farmerid").change(function() {
//   farmer_id = $("#farmerid").val();
// });
//
//
// $("#loginButton").on("click", function(evt) {
//   evt.preventDefault();
//
//   push();
//
// });
