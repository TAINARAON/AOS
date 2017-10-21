var selectedValues = {
	"districtId":'ALL',
	"optionTypeId":'ALL',
	"cropId":'ALL'
};

(function init() {
	populateDistrictDropdownValues();
	populateOptionTypeDropdownValues();
	populateCropDropdownValues();
	repopulateTariffTable();
})();

function populateDistrictDropdownValues() {

	var selectElement = $('#systemkey_tariff_view_district_dropdown');

	insurerAdminController.getDistricts(
		function(response){
			for(var i = 0; i < response.length; i++)
			{
				selectElement.append($('<option></option>').text(response[i]['name']).val(response[i]['id']));	
			}

			selectElement
				.on('change',function() {
					selectedValues['districtId'] = $(this).find(":selected").val();
					repopulateTariffTable();
				});
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}

function populateOptionTypeDropdownValues() {

	var selectElement = $('#systemkey_tariff_view_option_type_dropdown');

	var values = insurerInvoker.getOptionTypes();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
			
	}

	selectElement
		.on('change',function() {
			selectedValues['optionTypeId'] = $(this).find(":selected").val();
			repopulateTariffTable();
		});
}

function populateCropDropdownValues() {

	var selectElement = $('#systemkey_tariff_view_crop_dropdown');

	var values = insurerInvoker.getCrops();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
	}

	selectElement
		.on('change',function() {
			selectedValues['cropId'] = $(this).find(":selected").val();
			repopulateTariffTable();
		});
}

function repopulateTariffTable() {

	var tableBody = $('#systemkey_tariff_view_tariff_table_body');
	tableBody.empty();

	var cropId = selectedValues['cropId'];
	var districtId = selectedValues['districtId'];
	var optionTypeId = selectedValues['optionTypeId'];

	var tariffs = insurerInvoker.getTariffsByCropDistrictOptionType(cropId,districtId,optionTypeId);

	var detailsOfTariffs = insurerInvoker.getDetailsOfTariffs(tariffs);

	for ( var i = 0; i < detailsOfTariffs.length; i++ ) {

		var detailedTariff = detailsOfTariffs[i];

		var tr = $('<tr></tr>')
			.append($('<td></td>').text(detailedTariff['tariffOptionTypeName']))
			.append($('<td></td>').text(detailedTariff['districtName']))
			.append($('<td></td>').text(detailedTariff['cropName']))
			.append($('<td></td>').text(detailedTariff['coverage']))
			//.append($('<td></td>').text(detailedTariff['coverageStart']))
			//.append($('<td></td>').text(detailedTariff['coverageEnd']));
			;
		tableBody.append(tr);
	}
}
