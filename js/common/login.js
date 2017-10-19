$().ready(function(){

	setDefaultOnEnterButton();

 	$('#login_button').on('click',function(){
 		attemptLogin();
 	});

 	$('#register_as_client_button').on('click',function(){
 		loader.loadPage("html/client/register.html");
 	});

 	$('#register_brokerage_button').on('click',function(){
 		loader.loadPage("html/brokerAdmin/brokerage/registerBrokerage.html");
 	});

 	$('#retrieve_lost_credentials_button').on('click',function(){
 		initiateCredentialRetrieval()
 	});
});

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