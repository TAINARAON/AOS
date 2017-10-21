(function init() {
	repopulateDistrictTable();
})();


function repopulateDistrictTable() {

	insurerAdminController.getDistricts(
		function(response){
			var tableBody = $('#systemkey_district_view_district_table_body');
			tableBody.empty();

			for ( var i = 0; i < response.length; i++ ) {
				var tr = $('<tr></tr>')
					.append($('<td></td>').text(response[i]['name']));

				tableBody.append(tr);
			}
		},function(response){
			util.createNotification(response.message,'error');
		}
	);
}
