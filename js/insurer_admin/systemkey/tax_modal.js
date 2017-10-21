(function init() {

	initiateTaxModalValues();
	setOnClickListener();

})();

function initiateTaxModalValues() {

	insurerAdminController.getTax(
		function(response){
			$('#systemkey_tax_modal_percentage_input').val(response.percentage);
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}

function setOnClickListener() {

	$('#systemkey_tax_save_button').on('click',function() {
		onTaxSaveClick();
	});	
}

function onTaxSaveClick() {

	var newValue = $('#systemkey_tax_modal_percentage_input').val();
	var requestObj = {'persentage':newValue};

	insurerAdminController.updateTax(
		function(response){
			util.createNotification(response.message);

			// update view
			$('#systemkey_tax_view_display').val(newValue);
		},
		function(response){
			util.createNotification(response.message,'error');
		},
		requestObj
	);
}