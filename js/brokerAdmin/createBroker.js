(function() {
	init();
})();

var NAME_INDEX = 0;
var SURNAME_INDEX = 1;
var EMAIL_INDEX = 2;

var CREATE_BROKER_URL = "";

var requiredFields = [false,false,false];

function init() {

	initializeValidationOnChangeListeners();
	setSubmitButtonClickListener();
}

function initializeValidationOnChangeListeners() {

	$('#create_broker_name_input').on('change',function() {
		var input = $(this).val();

		requiredFields[NAME_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_surname_input').on('change',function() {
		var input = $(this).val();

		requiredFields[SURNAME_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_email_input').on('change',function() {
		var input = $(this).val();

		requiredFields[EMAIL_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});
}

function showSubmitButtonIfAllFieldsAreCompleted() {

	for(var i = 0; i < requiredFields.length; i++) {
		if(requiredFields[i] == false) {
			$('#create_broker_submit_div').hide();
			return;
		}
	}

	$('#create_broker_submit_div').show();
}

function setSubmitButtonClickListener() {

	$('#create_broker_submit_button').on('click',function() {
		onCreateBrokerClick();
	});
}

// creates broker, by supplying Username and email
function onCreateBrokerClick() {

	// TODO
	var action = "soemthing/createBroker/";

	var email = $('#create_broker_email_input').val();
	var name = $('#create_broker_name_input').val();
	var surname = $('#create_broker_surname_input').val();
	var creationRights = $('#create_broker_rights_checkbox').is(':checked')

	var brokerageId = brokerAdminController.getBrokerage()['id'];

	var data = 
	{
		"name":name,
		"surname":surname,
		"email":email,
		"creationRights":creationRights,
		"brokerageId":brokerageId
	};

	util.displayUploadFileModal(action,data,onCreateBrokerDocumentsSubmittedCallback);
}

function onCreateBrokerDocumentsSubmittedCallback(fileData,data) {

	// TODO
	if(fileData == "failed - not really a value") {

		util.createNotification("Failed to upload documents","error");
		onCreateBrokerClick();

	} else {

		ajaxCreateBroker(fileData,data);
	}
}

function ajaxCreateBroker(fileData,data) {

	var requestData = 
	{
		'fileData':fileData,
		'data':data
	};

	var mockResponse = {
		"id":'test'
	};

	ajaxPost(CREATE_BROKER_URL,onBrokerCreatedSuccess,onBrokerCreatedFailure,requestData,mockResponse);
}

function onBrokerCreatedSuccess(response) {

	util.createNotification("Broker submitted. . .awaiting approval.");
	loader.loadPage('html/brokerAdmin/brokerage/brokerage.html');
}
function onBrokerCreatedFailure(result) {

	util.createNotification("Failed to create Broker - Please contact support if the problem persists.","error")
	loader.reload();
}
