(function init() {
	populateTaxDisplay();
})();

function populateTaxDisplay() {

	var percentage = insurerInvoker.getTax();

	$('#systemkey_tax_view_display').val(percentage);
}
