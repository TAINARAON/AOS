(function() {

	init();
	
})();


function init() {

	setOnSaveButtonClickListener();
}

function getAllInputData() {

	var data = 
	{
		'name':$('#client_create_farm_farm_name_input').val(),
		'districtId':$('#client_create_farm_select_district :selected').val(),
		'latitude':$('#client_create_farm_latitude_input').val(),
		'longitude':$('#client_create_farm_longitude_input').val()
	};

	return data;
}

function setOnSaveButtonClickListener() {

	$('#client_create_farm_create_button').on('click',function() {
		alert('saving');
		getAllInputData();
	});
}
