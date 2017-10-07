var createQuote = new function()
{
	var quote = {};
	var farm = {};
	var products = {};
	var crops = {};
	var optionTypes = {};
	var optionsByFarmCropType = {};

	// Used to keep track of the checkbox state
	var damageTypeStates = [];

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

	var open_modal_button = document.getElementById("openModalBtn");
	var accept_quote_button = document.getElementById("acceptQuote");

	function getProduct(id, name)
	{
		for(var i = 0; i < products.length; i++)
		{
			if(products[i].id == id && products[i].name == name)
			{
				return products[i];
			}
		}
	}

	function getCrop(name)
	{
		for(var i = 0; i < crops.length; i++)
		{
			if(crops[i].name == name)
			{
				return crops[i];
			}
		}
	}

	function getOptionTypes(id, name)
	{
		for(var i =0; i < optionTypes.length; i++)
		{
			if(optionTypes[i].id == id && optionTypes[i].name == name)
			{
				return optionTypes[i];
			}
		}
	}

	function getOptionsByFarmCropType(coverage)
	{
		for(var i = 0; i < optionsByFarmCropType.length; i++)
		{
			if(optionsByFarmCropType[i].coverage == coverage)
			{
				return optionsByFarmCropType[i];
			}
		}
	}

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

	// Set and reset elements
	function resetCriteriaValues()
	{
		input_business_unit.value = "";
		input_farm.value = "";
		input_land_number.value = "";
		input_cultivar.value = "";
		input_area.value = "";
		input_yield.value = "";
		input_price.value = "";

		checkbox_remember_price.checked = false;
		checkbox_remember_yield.checked = false;

		dropdown_product.innerHTML = "";
		dropdown_crop.innerHTML = "";
		dropdown_option_type.innerHTML = "";
		dropdown_coverage.innerHTML = "";
	}

	function resetLandEntryTable()
	{
		land_entry_container.innerHTML = "";
	}

	function loadLandEntryTable(quote)
	{
		for(var i = 0; i < quote.quoteLandEntries.length; i++)
		{
			var landEntry = quote.quoteLandEntries[i];

			var row = document.createElement("TR");

			createColumnsForLandEntryRow(landEntry, row);

			land_entry_container.appendChild(row);
		}
	}

	function createColumnsForLandEntryRow(landEntry, container)
	{
		createColumn(landEntry.plaas, container);
		createColumn(landEntry.landNumber, container);
		createColumn(landEntry.gewas, container);
		createColumn(landEntry.cultivar, container);
		createColumn(landEntry.area, container);
		createColumn(landEntry.yield, container);
		createColumn(landEntry.price, container);
		createColumn(landEntry.versekerings_waarde, container);
		createColumn(landEntry.opsie_tiepe, container);
		createColumn(landEntry.persentasie, container);

		createButtonColumn("Edit", editLandEntry, landEntry, container);
		createButtonColumn("Delete", deleteLandEntry, landEntry, container);
	}

	function createColumn(value, container)
	{
		var column = document.createElement('TH');
		column.innerHTML = value;

		container.appendChild(column);
	}

	function createButtonColumn(value, myFunction, objectToWorkWith, container)
	{
		var column = document.createElement('TH');
		var button = document.createElement("DIV");
		button.innerHTML = value;
		button.onclick = function(){myFunction(objectToWorkWith)};
		column.appendChild(button);
		container.appendChild(column);

		return button;
	}


	// ^ Set and reset elements ^

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
		input_business_unit.onblur = function(){loadProducts(); loadOptionTypes(); toggleFarmInputVisibility(validateBusinessUnit());};
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

	function notifyUserOfIncorrectBusinessUnit()
	{
		label_business_unit.innerHTML = "Boerdery: &#x2717;";
	}

	function notifyUserOfCorrectBusinessUnit()
	{
		label_business_unit.innerHTML = "Boerdery: &#x2713;";
	}

	function loadProducts()
	{
		products = quoteInvoker.getProducts();
		
		dropdown_product.innerHTML = "";

		for(var i = 0; i < products.length; i++)
		{
			if(i == 0)
			{
				var option = document.createElement("OPTION");
				$(option).attr("disabled selected value");
				dropdown_product.appendChild(option);
			}
			
			var option = document.createElement("OPTION");
			option.innerHTML = products.name;
			$(option).attr("value='"+products.id+"'");
			dropdown_product.appendChild(option);
		}
	}

	function loadOptionTypes()
	{
		dropdown_option_type.innerHTML = "";

		optionTypes = quoteInvoker.getOptionTypes();

		for(var i = 0; i < optionTypes.length; i++)
		{
			if(i == 0)
			{
				var option = document.createElement("OPTION");
				$(option).attr("disabled selected value");
				dropdown_option_type.appendChild(option);
			}

			var option = document.createElement("OPTION");
			option.innerHTML = products.name;
			$(option).attr("value='"+products.id+"'");
			dropdown_option_type.appendChild(option);
		}
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
				farm = response;
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

	function loadCoverage()
	{
		dropdown_coverage.innerHTML = "";

		var farmId = farm.id;
		var cropId = getCrop(dropdown_crop.value).id;
		var optionTypeId = getOptionTypes(dropdown_option_type.value).id;

		if(hasValue(farmId) && hasValue (cropId) && hasValue(optionTypeId))
		{
			optionsByFarmCropType = quoteInvoker.getOptionsByFarmCropType(farmId, cropId, optionTypeId);

			for(var i = 0; i < optionsByFarmCropType.length; i++)
			{
				if(i == 0)
				{
					var option = document.createElement("OPTION");
					$(option).attr("disabled selected value");
					dropdown_coverage.appendChild(option);
				}

				var option = document.createElement("OPTION");
				option.innerHTML = optionsByFarmCropType[i].coverage;

				dropdown_coverage.appendChild(option);
			}
		}
	}

	function hasValue(value)
	{
		return value != undefined && value != null && (value + '').trim() != "" && (value + '').trim() != "-1";
	}

	function loadProductSpecificCrops(name)
	{
		dropdown_crop.innerHTML = "";

		var productId = getProducts(name).id;
		crops = quoteInvoker.getCropsOfProduct(productId);

		for(var i = 0; i < crops.length; i++)
		{
			if(i == 0)
			{
				var option = document.createElement("OPTION");
				$(option).attr("disabled selected value");
				dropdown_crop.appendChild(option);
			}

			var option = document.createElement("OPTION");
			option.innerHTML = crops[i].name;
			dropdown_crop.appendChild(option);
		}
	}

	function loadDamageTypesCheckboxes(coverage)
	{
		damageTypeRowContainer.innerHTML = "";
		damageTypeStates = [];

		var optionType = getOptionsByFarmCropType(coverage);

		if(hasValue(optionType.id))
		{
			var response = quoteInvoker.getDamageTypesAvailableForOption(optionType.id);

			if(hasValue(response))
			{
				var checkboxContainer;

				var tariffOptionDamageTypes;
				if(landEntryId != undefined && landEntryId != null)
				{
					tariffOptionDamageTypes = quoteInvoker.getQouteLandEntryDamageTypesByLandEntryId(landEntryId);
				}

				for(var i = 0; i < response.length; i++)
				{
					var savedBefore = false;
					if(tariffOptionDamageTypes != undefined && tariffOptionDamageTypes != null)
					{
						for(var j = 0; j < tariffOptionDamageTypes.length; j++)
						{
							var damageTypeId = tariffOptionDamageTypes[j].tariffOptionDamageTypeId;
							var damageTypes = quoteInvoker.getDamageType(damageTypeId);
							if(damageTypes.name == response[i].name)
							{
								savedBefore = true;
							}
						}
					}

					if(i % 3 == 0)
					{
						checkboxContainer = document.createElement("DIV");
						checkboxContainer.className = "row";
						damageTypeRowContainer.appendChild(checkboxContainer);
					}

					
					var tObj = {
						"id":response[i].id,
						"name":response[i].name,
						"state":savedBefore
					};
					damageTypeStates.push(tObj);
					
					var name = response[i].name;
					createDamageTypeCheckbox(name, checkboxContainer, savedBefore);
				}

				damageTypeRowContainer.style.display = "block";

				return;
			}
		}

		damageTypeRowContainer.style.display = "none";
	}








	function editLandEntry(landEntry)
	{
		
	}

	function deleteLandEntry(landEntry)
	{
		for(var i = 0; i < quote.quoteLandEntries.length; i++)
		{
			if(landEntry == quote.quoteLandEntries[i])
			{
				quote.quoteLandEntries.splice(i, 1);
				break;
			}
		}

		if(quote.quoteLandEntries.length <= 0)
		{
			accept_quote_button.style.display = "none";
		}
	}

	function persistQuoteData(quote)
	{
		// Set the current logged on broker's id as the one that created the quote
		quote.brokerId = sessionStorage.brokerId;

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
		// The new requote will be linked to the original quote through this id
		this.quote.linkedToQuoteId = quote.id;

		showModal();
		// Reset the table
		resetLandEntryTable();
		// Load new landEntries
		loadLandEntryTable(quote);
		// Clear values incase a incomplete previous quote
		resetCriteriaValues();
		// Set initial criteria view
		setInitialFieldDisplay();

		// All requotes will be for the following business unit - so lock in
		input_business_unit.value = quote.businessUnit.name;
		$(input_business_unit).blur();
		$(input_business_unit).keyup();
	}

	function showModal()
	{
		open_modal_button.click();
	}
}