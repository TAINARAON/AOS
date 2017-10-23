var increasePolicy = new function(){
	var mainPolicy = {};

	var modal = document.getElementById("increaseModal");

	var yield_input = document.getElementById("yield_input");
	var price_input = document.getElementById("price_input");
	var fields_for_edit_container = document.getElementById("fields_for_edit_container");

	var buttons_for_edit_container = document.getElementById("buttons_for_edit_container");

	var cancel_policy_increase_button = document.getElementById("cancelPolicyIncrease");
	var save_policy_increase_button = document.getElementById("acceptPolicyIncrease");

	var unedited_policy_land_entry_container = document.getElementById("unchanged_policy_land_entry_container");
	var edited_policy_land_entry_container = document.getElementById("changed_policy_land_entry_container");

	var unchanged_policy_table_container = document.getElementById("unchanged_policy_table_container");
	var changed_polocy_table_container = document.getElementById("changed_polocy_table_container");

	(function init(){
		cancel_policy_increase_button.onclick = function(){cancel();};
		save_policy_increase_button.onclick = function(){save();};

		$(save_policy_increase_button).hide();

		$(fields_for_edit_container).hide();
		$(buttons_for_edit_container).hide();
		$(changed_polocy_table_container).hide();
	})();

	function cancel()
	{
		hide();
		reset();
	}

	function save()
	{
		mainPolicy.brokerId = brokerController.getBroker().id;
		mainPolicy.linkedToPolicyId = mainPolicy.id;
		mainPolicy.policyNumber =  Math.floor((Math.random() * 100000) + 1);
		console.log(mainPolicy);

		brokerController.savePolicy(
			function(response){
				//debugger;
				util.createNotification(response.message);
				policyViewer.refresh();
				hide();
				reset();
				shareModal.show(response.id);
			}, 
			function(response){
				util.createNotification(response.message);
			}, 
			mainPolicy
		);
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
		createColumn((landEntry.area*landEntry.yield*landEntry.price).toFixed(2), tr);
		createColumn(landEntry.policyLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.tariffOptionType.name, tr);
		createColumn(landEntry.policyLandEntryDamageTypes[0].tariffOptionDamageType.tariffOption.coverage, tr);

		createLandEntryButtons(landEntry,createColumn("", tr), tr);

		container.appendChild(tr);
	}

	function createColumn(val, container)
	{
		var column = document.createElement("TD");
		column.innerHTML = val;
		container.appendChild(column);
		return column;
	}

	function createLandEntryButtons(landEntry, container, landEntryRow)
	{
		createButton("Edit", populateEditFields, landEntry, landEntryRow, container);
	}

	function createButton(title,myFunction,landEntry, landEntryRow, container)
	{
		var button = document.createElement("DIV");
		button.innerHTML = title;
		button.className = "btn btn-success";
		button.onclick = function(){myFunction(landEntry, landEntryRow);};
		container.appendChild(button);
		return button;
	}

	function populateEditFields(landEntry, landEntryRow)
	{
		$(fields_for_edit_container).show();
		$(buttons_for_edit_container).show();

		$(yield_input).val(landEntry.yield);
		$(price_input).val(landEntry.price);

		createEditButtons(landEntry, landEntryRow);
	}

	function createEditButtons(landEntry, landEntryRow)
	{
		buttons_for_edit_container.innerHTML = "";

		createCancelUpdateButton(landEntry, landEntryRow, buttons_for_edit_container);
		createUpdateButton(landEntry, landEntryRow, buttons_for_edit_container);
	}

	function createCancelUpdateButton(landEntry, landEntryRow, container)
	{
		createButton("Cancel update",cancelUpdate,landEntry,landEntryRow,container).className = "btn btn-danger col-md-offset-3 col-md-2";
	}

	function cancelUpdate()
	{
		resetForNextEdit();		
	}

	function createUpdateButton(landEntry, landEntryRow, container)
	{
		createButton("Update",update,landEntry,landEntryRow,container).className = "btn btn-success col-md-2";
	}

	function update(landEntry, landEntryRow)
	{
		if(criteriaFieldValueIsNumerical($(yield_input).val()) && criteriaFieldValueIsNumerical($(price_input).val()))
		{
			if(landEntry.yield < $(yield_input).val() || landEntry.price < $(price_input).val())
			{
				landEntry.yield = $(yield_input).val();
				landEntry.price = $(price_input).val();

				resetForNextEdit();
				$(changed_polocy_table_container).show();
				createLandEntry(landEntry, edited_policy_land_entry_container);

				$(save_policy_increase_button).show();

				$(landEntryRow).remove();
			}
			else
			{
				alert("At least one value needs to differ from the original");
			}
		}
		else
		{
			alert("Please ensure that the values for the criteria fields are numerical");
		}
	}

	function criteriaFieldValueIsNumerical(value)
	{
		var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;

		if(numberRegex.test(value))
		{
			return true;
		}

		return false;
	}

	function resetForNextEdit()
	{
		yield_input.innerHTML = "";
		price_input.innerHTML = "";

		buttons_for_edit_container.innerHTML = "";

		$(fields_for_edit_container).hide();
		$(buttons_for_edit_container).hide();
	}

	function reset()
	{
		mainPolicy = {};

		yield_input.innerHTML = "";
		price_input.innerHTML = "";

		unedited_policy_land_entry_container.innerHTML = "";
		edited_policy_land_entry_container.innerHTML = "";

		$(fields_for_edit_container).hide();
		$(buttons_for_edit_container).hide();
		$(changed_polocy_table_container).hide();

		$(save_policy_increase_button).hide();
	}

	this.show = function(policy)
	{
		mainPolicy = jQuery.extend(true, {}, policy);
		setLandToEdit(mainPolicy);

		/*modal.style.cssText = "display: block; padding-right: 17px;";
		modal.className = "modal fade in";*/
		$(modal).modal('show');
	}

	function hide()
	{
		/*modal.style.cssText = "display: none;";
		modal.className = "modal fade";*/
		$(modal).modal('hide');
	}
}