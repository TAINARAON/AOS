(function init() {
	populateProductDropdownValues();
	populatePriceUomDropdownValues();
	populateAreaUomDropdownValues();
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

/*
<div class="col-md-12">
	            <h6 class="text-left">Possible Perils</h6>
	            <div id="systemkey_peril_container"></div>
	          </div>
*/
function populatePerilCheckboxes() {

	var perilContainer = $('#systemkey_peril_container');
	var checkboxRow;
	var perils = insurerInvoker.getPerils();

	for(var i = 0; i < perils.length; i++)
	{
		if(i % 3 == 0)
		{
			checkboxRow = $('<div></div>').addClass('row');
			perilContainer.append(checkboxRow);
		}

		var innerContainer = $('<div></div>').addClass('col-md-4');

		var label = $('<label></label>').text(perils[i]['name']);
		var inputElement = $('<input id="'+perils[i]['id']+'" type="checkbox"></input>');

		innerContainer.append(label);
		innerContainer.append(inputElement);

		checkboxRow.append(innerContainer);
	}
}