(function(){
 	console.log("Login Linked");

 	var failedLoginAttemptsCount = 0;


 	// Login button
 	document.getElementById("login_button").onclick = function() {attemptLogin()};

 	// Register button
 	document.getElementById("register_button").onclick = function() {loadRegisterPage()};

 	// Retrieve Lost Credentials button
 	document.getElementById("retrieve_lost_credentials_button").onclick = function() {initiateCredentialRetrieval()};

	function loadRegisterPage() {

		$("#container").load("html/common/register.html");
	}

	function attemptLogin() {

		displayLoadingImage(1000 + (failedLoginAttemptsCount * 1000));

		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;

		if(loginDatailsAreValid(username,password)) {

			login(username,password);
		} else {

			failedLoginAttempt();
		}
	}

	function failedLoginAttempt(data) {
		failedLoginAttemptsCount++;
		notifyUserOfInvalidCredentials();
	}

	function notifyUserOfInvalidCredentials() {

		// TODO
	}

	function loginDatailsAreValid(username, password) {
		
		return (usernameIsValid(username) && passwordIsValid(password));
	}

	function usernameIsValid(username) {
		// TODO
		return 1;
	}

	function passwordIsValid(password) {
		// TODO
		return 1;
	}

	function displayLoadingImage(duration) {

		// TODO
	}

 	function login(username,password) {

 		var encryptedPassword = encryptPassword(password);

 		var successCallbackFunction  = loadLandingPageOfRole;
 		var failureCallbackFunction  = failedLoginAttempt;
 		
 		// TODO
 		// Do server call here
 		alert("logging in");
 	}

 	function loadLandingPageOfRole(data) {
 		// TODO
 	}

 	function encryptPassword(password) {
 		// TODO
 		// do mda5 encryption or whatever is strong enough for us
 		return password;
 	}

 	function initiateCredentialRetrieval() {
 		alert("Herstel wagwoord");

 		// Redirect to new page here
 	}

})();