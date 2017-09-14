(function(){
 	console.log("Login Linked");


 	// set enter as default for login button
	$(document).ready(function(){
	    $('#login_container').keypress(function(e){
	      if(e.keyCode==13)
	      	attemptLogin();
	    });
	});

 	// Login button
 	document.getElementById("login_button").onclick = function() {attemptLogin()};

 	// Register button
 	document.getElementById("register_button").onclick = function() {loadRegisterPage()};

 	// Retrieve Lost Credentials button
 	document.getElementById("retrieve_lost_credentials_button").onclick = function() {initiateCredentialRetrieval()};

	function loadRegisterPage() {

		loader.loadPage("html/common/register.html");
	}

	function attemptLogin() {

		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;

		session.login(username,password);
	}

 	function initiateCredentialRetrieval() {
 		alert("Herstel wagwoord");

 		// Redirect to new page here
 	}



})();