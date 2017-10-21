(function() {
	init();
})();

var INITIALS_INDEX = 0;
var SURNAME_INDEX = 1;
var PREFERRED_NAME_INDEX = 2;
var BRANCH_INDEX = 3;
var EMAIL_INDEX = 4;
var CONTACT_NUMBER_INDEX = 5;

var requiredFields = [false,false,false,false,false,false];

function init() {

	getBrokerages();
	initializeValidationOnChangeListeners();
	setSubmitButtonClickListener();
}

function populateBrokerageDropdown(brokerages) {

	var selectElement = $('#create_broker_brokerage_dropdown');

	var values = brokerages;
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));	
	}

	selectElement
		.on('change',function() {

			onBrokerageSelected();
			
		});
}

function getBrokerages() {

	insurerController.getBrokerages(onGetBrokeragesSuccess,onGetBrokeragesFailure);
}
function onGetBrokeragesSuccess(response) {
	
	var brokerages = response['brokerages'];

	populateBrokerageDropdown(brokerages);
}
function onGetBrokeragesFailure(response) {

	alert("failed to get Brokerages - insurerController createBroker");
}

function setOnBrokerageSelectedListener() {

}

function createSelectorBox(brokers) {

	populateSelectorBox(brokers);
	onAddEntryClickListener();
	onRemoveEntryClickListener();
}

function onBrokerageSelected() {
	
	clearSelectorBox();
	getBrokersOfBrokerage($(this).find(":selected").val());
}
function clearSelectorBox() {

	$('#available_brokers_ul').empty();
	$('#selected_brokers_ul').empty();
}

function getBrokersOfBrokerage() {

	var brokerageId = $('#create_broker_brokerage_dropdown').find(":selected").val();

	insurerController.getBrokersOfBrokerage(onGetBrokersOfBrokerageSuccess,onGetBrokersOfBrokerageFailure,brokerageId);
}

function onGetBrokersOfBrokerageSuccess(response) {

	createSelectorBox(response['brokers']);
}
function onGetBrokersOfBrokerageFailure(response) {

	util.createNotification('Failed to get Brokers of Brokerage','error');
}


function populateSelectorBox(brokers) {

	var availableBrokersUl = $('#available_brokers_ul');

	for(let i = 0; i < brokers.length; i++) {

		var id = brokers[i]['id'];
		var initials = brokers[i]['initials'];
		var surname = brokers[i]['surname'];

		var li = $('<li></li>').prop('id',id).text(initials + " " + surname).on('click',function() {

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

	$('#create_broker_initials_input').on('change',function() {
		var input = $(this).val();

		requiredFields[INITIALS_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_surname_input').on('change',function() {
		var input = $(this).val();

		requiredFields[SURNAME_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_preferred_name_input').on('change',function() {
		var input = $(this).val();

		requiredFields[PREFERRED_NAME_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_branch_input').on('change',function() {
		var input = $(this).val();

		requiredFields[BRANCH_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_email_input').on('change',function() {
		var input = $(this).val();

		requiredFields[EMAIL_INDEX] = (input != "");

		showSubmitButtonIfAllFieldsAreCompleted();
	});

	$('#create_broker_contact_number_input').on('change',function() {
		var input = $(this).val();

		requiredFields[CONTACT_NUMBER_INDEX] = (input != "");

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

	var email = $('#create_broker_email_input').val();
	var name = $('#create_broker_preferred_name_input').val();
	var initials = $('#create_broker_initials_input').val();
	var surname = $('#create_broker_surname_input').val();
	var branch = $('#create_broker_branch_input').val();
	var contactNumber = $('#create_broker_contact_number_input').val();
	var creationRights = $('#create_broker_rights_checkbox').is(':checked');

	var brokerageId = $('#create_broker_brokerage_dropdown').find(":selected").val();

	var data = 
	{
		"name":name,
		"surname":surname,
		"initials":initials,
		"branch":branch,
		"contactNumber":contactNumber,
		"email":email,
		"creationRights":creationRights,
		"brokerageId":brokerageId
	};

	util.displayUploadFileModal(data,onCreateBrokerDocumentsSubmittedCallback);
}

function onCreateBrokerDocumentsSubmittedCallback(fileData,data) {

	var requestObject = {
		'data':data,
		'fileData':fileData
	};

	insurerController.createBroker(onBrokerCreatedSuccess,onBrokerCreatedFailure,requestObject);
}

function onBrokerCreatedSuccess(response) {

	util.createNotification("Broker Created, and Email sent");
	loader.loadPage('html/insurer/brokers.html');
}
function onBrokerCreatedFailure(result) {

	util.createNotification("Failed to create Broker - Please contact support if the problem persists.","error")
	loader.reload();
}