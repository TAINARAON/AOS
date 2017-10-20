var quoteAcceptModal = new function()
{
	console.log("Accept quote linked");

	var quoteId;

	var modal = document.getElementById("acceptModal");

	var input_accept_time = document.getElementById("aanvaar_tyd");

	var acceptBtn = document.getElementById("acceptPolicy");
	var cancelBtn = document.getElementById("cancelPolicy");

	// Getters & Setters
	function getQuoteId()
	{
		return quoteId;
	}

	function setQuoteId(value)
	{
		quoteId = value;
	}

	function resetQuoteId()
	{
		quoteId = undefined;
	}

	function getAcceptTimeValue()
	{
		return input_accept_time.value;
	}

	function resetAcceptTimeValue()
	{
		input_accept_time.value = "";
	}
	// ^ Getters & Setters ^

	(function init()
	{
		setupButtonClickListeners();
	})();

	function setupButtonClickListeners()
	{
		console.log("Setup click listeners");
		addAcceptClickListener();
		addCancelClickListener();
	}

	function addAcceptClickListener()
	{
		acceptBtn.onclick = function() {accept();};
	}

	function accept()
	{
		event.preventDefault();
		//console.log("The business unit id: " + getQuoteId());

		var requestObj = {
			'quoteId':getQuoteId(),
			'acceptedTime':getAcceptTimeValue()
		};

		util.displayUploadFileModal(
			requestObj, 
			function(result, extradata){
				extradata["supportingDocs"] = result;
				
				brokerController.acceptQuote(
					function(response){
						util.createNotification(response.message);
						//policyInvoker.createFromQuote(getQuoteId(), getAcceptTimeValue());
						reset();
						hide();
						quoteViewer.refresh();
					},
					function(){
						util.createNotification("Failed to accept quote");
					},
					extradata
				);
			}
		);
	}

	function addCancelClickListener()
	{
		cancelBtn.onclick = function() {cancel();};
	}

	function cancel()
	{
		hide();
	}

	this.show = function(quoteId)
	{
		setQuoteId(quoteId);

		$(input_accept_time).val(util.getDateTimePretty());

		modal.style.cssText = "display: block; padding-right: 17px;";
		modal.className = "modal fade in";
	}
	
	function hide()
	{
		console.log("sadasd");
		reset();

		modal.style.cssText = "display: none;";
		modal.className = "modal fade";
	}

	function reset()
	{
		resetQuoteId();
		resetAcceptTimeValue();
	}
}