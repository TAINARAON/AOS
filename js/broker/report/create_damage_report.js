var modalDamageReport = new function()
{
	var element_business_unit;
	var businessUnitArr;
	var businessUnitId

	var element_farm;
	var farmArr;
	var farmId;

	var element_land;
	var landArr;
	var landId;

	var element_damage_types_container;
	var element_damage_report_date_container;

	var element_farm_container = document.getElementById("farm_container");
	var element_land_container = document.getElementById("land_container");

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
		initDamageTypeDateContainer();
		initDamageTypeContainer();
		initDropDowns();

		element_farm_container.style.display = "none";
		element_land_container.style.display = "none";
		element_damage_types_container.style.display = "none";
	})();

	function initDamageTypeDateContainer()
	{
		element_damage_report_date_container = document.getElementById("damage_report_date_container");
	}

	function initDamageTypeContainer()
	{
		element_damage_types_container = document.getElementById("damage_types_container");
	}

	function loadDamageTypesForLand(val)
	{
		element_damage_types_container.innerHTML = "";

		
	}

	function initDropDowns()
	{
		initLandDropdown();
		initFarmDropdown();
		initBusinessUnitDropdown();
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

		/*var businessUnitId = getBusinessUnitIdByName(val);
		farmArr = damageReportInvoker.getFarmByBusinessUnitId(sessionStorage.brokerId, businessUnitId);

		for(var i = 0; i < farmArr.length; i++)
		{
			if(i == 0)
			{
				var option = createDropdownOption("", element_farm);
				$(option).attr("disabled selected value");
			}

			createDropdownOption(farmArr[i].name, element_farm);
		}*/
	}

	function initLandDropdown()
	{
		element_land = document.getElementById("land_dropdown");
		element_land.onchange = function(){loadDamageTypesForLand(element_land.value);};
	}

	function loadLandDropdownChoicesForFarm(val)
	{
		element_land.innerHTML = "";

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
						if(i == 0)
						{
							var option = createDropdownOption("", element_land);
							$(option).attr("disabled selected value");
						}

						createDropdownOption(landArr[i].landNumber, element_land);
					}

					element_land_container.style.display = "block";
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