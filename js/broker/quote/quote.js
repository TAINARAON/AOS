(function(){  

	console.log("Quote js linked");

	(function init(){
		var container = document.getElementById("quote_container");
		var data = [
			{"title":"title1", "data":"data1"},
			{"title":"title2", "data":"data2"},
			{"title":"title3", "data":"data3"}
		];

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
		console.log("Title: " + quoteData[index].title);
		button.innerHTML = quoteData[index].title;

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

})();