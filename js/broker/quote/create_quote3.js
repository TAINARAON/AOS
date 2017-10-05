var createQuote = new function()
{
	var quote = {};

	// Labels
	var label_business_unit = document.getElementById("boerderyLabel");
	var label_farm = document.getElementById("plaasLabel");
	// ^ Labels ^

	// Input fields
	var input_business_unit = document.getElementById("business_unit");
	var input_farm = document.getElementById("farm");
	var input_land_number = document.getElementById("land_nommer");
	var input_cultivar = document.getElementById("kultivar");
	var input_area = document.getElementById("oppervlakte");
	var input_yield = document.getElementById("gewas_opbrengs");
	var input_price = document.getElementById("rand_per_eenheid");
	// ^ Input fields ^

	// Selector fields
	var dropdown_product = document.getElementById("produk_dropdown");
	var dropdown_crop = document.getElementById("gewas_dropdown");
	var dropdown_option_type = document.getElementById("opsie_tiepe_dropdown");
	var dropdown_coverage = document.getElementById("dekking_dropdown");
	// ^ Selector fields ^

	// Check box fields
	var checkbox_remember_yield = document.getElementById("onthou_gewas_opbrengs");
	var checkbox_remember_price = document.getElementById("onthou_rand_waarde");
	// ^ Check box fields ^

	// Containers for hiding and displaying purposes
	// Farm container
	var farm_container = document.getElementById("farmContainer");
	var land_number_container = document.getElementById("landNumberContainer");
	// ^ Farm container ^
	// Row containers
	var row1 = document.getElementById("row1Container");
	var row2 = document.getElementById("row2Container");
	var row3 = document.getElementById("row3Container");
	var row4 = document.getElementById("row4Container");
	var damageTypeRowContainer = document.getElementById("damageTypeCheckboxContainer");
	// ^ Row containers ^
	// ^ Containers for hiding and displaying purposes ^

	// Land entry container
	var land_entry_container = document.getElementById("create_quote_table_body");
	// ^ Land entry  container ^

	//	Showing and hiding of elements 
	function showFarm()
	{
		farm_container.style.display = "block";
	}

	function hideFarm()
	{
		farm_container.style.display = "none";
	}

	function showLandNumber()
	{
		land_number_container.style.display = "block";
	}

	function hideLandNumber()
	{
		land_number_container.style.display = "none";
	}

	function showFields()
	{
		row1.style.display = "block";
		row2.style.display = "block";
		row3.style.display = "block";
		row4.style.display = "block";
	}

	function hideFields()
	{
		row1.style.display = "none";
		row2.style.display = "none";
		row3.style.display = "none";
		row4.style.display = "none";
		damageTypeRowContainer.style.display = "none";
	}

	function showCreateQuoteButton()
	{
		create_quote_button.style.display = "block";
	}

	function hideCreateQuoteButton()
	{
		create_quote_button.style.display = "none";
	}
	// ^ Showing and hiding of elements ^

	// Change business unit state
	function disableBusinessUnit()
	{
		input_business_unit.disabled = "disabled";
	}

	function removeDisableStatusFromBusinessUnit()
	{
		input_business_unit.removeAttribute("disabled");
	}
	// ^ Change business unit state ^

	(function init(){
		setInitialFieldDisplay();
		addOnChangeListeners();
	})();

	function setInitialFieldDisplay()
	{
		farm_container.style.display = "none";
		land_number_container.style.display = "none";

		row1.style.display = "none";
		row2.style.display = "none";
		row3.style.display = "none";
		row4.style.display = "none";
		damageTypeRowContainer.style.display = "none";
	}

	function addOnChangeListeners()
	{
		input_business_unit.onblur = function(){loadProducts(); toggleFarmInputVisibility(validateBusinessUnit());};
		input_farm.onblur = function(){loadCoverage(); toggleLandNumberVisible(validateFarm());};
		input_land_number.onblur = function(){toggleFieldsVisible(true);};

		// Select fields
		dropdown_product.onchange = function(){loadProductSpecificCrops(dropdown_product.value)};
		dropdown_crop.onchange = function(){loadCoverage();};
		dropdown_option_type.onchange = function(){loadCoverage();};
		dropdown_coverage.onchange = function(){loadDamageTypesCheckboxes(dropdown_coverage.value);};
	}

	function toggleFarmInputVisibility(state)
	{
		if(state)
			showFarm();
		else
			hideFarm();
	}

	function validateBusinessUnit()
	{
		var val = input_business_unit.value;
		if(val != undefined && val != "")
		{
			var response = clientInvoker.getBusinessUnitByName(val);

			if(response != null)
			{
				this.quote["businessUnit"] = response;
				this.quote["businessUnitId"] = response.id;

				notifyUserOfCorrectBusinessUnit();
				disableBusinessUnit();
				return true;
			}

			removeDisableStatusFromBusinessUnit();
			// Display error - business unit not available
			notifyUserOfIncorrectBusinessUnit();
		}

		return false;
	}

	function loadProducts()
	{
		var products = quoteInvoker.getProducts();
		// TODO: carry on here
	}

	function notifyUserOfIncorrectBusinessUnit()
	{
		label_business_unit.innerHTML = "Boerdery: &#x2717;";
	}

	function notifyUserOfCorrectBusinessUnit()
	{
		label_business_unit.innerHTML = "Boerdery: &#x2713;";
	}

	function toggleFieldsVisible(state)
	{
		if(state)
			showFields();
		else
			hideFields();
	}

	function validateFarm()
	{
		var val = input_farm.value;
		if(val != undefined && val != "")
		{
			var response = quoteInvoker.getFarmByNameAndBusinessId(val, getBusinessUnitId());
			if(response != null)
			{
				this.quote["quoteLandEntries"]["farm"] = response;
				this.quote["quoteLandEntries"]["id"] = response.id;
				notifyUserOfCorrectFarm();
				return true;
			}
		}
		notifyUserOfIncorrectFarm();
		return false;
	}

	function notifyUserOfIncorrectFarm()
	{
		label_farm.innerHTML = "Plaas: &#x2717";
	}

	function notifyUserOfCorrectFarm()
	{
		label_farm.innerHTML = "Plaas: &#x2713;";
	}

	function toggleFieldsVisible(state)
	{
		if(state)
			showFields();
		else
			hideFields();
	}







	function persistQuoteData(quote)
	{
		// TODO: fix object values to suite mock
		var landEntries = quote.quoteLandEntries;

		debugTool.print(landEntries, FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);

		// TODO: send damage type array
		var resultId = quoteInvoker.create(getCleanBusinessUnitObject(quote), landEntries);

		debugTool.print("Commit result: " + resultId, FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);

		if(resultId != null)
		{
			// Save the id to the quoteObj
			quote['id'] = resultId;
			return true;
		}
		else
		{
			return false;
		}
	}

	function getCleanBusinessUnitObject(quote)
	{
		var data = {
			"brokerId":quote.brokerId,
			"insurerId":quote.insurerId,
			"businessUnitId":quote.businessUnitId,
			'active':quote.active,
			'acceptable':quote.acceptable,
			'quoteNumber': quote.quoteNumber,
			'linkedToQuoteId':quote.linkedToQuoteId,
			'dateCreated':quote.dateCreated,
			"boerdery":quote.boerdery
		}

		return data;
	}

	this.reQuote = function(quote)
	{
		this.quote = quote;
	}
}