$().ready(function(){

	var agency = insurerInvoker.getInsuranceAgency();

 	$('#insurance_agency_name').text(agency['name']);

 	$('#insurance_agency_contact_number').text(agency['contactNumber']);

 	$('#insurance_agency_email').text(agency['email']);
});
