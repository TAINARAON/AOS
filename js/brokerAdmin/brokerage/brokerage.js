$(function() {
    init();
  });

function init() {

	initializeModals();
	setBrokerageDetails();
	populateBrokerTable();
}

function initializeModals() {
	
	loader.loadPartOfPage("html/brokerAdmin/brokerage/editBrokerage.html", 'edit_brokerage_modal_container');
}

function setBrokerageDetails() {

	var brokerageDetails = brokerAdminController.getBrokerage();

	$('#broker_admin_brokerage_name').text(brokerageDetails['name']);
	$('#broker_admin_brokerage_email').text(brokerageDetails['email']);
	$('#broker_admin_brokerage_fsp_number').text(brokerageDetails['fspNumber']);
	$('#broker_admin_brokerage_contact_number').text(brokerageDetails['contactNumber']);
}

function populateBrokerTable() {

	var container = $('#broker_admin_broker_container');
	var brokers = brokerAdminController.getBrokersForBrokerTableInBrokerageTab();

	for(var i = 0;i<brokers.length;i++) {
		createBrokerEntry(brokers[i],container);
	}
}

function createBrokerEntry(broker,container) {

	var header = $('<button></button>')
		.addClass('accordion')
		.text(broker.name + " " + broker.surname)
		.on('click',function(e){
			toggleDataContainer(e);
		}
	);

	var detailContainer = $('<div></div>')
		.addClass('panel');

	var editButton = $('<button></button>')
		.text('Edit')
		.attr('data-toggle','modal')
		.attr('data-target','#editBrokerModal')
		.on('click',function() {
			onEditBroker(broker.id);
		}
	);

	var revokeButton = $('<button></button>')
		.text('Revoke')
		.attr('data-toggle','modal')
		.attr('data-target','#revokeBrokerModal')
		.on('click',function() {
			onRevokeBrokerClick(broker.id);
		}
	);

	var viewQuotesButton = $('<button></button>')
		.text('Quotes')
		.on('click',function() {
			viewQuotesOfBroker(broker.id);
		}
	);

	var viewPoliciesButton = $('<button></button>')
		.text('Policies')
		.on('click',function() {
			viewPoliciesOfBroker(broker.id);
		}
	);

	var viewDamageReportsButton = $('<button></button>')
		.text('Damage Reports')
		.on('click',function() {
			viewDamageReportsOfBroker(broker.id);
		}
	);

	var details = createDetailsOfBrokerHtml(broker);
	//$('<p></p>').text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
	
	detailContainer.append(editButton);
	detailContainer.append(revokeButton);
	detailContainer.append(viewQuotesButton);
	detailContainer.append(viewPoliciesButton);
	detailContainer.append(viewDamageReportsButton);
	detailContainer.append(details);

	container.append(header);
	container.append(detailContainer);
}

function createDetailsOfBrokerHtml(brokerDetails) {
	var container = $('<div></div>')
		.append($('<p>Name: '+ brokerDetails.name + '</p>'))
		.append($('<p>Surname: '+ brokerDetails.surname + '</p>'))

	return container;
}

function toggleDataContainer(e) {
	var target = e.target || e.srcElement;

    target.classList.toggle("active");

    var panel = target.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
}

function onEditBroker(id) {

	populateEditBrokerModalText(brokerAdminController.getBrokerForEditModal(id));
	setOnClickForEditBrokerSaveButton(id);
	setOnClickForEditBrokerCancelButton();
}

function populateEditBrokerModalText(brokerData) {

	populateTextFields(brokerData);
	populatePermissionCheckBoxes(brokerData);
	initializeSelectorComponent(brokerData);
	
}
function populateTextFields(brokerData) {

	$('#edit_broker_name_input').val(brokerData.name);
	$('#edit_broker_surname_input').val(brokerData.surname);
}
function populatePermissionCheckBoxes(brokerData) {

	var damageReportRights = brokerData['damageReportRights'];
	var quoteRights = brokerData['quoteRights'];
	var policyRights = brokerData['policyRights'];
	var clientCreationRights = brokerData['clientCreationRights'];

	$('#edit_broker_damage_report_rights_checkbox').attr('checked', damageReportRights);
	$('#edit_broker_quote_rights_checkbox').attr('checked', quoteRights);
	$('#edit_broker_policy_rights_checkbox').attr('checked', policyRights);
	$('#edit_broker_client_creation_rights_checkbox').attr('checked', clientCreationRights);
}
function setOnClickForEditBrokerSaveButton(brokerId) {

	$('#edit_broker_save_button').off().on('click', function() {

		updateBroker(brokerId);
		resetEditBrokerModal();
	});
}

function setOnClickForEditBrokerCancelButton() {
	$('#edit_broker_cancel_button').off().on('click', function() {
		resetEditBrokerModal();
	});
}

function resetEditBrokerModal() {

	$('#edit_broker_client_creation_rights_checkbox').attr('checked', false);
	$('#edit_broker_damage_report_rights_checkbox').attr('checked', false);
	$('#edit_broker_quote_rights_checkbox').attr('checked', false);
	$('#edit_broker_policy_rights_checkbox').attr('checked', false);

	$('#available_brokers_ul').empty();
	$('#selected_brokers_ul').empty();
}

function updateBroker(brokerId) {

	//var name = $('#edit_broker_name_input').val();
	//var surname = $('#edit_broker_surname_input').val();

	var clientCreationRights = $('#edit_broker_client_creation_rights_checkbox').is(':checked');
	var damageReportRights = $('#edit_broker_damage_report_rights_checkbox').is(':checked');
	var quoteRights = $('#edit_broker_quote_rights_checkbox').is(':checked');
	var policyRights = $('#edit_broker_policy_rights_checkbox').is(':checked');

	var brokerViewableBrokers = [];

	var selectedBrokersListItems = $('#selected_brokers_ul li');

	for(var i = 0; i < selectedBrokersListItems.length; i++) {

		var viewableBrokerId = selectedBrokersListItems.eq(i).prop('id');
		brokerViewableBrokers.push(viewableBrokerId);
	}

	var broker = {
		'id':brokerId,
		'clientCreationRights':clientCreationRights,
		'damageReportRights':damageReportRights,
		'quoteRights':quoteRights,
		'policyRights':policyRights
	};

	var dataObject = {
		'broker':broker,
		'brokerViewableBrokers':brokerViewableBrokers
	};

	brokerAdminController.updateBroker(dataObject,onBrokerEditCallback);
}

function onBrokerEditCallback(response) {
	// TODO
	util.createNotification('Request to update broker successful.');
}

function onRevokeBrokerClick(brokerId) {

	// Display Revoke Broker Modal
}

function revokeBroker(id) {
	
	brokerAdminController.revokeBroker(id,revokeBrokerCallback);
}

function revokeBrokerCallback(result) {
	util.createNotification('Broker removed.','error');
}


function initializeSelectorComponent(brokerData) {
	populateSelectorBox(brokerData);
	onAddFileClickListener();
	onRemoveFileClickListener();
}
function populateSelectorBox(brokerData) {

	// TODO
	var brokers = brokerData['brokerViewableBrokers'];
	
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


function onAddFileClickListener() {

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


function onRemoveFileClickListener() {

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

function toggleSelectedListItem(li) {
	if(li.hasClass('selected')) {
		li.removeClass('selected');
		li.css('background-color','white');
	} else {
		li.addClass('selected');
		li.css('background-color','grey');
	}
}


function viewQuotesOfBroker(brokerId) {

}

function viewPoliciesOfBroker(brokerId) {

}

function viewDamageReportsOfBroker(brokerId) {

}

