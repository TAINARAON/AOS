(function(){  

	console.log("Quote js linked");

	(function init(){
		var container = document.getElementById("quote_container");
		var data = [
			{"title":"title1", "data":"data1"},
			{"title":"title2", "data":"data2"},
			{"title":"title3", "data":"data3"}
		];

		//createModal("modal_container");

		createQuoteAccordion(container, data);

		// link the quote modal buttons to on click listeners
		setupQuoteModalButtonListeners();
	})();

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function createQuoteAccordion(container, quoteData) {
		for (let i = 0; i < quoteData.length; i++) {
			console.log("Creating elements: " + i);
			var button = document.createElement('BUTTON');
			button.className = "accordion";
			console.log("Title: " + quoteData[i].title);
			button.innerHTML = quoteData[i].title;

			var detailContainer = document.createElement('DIV');
			detailContainer.className = "panel";

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

			var details = document.createElement('P');
			details.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

			detailContainer.appendChild(reQuote);
			detailContainer.appendChild(deleteQuote);
			detailContainer.appendChild(acceptQuote);
			detailContainer.appendChild(printQuote);
			detailContainer.appendChild(emailQuote);

			detailContainer.appendChild(details);

			container.appendChild(button);
			container.appendChild(detailContainer);

			reQuote.onclick = function(e){reQuoteClick(i);};
			deleteQuote.onclick = function(e){deleteQuoteClick(i);};
			acceptQuote.onclick = function(e){acceptQuoteClick(i);};
			printQuote.onclick = function(e){printQuoteClick(i);};
			emailQuote.onclick = function(e){emailQuoteClick(i);};

			button.onclick = function(e){accordionItemClick(e);};
		}
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

	function setupQuoteModalButtonListeners()
	{

		console.log("Adding click listeners");
		var includeBtn = document.getElementById("includeRow");
		console.log(includeBtn);
		includeBtn.onclick = function(e) {addFarmToQuote();};
		document.getElementById("cancelQuote").onclick = function(e) {cancelCreatingQuote();};
		document.getElementById("acceptQuote").onclick = function(e) {createQuoteAndAddToView()};
	}

	function addFarmToQuote()
	{
		alert("Add farm to quote");
	}

	function cancelCreatingQuote()
	{
		alert("Cancel creating quote");
	}

	function createQuoteAndAddToView()
	{
		alert("Create quote");
	}

})();