var policyViewer = new function ()
{
	var insurerAdminId;

	var policies = [];
	var viewableBrokerages;

	var landEntryMaps = [];
	var mapScriptContainer = document.getElementById("mapScriptContainer");

	var brokerageSelect = document.getElementById("available_broker_dropdown");
	var policyNumberInput = document.getElementById("policy_number_input");
	var businessUnitInput = document.getElementById("business_unit_input");
	var searchButton = document.getElementById("search_button");
	var policyAccordion = document.getElementById("policy_accordion");

	var policyAccordionButtonsContainer = document.getElementById("policy_button_container");

	(function init(){
		insurerAdminId = insurerAdminController.getInsurerAdmin().id;

		loadShareModal("share_modal_container");

		setAvailableBrokerages();
		setSearchButtonClickListener();
		addOnEnterKeyPressedListenerForSearchInput(policyNumberInput);
		addOnEnterKeyPressedListenerForSearchInput(businessUnitInput);
		search();
		$(policyAccordionButtonsContainer).hide();
	})();

	function loadShareModal(id) {
		loader.loadPartOfPage("html/insurer_admin/policy/share.html", id);
	}
	
	function setAvailableBrokerages()
	{	
		var requestObj = {'insurerAdminId':insurerAdminId};
		insurerAdminController.getBrokerages(
			function(response){
				viewableBrokerages = response;

				for(var i = 0; i < viewableBrokerages.length; i++)
				{
					var option = document.createElement("OPTION");
					option.innerHTML = viewableBrokerages[i].name;

					brokerageSelect.appendChild(option);
				}

				// If only one broker is available then it will be onself, as it is the first option it will already be selected
				// Hide the dropdown
				if(viewableBrokerages.length == 1)
				{
					document.getElementById("available_broker_container").style.display = "none";
					document.getElementById("policy_number_container").className+=" col-md-offset-2";
				}
			},
			function(){
				alert("Failed to load brokerages");
			},
			requestObj
		);
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
		
		//var tBrokerName = $(brokerSelect).val().trim();
		//var brokerId = getIdOfSelectedBroker(tBrokerName);
		var brokerageId = getIdOfSelectedBrokerage($(brokerageSelect).val().trim());
		var policyNumber = $(policyNumberInput).val().trim();
		var businessUnitName = $(businessUnitInput).val().trim();

		if(brokerageId != -1)
		{
			var tObj = {
				"brokerageId":brokerageId,
				"policyNumber":policyNumber,
				"businessUnitName":businessUnitName
			};
			insurerAdminController.getPolicies(
				setPolicies, 
				function(){
					util.createNotification("Failed to load policies");
				}, 
				tObj
			);

			//ajaxPost("Something", setPolicies, function(){alert("Issue getting policy data");}, tObj, policyInvoker.searchForPolicy(brokerId, policyNumber, businessUnitName));
			
			//setPolicies(policyInvoker.searchForPolicy(brokerId, policyNumber, businessUnitName));
		}
	}

	function getIdOfSelectedBrokerage(name)
	{
		for(var i = 0; i < viewableBrokerages.length; i++)
		{
			if(viewableBrokerages[i].name == name)
			{
				return viewableBrokerages[i].brokerId;
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

			createChildHeaderAccordionItem(childContainer);

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
		parentTitle.onclick = function(){toggleOtherPolicies(policy, parentLi, container);};

		createAccordionItemDetailDiv("Policy Number: " + policy.policyNumber, parentTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Business Unit: " + policy.businessUnit.name, parentTitle).className = "col-md-2";
		//createAccordionItemDetailDiv("Policy Start: " + policy.acceptedOn, parentTitle).className = "col-md-3";
		createAccordionItemDetailDiv("Accept Date: " + util.getDateTimePretty(policy.acceptedOn*1), parentTitle).className = "col-md-3";
		createAccordionItemDetailDiv("Commencement Date: " + util.getDateTimePretty(util.addTimeToDateTime(policy.acceptedOn*1,sessionStorage.COMMENCEMENT_DELAY*1,"milliseconds")), parentTitle).className = "col-md-3";
		createAccordionItemDetailDiv("Total Insured Value: " + policy.totalInsuredValue, parentTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Premium: " + policy.premium, parentTitle).className = "col-md-2";

		var childContainer = document.createElement("UL");
		childContainer.className = "inner";

		parentLi.appendChild(parentTitle);
		parentLi.appendChild(childContainer);

		container.appendChild(parentLi);

		return childContainer;
	}

	function toggleOtherPolicies(policy, theCurrentItem, itemContainer)
	{
		var listOfItems = itemContainer.childNodes;

		for(var i = 0; i < listOfItems.length; i++)
		{
			if(listOfItems[i] != theCurrentItem)
			{
				$(listOfItems[i]).toggle();
			}
		}

		// Replace the quote buttons
		policyAccordionButtonsContainer.innerHTML = "";
		createPolicyButtons(policy, policyAccordionButtonsContainer);
		$(policyAccordionButtonsContainer).toggle();
	}

	function createAccordionItemDetailDiv(val, container)
	{
		var tDiv = document.createElement("DIV");
		tDiv.innerHTML = val;
		//tDiv.style.cssText = "margin-right: 80px;";
		container.appendChild(tDiv);
		return tDiv;
	}

	function createChildHeaderAccordionItem(container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex; background: #4287b5;";

		createAccordionItemDetailDiv("Land Number: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Crop: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Cultivar: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Area: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Yield ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Price: ", childTitle).className = "col-md-2";
		//createAccordionItemDetailDiv("Tariff Option: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Excess %: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Covered Perils: ", childTitle).className = "col-md-2";

		childLi.appendChild(childTitle);
		container.appendChild(childLi);
	}

	function createPolicyAccordionChildItem(landEntry, container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv(landEntry.landNumber , childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.crop.name, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.cultivar, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.area, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.yield, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.price, childTitle).className = "col-md-2";
		/*var additionTariff = landEntry.additionalTariff > 0 ? " (+"+landEntry.additionalTariff.toFixed(2)+")": "";
		createAccordionItemDetailDiv(landEntry.tariff.toFixed(2) + "" + additionTariff, childTitle).className = "col-md-2";*/
		createAccordionItemDetailDiv(landEntry.policyLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.coverage, childTitle).className = "col-md-2";
		var perils="";
		for(var i = 0; i < landEntry.policyLandEntryDamageTypes.length; i++)
		{
			var damageType = landEntry.policyLandEntryDamageTypes[i].tariffOptionDamageType.damageType.name;
			if(i == 0)
			{
				perils += damageType;
			}
			else
			{
				perils += ", "+damageType;
			}
		}
		createAccordionItemDetailDiv(perils, childTitle).className = "col-md-2";

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

	function createPolicyButtons(policy, container)
	{
		createShareBtn(container, policy);
	}

	function createShareBtn(container, policy)
	{
		var button = createSuccessButton("Share", container);
		button.onclick = function(e) {share(e, policy);};
		button.style.cssText = "margin-right: 10px;";
	}

	function share(e, policy) {
		shareModal.show(policy.id);
	}

	function createSuccessButton(title, container)
	{
		var button = document.createElement("DIV");
		button.className = "btn btn-success col-md-2";
		button.innerHTML = title;

		container.appendChild(button);

		return button;
	}

	function createDangerButton(title, container)
	{
		var button = document.createElement("DIV");
		button.className = "btn btn-danger col-md-2";
		button.innerHTML = title;

		container.appendChild(button);

		return button;
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

	this.refresh = function()
	{
		search();
	}
}