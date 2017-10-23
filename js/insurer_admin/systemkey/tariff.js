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

	insurerAdminController.getOptionTypes(
		function(response){
			for(var i = 0; i < response.length; i++)
			{
				selectElement.append($('<option></option>').text(response[i]['name']).val(response[i]['id']));
					
			}

			selectElement
				.on('change',function() {
					selectedValues['optionTypeId'] = $(this).find(":selected").val();
					repopulateTariffTable();
				});
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}

function populateCropDropdownValues() {

	var selectElement = $('#systemkey_tariff_view_crop_dropdown');

	insurerAdminController.getCrops(
		function(response){
			for(var i = 0; i < response.length; i++)
			{
				selectElement.append($('<option></option>').text(response[i]['name']).val(response[i]['id']));
			}

			selectElement
				.on('change',function() {
					selectedValues['cropId'] = $(this).find(":selected").val();
					repopulateTariffTable();
				});
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}

function repopulateTariffTable() {

	var tableBody = $('#systemkey_tariff_view_tariff_table_body');
	tableBody.empty();

	var cropId = selectedValues['cropId'];
	var districtId = selectedValues['districtId'];
	var optionTypeId = selectedValues['optionTypeId'];

	insurerAdminController.getTariffs(
		function(response){
			console.log('response');
			console.log(response);
			var validTariffs = filterTariffOptions(response,cropId,districtId,optionTypeId);

			for ( var i = 0; i < validTariffs.length; i++ ) {
				var detailedTariff = validTariffs[i];
				console.log(detailedTariff);
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
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);

	/*var tariffs = insurerInvoker.getTariffsByCropDistrictOptionType(cropId,districtId,optionTypeId);

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
	}*/
}

function filterTariffOptions(tariffs,cropId,districtId,tariffOptionTypeId)
{
	var validTariffs = [];

	for ( var i = 0; i < tariffs.length; i++ ) {

        var tariff = tariffs[i];
        // Filter by CropId
        if(cropId != 'ALL') {

            // Break out if doesnt pass
            if(tariff['cropId'] != cropId) {
                continue;
            }
        }

        // Filter by DistrictId
        if(districtId != 'ALL') {

            // Break out if doesnt pass
            if(tariff['districtId'] != districtId) {
                continue;
            }
        }

        // Filter by OptionTypeId
        if(tariffOptionTypeId != 'ALL') {

            // Break out if doesnt pass
            if(tariff['tariffOptionTypeId'] != tariffOptionTypeId) {
                continue;
            }
        }

        // If it has passed all the filters, add to valid tariff array
        validTariffs.push(tariff);
    }

    return validTariffs;
}
