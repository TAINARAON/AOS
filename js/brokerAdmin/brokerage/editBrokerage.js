$(function() {
    init();
  });

var EDIT_BROKERAGE_URL = "test url";
var brokerage = {};

function init() {

	initText();
	initOnClickListeners();
}

function initText() {

	brokerage = brokerAdminController.getBrokerage();

	$('#edit_brokerage_brokerage_name_input').val(brokerage['name']);
	$('#edit_brokerage_email_input').val(brokerage['email']);
	$('#edit_brokerage_contact_number_input').val(brokerage['contactNumber']);
	$('#edit_brokerage_fsp_number_input').val(brokerage['fspNumber']);
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

	var action = "I dont think this is needed";

	var data = {
		"id":brokerage["id"],
		"name":$('#edit_brokerage_brokerage_name_input').val(),
		"email":$('#edit_brokerage_email_input').val(),
		"contactNumber":$('#edit_brokerage_contact_number_input').val()
	}

	if(detailsChanged(data)) {

		util.displayUploadFileModal(action,data,onFilesSubmittedCallback);
	
	} else {

		notifyUserThatNoChangesWereMade();
	}
}

function onFilesSubmittedCallback(fileData,data) {

	if(fileData == null) {

		util.createNotification("Failed to upload files","warn");

	} else {

		submitRequestToChangeBrokerageDetails(fileData,data);
	}
}

/*
	brokerAdmin/editBrokerage

	requestObject:{
		data:{
			id,
			contactNumber,
			email,
			name
		},
		fileData:{
		}
	}
*/
function submitRequestToChangeBrokerageDetails(fileData,data) {
	
	var requestObject = {
		"data":data,
		"fileData":fileData
	};

	var mockResponse = {
		"result":"fake response"
	};

	ajaxPost(EDIT_BROKERAGE_URL,onChangeBrokerageSuccessCallback,onChangeBrokerageFailCallback,requestObject,mockResponse);
}

function onChangeBrokerageSuccessCallback(result) {

	util.createNotification("Success submitting request to edit Brokerage.");
	$("#editBrokerageModal").modal('toggle');
}

function onChangeBrokerageFailCallback(result) {

	util.createNotification("Failure submitting request to edit Brokerage.","error");
}

function notifyUserThatNoChangesWereMade() {

	util.createNotification("No changes were made","warn");
}

function detailsChanged(details) {

	// Test name
	if(brokerage["name"] != details["name"]) {
		return true;
	}

	// Test email
	if(brokerage["email"] != details["email"]) {
		return true;
	}

	// Test contact number
	if(brokerage["contactNumber"] != details["contactNumber"]) {
		return true;
	}

	return false;
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
