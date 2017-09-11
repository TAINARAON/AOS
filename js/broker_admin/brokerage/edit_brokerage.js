$(function() {
    init();
  });

function init() {
	initText();
	initOnClickListeners();
}

function initText() {
	$('#edit_brokerage_brokerage_name_input').val(getNameOfBrokerage());
	$('#edit_brokerage_email_input').val(getEmailOfBrokerage());
	$('#edit_brokerage_contact_number_input').val(getContactNumberOfBrokerage());
	$('#edit_brokerage_fsp_number_input').val(getFspNumberOfBrokerage());
}

function initOnClickListeners() {
	onSubmitButton();
	onCancelButton();
}

function onSubmitButton() {
	$('#edit_brokerage_submit_button').on('click',function() {
		onChangeBrokerageDetails();
		resetText();
	});
}

function onCancelButton() {
	$('#edit_brokerage_cancel_button').on('click',function() {
		resetText();
	});
}

function resetText() {
	initText();
}

function onChangeBrokerageDetails() {

	var details = {
		"name":$('#edit_brokerage_brokerage_name_input').val(),
		"email":$('#edit_brokerage_email_input').val(),
		"contactNumber":$('#edit_brokerage_contact_number_input').val()
	}

	if(detailsChanged(details)) {
		submitRequestToChangeBrokerageDetails(details);
	} else {
		notifyUserThatNoChangesWereMade();
	}
}

function submitRequestToChangeBrokerageDetails() {
	alert("Request to change details submitted");
}

function notifyUserThatNoChangesWereMade() {
}

function detailsChanged(details) {
	// check whether details are different from current data. if not, does not need to change
	return 1;
}

function getNameOfBrokerage() {
	return "Lukraak Makelaars";
}
function getEmailOfBrokerage() {
	return "lmakelaars@gmail.com";
}
function getContactNumberOfBrokerage() {
	return "062-LUKRAAK";
}
function getFspNumberOfBrokerage() {
	return "1ukr44km4k3144r5";
}
