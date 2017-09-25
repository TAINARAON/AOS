(function init() {
	initiateOnClicks();
})();

function initiateOnClicks() {
	// save button
	$('#systemkey_price_uom_save_button').on('click',function() {

		var name = $('#systemkey_price_uom_name').val();
		var priceUomObject = {
			'name':name
		}

		var newPriceUomId = insurerInvoker.createPriceUom(priceUomObject);

		if(newPriceUomId != null) {

			util.createNotification('Created Price Measurement Unit!');
			repopulatePriceUomTable();
		
		} else {

			util.createNotification('Error creating Price Unit of Measurement.','error');
		}	

	});
}

function repopulatePriceUomTable() {

	var priceUoms = insurerInvoker.getPriceUoms();

	var tableBody = $('#systemkey_price_uom_view_price_uom_table_body');
	tableBody.empty();

	var crops;

	for ( var i = 0; i < priceUoms.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(priceUoms[i]['name']));

		tableBody.append(tr);
	}
}