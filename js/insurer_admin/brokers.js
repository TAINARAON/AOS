// [{brokerageId,element}]
var brokerElementsInBrokerTableByBrokerage = [];

(function() {

	var brokeragesAndBrokers = [];
	
	init();
	
})();


function init() {

	getBrokeragesAndTheirBrokers();
	setOnCreateBrokerageListener();
	setOnCreateBrokerListener();
}

function setOnCreateBrokerListener() {

	$('#insurer_admin_create_broker_button').on('click',function() {
		loader.loadPage('html/insurer_admin/broker/createBroker.html');
	});
}

function setOnCreateBrokerageListener() {

	$('#insurer_admin_create_brokerage_button').on('click',function() {
		loader.loadPage('html/insurer_admin/broker/createBrokerage.html');
	});
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

		// Add Broker entries in table
		var brokers = brokerage['brokers'];

		addBrokerEntriesToTable(brokerage['id'],brokers);
	}

	selectElement.on('change',function() {

		onBrokerageSelected($(this).val());
	});

	// Populate table
	selectElement.trigger('change');

	// set toggle. ugly but whatever
	setOnAccordionClicked();
}

function onBrokerageSelected(brokerageId) {

	hideAllBrokerEntries();

	showValidBrokers(brokerageId);
}

function addBrokerEntriesToTable(brokerageId,brokers) {
	// brokers = [{id (brokerId),initials,surname,name}]

	for( var i = 0; i < brokers.length; i++) {

		var element = createBrokerEntryElement(brokers[i]);

		var brokerElementObject = 
		{
			'brokerageId':brokerageId,
			'element':element
		};

		// Keep track of element
		brokerElementsInBrokerTableByBrokerage.push(brokerElementObject);

		// Add element to table
		$('#insurance_admin_broker_brokers_table_body').append(element);
	}
}

function setOnAccordionClicked() {

	$('.toggle').click(function(e) {

	  	e.preventDefault();

	    if ($(this).next().hasClass('show')) {
	        $(this).next().removeClass('show');
	        //$(this).next().slideUp(350);
	    } else {
	        $(this).parent().parent().find('li .inner').removeClass('show');
	        //$(this).parent().parent().find('li .inner').slideUp(350);
	        $(this).next().toggleClass('show');
	        //$(this).next().slideToggle(350);
	    }
	});
}
function hideAllBrokerEntries() {
	for(var i = 0; i < brokerElementsInBrokerTableByBrokerage.length; i++) {

		var brokerElementObject = brokerElementsInBrokerTableByBrokerage[i];
		brokerElementObject['element'].hide();
	}
}

function getBrokerageById(brokerageId) {

	for(var i = 0; i < brokeragesAndBrokers.length; i++) {
		if(brokeragesAndBrokers[i]['id'] == brokerageId) {
			return brokeragesAndBrokers[i];
		}
	}
	
	alert('didnt find a thing');
}

function showValidBrokers(brokerageId) {

	for(var i = 0; i < brokerElementsInBrokerTableByBrokerage.length; i++) {

		// entry = {brokerageId,element}
		var entry = brokerElementsInBrokerTableByBrokerage[i];

		if(entry['brokerageId'] == brokerageId || brokerageId == 'ALL') {

			entry['element'].show();
		}
	}
}

function createBrokerEntryElement(broker) {

	// Test
	var tr = $('<li></li>');

	var aToggle = $('<a></a>').addClass('toggle').prop('href',"javascript:void(0);");
	aToggle.append($('<td></td>')).text(broker['initials'] + " " + broker['surname'] + " ( " + broker['name'] + ' )');
	tr.append(aToggle);

	var ulInner = $('<ul></ul').addClass('inner');
	tr.append(ulInner);

	ulInner.append($('<li>Hello Text</li>'));

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


	return tr;
	// End of Test

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

	var entry = $('<div></div>')
		.append(header)
		.append(detailContainer);
	
	return entry;
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