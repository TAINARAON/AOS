var createQuote = new function()
{
	var allValuesEntered = false;
	var allValuesSeleted = false;

	var quote = {};
	quote["quoteLandEntries"] = [];

	var businessUnit = {};
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
	var cancel_quote_button = document.getElementById("cancelQuote");
	var include_land_entry_button = document.getElementById("includeRow");

	var temporary_button_container = document.getElementById("tempButtonContainer");

	var landEntryEligibleForEdit;

	function getProduct(name)
	{
		for(var i = 0; i < products.length; i++)
		{
			if(products[i].name == name)
			{
				return products[i];
			}
		}

		return {"id":-1};
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

		return {"id":-1};
	}

	function getOptionTypes(name)
	{
		for(var i =0; i < optionTypes.length; i++)
		{
			if(optionTypes[i].name == name)
			{
				return optionTypes[i];
			}
		}

		return {"id":-1};
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

		return {"id":-1};
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

		dropdown_coverage.innerHTML = "";
		$(dropdown_coverage).append("<option disabled selected value></option>");
		$(dropdown_coverage).val("").change();

		dropdown_crop.innerHTML = "";
		$(dropdown_crop).append("<option disabled selected value></option>");
		$(dropdown_crop).val("").change();

		$(dropdown_option_type).val("").change();
		$(dropdown_product).val("").change();

		damageTypeCheckboxContainer.innerHTML = "";

		checkbox_remember_price.checked = false;
		checkbox_remember_yield.checked = false;
	}

	function resetModalForFurtherLandEntryEdit()
	{
		input_land_number.value = "";
		input_cultivar.value = "";
		input_area.value = "";
		//input_yield.value = "";
		//input_price.value = "";

		dropdown_coverage.innerHTML = "";
		$(dropdown_coverage).append("<option disabled selected value></option>");
		$(dropdown_coverage).val("").change();

		dropdown_crop.innerHTML = "";
		$(dropdown_crop).append("<option disabled selected value></option>");
		$(dropdown_crop).val("").change();

		$(dropdown_option_type).val("").change();
		$(dropdown_product).val("").change();

		damageTypeCheckboxContainer.innerHTML = "";

		//checkbox_remember_price.checked = false;
		//checkbox_remember_yield.checked = false;

		input_yield.value = checkbox_remember_yield.checked ? input_yield.value : "";
		input_price.value = checkbox_remember_price.checked ? input_price.value : "";
	}

	function resetLandEntryTable()
	{
		land_entry_container.innerHTML = "";
	}

	function loadLandEntryTable(quote)
	{
		resetLandEntryTable();

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
		console.log(landEntry);
		createColumn(landEntry.farm.name, container);
		createColumn(landEntry.landNumber, container);
		createColumn(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.crop.name, container);
		createColumn(landEntry.cultivar, container);
		createColumn(landEntry.area, container);
		createColumn(landEntry.yield, container);
		createColumn(landEntry.price, container);
		
		// TODO: does quoteLandEntryDamageType need to be an array??
		// Will be the same tariff option for all damage types in array
		console.log(landEntry.quoteLandEntryDamageTypes[0]);
		console.log(landEntry.quoteLandEntryDamageTypes[0].tariffOption);
		createColumn(calculatePremiumContribution(landEntry.area, landEntry.yield, landEntry.price, landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariff), container);
		createColumn(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.tariffOptionType.name, container);
		createColumn(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.coverage, container);

		createButtonColumn("Edit", editLandEntry, landEntry, container).className = "btn btn-success col-md-12";
		createButtonColumn("Delete", deleteLandEntry, landEntry, container).className = "btn btn-danger col-md-12";
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

	function calculatePremiumContribution(area, cropYield, price, tariff)
	{
		return (price * cropYield * area) * tariff;
	}

	function notifyUserOfIncorrectBusinessUnit()
	{
		label_business_unit.innerHTML = "Boerdery: &#x2717;";
	}

	function notifyUserOfCorrectBusinessUnit()
	{
		label_business_unit.innerHTML = "Boerdery: &#x2713;";
	}

	function resetBusinessUnitLabel()
	{
		label_business_unit.innerHTML = "Boerdery:";
	}

	function notifyUserOfIncorrectFarm()
	{
		label_farm.innerHTML = "Plaas: &#x2717";
	}

	function notifyUserOfCorrectFarm()
	{
		label_farm.innerHTML = "Plaas: &#x2713;";
	}

	function resetFarmLabel()
	{
		label_farm.innerHTML = "Plaas:";
	}
	// ^ Set and reset elements ^

	(function init(){
		setInitialFieldDisplay();
		addSelectValueListeners();
		addOnCriteriaFieldListeners();
		addQuoteModalButtonListeners();
		// Hide button
		accept_quote_button.style.display = "none";
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

	function addSelectValueListeners()
	{
		debugTool.print("Adding select listeners", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		$('#quote_input_container > div > div > select').on("change.v" ,function(){quoteSelectOnChangeListener();});
	}

	function quoteSelectOnChangeListener()
	{
		console.log("Checking select val");
		var empty = false;
        $('#quote_input_container > div > div > select').each(function() {
            if ($(this).find("option:selected").val() == '') {
                empty = true;
            }
        });

        allValuesSeleted = !empty;
	}

	function addOnCriteriaFieldListeners()
	{
		//input_business_unit.onblur = function(){loadProducts(); loadOptionTypes(); toggleFarmInputVisibility(validateBusinessUnit());};
		input_business_unit.onblur = function(){validateBusinessUnit();};
		//input_farm.onblur = function(){loadCoverage(); toggleLandNumberVisible(validateFarm());};
		input_farm.onblur = function(){validateFarm();};
		//input_land_number.onblur = function(){toggleFieldsVisible(true);};
		input_land_number.onblur = function(){toggleFieldsVisible(input_land_number.value.trim() != "" ? true : false);};

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
			var response = clientInvoker.getBusinessUnitByName(val)
			// The if won't be neccessary when backend is hooked up
			if(response != null)
			{
				ajaxPost("Some url", 
					function(response){
						businessUnit = response;
						notifyUserOfCorrectBusinessUnit();
						disableBusinessUnit();

						// load the other objects
						toggleFarmInputVisibility(true);
						// The calls that follow can be placed in the init
						loadProducts();
						loadOptionTypes();
					}, 
					function(){
						removeDisableStatusFromBusinessUnit();
						notifyUserOfIncorrectBusinessUnit();
						toggleFarmInputVisibility(false);
					},
					{"businessUnitName":val} 
					,
					response
				);
			}
			else
			{
				removeDisableStatusFromBusinessUnit();
				// Display error - business unit not available
				notifyUserOfIncorrectBusinessUnit();
				toggleFarmInputVisibility(false);
			}
		}

		/*var val = input_business_unit.value;
		if(val != undefined && val != "")
		{
			var response = clientInvoker.getBusinessUnitByName(val);

			if(response != null)
			{
				businessUnit = response;

				notifyUserOfCorrectBusinessUnit();
				disableBusinessUnit();
				return true;
			}

			removeDisableStatusFromBusinessUnit();
			// Display error - business unit not available
			notifyUserOfIncorrectBusinessUnit();
		}

		return false;*/
	}

	function loadProducts()
	{
		dropdown_product.innerHTML = "";

		var response = quoteInvoker.getProducts();
		// The if won't be neccessary when backend is hooked up
		if(response != null)
		{
			ajaxGet("Some url - a get", 
				function(response){
					products = response;

					for(var i = 0; i < products.length; i++)
					{
						if(i == 0)
						{
							var option = document.createElement("OPTION");
							$(option).attr("disabled selected value");
							dropdown_product.appendChild(option);
						}
						
						var option = document.createElement("OPTION");
						option.innerHTML = products[i].name;
						$(option).attr("value='"+products.id+"'");
						dropdown_product.appendChild(option);
					}
				}, 
				function(){
					// Handle error here
					alert("Could not retrieve products");
				}, response
			);
		}

		/*products = quoteInvoker.getProducts();
		
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
			option.innerHTML = products[i].name;
			$(option).attr("value='"+products.id+"'");
			dropdown_product.appendChild(option);
		}*/
	}

	function loadOptionTypes()
	{
		dropdown_option_type.innerHTML = "";

		var response = quoteInvoker.getOptionTypes();
		// The if won't be neccessary when backend is hooked up
		if(response != null)
		{
			ajaxGet("Some url - will be a get", 
				function(response){
					optionTypes = response;

					for(var i = 0; i < optionTypes.length; i++)
					{
						if(i == 0)
						{
							var option = document.createElement("OPTION");
							$(option).attr("disabled selected value");
							dropdown_option_type.appendChild(option);
						}

						var option = document.createElement("OPTION");
						option.innerHTML = optionTypes[i].name;
						$(option).attr("value='"+products.id+"'");
						dropdown_option_type.appendChild(option);
					}
				}, 
				function(){
					// Handle error here
					alert("Could not retrieve options");
				}, 
				response
			);
		}

		/*dropdown_option_type.innerHTML = "";

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
			option.innerHTML = optionTypes[i].name;
			$(option).attr("value='"+products.id+"'");
			dropdown_option_type.appendChild(option);
		}*/
	}

	function toggleLandNumberVisible(state)
	{
		if(state)
			showLandNumber();
		else
			hideLandNumber();
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
			var response = quoteInvoker.getFarmByNameAndBusinessId(val, businessUnit.id);
			// The if won't be neccessary when backend is hooked up
			if(response != null)
			{
				ajaxPost("some url", 
					function(response){
						farm = response;
						notifyUserOfCorrectFarm();
						toggleLandNumberVisible(true);
						loadCoverage();
					}, 
					function(){
						notifyUserOfIncorrectFarm();
						toggleLandNumberVisible(false);
					}, 
					{"farmName":val}, 
					response
				);
			}
			else
			{
				notifyUserOfIncorrectFarm();
				toggleLandNumberVisible(false);
			}
		}
		else
		{
			notifyUserOfIncorrectFarm();
			toggleLandNumberVisible(false);
		}

		/*var val = input_farm.value;
		if(val != undefined && val != "")
		{
			var response = quoteInvoker.getFarmByNameAndBusinessId(val, businessUnit.id);
			if(response != null)
			{
				farm = response;
				notifyUserOfCorrectFarm();
				return true;
			}
		}
		notifyUserOfIncorrectFarm();
		return false;*/
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

		var farmId = farm != null ? farm.id : -1;
		var cropId = getCrop(dropdown_crop.value) != null ? getCrop(dropdown_crop.value).id : -1;
		var optionTypeId = getOptionTypes(dropdown_option_type.value) != null ? getOptionTypes(dropdown_option_type.value).id : -1;

		if(hasValue(farmId) && hasValue(cropId) && hasValue(optionTypeId))
		{
			var response = quoteInvoker.getOptionsByFarmCropType(farmId, cropId, optionTypeId);
			// The if won't be neccessary when backend is hooked up
			if(response != null)
			{
				ajaxPost("Some url", 
					function(response){
						optionsByFarmCropType = response;

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
					}, 
					function(){
						alert("Failed to retrieve coverage");
					}, 
					{
						"farmId":farmId,
						"cropId":cropId,
						"optionTypeId":optionTypeId
					}, 
					response
				);
			}
		}

		/*dropdown_coverage.innerHTML = "";

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
		}*/
	}

	function hasValue(value)
	{
		return value != undefined && value != null && (value + '').trim() != "" && (value + '').trim() != "-1";
	}

	function loadProductSpecificCrops(name)
	{
		dropdown_crop.innerHTML = "";

		var productId = getProduct(name) != null ? getProduct(name).id : -1;

		if(hasValue(productId))
		{
			var response = quoteInvoker.getCropsOfProduct(productId);
			// The if won't be neccessary when backend is hooked up
			if(response != null)
			{
				ajaxPost("Some url", 
					function(response){
						crops = response;

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
					}, 
					function(){
						alert("Could not retrieve crops");
					}, 
					{
						"productId":productId
					}, 
					response
				);
			} 
		}

		/*dropdown_crop.innerHTML = "";
		
		var productId = getProduct(name).id;
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
		}*/
	}

	function loadDamageTypesCheckboxes(coverage)
	{
		damageTypeRowContainer.innerHTML = "";
		damageTypeStates = [];
		
		var tariffOptionDamageType = getOptionsByFarmCropType(coverage);

		if(tariffOptionDamageType != null)
		{
			var response = quoteInvoker.getDamageTypesAvailableForOption(tariffOptionDamageType.id);

			if(response != null)
			{
				ajaxPost("Some url", 
					function(response){
						for(var i = 0; i < response.length; i++)
						{
							var tObj = {
								"id":response[i].id,
								"name":response[i].name,
								"state":false
							};
							damageTypeStates.push(tObj);
						}

						// TODO: place this somewherer else
						if(landEntryEligibleForEdit != undefined && landEntryEligibleForEdit != null)
						{
							for(var i = 0; i < landEntryEligibleForEdit.quoteLandEntryDamageTypes.length; i++)
							{
								var quoteLandEntryDamageType = landEntryEligibleForEdit.quoteLandEntryDamageTypes[i];
								var damageType = quoteLandEntryDamageType.tariffOptionDamageType.damageType;
								
								for(var j = 0; j < damageTypeStates.length; j++)
								{
									if(damageType.name == damageTypeStates[j].name)
									{
										damageTypeStates[j].state = true;
									}
								}
							}
						}

						if(damageTypeStates.length > 0)
						{
							var checkboxContainer;
							for(var i = 0; i < damageTypeStates.length; i++)
							{
								if(i % 3 == 0)
								{
									checkboxContainer = document.createElement("DIV");
									checkboxContainer.className = "row";
									damageTypeRowContainer.appendChild(checkboxContainer);
								}
								createDamageTypeCheckbox(damageTypeStates[i].name, checkboxContainer, damageTypeStates[i].state);
							}
							damageTypeRowContainer.style.display = "block";
						}
						else
						{
							damageTypeRowContainer.style.display = "none";
						}
					}, 
					function(){
						alert("Could not load damage types");
					}, 
					{
						"tariffOptionDamageTypeId":tariffOptionDamageType.id
					}, 
					response
				);
			}
		}

		/*var response = quoteInvoker.getDamageTypesAvailableForOption(tariffOptionDamageType.id);
		for(var i = 0; i < response.length; i++)
		{
			var tObj = {
				"id":response[i].id,
				"name":response[i].name,
				"state":false
			};
			damageTypeStates.push(tObj);
		}

		// This is an edited quote, display the current land edited land entry's damage types
		//if(landEntryEligibleForEdit != undefined && landEntryEligibleForEdit != null)
		//{
		//	for(var i = 0; i < landEntryEligibleForEdit.quoteLandEntryDamageType[0].tariffOptionDamageType.length; i++)
		//	{
		//		for(var j = 0; j < damageTypeStates.length; j++)
		//		{
		//			// TODO: does quoteLandEntryDamageType need to be an array ??
		//			if(damageTypeStates[j].name == landEntryEligibleForEdit.quoteLandEntryDamageType[0].tariffOptionDamageType[i].damageType.name)
		//			{
		//				damageTypeStates[j].state = true;
		//			}
		//		}
		//	}
		//}

		if(landEntryEligibleForEdit != undefined && landEntryEligibleForEdit != null)
		{
			for(var i = 0; i < landEntryEligibleForEdit.quoteLandEntryDamageTypes.length; i++)
			{
				var quoteLandEntryDamageType = landEntryEligibleForEdit.quoteLandEntryDamageTypes[i];
				var damageType = quoteLandEntryDamageType.tariffOptionDamageType.damageType;
				
				for(var j = 0; j < damageTypeStates.length; j++)
				{
					if(damageType.name == damageTypeStates[j].name)
					{
						damageTypeStates[j].state = true;
					}
				}
			}
		}

		if(damageTypeStates.length > 0)
		{
			var checkboxContainer;
			for(var i = 0; i < damageTypeStates.length; i++)
			{
				if(i % 3 == 0)
				{
					checkboxContainer = document.createElement("DIV");
					checkboxContainer.className = "row";
					damageTypeRowContainer.appendChild(checkboxContainer);
				}
				createDamageTypeCheckbox(damageTypeStates[i].name, checkboxContainer, damageTypeStates[i].state);
			}
			damageTypeRowContainer.style.display = "block";
		}
		else
		{
			damageTypeRowContainer.style.display = "none";
		}*/
	}

	function createDamageTypeCheckbox(title, container, state = false)
	{
		var innerContainer = document.createElement("DIV");
		innerContainer.className = "col-md-4";

		var div = document.createElement("DIV");
		div.className = "checkbox";

		var label = document.createElement("LABEL");
		label.setAttribute("for", title + "_checkbox");

		let input = document.createElement("INPUT");
		input.type = "checkbox";
		input.id = title + "_checkbox";
		input.name = title + "_checkbox";
		input.title = title;

		label.appendChild(input);
		label.innerHTML += title;

		div.appendChild(label);

		innerContainer.appendChild(div);

		container.appendChild(innerContainer);

		$("input[name='"+title + "_checkbox"+"']").attr('checked', state);
		$(document).on("change", "input[name='"+title + "_checkbox"+"']", function(){trackDamageTypeState(title, this.checked);});
	}

	function trackDamageTypeState(title, state)
	{
		console.log("Box: " + title + " State: " + state);

		for(var i = 0; i < damageTypeStates.length; i++)
		{
			if(damageTypeStates[i].name == title)
			{
				damageTypeStates[i].state = state;
				return;
			}
		}

		console.log(damageTypeStates);
	}

	function addQuoteModalButtonListeners()
	{
		cancel_quote_button.onclick = function(){cancelQuote();};
		accept_quote_button.onclick = function(){acceptQuote();};
		include_land_entry_button.onclick = function(){addLandEntryToQuote();};
	}

	function cancelQuote()
	{
		resetQuoteModal();
		resetLandEntryTable();
		temporary_button_container.innerHTML = "";
		accept_quote_button.style.display = "none";
	}

	function resetQuoteModal()
	{
		// Clear quote object
		quote = {};
		quote["quoteLandEntries"] = [];
		// Set initial field display
		setInitialFieldDisplay();
		// Clear all field values
		resetCriteriaValues();
		// Remove disable status from business unit input
		removeDisableStatusFromBusinessUnit();
		// Reset the notify labels
		resetBusinessUnitLabel();
		resetFarmLabel();

		checkbox_remember_price.checked = false;
		checkbox_remember_yield.checked = false;
	}

	function acceptQuote()
	{
		if(persistQuoteData(quote))
		{
			// hide the button
			accept_quote_button.style.display = "none";
			resetQuoteModal();
			resetLandEntryTable();
			quoteViewer.refresh();
		}
		else
		{
			alert("Could not create quote");
		}
	}

	function addLandEntryToQuote()
	{
		if(validate())
		{
			quote.quoteLandEntries.push(getLandEntryFromCriteriaValues());
			loadLandEntryTable(quote);
			resetModalForFurtherLandEntryEdit();
			hideFields();

			accept_quote_button.style.display = "block";
		}
		else
		{
			alert("Insert all values. \nMake sure the last three fields have numbers.");
		}
	}

	function validate()
	{
		console.log("Inputs: " + inputCriteriaIsValid());
		console.log("Selectors: " + allValuesSeleted);
		return inputCriteriaIsValid() && allValuesSeleted;
	}

	function inputCriteriaIsValid()
	{
		if(input_business_unit.value.trim() == "")
			return false;
		if(input_farm.value.trim() == "")
			return false;
		if(input_land_number.value.trim() == "")
			return false;
		if(input_cultivar.value.trim() == "")
			return false;
		if(input_area.value.trim() == "")
			return false;
		if(!criteriaFieldValueIsNumerical(input_area.value.trim()))
		{
			// notify user a diget is needed?
			return false;
		}
		if(input_yield.value.trim() == "")
			return false;
		if(!criteriaFieldValueIsNumerical(input_yield.value.trim()))
		{
			// notify user a diget is needed?
			return false;
		}
		if(input_price.value.trim() == "")
			return false;
		if(!criteriaFieldValueIsNumerical(input_price.value.trim()))
		{
			// notify user a diget is needed?
			return false;
		}

		return true;
	}

	function criteriaFieldValueIsNumerical(value)
	{
		var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

		if(numberRegex.test(value))
		{
			return true;
		}

		return false;
	}

	function getLandEntryFromCriteriaValues()
	{
		var landEntry = getCleanLandEntryFromCriteriaFields();

		//landEntry.crop["product"] = getProduct(dropdown_product.value);
		landEntry["quoteLandEntryDamageTypes"] = [];

		landEntry["cropId"] = getCrop(dropdown_crop.value).id;
		landEntry["crop"] = getCrop(dropdown_crop.value);

		var allDamageTypesWithState = createTariffOptionDamageTypeArr();
		console.log("The all damage type thang");
		console.log(allDamageTypesWithState);
		for(var i = 0; i < allDamageTypesWithState.length; i++)
		{
			//var tariffOptionDamageTypes = quoteInvoker.getTariffOptionDamageTypesByTariffOption(getOptionsByFarmCropType(dropdown_coverage.value).id);

			var quoteLandEntryDamageType = {
				"id": "someID",
				"quoteLandEntryId": "someID"
			};

			var tempTariffOption = getOptionsByFarmCropType(dropdown_coverage.value);
			var tempDamageType = allDamageTypesWithState[i];

			var tempTariffOptionDamageType = quoteInvoker.getTariffOptionDamageTypeByTariffOptionIdAndDamageTypeID(tempTariffOption.id, tempDamageType.id);
			quoteLandEntryDamageType["tariffOptionDamageType"] = tempTariffOptionDamageType;
			quoteLandEntryDamageType["tariffOptionDamageTypeId"] = tempTariffOptionDamageType.id;

			var tariffOptionDamageType = quoteLandEntryDamageType.tariffOptionDamageType;

			tariffOptionDamageType["damageType"] = tempDamageType;
			tariffOptionDamageType["tariffOption"] = tempTariffOption;

			tariffOptionDamageType.tariffOption["crop"] =  getCrop(dropdown_crop.value);

			landEntry.quoteLandEntryDamageTypes.push(quoteLandEntryDamageType);
		}

		console.log("Self made object");
		console.log(landEntry);
		console.log("----------------");
		return landEntry;
	}

	function getCleanLandEntryFromCriteriaFields()
	{
		var landEntry = {
			"farmId": farm.id,
			"farm": farm,
			"landNumber": input_land_number.value,
			"landLongitude": "",
			"landLatitude": "",
			"cultivar": input_cultivar.value,
			"area": input_area.value,
			"yield": input_yield.value,
			"price": input_price.value,
		};

		return landEntry;
	}

	function generateQuoteNumber()
	{
		return Math.floor((Math.random() * 100000) + 1);
	}

	function createTariffOptionDamageTypeArr()
	{
		var tariffOptionDamageTypes = [];

		for(var i = 0; i < damageTypeStates.length; i++)
		{
			if(damageTypeStates[i].state)
			{
				tariffOptionDamageTypes.push(damageTypeStates[i]);
			}
		}

		return tariffOptionDamageTypes;
	}

	function updateLandEntryInQuote(originalQuoteLandEntry, changedQuoteLandEntry)
	{
		for(var i = 0; i < quote.quoteLandEntries.length; i++)
		{
			if(quote.quoteLandEntries[i] == originalQuoteLandEntry)
			{
				quote.quoteLandEntries[i] = changedQuoteLandEntry;
			}
		}
	}

	function editLandEntry(landEntry)
	{
		landEntryEligibleForEdit = landEntry;
		// Remove the 'Sluit in' button, add save and cancel buttons
		include_land_entry_button.style.display = "none";
		createEditRelatedButtons(landEntry);
		// Populate the criteria fields with relevant values
		loadLandEntryValuesIntoCriteriaFieldsForEditing(landEntry);
	}

	function createEditRelatedButtons(landEntry)
	{
		temporary_button_container.innerHTML = "";

		createButtons("Cancel", cancelEditOfLandEntry, landEntry, temporary_button_container).className = "btn btn-danger col-md-3";
		createButtons("Save", saveEditOfLandEntry, landEntry, temporary_button_container).className = "btn btn-success col-md-3";
	}

	function createButtons(title, myFunction, objectToWorkWith, container)
	{
		var button = document.createElement("DIV");
		button.innerHTML = title;
		button.onclick = function(){myFunction(objectToWorkWith);};
		container.appendChild(button);

		return button;
	}

	function cancelEditOfLandEntry()
	{
		resetModalForFurtherLandEntryEdit();
		hideFields();
		landEntryEligibleForEdit = undefined;
		temporary_button_container.innerHTML = "";
		include_land_entry_button.style.display = "block";
	}

	function saveEditOfLandEntry(landEntry)
	{
		//debugger;
		updateLandEntryInQuote(landEntry, getLandEntryFromCriteriaValues());
		resetModalForFurtherLandEntryEdit();
		hideFields();
		landEntryEligibleForEdit = undefined;
		temporary_button_container.innerHTML = "";
		include_land_entry_button.style.display = "block";

		// Make sure the Skep button is displayed
		accept_quote_button.style.display = "block";

		loadLandEntryTable(quote);
	}

	function loadLandEntryValuesIntoCriteriaFieldsForEditing(landEntry)
	{
		input_farm.value = landEntry.farm.name;
		$(input_farm).blur();

		input_land_number.value = landEntry.landNumber;
		$(input_land_number).blur();

		input_cultivar.value = landEntry.cultivar;
		input_area.value = landEntry.area;
		input_yield.value = landEntry.yield;
		input_price.value = landEntry.price;

		$(dropdown_product).val(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.crop.product.name).change();
		$(dropdown_crop).val(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.crop.name).change();

		// TODO: does quoteLandEntryDamageType need to be an array
		// Will be the same tariff option for all damage types selected
		$(dropdown_option_type).val(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.tariffOptionType.name).change();
		$(dropdown_coverage).val(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.coverage).change();
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

		landEntryEligibleForEdit = undefined;
		temporary_button_container.innerHTML = "";

		loadLandEntryTable(quote);
	}

	function persistQuoteData(quote)
	{
		//debugger;
		// Set the current logged on broker's id as the one that created the quote
		quote["businessUnit"] = businessUnit;
		quote["businessUnitId"] = businessUnit.id;
		quote["brokerId"] = sessionStorage.brokerId;
		quote["quoteNumber"] = generateQuoteNumber();
		quote["insurerId"] = null;
		quote["active"] = "1";
		quote["dateCreated"] = util.getCurrentDateTime();
		if(!quote.hasOwnProperty("linkedToQuoteId"))
		{
			// If this isn't a requote, add the property
			quote["linkedToQuoteId"] = null;
		}
		quote["acceptable"] = "1";

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

	this.reQuote = function(otherQuote)
	{
		//debugger;
		console.log(otherQuote);
		quote = otherQuote;
		// The new requote will be linked to the original quote through this id
		quote.linkedToQuoteId = otherQuote.id;

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