$().ready(function(){

	setDefaultOnEnterButton();

 	$('#login_button').on('click',function(){
 		attemptLogin();
 	});

 	$('#register_button').on('click',function(){
 		loadRegisterPage();
 	});

 	$('#retrieve_lost_credentials_button').on('click',function(){
 		initiateCredentialRetrieval()
 	});
});

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

function setDefaultOnEnterButton() {
	$('#login_container').keypress(function(e){
	    if(e.keyCode==13)
	      attemptLogin();
		});
}