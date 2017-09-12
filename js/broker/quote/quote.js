var addQuote;

(function(){  

	console.log("Quote js linked");

	var mainQuote = [];

	var quoteAccordioncontainer = document.getElementById("quote_accordion_container");

	// Rest functions
	function resetAccordionContainer()
	{
		quoteAccordioncontainer.innerHTML = "";
	}
	// ^ Reset functions ^

	(function init(){
		var data = [
			{"boerdery":"title1", "quoteLandEntries":[{"plaas":"plaas1"}]},
			{"boerdery":"title2", "quoteLandEntries":[{"plaas":"plaas2"}]},
			{"boerdery":"title3", "quoteLandEntries":[{"plaas":"plaas3"}]}
		];

		console.log(mainQuote);

		createModal("modal_container");

		createQuoteAccordion(quoteAccordioncontainer, data);
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

		/*for(var i = 0; i < quotes.length; i++)
		{
			if(mainQuote.some(item => item.boerdery === quotes[i].boerdery))
			{
				console.log("Entry exists, add farm");
				for(var j = 0; j < quotes[i].quoteLandEntries.length; j++)
				{
					console.log("Adding farm");
					mainQuote[i].quoteLandEntries.push(quotes[i].quoteLandEntries[j]);
				}
			}
			else
			{
				console.log("Entry does not exist, add whole");
				mainQuote.push(quotes[i]);
			}
		}*/

		console.log(quotes);

		if(isEmpty(mainQuote))
		{
			console.log("Main empty, add");
			mainQuote.push(quotes);
		}
		else
		{
			console.log("Quote object coming in");
			console.log(quotes);
			if(mainQuote.some(item => item.boerdery === quotes.boerdery))
			{
				console.log("Add land entry - business unit exists");
				for(var i = 0; i < mainQuote.length; i++)
				{
					var businessUnit = mainQuote[i];
					if(businessUnit.boerdery == quotes.boerdery)
					{
						console.log("Found matching business unit");

						for(var j = 0; j < quotes.quoteLandEntries.length; j++)
						{
							var entry = quotes.quoteLandEntries[j];
							console.log("Adding");
							console.log(entry);
							mainQuote[i].quoteLandEntries.push(entry);
						}
					}
				}
			}
			else
			{
				console.log("Add additional");
				mainQuote.push(quotes);
			}
		}

		console.log(mainQuote);

		updateAccordion();
	}

	function isEmpty(obj) {
		for(var prop in obj) {
		    if(obj.hasOwnProperty(prop))
		        return false;
		}

		return true;
	}

	function updateAccordion()
	{
		resetAccordionContainer();

		createQuoteAccordion(quoteAccordioncontainer, mainQuote);
	}

})();

function updateQuotes(quotes)
{
	console.log("Hitting global function");
	console.log(quotes);
	addQuote(quotes);
}