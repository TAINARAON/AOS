var quoteCreator = new function()
{
	var businessUnitId;
	var farmId;
	var landNumberId;
	var allValuesEntered = false;
	var allValuesSeleted = false;

	// This modal will only contain a quote for one business unit at a time
	var quote = {};
	var products = {};
	var crops = {};
	var optionTypes = {};
	var optionsByFarmCropType = {};

	// Labels
	var label_business_unit = document.getElementById("boerderyLabel");
	var label_farm = document.getElementById("plaasLabel");
	var label_land_number = document.getElementById("landNumberLabel");
	// ^ Labels ^

	// Input fields
	var input_business_unit = document.getElementById("business_unit");
	var input_farm = document.getElementById("farm");
	//var input_product = document.getElementById("produk");
	//var input_crop = document.getElementById("gewas");
	//var input_option_type = document.getElementById("opsie_tiepe");
	//var input_persentage = document.getElementById("persentasie");
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
	var include_row_button = document.getElementById("includeRow");
	var close_modal_button = document.getElementById("close_modal");

	var create_quote_button = document.getElementById("acceptQuote");

	// Getters & Setters
	function setBusinessUnitId(id)
	{
		businessUnitId = id;
	}

	function getBusinessUnitId()
	{
		return businessUnitId;
	}

	function resetBusinessUnitId()
	{
		businessUnitId = undefined;
	}

	function setFarmId(id)
	{
		farmId = id;
	}

	function getFarmId()
	{
		return farmId;
	}

	function resetFarmId()
	{
		farmId = undefined;
	}

	function setLandNumberId(id)
	{
		landNumberId = id;
	}

	function getLandNumberId()
	{
		return landNumberId;
	}

	function resetLandNumberId()
	{
		landNumberId = undefined;
	}

	function getAllInputValuesEnteredState()
	{
		return allValuesEntered;
	}

	function setAllInputValuesEnteredState(state)
	{
		allValuesEntered = state;
	}

	function getAllSelectValuesSelectedState()
	{
		return allValuesSeleted;
	}

	function setAllSelectValuesSelectedState(state)
	{
		allValuesSeleted = state;
	}

	function getQuoteObject()
	{
		return	quote;
	}

	function setQuoteObject(obj)
	{
		quote = obj;
	}

	function getProductObjectIdByName(name)
	{
		for(var i = 0; i < products.length; i++)
		{
			if(products[i].name == name)
			{
				return products[i].id;
			}
		}

		return -1;
	}

	function setProductObject(value)
	{
		products = value;
	}

	function getCropObjectIdByName(name)
	{
		for(var i = 0; i < crops.length; i++)
		{
			if(crops[i].name == name)
			{
				return crops[i].id;
			}
		}

		return -1;
	}

	function setCropObject(value)
	{
		crops = value;
	}

	function getOptionTypeObjectIdByName(name)
	{
		for(var i = 0; i < optionTypes.length; i++)
		{
			if(optionTypes[i],name == name)
			{
				return optionTypes[i].id;
			}
		}

		return -1;
	}

	function setOptionTypeObject(value)
	{
		optionTypes = value;
	}

	function getOptionsByFarmCropTypeObjectIdByCoverage(coverage)
	{
		for(var i = 0; i < optionsByFarmCropType.length; i++)
		{
			if(optionsByFarmCropType[i].coverage == coverage)
			{
				return optionsByFarmCropType[i].id;
			}
		}

		return -1;
	}

	function setOptionsByFarmCropTypeObject(value)
	{
		optionsByFarmCropType = value;
	}

	function getBrokerId()
	{
		// TODO: get the proper id from the session
		return 0;
	}

	function getInsurerId()
	{
		// TODO: get the proper id from the session
		return 0;
	}

	function berekenVersekeringsWaarde()
	{
		// TODO: proper calculation with testing for user messing with frontend elements in inspector
		// oppervlakte * gewasOpbrengs * R.Unit
		return Math.floor((Math.random() * 10000) + 1);
	}

	function getInputBusinessUnitValue()
	{
		return input_business_unit.value;
	}

	function setInputBusinessUnitValue(value)
	{
		input_business_unit.value = value;
	}

	function getInputFarmValue()
	{
		return input_farm.value;
	}

	function setInputFarmValue(value)
	{
		input_farm.value = value;
	}

	function getInputProductValue()
	{
		//return input_product.value;
		return dropdown_product.value;
	}

	function setInputProductValue(value)
	{
		//input_product.value = value;
		dropdown_product.value = value;
	}

	function getInputCropValue()
	{
		//return input_crop.value;
		return dropdown_crop.value;
	}

	function setInputCropValue(value)
	{
		//input_crop.value = value;
		dropdown_crop.value = value;
	}

	function getInputOptionTypeValue()
	{
		//return input_option_type.value;
		return dropdown_option_type.value;
	}

	function setInputOptionTypeValue(value)
	{
		//input_option_type.value = value;
		dropdown_option_type.value = value;
	}

	function getInputPersentageValue()
	{
		//return input_persentage.value;
		return dropdown_coverage.value;
	}

	function setInputPersentageValue(value)
	{
		//input_persentage.value = value;
		dropdown_coverage.value = value;
	}

	function getInputLandNumberValue()
	{
		return input_land_number.value;
	}

	function setInputLandNumberValue(value)
	{
		input_land_number.value = value;
	}

	function getInputCultivarValue()
	{
		return input_cultivar.value;
	}

	function setInputCultivarValue(value)
	{
		input_cultivar.value = value;
	}

	function getInputAreaValue()
	{
		return input_area.value;
	}

	function setInputAreaValue(value)
	{
		input_area.value = value;
	}

	function getInputYieldValue()
	{
		return input_yield.value;
	}

	function setInputYieldValue(value)
	{
		input_yield.value = value;
	}

	function getInputPriceValue()
	{
		return input_price.value;
	}

	function setInputPriceValue(value)
	{
		input_price.value = value;
	}

	function shouldRememberYield()
	{
		return checkbox_remember_yield.checked;
	}

	function setRemeberYieldState(state)
	{
		checkbox_remember_yield.checked = state;
	}

	function shouldRememberPrice()
	{
		return checkbox_remember_price.checked;
	}

	function setRememberPriceState(state)
	{
		checkbox_remember_price.checked = state;
	}
	// ^ Getters & Setters ^

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

	// Cleanup functions
	function clearAllInputValues()
	{
		setInputBusinessUnitValue("");
		setInputFarmValue("");
		setInputProductValue("");
		setInputCropValue("");
		setInputOptionTypeValue("");
		setInputPersentageValue("");
		setInputLandNumberValue("");
		setInputCultivarValue("");
		setInputAreaValue("");
		setInputYieldValue("");
		setInputPriceValue("");
	}

	function clearInputsForNextEntry()
	{
		setInputLandNumberValue("");
		setInputCultivarValue("");
		setInputAreaValue("");

		if(!shouldRememberYield())
		{
			setInputYieldValue("");
		}

		if(!shouldRememberPrice())
		{
			setInputPriceValue("");
		}
	}

	function resetLandEntryTable()
	{
		land_entry_container.innerHTML = "";
	}

	function resetBusinessUnitLabel()
	{
		label_business_unit.innerHTML = "Boerdery:";
	}

	function resetFarmLabel()
	{
		label_farm.innerHTML = "Plaas:";
	}

	function resetLandNumberLabel()
	{
		landNumberLabel.innerHTML = "Land Nommer:";
	}

	function resetQuoteObject()
	{
		quote = {};
	}
	// ^ Cleanup functions ^

	// Attribute toggles
	function disableBusinessUnit()
	{
		input_business_unit.disabled = "disabled";
	}

	function removeDisableStatusFromBusinessUnit()
	{
		input_business_unit.removeAttribute("disabled");
	}

	function hideIncludeRowButton()
	{
		include_row_button.style.visibility = "hidden";
	}

	function showIncludeRowButton()
	{
		include_row_button.style.visibility = "visible";
	}
	// ^ Attribute toggles ^

	(function init(){
		setInitialInputVisibility();
		addOnChangeListeners();
		addInputValueListeners();
		addSelectValueListeners();
		setupModalButtonClickListeners();
		setupDropDownValues();
	})();

	// Initial setup function
	function setInitialInputVisibility()
	{
		hideCreateQuoteButton();
		hideFarm();
		hideLandNumber();
		hideFields();
	}

	// Change listener content
	function addOnChangeListeners()
	{
		input_business_unit.onblur = function(){toggleFarmInputVisibility(validateBusinessUnit());};
		//input_farm.onblur = function(){loadCoverage(); toggleFieldsVisible(validateFarm());};
		input_farm.onblur = function(){loadCoverage(); toggleLandNumberVisible(validateFarm());};
		input_land_number.onblur = function(){toggleFieldsVisible(validateLandNumber());};

		// Select fields
		dropdown_product.onchange = function(){loadProductSpecificCrops(dropdown_product.value)};
		dropdown_crop.onchange = function(){loadCoverage();};
		dropdown_option_type.onchange = function(){loadCoverage();};
		dropdown_coverage.onchange = function(){alert("weee"); loadDamageTypesForSpecificTarrifOptionId(dropdown_coverage.value);};
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
		var val = getInputBusinessUnitValue();
		if(val != undefined && val != "")
		{
			var response = clientInvoker.getBusinessUnitByName(val);
			//setBusinessUnitId(Math.floor((Math.random() * 1000) + 1));
			setBusinessUnitId(response != null ?  response.id: -1);

			if(response != null)
			{
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

	function toggleFieldsVisible(state)
	{
		if(state)
			showFields();
		else
			hideFields();
	}

	function validateFarm()
	{
		var val = getInputFarmValue();
		if(val != undefined && val != "")
		{
			//var response = clientInvoker.getFarmByName(val);
			console.log("Name: " + val);
			console.log("BU Id: " + getBusinessUnitId());
			var response = quoteInvoker.getFarmByNameAndBusinessId(val, getBusinessUnitId());
			console.log(response);
			setFarmId(response != null ?  response.id: -1);
			if(response != null)
			{
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

	function toggleLandNumberVisible(state)
	{
		if(state)
			showLandNumber();
		else
			hideLandNumber();
	}

	function validateLandNumber()
	{
		var val = getInputLandNumberValue();
		console.log("In validate land");
		if(val != undefined && val != "")
		{
			var response = quoteInvoker.getLandByNameAndFarmId(val, getFarmId());
			
			if(response != undefined && response != null)
			{
				setLandNumberId(response.id);
				notifyUserOfCorrectLandNumber();
				return true;
			}
		}

		notifyUserOfIncorrectLandNumber();
		return false;
	}

	function notifyUserOfIncorrectLandNumber()
	{
		landNumberLabel.innerHTML = "Land Nommer: &#x2717";
	}

	function notifyUserOfCorrectLandNumber()
	{
		landNumberLabel.innerHTML = "Land Nommer: &#x2713;";
	}

	function loadProductSpecificCrops(name)
	{
		dropdown_crop.innerHTML = "";
		dropdown_crop.value = "";

		var productId = getProductObjectIdByName(name);

		var availableCrop = quoteInvoker.getCropsOfProduct(productId);
		
		setCropObject(availableCrop);

		for(var i = 0; i < availableCrop.length; i++)
		{
			if(i == 0)
			{
				var option = document.createElement("OPTION");
				$(option).attr("disabled selected value");
				dropdown_crop.appendChild(option);
			}

			var option = document.createElement("OPTION");
			option.innerHTML = availableCrop[i].name;
			dropdown_crop.appendChild(option);
		}
	}

	function loadCoverage()
	{
		dropdown_coverage.innerHTML = "";
		dropdown_coverage.value = "";

		var farmId = getFarmId();
		var cropId = getCropObjectIdByName(dropdown_crop.value);
		var optionTypeId = getOptionTypeObjectIdByName(dropdown_option_type.value);

		if(hasValue(farmId) && hasValue(cropId) && hasValue(optionTypeId))
		{	
			var dekkingTypes = quoteInvoker.getOptionsByFarmCropType(farmId, cropId, optionTypeId);
			setOptionsByFarmCropTypeObject(dekkingTypes);

			for(var i = 0; i < dekkingTypes.length; i++)
			{
				if(i == 0)
				{
					var option = document.createElement("OPTION");
					$(option).attr("disabled selected value");
					dropdown_coverage.appendChild(option);
				}

				var option = document.createElement("OPTION");
				option.innerHTML = dekkingTypes[i].coverage;

				dropdown_coverage.appendChild(option);				
			}
		}
	}

	function hasValue(value)
	{
		return value != undefined && value != null && (value + '').trim() != "" && (value + '').trim() != "-1";
	}

	function loadDamageTypesForSpecificTarrifOptionId(coverage)
	{	
		console.log("Load the damage types");
		damageTypeRowContainer.innerHTML = "";

		var id = getOptionsByFarmCropTypeObjectIdByCoverage(coverage);
		if(id != undefined && id != null)
		{
			var response = quoteInvoker.getDamageTypesAvailableForOption(id);

			// TODO: Save object to save id when values are selected

			if(response != undefined && response != null)
			{
				var checkboxContainer;

				for(var i = 0; i < response.length; i++)
				{
					if(i % 3 == 0)
					{
						checkboxContainer = document.createElement("DIV");
						checkboxContainer.className = "row";
						damageTypeRowContainer.appendChild(checkboxContainer);
					}
					
					var name = response[i].name;
					createDamageTypeCheckbox(name, checkboxContainer);
				}
			}
		}
	}

	function createDamageTypeCheckbox(title, container)
	{
		var innerContainer = document.createElement("DIV");
		innerContainer.className = "col-md-4";

		var div = document.createElement("DIV");
		div.className = "checkbox";

		var label = document.createElement("LABEL");

		var input = document.createElement("INPUT");
		input.type = "checkbox";
		input.id = title + "_checkbox";
		input.title = title;

		label.appendChild(input);
		label.innerHTML += title;

		div.appendChild(label);

		innerContainer.appendChild(div);

		container.appendChild(innerContainer);
	}
	// ^ Change listener content ^

	function addInputValueListeners()
	{
		debugTool.print("Adding input listeners", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		$('#quote_input_container > div > div > input').keyup(function(){quoteInputKeyUpListener();});
	}

	function quoteInputKeyUpListener()
	{
		var empty = false;
        $('#quote_input_container > div > div > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        setAllInputValuesEnteredState(!empty);
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
        	console.log("Here");
        	console.log($(this).find("option:selected").val());
            if ($(this).find("option:selected").val() == '') {
                empty = true;
            }
        });

        setAllSelectValuesSelectedState(!empty);
	}

	function setupModalButtonClickListeners()
	{
		debugTool.print("Adding click listeners", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		document.getElementById("includeRow").onclick = function(e) {addToQuote();};
		document.getElementById("cancelQuote").onclick = function(e) {cancelCreatingQuote();};
		create_quote_button.onclick = function(e) {createQuoteAndAddToView()};
	}

	function setupDropDownValues()
	{
		setupProductDropdownValues();
		setupOptionTypeDropdownValues();
	}

	function setupProductDropdownValues()
	{
		var availableProducts = quoteInvoker.getProducts();
		setProductObject(availableProducts);

		for(var i = 0; i < availableProducts.length; i++)
		{
			var option = document.createElement("OPTION");
			option.innerHTML = availableProducts[i].name;
			//$(option).attr("VALUE", availableProducts[i].name);
			dropdown_product.appendChild(option);
		}
	}

	function setupOptionTypeDropdownValues()
	{
		var availableOptionTypes = quoteInvoker.getOptionTypes();
		setOptionTypeObject(availableOptionTypes);

		for(var i = 0; i < availableOptionTypes.length; i++)
		{
			var option = document.createElement("OPTION");
			option.innerHTML = availableOptionTypes[i].name;
			//$(option).attr("VALUE", availableOptionTypes[i].name);
			dropdown_option_type.appendChild(option);
		}
	}
	// ^ Initial setup function ^

	function addToQuote()
	{
		if(validateInputs())
		{
			showCreateQuoteButton();

			var quoteData = parseInputDataIntoJSONQuote();

			// Save this quoteData to the main quote
			saveToMainQuoteObject(quoteData);
			// Reload data in table
			reloadLandEntryTable();
			// Clear inputs for next entry
			clearInputsForNextEntry();
		}
		else
		{
			alert("Please ensure all the required data have been provided");
		}
	}

	function validateInputs()
	{
		debugTool.print("checking validity", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		
		// More validation of other fields can be done here

		return getAllInputValuesEnteredState() && getAllSelectValuesSelectedState();
	}

	function parseInputDataIntoJSONQuote()
	{
		var quoteData = {
				"brokerId":getBrokerId(),
				"insurerId":getInsurerId(),
				"businessUnitId":getBusinessUnitId(),
				'active':'1',
				'acceptable':'1',
				'quoteNumber': "00001",
				'linkedToQuoteId':null,
				'dateCreated':'1990-05-18 19:01:05',
				"boerdery":getInputBusinessUnitValue(),
				quoteLandEntries:[
					{
						"farmId":getFarmId(),
						"plaas":getInputFarmValue(),
						"produk":getInputProductValue(),
						"gewas":getInputCropValue(),
						//"gewas":dropdown_crop.value,
						"cropId":getCropObjectIdByName(dropdown_crop.value),
						"opsie_tiepe":getInputOptionTypeValue(),
						//"opsie_tiepe":dropdown_option_type.value,
						"persentasie":getInputPersentageValue(),
						//"persentasie":dropdown_coverage.value,
						"tariffOptionId":getOptionsByFarmCropTypeObjectIdByCoverage(dropdown_coverage.value),
						"landNumber":getInputLandNumberValue(),
						"cultivar":getInputCultivarValue(),
						"area":getInputAreaValue(),
						"yield":getInputYieldValue(),
						"price":getInputPriceValue(),
						"versekerings_waarde":berekenVersekeringsWaarde()
					}
				]
			};

		return quoteData;
	}

	function saveToMainQuoteObject(quoteData)
	{
		if(isEmpty(quote))
		{
			quote = quoteData;
		}
		else
		{
			// QuoteData will only posses one entry at a time
			quote.quoteLandEntries.push(quoteData.quoteLandEntries[0]);
		}

		debugTool.print("Add to quote", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		debugTool.print(quote, FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
	}

	function isEmpty(obj) {
		for(var prop in obj) {
		    if(obj.hasOwnProperty(prop))
		        return false;
		}

		return true;
	}

	function reloadLandEntryTable()
	{
		resetLandEntryTable();
		loadMainQuoteIntoTable();
	}

	function loadMainQuoteIntoTable()
	{
		for(var i = 0; i < quote.quoteLandEntries.length; i++)
		{
			var landEntry = quote.quoteLandEntries[i];

			if(landEntry != undefined)
			{
				var row = document.createElement('TR');

				createLandEntryColumns(landEntry, row);

				addRowToLandEntryContainer(row);
			}
		}
	}

	function addRowToLandEntryContainer(row)
	{
		land_entry_container.appendChild(row);
	}

	function createLandEntryColumns(landEntry, row)
	{
		// Default columns
		createColumn(landEntry.plaas, row);
		createColumn(landEntry.gewas, row);
		createColumn(landEntry.cultivar, row);
		createColumn(landEntry.area, row);
		createColumn(landEntry.yield, row);
		createColumn(landEntry.price, row);
		createColumn(landEntry.versekerings_waarde, row);
		createColumn(landEntry.opsie_tiepe, row);
		createColumn(landEntry.persentasie, row);
		// ^ Default column ^

		// Button columns
		createButtonColumns(landEntry, row);
		// ^ Button column ^
	}

	function createColumn(value, container)
	{
		var column = document.createElement('TH');
		column.innerHTML = value;

		container.appendChild(column);
	}

	function createButtonColumns(landEntry, container)
	{
		createColumnWithObject(createEditButton(landEntry), container);
		createColumnWithObject(createDeleteButton(landEntry), container);
	}

	function createColumnWithObject(object, container)
	{
		var column = document.createElement('TH');
		container.appendChild(column);

		column.appendChild(object);
	}

	// Edit button functionality
	function createEditButton(landEntry)
	{
		var button = document.createElement("DIV");
		button.innerHTML = "Edit";
		button.className = "btn btn-success";
		button.onclick = function(){editLandEntry(landEntry)};

		return button;
	}

	function editLandEntry(landEntry)
	{
		hideIncludeRowButton();
		setInputFieldsToExistingQuoteForEditing(landEntry);
		createTemporaryButtonsForHandelingQuoteEdit(landEntry);
	}

	function setInputFieldsToExistingQuoteForEditing(landEntry)
	{
		debugTool.print("Ready inputs for editing", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		debugTool.print(landEntry, FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);

		setInputProductValue(landEntry.produk);
		setInputCropValue(landEntry.gewas);
		setInputOptionTypeValue(landEntry.opsie_tiepe);
		setInputPersentageValue(landEntry.persentasie);
		setInputLandNumberValue(landEntry.landNumber);
		setInputCultivarValue(landEntry.cultivar);
		setInputAreaValue(landEntry.area);
		setInputYieldValue(landEntry.yield);
		setInputPriceValue(landEntry.price);
	}

	function createTemporaryButtonsForHandelingQuoteEdit(landEntry)
	{
		removeTemporaryButtons();	

		createTemporaryButtons(row4, landEntry);
	}

	function tempButtonsAlreadyExists(container, saveId, cancelId)
	{
		return container.contains(document.getElementById(saveId)) || container.contains(document.getElementById(cancelId));
	}

	function removeTemporaryButtons()
	{
		var saveId = "saveBtn";
		var cancelId = "cancelBtn";

		if(tempButtonsAlreadyExists(row4, saveId, cancelId))
		{
			row4.removeChild(document.getElementById(saveId));
			row4.removeChild(document.getElementById(cancelId));
		}
	}

	function createTemporaryButtons(container, landEntry)
	{
		createSaveBtn(container, landEntry);
		createCancelButton(container);
	}

	function createSaveBtn(container, landEntry)
	{
		var button = document.createElement("DIV");
		button.id = "saveBtn";
		button.innerHTML = "Save";
		button.className = "btn btn-success";
		button.onclick = function() {save(landEntry)};

		container.appendChild(button);
	}

	function save(landEntry)
	{
		var editedQuote = parseInputDataIntoJSONQuote();

		updateQuoteLandEntry(editedQuote.quoteLandEntries[0], landEntry);
			
		removeTemporaryButtons();
		showIncludeRowButton();

		reloadLandEntryTable();

		clearInputsForNextEntry();
	}

	function updateQuoteLandEntry(editedLandEntry, originalLandEntry)
	{
		debugTool.print("Update record", FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
		for(var i = 0; i < quote.quoteLandEntries.length; i++)
		{
			if(quote.quoteLandEntries[i] == originalLandEntry)
			{
				quote.quoteLandEntries[i] = editedLandEntry;
			}
		}
	}

	function createCancelButton(container)
	{
		var button = document.createElement("DIV");
		button.id = "cancelBtn";
		button.innerHTML = "Cancel";
		button.className = "btn btn-danger";
		button.onclick = function() {cancel()};

		container.appendChild(button);
	}

	function cancel()
	{
		clearInputsForNextEntry();
		removeTemporaryButtons();
		showIncludeRowButton();
	}
	// ^ Edit button functionality ^

	// Delete button functionality
	function createDeleteButton(landEntry)
	{
		var button = document.createElement("DIV");
		button.innerHTML = "Delete";
		button.className = "btn btn-danger";
		button.onclick = function(){deleteLandEntry(landEntry)};

		return button;
	}

	function deleteLandEntry(landEntry)
	{
		debugTool.print("Delete item", FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
		debugTool.print(landEntry, FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
		for(var i = 0; i < quote.quoteLandEntries.length; i++)
		{
			if(landEntry == quote.quoteLandEntries[i])
			{
				//delete quote.quoteLandEntries[i];
				quote.quoteLandEntries.splice(i, 1);
				break;
			}
		}
		debugTool.print(quote, FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);

		reloadLandEntryTable();	

		if(quote.quoteLandEntries.length <= 0)
		{
			hideCreateQuoteButton();
		}
	}
	// ^ Delete button functionality ^

	function reset()
	{
		// Reset object
		resetQuoteObject();
		// Remove notification status of validity
		resetFarmLabel();
		resetBusinessUnitLabel();
		resetLandNumberLabel();
		// Remove disble state from business unit
		removeDisableStatusFromBusinessUnit();
		// Clear all values
		clearAllInputValues();
		// Clear table entries
		resetLandEntryTable();
		// Start right at the beginning
		setInitialInputVisibility();
	}

	function cancelCreatingQuote()
	{
		reset();
	}

	function createQuoteAndAddToView()
	{
		if(persistQuoteData(quote))
		{
			// send the data to the qoute.js
			quoteViewer.reloadAccordion();
			// close the modal
			closeModal();
			// Display some sort of confirmation ?

			// Reset all
			reset();
		}
		else
		{
			alert("Data could not be saved by the server");
		}
	}

	function persistQuoteData(quote)
	{
		// TODO: fix object values to suite mock
		var landEntries = quote.quoteLandEntries;

		debugTool.print(landEntries, FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);

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

	function openModal()
	{
		debugTool.print("open modal", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		open_modal_button.click();
	}

	function closeModal()
	{
		debugTool.print("closing modal", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		close_modal_button.click();
	}

	this.openModalAndReQuote = function(quoteId)
	{
		// Open modal 
		openModal();
		// Display all fields
		showFarm();
		showFields();
		// Disable business unit
		disableBusinessUnit();
		// Load land entries into table
		loadLandEntriesValues(quoteId);
		// Reload accordion
		quoteViewer.reloadAccordion();
	}

	function loadLandEntriesValues(quoteId)
	{
		// Make sure the quoteObject has no residual entries
		resetQuoteObject();
		// Load values into quote object
		saveToMainQuoteObject(getQuote(quoteId));
		// Make sure the table is reloaded - references main quote object
		reloadLandEntryTable();
		// Make sure no residual values are left - perhaps from incomplete opperation
		clearAllInputValues();
		// Load land entries into table
	}

	function getQuote(quoteId)
	{
		debugger;
		//var quoteData = quoteInvoker.getDetailsOfQuote(quoteId)
		var quoteData = quoteInvoker.getQuote(quoteId)

		// TODO: load addition values like names for option type etc etc

		return quoteData;
	}
}