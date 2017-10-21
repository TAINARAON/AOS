(function init() {
	populateProductDropdownValues();
	repopulateCropTable('ALL');
})();

function populateProductDropdownValues() {

	var selectElement = $('#systemkey_crop_view_product_dropdown');

	insurerAdminController.getProducts(
		function(response){
			var values = response;

			for(var i = 0; i < values.length; i++)
			{
				selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))	
			}

			selectElement
				.on('change',function() {
					repopulateCropTable($(this).find(":selected").val());
				});
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}

function repopulateCropTable(productId) {

	var cropTableBody = $('#systemkey_crop_view_crop_table_body');
	cropTableBody.empty();

	var crops;
	if(productId == 'ALL') {
		insurerAdminController.getCrops(
			function(response){
				for ( var i = 0; i < response.length; i++ ) {
					var tr = $('<tr></tr>')
						.append($('<td></td>').text(response[i]['name']))
						.append($('<td></td>').text(response[i]['productName']))
						.append($('<td></td>').text(response[i]['priceUomName']))
						.append($('<td></td>').text(response[i]['areaUomName']));

					cropTableBody.append(tr);
				}
			},
			function(response){
				util.createNotification(response.message,'error');
			}
		);
	} else {
		var requestObj = {'productId':productId};
		insurerAdminController.getCropsOfProduct(
			function(response){
				for ( var i = 0; i < response.length; i++ ) {
					var tr = $('<tr></tr>')
						.append($('<td></td>').text(response[i]['name']))
						.append($('<td></td>').text(response[i]['productName']))
						.append($('<td></td>').text(response[i]['priceUomName']))
						.append($('<td></td>').text(response[i]['areaUomName']));

					cropTableBody.append(tr);
				}
			},
			function(response){
				util.createNotification(response.message,'error');
			},
			requestObj
		);
	}
}

