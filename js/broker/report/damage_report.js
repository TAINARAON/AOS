var damageReport = new function()
{
	var modalButtonContainer;

	var businessUnit;

	var businessUnitId;

	(function init()
	{
		createDamageReportModal("report_modal_container");

		initModalButtonContainer();
		initBusinessUnitDropdown();
		createReportModalButton();
	})();

	function createDamageReportModal(id)
	{
		loader.loadPartOfPage("html/broker/report/create.html", id);
	}

	function initModalButtonContainer()
	{
		modalButtonContainer = document.getElementById("create_report_btn_container");
	}

	function initBusinessUnitDropdown()
	{
		businessUnit = document.getElementById("business_unit_dropdown");
		businessUnit.onchange = function(){toggelDisplayCreateReportModalButton(businessUnit.value)};
	}

	function toggelDisplayCreateReportModalButton(val)
	{
		if(val != null  && val != "")
		{	
			createReportModalButton();
			return;
		}

		removeReportModalButton();
	}

	function createReportModalButton()
	{
		var button = document.createElement("BUTTON");
		button.className = "btn btn-info btn-lg";
		button.type = "button";
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#myModal");
		button.innerHTML = "Create Damage Report";
		button.onclick = function() {showReportModal(businessUnitId)};

		modalButtonContainer.appendChild(button);
	}

	function removeReportModalButton()
	{
		modalButtonContainer.innerHTML = "";
	}

	function showReportModal(businessUnitId)
	{
		modalDamageReport.update(businessUnitId);
	}
}