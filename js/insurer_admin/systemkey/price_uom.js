(function init() {
	repopulatePriceUomTable();
})();


function repopulatePriceUomTable() {

	var tableBody = $('#systemkey_price_uom_view_price_uom_table_body');
	tableBody.empty();

	insurerAdminController.getPriceUoms(
		function(response){
			for ( var i = 0; i < response.length; i++ ) {
				var tr = $('<tr></tr>')
					.append($('<td></td>').text(response[i]['name']));

				tableBody.append(tr);
			}
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}
