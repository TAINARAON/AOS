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

	function getBusinessUnitIdByName(name)
	{
		for(var BU in farmArr)
		{
			if(BU.name = name)
			{
				return BU.id;
			}
		}
	}

	(function init()
	{
		initDamageTypeDateContainer();
		initDamageTypeContainer();
		initDropDowns();
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
		// TODO: load this from session
		businessUnitArr = damageReportInvoker.getBusinessUnitByBrokerId(0);

		element_business_unit.innerHTML = "";
		for(var i = 0; i < businessUnitArr.length; i++)
		{
			if(i == 0)
			{
				var option = createDropdownOption("", element_business_unit);
				$(option).attr("disabled selected value");
			}

			createDropdownOption(businessUnitArr[i].name, element_business_unit);
		}
	}

	function initFarmDropdown()
	{
		element_farm = document.getElementById("farm_dropdown");
		element_farm.onchange = function(){loadLandDropdownChoicesForFarm(element_farm.value);};
	}

	function loadFarmDropdownChoicesForBusinessUnit(val)
	{
		farmArr = damageReportInvoker.getFarmByBusinessUnitId(getBusinessUnitIdByName(val));

		for(var i = 0; i < farmArr; i++)
		{
			if(i == 0)
			{
				var option = createDropdownOption("", element_farm);
				$(option).attr("disabled selected value");
			}

			createDropdownOption(businessUnitArr[i].name, element_farm);
		}
	}

	function initLandDropdown()
	{
		element_land = document.getElementById("land_dropdown");
		element_land.onchange = function(){loadDamageTypesForLand(element_land.value);};
	}

	function loadLandDropdownChoicesForFarm(val)
	{

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