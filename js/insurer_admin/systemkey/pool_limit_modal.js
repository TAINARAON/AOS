// Keeps track of peril elements, so that it can be shown or hidden.
var perilEntryElements = [];

(function init() {
	populatePerilCheckboxes();
	populateOptionTypeDropdownValues();
	populateProductDropdownValues();
	populateDistrictDropdownValues();
})();

var checkedCounter = 0;
function populatePerilCheckboxes() {

	var perilContainer = $('#systemkey_tariff_peril_container');
	var checkboxRow;
	var perils = insurerInvoker.getPerils();

	for(let i = 0; i < perils.length; i++)
	{
		// Container where you fill in tariff
		addPerilRowEntry(perils[i]['id'],perils[i]['name']);

		// Place peril checkbox
		if(i % 4 == 0)
		{
			checkboxRow = $('<div></div>').addClass('row');
			perilContainer.append(checkboxRow);
		}

		var innerContainer = $('<div></div>').addClass('col-md-3');

		var label = $('<label></label>').text(perils[i]['name']);
		var inputElement = $('<input id="'+perils[i]['id']+'" type="checkbox"></input>')
			.change(function() {

				if(this.checked) {
					perilEntryElements[i].show();
					if(++checkedCounter > 0) {
						// show peril tarif container
						$('#peril_tariff_entries_main_container').show();
					}
				} else {
					perilEntryElements[i].hide();
					if(--checkedCounter == 0) {
						// hide peril tarif container
						$('#peril_tariff_entries_main_container').hide();
					}
				}
			});

		
		innerContainer.append(inputElement);
		innerContainer.append(label);

		checkboxRow.append(innerContainer);
	}
};

var tariffsOfPerils = [];
function addPerilRowEntry(perilId, perilName) {
	var perilTariffEntriesContainer = $('#peril_tariff_entries_container');

	// each entry is a tariffOptionDamageType
	var entryContainer = $('<div></div>').addClass('col-md-12').hide().prop('id',perilId);

	// Peril Name box
	var perilNameContainer = $('<div class="col-md-3"></div>');
	var perilNameElement = $('<input class="form-control"></input>').val(perilName).prop('disabled',true);

	// Tariff amount box
	var perilTariffAmountContainer = $('<div class="col-md-2"></div>');
	var perilTariffAmountElement = $('<input class="tariff_amount_element form-control"></input>').on('change',
		function() {
			tariffsOfPerils[perilId] = $(this).val();
			notifyTotalOfChange();
		});

	// Default box
	var perilDefaultContainer = $('<div class="col-md-2"></div>');
	var perilDefaultCheckbox = $('<input class="tariff_default_checkbox" type="checkbox"></input>');
	var perilDefaultLabel = $('<label></label>').text("Basic");

	entryContainer
		.append(perilNameContainer.append(perilNameElement))
		.append(perilTariffAmountContainer.append(perilTariffAmountElement))
		.append(perilDefaultContainer.append(perilDefaultCheckbox).append(perilDefaultLabel));

	perilTariffEntriesContainer.append(entryContainer);

	perilEntryElements.push(entryContainer);
}
function notifyTotalOfChange() {
	var total = 0;

	for( var i = 0; i < tariffsOfPerils.length; i++) {

		if(tariffsOfPerils[i]) {
			total += Number(tariffsOfPerils[i]);
		}
	}

	$('#systemkey_tarif_total').val(total);
}

function populateOptionTypeDropdownValues()
{
	var selectElement = $('#systemkey_tariff_option_type_dropdown');

	var values = insurerInvoker.getOptionTypes();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']));
	}
}

function populateProductDropdownValues() {
	var selectElement = $('#systemkey_tariff_product_dropdown');

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

$('#systemkey_tariff_save_button').on('click',function() {
	saveTariff();
});

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