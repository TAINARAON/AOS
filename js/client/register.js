var USERNAME = 0;
var PASSWORD = 1;
var PASSWORD2 = 2;
var INITIALS = 3;
var PREFERRED_NAME = 4;
var SURNAME = 5;
var EMAIL = 6;
var ID_NUMBER = 7;
var CONTACT_NUMBER = 8;

var inputArray = [false,false,false,false,false,false,false,false,false];

function validateUsername(input) {

	inputArray[USERNAME] = (input != "") ? input : false;
}
function validatePassword(input) {
	
	inputArray[PASSWORD] = (input != "") ? input : false;
}
function validateConfirmPassword(input) {

	if(inputArray[PASSWORD] == false) {
		
		$('#client_register_confirm_password_input').val('');
		util.createNotification('Complete password field first','warning');

	} else if(inputArray[PASSWORD] != input) {

		$('#client_register_confirm_password_input').val('');
		util.createNotification('passwords do not match','warning');

	} else {

		inputArray[PASSWORD2] = (input != "") ? input : false;
	}
}
function validateEmail(input) {

	inputArray[EMAIL] = (input != "") ? input : false;
}
function validateIdNumber(input) {

	inputArray[ID_NUMBER] = (input != "") ? input : false;
}
function validateContactNumber(input) {

	inputArray[CONTACT_NUMBER] = (input != "") ? input : false;
}
function validatePreferredName(input) {

	inputArray[PREFERRED_NAME] = (input != "") ? input : false;
}
function validateInitials(input) {

	inputArray[INITIALS] = (input != "") ? input : false;
}
function validateSurname(input) {
	
	inputArray[SURNAME] = (input != "") ? input : false;
}

// Username Input Change
$( document ).on( 'change', '#client_register_username_input', function( e ) {
	validateUsername($(this).val());
});

// Password Input Change
$( document ).on( 'change', '#client_register_password_input', function( e ) {
	validatePassword($(this).val());
});

// Confirm Password Input Change
$( document ).on( 'change', '#client_register_confirm_password_input', function( e ) {
	validateConfirmPassword($(this).val());
});

// Email Input Change
$( document ).on( 'change', '#client_register_email_input', function( e ) {
	validateEmail($(this).val());
});

// ID Number Input Change
$( document ).on( 'change', '#client_register_id_number_input', function( e ) {
	validateIdNumber($(this).val());
});

// Contact Number Input Change
$( document ).on( 'change', '#client_register_contact_number_input', function( e ) {
	validateContactNumber($(this).val());
});

// Preferred Name Input Change
$( document ).on( 'change', '#client_register_preferred_name_input', function( e ) {
	validatePreferredName($(this).val());
});

// Surname Input Change
$( document ).on( 'change', '#client_register_surname_input', function( e ) {
	validateSurname($(this).val());
});

// Initials Input Change
$( document ).on( 'change', '#client_register_initials_input', function( e ) {
	validateInitials($(this).val());
});

// Submit button clicked
$( document ).on( 'click', '#client_register_submit_button', function ( e ) {
    
	for(var i =0; i < inputArray.length; i++) {
		if(inputArray[i] == false) {
			notifyUserOfInvalidField(i);
			return;
		}
	}

	onSubmitClientDetails();
}); 

function notifyUserOfInvalidField(invalidFieldIndex) {
	alert("Field " + invalidFieldIndex + " is invalid." );
}

function onSubmitClientDetails() {

	var clientDetails = 
	{
		'preferredName':inputArray[PREFERRED_NAME],
		'surname':inputArray[SURNAME],
		'initials':inputArray[INITIALS],
		'email':inputArray[EMAIL],
		'idNumber':inputArray[ID_NUMBER],
		'contactNumber':inputArray[CONTACT_NUMBER],
		'userame':inputArray[USERNAME],
		'password':inputArray[PASSWORD]
	};

	util.displayUploadFileModal(clientDetails,submitClientDetailsWithFiles);

	
}

function submitClientDetailsWithFiles(result, clientDetails) {

	var requestObject = {
		'clientDetails':clientDetails,
		'files':result
	};

	clientController.createClient(onCreateClientSuccess,onCreateClientFailure,requestObject);
}

function onCreateClientSuccess(response) {
	util.createNotification('Successfully registered. \n Please wait for email verification.');
	loader.load();
}

function onCreateClientFailure(response) {
	util.createNotification('Failed to log in','error');
}
