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
	var branch = $('#create_broker_branch_input').val();
	var contactNumber = $('#create_broker_contact_number_input').val();
	var surname = $('#create_broker_surname_input').val();
	var creationRights = $('#create_broker_rights_checkbox').is(':checked')
	var brokerageId = brokerAdminController.getBrokerage()['id'];

	var brokerViewableBrokers = [];
	var selectedBrokersListItems = $('#selected_brokers_ul li');

	for(var i = 0; i < selectedBrokersListItems.length; i++) {

		var viewableBrokerId = selectedBrokersListItems.eq(i).prop('id');
		brokerViewableBrokers.push(viewableBrokerId);
	}

	var brokerData = 
	{
		"branch":branch,
		"email":email,
		"contactNumber":contactNumber,
		"creationRights":creationRights,
		"brokerageId":brokerageId
	};
	var userData = {
		"name":name,
		"surname":surname,
		"initials":initials,
	}

	var requestObject = {
		'user':userData,
		'broker':brokerData,
		'brokerViewableBrokers':brokerViewableBrokers
	}

	brokerAdminController.createBroker(onBrokerCreatedSuccess,onBrokerCreatedFailure,requestObject);
}



function onBrokerCreatedSuccess(response) {

	util.createNotification("Broker created");
	loader.loadPage('html/brokerAdmin/brokerage/brokerage.html');
}
function onBrokerCreatedFailure(result) {

	util.createNotification("Failed to create Broker - Please contact support if the problem persists.","error")
	loader.reload();
}