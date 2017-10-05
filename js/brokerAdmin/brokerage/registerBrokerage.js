var USERNAME = 0;
var PASSWORD = 1;
var PASSWORD2 = 2;
var EMAIL = 3;
var BROKERAGE_NAME = 4;
var BROKERAGE_EMAIL = 5;
var BROKERAGE_CONTACT_NUMBER = 6;
var FSP_NUMBER = 7;

var inputArray = [false,false,false,false,false,false,false,false];

function validateUsername(input) {
	// TODO
	inputArray[USERNAME] = 1;
}
function validatePassword(input) {
	// TODO
	inputArray[PASSWORD] = 1;
}
function validateConfirmPassword(input) {
	// TODO
	inputArray[PASSWORD2] = 1;
}
function validateEmail(input) {
	// TODO
	inputArray[EMAIL] = 1;
}
function validateBrokerageName(input) {
	// TODO
	inputArray[BROKERAGE_NAME] = 1;
}
function validateBrokerageEmail(input) {
	// TODO
	inputArray[BROKERAGE_EMAIL] = 1;
}
function validateBrokerageContactNumber(input) {
	// TODO
	inputArray[BROKERAGE_CONTACT_NUMBER] = 1;
}
function validateFspNumber(input) {
	// TODO
	inputArray[FSP_NUMBER] = 1;
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

	util.displayUploadFileModal("",onBrokerageRegistrationCallback);
}); 

function notifyUserOfInvalidField(invalidFieldIndex) {
	alert("Field " + invalidFieldIndex + " is invalid." );
}

function onBrokerageRegistrationCallback(response) {

	// TODO
	if(response == true) {
		onSuccessfulBrokerageRegistration();
	} else {
		onUnsuccessfulBrokerageRegistration();
	}
}

function onSuccessfulBrokerageRegistration() {
	util.createNotification('Registration request successfull!');
	util.createNotification('Support will send a verification email shortly.');
}
function onUnsuccessfulBrokerageRegistration() {
	util.createNotification('Failure to create Brokerage. Please contact Support.','error');
}
