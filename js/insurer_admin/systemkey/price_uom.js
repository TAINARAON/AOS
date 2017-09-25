(function init() {
	repopulatePriceUomTable();
})();


function repopulatePriceUomTable() {

	var priceUoms = insurerInvoker.getPriceUoms();

	var tableBody = $('#systemkey_price_uom_view_price_uom_table_body');
	tableBody.empty();

	for ( var i = 0; i < priceUoms.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(priceUoms[i]['name']));

		tableBody.append(tr);
	}
}
