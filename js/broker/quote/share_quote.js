var shareModal = new function()
{
	var modal = document.getElementById("shareModal");
	var pdfContainer = document.getElementById("pdf_content_container");
	var cancelBtn = document.getElementById("cancelSharePolicy");
	var printBtn = document.getElementById("printPolicy");
	var emailBtn = document.getElementById("emailPolicy");

	(function init(){
		cancelBtn.onclick = function(){hide(); quoteId = -1;};
		printBtn.onclick = function(){print();};
		emailBtn.onclick = function(){email();};

		loadQuotePDF(pdfContainer.id);
	})();

	function print()
	{
		alert("To be added at a later stage");
	}

	function email()
	{
		alert("To be added at a later stage");
	}

	this.show = function(id)
	{
		var requestObj = {'quoteId':id};

		brokerController.getQuotePDFData(
			function(response){
				quotePDF.loadValues(response);
		
				modal.style.cssText = "display: block; padding-right: 17px;";
				modal.className = "modal fade in";
			},
			function(response){
				pdfContainer.innerHTML = "No quote data available at this time";
			},
			requestObj
		);
	}

	function loadQuotePDF(id)
	{
		loader.loadPartOfPage("html/common/tempPDF/quote.html", id);
	}

	function hide()
	{
		modal.style.cssText = "display: none;";
		modal.className = "modal fade";
	}
}