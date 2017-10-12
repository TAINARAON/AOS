var modalDamageReport = new function()
{
	var element_business_unit;
	var businessUnitArr;
	var businessUnitId

	var element_farm;
	var farmArr;
	var farmId;

	var element_damage_types_container = document.getElementById("damage_types_container");;
	var element_damage_report_date_container = document.getElementById("damage_report_date_container");

	var element_farm_container = document.getElementById("farm_container");
	var element_land_container = document.getElementById("land_container");

	var element_available_land_entry_container = document.getElementById("availableLandEntry");
	var element_selected_land_entry_container = document.getElementById("selectedLandEntry");

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
		initDropDowns();

		element_farm_container.style.display = "none";
		element_land_container.style.display = "none";
		element_damage_types_container.style.display = "none";
	})();

	function initDropDowns()
	{
		initFarmDropdown();
		initBusinessUnitDropdown();
	}

	function loadDamageTypes()
	{
		element_damage_types_container.innerHTML = "";
		
		var response = damageReportInvoker.getDamageTypes();

		if(response != null)
		{
			ajaxGet("Some url - get", 
				function(response){
					debugger;
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

						$(column).append('<div class="radio"><label><input type="radio" name="optradio">'+damageType.name+'</label></div>');
					}

					element_damage_types_container.style.display = "block";
				}, 
				function(){
					alert("Failed to retreive damage types");
					element_damage_types_container.style.display = "none";
				}, 
				response
			);
		}
		else
		{
			element_damage_types_container.style.display = "none";
		}
	}

	function initBusinessUnitDropdown()
	{
		element_business_unit = document.getElementById("business_unit_dropdown");
		loadBusinessUnitDropdownChoisesForBroker();
		element_business_unit.onchange = function(){loadFarmDropdownChoicesForBusinessUnit(element_business_unit.value);};
	}

	function loadBusinessUnitDropdownChoisesForBroker()
	{
		element_business_unit.innerHTML = "";

		var response = damageReportInvoker.getBusinessUnitByBrokerId(sessionStorage.brokerId);
		if(response != null)
		{
			ajaxPost("Some url", 
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
				function(){
					alert("Failed to load businessUnits");
				}, 
				{"brokerId":sessionStorage.brokerId}, 
				response
			);
		}

		/*businessUnitArr = damageReportInvoker.getBusinessUnitByBrokerId(sessionStorage.brokerId);

		for(var i = 0; i < businessUnitArr.length; i++)
		{
			if(i == 0)
			{
				var option = createDropdownOption("", element_business_unit);
				$(option).attr("disabled selected value");
			}

			createDropdownOption(businessUnitArr[i].name, element_business_unit);
		}*/
	}

	function initFarmDropdown()
	{
		element_farm = document.getElementById("farm_dropdown");
		element_farm.onchange = function(){loadLandDropdownChoicesForFarm(element_farm.value);};
	}

	function loadFarmDropdownChoicesForBusinessUnit(val)
	{
		element_farm.innerHTML = "";

		var businessUnitId = getBusinessUnitIdByName(val);
		var response = damageReportInvoker.getFarmByBusinessUnitId(sessionStorage.brokerId, businessUnitId);
		
		if(response != null)
		{
			ajaxPost("Some url", 
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
					}

					element_farm_container.style.display = "block";
				}, 
				function(){
					alert("Failed to load farms");
					element_farm_container.style.display = "none";
				}, 
				{
					"brokerId":sessionStorage.brokerId,
					"businessUnitId":businessUnitId
				}, 
				response
			);
		}
		else
		{
			element_farm_container.style.display = "none";
		}
	}

	function loadLandDropdownChoicesForFarm(val)
	{
		element_available_land_entry_container.innerHTML = "";
		element_selected_land_entry_container.innerHTML = "";

		var businessUnitId = getBusinessUnitIdByName(element_business_unit.value);
		var farmId = getFarmIdByName(element_farm.value);

		var response = damageReportInvoker.getLandByFarmId(sessionStorage.brokerId, businessUnitId, farmId);

		if(response != null)
		{
			ajaxPost("some url", 
				function(response){
					landArr = response;

					for(var i = 0; i < landArr.length; i++)
					{
						$(element_available_land_entry_container).append("<li>"+landArr[i].landNumber+"</li>");
					}

					element_land_container.style.display = "block";


					loadDamageTypes();
				}, 
				function(){
					alert("Failed to retrieve landEntries");
					element_land_container.style.display = "none";
				}, 
				{
					"brokerId": sessionStorage.brokerId,
					"businessUnitId": businessUnitId,
					"farmId": farmId
				}, 
				response
			);
		}
		else
		{
			element_land_container.style.display = "none";
		}
	}

	function createDropdownOption(val, container)
	{
		var option = document.createElement("OPTION");
		option.value = val;
		option.innerHTML = val;

		container.appendChild(option);

		return option;
	}
}