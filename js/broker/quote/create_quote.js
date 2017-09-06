(function(){ 
	(function init(){
		setupModalButtonClickListeners();
	})();

	function setupModalButtonClickListeners()
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