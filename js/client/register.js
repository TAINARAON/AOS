var USERNAME = {'index':0,'displayName':'User Name'};
var PASSWORD = {'index':1,'displayName':'Password'};
var PASSWORD2 = {'index':2,'displayName':'Confirm Password'};
var INITIALS = {'index':3,'displayName':'Initials'};
var PREFERRED_NAME = {'index':4,'displayName':'Preferred Name'};
var SURNAME = {'index':5,'displayName':'Surname'};
var EMAIL = {'index':6,'displayName':'Email'};
var ID_NUMBER = {'index':7,'displayName':'ID Number'};
var CONTACT_NUMBER = {'index':8,'displayName':'Contact Number'};

var inputArray = [false,false,false,false,false,false,false,false,false];

function validateUsername(input) {

	inputArray[USERNAME.index] = (input != "") ? input : false;
}
function validatePassword(input) {
	
	inputArray[PASSWORD.index] = (input != "") ? input : false;
}
function validateConfirmPassword(input) {

	if(inputArray[PASSWORD.index] == false) {	
		
		$('#client_register_confirm_password_input').val('');
		util.createNotification('Please complete thepassword field first','warn');

	} else if(inputArray[PASSWORD.index] != input) {

		$('#client_register_confirm_password_input').val('');
		util.createNotification('Confirmation Password does not match','warn');

	} else {

		inputArray[PASSWORD2.index] = (input != "") ? input : false;
	}
}
function validateEmail(input) {

	inputArray[EMAIL.index] = (input != "") ? input : false;
}
function validateIdNumber(input) {

	inputArray[ID_NUMBER.index] = (input != "") ? input : false;
}
function validateContactNumber(input) {

	inputArray[CONTACT_NUMBER.index] = (input != "") ? input : false;
}
function validatePreferredName(input) {

	inputArray[PREFERRED_NAME.index] = (input != "") ? input : false;
}
function validateInitials(input) {

	inputArray[INITIALS.index] = (input != "") ? input : false;
}
function validateSurname(input) {
	
	inputArray[SURNAME.index] = (input != "") ? input : false;
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
	util.createNotification('Please complete all the fields','error');
}

function onSubmitClientDetails() {

	var clientDetails = 
	{
		'preferredName':inputArray[PREFERRED_NAME.index],
		'surname':inputArray[SURNAME.index],
		'initials':inputArray[INITIALS.index],
		'email':inputArray[EMAIL.index],
		'idNumber':inputArray[ID_NUMBER.index],
		'contactNumber':inputArray[CONTACT_NUMBER.index],
		'userame':inputArray[USERNAME.index],
		'password':inputArray[PASSWORD.index]
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
	util.createNotification('Successfully registered. \n Verification email sent.');
	loader.load();
}

function onCreateClientFailure(response) {
	util.createNotification('Failed to log in','error');
}
