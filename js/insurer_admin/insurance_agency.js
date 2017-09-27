$().ready(function(){

	var agency = insurerInvoker.getInsuranceAgency();

 	$('#insurance_agency_name').text(agency['name']);

 	$('#insurance_agency_contact_number').text(agency['contactNumber']);

 	$('#insurance_agency_email').text(agency['email']);

 	populateInsurerTable();
 	
});

function populateInsurerTable() {

	var insurers = insurerInvoker.getAllInsurersClean();

	var tableBody = $('#insurance_agency_insurer_table_body');
	tableBody.empty();

	for ( var i = 0; i < insurers.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(insurers[i]['name']))
			.append($('<td></td>').text(insurers[i]['surname']))

		tableBody.append(tr);
	}
}

$('.toggle').click(function(e) {
  	e.preventDefault();
  
    var $this = $(this);
  
    if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});

