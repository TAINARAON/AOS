(function() {
	init();
})();

var BUSINESS_UNIT_NAME_INDEX = 0;
var VAT_NUMBER_INDEX = 1;
var INCOME_TAX_NUMBER_INDEX = 2;
var CONTACT_NUMBER_INDEX = 3;
var EMAIL_INDEX = 4;

var requiredFields = [false,false,false,false,false];

function init() {

	initializeValidationOnChangeListeners();
	setSubmitButtonClickListener();
	createSelectorBox();
}

function createSelectorBox() {

	populateSelectorBox();
	onAddEntryClickListener();
	onRemoveEntryClickListener();
}

function populateSelectorBox() {

	var brokerageId = brokerAdminController.getBrokerage()['id'];

	var brokers = brokerAdminController.getBrokersOfBrokerage();
	
	console.log(brokerageId,brokers);

	var availableBrokersUl = $('#available_brokers_ul');

	for(let i = 0; i < brokers.length; i++) {

		var id = brokers[i]['id'];
		var name = brokers[i]['name'];
		var surname = brokers[i]['surname'];

		var li = $('<li></li>').prop('id',id).text(name + " " + surname).on('click',function() {

			toggleSelectedListItem($(this));
		});
		availableBrokersUl.append(li);
	}
}

function toggleSelectedListItem(li) {
	if(li.hasClass('selected')) {
		li.removeClass('selected');
		li.css('background-color','white');
	} else {
		li.addClass('selected');
		li.css('background-color','grey');
	}
}

function onAddEntryClickListener() {

	$('#add_button').on('click',function() {

		var listItems = $('#available_brokers_ul .selected');

		for(var i=0;i<listItems.length;i++) {

			var item = listItems.eq(i);
			item.detach();

			$('#selected_brokers_ul').append(item);
			toggleSelectedListItem(item);
		}
	});
}

function onRemoveEntryClickListener() {
	$('#remove_button').on('click',function() {

		var listItems = $('#selected_brokers_ul .selected');

		for(var i=0;i<listItems.length;i++) {

			var item = listItems.eq(i);
			item.detach();

			$('#available_brokers_ul').append(item);
			toggleSelectedListItem(item);
		}
	});
}



function initializeValidationOnChangeListeners() {

	$('#create_business_unit_name_input').on('change',function() {
		var input = $(this).val();

		requiredFields[BUSINESS_UNIT_NAME_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_business_vat_number_input').on('change',function() {
		var input = $(this).val();

		requiredFields[VAT_NUMBER_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_business_income_tax_number_input').on('change',function() {
		var input = $(this).val();

		requiredFields[INCOME_TAX_NUMBER_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_business_unit_contact_number_input').on('change',function() {
		var input = $(this).val();

		requiredFields[CONTACT_NUMBER_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_business_unit_email_input').on('change',function() {
		var input = $(this).val();

		requiredFields[EMAIL_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});
}

function showSubmitButtonIfAllFieldsAreCompleted() {

	for(var i = 0; i < requiredFields.length; i++) {
		if(requiredFields[i] == false) {
			$('#create_business_unit_submit_div').hide();
			return;
		}
	}

	$('#create_business_unit_submit_div').show();
}

function setSubmitButtonClickListener() {

	$('#create_business_unit_submit_button').on('click',function() {
		onCreateBusinessUnitClick();
	});
}

function onCreateBusinessUnitClick() {

	// TODO
	var action = "something/createClient/";
	
	var name = $('#create_client_name_input').val();
	var surname = $('#create_client_surname_input').val();
	var email = $('#create_client_email_input').val();
	var idNumber = $('#create_client_id_number_input').val();

	var brokerageId = brokerAdminController.getBrokerage()['id'];

	var data = 
	{
		"name":name,
		"surname":surname,
		"email":email,
		"idNumber":idNumber,
		"brokerageId":brokerageId
	};

	util.displayUploadFileModal(action,data,onCreateBusinessUnitDocumentsSubmittedCallback);
}

function onCreateBusinessUnitDocumentsSubmittedCallback(fileData,data) {

	// TODO
	if(fileData == "failed - not really a value") {

		util.createNotification("Failed to upload documents","error");

	} else {

		ajaxCreateBusinessUnit(fileData,data);
	}
}

function ajaxCreateBusinessUnit(fileData,data) {

	var requestData = 
	{
		'fileData':fileData,
		'data':data
	};

	brokerAdminController.createBusinessUnit(onBusinessUnitCreatedSuccess,onBusinessUnitCreatedFailure,requestData);
}
function onBusinessUnitCreatedSuccess(response) {

	util.createNotification("Client details submitted. . .awaiting approval.");
	loader.loadPage('html/brokerAdmin/brokerage/brokerage.html');
}
function onBusinessUnitCreatedFailure(result) {

	util.createNotification("Failed to create Client - Please contact support if the problem persists.","error")
	loader.reload();
}