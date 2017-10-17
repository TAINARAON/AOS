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

	var username = $('#login_username').val();
	var password =  $('#login_password').val();

	session.login(username,password);
}

function initiateCredentialRetrieval() {
	
	alert("Herstel wagwoord");

	// TODO
}

function setDefaultOnEnterButton() {
	$('#login_container').keypress(function(e){
	    if(e.keyCode==13)
	      attemptLogin();
		});
}