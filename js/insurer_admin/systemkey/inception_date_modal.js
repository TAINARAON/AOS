(function init() {

	initiateInceptionDateModalValues();
	setOnClickListener();

})();

function initiateInceptionDateModalValues() {

	var delayInDays = util.convertMillisecondsTo(insurerInvoker.getInceptionDelay(),'days');

	$('#inception_date_input').val(delayInDays);
}

function setOnClickListener() {

	$('#systemkey_inception_date_save_button').on('click',function() {
		onSaveClick();
	});	
}

function onSaveClick() {

	var newDelay = $('#inception_date_input').val();

	var newDelayInMilliseconds = util.convertToMilliseconds(newDelay,'days');
	
	//add to DB
	var newDelayId = insurerInvoker.updateInceptionDelay(newDelayInMilliseconds);

	if(newDelayId != null) {

		util.createNotification('Updated Inception Delay!');

		// update view
		$('#systemkey_inception_date_view_display').val(newDelay);

	} else {

		util.createNotification('Failure to update Inception Delay.','error');
	}
}