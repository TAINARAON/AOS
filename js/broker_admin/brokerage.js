console.log("broker_admin/brokerage.js loaded");

$(function() {
    init();
  });

function init() {
	initializeText();
	initializeOnClicks();
	initializeModals();
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
