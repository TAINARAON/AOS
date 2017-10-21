(function init() {

	initiateInceptionDateModalValues();
	setOnClickListener();

})();

function initiateInceptionDateModalValues() {

	//var delayInDays = util.convertMillisecondsTo(insurerInvoker.getInceptionDelay(),'days');
	var delayInDays = util.convertMillisecondsTo(sessionStorage.COMMENCEMENT_DELAY,'days');
	$('#inception_date_input').val(delayInDays);
}

function setOnClickListener() {

	$('#systemkey_inception_date_save_button').on('click',function() {
		onSaveInceptionDelayClick();
	});	
}

function onSaveInceptionDelayClick() {
	var newDelay = $('#inception_date_input').val();

	var newDelayInMilliseconds = util.convertToMilliseconds(newDelay,'days');
	var requestObj = {'inceptionDelay':newDelayInMilliseconds};
	
	//add to DB
	insurerAdminController.updateInceptionDelay(
		function(response){
			util.createNotification(response.message);
			sessionStorage.COMMENCEMENT_DELAY = newDelayInMilliseconds;
			$('#systemkey_inception_date_view_display').val(newDelay);
		},
		function(response){
			util.createNotification(response.message,'error');
		},
		requestObj
	);
}