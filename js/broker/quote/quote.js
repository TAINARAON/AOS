var quoteViewer = new function()
{
	console.log("Quote js linked");

	var quote_number;

	// Containers
	var quoteAccordioncontainer = document.getElementById("quote_accordion_container");
	// ^ Containers ^

	// Rest functions
	function resetAccordionContainer()
	{
		quoteAccordioncontainer.innerHTML = "";
	}
	// ^ Reset functions ^

	// Getters & Setters
	function getQuoteNumberValue()
	{
		return quote_number.value;
	}
	// ^ Getters & Setters ^

	(function init(){
		createModal("modal_container");
		createFilterFields("search_container");
		setupQuoteAccordion(quoteAccordioncontainer, loadData(""));
	})();

	function createFilterFields(id)
	{
		console.log("Here");
		var row = document.createElement("DIV");
		row.className = "row";

		quote_number = createSearchInputBox("Quote Number:", row);

		createSearchButton(row);

		document.getElementById(id).appendChild(row);
	}

	function createSearchInputBox(title, container)
	{
        var innerContainer = document.createElement("DIV");
        innerContainer.className = "col-md-2";

        var label = document.createElement("LABEL");
        label.className = "text-left";
        label.innerHTML = title;

		var input = document.createElement("INPUT");
		input.className = "form-control";

		innerContainer.appendChild(label);
		innerContainer.appendChild(input);

		container.appendChild(innerContainer);

		return input;
	}

	function createSearchButton(container)
	{
		var innerContainer = document.createElement("DIV");
        innerContainer.className = "col-md-2";

        var label = document.createElement("LABEL");
        label.className = "text-left";
        label.innerHTML = "Search";
        label.style.cssText = "color: transparent;";

		var button = document.createElement("DIV");
		button.className = "btn btn-info col-md-1 form-control";
		button.innerHTML = "Search";
		button.onclick = function() {search();};

		innerContainer.appendChild(label);
		innerContainer.appendChild(button);

		container.appendChild(innerContainer);
	}

	function search()
	{
		resetAccordionContainer();
		setupQuoteAccordion(quoteAccordioncontainer, loadData(getQuoteNumberValue()));
	}

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function loadData(quoteNumber)
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

		/*for(let j = 0; j < landEntries.length; j++)
		{
			var innerContainer = createAccordionEntryChildInnerContainer(childContainer);
			createAccordionEntryChildHeaderButtons(innerContainer, landEntries[j]);
			createAccordionEntryChildDetailContainer(innerContainer, landEntries[j]);
		}*/

		createAccordionEntryChildHeaderButtons(childContainer, landEntries);

		var tableBodyContainer = createAccordionEntryChildInnerContainer(childContainer);

		for(let j = 0; j < landEntries.length; j++)
		{
			createAccordionEntryChildDetailContainer(tableBodyContainer, landEntries[j]);
		}
	}

	function createAccordionEntryChildContainer(container)
	{
		var childContainer = document.createElement("DIV");
		childContainer.className = "panel";

		container.appendChild(childContainer);

		return childContainer;
	}

	/*function createAccordionEntryChildInnerContainer(childContainer)
	{
		var innerContainer = document.createElement("DIV");

		childContainer.appendChild(innerContainer);

		return innerContainer;
	}*/

	function createAccordionEntryChildInnerContainer(childContainer)
	{
		var table = document.createElement("TABLE");
		table.className = "table table-striped table-bordered table-hover table-condensed";

		var tableBody = document.createElement("TBODY");

		table.appendChild(tableBody);
		childContainer.appendChild(table);

		return tableBody;
	}

	function createAccordionEntryChildHeaderButtons(container, landEntries)
	{
		var buttonContainer = createAccordionEntryChildHeaderButtonContainer(container);
		createReQuoteBtn(buttonContainer, landEntries);
		createDeleteBtn(buttonContainer, landEntries);
		createAcceptButton(buttonContainer, landEntries);
		createPrintQuoteBtn(buttonContainer, landEntries);
		createEmailQuoteBtn(buttonContainer, landEntries);
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

	function createReQuoteBtn(container, landEntries)
	{
		createSuccessButton("Re-Quote", container).onclick = function(e) {reQuote(e, landEntries);};
	}

	function reQuote(event, landEntries)
	{
		event.preventDefault();
		quoteCreator.openModalAndReQuote(landEntries[0].quoteId);
	}

	function createDeleteBtn(container, landEntries)
	{
		createDangerButton("Delete Quote", container).onclick = function(e) {deleteQuote(e, landEntries);};
	}

	function deleteQuote(event, landEntries)
	{
		event.preventDefault();
		quoteInvoker.deleteQuote(landEntries[0].quoteId);
		resetAccordionContainer();
		setupQuoteAccordion(quoteAccordioncontainer, loadData(getQuoteNumberValue()));
	}

	function createAcceptButton(container, landEntries)
	{
		createSuccessButton("Accept Quote", container).onclick = function(e) {acceptQuote(e, landEntries);};
	}

	function acceptQuote(event, landEntries)
	{
		event.preventDefault();
	}

	function createPrintQuoteBtn(container, landEntries)
	{
		createSuccessButton("Print Quote", container).onclick = function(e) {printQuote(e, landEntries);};
	}

	function printQuote(event, landEntries)
	{
		event.preventDefault();
		alert("To be added at a later stage");
	}

	function createEmailQuoteBtn(container, landEntries)
	{
		createSuccessButton("Email Quote", container).onclick = function(e) {emailQuote(e, landEntries);};
	}

	function emailQuote(event, landEntries)
	{
		event.preventDefault();
		alert("To be added at a later stage");
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
		setupQuoteAccordion(quoteAccordioncontainer, loadData(getQuoteNumberValue()));
	};
}