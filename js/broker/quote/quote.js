var quoteViewer = new function()
{
	console.log("Quote js linked");

	// Containers
	var quoteAccordioncontainer = document.getElementById("quote_accordion_container");
	// ^ Containers ^

	// Rest functions
	function resetAccordionContainer()
	{
		quoteAccordioncontainer.innerHTML = "";
	}
	// ^ Reset functions ^

	(function init(){
		createModal("modal_container");
		setupQuoteAccordion(quoteAccordioncontainer, loadData("","","",""));
	})();

	// TODO: create filter fields !!!!!!!!!!!!!!

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function loadData(businessUnitName, farmName, quoteNumber, expiryDate)
	{
		// TODO: do filtering

		var quotes = quoteInvoker.getQuotes();
		for(var i = 0; i < quotes.length; i++)
		{
			quotes[i]['boerdery'] = clientInvoker.getCleanBusinessUnit(quotes[i].businessUnitId)['name'];
			quotes[i]['quoteLandEntries'] = quoteInvoker.getLandEntriesOfQuote(quotes[i].id);
		}

		console.log("The initial quote load");
		console.log(quotes);

		return quotes;
	}

	function setupQuoteAccordion(container, quotes)
	{
		for(let i = 0; i < quotes.length; i++)
		{
			createAccordionEntryHeader(container, quotes[i]);
			createAccordionEntryChild(container, quotes[i].quoteLandEntries);
		}
	}

	function createAccordionEntryHeader(container, quote)
	{
		var row = document.createElement("BUTTON");
		row.className = "accordion row";

		createHeaderColumns(quote.boerdery, row);
		createHeaderColumns(quote.quoteNumber, row);
		createHeaderColumns("Insert time here", row);

		var column_expand_icon = document.createElement("DIV");
		column_expand_icon.style.cssText = "pointer-events: none;";
		column_expand_icon.className = "col-md-3";

		row.appendChild(column_expand_icon);

		row.onclick = function(e) {accordionItemClick(e)};

		container.appendChild(row);
	}

	function createHeaderColumns(title, row)
	{
		var column = document.createElement("DIV");
		column.style.cssText = "pointer-events: none;";
		column.className = "col-md-3";
		column.innerHTML = title;

		row.appendChild(column);
	}

	function createAccordionEntryChild(container, landEntries)
	{
		console.log("Here");
		var childContainer = createAccordionEntryChildContainer(container);

		for(let j = 0; j < landEntries.length; j++)
		{
			var innerContainer = createAccordionEntryChildInnerContainer(childContainer);
			createAccordionEntryChildHeaderButtons(innerContainer, landEntries[j]);
			createAccordionEntryChildDetailContainer(innerContainer, landEntries[j]);
		}
	}

	function createAccordionEntryChildContainer(container)
	{
		var childContainer = document.createElement("DIV");
		childContainer.className = "panel";

		container.appendChild(childContainer);

		return childContainer;
	}

	function createAccordionEntryChildInnerContainer(childContainer)
	{
		var innerContainer = document.createElement("DIV");

		childContainer.appendChild(innerContainer);

		return innerContainer;
	}

	function createAccordionEntryChildHeaderButtons(container, landEntry)
	{
		var buttonContainer = createAccordionEntryChildHeaderButtonContainer(container);
		createReQuoteBtn(buttonContainer, landEntry);
		createDeleteBtn(buttonContainer, landEntry);
		createAcceptButton(buttonContainer, landEntry);
		createPrintQuoteBtn(buttonContainer, landEntry);
		createEmailQuoteBtn(buttonContainer, landEntry);
	}

	function createAccordionEntryChildHeaderButtonContainer(container)
	{
		var buttonContainer = document.createElement("DIV");
		buttonContainer.className = "row";

		container.appendChild(buttonContainer);

		return buttonContainer;
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

	function createReQuoteBtn(container, landEntry)
	{
		createSuccessButton("Re-Quote", container).onclick = function(e) {reQuote(e, landEntry);};
	}

	function reQuote(event, landEntry)
	{
		event.preventDefault();
		quoteCreator.openModalAndReQuote(landEntry);
	}

	function createDeleteBtn(container, landEntry)
	{
		createDangerButton("Delete Quote", container).onclick = function(e) {deleteQuote(e, landEntry);};
	}

	function deleteQuote(event, landEntry)
	{
		event.preventDefault();
		// use quoteInvoker to delete record
	}

	function createAcceptButton(container, landEntry)
	{
		createSuccessButton("Accept Quote", container).onclick = function() {acceptQuote(landEntry);};
	}

	function acceptQuote(landEntry)
	{
		alert("acceptQuote");
	}

	function createPrintQuoteBtn(container, landEntry)
	{
		createSuccessButton("Print Quote", container).onclick = function() {printQuote(landEntry);};
	}

	function printQuote(landEntry)
	{
		alert("printQuote");
	}

	function createEmailQuoteBtn(container, landEntry)
	{
		createSuccessButton("Email Quote", container).onclick = function() {emailQuote(landEntry);};
	}

	function emailQuote(landEntry)
	{
		alert("emailQuote");
	}

	function createAccordionEntryChildDetailContainer(container, landEntry)
	{
		var row = document.createElement("DIV");
		row.className = "row";

		createColumn(landEntry.landNumber, row);
		createColumn("Add crop here", row);
		createColumn(landEntry.cultivar, row);
		createColumn(landEntry.area, row);
		createColumn(landEntry.yield, row);
		createColumn(landEntry.price, row);
		createColumn("Add tarif option here", row);

		container.appendChild(row);
	}

	function createColumn(title, row)
	{
		var column = document.createElement("DIV");
		column.className = "col-md-1";
		column.innerHTML = title;

		row.appendChild(column);
	}

	function accordionItemClick(e) {
		console.log("Button clicked: " + e);

		var target = e.target || e.srcElement;
		console.log(target);

        target.classList.toggle("active");

        var panel = target.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
	}

	this.reloadAccordion = function()
	{
		resetAccordionContainer();
		setupQuoteAccordion(quoteAccordioncontainer, loadData("","","",""));
	};
}