(function init() {
	populateInceptionDelayDisplay();
})();

function populateInceptionDelayDisplay() {

	var delayInDays = util.convertMillisecondsTo(insurerInvoker.getInceptionDelay(),'days');

	$('#systemkey_inception_date_view_display').val(delayInDays);
}
