(function init() {
	populateProductDropdownValues();
	populatePriceUomDropdownValues();
	populateAreaUomDropdownValues();
	setOnSaveOnClickListener();
})();

function populateProductDropdownValues()
{
	var selectElement = $('#systemkey_crop_product_dropdown');

	var values = quoteInvoker.getProducts();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))
	}
}

function populatePriceUomDropdownValues()
{
	var selectElement = $('#systemkey_crop_price_uom_dropdown');

	var values = insurerInvoker.getPriceUoms();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))
	}
}
function populateAreaUomDropdownValues()
{
	var selectElement = $('#systemkey_crop_area_uom_dropdown');

	var values = insurerInvoker.getAreaUoms();
	
	for(var i = 0; i < values.length; i++)
	{
		selectElement.append($('<option></option>').text(values[i]['name']).val(values[i]['id']))
	}
}

function setOnSaveOnClickListener() {

	$('#systemkey_crop_save_button').on('click',function() {

		var productId = $('#systemkey_crop_product_dropdown').val();
		var cropName = $('#systemkey_crop_name_input').val();
		var priceUomId = $('#systemkey_crop_price_uom_dropdown').val();
		var areaUomId = $('#systemkey_crop_area_uom_dropdown').val();
		
		var cropObject = {
			'productId':productId,
			'areaUomId':areaUomId,
			'priceUomId':priceUomId,
			'name':cropName,
			'active':'1'
		}

		var newCropId = insurerInvoker.createCrop(cropObject);

		if(newCropId != null) {

			util.createNotification('Created Crop!');
			clearCreateCropModal();

			// reload crop view table
			$('#systemkey_crop_view_product_dropdown').trigger('change');

		} else {
			util.createNotification('Failed to create crop.','error');
		}
		
	})
}

function clearCreateCropModal() {
	$('#systemkey_crop_product_dropdown').find('option:eq(0)').prop('selected', true);
	$('#systemkey_crop_name_input').val('');
	$('#systemkey_crop_price_uom_dropdown').find('option:eq(0)').prop('selected', true);
	$('#systemkey_crop_area_uom_dropdown').find('option:eq(0)').prop('selected', true);
}
