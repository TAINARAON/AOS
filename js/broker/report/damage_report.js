var damageReport = new function()
{
	var modalButtonContainer;

	(function init()
	{
		createDamageReportModal("report_modal_container");
		initModalButtonContainer();
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

	function createReportModalButton()
	{
		var button = document.createElement("BUTTON");
		button.className = "btn btn-info btn-lg";
		button.type = "button";
		button.setAttribute("data-toggle", "modal");
		button.setAttribute("data-target", "#myModal");
		button.innerHTML = "Create Damage Report";

		modalButtonContainer.appendChild(button);
	}
}