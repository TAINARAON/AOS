var USERNAME = 0;
var PASSWORD = 1;
var PASSWORD2 = 2;
var EMAIL = 3;
var BROKERAGE_NAME = 4;
var BROKERAGE_EMAIL = 5;
var BROKERAGE_CONTACT_PERSON = 6;
var BROKERAGE_CONTACT_NUMBER = 7;
var FSP_NUMBER = 8;

var inputArray = [false,false,false,false,false,false,false,false,false];

function validateUsername(input) {
	
	inputArray[USERNAME] = input == "" ? false : input;
}
function validatePassword(input) {
	
	inputArray[PASSWORD] = input == "" ? false : input;
}
function validateConfirmPassword(input) {
	
	if(input == "") {

		inputArray[PASSWORD2] = false;

	} else if(inputArray[PASSWORD] == false) {

		$('#broker_register_confirm_password_input').val("");
		inputArray[PASSWORD2] = false;
		util.createNotification('Please enter a password','error');

	} else if(inputArray[PASSWORD] != input) {

		$('#broker_register_confirm_password_input').val("");
		inputArray[PASSWORD2] = false;
		util.createNotification('Passwords do not match','error');

	} else {

		inputArray[PASSWORD2] = true;
	}
}
function validateEmail(input) {
	
	inputArray[EMAIL] = input == "" ? false : input;
}
function validateBrokerageName(input) {
	
	inputArray[BROKERAGE_NAME] = input == "" ? false : input;
}
function validateBrokerageEmail(input) {
	
	inputArray[BROKERAGE_EMAIL] = input == "" ? false : input;
}
function validateBrokerageContactPerson(input) {
	
	inputArray[BROKERAGE_CONTACT_PERSON] = input == "" ? false : input;
}
function validateBrokerageContactNumber(input) {
	
	inputArray[BROKERAGE_CONTACT_NUMBER] = input == "" ? false : input;
}
function validateFspNumber(input) {
	
	inputArray[FSP_NUMBER] = input == "" ? false : input;
}

// Username Input Change
$( document ).on( 'change', '#broker_register_username_input', function( e ) {
	validateUsername($(this).val());
});

// Password Input Change
$( document ).on( 'change', '#broker_register_password_input', function( e ) {
	validatePassword($(this).val());
});

// Confirm Password Input Change
$( document ).on( 'change', '#broker_register_confirm_password_input', function( e ) {
	validateConfirmPassword($(this).val());
});

// Email Input Change
$( document ).on( 'change', '#broker_register_email_input', function( e ) {
	validateEmail($(this).val());
});

// Brokerage Name Input Change
$( document ).on( 'change', '#broker_register_brokerage_name_input', function( e ) {
	validateBrokerageName($(this).val());
});

// Brokerage Email Input Change
$( document ).on( 'change', '#broker_register_brokerage_email_input', function( e ) {
	validateBrokerageEmail($(this).val());
});

// Brokerage Contact Person Input Change
$( document ).on( 'change', '#broker_register_brokerage_contact_person_input', function( e ) {
	validateBrokerageContactPerson($(this).val());
});

// Brokerage Contact Number Input Change
$( document ).on( 'change', '#broker_register_brokerage_contact_number_input', function( e ) {
	validateBrokerageContactNumber($(this).val());
});

// Fsp Number Input Change
$( document ).on( 'change', '#broker_register_fsp_number_input', function( e ) {
	validateFspNumber($(this).val());
});

// Submit button clicked
$( document ).on( 'click', '#broker_register_submit_button', function ( e ) {
    
	for(var i = 0; i < inputArray.length; i++) {
		if(inputArray[i] == false) {
			notifyUserOfInvalidField(i);
			return;
		}
	}

	var data = getInputDetailObject();

	util.displayUploadFileModal("",onBrokerageRegistrationCallback);
}); 

function getInputDetailObject() {

	var data = 
	{
		'username':inputArray[USERNAME],
		'password':inputArray[PASSWORD],
		'email':inputArray[EMAIL],
		'brokerageName':inputArray[USERNAME],
		'brokerageEmail':inputArray[BROKERAGE_EMAIL],
		'brokerageContactPerson':inputArray[BROKERAGE_CONTACT_PERSON],
		'brokerageContactNumber':inputArray[BROKERAGE_CONTACT_NUMBER],
		'fspNumber':inputArray[FSP_NUMBER]
	};

	return data;
}

function notifyUserOfInvalidField(invalidFieldIndex) {
	alert("Field " + invalidFieldIndex + " is invalid." );
}

function onBrokerageRegistrationCallback(files,data) {

	var requestObject = {

		'data':data,
		'files':files
	};

	brokerAdminController.createBrokerage(onSuccessfulBrokerageRegistration,onUnsuccessfulBrokerageRegistration,requestObject);
}

function onSuccessfulBrokerageRegistration() {
	util.createNotification('Registration request successfull. \n Support will send a verification email shortly.');
	loader.load();
}
function onUnsuccessfulBrokerageRegistration() {
	util.createNotification('Failure to create Brokerage. Please contact Support.','error');
}
