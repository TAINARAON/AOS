var increasePolicy = new function(){
	alert("O yay");
	var mainPolicy = {};

	var modal = document.getElementById("increaseModal");
	var cancelPolicyIncrease = document.getElementById("cancelPolicyIncrease");
	var savePolicyIncrease = document.getElementById("acceptPolicyIncrease");

	var yieldInput = document.getElementById("yield_input");
	var priceInput = document.getElementById("price_input");

	(function init(){
		cancelPolicyIncrease.onclick = function(){cancel();};
		savePolicyIncrease.onclick = function(){save();};
	})();

	function cancel()
	{
		hide();
		reset();
	}

	function save()
	{
		
	}

	function setValuesToEdit(policy)
	{
		policy.policyLandEntries
	}

	function reset()
	{
		mainPolicy = {};
	}

	this.show = function(policy)
	{
		mainPolicy = policy;
		setValuesToEdit(policy);

		modal.style.cssText = "display: block; padding-right: 17px;";
		modal.className = "modal fade in";
	}

	function hide()
	{
		modal.style.cssText = "display: none;";
		modal.className = "modal fade";
	}
}