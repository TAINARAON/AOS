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
		.on('click',function() {
			onRevokeBroker(broker.id);
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

	populateEditBrokerModalText(brokerAdminController.getBrokerForEditModal(id));
	setOnClickForEditBrokerSaveButton(id);
}

function populateEditBrokerModalText(brokerData) {

	populateTextFields(brokerData);
	populatePermissionCheckBoxes(brokerData);
	populateBrokerViewableBrokersComponent(brokerData);
	initializeSelectorComponent(brokerData);
	
}
function populateTextFields(brokerData) {

	$('#edit_broker_name_input').val(brokerData.name);
	$('#edit_broker_surname_input').val(brokerData.surname);
}
function populatePermissionCheckBoxes(brokerData) {
	console.log(brokerData);
}
function populateBrokerViewableBrokersComponent(brokerData) {
	// TODO
}
function setOnClickForEditBrokerSaveButton(brokerId) {

	$('#edit_broker_save_button').off().on('click', function() {

		updateBroker(brokerId);
	});
}

function updateBroker(brokerId) {

	var name = "";
	var surname = "";

	var clientRight = "";
	var policyRight = "";
	var damageReportRight = "";
	var quoteRight = "";

	var viewableBrokers = [];

	var brokerData = {

	}

	var result = brokerAdminController.updateBroker(brokerData);

	// Probably need to bring up something to load supporting documents
	util.createNotification('Request to update broker successfull.');
	util.displayUploadFileModal('hi',test);
}

function test() {
	alert('callback is working');
}

function onRevokeBroker(id) {
	
	alert("revoke: "+id);
}


function initializeSelectorComponent(brokerData) {
	populateSelectorBox(brokerData);
	onAddClickListener();
	onRemoveClickListener();
}
function populateSelectorBox(brokerData) {

	// TODO
	var brokers = brokerData['brokerViewableBrokers'];
	
	var availableBrokersUl = $('#availabe_brokers_ul');

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


function onAddClickListener() {

	$('#add_button').on('click',function() {

		var listItems = $('#availabe_brokers_ul .selected');

		for(var i=0;i<listItems.length;i++) {

			var item = listItems.eq(i);
			item.detach();

			$('#selected_brokers_ul').append(item);
			toggleSelectedListItem(item);
		}
	});
}


function onRemoveClickListener() {

	$('#remove_button').on('click',function() {

		var listItems = $('#selected_brokers_ul .selected');

		for(var i=0;i<listItems.length;i++) {

			var item = listItems.eq(i);
			item.detach();

			$('#availabe_brokers_ul').append(item);
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
