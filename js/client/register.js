const USERNAME = 0;
const PASSWORD = 1;
const PASSWORD2 = 2;
const EMAIL = 3;
const ID_NUMBER = 4;
const CONTACT_NUMBER = 5;
const NAME = 6;
const SURNAME = 7;

var inputArray = [false,false,false,false,false,false,false,false];

function validateUsername(input) {
	inputArray[USERNAME] = 1;
}
function validatePassword(input) {
	inputArray[PASSWORD] = 1;
}
function validateConfirmPassword(input) {
	inputArray[PASSWORD2] = 1;
}
function validateEmail(input) {
	inputArray[EMAIL] = 1;
}
function validateIdNumber(input) {
	inputArray[ID_NUMBER] = 1;
}
function validateContactNumber(input) {
	inputArray[CONTACT_NUMBER] = 1;
}
function validateName(input) {
	inputArray[NAME] = 1;
}
function validateSurname(input) {
	inputArray[SURNAME] = 1;
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

// Name Input Change
$( document ).on( 'change', '#client_register_name_input', function( e ) {
	validateName($(this).val());
});

// Surname Input Change
$( document ).on( 'change', '#client_register_surname_input', function( e ) {
	validateSurname($(this).val());
});

// Submit button clicked
$( document ).on( 'click', '#client_register_submit_button', function ( e ) {
    
	for(var i =0; i < inputArray.length; i++) {
		if(inputArray[i] == false) {
			notifyUserOfInvalidField(i);
			return;
		}
	}

	alert("Submitted");
}); 

function notifyUserOfInvalidField(invalidFieldIndex) {
	alert("Field " + invalidFieldIndex + " is invalid." );
}
