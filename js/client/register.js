console.log('client/register.js working');

// ANY INPUT CHANGE
$( document ).on( 'change', '#register_client_form .required', function( e ) {

	var allInputElements = $('#register_client_form .required');

	for(var i = 0; i < allInputElements.length; i++) {
		if(allInputElements.eq(i).val() == "") {
			$('#register_client_submit_div').hide();
			return;
		}
	}

	$('#register_client_submit_div').show();
});

// SUBMIT BUTTON CLICK
$( document ).on( 'click', '#register_client_submit_button', function ( e ) {
    
    alert("tried to submit");
}); 
