(function init() {

	initiateTaxModalValues();
	setOnClickListener();

})();

function initiateTaxModalValues() {

	var percentage = insurerInvoker.getTax();

	$('#systemkey_tax_modal_percentage_input').val(percentage);
}

function setOnClickListener() {

	$('#systemkey_tax_save_button').on('click',function() {
		onSaveClick();
	});	
}

function onSaveClick() {

	var newValue = $('#systemkey_tax_modal_percentage_input').val();

	//add to DB
	var newValueId = insurerInvoker.updateTax(newValue);

	if(newValueId != null) {

		util.createNotification('Updated Tax Percentage!');

		// update view
		$('#systemkey_tax_view_display').val(newValue);

	} else {

		util.createNotification('Failure to update Tax Percentage.','error');
	}
}