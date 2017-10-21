(function init() {
	repopulateAreaUomTable();
})();


function repopulateAreaUomTable() {

	insurerAdminController.getAreaUoms(
		function(response){
			var areaUoms = response;

			var tableBody = $('#systemkey_area_uom_view_area_uom_table_body');
			tableBody.empty();

			for ( var i = 0; i < areaUoms.length; i++ ) {
				var tr = $('<tr></tr>')
					.append($('<td></td>').text(areaUoms[i]['name']));

				tableBody.append(tr);
			}
		},
		function(response){
			util.createNotification(response.message);
		}
	);
}
