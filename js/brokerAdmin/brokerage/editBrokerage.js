$(function() {
    init();
  });


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

	$('#edit_brokerage_bank_input').val(brokerage['bank']);
	$('#edit_brokerage_branch_input').val(brokerage['branch']);
	$('#edit_brokerage_account_number_input').val(brokerage['accountNumber']);
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

	var needsSupportingDocuments = dataRequiringSupportingDocumentChanged();

	var data = 
	{
		"id":brokerage["id"],
		"name":$('#edit_brokerage_brokerage_name_input').val(),
		"fspNumber":$('#edit_brokerage_fsp_number_input').val(),
		"bank":$('#edit_brokerage_bank_input').val(),
		"branch":$('#edit_brokerage_branch_input').val(),
		"accountNumber":$('#edit_brokerage_account_number_input').val(),
		"email":$('#edit_brokerage_email_input').val(),
		"contactNumber":$('#edit_brokerage_contact_number_input').val()
	};

	if(detailsChanged(data)) {

		if(needsSupportingDocuments) {
			util.displayUploadFileModal(data,onFilesSubmittedCallback);
		} else {
			submitRequestToChangeBrokerageDetails(data,null);
		}
	} else {

		notifyUserThatNoChangesWereMade();
	}
}

function dataRequiringSupportingDocumentChanged() {

	if($('#edit_brokerage_brokerage_name_input').val() != brokerage['name']) {
	
		return true;
	}
	if($('#edit_brokerage_fsp_number_input').val() != brokerage['fspNumber']) {

		return true;
	}
	if($('#edit_brokerage_bank_input').val() != brokerage['bank']) {
		
		return true;
	}
	if($('#edit_brokerage_branch_input').val() != brokerage['branch']) {
	
		return true;
	}
	if($('#edit_brokerage_account_number_input').val() != brokerage['accountNumber']) {

		return true;
	}

	return false;
}

function onFilesSubmittedCallback(fileData,data) {

	submitRequestToChangeBrokerageDetails(fileData,data);
}

function submitRequestToChangeBrokerageDetails(fileData=null,data) {
	
	var requestObject = 
	{
		"data":data,
		"fileData":fileData
	};

	brokerAdminController.editBrokerage(onChangeBrokerageSuccessCallback,onChangeBrokerageFailCallback,requestObject);
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

	if(brokerage["name"] != details["name"]) {
		return true;
	}

	if(brokerage["email"] != details["email"]) {
		return true;
	}

	if(brokerage["contactNumber"] != details["contactNumber"]) {
		return true;
	}

	if(brokerage["fspNumber"] != details["fspNumber"]) {
		return true;
	}

	if(brokerage["bank"] != details["bank"]) {
		return true;
	}

	if(brokerage["branch"] != details["branch"]) {
		return true;
	}

	if(brokerage["accountNumber"] != details["accountNumber"]) {
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
