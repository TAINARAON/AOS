var policyViewer = new function ()
{
	var policies = [];
	var viewableBrokers;

	var landEntryMaps = [];
	var mapScriptContainer = document.getElementById("mapScriptContainer");

	var brokerSelect = document.getElementById("available_broker_dropdown");
	var policyNumberInput = document.getElementById("policy_number_input");
	var businessUnitInput = document.getElementById("business_unit_input");
	var searchButton = document.getElementById("search_button");
	var policyAccordion = document.getElementById("policy_accordion");

	(function init(){
		setAvailableBrokers();
		setSearchButtonClickListener();
		addOnEnterKeyPressedListenerForSearchInput(policyNumberInput);
		addOnEnterKeyPressedListenerForSearchInput(businessUnitInput);
		search();
	})();

	function setAvailableBrokers()
	{	
		var currentUserBrokerId = sessionStorage.brokerId;

		viewableBrokers = brokerInvoker.getViewableBrokers(currentUserBrokerId);
		
		var tSelfObj = brokerInvoker.getBrokerDisplayable(currentUserBrokerId);
		tSelfObj["brokerId"] = currentUserBrokerId;
		viewableBrokers.push(tSelfObj);

		for(var i = 0; i < viewableBrokers.length; i++)
		{
			var option = document.createElement("OPTION");
			option.innerHTML = viewableBrokers[i].name;

			brokerSelect.appendChild(option);
		}
	}

	function setupAccordionClickHandler()
	{
		$('.toggle').click(function(e) {
		  	e.preventDefault();
		    var $this = $(this);
		  	
		    if ($this.next().hasClass('show')) {
		        $this.next().removeClass('show');
		        //$this.next().slideUp(350);
		    } else {
		        $this.parent().parent().find('li .inner').removeClass('show');
		        //$this.parent().parent().find('li .inner').slideUp(350);
		        $this.next().toggleClass('show');
		        //$this.next().slideToggle(350);
		    }
		});
	}

	function setSearchButtonClickListener()
	{
		searchButton.onclick = function(){search();};
	}

	function addOnEnterKeyPressedListenerForSearchInput(searchInput)
	{
		$(searchInput).keypress(function(e){
	    if(e.keyCode==13)
	      search();
		});
	}

	function search()
	{
		landEntryMaps = [];

		var tBrokerName = $(brokerSelect).val().trim();
		var brokerId = getIdOfSelectedBroker(tBrokerName);
		var policyNumber = $(policyNumberInput).val().trim();
		var businessUnitName = $(businessUnitInput).val().trim();

		if(brokerId != -1)
		{
			var tObj = {
				"brokerId":brokerId,
				"policyNumber":policyNumber,
				"businessUnitName":businessUnitName
			};
			ajaxPost("Something", setPolicies, function(){alert("Issue getting policy data");}, tObj, policyInvoker.searchForPolicy(brokerId, policyNumber, businessUnitName));
			//setPolicies(policyInvoker.searchForPolicy(brokerId, policyNumber, businessUnitName));
		}
	}

	function getIdOfSelectedBroker(name)
	{
		for(var i = 0; i < viewableBrokers.length; i++)
		{
			if(viewableBrokers[i].name == name)
			{
				return viewableBrokers[i].brokerId;
			}
		}

		return -1;
	}

	function setPolicies(pol)
	{
		policies = pol;
		createAccordionPolicyItems(policies);
		setupAccordionClickHandler();
	}

	function createAccordionPolicyItems(policies)
	{
		policyAccordion.innerHTML = "";
		mapScriptContainer.innerHTML = "";

		for(var i = 0; i < policies.length; i++)
		{
			var childContainer = createPolicyAccordionParentItem(policies[i], policyAccordion);

			for(var j = 0; j < policies[i].policyLandEntries.length; j++)
			{
				createPolicyAccordionChildItem(policies[i].policyLandEntries[j], childContainer);
			}
		}

		addMapScriptForUpdatingLandEntryMaps(mapScriptContainer);
	}

	function createPolicyAccordionParentItem(policy, container)
	{
		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv("Policy Number: " + policy.policyNumber, parentTitle);
		createAccordionItemDetailDiv("Business Unit: " + policy.businessUnit.name, parentTitle);
		createAccordionItemDetailDiv("Policy Start: " + policy.acceptedOn, parentTitle);
		createAccordionItemDetailDiv("Premium: " + policy.premium, parentTitle);

		var childContainer = document.createElement("UL");
		childContainer.className = "inner";

		parentLi.appendChild(parentTitle);
		parentLi.appendChild(childContainer);

		container.appendChild(parentLi);

		return childContainer;
	}

	function createAccordionItemDetailDiv(val, container)
	{
		var tDiv = document.createElement("DIV");
		tDiv.innerHTML = val;
		tDiv.style.cssText = "margin-right: 80px;";
		container.appendChild(tDiv);
	}

	function createPolicyAccordionChildItem(landEntry, container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv("Land Number: " + landEntry.landNumber , childTitle);
		createAccordionItemDetailDiv("Crop: " + landEntry.crop.name, childTitle);
		createAccordionItemDetailDiv("Cultivar: " + landEntry.cultivar, childTitle);
		createAccordionItemDetailDiv("Area: " + landEntry.area, childTitle);
		createAccordionItemDetailDiv("Yield " + landEntry.yield, childTitle);
		createAccordionItemDetailDiv("Price: " + landEntry.price, childTitle);
		createAccordionItemDetailDiv("Tariff Option: " + landEntry.tariff, childTitle);

		var childDetail = document.createElement("DIV");
		childDetail.className = "inner";

		// TODO: add detail
		createChildDetailMapItem("policy_map" + landEntry.id, landEntry.landLatitude, landEntry.landLongitude, childDetail);

		childLi.appendChild(childTitle);
		childLi.appendChild(childDetail);

		container.appendChild(childLi);
	}

	function createChildDetailMapItem(id, landEntryLatitude, landEntryLongitude, container) 
	{
		var mapDiv = document.createElement("DIV");
		mapDiv.id = id;

		var tMapObj = {
			"id":id,
			"landEntryLatitude":landEntryLatitude,
			"landEntryLongitude":landEntryLongitude
		};

		landEntryMaps.push(tMapObj);

		container.appendChild(mapDiv);
	}

	function addMapScriptForUpdatingLandEntryMaps(container)
	{
		var mapScript = document.createElement("SCRIPT");
		mapScript.type = "text/javascript";
		mapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAv9T_ISeUi2Jf9FcFpXO24VkRUByr5_ek&callback=policyViewer.initMap";

		container.appendChild(mapScript);
	}

	this.initMap = function() {
		console.log("Triggers updating of maps");

		var maps = [];

		for(var i = 0; i < landEntryMaps.length; i++)
		{
			var latitude = landEntryMaps[i].landEntryLatitude * 1;
			var longitude = landEntryMaps[i].landEntryLongitude * 1;
			var mapDivId = landEntryMaps[i].id;

			var uluru = {lat: latitude, lng: longitude};

			var map = new google.maps.Map(document.getElementById(mapDivId), {
				zoom: 4,
				center: uluru
			});

			console.log(map);

			var marker = new google.maps.Marker({
			  position: uluru,
			  map: map
			});

			document.getElementById(mapDivId).style.cssText += "min-height: 400px;";

			maps.push(map);
		}

		for(var i = 0; i < maps.length; i++)
		{
			console.log("Tries to resenter");
			var map = maps[i];

			google.maps.event.trigger(map, 'resize');
			var currCenter = map.getCenter();
			map.setCenter(currCenter);
		}
	}
}