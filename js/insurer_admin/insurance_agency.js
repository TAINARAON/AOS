$().ready(function(){

	var agency = insurerInvoker.getInsuranceAgency();

 	$('#insurance_agency_name').text(agency['name']);

 	$('#insurance_agency_contact_number').text(agency['contactNumber']);

 	$('#insurance_agency_email').text(agency['email']);

 	populateInsurerTable();
 	
});

function populateInsurerTable() {

	
	var tableBody = $('#insurance_agency_insurer_table_body');
	tableBody.empty();

	var ulAccordian = $('<ul></ul>').addClass('accordion');
	tableBody.append(ulAccordian);

	var insurers = insurerInvoker.getAllInsurersClean();
	for ( var i = 0; i < insurers.length; i++ ) {

		var tr = $('<li></li>');
		ulAccordian.append(tr);

		var aToggle = $('<a></a>').addClass('toggle');
		aToggle.append($('<td></td>')).text(insurers[i]['name']);
		tr.append(aToggle);

		var ulInner = $('<ul></ul').addClass('inner');
		tr.append(ulInner);

		ulInner.append($('<li>Hello Text</li>'));
	}

	/*<ul class="accordion">
  <li>
    <a class="toggle">Item 1</a>
    <ul class="inner">
      <li>Option 1</li>
      <li>Option 2</li>
      <li>Option 3</li>
    </ul>
  </li>*/
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

