var quoteViewer = new function () 
{
	var quotes = [];
	var viewableBrokers;

	var landEntryMaps = [];
	var mapScriptContainer = document.getElementById("mapScriptContainer");

	var brokerSelect = document.getElementById("available_broker_dropdown");
	var quoteNumberInput = document.getElementById("quote_number_input");
	var businessUnitInput = document.getElementById("business_unit_input");
	var searchButton = document.getElementById("search_button");
	var quoteAccordion = document.getElementById("quote_accordion");

	(function init(){
		createModal("modal_container");
		createAcceptQuoteModal("modal_confirm_accept_quote");

		setAvailableBrokers();
		setSearchButtonClickListener();
		addOnEnterKeyPressedListenerForSearchInput(quoteNumberInput);
		addOnEnterKeyPressedListenerForSearchInput(businessUnitInput);
		search();
	})();

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function createAcceptQuoteModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/accept.html", id);
	}

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
		var quoteNumber = $(quoteNumberInput).val().trim();
		var businessUnitName = $(businessUnitInput).val().trim();

		if(brokerId != -1)
		{
			setupQuotes(quoteInvoker.searchForQuote(brokerId, quoteNumber, businessUnitName));
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

		for(var i = 0; i < quotes.length; i++)
		{
			var childContainer = createQuoteAccordionParentItem(quotes[i], quoteAccordion);

			for(var j = 0; j < quotes[i].quoteLandEntries.length; j++)
			{
				if(j == 0)
				{
					createQuoteButtons(quotes[i], childContainer);
				}
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

		createAccordionItemDetailDiv("Quote Number: " + quote.quoteNumber, parentTitle);
		createAccordionItemDetailDiv("Business Unit: " + quote.businessUnit.name, parentTitle);
		createAccordionItemDetailDiv("Date Created: " + quote.dateCreated, parentTitle);
		createAccordionItemDetailDiv("Premium: " + quote.premium, parentTitle);

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

	function createQuoteAccordionChildItem(landEntry, container)
	{
		var childLi = document.createElement("LI");

		var childTitle = document.createElement("A");
		childTitle.className = "toggle";
		childTitle.style.cssText = "display: flex;";

		createAccordionItemDetailDiv("Land Number: " + landEntry.landNumber , childTitle);
		createAccordionItemDetailDiv("Crop: " + landEntry.quoteLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.crop.name, childTitle);
		createAccordionItemDetailDiv("Cultivar: " + landEntry.cultivar, childTitle);
		createAccordionItemDetailDiv("Area: " + landEntry.area, childTitle);
		createAccordionItemDetailDiv("Yield " + landEntry.yield, childTitle);
		createAccordionItemDetailDiv("Price: " + landEntry.price, childTitle);
		createAccordionItemDetailDiv("Tariff Option: " + landEntry.tariff, childTitle);

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
		var childLi = document.createElement("LI");

		createReQuoteBtn(container, quote);
		createDeleteBtn(container, quote);
		// TODO: do acceptable check here
		createAcceptButton(container, quote);
		createPrintQuoteBtn(container, quote);
		createEmailQuoteBtn(container, quote);

		container.appendChild(childLi);
	}

	function createSuccessButton(title, container)
	{
		var button = document.createElement("DIV");
		button.className = "btn btn-success col-md-1";
		button.innerHTML = title;

		container.appendChild(button);

		return button;
	}

	function createDangerButton(title, container)
	{
		var button = document.createElement("DIV");
		button.className = "btn btn-danger col-md-1";
		button.innerHTML = title;

		container.appendChild(button);

		return button;
	}

	function createReQuoteBtn(container, quote)
	{
		createSuccessButton("Re-Quote", container).onclick = function(e) {reQuote(e, quote);};
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
		createSuccessButton("Accept Quote", container).onclick = function(e) {acceptQuote(e, quote);};
	}

	function acceptQuote(event, quote)
	{
		quoteAcceptModal.show(quote.id);
	}

	function createPrintQuoteBtn(container, quote)
	{
		createSuccessButton("Print Quote", container).onclick = function(e) {printQuote(e, quote);};
	}

	function printQuote(event, quote)
	{
		alert("To be added at a later stage");
	}

	function createEmailQuoteBtn(container, quote)
	{
		createSuccessButton("Email Quote", container).onclick = function(e) {emailQuote(e, quote);};
	}

	function emailQuote(event, quote)
	{
		alert("To be added at a later stage");
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