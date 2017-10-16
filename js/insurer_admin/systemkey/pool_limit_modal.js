var crops = [];
var districts = [];

var requiredFields = [false,false];
var CROP_INDEX = 0;
var DISTRICT_INDEX = 1;

(function init() {

	getCreatePoolLimitData();

	setOnSaveListener();
})();

function getCreatePoolLimitData() {

	insurerAdminController.getCreatePoolLimitData(getCreatePoolLimitDataSuccess,getCreatePoolLimitDataFailure);
}

function getCreatePoolLimitDataSuccess(response) {

	crops = response['crops'];
	districts = response['districts'];

	populateCropDropdownValues();
}
function getCreatePoolLimitDataFailure(response) {

	alert("failed getCreatePoolLimitDataFailure");
}

function setOnSaveListener() {
	$('#systemkey_pool_limit_save_button').on('click',function() {
		savePoolLimit();
	});
}

function populateCropDropdownValues() {

	var selectElement = $('#systemkey_pool_limit_crop_dropdown');

	var values = crops;
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement
			.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))
			.on('change',function() {
				filterTable($(this).find(":selected").val());
			});
	}
}

function repopulateCropDropdownValues(productId)
{
	var selectElement = $('#systemkey_tariff_crop_dropdown');
	selectElement.empty();

	var values = insurerInvoker.getCropsOfProduct(productId);
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
	}

	selectElement.on('change',function() {
		requiredFields[CROP_INDEX] = true;
	})
}
function populateDistrictDropdownValues() {

	var selectElement = $('#systemkey_tariff_district_dropdown');

	var values = districts;
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
	}

	selectElement.on('change',function() {
		requiredFields[DISTRICT_INDEX] = true;
	})
}

function savePoolLimit() {

	if(allFieldsAreCompleted()) {

		var cropId = $('#systemkey_pool_limit_crop_dropdown').find(":selected").val();
		var districtId = $('#systemkey_pool_limit_district_dropdown').find(":selected").val();
		var maximum = $('#systemkey_pool_limit_pool_size_input').val();
		var additionalTariff = $('#systemkey_pool_limit_additional_tariff_input').val();

		var requestObject = 
		{
			'cropId':cropId,
			'districtId':districtId,
			'maximum':maximum,
			'additionalTariff':additionalTariff
		};

		insurerAdminController.createPoolLimit(createPoolLimitSuccess,createPoolLimitFailure,requestObject);

	} else {
		util.createNotification('Please complete all fields','error');
	}
}

function createPoolLimitSuccess() {
	util.createNotification('Created Pool Limit');
	resetModal();
	
	// Reload page - TODO: currently the whole systemkeys page is reloaded. Only the limit pool needs to be refreshed
	loader.loadPage('html/insurer_admin/systemkeys.html');

}
function createPoolLimitFailure() {

	alert("failed to create pool limit");
}

function allFieldsAreCompleted() {
	for(var i = 0; i < requiredFields.length; i++) {
		if(requiredFields[i] == false) {
			return false;
		}
	}

	return true;
}

function resetModal() {

	$('#systemkey_pool_limit_crop_dropdown').find('option:eq(0)').prop('selected', true);
	$('#systemkey_pool_limit_district_dropdown').find('option:eq(0)').prop('selected', true);
	$('#systemkey_pool_limit_pool_size_input').val('');
	$('#systemkey_pool_limit_additional_tariff_input').val('');

	for(var i = 0; i < requiredFields.length; i++) {
		requiredFields[i] = false;
	}
}

function displayFailureNotification(message) {

	util.createNotification(message,'error');
	
}
function displaySuccessNotification() {
	
	util.createNotification('Tariff created!');
}

function validateValues(coveragePercentage,tariffOptionDamageTypesArray) {
	// TODO
	return true;
}