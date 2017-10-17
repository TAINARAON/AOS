var increasePolicy = new function(){
	var mainPolicy = {};

	var modal = document.getElementById("increaseModal");

	var yield_input = document.getElementById("yield_input");
	var price_input = document.getElementById("price_input");

	var cancel_policy_increase_button = document.getElementById("cancelPolicyIncrease");
	var save_policy_increase_button = document.getElementById("acceptPolicyIncrease");

	var unedited_policy_land_entry_container = document.getElementById("unchanged_policy_land_entry_container");
	var edited_policy_land_entry_container = document.getElementById("changed_policy_land_entry_container");

	(function init(){
		cancel_policy_increase_button.onclick = function(){cancel();};
		save_policy_increase_button.onclick = function(){save();};
	})();

	function cancel()
	{
		hide();
		reset();
	}

	function save()
	{
		
	}

	function setLandToEdit(policy)
	{
		unedited_policy_land_entry_container.innerHTML = "";
		edited_policy_land_entry_container.innerHTML = "";

		for(var i = 0; i < policy.policyLandEntries.length; i++)
		{
			createLandEntry(policy.policyLandEntries[i], unedited_policy_land_entry_container);
		}
	}

	function createLandEntry(landEntry, container)
	{
		var tr = document.createElement("TR");

		createColumn(landEntry.farm.name, tr);
		createColumn(landEntry.landNumber, tr);
		createColumn(landEntry.crop.name, tr);
		createColumn(landEntry.cultivar, tr);
		createColumn(landEntry.area, tr);
		createColumn(landEntry.yield, tr);
		createColumn(landEntry.price, tr);
		createColumn("", tr);
		createColumn("", tr);
		createColumn("", tr);

		container.appendChild(tr);
	}

	function createColumn(val, container)
	{
		var column = document.createElement("TD");
		column.innerHTML = val;
		container.appendChild(column);
	}

	function reset()
	{
		mainPolicy = {};

		unedited_policy_land_entry_container.innerHTML = "";
		edited_policy_land_entry_container.innerHTML = "";
	}

	this.show = function(policy)
	{
		mainPolicy = policy;
		setLandToEdit(policy);

		modal.style.cssText = "display: block; padding-right: 17px;";
		modal.className = "modal fade in";
	}

	function hide()
	{
		modal.style.cssText = "display: none;";
		modal.className = "modal fade";
	}
}