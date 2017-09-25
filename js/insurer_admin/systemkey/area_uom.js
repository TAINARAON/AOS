(function init() {
	repopulateAreaUomTable();
})();


function repopulateAreaUomTable() {

	var areaUoms = insurerInvoker.getAreaUoms();

	var tableBody = $('#systemkey_area_uom_view_area_uom_table_body');
	tableBody.empty();

	for ( var i = 0; i < areaUoms.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(areaUoms[i]['name']));

		tableBody.append(tr);
	}
}
