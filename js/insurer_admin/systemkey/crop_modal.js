(function init() {
	populateProductDropdownValues();
	populatePriceUomDropdownValues();
	populateAreaUomDropdownValues();
	setOnSaveOnClickListener();
})();

function populateProductDropdownValues()
{
	var selectElement = $('#systemkey_crop_product_dropdown');

	insurerAdminController.getProducts(
		function(response){
			for(var i = 0; i < response.length; i++)
			{
				selectElement.append($('<option></option>').text(response[i]['name']).val(response[i]['id']))
			}
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}

function populatePriceUomDropdownValues()
{
	var selectElement = $('#systemkey_crop_price_uom_dropdown');

	insurerAdminController.getPriceUoms(
		function(response){
			for(var i = 0; i < response.length; i++)
			{
				selectElement.append($('<option></option>').text(response[i]['name']).val(response[i]['id']))
			}
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
}
function populateAreaUomDropdownValues()
{
	var selectElement = $('#systemkey_crop_area_uom_dropdown');

	insurerAdminController.getAreaUoms(
		function(response){
			for(var i = 0; i < response.length; i++)
			{
				selectElement.append($('<option></option>').text(response[i]['name']).val(response[i]['id']))
			}
		},
		function(response){
			util.createNotification(response.message,'error');
		}
	);
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

		insurerAdminController.createCrop(
			function(response){
				util.createNotification(response.message);
				clearCreateCropModal();

				// reload crop view table
				$('#systemkey_crop_view_product_dropdown').trigger('change');
			},
			function(response){
				util.createNotification(response.message,'error');
			},
			cropObject
		);
	})
}

function clearCreateCropModal() {
	$('#systemkey_crop_product_dropdown').find('option:eq(0)').prop('selected', true);
	$('#systemkey_crop_name_input').val('');
	$('#systemkey_crop_price_uom_dropdown').find('option:eq(0)').prop('selected', true);
	$('#systemkey_crop_area_uom_dropdown').find('option:eq(0)').prop('selected', true);
}
