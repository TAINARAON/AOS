(function init() {
	initiateOnClicks();
})();

function repopulatePerilTable() {

	var perils = insurerInvoker.getPerils();

	var tableBody = $('#systemkey_peril_view_peril_table_body');
	tableBody.empty();

	for ( var i = 0; i < perils.length; i++ ) {
		alert(i);
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(perils[i]['name']));

		tableBody.append(tr);
	}
}

function initiateOnClicks() {
	// save button
	$('#systemkey_peril_save_button').on('click',function() {

		var name = $('#systemkey_peril_name_input').val();
		var perilObject = {
			'name':name
		}

		console.log(perilObject);

		var newPerilId = insurerInvoker.createPeril(perilObject);

		if(newPerilId != null) {
			
			util.createNotification('Created Peril!');
			
			repopulatePerilTable();
		
		} else {
			util.createNotification('Error creating Peril.','error');
		}	

	});
}
