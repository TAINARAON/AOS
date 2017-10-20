var modalDamageReport = new function()
{
	var clientId;

	var element_business_unit = document.getElementById("business_unit_dropdown");
	var businessUnitArr;

	var element_farm = document.getElementById("farm_dropdown");
	var farmArr

	var landArr;

	var damageTypes;

	var element_damage_types_container = document.getElementById("damage_types_container");;
	var element_damage_report_date_container = document.getElementById("damage_report_date_container");

	var element_farm_container = document.getElementById("farm_container");
	var element_land_container = document.getElementById("land_container");

	var element_available_land_entry_container = document.getElementById("availableLandEntry");
	var element_selected_land_entry_container = document.getElementById("selectedLandEntry");

	var element_report_date_container = document.getElementById("report_made");

	function getLandEntryByLandEntryNumber(number)
	{
		for(var i = 0; i < landArr.length; i++)
		{
			if(landArr[i].landNumber == number)
			{
				return landArr[i];
			}
		}
	}

	function getDamageTypeByName(name)
	{
		for(var i = 0; i < damageTypes.length; i++)
		{
			if(damageTypes[i].name == name)
			{
				return damageTypes[i];
			}
		}
	}

	function getBusinessUnitIdByName(name)
	{
		for(var i = 0; i < businessUnitArr.length; i++)
		{
			if(businessUnitArr[i].name == name)
			{
				return businessUnitArr[i].id;
			}
		}
	}

	function getFarmIdByName(name)
	{
		for(var i =0; i < farmArr.length; i++)
		{
			if(farmArr[i].name == name)
			{
				return farmArr[i].id;
			}
		}
	}

	(function init()
	{
		clientId = clientController.getClient().id;

		onAddFileClickListener();
		onRemoveFileClickListener();
		initDropDowns();

		element_farm_container.style.display = "none";
		element_land_container.style.display = "none";
		element_damage_types_container.style.display = "none";

		document.getElementById("cancel").onclick = function(){cancel();};
		document.getElementById("accept").onclick = function(){save();};

		$(element_report_date_container).val(util.getDateTimePretty());
	})();

	function initDropDowns()
	{
		initBusinessUnitDropdown();
		initFarmDropdown();
	}

	function initBusinessUnitDropdown()
	{
		loadBusinessUnitDropdownChoisesForBroker();
		element_business_unit.onchange = function(){loadFarmDropdownChoicesForBusinessUnit(element_business_unit.value);};
	}

	function loadBusinessUnitDropdownChoisesForBroker()
	{
		element_business_unit.innerHTML = "";

		var requestObj = {"clientId":clientId};
		clientController.getBusinessUnitsTheClientBelongsTo(
			function(response){
				businessUnitArr = response;

				for(var i = 0; i < businessUnitArr.length; i++)
				{
					if(i == 0)
					{
						var option = createDropdownOption("", element_business_unit);
						$(option).attr("disabled selected value");
					}

					createDropdownOption(businessUnitArr[i].name, element_business_unit);
				}
			}, 
			function(response){
				util.createNotification("Issue retrieving business units");
			},requestObj
		);
	}

	function loadDamageTypes()
	{
		element_damage_types_container.innerHTML = "";

		brokerController.getDamageTypes(
			function(response){
				damageTypes = response;
				for(var i = 0; i < response.length; i++)
				{
					var damageType = response[i];

					var row;
					if(i%3 == 0)
					{
						row = document.createElement("DIV");
						row.className = "row";

						element_damage_types_container.appendChild(row);
					}

					var column = document.createElement("DIV");
					column.className = "col-md-4";
					row.appendChild(column);

					$(column).append('<div class="radio"><label><input type="radio" name="optradio" value="'+damageType.name+'">'+damageType.name+'</label></div>');
				}

				element_damage_types_container.style.display = "block";
			},
			function(response){
				element_damage_types_container.style.display = "none";
				alert("Failed to load damageTypes");
			}
		);
	}

	function initFarmDropdown()
	{
		element_farm.onchange = function(){loadLandDropdownChoicesForFarm(element_farm.value);};
	}

	function loadFarmDropdownChoicesForBusinessUnit(val)
	{
		element_farm.innerHTML = "";

		var requestObj = {
			"clientId":clientId,
			"businessUnitId":getBusinessUnitIdByName(val)
		};

		clientController.getFarmsForBusinessUnitTheClientBelongsTo(
			function(response){
				farmArr = response;

				for(var i = 0; i < farmArr.length; i++)
				{
					if(i == 0)
					{
						var option = createDropdownOption("", element_farm);
						$(option).attr("disabled selected value");
					}

					createDropdownOption(farmArr[i].name, element_farm);

					element_farm_container.style.display = "block";
				}
			},
			function(response){
				element_farm_container.style.display = "none";
				util.createNotification("Failed to load farms");
			},
			requestObj
		);
	}

	function loadLandDropdownChoicesForFarm(val)
	{
		element_available_land_entry_container.innerHTML = "";
		element_selected_land_entry_container.innerHTML = "";

		var requestObj = {
			"clientId":clientId,
			"businessUnitId":getBusinessUnitIdByName(element_business_unit.value),
			"farmId":getFarmIdByName(element_farm.value)
		};

		clientController.getLandEntryForFarmAndBusinessUnitTheClientBelongsTo(
			function(response){
				landArr = response;
					
				for(var i = 0; i < landArr.length; i++)
				{
					var li = $('<li></li>')
						.text(landArr[i].landNumber)
						.val(landArr[i].landNumber)
						.on('click',function() {toggleSelectedListItem($(this));});

					$(element_available_land_entry_container).append(li);
				}

				element_land_container.style.display = "block";

				loadDamageTypes();
			},
			function(response){
				element_land_container.style.display = "none";
				util.createNotification("Failed to retrieve landEntries");
			},
			requestObj
		);
	}

	function toggleSelectedListItem(li) {
		if(li.hasClass('selected')) {
			li.removeClass('selected');
			li.css('background-color','white');
		} else {
			li.addClass('selected');
			li.css('background-color','grey');
		}
	}

	function onAddFileClickListener() {

		$('#add_button').on('click',function() {
			
			var listItems = $('#availableLandEntry .selected');

			for(var i=0;i<listItems.length;i++) {

				var item = listItems.eq(i);
				item.detach();

				$('#selectedLandEntry').append(item);

				toggleSelectedListItem(item);
			}
		});
	}


	function onRemoveFileClickListener() {

		$('#remove_button').on('click',function() {
			
			var listItems = $('#selectedLandEntry .selected');

			for(var i=0;i<listItems.length;i++) {

				var item = listItems.eq(i);
				item.detach();

				$('#availableLandEntry').append(item);

				toggleSelectedListItem(item);
			}
		});
	}

	function createDropdownOption(val, container)
	{
		var option = document.createElement("OPTION");
		option.value = val;
		option.innerHTML = val;

		container.appendChild(option);

		return option;
	}

	function reset()
	{
		element_farm_container.style.display = "none";
		element_land_container.style.display = "none";
		element_damage_types_container.style.display = "none";

		damage_types_container.innerHTML = "";
		availableLandEntry.innerHTML = "";
		selectedLandEntry.innerHTML = "";

		element_farm.innerHTML = "";

		//element_report_date_container.innerHTML = "";

		loadBusinessUnitDropdownChoisesForBroker();
	}

	function cancel()
	{
		reset();
	}

	function save()
	{
		if(validate())
		{
			var businessUnitId = getBusinessUnitIdByName(element_business_unit.value);
			var farmId = getFarmIdByName(element_farm.value);
			var landEntries = [];
			var totalSelectedLandEntries = $("#selectedLandEntry li");
			for(var i = 0; i < totalSelectedLandEntries.length; i++)
			{
				var landEntry = totalSelectedLandEntries.eq(i);
				var landEntryId = getLandEntryByLandEntryNumber(landEntry.val()).id;
				
				//var requiresTaxation = landEntry.find('input[type=checkbox]').prop('checked');
				var landEntryObject = 
				{
					'id':landEntryId,
					'inspected':false
				};
				//'requiresTaxation':requiresTaxation
				landEntries.push(landEntryObject);
			}
			var damageType = getDamageTypeByName($(":radio[name='optradio']:checked").val());

			var reportDate = element_report_date_container.value;

			var damageReportObj = {
				"damageTypeId":damageType.id,
				"damageReportNumber":generateReportNumber(),
				"dateOfDamage":reportDate,
				"damageReportLandEntries":landEntries,
				"requiresTaxation":$(":checkbox[name='requires_taxation']:checked").val()
			};

			brokerController.saveDamageReport(
				function(response){
					reset();
					damageReport.reload();
					document.getElementById("close_modal").click();
					util.createNotification(response.message);
				}, 
				function(response){
					util.createNotification("Failed to save damage report");
				}, 
				damageReportObj
			);
		}
		else
		{
			alert("All required entries and selections has not yet been made");
		}
	}

	function validate()
	{
		if(getBusinessUnitIdByName(element_business_unit.value) == null)
		{
			return false;
		}

		if(getFarmIdByName(element_farm.value) == null)
		{
			return false;
		}

		if($("#selectedLandEntry li").length == 0)
		{
			return false;
		}

		if($(":radio[name='optradio']:checked").length == 0)
		{
			return false;
		}

		if(element_report_date_container.value.trim() == "")
		{
			return false;
		}

		return true;
	}

	function generateReportNumber()
	{
		return Math.floor((Math.random() * 100000) + 1);
	}
}