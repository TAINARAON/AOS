var quoteViewer = new function () 
{
	var quotes = [];
	var viewableBrokers = [];

	var landEntryMaps = [];
	var mapScriptContainer = document.getElementById("mapScriptContainer");

	var brokerSelect = document.getElementById("available_broker_dropdown");
	var quoteNumberInput = document.getElementById("quote_number_input");
	var businessUnitInput = document.getElementById("business_unit_input");
	var searchButton = document.getElementById("search_button");
	var quoteAccordion = document.getElementById("quote_accordion");
	var quoteAccordionButtonsContainer = document.getElementById("quote_button_container");

	(function init(){
		createModal("modal_container");
		createAcceptQuoteModal("modal_confirm_accept_quote");
		createShareQuoteModal("modal_share_quote");

		setAvailableBrokers();
		setSearchButtonClickListener();
		addOnEnterKeyPressedListenerForSearchInput(quoteNumberInput);
		addOnEnterKeyPressedListenerForSearchInput(businessUnitInput);
		search();
		$(quoteAccordionButtonsContainer).hide();
	})();

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function createAcceptQuoteModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/accept.html", id);
	}

	function createShareQuoteModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/share.html", id);
	}

	function setAvailableBrokers()
	{	
		viewableBrokers = [];
		var currentBroker = brokerController.getBroker();
		var tSelfObj = {
			"brokerId":currentBroker.id,
			"name":brokerController.getUser().name
		}
		viewableBrokers.push(tSelfObj);
		
		var viewable = brokerController.getViewableBrokers();
		for(var i = 0; i < viewable.length; i++)
		{
			var tObj = {
				"brokerId":viewable[i].broker.id,
				"name":viewable[i].broker.user.name
			}
			viewableBrokers.push(tObj);
		}

		for(var i = 0; i < viewableBrokers.length; i++)
		{
			var option = document.createElement("OPTION");
			option.innerHTML = viewableBrokers[i].name;

			brokerSelect.appendChild(option);
		}

		// If only one broker is available then it will be onself, as it is the first option it will already be selected
		// Hide the dropdown
		if(viewableBrokers.length == 1)
		{
			document.getElementById("available_broker_container").style.display = "none";
			document.getElementById("quote_number_container").className+=" col-md-offset-2";
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
		$(quoteAccordionButtonsContainer).hide();

		var tBrokerName = $(brokerSelect).val().trim();
		var brokerId = getIdOfSelectedBroker(tBrokerName);
		var quoteNumber = $(quoteNumberInput).val().trim();
		var businessUnitName = $(businessUnitInput).val().trim();

		if(brokerId != -1)
		{
			var tObj = {
				"brokerId":brokerId,
				"quoteNumber":quoteNumber,
				"businessUnitName":businessUnitName
			};
			brokerController.getQuotes(
				setupQuotes,
				function(response){
					util.createNotification("Failed to load quotes");
				},
				tObj
			);

			//ajaxPost("Something", setupQuotes, function(){alert("Issue getting quote data");}, tObj, quoteInvoker.searchForQuote(brokerId, quoteNumber, businessUnitName));
			

			//setupQuotes(quoteInvoker.searchForQuote(brokerId, quoteNumber, businessUnitName));
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

	function setupQuotes(quotes)
	{
		this.quotes = quotes;
		createAccordionQuoteItems(quotes);
		setupAccordionClickHandler();
	}

	function createAccordionQuoteItems(quotes)
	{
		quoteAccordion.innerHTML = "";
		mapScriptContainer.innerHTML = "";
		quoteAccordionButtonsContainer.innerHTML = "";

		for(var i = 0; i < quotes.length; i++)
		{
			var childContainer = createQuoteAccordionParentItem(quotes[i], quoteAccordion);

			createChildHeaderAccordionItem(childContainer);

			for(var j = 0; j < quotes[i].quoteLandEntries.length; j++)
			{
				/*if(j == 0)
				{
					createQuoteButtons(quotes[i], childContainer);
				}*/
				createQuoteAccordionChildItem(quotes[i].quoteLandEntries[j], childContainer);
			}
		}

		if(quotes.length > 0)
		{
			addMapScriptForUpdatingLandEntryMaps(mapScriptContainer);
		}
	}

	function createQuoteAccordionParentItem(quote, container)
	{
		var parentLi = document.createElement("LI");

		var parentTitle = document.createElement("A");
		parentTitle.className = "toggle";
		parentTitle.style.cssText = "display: flex;";
		parentTitle.onclick = function(){toggleOtherQuotes(quote, parentLi, container);};

		createAccordionItemDetailDiv("Quote Number: " + quote.quoteNumber, parentTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Business Unit: " + quote.businessUnit.name, parentTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Date Created: " + quote.dateCreated, parentTitle).className = "col-md-3";
		createAccordionItemDetailDiv("Total Insured Value: " + quote.totalInsuredValue, parentTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Premium: " + quote.premium, parentTitle).className = "col-md-2";

		var childContainer = document.createElement("UL");
		childContainer.className = "inner";

		parentLi.appendChild(parentTitle);
		parentLi.appendChild(childContainer);

		container.appendChild(parentLi);

		return childContainer;
	}

	function toggleOtherQuotes(quote, theCurrentItem, itemContainer)
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
		quoteAccordionButtonsContainer.innerHTML = "";
		createQuoteButtons(quote, quoteAccordionButtonsContainer);
		$(quoteAccordionButtonsContainer).toggle();
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
		createAccordionItemDetailDiv("Tariff Option: ", childTitle).className = "col-md-2";
		createAccordionItemDetailDiv("Covered Perils: ", childTitle).className = "col-md-2";

		childLi.appendChild(childTitle);
		container.appendChild(childLi);
	}

	function createQuoteAccordionChildItem(landEntry, container)
	{
		var childLi = document.createElement("LI");
		
		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv(landEntry.landNumber , childTitle).className = "col-md-2";
		//createAccordionItemDetailDiv(landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.crop.name, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.crop.name, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.cultivar, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.area, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.yield, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(landEntry.price, childTitle).className = "col-md-2";
		//createAccordionItemDetailDiv(landEntry.tariff, childTitle).className = "col-md-2";
		var perils="";
		//var tariff=0;
		for(var i = 0; i < landEntry.quoteLandEntryDamageTypes.length; i++)
		{
			var damageType = landEntry.quoteLandEntryDamageTypes[i].tariffOptionDamageType.damageType.name;
			if(i == 0)
			{
				perils += damageType;
			}
			else
			{
				perils += ", "+damageType;
			}

			//tariff+=(landEntry.quoteLandEntryDamageTypes[i].tariffOptionDamageType.tariff*1);
		}
		//tariff+=landEntry.additionalTariff;
		var additionTariff = landEntry.additionalTariff > 0 ? " (+"+landEntry.additionalTariff+")": "";
		createAccordionItemDetailDiv(landEntry.tariff.toFixed(2) + "" + additionTariff, childTitle).className = "col-md-2";
		createAccordionItemDetailDiv(perils, childTitle).className = "col-md-2";

		var childDetail = document.createElement("DIV");
		childDetail.className = "inner";

		// TODO: add detail
		createChildDetailMapItem("quote_map" + landEntry.id, landEntry.landLatitude, landEntry.landLongitude, childDetail);

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

	function createQuoteButtons(quote, container)
	{
		//var childLi = document.createElement("LI");

		// TODO: do acceptable check here
		if(quote.acceptable == 1)
		{
			createAcceptButton(container, quote);
		}

		createReQuoteBtn(container, quote);

		// TODO: make this a share button
		createShareQuoteBtn(container, quote);

		// Delete quote temporarily removed
		//createDeleteBtn(container, quote);
		
		//container.appendChild(childLi);
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

	function createReQuoteBtn(container, quote)
	{
		var button = createSuccessButton("Re-Quote", container);
		button.onclick = function(e) {reQuote(e, quote);};
		button.style.cssText = "margin-right: 10px;";
	}

	function reQuote(event, quote)
	{
		console.log("ID: " + quote.id);
		event.preventDefault();
		//quoteCreator.openModalAndReQuote(quote.id);
		createQuote.reQuote(quote);
	}

	function createDeleteBtn(container, quote)
	{
		createDangerButton("Delete Quote", container).onclick = function(e) {deleteQuote(e, quote);};
	}

	function deleteQuote(event, quote)
	{
		quoteInvoker.deleteQuote(quote.id);
		search();
	}

	function createAcceptButton(container, quote)
	{
		var button = createSuccessButton("Accept Quote", container);
		button.onclick = function(e) {acceptQuote(e, quote);};
		button.style.cssText = "margin-right: 10px";
	}

	function acceptQuote(event, quote)
	{
		quoteAcceptModal.show(quote.id);
	}

	function createShareQuoteBtn(container, quote)
	{
		var button = createSuccessButton("Share", container).onclick = function(e) {shareQuote(e, quote);};
	}

	function shareQuote(event, quote)
	{
		// TODO - create a preview modal to display pdf
		// Give user option to email or print in there
		shareModal.show(quote.id);
	}

	function addMapScriptForUpdatingLandEntryMaps(container)
	{
		var mapScript = document.createElement("SCRIPT");
		mapScript.type = "text/javascript";
		mapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAv9T_ISeUi2Jf9FcFpXO24VkRUByr5_ek&callback=quoteViewer.initMap";

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

	this.refresh = function()
	{
		search();
	}
}