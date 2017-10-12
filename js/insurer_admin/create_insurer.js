var EMAIL_INDEX = 2;
var NAME_INDEX = 0;
var SURNAME_INDEX = 1;
var FSP_NUMBER_INDEX = 3

var inputArray = [null,null,null,null];



// Username Input Change
/*$( document ).on( 'change', '#insurer_register_username_input', function( e ) {
	validateUsername($(this).val());
});

// Password Input Change
$( document ).on( 'change', '#insurer_register_password_input', function( e ) {
	validatePassword($(this).val());
});

// Confirm Password Input Change
$( document ).on( 'change', '#insurer_register_confirm_password_input', function( e ) {
	validateConfirmPassword($(this).val());
});*/

// Confirm FSP Number Input Change
$( document ).on( 'change', '#insurer_register_fsp_number_input', function( e ) {
	validateFspNumber($(this).val());
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

	var data = {
		/*'username':inputArray[USERNAME],
		'password':inputArray[PASSWORD],
		'roleId':'1',*/
		'name':inputArray[NAME_INDEX],
		'surname':inputArray[SURNAME_INDEX],
		'email':inputArray[EMAIL_INDEX],
		'fspNumber':inputArray[FSP_NUMBER_INDEX]
	};

	insurerAdminController.createInsurer(onSubmitInsurerDetailsSuccess,onSubmitInsurerDetailsFailure,data);
}

function onSubmitInsurerDetailsSuccess(response) {
	loader.loadPage('html/insurer_admin/insurance_agency.html');
}
function onSubmitInsurerDetailsFailure(response) {
	
}

/*function validateUsername(input) {

	if(1) {
		inputArray[USERNAME] = input;
	} else {
		inputArray[USERNAME] = null;
	}	
}*/

function validateFspNumber(input) {

	if(1) {
		inputArray[FSP_NUMBER_INDEX] = input;
	} else {
		inputArray[FSP_NUMBER_INDEX] = null;
	}	
}

/*function validatePassword(input) {
	if(1) {
		inputArray[PASSWORD] = input;
	} else {
		inputArray[PASSWORD] = null;
	}
}*/

/*function validateConfirmPassword(input) {
	if(1) {
		inputArray[PASSWORD2] = input;
	} else {
		inputArray[PASSWORD2] = null;
	}
}*/

function validateEmail(input) {
	if(1) {
		inputArray[EMAIL_INDEX] = input;
	} else {
		inputArray[EMAIL_INDEX] = null;
	}
}

function validateName(input) {
	if(1) {
		inputArray[NAME_INDEX] = input;
	} else {
		inputArray[NAME_INDEX] = null;
	}
}

function validateSurname(input) {
	if(1) {
		inputArray[SURNAME_INDEX] = input;
	} else {
		inputArray[SURNAME_INDEX] = null;
	}
}
