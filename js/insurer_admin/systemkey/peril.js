(function init() {
	repopulatePerilTable();
})();


function repopulatePerilTable() {
	var tableBody = $('#systemkey_peril_view_peril_table_body');
	tableBody.empty();

	insurerAdminController.getPerils(
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
