(function(){ 

	var quote = [];
	
	// Input fields
	var input_boerdery = document.getElementById("business_unit");
	var input_plaas = document.getElementById("farm");
	var input_produk = document.getElementById("produk");
	var input_gewas = document.getElementById("gewas");
	var input_opsie_tipe = document.getElementById("opsie_tiepe");
	var input_persentasie = document.getElementById("persentasie");
	var input_land_nommer = document.getElementById("land_nommer");
	var input_kultivar = document.getElementById("kultivar");
	var input_oppervlakte = document.getElementById("oppervlakte");
	var input_gewas_opbrengs = document.getElementById("gewas_opbrengs");
	var input_rand_per_eenheid = document.getElementById("rand_per_eenheid");
	//var input_versekerings_waarde = document.getElementById("versekerings_waarde");
	// ^ Input fields ^

	// Farm container
	var farmContiner = document.getElementById("farmContainer");
	// ^ Farm container ^

	// Row containers
	var row1 = document.getElementById("row1Container");
	var row2 = document.getElementById("row2Container");
	var row3 = document.getElementById("row3Container");
	var row4 = document.getElementById("row4Container");
	// ^ Row containers ^

	// Land entry table row container
	var rowContainer = document.getElementById("create_quote_table_body");
	// ^ Land entry table row container ^

	var closeModalBtn = document.getElementById("close_modal");

	var boerderyID;
	var plaasID;
	var allValuesEntered = false;

	(function init(){
		setInitialInputVisibility();
		addOnChangeListeners();
		addInputValueListeners();
		setupModalButtonClickListeners();
	})();

	function setInitialInputVisibility()
	{
		hideFarm();

		hideFields();
	}

	function addOnChangeListeners()
	{
		input_boerdery.onblur = function(){toggleFarmInputVisibility(validateBusinessUnit());};
		input_plaas.onblur = function(){toggleFieldsVisible(validateFarm());};
	}

	function validateBusinessUnit()
	{
		var val = input_boerdery.value;
		if(val != undefined && val != "")
		{
			// TODO: server check
			setBusinessUnitId(Math.floor((Math.random() * 1000) + 1));
			if(true)
			{
				input_boerdery.disabled = "disabled";
				return true;
			}

			input_boerdery.removeAttribute("disabled");
			// TODO: display error - business unit not available
		}

		return false;
	}

	function toggleFarmInputVisibility(state)
	{
		if(state)
			showFarm();
		else
			hideFarm();
	}

	function showFarm()
	{
		farmContiner.style.visibility = "visible";
	}

	function hideFarm()
	{
		// change to display none to hide size in modal
		farmContiner.style.visibility = "hidden";
	}

	function validateFarm()
	{
		var val = input_plaas.value;
		if(val != undefined && val != "")
		{
			// TODO: server check
			setFarmId(Math.floor((Math.random() * 1000) + 1));
			return true;
		}

		return false;
	}

	function toggleFieldsVisible(state)
	{
		if(state)
			showFields();
		else
			hideFields();
	}

	function showFields()
	{
		row1.style.visibility = "visible";
		row2.style.visibility = "visible";
		row3.style.visibility = "visible";
		row4.style.visibility = "visible";
	}

	function hideFields()
	{
		row1.style.visibility = "hidden";
		row2.style.visibility = "hidden";
		row3.style.visibility = "hidden";
		row4.style.visibility = "hidden";
	}

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

        if (empty) {
        	allValuesEntered = false;
            //$('#register').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        } else {
        	allValuesEntered = true;
            //$('#register').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        }
	}

	function setupModalButtonClickListeners()
	{
		debugTool.print("Adding click listeners", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		document.getElementById("includeRow").onclick = function(e) {addFarmToQuote();};
		document.getElementById("cancelQuote").onclick = function(e) {cancelCreatingQuote();};
		document.getElementById("acceptQuote").onclick = function(e) {createQuoteAndAddToView()};
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

	function addFarmToQuote()
	{
		if(validateInputs())
		{
			var boerdery = input_boerdery.value;
			var plaas = input_plaas.value;
			var produk = input_produk.value;
			var gewas = input_gewas.value;
			var opsie_tipe = input_opsie_tipe.value;
			var persentasie = input_persentasie.value;
			var land_nommer = input_land_nommer.value;
			var kultivar = input_kultivar.value;
			var oppervlakte = input_oppervlakte.value;
			var gewas_opbrengs = input_gewas_opbrengs.value;
			var rand_per_eenheid = input_rand_per_eenheid.value;

			// TODO: proper calculation with testing for user messing with frontend elements in inspector
			// oppervlakte * gewasOpbrengs * R.Unit
			var versekerings_waarde = Math.floor((Math.random() * 10000) + 1);

			// TODO: proper calculation
			// sumOfAllSelectedDamageTypesPremiumContribution = 0;
			//	foreach(quoteLandEntry.selectedDamageTypes as selectedDamageType) {
			//	   sumOfAllSelectedDamageTypesPremiumContribution  += selectedDamageType.premiumContribution;
			//	}
			// ValueOfCrop = quoteLandEntry.price x quoteLandEntry.yield x quoteLandEntry.area
			// PremiumContributionValue = ValueOfCrop * sumOfAllSelectedDamageTypesPremiumContribution
			//var premiumContributionValue =  Math.floor((Math.random() * 10000) + 1);

			var data = {
				"brokerId":getBrokerId(),
				"insurerId":getInsurerId(),
				"businessUnitId":getBusinessUnitId(),
				'active':'1',
				'acceptable':'1',
				'quoteNumber': "00001",
				'linkedToQuoteId':null,
				'dateCreated':'1990-05-18 19:01:05',
				"boerdery":boerdery,
				quoteLandEntries:[
					{
						"plaas":plaas,
						"produk":produk,
						"gewas":gewas,
						"opsie_tiepe":opsie_tipe,
						"persentasie":persentasie,
						"landNumber":land_nommer,
						"cultivar":kultivar,
						"area":oppervlakte,
						"yield":gewas_opbrengs,
						"price":rand_per_eenheid,
						"versekerings_waarde":versekerings_waarde
					}
				]
			};

			addToQuoteObject(data);
			addToTable(data, rowContainer);
			clearQuoteEntrySpecificValuesAfterAdd();
		}
		else
		{
			alert("Please fill in all values");
		}
	}

	function validateInputs()
	{
		debugTool.print("checking validity", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		
		/*
		// TODO: add extra validation here
		var boerderySuccess = validateBusinessUnite(input_boerdery.value);
		if(!boerderySuccess)
		{
			// Somehow highlight this field
		}

		var plaasSuccess = validateFarm(input_plaas.value);
		if(!plaasSuccess)
		{
			// Somehow highlight this field
		}

		return boerderySuccess && plaasSuccess && allValuesEntered;
		*/

		return allValuesEntered;
	}

	/*function validateBusinessUnite(businessUnitName)
	{
		// TODO: actual database call
		setBusinessUnitId(Math.floor((Math.random() * 1000) + 1));
		return true;
	}*/

	function setBusinessUnitId(id)
	{
		boerderyID = id;
	}

	function getBusinessUnitId()
	{
		return boerderyID;
	}

	function resetBusinessUnitId()
	{
		boerderyID = undefined;
	}

	/*function validateFarm(farmName)
	{
		// TODO: actual database call
		setFarmId(Math.floor((Math.random() * 1000) + 1));
		return true;
	}*/

	function setFarmId(id)
	{
		plaasID = id;
	}

	function getFarmId()
	{
		return plaasID;
	}

	function resetFarmId()
	{
		plaasID = undefined;
	}

	function addToQuoteObject(data)
	{
		var exists = false;
		for(var i = 0; i < quote.length; i++)
		{
			if(quote[i].boerdery == data.boerdery)
			{
				// Only one farm will be added per click so it's safe to select 0 in the array
				quote[i].quoteLandEntries.push(data.quoteLandEntries[0]);
				exists = true;
			}
		}

		if(!exists)
		{
			data.id = quote.length;
			quote.push(data);
		}
	}

	function addToTable(data, container)
	{
		var row = document.createElement('TR');
		for(let i = 0; i < data.quoteLandEntries.length; i++)
		{
			var spesifiekePlaas = data.quoteLandEntries[i];

			/*createColumn(spesifiekePlaas.plaas, row);
			createColumn(spesifiekePlaas.produk, row);
			createColumn(spesifiekePlaas.gewas, row);
			createColumn(spesifiekePlaas.opsie_tiepe, row);
			createColumn(spesifiekePlaas.persentasie, row);
			createColumn(spesifiekePlaas.land_nommer, row);
			createColumn(spesifiekePlaas.kultivar, row);
			createColumn(spesifiekePlaas.oppervlakte, row);
			createColumn(spesifiekePlaas.gewas_opbrengs, row);
			createColumn(spesifiekePlaas.rand_per_eenheid, row);
			createColumn(spesifiekePlaas.versekerings_waarde, row);*/

			// After an item is deleted from the JSON landEntry it leaves an undefined item
			if(spesifiekePlaas != undefined)
			{
				createColumn(spesifiekePlaas.plaas, row);
				createColumn(spesifiekePlaas.gewas, row);
				createColumn(spesifiekePlaas.cultivar, row);
				createColumn(spesifiekePlaas.area, row);
				createColumn(spesifiekePlaas.yield, row);
				createColumn(spesifiekePlaas.price, row);
				createColumn(spesifiekePlaas.versekerings_waarde, row);
				createColumn(spesifiekePlaas.opsie_tiepe, row);
				createColumn(spesifiekePlaas.persentasie, row);
				
				createButtonColumn(row, data.boerdery, i);
			}
		}

		container.appendChild(row);
	}

	function createColumn(value, container)
	{
		var column = document.createElement('TH');
		column.innerHTML = value;

		container.appendChild(column);
	}

	function createColumnWithObject(object, container)
	{
		var column = document.createElement('TH');
		container.appendChild(column);

		column.appendChild(object);
	}

	function createButtonColumn(container, boerdery, index)
	{
		createColumnWithObject(createEditButton(boerdery, index), container);
		createColumnWithObject(createDeleteButton(boerdery, index), container);
	}

	function createEditButton(boerdery, index)
	{
		var button = document.createElement("DIV");
		button.innerHTML = "Edit";
		button.className = "btn btn-success";
		button.onclick = function(){editLandEntry(boerdery, index)};
		//container.appendChild(button);
		return button;
	}

	function editLandEntry(boerdery, index)
	{
		for(var i = 0; i < quote.length; i++)
		{
			if(quote[i].boerdery = boerdery)
			{
				debugTool.print("Edit item: " + quote[i], FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
				for(var j = 0; j < quote[i].quoteLandEntries.length; j++)
				{
					if(j == index)
					{
						debugTool.print("Edit item: " + boerdery + " number " + index, FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
						
						// Load values into input boxes again
						// TODO: Update object entry?
						// Add another one??
					}
				}
			}
		}

		reloadTable(quote);
	}

	function createDeleteButton(boerdery, index)
	{
		var button = document.createElement("DIV");
		button.innerHTML = "Delete";
		button.className = "btn btn-danger";
		button.onclick = function(){deleteLandEntry(boerdery, index)};
		//container.appendChild(button);
		return button;
	}

	function deleteLandEntry(boerdery, index)
	{
		for(var i = 0; i < quote.length; i++)
		{
			if(quote[i].boerdery = boerdery)
			{
				debugTool.print("Delete item: " + quote[i], FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
				for(var j = 0; j < quote[i].quoteLandEntries.length; j++)
				{
					if(j == index)
					{
						debugTool.print("Delete item: " + boerdery + " number " + index, FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);
						delete quote[i].quoteLandEntries[j];
					}
				}
			}
		}

		reloadTable(quote);
	}

	function reloadTable(quote)
	{
		resetTableRows();

		for(var i = 0; i < quote.length; i++)
		{
			debugTool.print(quote[i], FILTER_LEVEL_MEDIUM, FILTER_TYPE_LOG);			
			if(quote[i].quoteLandEntries.length != 0)
			{
				addToTable(quote[i], rowContainer);
			}
		}
	}

	function clearQuoteEntrySpecificValuesAfterAdd()
	{
		console.log("Clear values after add");

		// Land nommer
		input_land_nommer.value = "";

		// Kultivar
		input_kultivar.value = "";

		// Oppervlak
		input_oppervlakte.value = "";

		// Versekering waarde
		//input_versekerings_waarde.value = "";

		// Check checkbox values
		if(!document.getElementById("onthou_gewas_opbrengs").checked)
		{
			// Gewas opbrengs
			input_gewas_opbrengs.value = "";
		}

		if(!document.getElementById("onthou_rand_waarde").checked)
		{
			// Rand per eenheid
			input_rand_per_eenheid.value = "";
		}
	}

	function cancelCreatingQuote()
	{
		reset();
	}

	function reset()
	{
		debugTool.print("Resetting modal values", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		resetBusinessUnitId();
		resetFarmId();

		resetInputValues();
		resetQuoteData();
		resetTableRows();
	}

	function resetInputValues()
	{
		input_boerdery.value = "";
		input_plaas.value = "";
		input_produk.value = "";
		input_gewas.value = "";
		input_opsie_tipe.value = "";
		input_persentasie.value = "";
		input_land_nommer.value = "";
		input_kultivar.value = "";
		input_oppervlakte.value = "";
		input_gewas_opbrengs.value = "";
		input_rand_per_eenheid.value = "";
		//input_versekerings_waarde.value = "";
	}

	function resetQuoteData()
	{
		quote = [];
	}

	function resetTableRows()
	{
		//var rowContainer = document.getElementById("create_quote_table_body");
		rowContainer.innerHTML = "";
	}

	function createQuoteAndAddToView()
	{
		debugTool.print("Create quote", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);

		if(persistDataToDatabase(quote))
		{
			updateQuotes(quote);
			closeModal();
			reset();
		}
		else
		{
			alert("Could not persist data, please ensure data is valid");
		}
	}

	function persistDataToDatabase(quote)
	{
		// TODO: persist data to db
		// One will then receive the id, which the object will be updated with

		return true;
	}

	function closeModal()
	{
		debugTool.print("closing modal", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
		closeModalBtn.click();
	}
})();