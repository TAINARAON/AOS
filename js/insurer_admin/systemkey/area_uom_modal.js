(function init() {
	initiateOnClicks();
})();

function repopulateAreaUomTable() {

	var areaUoms = insurerInvoker.getAreaUoms();

	var tableBody = $('#systemkey_area_uom_view_area_uom_table_body');
	tableBody.empty();

	for ( var i = 0; i < areaUoms.length; i++ ) {
		alert(i);
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(areaUoms[i]['name']));

		tableBody.append(tr);
	}
}

function initiateOnClicks() {
	// save button
	$('#systemkey_area_uom_save_button').on('click',function() {

		var name = $('#systemkey_area_uom_name').val();
		var areaUomObject = {
			'name':name
		}

		console.log(areaUomObject);

		var newAreaUomId = insurerInvoker.createAreaUom(areaUomObject);

		if(newAreaUomId != null) {
			
			util.createNotification('Created Area Measurement Unit!');
			
			repopulateAreaUomTable();
		
		} else {
			util.createNotification('Error creating Area Unit of Measurement.','error');
		}	

	});
}

