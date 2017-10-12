var USERNAME = 0;
var PASSWORD = 1;
var PASSWORD2 = 2;
var EMAIL = 3;
var NAME = 4;
var SURNAME = 5;

var inputArray = [null,null,null,null,null,null];



// Username Input Change
$( document ).on( 'change', '#insurer_register_username_input', function( e ) {
	validateUsername($(this).val());
});

// Password Input Change
$( document ).on( 'change', '#insurer_register_password_input', function( e ) {
	validatePassword($(this).val());
});

// Confirm Password Input Change
$( document ).on( 'change', '#insurer_register_confirm_password_input', function( e ) {
	validateConfirmPassword($(this).val());
});

// Email Input Change
$( document ).on( 'change', '#insurer_register_email_input', function( e ) {
	validateEmail($(this).val());
});

// Name Input Change
$( document ).on( 'change', '#insurer_register_name_input', function( e ) {
	validateName($(this).val());
});

// Surname Input Change
$( document ).on( 'change', '#insurer_register_surname_input', function( e ) {
	validateSurname($(this).val());
});

// Submit button clicked
$( document ).on( 'click', '#insurer_register_submit_button', function ( e ) {
    
	for(var i =0; i < inputArray.length; i++) {
		if(inputArray[i] == null) {
			notifyUserOfInvalidField(i);
			return;
		}
	}

	saveInsurer();
}); 

function notifyUserOfInvalidField(invalidFieldIndex) {
	util.createNotification("Field " + invalidFieldIndex + " is invalid.",'warn');
}

function saveInsurer() {

	var userData = {
		'username':inputArray[USERNAME],
		'password':inputArray[PASSWORD],
		'roleId':'1',
		'name':inputArray[NAME],
		'surname':inputArray[SURNAME],
		'email':inputArray[EMAIL],
		'active':'1'
	};

	var insurerData = {
		'active':'1',
		'isAdmin':'0',
	}

	var newInsurerId = insurerInvoker.create(userData,insurerData);

	if(newInsurerId != null) {

		util.createNotification("Insurer created");
			// TODO
		loader.loadPage('html/insurer_admin/insurance_agency.html');
		// Redirect to some other page. 

	} else {

		util.createNotification('Failed to create Insurer.','error');
	}
}

function validateUsername(input) {

	if(1) {
		inputArray[USERNAME] = input;
	} else {
		inputArray[USERNAME] = null;
	}	
}

function validatePassword(input) {
	if(1) {
		inputArray[PASSWORD] = input;
	} else {
		inputArray[PASSWORD] = null;
	}
}

function validateConfirmPassword(input) {
	if(1) {
		inputArray[PASSWORD2] = input;
	} else {
		inputArray[PASSWORD2] = null;
	}
}

function validateEmail(input) {
	if(1) {
		inputArray[EMAIL] = input;
	} else {
		inputArray[EMAIL] = null;
	}
}

function validateName(input) {
	if(1) {
		inputArray[NAME] = input;
	} else {
		inputArray[NAME] = null;
	}
}

function validateSurname(input) {
	if(1) {
		inputArray[SURNAME] = input;
	} else {
		inputArray[SURNAME] = null;
	}
}
