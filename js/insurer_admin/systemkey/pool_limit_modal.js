// Keeps track of peril elements, so that it can be shown or hidden.
var perilEntryElements = [];

(function init() {

	populateProductDropdownValues();
	populateDistrictDropdownValues();

	setOnSaveListener();
})();

function setOnSaveListener() {
	$('#systemkey_pool_limit_save_button').on('click',function() {
		savePoolLimit();
	});
}

function populateProductDropdownValues() {
	var selectElement = $('#systemkey_pool_limit_product_dropdown');

	var values = insurerInvoker.getProducts();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement
			.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))
			.on('change',function() {
				$('#systemkey_tariff_crop_dropdown_container').show();
				repopulateCropDropdownValues($(this).find(":selected").val());
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
}
function populateDistrictDropdownValues()
{
	var selectElement = $('#systemkey_tariff_district_dropdown');

	var values = insurerInvoker.getDistricts();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
	}
}


function saveTariff() {

	var tariffOptionDamageTypeArray = [];

	var tariffOptionTypeId = $('#systemkey_tariff_option_type_dropdown').find(":selected").val();
	var cropId = $('#systemkey_tariff_crop_dropdown').find(":selected").val();
	var districtId = $('#systemkey_tariff_district_dropdown').find(":selected").val();
	var coverage = $('#systemkey_tariff_coverage_input').val();

	for ( var i = 0; i < perilEntryElements.length; i++) {
		var perilEntry = perilEntryElements[i];

		if(perilEntry.is(":visible")) {

			var perilTypeId = perilEntry.prop('id');

			var	 tariffElement = perilEntry.find( '.tariff_amount_element' );

			var tariffAmount = tariffElement.val();
			var isDefault = perilEntry.find( '.tariff_default_checkbox' ).is(":checked");

			var tariffOptionDamageTypeObject = {
				'damageTypeId':perilTypeId,
				'tariff':tariffAmount,
				'isDefault':isDefault
			};

			tariffOptionDamageTypeArray.push(tariffOptionDamageTypeObject);
		};
	};
	
	// tariffOptionDamageTypeArray needs to be passed with this object, since the array needs the ID of the newly created tariff option
	var tariffOptionObject = {
		'tariffOptionTypeId':tariffOptionTypeId,
		'cropId':cropId,
		'districtId':districtId,
		'coverage':coverage,
	}

	console.log(tariffOptionObject);
	console.log(tariffOptionDamageTypeArray);

	if(validateValues(coverage,tariffOptionDamageTypeArray)) {

		var newTariffOptionId = insurerInvoker.createTariffOption(tariffOptionObject,tariffOptionDamageTypeArray);

		if(newTariffOptionId != null) {

			// reload tariff table in tariff view
			$('#systemkey_tariff_view_district_dropdown').trigger('change');

			displaySuccessNotification();
			resetModal();

		} else {

			displayFailureNotification("Error with creating tariff");
		}
	} else {

		displayFailureNotification("fill stuff in please");
	}
}

function resetModal() {
	// clear coverage
	$('#systemkey_tariff_coverage_input').val('');

	// untick all perils
	$('#systemkey_tariff_peril_container input:checkbox:checked').trigger('click');

	// untick all defaults
	$('#peril_tariff_entries_main_container input:checkbox:checked').trigger('click');	
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