var loader;

var BROKER_ADMIN = "broker_admin";
var BROKER = "broker";
var INSURER_ADMIN = "insurerAdmin";

(function(){        

    loader = pageLoader();

    loader.load();

    initializeUploadFileModal();
})();

function initializeUploadFileModal() {

	// set the onSave to call callback
	$('#upload_file_modal_upload_button').on('click',function() {

		// TODO
		// send data and files to server
		$('#upload_file_modal_form').submit(false);
		util.createNotification('Documents successfully loaded.');


	});

	// add onClick listener to the Add file button
	$('#uploadFileInput').on('change',function() {
		
		var filename = $('#uploadFileInput').val().match(/[^\\/]*$/)[0];
		
		// Add name to file list
		$('#upload_file_uploaded_files_ul').append($('<li></li>').text(filename));
	});
}