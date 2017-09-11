var addQuote;

(function(){  

	console.log("Quote js linked");

	var mainQuote = [];

	(function init(){
		var container = document.getElementById("quote_container");
		var data = [
			{"boerdery":"title1", "quoteLandEntries":[{"plaas":"plaas1"}]},
			{"boerdery":"title2", "quoteLandEntries":[{"plaas":"plaas2"}]},
			{"boerdery":"title3", "quoteLandEntries":[{"plaas":"plaas3"}]}
		];

		console.log(mainQuote);

		createModal("modal_container");

		createQuoteAccordion(container, data);
	})();

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function createQuoteAccordion(container, quoteData) {
		for (let i = 0; i < quoteData.length; i++) {
			createAccordionParentElement(container, quoteData, i);
			createChildDetailContainer(container, quoteData, i);
		}
  	}

  	function createAccordionParentElement(container, quoteData, index)
  	{
  		var button = document.createElement('BUTTON');
		button.className = "accordion";
		console.log("Title: " + quoteData[index].boerdery);
		button.innerHTML = quoteData[index].boerdery;

		container.appendChild(button);

		button.onclick = function(e){accordionItemClick(e);};

		return button;
  	}

  	function createChildDetailContainer(container, quoteData, index)
  	{
  		var detailContainer = document.createElement('DIV');
		detailContainer.className = "panel";

		container.appendChild(detailContainer);

		createQuoteRelatedChildHeaderButtons(detailContainer, index);
		createChild(detailContainer);
  	}

  	function createQuoteRelatedChildHeaderButtons(detailContainer, index)
  	{
  		var reQuote = document.createElement('BUTTON');
		reQuote.innerHTML = "Re-quote";
		var deleteQuote = document.createElement('BUTTON');
		deleteQuote.innerHTML = "Delete Quote";
		var acceptQuote = document.createElement('BUTTON');
		acceptQuote.innerHTML = "Accept Quote";
		var printQuote = document.createElement('BUTTON');
		printQuote.innerHTML = "Print Quote";
		var emailQuote = document.createElement('BUTTON');
		emailQuote.innerHTML = "Email Quote";

		detailContainer.appendChild(reQuote);
		detailContainer.appendChild(deleteQuote);
		detailContainer.appendChild(acceptQuote);
		detailContainer.appendChild(printQuote);
		detailContainer.appendChild(emailQuote);

		reQuote.onclick = function(e){reQuoteClick(index);};
		deleteQuote.onclick = function(e){deleteQuoteClick(index);};
		acceptQuote.onclick = function(e){acceptQuoteClick(index);};
		printQuote.onclick = function(e){printQuoteClick(index);};
		emailQuote.onclick = function(e){emailQuoteClick(index);};
  	}

  	function createChild(detailContainer)
  	{
  		var details = document.createElement('P');
		details.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  		
  		detailContainer.appendChild(details);
  	}

  	function reQuoteClick(id)
  	{
  		alert("Re Quote: " + id);
  	}

  	function deleteQuoteClick(id) {
  		alert("Delete quote: " + id);	
  	}

  	function acceptQuoteClick(id) {
  		alert("Accept quote: " + id);
  	}

  	function printQuoteClick(id)
  	{
  		alert("Print Quote: " + id);
  	}

  	function emailQuoteClick(id)
  	{
  		alert("Email Quote: " + id);
  	}

  	function accordionItemClick(e) {
		console.log("Button clicked: " + e);

		var target = e.target || e.srcElement;

        target.classList.toggle("active");

        var panel = target.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
	}

	addQuote = function(quotes)
	{
		console.log("Hitting inner fuction via global variable");
		console.log("Size: " + mainQuote.length);

		for(var i = 0; i < quotes.length; i++)
		{
			if(mainQuote.some(item => item.boerdery === quotes[i].boerdery))
			{
				console.log("Entry exists, add farm");
				for(var j = 0; j < quotes[i].quoteLandEntries.length; j++)
				{
					console.log("Adding farm");
					mainQuote[i].quoteLandEntries.push(quotes[i].quoteLandEntries[j]);
				}

				// Persist data to database
				saveQuoteLandEntries(quotes[i].quoteLandEntries);
			}
			else
			{
				console.log("Entry does not exist, add whole");
				mainQuote.push(quotes[i]);
				// Persist data to database
				saveBusinessUnit(quotes[i]);
				saveQuoteLandEntries(quotes[i].quoteLandEntries);
			}
		}

		console.log(mainQuote);

		updateAccordion();
	}

	function saveQuoteLandEntries(landEntries)
	{
		debugTool.print("Save land entry", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
	}

	function saveBusinessUnit(businessUnit)
	{
		debugTool.print("Save business unit", FILTER_LEVEL_HIGH, FILTER_TYPE_LOG);
	}

	function updateAccordion()
	{
		// if the business unit already exists, then make sure to only update the children
		// else add the entire business unit to the accordion	

		/*var ancestor = document.getElementById("quote_container");
    	parentDescendents = ancestor.getElementsByTagName('BUTTON');
    	for(var i = 0; i < parentDescendents.length; i++)
    	{
    		for(var j = 0; j < mainQuote.length; j++)
    		{
    			if(parentDescendents[i].innerHTML == mainQuote[j].boerdery)
				{
					console.log("Business unit already exists in view");
					for(var k = 0; k < mainQuote[j].plase.length; k++)
					{
						var detailContainerSibling = parentDescendents[i].nextSibling;
						console.log("Should be button's detail container");
						console.log(detailContainerSibling);
						//if(mainQuote[j].plase[k] == )
						//{

						//}
					}
				}
				else
				{
					console.log("Business unit does not exists in view");
					createAccordionParentElement(ancestor, mainQuote, i);
				}
    		}
    	}*/
	}

})();

function updateQuotes(quotes)
{
	console.log("Hitting global function");
	console.log(quotes);
	addQuote(quotes);
}