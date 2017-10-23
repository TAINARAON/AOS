(function() {

	init();
	
})();


function init() {

	setOnSaveButtonClickListener();
	getDistricts();
	getBusinessUnits();
}

function getBusinessUnits() {

	brokerController.getBusinessUnits(onGetBusinessUnitsSuccess,onGetBusinessUnitsFailure,brokerController.getBroker()['id']);
}
function onGetBusinessUnitsSuccess(response) {

	var businessUnits = response['businessUnits'];

	populateBusinessUnitDropdown(businessUnits);
}
function onGetBusinessUnitsFailure(response) {
	util.createNotification('Failed onGetBusinessUnitsFailure in brokerController','error');
}

function populateBusinessUnitDropdown(businessUnits) {

	var selectElement = $('#client_create_farm_business_unit_dropdown');

	var values = businessUnits;
	console.log(businessUnits);
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));	
	}
}

function getDistricts() {

	brokerController.getDistricts(onGetDistrictsSuccess,onGetDistrictsFailure);
}

function onGetDistrictsSuccess(response) {

	populateDistrictDropdown(response);
}
function onGetDistrictsFailure(response) {

	alert('something went wrong');
}

function populateDistrictDropdown(response) {

	var selectElement = $('#client_create_farm_district_dropdown');

	var values = response['districts']
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));	
	}
}

function getAllInputData() {

	var data = 
	{
		'businessUnitId':$('#client_create_farm_business_unit_dropdown').find(":selected").val(),
		'name':$('#client_create_farm_farm_name_input').val(),
		'districtId':$('#client_create_farm_district_dropdown :selected').val(),
		'latitude':$('#client_create_farm_latitude_input').val(),
		'longitude':$('#client_create_farm_longitude_input').val()
	};

	return data;
}

function setOnSaveButtonClickListener() {

	$('#client_create_farm_create_button').on('click',function() {

		var data = getAllInputData();
		createFarm(data);
	});
}

function createFarm(data) {

	var requestObject = {
		'farm':data
	};

	brokerController.createFarm(onFarmCreateSuccess,onFarmCreateFailure,requestObject);
}

function onFarmCreateSuccess(response) {

	util.createNotification('Farm successfully created');
	loader.loadPage('html/broker/client/client.html');
}

function onFarmCreateFailure(response) {
	util.createNotification('Oops, something went wrong with creating the farm!','error');
}


