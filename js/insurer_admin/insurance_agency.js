$().ready(function() {

	populateBrokerageDetails();
 	populateInsurerTable();
});
function populateBrokerageDetails() {

	var agency = insurerAdminController.getInsuranceAgency();

 	$('#insurance_agency_name').text(agency['name']);

 	$('#insurance_agency_contact_number').text(agency['contactNumber']);

 	$('#insurance_agency_email').text(agency['email']);
}
function populateInsurerTable() {

	insurerAdminController.getInsurersOfInsuranceAgencyWithUserData(onGetInsurersOfInsuranceAgencyWithUserDataSuccess,onGetInsurersOfInsuranceAgencyWithUserDataFailure);
}
function onGetInsurersOfInsuranceAgencyWithUserDataSuccess(response) {

	var ulAccordian = $('#insurance_agency_insurer_table_body');
	ulAccordian.empty();

	var insurers = response['insurers'];

	for ( var i = 0; i < insurers.length; i++ ) {

		var insurer = insurers[i];

		var tr = $('<li></li>');
		ulAccordian.append(tr);

		var aToggle = $('<a></a>').addClass('toggle').prop('href',"javascript:void(0);");
		aToggle.append($('<td></td>')).text(insurer['initials'] + " " + insurer['surname'] + " ( " + insurer['name'] + ' )');
		tr.append(aToggle);

		var ulInner = $('<ul></ul').addClass('inner');
		tr.append(ulInner);

		ulInner.append($('<li>Hello Text</li>'));
	}

	setOnAccordionClicked();
}
function onGetInsurersOfInsuranceAgencyWithUserDataFailure(response) {

	alert("failed onGetInsurersOfInsuranceAgencyWithUserDataFailure");
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



