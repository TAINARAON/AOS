var modalDamageReport = new function()
{
	var element_business_unit;
	var businessUnitArr;

	var element_farm;
	var farmArr

	var landArr;

	var damageTypes;

	var element_damage_types_container = document.getElementById("damage_types_container");;
	var element_damage_report_date_container = document.getElementById("damage_report_date_container");

	var element_farm_container = document.getElementById("farm_container");
	var element_land_container = document.getElementById("land_container");

	var element_available_land_entry_container = document.getElementById("availableLandEntry");
	var element_selected_land_entry_container = document.getElementById("selectedLandEntry");

	//var element_claim_date_container = document.getElementById("claim_made");
	var element_report_date_container = document.getElementById("report_made");

	/*function getBusinessUnitByName(name)
	{
		for(var i = 0; i < businessUnitArr.length; i++)
		{
			if(businessUnitArr[i].name == name)
			{
				return businessUnitArr[i];
			}
		}
	}

	function getFarmByName(name)
	{
		for(var i = 0; i < farmArr.length; i++)
		{
			if(farmArr[i].name == name)
			{
				return farmArr[i];
			}
		}
	}*/

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
					
					for(var i = 0; i < response.length; i++)
					{
						damageTypes = response;
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
		console.log("response id: "+response);
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
						//$(element_available_land_entry_container).append("<li>"+landArr[i].landNumber+"</li>");
						var li = $('<li></li>').text(landArr[i].landNumber).on('click',function() {

							toggleSelectedListItem($(this));
						});
						$(element_available_land_entry_container).append(li);
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
			var landEntryIds = [];
			var totalSelectedLandEntries = $("#selectedLandEntry li");
			for(var i = 0; i < totalSelectedLandEntries.length; i++)
			{
				var landEntry = totalSelectedLandEntries.eq(i);
				landEntryIds.push(getLandEntryByLandEntryNumber(landEntry.text()).id);
			}
			var damageType = getDamageTypeByName($(":radio[name='optradio']:checked").val());

			var reportDate = element_report_date_container.value;

			var damageReportObj = {
				"damageTypeId":damageType.id,
				"damageReportNumber":generateReportNumber(),
				"dateOfDamage":reportDate,
				"damageReportLandEntryIds":landEntryIds
			}

			var response = damageReportInvoker.createDamageReport(damageReportObj);
			if(response != null)
			{
				ajaxPost("some url", 
					function(response){
						reset();
						damageReport.reload();
					}, 
					function(){
						alert("Failed to create damage report");
					}, 
					damageReportObj, 
					response
				);
			}
			else
			{
				alert("Error creating damage report");
			}

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