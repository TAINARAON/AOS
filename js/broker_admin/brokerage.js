$(function() {
    init();
  });

function test() {
	console.log(quoteInvoker.getDetailsOfQuote(1));
	//quoteInvoker.getDetailsOfQuote(0);
}

function init() {
	
	test();


	initializeModals();
	initializeText();
	populateBrokerTable();
}

function initializeModals() {
	
	loader.loadPartOfPage("html/broker_admin/edit_brokerage.html", 'edit_brokerage_modal_container');
}

function initializeText() {
	setBrokerageNameText();
	setBrokerageEmailText();
	setBrokerageFspNumberText();
	setBrokerageContactNumberText();
}

function populateBrokerTable() {

	var container = $('#broker_admin_broker_container');
	var brokers = getBrokersDetails();

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

	populateEditBrokerModalText(brokerInvoker.getBrokerWithDetails(id));
	setOnClickForEditBrokerSaveButton(id);
}

function populateEditBrokerModalText(broker) {
	$('#edit_broker_name_input').val(broker.name);
	$('#edit_broker_surname_input').val(broker.surname);
}
function setOnClickForEditBrokerSaveButton(brokerId) {

	$('#edit_broker_save_button').off().on('click', function() {
		alert(brokerId + ' changed to ' + $('#edit_broker_name_input').val());
	});
}

function onRevokeBroker(id) {
	debugTool.print('TODO',1,2);
	// Create dialog for user asking if he wants to revoke user <name><surname>.
	// Sends email to broker_admin with new credentials of account. 
	alert("revoke: "+id);
}

function getBrokersDetails() {
	return brokerInvoker.getBrokersWithDetails();
}

function setBrokerageNameText() {
	$('#broker_admin_brokerage_name').text(getNameOfBrokerage());
}

function setBrokerageEmailText() {
	$('#broker_admin_brokerage_email').text(getEmailOfBrokerage());
}

function setBrokerageFspNumberText() {
	$('#broker_admin_brokerage_fsp_number').text(getFspNumberOfBrokerage());
}

function setBrokerageContactNumberText() {
	$('#broker_admin_brokerage_contact_number').text(getContactNumberOfBrokerage());
}

function getNameOfBrokerage() {
	return "Lukraak Makelaars";
}
function getEmailOfBrokerage() {
	return "lmakelaars@gmail.com";
}
function getFspNumberOfBrokerage() {
	return "1ukr44km4k3144r5";
}
function getContactNumberOfBrokerage() {
	return "062-LUKRAAK";
}
