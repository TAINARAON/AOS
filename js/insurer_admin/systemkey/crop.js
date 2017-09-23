(function init() {
	populateProductDropdownValues();
	repopulateCropTable('ALL');
})();

function populateProductDropdownValues() {

	var selectElement = $('#systemkey_crop_view_product_dropdown');

	var values = insurerInvoker.getProducts();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))	
	}

	selectElement
		.on('change',function() {
			repopulateCropTable($(this).find(":selected").val());
		});
}

function repopulateCropTable(productId) {

	var cropTableBody = $('#systemkey_crop_view_crop_table_body');
	cropTableBody.empty();

	var crops;
	if(productId == 'ALL') {
		crops = insurerInvoker.getCrops();
	} else {
		crops = insurerInvoker.getCropsOfProduct(productId);
	}

	var detailsOfCrops = insurerInvoker.getDetailsOfCrops(crops);

	for ( var i = 0; i < detailsOfCrops.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(detailsOfCrops[i]['name']))
			.append($('<td></td>').text(detailsOfCrops[i]['productName']))
			.append($('<td></td>').text(detailsOfCrops[i]['priceUomName']))
			.append($('<td></td>').text(detailsOfCrops[i]['areaUomName']));

		cropTableBody.append(tr);
	}
}

