$(function() {
    init();
  });

var brokerage = {};

function init() {

	initializeModals();
	setBrokerageDetails();
	populateBrokerTable();
}

function initializeModals() {
	
	loader.loadPartOfPage("html/brokerAdmin/brokerage/editBrokerage.html", 'edit_brokerage_modal_container');
}

function setBrokerageDetails() {

	brokerage = brokerAdminController.getBrokerage();

	$('#broker_admin_brokerage_name').text(brokerage['name']);
	$('#broker_admin_brokerage_email').text(brokerage['email']);
	$('#broker_admin_brokerage_fsp_number').text(brokerage['fspNumber']);
	$('#broker_admin_brokerage_contact_number').text(brokerage['contactNumber']);
}

function populateBrokerTable() {

	brokerAdminController.getBrokerDetailsOfBrokerage(getBrokerDetailsOfBrokerageSuccessCallback,getBrokerDetailsOfBrokerageFailCallback);
}

function getBrokerDetailsOfBrokerageSuccessCallback(response) {

	var container = $('#broker_admin_broker_container');

	console.log('response');
	console.log(response);
	var brokers = response['brokers'];

	for(var i = 0;i<brokers.length;i++) {
		createBrokerEntry(brokers[i],container);
	}
}
function getBrokerDetailsOfBrokerageFailCallback(response) {

	alert("failed brokerAdmin/brokerage/brokerage.js getBrokerDetailsOfBrokerageFailCallback");
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

	var details = createDetailsOfBrokerHtml(broker);
	//$('<p></p>').text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
	
	detailContainer.append(editButton);
	detailContainer.append(revokeButton);
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

	brokerAdminController.getBrokerForEditModal(getBrokerForEditModalSuccessCallback,getBrokerForEditModalFailureCallback,id);
	
}

function getBrokerForEditModalSuccessCallback(result) {

	var broker = result["broker"];
	
	populateEditBrokerModalText(broker);
	setOnClickForEditBrokerSaveButton(broker["id"]);
	setOnClickForEditBrokerCancelButton();

}
function getBrokerForEditModalFailureCallback(result) {

	alert("getBrokerForEditModalFailureCallback brokerAdmin/brokerage/brokerage.js");

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

	/*var damageReportRights = brokerData['damageReportRights'];
	var quoteRights = brokerData['quoteRights'];
	var policyRights = brokerData['policyRights'];*/
	var creationRights = brokerData['creationRights'];

	/*$('#edit_broker_damage_report_rights_checkbox').attr('checked', damageReportRights);
	$('#edit_broker_quote_rights_checkbox').attr('checked', quoteRights);
	$('#edit_broker_policy_rights_checkbox').attr('checked', policyRights);*/
	$('#edit_broker_creation_rights_checkbox').attr('checked', creationRights);
}
function setOnClickForEditBrokerSaveButton(brokerId) {

	$('#edit_broker_save_button').off().on('click', function() {

		editBroker(brokerId);
		resetEditBrokerModal();
	});
}

function setOnClickForEditBrokerCancelButton() {
	$('#edit_broker_cancel_button').off().on('click', function() {
		resetEditBrokerModal();
	});
}

function resetEditBrokerModal() {

	$('#edit_broker_creation_rights_checkbox').attr('checked', false);
	/*$('#edit_broker_damage_report_rights_checkbox').attr('checked', false);
	$('#edit_broker_quote_rights_checkbox').attr('checked', false);
	$('#edit_broker_policy_rights_checkbox').attr('checked', false);*/

	$('#available_brokers_ul').empty();
	$('#selected_brokers_ul').empty();
}

function editBroker(brokerId) {

	//var name = $('#edit_broker_name_input').val();
	//var surname = $('#edit_broker_surname_input').val();

	var creationRights = $('#edit_broker_creation_rights_checkbox').is(':checked');
	/*var damageReportRights = $('#edit_broker_damage_report_rights_checkbox').is(':checked');
	var quoteRights = $('#edit_broker_quote_rights_checkbox').is(':checked');
	var policyRights = $('#edit_broker_policy_rights_checkbox').is(':checked');*/

	var brokerViewableBrokers = [];

	var selectedBrokersListItems = $('#selected_brokers_ul li');

	for(var i = 0; i < selectedBrokersListItems.length; i++) {

		var viewableBrokerId = selectedBrokersListItems.eq(i).prop('id');
		brokerViewableBrokers.push(viewableBrokerId);
	}

	var broker = {
		'id':brokerId,
		'creationRights':creationRights,
		/*'damageReportRights':damageReportRights,
		'quoteRights':quoteRights,
		'policyRights':policyRights*/
	};

	var requestObject = {
		'broker':broker,
		'brokerViewableBrokers':brokerViewableBrokers
	};

	brokerAdminController.editBroker(editBrokerSuccessCallback,editBrokerFailureCallback,requestObject);
}

function editBrokerSuccessCallback(response) {

	util.createNotification('Request to update broker successful.');
	console.log("editBrokerSuccessCallback");
	console.log(response);
}

function editBrokerFailureCallback(response) {
	// TODO
	util.createNotification('Request to update broker successful.',"error");
}

function onRevokeBrokerClick(brokerId) {

	// Note: RevokeModal gets toggled automatically

	alert("TODO: BrokerAdmin #1");

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
