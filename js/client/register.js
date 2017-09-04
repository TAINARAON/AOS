console.log('client/register.js working');

// Any input change /*$( document ).on( 'change', '#client_register_form .required', function( e ) {var allInputElements = $('#client_register_form .required');for(var i = 0; i < allInputElements.length; i++) {if(allInputElements.eq(i).val() == "") {$('#client_register_submit_div').hide();return;}}$('#client_register_submit_div').show();});*/

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
function validateIdNumber(input) {
	inputArray[4] = 1;
}
function validateContactNumber(input) {
	inputArray[5] = 1;
}
function validateName(input) {
	inputArray[6] = 1;
}
function validateSurname(input) {
	inputArray[7] = 1;
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
