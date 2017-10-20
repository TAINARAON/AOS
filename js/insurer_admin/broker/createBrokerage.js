(function() {

	init();
	
})();


function init() {

	setOnSubmitListener();
}


function setOnSubmitListener() {
	$('#insurer_admin_register_submit_button').on('click',function() {

		var detailsObject = {
			'email':getEmail()
		};

		util.displayUploadFileModal(detailsObject,onFilesUploadedCallback);
	})
}

function onFilesUploadedCallback(files, extraData) {

	util.createNotification('Brokerage created successfully. Email sent to:\n'+extraData['email']);
	loader.loadPage('html/insurer_admin/brokers.html');
}

function getEmail() {
	return $('#insurer_admin_register_email_input').val();
}