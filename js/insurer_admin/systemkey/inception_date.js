(function init() {
	populateInceptionDelayDisplay();
})();

function populateInceptionDelayDisplay() {

	//var delayInDays = util.convertMillisecondsTo(insurerInvoker.getInceptionDelay(),'days');

	var delayInDays = util.convertMillisecondsTo(sessionStorage.COMMENCEMENT_DELAY,'days');

	$('#systemkey_inception_date_view_display').val(delayInDays);
}
