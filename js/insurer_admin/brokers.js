(function() {
	var brokeragesAndBrokers = [];
	init();
})();

var brokerElementsInBrokerTableByBrokerage = [];

function init() {
	getBrokeragesAndTheirBrokers();
}

function getBrokeragesAndTheirBrokers() {

	insurerAdminController.getBrokeragesAndTheirBrokers(onGetBrokeragesAndTheirBrokersSuccess,onGetBrokeragesAndTheirBrokersFailure);
}

function onGetBrokeragesAndTheirBrokersSuccess(response) {

	brokeragesAndBrokers = response['brokeragesAndBrokers'];

	populateBrokeragesDropdownValues();
}

function onGetBrokeragesAndTheirBrokersFailure() {

	alert("failure");
}

function populateBrokeragesDropdownValues() {

	var selectElement = $('#insurer_admin_brokers_brokerage_dropdown');

	for(var i = 0; i < brokeragesAndBrokers.length; i++)
	{
		var brokerage = brokeragesAndBrokers[i];

		selectElement.append($('<option></option>').text(brokerage['name']).val(brokerage['id']));	
	}

	setBrokerageDropdownSelectionListener(selectElement);

	// Populate table
	$("#insurer_admin_brokers_brokerage_dropdown").trigger('change');
}

function setBrokerageDropdownSelectionListener(selectElement) {

	selectElement.on('change',function() {

		onBrokerageSelected($(this).val());
	});
}

function onBrokerageSelected(brokerageId) {

	clearBrokerTable();

	var brokers = getBrokersOfBrokerageSelected(brokerageId);

	populateBrokerTable(brokers);
}

function getBrokerageById(brokerageId) {

	for(var i = 0; i < brokeragesAndBrokers.length; i++) {
		if(brokeragesAndBrokers[i]['id'] == brokerageId) {
			return brokeragesAndBrokers[i];
		}
	}

	alert('didnt find a thing');
}

function clearBrokerTable() {

	$("#insurer_admin_broker_container").empty();
}

function getBrokersOfBrokerageSelected(brokerageId) {

	var brokers = [];

	if(brokerageId == "ALL") {

		// Add all brokers to table
		for(var i = 0; i < brokeragesAndBrokers.length;i++) {

			brokerageId = brokeragesAndBrokers[i]['id'];
			var thisBrokeragesBrokers = getBrokersOfBrokerageSelected(brokerageId);
			for(var j = 0; j < thisBrokeragesBrokers.length; j++) {
				brokers.push(thisBrokeragesBrokers[j]);
			}
		}

	} else {

		var brokerage = getBrokerageById(brokerageId);
		brokers = brokerage['brokers'];
	}

	return brokers;
}

function populateBrokerTable(brokers) {

	var brokerTable = $('#insurer_admin_broker_container');

	for(var i = 0; i < brokers.length; i++) {
		createBrokerEntry(brokers[i],brokerTable);
	}
}

function createBrokerEntry(broker,container) {

	var header = $('<button></button>')
		.addClass('accordion')
		.text(broker['initials'] + " " + broker['surname'] + " (" + broker['name'] + ")")
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
		.append($('<p>Name: '+ 'TODO' + '</p>'))
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

	insurerAdminController.getBrokerForEditModal(getBrokerForEditModalSuccessCallback,getBrokerForEditModalFailureCallback,id);
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
}

function editBrokerFailureCallback(response) {
	// TODO
	util.createNotification('Request to update broker successful.',"error");
}