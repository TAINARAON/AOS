(function(){  

	console.log("Quote js linked");

	(function init(){
		var container = document.getElementById("quote_container");
		var data = [
			{"title":"bah1", "data":"data1"},
			{"title":"bah2", "data":"data2"},
			{"title":"bah3", "data":"data3"}
		];

		createModal("modal_container");

		createQuoteAccordion(container, data);
	})();

	function createModal(id)
	{
		loader.loadPartOfPage("html/broker/quote/create.html", id);
	}

	function createQuoteAccordion(container, quoteData) {
		console.log(container);
		for (let i = 0; i < quoteData.length; i++) {
			var button = document.createElement('BUTTON');
			button.className = "accordion";

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
			printQuote.onclick = function(e){printQuote(i);};
			emailQuote.onclick = function(e){emailQuote(i);};

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

  	function printQuote(id) {
  		alert("Print quote: " + id);
  	}

  	function emailQuote(id) {
  		alert("Email quote: " + id);
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