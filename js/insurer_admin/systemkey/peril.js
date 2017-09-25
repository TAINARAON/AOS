(function init() {
	repopulatePerilTable();
})();


function repopulatePerilTable() {

	var perils = insurerInvoker.getPerils();

	var tableBody = $('#systemkey_peril_view_peril_table_body');
	tableBody.empty();

	for ( var i = 0; i < perils.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(perils[i]['name']));

		tableBody.append(tr);
	}
}
