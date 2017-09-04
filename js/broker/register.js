console.log('broker/register.js working');

var inputArray = [false,false,false,false,false,false,false,false];

function validateUsername(input) {
	inputArray[0] = 1;
}
function validatePassword(input) {
	inputArray[1] = 1;
}
function validateConfirmPassword(input) {
	inputArray[2] = 1;
}
function validateEmail(input) {
	inputArray[3] = 1;
}
function validateBrokerageName(input) {
	inputArray[4] = 1;
}
function validateBrokerageEmail(input) {
	inputArray[5] = 1;
}
function validateBrokerageContactNumber(input) {
	inputArray[6] = 1;
}
function validateFspNumber(input) {
	inputArray[7] = 1;
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
