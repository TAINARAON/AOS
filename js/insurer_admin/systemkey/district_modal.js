(function init() {
	initiateOnClicks();
})();

/*function repopulateDistrictTable() {

	var districts = insurerInvoker.getDistricts();

	var tableBody = $('#systemkey_district_view_district_table_body');
	tableBody.empty();

	for ( var i = 0; i < districts.length; i++ ) {
		alert(i);
		var tr = $('<tr></tr>')
			.append($('<td></td>').text(districts[i]['name']));

		tableBody.append(tr);
	}
}*/

function initiateOnClicks() {
	// save button
	$('#systemkey_district_save_button').on('click',function() {

		var name = $('#systemkey_district_name_input').val();
		var districtObject = {
			'name':name
		}

		console.log(districtObject);

		insurerAdminController.createDistrict(
			function(response){
				util.createNotification(response.message);
			
				repopulateDistrictTable();
			},
			function(response){
				util.createNotification(response.message,'error');
			},
			districtObject
		);	
	});
}

