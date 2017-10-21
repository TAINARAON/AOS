(function() {
	init();
})();


function init() {

	setOnSubmitButtonClickListener();
	setOnAddMemberButtonClickListener();
}

function setOnAddMemberButtonClickListener() {
	$('#business_unit_register_add_member_button').on('click',function() {
		onAddMemberButtonClicked();
	});
}

function setOnSubmitButtonClickListener() {

	$('#business_unit_register_submit_button').on('click',function() {
		var data = getAllValues();
		
		util.displayUploadFileModal(data,onFilesUploadedCallback);
	});
}

function onFilesUploadedCallback(files,data) {

	var requestObject = {
		'businessUnitData':data,
		'files':files
	}

	clientController.createBusinessUnit(onBusinessUnitRegisterSubmitSuccess,onBusinessUnitRegisterSubmitFailure,requestObject);
}

function onBusinessUnitRegisterSubmitSuccess(response) {
	
	util.createNotification('Successfully created Client');
	loader.loadPage('html/client/businessUnit/businessUnit.html');
}

function onBusinessUnitRegisterSubmitFailure(response) {
	
	alert('something broke');
}

function getAllValues() {

	var data = 
	{
		'name':$('#business_unit_register_name_input').val(),
		'email':$('#business_unit_register_email_input').val(),
		'vatNumber':$('#business_unit_register_vat_number_input').val(),
		'incomeTaxNumber':$('#business_unit_register_income_tax_number_input').val(),
		'members':members
	}

	return data;
}

var members = [];
function onAddMemberButtonClicked() {

	var details = getDetailsOfMemberBeingAdded();
	
	addMemberToMemberTable(details);
	members.push(details);

	resetMemberDetails();
}

function addMemberToMemberTable(details) {

	var body = $('#business_unit_register_member_table_body').append($('<tr></tr>')
		.append($('<td></td>').append(details['memberInitials'] +" " + details['memberSurname'] + " ("+details['memberPreferredName']+")"))
		.append($('<td></td>').append(details['memberIdNumber']))
		.append($('<td></td>').append(details['memberContactNumber']))
		.append($('<td></td>').append(details['memberEmail']))
		.append($('<td></td>').append(details['memberIsMain'])));
}

function getDetailsOfMemberBeingAdded() {

	var details = 
	{
		'memberInitials':$('#business_unit_register_member_name_input').val(),
		'memberSurname':$('#business_unit_register_member_surname_input').val(),
		'memberPreferredName':$('#business_unit_register_member_preferred_name_input').val(),
		'memberIdNumber':$('#business_unit_register_member_id_number_input').val(),
		'memberContactNumber':$('#business_unit_register_member_contact_number_input').val(),
		'memberEmail':$('#business_unit_register_member_email_input').val(),
		'memberIsMain':$('#business_unit_register_member_is_main_checkbox').is(':checked'),
	}

	return details;
}

function resetMemberDetails() {

	$('#business_unit_register_member_name_input').val(''),
	$('#business_unit_register_member_surname_input').val(''),
	$('#business_unit_register_member_preferred_name_input').val(''),
	$('#business_unit_register_member_id_number_input').val(''),
	$('#business_unit_register_member_contact_number_input').val(''),
	$('#business_unit_register_member_email_input').val(''),
	$('#business_unit_register_member_is_main_checkbox').prop('checked', false);
}