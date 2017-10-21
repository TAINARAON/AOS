$(function() {
    init();
  });

var brokerage = {};

function init() {

	initializeModals();
	setBrokerageDetails();
	populateBrokerTable();

	$('#broker_admin_create_broker_button').on('click',function() {
		loader.loadPage('html/brokerAdmin/createBroker.html');
	});
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
	getBrokerDetailsOfBrokerageSuccessCallback(brokerAdminController.getBrokersOfBrokerage());
}

function getBrokerDetailsOfBrokerageSuccessCallback(response) {
	var container = $('#broker_admin_broker_container');

	var accordionContainer = document.createElement("UL");
	accordionContainer.className = "accordion";
	container.append(accordionContainer);

	createHeaderAccordionItem(accordionContainer);
	for(var i = 0;i<response.length;i++)
	{
		createBrokerAccordionParentItem(response[i], accordionContainer);
	}
}
function getBrokerDetailsOfBrokerageFailCallback(response) {

	alert("failed brokerAdmin/brokerage/brokerage.js getBrokerDetailsOfBrokerageFailCallback");
}

//function onEditBroker(id) {
function onEditBroker(broker) {
	//brokerAdminController.getBrokerForEditModal(getBrokerForEditModalSuccessCallback,getBrokerForEditModalFailureCallback,id);
	
	$('#editBrokerModal').modal('toggle')

	populateEditBrokerModalText(broker);
	setOnClickForEditBrokerSaveButton(broker["id"]);
	setOnClickForEditBrokerCancelButton();
}

/*function getBrokerForEditModalSuccessCallback(result) {

	var broker = result["broker"];
	
	populateEditBrokerModalText(broker);
	setOnClickForEditBrokerSaveButton(broker["id"]);
	setOnClickForEditBrokerCancelButton();

}
function getBrokerForEditModalFailureCallback(result) {

	alert("getBrokerForEditModalFailureCallback brokerAdmin/brokerage/brokerage.js");

}*/

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

// ------- Anro methods
function createBrokerAccordionParentItem(broker, container)
	{
		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex;";

		var editButton = createAccordionItemDetailDiv("Edit", parentTitle);
		editButton.style.cssText = "float:right;";
		editButton.className = "btn btn-success col-md-1";

		var betterEditButton = $(editButton);

		editButton.onclick = function(){onEditBroker(broker);};

		createAccordionItemDetailDiv("(" + broker.initials + ") " + broker.name + " " + broker.surname, parentTitle).className = "col-md-2";
		createAccordionItemDetailDiv(broker.branch, parentTitle).className = "col-md-2";

		var childContainer = document.createElement("UL");
		childContainer.className = "inner";

		parentLi.appendChild(parentTitle);
		parentLi.appendChild(childContainer);

		container.appendChild(parentLi);

		return childContainer;
	}

	function createAccordionItemDetailDiv(val, container)
	{
		var tDiv = document.createElement("DIV");
		tDiv.innerHTML = val;
		//tDiv.style.cssText = "margin-right: 80px;";
		container.appendChild(tDiv);
		return tDiv;
	}

	function createHeaderAccordionItem(container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex; background: #4287b5;";

		createAccordionItemDetailDiv("", childTitle).className = "col-md-1";
		createAccordionItemDetailDiv("Full Name: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Branch: ", childTitle).className = "col-md-2";

		childLi.appendChild(childTitle);
		container.appendChild(childLi);
	}