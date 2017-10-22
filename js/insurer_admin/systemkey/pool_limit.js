var selectedValues = {
	"districtId":'ALL',
	"cropId":'ALL'
};

var tableRowEntries = [];

var crops = [];
var districts = [];
var limits = [];

(function init() {

	getAllNeededData();	
})();

function getAllNeededData() {

	insurerAdminController.getDataForPoolLimitSystemkeyView(getDataSuccessCallback,getDataFailureCallback);
}

function getDataSuccessCallback(response) {

	crops = response['crops'];
	districts = response['districts'];
	limits = response['limits'];

	populateDistrictDropdownValues();
	populateCropDropdownValues();

	populatePoolLimitTable();
}
function getDataFailureCallback(response) {

	alert("fail getDataFailureCallback");
}

function populateDistrictDropdownValues() {

	var selectElement = $('#systemkey_pool_limit_view_district_dropdown');
	
	for(var i = 0; i < districts.length; i++)
	{
		selectElement.append($('<option></option>').text(districts[i]['name']).val(districts[i]['id']));	
	}

	// on Click listener
	selectElement.on('change', function() {
			selectedValues['districtId'] = $(this).find(":selected").val();
			filterPoolLimitTable();
		});
}

function populateCropDropdownValues() {

	var selectElement = $('#systemkey_pool_limit_view_crop_dropdown');

	var values = crops;
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
	}

	selectElement.on('change',function() {
			selectedValues['cropId'] = $(this).find(":selected").val();
			filterPoolLimitTable();
		});
}

function populatePoolLimitTable() {

	var tableBody = $('#systemkey_pool_limit_view_pool_limit_table_body');
	tableBody.empty();

	for(var i = 0; i < limits.length; i++) {

		var limit = limits[i];	

		var tr = $('<tr></tr>')
			.append($('<td></td>').text(getCropNameByCropId(limit['cropId'])))
			.append($('<td></td>').text(getDistrictNameByDistrictId(limit['districtId'])))
			.append($('<td></td>').text(limit['maximum']))
			.append($('<td></td>').text(limit['runningValue']))
			.append($('<td></td>').text( getPercentageFilled(limit['runningValue'],limit['maximum']) ))
			.append($('<td></td>').text(limit['additionalTariff']));

		// Keep track of table entries, so that I can just hide them as needed
		var entry = {
			'cropId':limit['cropId'],
			'districtId':limit['districtId'],
			'element':tr
		}
		tableRowEntries.push(entry);

		tableBody.append(tr);
	}
}
function getPercentageFilled(current, max) {

	return (current / max * 100).toFixed(2) + "";
}
function getCropNameByCropId(cropId) {

	for(var i = 0; i < crops.length; i++) {
		if(crops[i]['id'] == cropId) {
			return crops[i]['name'];
		}
	}
}
function getDistrictNameByDistrictId(districtId) {

	for(var i = 0; i < districts.length; i++) {
		if(districts[i]['id'] == districtId) {
			return districts[i]['name'];
		}
	}
}

function filterPoolLimitTable() {

	hideAllTableEntries();

	var cropId = selectedValues['cropId'];
	var districtId = selectedValues['districtId'];

	var elements = findElementsByCropDistrict(cropId,districtId);

	for(var i = 0; i < elements.length; i++) {
		elements[i]['element'].show();
	}
}

function hideAllTableEntries() {

	for(var i = 0; i < tableRowEntries.length; i++) {
		tableRowEntries[i]['element'].hide();
	}
}

function findElementsByCropDistrict(cropId,districtId) {

	var elements = [];

	for(var i = 0; i < tableRowEntries.length; i++) {
		var tableRowEntry = tableRowEntries[i];

		var matchingCrop = (tableRowEntry['cropId'] == cropId || cropId == 'ALL');
		var matchingDistrict = (tableRowEntry['districtId'] == districtId || districtId == 'ALL');

		if( matchingCrop && matchingDistrict) {
			elements.push(tableRowEntry);
		}
	}

	return elements;
}