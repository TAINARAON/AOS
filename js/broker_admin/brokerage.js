console.log("broker_admin/brokerage.js loaded");

$(function() {
    init();
  });

function init() {
	initializeText();
	initializeOnClicks();
	initializeModals();
	populateBrokerTable();
}

function initializeModals() {
	loader.loadPartOfPage("html/broker_admin/edit_brokerage.html", 'edit_brokerage_modal_container');
}

function initializeOnClicks() {

}

function displayEditBrokerageModal() {

}

function initializeText() {
	setBrokerageNameText();
	setBrokerageEmailText();
	setBrokerageFspNumberText();
	setBrokerageContactNumberText();
}

function populateBrokerTable() {

	var brokers = getBrokers();

	for(var i = 0;i<brokers.length;i++) {

		let brokerId = brokers[i].id;

		$('#broker_admin_broker_table tbody')
			.append($('<tr></tr>').on('click',function() {
				onBrokerTableEntryClick(brokerId);
			})
				.append($('<td></td>').text(brokers[i].name))
				.append($('<td></td>').text(brokers[i].surname))
		)
	}
}

function onBrokerTableEntryClick(id) {
	alert('clicked on ' + id);
}

function getBrokers() {
	if(DEBUG_WARNINGS) console.warn("TODO");

	var brokers = [
		{
			'id':1,
			'name':'Tiaan',
			'surname':'Gerber'
		},
		{
			'id':2,
			'name':'Samantha',
			'surname':'Wiggill'
		}
	];

	return brokers;
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
	if(DEBUG_WARNINGS) {console.warn("TODO");}
	return "Lukraak Makelaars";
}
function getEmailOfBrokerage() {
	if(DEBUG_WARNINGS) console.warn("TODO");
	return "lmakelaars@gmail.com";
}
function getFspNumberOfBrokerage() {
	if(DEBUG_WARNINGS) console.warn("TODO");
	return "1ukr44km4k3144r5";
}
function getContactNumberOfBrokerage() {
	if(DEBUG_WARNINGS) console.warn("TODO");
	return "062-LUKRAAK";
}
