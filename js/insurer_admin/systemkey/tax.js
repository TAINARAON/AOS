(function init() {
	populateTaxDisplay();
})();

function populateTaxDisplay() {

	insurerAdminController.getTax(
		function(response){
			$('#systemkey_tax_view_display').val(response.percentage);
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}
