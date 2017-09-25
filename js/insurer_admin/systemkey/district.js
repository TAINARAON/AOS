(function init() {
	repopulateDistrictTable();
})();


function repopulateDistrictTable() {

	var districts = insurerInvoker.getDistricts();

	var tableBody = $('#systemkey_district_view_district_table_body');
	tableBody.empty();

	for ( var i = 0; i < districts.length; i++ ) {
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(districts[i]['name']));

		tableBody.append(tr);
	}
}
